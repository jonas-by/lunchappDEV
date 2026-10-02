/*
    Lunch App / Café Kiosk
    SQL change record for 2026-10-02

    IMPORTANT:
    No new production DDL migration was applied during today's reporting,
    landing-page or lunch-kiosk work.

    Today's SQL-facing changes were application/query changes:
      1. Reporting reads dbo.KioskSales and dbo.KioskSaleLines.
      2. Payroll groups completed Employee sales by EmployeeNo.
      3. External invoicing groups completed External sales by ExternalAccountID.
      4. Finnish calendar dates are calculated from UTC SaleTime using
         FLE Standard Time.
      5. The Overview query was corrected by converting DATE parameters to
         DATETIME2 before applying AT TIME ZONE.

    This file exists so the handover explicitly records that no hidden schema
    change must be replayed. The verification queries below are read-only.
*/

SET NOCOUNT ON;

PRINT 'Café Kiosk SQL verification, 2026-10-02';

/* Expected core objects used by the current implementation. */
SELECT
    RequiredObject = v.ObjectName,
    ObjectExists = CASE WHEN OBJECT_ID(v.ObjectName, 'U') IS NOT NULL THEN 1 ELSE 0 END
FROM (VALUES
    ('dbo.Employees'),
    ('dbo.KioskProducts'),
    ('dbo.KioskLayouts'),
    ('dbo.KioskLayoutItems'),
    ('dbo.ExternalAccounts'),
    ('dbo.KioskCards'),
    ('dbo.KioskSales'),
    ('dbo.KioskSaleLines')
) AS v(ObjectName)
ORDER BY v.ObjectName;

/* Columns required by reporting. */
SELECT
    TableName = c.TABLE_NAME,
    ColumnName = c.COLUMN_NAME,
    DataType = c.DATA_TYPE,
    IsNullable = c.IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS AS c
WHERE c.TABLE_SCHEMA = 'dbo'
  AND c.TABLE_NAME IN
  (
      'KioskSales',
      'KioskSaleLines',
      'ExternalAccounts',
      'KioskCards',
      'KioskProducts'
  )
ORDER BY c.TABLE_NAME, c.ORDINAL_POSITION;

/* Completed sales totals used to cross-check Overview. */
SELECT
    TotalSalesCents = COALESCE(SUM(CONVERT(BIGINT, s.TotalCents)), 0),
    TransactionCount = COUNT_BIG(*),
    EmployeeSalesCents = COALESCE(SUM(CASE WHEN s.OwnerType = N'Employee' THEN CONVERT(BIGINT, s.TotalCents) ELSE 0 END), 0),
    ExternalSalesCents = COALESCE(SUM(CASE WHEN s.OwnerType = N'External' THEN CONVERT(BIGINT, s.TotalCents) ELSE 0 END), 0)
FROM dbo.KioskSales AS s
WHERE s.Status = N'Completed';

/* Completed line totals used to cross-check products sold and revenue. */
SELECT
    ProductQuantity = COALESCE(SUM(CONVERT(BIGINT, sl.Quantity)), 0),
    LineSalesCents = COALESCE(SUM(CONVERT(BIGINT, sl.LineTotalCents)), 0)
FROM dbo.KioskSaleLines AS sl
INNER JOIN dbo.KioskSales AS s ON s.SaleID = sl.SaleID
WHERE s.Status = N'Completed';

/* Correct Finnish-local date boundary pattern used by Overview. */
DECLARE @ExampleFromDate DATE = '2026-10-01';
DECLARE @ExampleToDate DATE = '2026-10-02';

SELECT
    FromUtc = CONVERT
    (
        DATETIME2,
        CAST(CAST(@ExampleFromDate AS DATE) AS DATETIME2)
            AT TIME ZONE 'FLE Standard Time'
            AT TIME ZONE 'UTC'
    ),
    ToUtcExclusive = CONVERT
    (
        DATETIME2,
        CAST(DATEADD(DAY, 1, CAST(@ExampleToDate AS DATE)) AS DATETIME2)
            AT TIME ZONE 'FLE Standard Time'
            AT TIME ZONE 'UTC'
    );

/*
    Planned, NOT APPLIED today:

    - External lunch-order ownership columns/model
    - External-account billing metadata such as BusinessID and BillingEmail
    - Report-run audit table
    - Product-image history table

    Do not uncomment speculative ALTER TABLE statements without first agreeing
    the data model and updating the corresponding APIs atomically.
*/
