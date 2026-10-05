SET XACT_ABORT ON;
BEGIN TRANSACTION;

IF OBJECT_ID(N'dbo.ExternalLunchPrices', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.ExternalLunchPrices
    (
        ExternalLunchPriceID int IDENTITY(1,1) NOT NULL
            CONSTRAINT PK_ExternalLunchPrices PRIMARY KEY,
        PriceCents int NOT NULL,
        ValidFrom date NOT NULL,
        CreatedAt datetime2(0) NOT NULL
            CONSTRAINT DF_ExternalLunchPrices_CreatedAt DEFAULT SYSUTCDATETIME(),
        CreatedBy nvarchar(255) NULL,
        CONSTRAINT CK_ExternalLunchPrices_PriceCents CHECK (PriceCents > 0),
        CONSTRAINT UQ_ExternalLunchPrices_ValidFrom UNIQUE (ValidFrom)
    );
END;

IF NOT EXISTS
(
    SELECT 1
    FROM dbo.ExternalLunchPrices
    WHERE ValidFrom = CONVERT(date, '2026-09-01')
)
BEGIN
    INSERT dbo.ExternalLunchPrices (PriceCents, ValidFrom, CreatedBy)
    VALUES (1135, CONVERT(date, '2026-09-01'), N'Initial LunchApp setup');
END;

EXEC(N'
CREATE OR ALTER VIEW dbo.vwExternalLunchChargeEntries
AS
    WITH MealCancellations AS
    (
        SELECT OrderID, SUM(Quantity) AS CancelledQuantity
        FROM dbo.OrderCancellations
        WHERE OrderType = N''Employee''
        GROUP BY OrderID
    ),
    SaladCancellations AS
    (
        SELECT SaladOrderID, SUM(Quantity) AS CancelledQuantity
        FROM dbo.SaladOrderCancellations
        WHERE OrderType = N''Employee''
        GROUP BY SaladOrderID
    ),
    MealCharges AS
    (
        SELECT
            N''MealOrder'' AS SourceType,
            o.OrderID AS SourceID,
            o.ExternalAccountID,
            o.MenuDate,
            o.Quantity - COALESCE(c.CancelledQuantity, 0) AS ActiveQuantity,
            p.PriceCents,
            m.NameEN AS ItemName
        FROM dbo.Orders o
        INNER JOIN dbo.Meals m ON m.MealID = o.OrderedMealID
        LEFT JOIN MealCancellations c ON c.OrderID = o.OrderID
        CROSS APPLY
        (
            SELECT TOP (1) ep.PriceCents
            FROM dbo.ExternalLunchPrices ep
            WHERE ep.ValidFrom <= o.MenuDate
            ORDER BY ep.ValidFrom DESC, ep.ExternalLunchPriceID DESC
        ) p
        WHERE o.ExternalAccountID IS NOT NULL
          AND o.Quantity - COALESCE(c.CancelledQuantity, 0) > 0
    ),
    SaladCharges AS
    (
        SELECT
            N''SaladOrder'' AS SourceType,
            o.SaladOrderID AS SourceID,
            o.ExternalAccountID,
            o.MenuDate,
            o.Quantity - COALESCE(c.CancelledQuantity, 0) AS ActiveQuantity,
            p.PriceCents,
            s.NameEn AS ItemName
        FROM dbo.SaladOrders o
        INNER JOIN dbo.Salads s ON s.SaladID = o.SaladID
        LEFT JOIN SaladCancellations c ON c.SaladOrderID = o.SaladOrderID
        CROSS APPLY
        (
            SELECT TOP (1) ep.PriceCents
            FROM dbo.ExternalLunchPrices ep
            WHERE ep.ValidFrom <= o.MenuDate
            ORDER BY ep.ValidFrom DESC, ep.ExternalLunchPriceID DESC
        ) p
        WHERE o.ExternalAccountID IS NOT NULL
          AND o.Quantity - COALESCE(c.CancelledQuantity, 0) > 0
    ),
    Charges AS
    (
        SELECT * FROM MealCharges
        UNION ALL
        SELECT * FROM SaladCharges
    )
    SELECT
        SourceType,
        SourceID,
        ExternalAccountID,
        MenuDate,
        ActiveQuantity,
        PriceCents,
        ActiveQuantity * PriceCents AS ChargeCents,
        ItemName
    FROM Charges;
');

EXEC(N'
CREATE OR ALTER VIEW dbo.vwExternalAccountBalances
AS
    WITH LedgerTotals AS
    (
        SELECT ExternalAccountID, SUM(AmountCents) AS LedgerCents
        FROM dbo.ExternalAccountLedger
        GROUP BY ExternalAccountID
    ),
    LunchTotals AS
    (
        SELECT ExternalAccountID, SUM(ChargeCents) AS LunchChargeCents
        FROM dbo.vwExternalLunchChargeEntries
        GROUP BY ExternalAccountID
    )
    SELECT
        a.ExternalAccountID,
        a.DisplayName,
        a.CompanyName,
        a.AccountMode,
        a.CreditLimitCents,
        COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0) AS BalanceCents,
        CASE
            WHEN a.AccountMode = N''Prepaid''
                THEN COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0)
            ELSE 0
        END AS AvailablePrepaidCents,
        CASE
            WHEN COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0) < 0
                THEN -(COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0))
            ELSE 0
        END AS OutstandingCents
    FROM dbo.ExternalAccounts a
    LEFT JOIN LedgerTotals l ON l.ExternalAccountID = a.ExternalAccountID
    LEFT JOIN LunchTotals x ON x.ExternalAccountID = a.ExternalAccountID;
');

COMMIT TRANSACTION;
