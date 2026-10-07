# Database Changes 2026-10-07

## Columns added

```sql
ALTER TABLE dbo.Orders
ADD CardID INT NULL;

ALTER TABLE dbo.SaladOrders
ADD CardID INT NULL;
```

The columns are nullable because employee and historical rows do not require a kiosk card.

## Foreign keys added

```sql
ALTER TABLE dbo.Orders
ADD CONSTRAINT FK_Orders_KioskCards
FOREIGN KEY (CardID)
REFERENCES dbo.KioskCards(CardID);

ALTER TABLE dbo.SaladOrders
ADD CONSTRAINT FK_SaladOrders_KioskCards
FOREIGN KEY (CardID)
REFERENCES dbo.KioskCards(CardID);
```

## Unique index changes

The old external-account uniqueness indexes were incompatible with multiple cards per account.

Dropped when present:

```text
UX_Orders_External_Date_Meal
UX_SaladOrders_External_Date_Salad
```

Created:

```sql
CREATE UNIQUE INDEX UX_Orders_Card_Date_Meal
    ON dbo.Orders(CardID, MenuDate, OrderedMealID)
    WHERE CardID IS NOT NULL;

CREATE UNIQUE INDEX UX_SaladOrders_Card_Date_Salad
    ON dbo.SaladOrders(CardID, MenuDate, SaladID)
    WHERE CardID IS NOT NULL;
```

## Existing objects verified

### `dbo.KioskCards`

Relevant columns:

- `CardID`
- `CardNumber`
- `ExternalAccountID`
- `CardHolderName`
- `OwnerType`
- `IsActive`
- validity fields

### `dbo.ExternalAccountLedger`

A completed café sale creates a negative `Purchase` entry linked through `SaleID`.

Relevant observed columns:

- `LedgerEntryID`
- `ExternalAccountID`
- `EntryTime`
- `EntryType`
- `AmountCents`
- `SaleID`
- `Description`
- `CreatedBy`
- reversal reference

### `dbo.KioskSales`

Relevant observed columns:

- `SaleID`
- `CardID`
- `OwnerType`
- `EmployeeNo`
- `ExternalAccountID`
- `SaleTime`
- `TotalCents`
- `Status`
- `CreatedBy`
- void fields
- `RequestID`

### `dbo.vwExternalAccountBalances`

Observed result columns:

- `ExternalAccountID`
- `DisplayName`
- `CompanyName`
- `AccountMode`
- `CreditLimitCents`
- `BalanceCents`
- `AvailablePrepaidCents`
- `OutstandingCents`

The view remains unchanged during this session.

## Historical data decision

No automatic backfill was performed for historical external order rows where CardID is NULL. Assigning an arbitrary card would create false traceability.

