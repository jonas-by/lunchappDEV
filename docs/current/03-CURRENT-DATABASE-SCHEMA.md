# Current database schema

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Extracted DEV schema

### Extraction identity and decoding

`lunchappDEV/docs/05-sql/00-preflight.csv` reports server lunchappsql, database lunchappdb-dev, schema dbo, compatibility level **170**, collation **SQL_Latin1_General_CP1_CI_AS**, recovery model **FULL**, containment **NONE**, database creation 2026-09-25 06:46:02.527 and extraction timestamp above. Executing login/user names are intentionally not repeated; extraction ran in administrator context. Preflight omits engine version/build, database size, row counts and full Azure SQL database properties.

All CSV files are semicolon-delimited with no header. Length values for character columns are rendered below as exported declared sizes (e.g. nvarchar(255)); the extractor query/header is not supplied. Values including odd 255 are clearly not safe to halve as if they were unprocessed sys.columns byte lengths. Type inference is corroborated by migrations and API parameter declarations where available; preserve original length/precision/scale fields in the tables rather than silently changing them. datetime2 scale is rendered explicitly. Column ordinals are preserved, including the dropped-column gap in Orders. Timestamp means SQL rowversion. SQL NULL metadata is distinguished from nullable=true. Table columns here do not include view result-column metadata because that extraction was not supplied; view output lists are evidenced by complete definitions.

Detailed inventories are generated directly from every extraction below and validated by matching table/object/constraint/index/FK sets. No DDL or sample row data is synthesized as a substitute for the extraction.

### Reconciled counts and extraction row coverage
| Measure | Count | Evidence |
| --- | --- | --- |
| CHECK_CONSTRAINT | 51 | 10-documentation-summary.csv |
| DEFAULT_CONSTRAINT | 43 | 10-documentation-summary.csv |
| FOREIGN_KEY | 34 | 10-documentation-summary.csv |
| INDEX_EXCLUDING_HEAP | 68 | 10-documentation-summary.csv |
| PROCEDURE | 0 | 10-documentation-summary.csv |
| SEQUENCE | 0 | 10-documentation-summary.csv |
| SQL_FUNCTION | 0 | 10-documentation-summary.csv |
| SYNONYM | 0 | 10-documentation-summary.csv |
| TRIGGER | 0 | 10-documentation-summary.csv |
| USER_DEFINED_TYPE | 0 | 10-documentation-summary.csv |
| USER_TABLE | 27 | 10-documentation-summary.csv |
| VIEW | 2 | 10-documentation-summary.csv |
| TABLE_COLUMNS | 205 | 02-tables-columns-2.csv |
| PRIMARY_KEY_CONSTRAINT | 27 | 01-objects.csv / 03-constraints.csv |
| UNIQUE_CONSTRAINT | 9 | 01-objects.csv / 03-constraints.csv |
| OBJECT_REGISTRY_ROWS | 193 | 01-objects.csv |
| DEPENDENCY_ROWS | 104 | 08-dependencies-fixed.csv |
| EXPLICIT_PERMISSION_ROWS | 254 | 09-security-metadata-1.csv |
| ROLE_MEMBERSHIP_ROWS | 1 | 09-security-metadata-2.csv |

### All tables and columns
Source: `lunchappDEV/docs/05-sql/02-tables-columns-1.csv` and `lunchappDEV/docs/05-sql/02-tables-columns-2.csv`, `lunchappDEV/docs/05-sql/03-constraints.csv`, `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv` and `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv`, `lunchappDEV/docs/05-sql/05-indexes-1.csv` and `lunchappDEV/docs/05-sql/05-indexes-2.csv`. Every table is dbo. Exported length is retained alongside type precision/scale. Character column collation: SQL_Latin1_General_CP1_CI_AS throughout; non-character collation is NULL. All hidden/masked flags are 0 and generated-always description NOT_APPLICABLE. All identity columns have seed/increment 1/1; identity-state/current counters are not exported. All noncomputed columns have computed flag 0 and NULL computed definition/persistence. Timestamp is not a date/time.
#### dbo.Balances
Created `2026-09-25 07:08:51.473`; modified `2026-09-25 07:08:51.473`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | EmployeeNo | int | 4 | 10/0 | NO | — | None | None |
| 2 | Balance | decimal(10,2) | 9 | 10/2 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| PK__Balances__7AD0F1B69286B922 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK__Balances__Employ__09A971A2 | EmployeeNo -> dbo.Employees.EmployeeNo | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__Balances__7AD0F1B69286B922 | 1 | CLUSTERED | 1/1/0 | EmployeeNo ASC | None | None | 0/0 |

#### dbo.DayMeals
Created `2026-09-28 07:30:26.090`; modified `2026-09-28 07:30:26.090`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | DayMealID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | MenuDayID | int | 4 | 10/0 | NO | — | None | None |
| 3 | MealID | int | 4 | 10/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| PK_DayMeals | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_DayMeals_Day_Meal | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_DayMeals_Meals | MealID -> dbo.Meals.MealID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_DayMeals_MenuDays | MenuDayID -> dbo.MenuDays.MenuDayID | CASCADE | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_DayMeals | 1 | CLUSTERED | 1/1/0 | DayMealID ASC | None | None | 0/0 |
| UQ_DayMeals_Day_Meal | 2 | NONCLUSTERED | 1/0/1 | MenuDayID ASC, MealID ASC | None | None | 0/0 |

#### dbo.Employees
Created `2026-09-25 06:59:07.110`; modified `2026-10-05 08:25:53.583`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | EmployeeNo | int | 4 | 10/0 | NO | — | None | None |
| 2 | FirstName | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 3 | LastName | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 4 | Email | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 5 | CardNumber | nvarchar(50) | 50 | 0/0 | YES | — | None | None |
| 6 | Active | bit | 1 | 1/0 | YES | — | ((1)) [DF__Employees__Activ__0A9D95DB] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| DF__Employees__Activ__0A9D95DB | DEFAULT_CONSTRAINT | Active = ((1)) | N/A |
| PK__Employee__7AD0F1B670ECEDB0 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__Employee__7AD0F1B670ECEDB0 | 1 | CLUSTERED | 1/1/0 | EmployeeNo ASC | None | None | 0/0 |
| UX_Employees_CardNumber | 4 | NONCLUSTERED | 1/0/0 | CardNumber ASC | None | ([CardNumber] IS NOT NULL) | 0/0 |

#### dbo.ExternalAccountLedger
Created `2026-10-01 12:10:28.647`; modified `2026-10-01 12:10:28.663`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | LedgerEntryID | bigint | 8 | 19/0 | NO | IDENTITY(1,1) | None | None |
| 2 | ExternalAccountID | int | 4 | 10/0 | NO | — | None | None |
| 3 | EntryTime | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_ExternalAccountLedger_EntryTime] | None |
| 4 | EntryType | nvarchar(30) | 30 | 0/0 | NO | — | None | None |
| 5 | AmountCents | int | 4 | 10/0 | NO | — | None | None |
| 6 | SaleID | bigint | 8 | 19/0 | YES | — | None | None |
| 7 | SettlementReference | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 8 | InvoiceNumber | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 9 | Description | nvarchar(500) | 500 | 0/0 | YES | — | None | None |
| 10 | CreatedBy | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 11 | ReversesLedgerEntryID | bigint | 8 | 19/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_ExternalAccountLedger_Amount | CHECK_CONSTRAINT | ([AmountCents]<>(0)) | 0 |
| CK_ExternalAccountLedger_CreatedBy | CHECK_CONSTRAINT | (len(ltrim(rtrim([CreatedBy])))>(0)) | 0 |
| CK_ExternalAccountLedger_EntryType | CHECK_CONSTRAINT | ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment') | 0 |
| CK_ExternalAccountLedger_NoSelfReversal | CHECK_CONSTRAINT | ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID]) | 0 |
| CK_ExternalAccountLedger_PurchaseSale | CHECK_CONSTRAINT | ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL) | 0 |
| CK_ExternalAccountLedger_ReversalLink | CHECK_CONSTRAINT | ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL) | 0 |
| DF_ExternalAccountLedger_EntryTime | DEFAULT_CONSTRAINT | EntryTime = (sysutcdatetime()) | N/A |
| PK_ExternalAccountLedger | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_ExternalAccountLedger_Accounts | ExternalAccountID -> dbo.ExternalAccounts.ExternalAccountID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_ExternalAccountLedger_Reversal | ReversesLedgerEntryID -> dbo.ExternalAccountLedger.LedgerEntryID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_ExternalAccountLedger_Sales | SaleID -> dbo.KioskSales.SaleID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_ExternalAccountLedger | 1 | CLUSTERED | 1/1/0 | LedgerEntryID ASC | None | None | 0/0 |
| IX_ExternalAccountLedger_AccountTime | 2 | NONCLUSTERED | 0/0/0 | ExternalAccountID ASC, EntryTime ASC, LedgerEntryID ASC | EntryType, AmountCents, SaleID, SettlementReference, InvoiceNumber | None | 0/0 |
| IX_ExternalAccountLedger_SaleID | 3 | NONCLUSTERED | 0/0/0 | SaleID ASC | ExternalAccountID, EntryType, AmountCents | ([SaleID] IS NOT NULL) | 0/0 |
| UX_ExternalAccountLedger_PurchaseSale | 4 | NONCLUSTERED | 1/0/0 | SaleID ASC | None | ([EntryType]=N'Purchase' AND [SaleID] IS NOT NULL) | 0/0 |
| UX_ExternalAccountLedger_ReversesEntry | 5 | NONCLUSTERED | 1/0/0 | ReversesLedgerEntryID ASC | None | ([ReversesLedgerEntryID] IS NOT NULL) | 0/0 |

#### dbo.ExternalAccounts
Created `2026-10-01 12:10:28.630`; modified `2026-10-05 06:34:52.330`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ExternalAccountID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | DisplayName | nvarchar(150) | 150 | 0/0 | NO | — | None | None |
| 3 | CompanyName | nvarchar(200) | 200 | 0/0 | YES | — | None | None |
| 4 | AccountMode | nvarchar(20) | 20 | 0/0 | NO | — | None | None |
| 5 | ExternalReference | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 6 | InvoiceReference | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 7 | ContactName | nvarchar(150) | 150 | 0/0 | YES | — | None | None |
| 8 | ContactEmail | nvarchar(254) | 254 | 0/0 | YES | — | None | None |
| 9 | CreditLimitCents | int | 4 | 10/0 | YES | — | None | None |
| 10 | IsActive | bit | 1 | 1/0 | NO | — | ((1)) [DF_ExternalAccounts_IsActive] | None |
| 11 | ValidFrom | date | 3 | 10/0 | YES | — | None | None |
| 12 | ValidUntil | date | 3 | 10/0 | YES | — | None | None |
| 13 | Notes | nvarchar(1000) | 1000 | 0/0 | YES | — | None | None |
| 14 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_ExternalAccounts_CreatedAt] | None |
| 15 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_ExternalAccounts_UpdatedAt] | None |
| 16 | BalanceCents | int | 4 | 10/0 | NO | — | ((0)) [DF_ExternalAccounts_BalanceCents] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_ExternalAccounts_AccountMode | CHECK_CONSTRAINT | ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid') | 0 |
| CK_ExternalAccounts_CreditLimit | CHECK_CONSTRAINT | ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0)) | 0 |
| CK_ExternalAccounts_DisplayName | CHECK_CONSTRAINT | (len(ltrim(rtrim([DisplayName])))>(0)) | 0 |
| CK_ExternalAccounts_ModeCreditLimit | CHECK_CONSTRAINT | ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0)) | 0 |
| CK_ExternalAccounts_Validity | CHECK_CONSTRAINT | ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil]) | 0 |
| DF_ExternalAccounts_BalanceCents | DEFAULT_CONSTRAINT | BalanceCents = ((0)) | N/A |
| DF_ExternalAccounts_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_ExternalAccounts_IsActive | DEFAULT_CONSTRAINT | IsActive = ((1)) | N/A |
| DF_ExternalAccounts_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK_ExternalAccounts | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_ExternalAccounts | 1 | CLUSTERED | 1/1/0 | ExternalAccountID ASC | None | None | 0/0 |
| IX_ExternalAccounts_ActiveMode | 2 | NONCLUSTERED | 0/0/0 | IsActive ASC, AccountMode ASC, DisplayName ASC | CompanyName, ValidFrom, ValidUntil, CreditLimitCents | None | 0/0 |

#### dbo.ExternalLunchPrices
Created `2026-10-05 11:53:50.010`; modified `2026-10-05 11:53:50.010`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ExternalLunchPriceID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | PriceCents | int | 4 | 10/0 | NO | — | None | None |
| 3 | ValidFrom | date | 3 | 10/0 | NO | — | None | None |
| 4 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_ExternalLunchPrices_CreatedAt] | None |
| 5 | CreatedBy | nvarchar(255) | 255 | 0/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_ExternalLunchPrices_PriceCents | CHECK_CONSTRAINT | ([PriceCents]>(0)) | 0 |
| DF_ExternalLunchPrices_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| PK_ExternalLunchPrices | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_ExternalLunchPrices_ValidFrom | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_ExternalLunchPrices | 1 | CLUSTERED | 1/1/0 | ExternalLunchPriceID ASC | None | None | 0/0 |
| UQ_ExternalLunchPrices_ValidFrom | 2 | NONCLUSTERED | 1/0/1 | ValidFrom ASC | None | None | 0/0 |

#### dbo.GuestOrders
Created `2026-09-28 10:33:23.397`; modified `2026-10-01 10:15:42.667`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | GuestOrderID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | HostEmployeeNo | int | 4 | 10/0 | NO | — | None | None |
| 3 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | OrderedMealID | int | 4 | 10/0 | NO | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | WorkTask | nvarchar(200) | 200 | 0/0 | NO | — | None | None |
| 7 | OrderTime | datetime2(7) | 8 | 27/7 | NO | — | (sysutcdatetime()) [DF_GuestOrders_OrderTime] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| DF_GuestOrders_OrderTime | DEFAULT_CONSTRAINT | OrderTime = (sysutcdatetime()) | N/A |
| PK__GuestOrd__773A898A08AB97EF | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_GuestOrders_Employee | HostEmployeeNo -> dbo.Employees.EmployeeNo | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_GuestOrders_Meal | OrderedMealID -> dbo.Meals.MealID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__GuestOrd__773A898A08AB97EF | 1 | CLUSTERED | 1/1/0 | GuestOrderID ASC | None | None | 0/0 |

#### dbo.GuestSaladOrders
Created `2026-10-01 10:15:42.667`; modified `2026-10-01 11:43:05.670`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | GuestSaladOrderID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | HostEmployeeNo | int | 4 | 10/0 | NO | — | None | None |
| 3 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | SaladID | int | 4 | 10/0 | NO | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | WorkTask | nvarchar(200) | 200 | 0/0 | NO | — | None | None |
| 7 | OrderTime | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_GuestSaladOrders_OrderTime] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_GuestSaladOrders_Quantity | CHECK_CONSTRAINT | ([Quantity]>=(1) AND [Quantity]<=(50)) | 0 |
| DF_GuestSaladOrders_OrderTime | DEFAULT_CONSTRAINT | OrderTime = (sysutcdatetime()) | N/A |
| PK_GuestSaladOrders | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_GuestSaladOrders_HostDateSalad | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_GuestSaladOrders_Salads | SaladID -> dbo.Salads.SaladID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_GuestSaladOrders | 1 | CLUSTERED | 1/1/0 | GuestSaladOrderID ASC | None | None | 0/0 |
| UQ_GuestSaladOrders_HostDateSalad | 2 | NONCLUSTERED | 1/0/1 | HostEmployeeNo ASC, MenuDate ASC, SaladID ASC | None | None | 0/0 |
| IX_GuestSaladOrders_Date | 3 | NONCLUSTERED | 0/0/0 | MenuDate ASC | HostEmployeeNo, SaladID, Quantity, WorkTask | None | 0/0 |

#### dbo.ImageAssets
Created `2026-10-06 11:24:21.687`; modified `2026-10-06 11:24:58.597`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ImageAssetID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | BlobName | nvarchar(500) | 500 | 0/0 | NO | — | None | None |
| 3 | OriginalFileName | nvarchar(255) | 255 | 0/0 | NO | — | None | None |
| 4 | ContentType | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 5 | FileSize | bigint | 8 | 19/0 | YES | — | None | None |
| 6 | Width | int | 4 | 10/0 | YES | — | None | None |
| 7 | Height | int | 4 | 10/0 | YES | — | None | None |
| 8 | CreatedAt | datetime2(7) | 8 | 27/7 | NO | — | (sysutcdatetime()) [DF__ImageAsse__Creat__6D6238AF] | None |
| 9 | CreatedBy | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 10 | DisplayName | nvarchar(255) | 255 | 0/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| DF__ImageAsse__Creat__6D6238AF | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| PK__ImageAss__16EED56DA638C083 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__ImageAss__16EED56DA638C083 | 1 | CLUSTERED | 1/1/0 | ImageAssetID ASC | None | None | 0/0 |

#### dbo.KioskCards
Created `2026-10-01 12:10:28.633`; modified `2026-10-07 07:16:46.487`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | CardID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | CardNumber | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 3 | OwnerType | nvarchar(20) | 20 | 0/0 | NO | — | None | None |
| 4 | EmployeeNo | int | 4 | 10/0 | YES | — | None | None |
| 5 | ExternalAccountID | int | 4 | 10/0 | YES | — | None | None |
| 6 | DisplayNameOverride | nvarchar(150) | 150 | 0/0 | YES | — | None | None |
| 7 | IsActive | bit | 1 | 1/0 | NO | — | ((1)) [DF_KioskCards_IsActive] | None |
| 8 | ValidFrom | datetime2(0) | 6 | 19/0 | YES | — | None | None |
| 9 | ValidUntil | datetime2(0) | 6 | 19/0 | YES | — | None | None |
| 10 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskCards_CreatedAt] | None |
| 11 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskCards_UpdatedAt] | None |
| 12 | CardHolderName | nvarchar(200) | 200 | 0/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskCards_CardNumber | CHECK_CONSTRAINT | (len(ltrim(rtrim([CardNumber])))>(0)) | 0 |
| CK_KioskCards_Owner | CHECK_CONSTRAINT | ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL) | 0 |
| CK_KioskCards_OwnerType | CHECK_CONSTRAINT | ([OwnerType]=N'External' OR [OwnerType]=N'Employee') | 0 |
| CK_KioskCards_Validity | CHECK_CONSTRAINT | ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil]) | 0 |
| DF_KioskCards_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_KioskCards_IsActive | DEFAULT_CONSTRAINT | IsActive = ((1)) | N/A |
| DF_KioskCards_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK_KioskCards | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_KioskCards_CardNumber | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_KioskCards_ExternalAccounts | ExternalAccountID -> dbo.ExternalAccounts.ExternalAccountID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_KioskCards | 1 | CLUSTERED | 1/1/0 | CardID ASC | None | None | 0/0 |
| UQ_KioskCards_CardNumber | 2 | NONCLUSTERED | 1/0/1 | CardNumber ASC | None | None | 0/0 |
| IX_KioskCards_EmployeeNo | 3 | NONCLUSTERED | 0/0/0 | EmployeeNo ASC | None | ([EmployeeNo] IS NOT NULL) | 0/0 |
| IX_KioskCards_ExternalAccountID | 4 | NONCLUSTERED | 0/0/0 | ExternalAccountID ASC | None | ([ExternalAccountID] IS NOT NULL) | 0/0 |
| IX_KioskCards_ActiveValidity | 5 | NONCLUSTERED | 0/0/0 | IsActive ASC, ValidFrom ASC, ValidUntil ASC | CardNumber, OwnerType, EmployeeNo, ExternalAccountID | None | 0/0 |

#### dbo.KioskLayoutItems
Created `2026-10-02 06:55:38.857`; modified `2026-10-02 06:55:38.857`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | LayoutItemID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | LayoutID | int | 4 | 10/0 | NO | — | None | None |
| 3 | ProductID | int | 4 | 10/0 | NO | — | None | None |
| 4 | ColumnNo | tinyint | 1 | 3/0 | NO | — | None | None |
| 5 | RowNo | smallint | 2 | 5/0 | NO | — | None | None |
| 6 | IsVisible | bit | 1 | 1/0 | NO | — | ((1)) [DF_KioskLayoutItems_IsVisible] | None |
| 7 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskLayoutItems_CreatedAt] | None |
| 8 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskLayoutItems_UpdatedAt] | None |
| 9 | RowVersion | timestamp | 8 | 0/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskLayoutItems_ColumnNo | CHECK_CONSTRAINT | ([ColumnNo]=(2) OR [ColumnNo]=(1)) | 0 |
| CK_KioskLayoutItems_RowNo | CHECK_CONSTRAINT | ([RowNo]>=(1)) | 0 |
| DF_KioskLayoutItems_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_KioskLayoutItems_IsVisible | DEFAULT_CONSTRAINT | IsVisible = ((1)) | N/A |
| DF_KioskLayoutItems_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK_KioskLayoutItems | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_KioskLayoutItems_Position | UNIQUE_CONSTRAINT | index id 2 | N/A |
| UQ_KioskLayoutItems_Product | UNIQUE_CONSTRAINT | index id 3 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_KioskLayoutItems_Layout | LayoutID -> dbo.KioskLayouts.LayoutID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_KioskLayoutItems_Product | ProductID -> dbo.KioskProducts.ProductID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_KioskLayoutItems | 1 | CLUSTERED | 1/1/0 | LayoutItemID ASC | None | None | 0/0 |
| UQ_KioskLayoutItems_Position | 2 | NONCLUSTERED | 1/0/1 | LayoutID ASC, ColumnNo ASC, RowNo ASC | None | None | 0/0 |
| UQ_KioskLayoutItems_Product | 3 | NONCLUSTERED | 1/0/1 | LayoutID ASC, ProductID ASC | None | None | 0/0 |

#### dbo.KioskLayouts
Created `2026-10-02 06:55:38.820`; modified `2026-10-02 06:58:55.770`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | LayoutID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | LayoutName | nvarchar(150) | 150 | 0/0 | NO | — | None | None |
| 3 | IsActive | bit | 1 | 1/0 | NO | — | ((1)) [DF_KioskLayouts_IsActive] | None |
| 4 | IsDefault | bit | 1 | 1/0 | NO | — | ((0)) [DF_KioskLayouts_IsDefault] | None |
| 5 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskLayouts_CreatedAt] | None |
| 6 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskLayouts_UpdatedAt] | None |
| 7 | RowVersion | timestamp | 8 | 0/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskLayouts_LayoutName | CHECK_CONSTRAINT | (len(ltrim(rtrim([LayoutName])))>(0)) | 0 |
| DF_KioskLayouts_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_KioskLayouts_IsActive | DEFAULT_CONSTRAINT | IsActive = ((1)) | N/A |
| DF_KioskLayouts_IsDefault | DEFAULT_CONSTRAINT | IsDefault = ((0)) | N/A |
| DF_KioskLayouts_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK_KioskLayouts | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_KioskLayouts_LayoutName | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_KioskLayouts | 1 | CLUSTERED | 1/1/0 | LayoutID ASC | None | None | 0/0 |
| UQ_KioskLayouts_LayoutName | 2 | NONCLUSTERED | 1/0/1 | LayoutName ASC | None | None | 0/0 |
| UX_KioskLayouts_OneDefault | 3 | NONCLUSTERED | 1/0/0 | IsDefault ASC | None | ([IsDefault]=(1)) | 0/0 |

#### dbo.KioskProducts
Created `2026-09-25 07:08:51.450`; modified `2026-10-06 11:24:34.703`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ProductID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | NameEN | nvarchar(255) | 255 | 0/0 | NO | — | None | None |
| 3 | NameSV | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 4 | NameFI | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 5 | Price | decimal(10,2) | 9 | 10/2 | NO | — | None | None |
| 6 | Active | bit | 1 | 1/0 | NO | — | ((1)) [DF__KioskProd__Activ__02084FDA] | None |
| 7 | Icon | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 8 | ImageUrl | nvarchar(500) | 500 | 0/0 | YES | — | None | None |
| 9 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskProducts_CreatedAt] | None |
| 10 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskProducts_UpdatedAt] | None |
| 11 | RowVersion | timestamp | 8 | 0/0 | NO | — | None | None |
| 12 | ImageAssetID | int | 4 | 10/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskProducts_NameEN | CHECK_CONSTRAINT | (len(ltrim(rtrim([NameEN])))>(0)) | 0 |
| CK_KioskProducts_Price | CHECK_CONSTRAINT | ([Price]>=(0)) | 0 |
| DF__KioskProd__Activ__02084FDA | DEFAULT_CONSTRAINT | Active = ((1)) | N/A |
| DF_KioskProducts_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_KioskProducts_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK__KioskPro__B40CC6EDFBBB280B | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_KioskProducts_ImageAssets | ImageAssetID -> dbo.ImageAssets.ImageAssetID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__KioskPro__B40CC6EDFBBB280B | 1 | CLUSTERED | 1/1/0 | ProductID ASC | None | None | 0/0 |

#### dbo.KioskSaleLines
Created `2026-10-01 12:10:28.643`; modified `2026-10-02 07:49:36.293`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | SaleLineID | bigint | 8 | 19/0 | NO | IDENTITY(1,1) | None | None |
| 2 | SaleID | bigint | 8 | 19/0 | NO | — | None | None |
| 3 | ProductID | int | 4 | 10/0 | NO | — | None | None |
| 4 | ProductNameSnapshot | nvarchar(150) | 150 | 0/0 | NO | — | None | None |
| 5 | UnitPriceCents | int | 4 | 10/0 | NO | — | None | None |
| 6 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 7 | LineTotalCents | bigint | 8 | 19/0 | YES | — | None | PERSISTED (CONVERT([bigint],[UnitPriceCents])*CONVERT([bigint],[Quantity])) |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskSaleLines_LineTotalCents | CHECK_CONSTRAINT | ([LineTotalCents]=CONVERT([bigint],[UnitPriceCents])*[Quantity]) | 0 |
| CK_KioskSaleLines_ProductName | CHECK_CONSTRAINT | (len(ltrim(rtrim([ProductNameSnapshot])))>(0)) | 0 |
| CK_KioskSaleLines_Quantity | CHECK_CONSTRAINT | ([Quantity]>=(1) AND [Quantity]<=(100)) | 0 |
| CK_KioskSaleLines_UnitPrice | CHECK_CONSTRAINT | ([UnitPriceCents]>=(0)) | 0 |
| CK_KioskSaleLines_UnitPriceCents | CHECK_CONSTRAINT | ([UnitPriceCents]>=(0)) | 0 |
| PK_KioskSaleLines | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_KioskSaleLines_Products | ProductID -> dbo.KioskProducts.ProductID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_KioskSaleLines_Sales | SaleID -> dbo.KioskSales.SaleID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_KioskSaleLines | 1 | CLUSTERED | 1/1/0 | SaleLineID ASC | None | None | 0/0 |
| IX_KioskSaleLines_SaleID | 2 | NONCLUSTERED | 0/0/0 | SaleID ASC | ProductID, ProductNameSnapshot, UnitPriceCents, Quantity, LineTotalCents | None | 0/0 |
| IX_KioskSaleLines_ProductID | 3 | NONCLUSTERED | 0/0/0 | ProductID ASC, SaleID ASC | Quantity, UnitPriceCents, LineTotalCents | None | 0/0 |

#### dbo.KioskSales
Created `2026-10-01 12:10:28.640`; modified `2026-10-02 08:10:52.517`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | SaleID | bigint | 8 | 19/0 | NO | IDENTITY(1,1) | None | None |
| 2 | CardID | int | 4 | 10/0 | YES | — | None | None |
| 3 | OwnerType | nvarchar(20) | 20 | 0/0 | NO | — | None | None |
| 4 | EmployeeNo | int | 4 | 10/0 | YES | — | None | None |
| 5 | ExternalAccountID | int | 4 | 10/0 | YES | — | None | None |
| 6 | SaleTime | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_KioskSales_SaleTime] | None |
| 7 | TotalCents | int | 4 | 10/0 | NO | — | None | None |
| 8 | Status | nvarchar(30) | 30 | 0/0 | NO | — | (N'Completed') [DF_KioskSales_Status] | None |
| 9 | CreatedBy | nvarchar(100) | 100 | 0/0 | NO | — | (N'Kiosk') [DF_KioskSales_CreatedBy] | None |
| 10 | VoidedAt | datetime2(0) | 6 | 19/0 | YES | — | None | None |
| 11 | VoidedBy | nvarchar(100) | 100 | 0/0 | YES | — | None | None |
| 12 | VoidReason | nvarchar(500) | 500 | 0/0 | YES | — | None | None |
| 13 | RequestID | uniqueidentifier | 16 | 0/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_KioskSales_Owner | CHECK_CONSTRAINT | ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL) | 0 |
| CK_KioskSales_OwnerReference | CHECK_CONSTRAINT | ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL AND [CardID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL AND [CardID] IS NOT NULL) | 0 |
| CK_KioskSales_OwnerType | CHECK_CONSTRAINT | ([OwnerType]=N'External' OR [OwnerType]=N'Employee') | 0 |
| CK_KioskSales_Status | CHECK_CONSTRAINT | ([Status]=N'Refunded' OR [Status]=N'PartiallyRefunded' OR [Status]=N'Voided' OR [Status]=N'Completed') | 0 |
| CK_KioskSales_TotalCents | CHECK_CONSTRAINT | ([TotalCents]>=(0)) | 0 |
| CK_KioskSales_VoidFields | CHECK_CONSTRAINT | ([Status]<>N'Voided' OR [VoidedAt] IS NOT NULL AND [VoidedBy] IS NOT NULL AND [VoidReason] IS NOT NULL) | 0 |
| DF_KioskSales_CreatedBy | DEFAULT_CONSTRAINT | CreatedBy = (N'Kiosk') | N/A |
| DF_KioskSales_SaleTime | DEFAULT_CONSTRAINT | SaleTime = (sysutcdatetime()) | N/A |
| DF_KioskSales_Status | DEFAULT_CONSTRAINT | Status = (N'Completed') | N/A |
| PK_KioskSales | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_KioskSales_Cards | CardID -> dbo.KioskCards.CardID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_KioskSales_ExternalAccounts | ExternalAccountID -> dbo.ExternalAccounts.ExternalAccountID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_KioskSales | 1 | CLUSTERED | 1/1/0 | SaleID ASC | None | None | 0/0 |
| IX_KioskSales_SaleTime | 2 | NONCLUSTERED | 0/0/0 | SaleTime DESC | CardID, OwnerType, EmployeeNo, ExternalAccountID, TotalCents, Status | None | 0/0 |
| IX_KioskSales_EmployeeNo | 3 | NONCLUSTERED | 0/0/0 | EmployeeNo ASC, SaleTime DESC | TotalCents, Status | ([EmployeeNo] IS NOT NULL) | 0/0 |
| IX_KioskSales_ExternalAccountID | 4 | NONCLUSTERED | 0/0/0 | ExternalAccountID ASC, SaleTime DESC | TotalCents, Status | ([ExternalAccountID] IS NOT NULL) | 0/0 |
| UX_KioskSales_RequestID | 5 | NONCLUSTERED | 1/0/0 | RequestID ASC | None | ([RequestID] IS NOT NULL) | 0/0 |

#### dbo.KioskTransactions
Created `2026-09-25 07:08:51.457`; modified `2026-09-25 07:08:51.457`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | TransactionID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | EmployeeNo | int | 4 | 10/0 | YES | — | None | None |
| 3 | ProductID | int | 4 | 10/0 | YES | — | None | None |
| 4 | Quantity | int | 4 | 10/0 | YES | — | None | None |
| 5 | Amount | decimal(10,2) | 9 | 10/2 | YES | — | None | None |
| 6 | TransactionTime | datetime2(7) | 8 | 27/7 | YES | — | (getdate()) [DF__KioskTran__Trans__04E4BC85] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| DF__KioskTran__Trans__04E4BC85 | DEFAULT_CONSTRAINT | TransactionTime = (getdate()) | N/A |
| PK__KioskTra__55433A4B01D2A8D1 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK__KioskTran__Emplo__05D8E0BE | EmployeeNo -> dbo.Employees.EmployeeNo | NO_ACTION | NO_ACTION | 0/0/0 |
| FK__KioskTran__Produ__06CD04F7 | ProductID -> dbo.KioskProducts.ProductID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__KioskTra__55433A4B01D2A8D1 | 1 | CLUSTERED | 1/1/0 | TransactionID ASC | None | None | 0/0 |

#### dbo.ManualLunchAdjustments
Created `2026-10-05 08:25:53.573`; modified `2026-10-05 08:25:53.583`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | AdjustmentID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | EmployeeNo | int | 4 | 10/0 | NO | — | None | None |
| 3 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | Quantity | int | 4 | 10/0 | NO | — | ((1)) [DF_ManualLunchAdjustments_Quantity] | None |
| 5 | Reason | nvarchar(250) | 250 | 0/0 | YES | — | None | None |
| 6 | CreatedBy | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 7 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_ManualLunchAdjustments_CreatedAt] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_ManualLunchAdjustments_Quantity | CHECK_CONSTRAINT | ([Quantity]>(0) AND [Quantity]<=(50)) | 0 |
| DF_ManualLunchAdjustments_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_ManualLunchAdjustments_Quantity | DEFAULT_CONSTRAINT | Quantity = ((1)) | N/A |
| PK_ManualLunchAdjustments | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_ManualLunchAdjustments_Employees | EmployeeNo -> dbo.Employees.EmployeeNo | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_ManualLunchAdjustments | 1 | CLUSTERED | 1/1/0 | AdjustmentID ASC | None | None | 0/0 |
| IX_ManualLunchAdjustments_MenuDate_EmployeeNo | 2 | NONCLUSTERED | 0/0/0 | MenuDate ASC, EmployeeNo ASC | None | None | 0/0 |

#### dbo.Meals
Created `2026-09-25 07:08:51.417`; modified `2026-09-28 12:17:08.820`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | MealID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | NameEN | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 3 | NameSV | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 4 | NameFI | nvarchar(255) | 255 | 0/0 | YES | — | None | None |
| 5 | Active | bit | 1 | 1/0 | YES | — | ((1)) [DF__Meals__Active__778AC167] | None |
| 6 | Category | nvarchar(20) | 20 | 0/0 | NO | — | ('Main') [DF_Meals_Category] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| DF__Meals__Active__778AC167 | DEFAULT_CONSTRAINT | Active = ((1)) | N/A |
| DF_Meals_Category | DEFAULT_CONSTRAINT | Category = ('Main') | N/A |
| PK__Meals__ACF6A65D46AC5673 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__Meals__ACF6A65D46AC5673 | 1 | CLUSTERED | 1/1/0 | MealID ASC | None | None | 0/0 |

#### dbo.Menu
Created `2026-09-28 06:14:51.210`; modified `2026-09-28 06:14:51.210`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | MenuID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 3 | MealID | int | 4 | 10/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| PK__Menu__C99ED2500D83E658 | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_Menu_Meals | MealID -> dbo.Meals.MealID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK__Menu__C99ED2500D83E658 | 1 | CLUSTERED | 1/1/0 | MenuID ASC | None | None | 0/0 |

#### dbo.MenuCycles
Created `2026-09-29 08:02:16.400`; modified `2026-09-29 08:02:16.450`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | MenuCycleID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | Name | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 3 | StartDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | NumberOfWeeks | tinyint | 1 | 3/0 | NO | — | None | None |
| 5 | Status | nvarchar(20) | 20 | 0/0 | NO | — | (N'Draft') [DF_MenuCycles_Status] | None |
| 6 | CreatedDate | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_MenuCycles_CreatedDate] | None |
| 7 | UpdatedDate | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_MenuCycles_UpdatedDate] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_MenuCycles_NumberOfWeeks | CHECK_CONSTRAINT | ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8)) | 0 |
| CK_MenuCycles_Status | CHECK_CONSTRAINT | ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft') | 0 |
| DF_MenuCycles_CreatedDate | DEFAULT_CONSTRAINT | CreatedDate = (sysutcdatetime()) | N/A |
| DF_MenuCycles_Status | DEFAULT_CONSTRAINT | Status = (N'Draft') | N/A |
| DF_MenuCycles_UpdatedDate | DEFAULT_CONSTRAINT | UpdatedDate = (sysutcdatetime()) | N/A |
| PK_MenuCycles | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_MenuCycles | 1 | CLUSTERED | 1/1/0 | MenuCycleID ASC | None | None | 0/0 |
| IX_MenuCycles_Status_StartDate | 2 | NONCLUSTERED | 0/0/0 | Status ASC, StartDate ASC | None | None | 0/0 |

#### dbo.MenuDays
Created `2026-09-28 07:30:26.087`; modified `2026-09-28 07:30:26.100`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | MenuDayID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | MenuWeekID | int | 4 | 10/0 | NO | — | None | None |
| 3 | DayNumber | tinyint | 1 | 3/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_MenuDays_DayNumber | CHECK_CONSTRAINT | ([DayNumber]>=(1) AND [DayNumber]<=(5)) | 0 |
| PK_MenuDays | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_MenuDays_Week_Day | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_MenuDays_MenuWeeks | MenuWeekID -> dbo.MenuWeeks.MenuWeekID | CASCADE | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_MenuDays | 1 | CLUSTERED | 1/1/0 | MenuDayID ASC | None | None | 0/0 |
| UQ_MenuDays_Week_Day | 2 | NONCLUSTERED | 1/0/1 | MenuWeekID ASC, DayNumber ASC | None | None | 0/0 |

#### dbo.MenuWeeks
Created `2026-09-28 07:30:26.083`; modified `2026-09-29 08:02:16.463`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | MenuWeekID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | WeekNumber | int | 4 | 10/0 | NO | — | None | None |
| 3 | CreatedDate | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_MenuWeeks_CreatedDate] | None |
| 4 | MenuCycleID | int | 4 | 10/0 | NO | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_MenuWeeks_WeekNumber | CHECK_CONSTRAINT | ([WeekNumber]>=(1) AND [WeekNumber]<=(8)) | 0 |
| DF_MenuWeeks_CreatedDate | DEFAULT_CONSTRAINT | CreatedDate = (sysutcdatetime()) | N/A |
| PK_MenuWeeks | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |
| UQ_MenuWeeks_Cycle_Week | UNIQUE_CONSTRAINT | index id 2 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_MenuWeeks_MenuCycles | MenuCycleID -> dbo.MenuCycles.MenuCycleID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_MenuWeeks | 1 | CLUSTERED | 1/1/0 | MenuWeekID ASC | None | None | 0/0 |
| UQ_MenuWeeks_Cycle_Week | 2 | NONCLUSTERED | 1/0/1 | MenuCycleID ASC, WeekNumber ASC | None | None | 0/0 |
| IX_MenuWeeks_MenuCycleID | 4 | NONCLUSTERED | 0/0/0 | MenuCycleID ASC | None | None | 0/0 |

#### dbo.OrderCancellations
Created `2026-09-29 10:21:22.797`; modified `2026-09-29 10:48:23.410`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | OrderCancellationID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | OrderType | nvarchar(20) | 20 | 0/0 | NO | — | None | None |
| 3 | OrderID | int | 4 | 10/0 | YES | — | None | None |
| 4 | GuestOrderID | int | 4 | 10/0 | YES | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | ReasonCode | nvarchar(50) | 50 | 0/0 | NO | — | None | None |
| 7 | ReasonText | nvarchar(500) | 500 | 0/0 | YES | — | None | None |
| 8 | CancelledBy | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 9 | CancelledAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_OrderCancellations_CancelledAt] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_OrderCancellations_OrderType | CHECK_CONSTRAINT | ([OrderType]=N'Guest' OR [OrderType]=N'Employee') | 0 |
| CK_OrderCancellations_Quantity | CHECK_CONSTRAINT | ([Quantity]>(0)) | 0 |
| CK_OrderCancellations_ReasonCode | CHECK_CONSTRAINT | ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS') | 0 |
| CK_OrderCancellations_Reference | CHECK_CONSTRAINT | ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL) | 0 |
| DF_OrderCancellations_CancelledAt | DEFAULT_CONSTRAINT | CancelledAt = (sysutcdatetime()) | N/A |
| PK_OrderCancellations | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_OrderCancellations_GuestOrders | GuestOrderID -> dbo.GuestOrders.GuestOrderID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_OrderCancellations_Orders | OrderID -> dbo.Orders.OrderID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_OrderCancellations | 1 | CLUSTERED | 1/1/0 | OrderCancellationID ASC | None | None | 0/0 |
| IX_OrderCancellations_OrderID | 2 | NONCLUSTERED | 0/0/0 | OrderID ASC | None | ([OrderID] IS NOT NULL) | 0/0 |
| IX_OrderCancellations_GuestOrderID | 3 | NONCLUSTERED | 0/0/0 | GuestOrderID ASC | None | ([GuestOrderID] IS NOT NULL) | 0/0 |
| IX_OrderCancellations_CancelledAt | 4 | NONCLUSTERED | 0/0/0 | CancelledAt ASC | None | None | 0/0 |
| IX_OrderCancellations_ReasonCode | 5 | NONCLUSTERED | 0/0/0 | ReasonCode ASC | None | None | 0/0 |

#### dbo.Orders
Created `2026-09-28 12:17:08.813`; modified `2026-10-07 08:14:48.223`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | OrderID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | EmployeeNo | int | 4 | 10/0 | YES | — | None | None |
| 3 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | OrderedMealID | int | 4 | 10/0 | NO | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | OrderTime | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_Orders_New_OrderTime] | None |
| 8 | ExternalAccountID | int | 4 | 10/0 | YES | — | None | None |
| 9 | CardID | int | 4 | 10/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_Orders_New_Quantity | CHECK_CONSTRAINT | ([Quantity]>=(1) AND [Quantity]<=(50)) | 0 |
| DF_Orders_New_OrderTime | DEFAULT_CONSTRAINT | OrderTime = (sysutcdatetime()) | N/A |
| PK_Orders_New | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_Orders_ExternalAccounts | ExternalAccountID -> dbo.ExternalAccounts.ExternalAccountID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_Orders_KioskCards | CardID -> dbo.KioskCards.CardID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_Orders_New_Employee | EmployeeNo -> dbo.Employees.EmployeeNo | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_Orders_New_Meal | OrderedMealID -> dbo.Meals.MealID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_Orders_New | 1 | CLUSTERED | 1/1/0 | OrderID ASC | None | None | 0/0 |
| UX_Orders_Employee_Date_Meal | 2 | NONCLUSTERED | 1/0/0 | EmployeeNo ASC, MenuDate ASC, OrderedMealID ASC | None | ([EmployeeNo] IS NOT NULL) | 0/0 |
| UX_Orders_Card_Date_Meal | 6 | NONCLUSTERED | 1/0/0 | CardID ASC, MenuDate ASC, OrderedMealID ASC | None | ([CardID] IS NOT NULL) | 0/0 |

#### dbo.SaladOrderCancellations
Created `2026-10-01 11:43:05.657`; modified `2026-10-01 11:43:05.690`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | SaladOrderCancellationID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | OrderType | nvarchar(20) | 20 | 0/0 | NO | — | None | None |
| 3 | SaladOrderID | int | 4 | 10/0 | YES | — | None | None |
| 4 | GuestSaladOrderID | int | 4 | 10/0 | YES | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | ReasonCode | nvarchar(50) | 50 | 0/0 | NO | — | None | None |
| 7 | ReasonText | nvarchar(500) | 500 | 0/0 | YES | — | None | None |
| 8 | CancelledBy | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 9 | CancelledAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_SaladOrderCancellations_CancelledAt] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_SaladOrderCancellations_OrderType | CHECK_CONSTRAINT | ([OrderType]=N'Guest' OR [OrderType]=N'Employee') | 0 |
| CK_SaladOrderCancellations_Quantity | CHECK_CONSTRAINT | ([Quantity]>(0)) | 0 |
| CK_SaladOrderCancellations_Source | CHECK_CONSTRAINT | ([OrderType]=N'Employee' AND [SaladOrderID] IS NOT NULL AND [GuestSaladOrderID] IS NULL OR [OrderType]=N'Guest' AND [SaladOrderID] IS NULL AND [GuestSaladOrderID] IS NOT NULL) | 0 |
| DF_SaladOrderCancellations_CancelledAt | DEFAULT_CONSTRAINT | CancelledAt = (sysutcdatetime()) | N/A |
| PK_SaladOrderCancellations | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_SaladOrderCancellations_Employee | SaladOrderID -> dbo.SaladOrders.SaladOrderID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_SaladOrderCancellations_Guest | GuestSaladOrderID -> dbo.GuestSaladOrders.GuestSaladOrderID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_SaladOrderCancellations | 1 | CLUSTERED | 1/1/0 | SaladOrderCancellationID ASC | None | None | 0/0 |
| IX_SaladOrderCancellations_Employee | 2 | NONCLUSTERED | 0/0/0 | SaladOrderID ASC | None | ([SaladOrderID] IS NOT NULL) | 0/0 |
| IX_SaladOrderCancellations_Guest | 3 | NONCLUSTERED | 0/0/0 | GuestSaladOrderID ASC | None | ([GuestSaladOrderID] IS NOT NULL) | 0/0 |

#### dbo.SaladOrders
Created `2026-10-01 10:15:42.663`; modified `2026-10-07 08:14:48.280`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | SaladOrderID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | EmployeeNo | int | 4 | 10/0 | YES | — | None | None |
| 3 | MenuDate | date | 3 | 10/0 | NO | — | None | None |
| 4 | SaladID | int | 4 | 10/0 | NO | — | None | None |
| 5 | Quantity | int | 4 | 10/0 | NO | — | None | None |
| 6 | OrderTime | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_SaladOrders_OrderTime] | None |
| 7 | ExternalAccountID | int | 4 | 10/0 | YES | — | None | None |
| 8 | CardID | int | 4 | 10/0 | YES | — | None | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_SaladOrders_Quantity | CHECK_CONSTRAINT | ([Quantity]>=(1) AND [Quantity]<=(50)) | 0 |
| DF_SaladOrders_OrderTime | DEFAULT_CONSTRAINT | OrderTime = (sysutcdatetime()) | N/A |
| PK_SaladOrders | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
| Name | Mapping | Delete | Update | Disabled/untrusted/NFR |
| --- | --- | --- | --- | --- |
| FK_SaladOrders_ExternalAccounts | ExternalAccountID -> dbo.ExternalAccounts.ExternalAccountID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_SaladOrders_KioskCards | CardID -> dbo.KioskCards.CardID | NO_ACTION | NO_ACTION | 0/0/0 |
| FK_SaladOrders_Salads | SaladID -> dbo.Salads.SaladID | NO_ACTION | NO_ACTION | 0/0/0 |

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_SaladOrders | 1 | CLUSTERED | 1/1/0 | SaladOrderID ASC | None | None | 0/0 |
| UX_SaladOrders_Employee_Date_Salad | 2 | NONCLUSTERED | 1/0/0 | EmployeeNo ASC, MenuDate ASC, SaladID ASC | None | ([EmployeeNo] IS NOT NULL) | 0/0 |
| IX_SaladOrders_Date | 3 | NONCLUSTERED | 0/0/0 | MenuDate ASC | EmployeeNo, SaladID, Quantity | None | 0/0 |
| UX_SaladOrders_Card_Date_Salad | 6 | NONCLUSTERED | 1/0/0 | CardID ASC, MenuDate ASC, SaladID ASC | None | ([CardID] IS NOT NULL) | 0/0 |

#### dbo.Salads
Created `2026-10-01 09:43:23.647`; modified `2026-10-01 10:15:42.667`. Temporal `NON_TEMPORAL_TABLE`; memory-optimized `0`; durability `SCHEMA_AND_DATA`; additional table flag `0`; export label `TABLE`. No headers identify the additional table flag; do not reinterpret it as a specific unsupported property.
| Ordinal | Column | SQL type | Export length | Precision/scale | Nullable | Identity | Default / constraint | Computed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | SaladID | int | 4 | 10/0 | NO | IDENTITY(1,1) | None | None |
| 2 | NameEn | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 3 | NameSv | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 4 | NameFi | nvarchar(100) | 100 | 0/0 | NO | — | None | None |
| 5 | IsActive | bit | 1 | 1/0 | NO | — | ((1)) [DF_Salads_IsActive] | None |
| 6 | SortOrder | int | 4 | 10/0 | NO | — | ((0)) [DF_Salads_SortOrder] | None |
| 7 | CreatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_Salads_CreatedAt] | None |
| 8 | UpdatedAt | datetime2(0) | 6 | 19/0 | NO | — | (sysutcdatetime()) [DF_Salads_UpdatedAt] | None |

**All constraints (including exact check/default definitions):**
| Name | Type | Definition / target | Exported check-disabled flag |
| --- | --- | --- | --- |
| CK_Salads_NameEn_NotBlank | CHECK_CONSTRAINT | (len(ltrim(rtrim([NameEn])))>(0)) | 0 |
| CK_Salads_NameFi_NotBlank | CHECK_CONSTRAINT | (len(ltrim(rtrim([NameFi])))>(0)) | 0 |
| CK_Salads_NameSv_NotBlank | CHECK_CONSTRAINT | (len(ltrim(rtrim([NameSv])))>(0)) | 0 |
| CK_Salads_SortOrder_NonNegative | CHECK_CONSTRAINT | ([SortOrder]>=(0)) | 0 |
| DF_Salads_CreatedAt | DEFAULT_CONSTRAINT | CreatedAt = (sysutcdatetime()) | N/A |
| DF_Salads_IsActive | DEFAULT_CONSTRAINT | IsActive = ((1)) | N/A |
| DF_Salads_SortOrder | DEFAULT_CONSTRAINT | SortOrder = ((0)) | N/A |
| DF_Salads_UpdatedAt | DEFAULT_CONSTRAINT | UpdatedAt = (sysutcdatetime()) | N/A |
| PK_Salads | PRIMARY_KEY_CONSTRAINT | index id 1 | N/A |

**All declared foreign keys:**
None exported.

**All indexes, including PK/UQ backing indexes:**
| Name | ID | Type | Unique/PK/UQ | Ordered key columns | INCLUDE | Filter | Disabled/hypothetical |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PK_Salads | 1 | CLUSTERED | 1/1/0 | SaladID ASC | None | None | 0/0 |
| IX_Salads_ActiveSort | 2 | NONCLUSTERED | 0/0/0 | IsActive ASC, SortOrder ASC, SaladID ASC | NameEn, NameSv, NameFi | None | 0/0 |

### Complete view definitions and semantics
Source: `lunchappDEV/docs/05-sql/07-module-definitions.csv`, with metadata in `lunchappDEV/docs/05-sql/06-programmable-objects.csv`. Both modules export ANSI_NULLS=1 and QUOTED_IDENTIFIER=1; not schema-bound (0), with NULL execute-as metadata. Additional flags are retained verbatim in module metadata rows below. No procedures/functions/triggers are present in the extracted summary.
#### dbo.vwExternalAccountBalances
```sql
CREATE
VIEW dbo.vwExternalAccountBalances AS
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
WHEN a.AccountMode = N'Prepaid'
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
```
Programmable-object metadata (schema/name/type code/type/created/modified/remaining raw flags): `dbo; vwExternalAccountBalances; V ; VIEW; 2026-10-01 12:10:28.700; 2026-10-06 11:23:49.023; 1; 1; 0; 0; 0; NULL`. Module flags after definition: `1; 1; 0; NULL`.
Outputs exactly ExternalAccountID, DisplayName, CompanyName, AccountMode, CreditLimitCents, BalanceCents, AvailablePrepaidCents, OutstandingCents. Balance = COALESCE(ledger SUM AmountCents,0) minus COALESCE(lunch SUM ChargeCents,0). Prepaid availability is the same potentially negative balance only for Prepaid; other modes return zero. Outstanding is the negated balance whenever negative, regardless of mode. Stored ExternalAccounts.BalanceCents is not referenced. There is no active/validity filter on accounts and no CardID field.

#### dbo.vwExternalLunchChargeEntries
```sql
CREATE
VIEW dbo.vwExternalLunchChargeEntries AS
WITH MealCancellations AS
(
SELECT OrderID, SUM(Quantity) AS CancelledQuantity
FROM dbo.OrderCancellations
WHERE OrderType = N'Employee'
GROUP BY OrderID
),
SaladCancellations AS
(
SELECT SaladOrderID, SUM(Quantity) AS CancelledQuantity
FROM dbo.SaladOrderCancellations
WHERE OrderType = N'Employee'
GROUP BY SaladOrderID
),
MealCharges AS
(
SELECT
N'MealOrder' AS SourceType,
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
N'SaladOrder' AS SourceType,
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
```
Programmable-object metadata (schema/name/type code/type/created/modified/remaining raw flags): `dbo; vwExternalLunchChargeEntries; V ; VIEW; 2026-10-05 11:53:50.040; 2026-10-06 11:23:49.003; 1; 1; 0; 0; 0; NULL`. Module flags after definition: `1; 1; 0; NULL`.
Outputs exactly SourceType, SourceID, ExternalAccountID, MenuDate, ActiveQuantity, PriceCents, ChargeCents, ItemName. SourceType values MealOrder/SaladOrder; SourceID refers to separate source tables and is not alone globally unique. Cancellations are summed for the Employee branch; external records live in the same Orders/SaladOrders tables and follow that branch. Active quantity must be >0. Effective price chooses latest ValidFrom <= MenuDate, tie-break ExternalLunchPriceID DESC; CROSS APPLY excludes orders with no qualifying price. ChargeCents is an integer multiplication without explicit bigint cast (unlike café line totals). There is no snapshot price on lunch orders, fixed earliest date, account mode filter, account-active filter or CardID output. Price-row mutation would retrospectively change derived values, so immutability is an API/process rule, not a SQL prohibition in this extraction.

The separate `lunchappDEV/docs/05-sql/dbo.vwExternalAccountBalances.csv` consists of five wrapped text chunks; `lunchappDEV/docs/05-sql/first.txt` and `lunchappDEV/docs/05-sql/second.txt` are duplicate-in-content historical 42-column metadata resultsets from 2026-10-07, before CardID is shown. Use full 07-module-definitions.csv and 2026-10-08 column extraction as authoritative; do not paste wrapped mid-identifier chunks as executable SQL.
### All dependency metadata (104 rows)
Source `lunchappDEV/docs/05-sql/08-dependencies-fixed.csv`: 73 CHECK_CONSTRAINT, 21 USER_TABLE and 10 VIEW rows. All reference-server/reference-database fields are NULL, and ambiguity flag 0. View object dependencies are the 10 edges shown above. USER_TABLE same-table minor-ID/name rows can reflect expression/index/computed dependencies; **do not convert them into cross-table FKs or semantic column aliases**. The query behind this headerless export is not supplied. Preserve it as observed metadata; e.g. Employees minor ID 4/Email -> CardNumber is not evidence that email is a physical card number. Check rows alone are not the full FK inventory.
| Ref schema | Ref object | Type | Ref minor ID | Ref column | Target server | Target database | Target schema | Target object | Target minor ID | Target column | Schema-bound ref flag | Ambiguous |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| dbo | CK_ExternalAccountLedger_Amount | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 5 | AmountCents | 1 | 0 |
| dbo | CK_ExternalAccountLedger_CreatedBy | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 10 | CreatedBy | 1 | 0 |
| dbo | CK_ExternalAccountLedger_EntryType | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 4 | EntryType | 1 | 0 |
| dbo | CK_ExternalAccountLedger_NoSelfReversal | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 1 | LedgerEntryID | 1 | 0 |
| dbo | CK_ExternalAccountLedger_NoSelfReversal | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 11 | ReversesLedgerEntryID | 1 | 0 |
| dbo | CK_ExternalAccountLedger_PurchaseSale | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 4 | EntryType | 1 | 0 |
| dbo | CK_ExternalAccountLedger_PurchaseSale | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 6 | SaleID | 1 | 0 |
| dbo | CK_ExternalAccountLedger_ReversalLink | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 4 | EntryType | 1 | 0 |
| dbo | CK_ExternalAccountLedger_ReversalLink | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 11 | ReversesLedgerEntryID | 1 | 0 |
| dbo | CK_ExternalAccounts_AccountMode | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 4 | AccountMode | 1 | 0 |
| dbo | CK_ExternalAccounts_CreditLimit | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 9 | CreditLimitCents | 1 | 0 |
| dbo | CK_ExternalAccounts_DisplayName | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 2 | DisplayName | 1 | 0 |
| dbo | CK_ExternalAccounts_ModeCreditLimit | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 4 | AccountMode | 1 | 0 |
| dbo | CK_ExternalAccounts_ModeCreditLimit | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 9 | CreditLimitCents | 1 | 0 |
| dbo | CK_ExternalAccounts_Validity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 11 | ValidFrom | 1 | 0 |
| dbo | CK_ExternalAccounts_Validity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 12 | ValidUntil | 1 | 0 |
| dbo | CK_ExternalLunchPrices_PriceCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ExternalLunchPrices | 2 | PriceCents | 1 | 0 |
| dbo | CK_GuestSaladOrders_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | GuestSaladOrders | 5 | Quantity | 1 | 0 |
| dbo | CK_KioskCards_CardNumber | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 2 | CardNumber | 1 | 0 |
| dbo | CK_KioskCards_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 3 | OwnerType | 1 | 0 |
| dbo | CK_KioskCards_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 4 | EmployeeNo | 1 | 0 |
| dbo | CK_KioskCards_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 5 | ExternalAccountID | 1 | 0 |
| dbo | CK_KioskCards_OwnerType | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 3 | OwnerType | 1 | 0 |
| dbo | CK_KioskCards_Validity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 8 | ValidFrom | 1 | 0 |
| dbo | CK_KioskCards_Validity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskCards | 9 | ValidUntil | 1 | 0 |
| dbo | CK_KioskLayoutItems_ColumnNo | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskLayoutItems | 4 | ColumnNo | 1 | 0 |
| dbo | CK_KioskLayoutItems_RowNo | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskLayoutItems | 5 | RowNo | 1 | 0 |
| dbo | CK_KioskLayouts_LayoutName | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskLayouts | 2 | LayoutName | 1 | 0 |
| dbo | CK_KioskProducts_NameEN | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskProducts | 2 | NameEN | 1 | 0 |
| dbo | CK_KioskProducts_Price | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskProducts | 5 | Price | 1 | 0 |
| dbo | CK_KioskSaleLines_LineTotalCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 5 | UnitPriceCents | 1 | 0 |
| dbo | CK_KioskSaleLines_LineTotalCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 6 | Quantity | 1 | 0 |
| dbo | CK_KioskSaleLines_LineTotalCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 7 | LineTotalCents | 1 | 0 |
| dbo | CK_KioskSaleLines_ProductName | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 4 | ProductNameSnapshot | 1 | 0 |
| dbo | CK_KioskSaleLines_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 6 | Quantity | 1 | 0 |
| dbo | CK_KioskSaleLines_UnitPrice | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 5 | UnitPriceCents | 1 | 0 |
| dbo | CK_KioskSaleLines_UnitPriceCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSaleLines | 5 | UnitPriceCents | 1 | 0 |
| dbo | CK_KioskSales_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 3 | OwnerType | 1 | 0 |
| dbo | CK_KioskSales_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 4 | EmployeeNo | 1 | 0 |
| dbo | CK_KioskSales_Owner | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 5 | ExternalAccountID | 1 | 0 |
| dbo | CK_KioskSales_OwnerReference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 2 | CardID | 1 | 0 |
| dbo | CK_KioskSales_OwnerReference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 3 | OwnerType | 1 | 0 |
| dbo | CK_KioskSales_OwnerReference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 4 | EmployeeNo | 1 | 0 |
| dbo | CK_KioskSales_OwnerReference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 5 | ExternalAccountID | 1 | 0 |
| dbo | CK_KioskSales_OwnerType | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 3 | OwnerType | 1 | 0 |
| dbo | CK_KioskSales_Status | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 8 | Status | 1 | 0 |
| dbo | CK_KioskSales_TotalCents | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 7 | TotalCents | 1 | 0 |
| dbo | CK_KioskSales_VoidFields | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 8 | Status | 1 | 0 |
| dbo | CK_KioskSales_VoidFields | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 10 | VoidedAt | 1 | 0 |
| dbo | CK_KioskSales_VoidFields | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 11 | VoidedBy | 1 | 0 |
| dbo | CK_KioskSales_VoidFields | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | KioskSales | 12 | VoidReason | 1 | 0 |
| dbo | CK_ManualLunchAdjustments_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | ManualLunchAdjustments | 4 | Quantity | 1 | 0 |
| dbo | CK_MenuCycles_NumberOfWeeks | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | MenuCycles | 4 | NumberOfWeeks | 1 | 0 |
| dbo | CK_MenuCycles_Status | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | MenuCycles | 5 | Status | 1 | 0 |
| dbo | CK_MenuDays_DayNumber | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | MenuDays | 3 | DayNumber | 1 | 0 |
| dbo | CK_MenuWeeks_WeekNumber | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | MenuWeeks | 2 | WeekNumber | 1 | 0 |
| dbo | CK_OrderCancellations_OrderType | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 2 | OrderType | 1 | 0 |
| dbo | CK_OrderCancellations_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 5 | Quantity | 1 | 0 |
| dbo | CK_OrderCancellations_ReasonCode | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 6 | ReasonCode | 1 | 0 |
| dbo | CK_OrderCancellations_Reference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 2 | OrderType | 1 | 0 |
| dbo | CK_OrderCancellations_Reference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 3 | OrderID | 1 | 0 |
| dbo | CK_OrderCancellations_Reference | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 4 | GuestOrderID | 1 | 0 |
| dbo | CK_Orders_New_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | Orders | 5 | Quantity | 1 | 0 |
| dbo | CK_SaladOrderCancellations_OrderType | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 2 | OrderType | 1 | 0 |
| dbo | CK_SaladOrderCancellations_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 5 | Quantity | 1 | 0 |
| dbo | CK_SaladOrderCancellations_Source | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 2 | OrderType | 1 | 0 |
| dbo | CK_SaladOrderCancellations_Source | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 3 | SaladOrderID | 1 | 0 |
| dbo | CK_SaladOrderCancellations_Source | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 4 | GuestSaladOrderID | 1 | 0 |
| dbo | CK_SaladOrders_Quantity | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | SaladOrders | 5 | Quantity | 1 | 0 |
| dbo | CK_Salads_NameEn_NotBlank | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | Salads | 2 | NameEn | 1 | 0 |
| dbo | CK_Salads_NameFi_NotBlank | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | Salads | 4 | NameFi | 1 | 0 |
| dbo | CK_Salads_NameSv_NotBlank | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | Salads | 3 | NameSv | 1 | 0 |
| dbo | CK_Salads_SortOrder_NonNegative | CHECK_CONSTRAINT | 0 | NULL | NULL | NULL | dbo | Salads | 6 | SortOrder | 1 | 0 |
| dbo | Employees | USER_TABLE | 4 | Email | NULL | NULL | dbo | Employees | 5 | CardNumber | 1 | 0 |
| dbo | ExternalAccountLedger | USER_TABLE | 4 | EntryType | NULL | NULL | dbo | ExternalAccountLedger | 4 | EntryType | 1 | 0 |
| dbo | ExternalAccountLedger | USER_TABLE | 3 | EntryTime | NULL | NULL | dbo | ExternalAccountLedger | 6 | SaleID | 1 | 0 |
| dbo | ExternalAccountLedger | USER_TABLE | 4 | EntryType | NULL | NULL | dbo | ExternalAccountLedger | 6 | SaleID | 1 | 0 |
| dbo | ExternalAccountLedger | USER_TABLE | 5 | AmountCents | NULL | NULL | dbo | ExternalAccountLedger | 11 | ReversesLedgerEntryID | 1 | 0 |
| dbo | KioskCards | USER_TABLE | 3 | OwnerType | NULL | NULL | dbo | KioskCards | 4 | EmployeeNo | 1 | 0 |
| dbo | KioskCards | USER_TABLE | 4 | EmployeeNo | NULL | NULL | dbo | KioskCards | 5 | ExternalAccountID | 1 | 0 |
| dbo | KioskLayouts | USER_TABLE | 3 | IsActive | NULL | NULL | dbo | KioskLayouts | 4 | IsDefault | 1 | 0 |
| dbo | KioskSaleLines | USER_TABLE | 7 | LineTotalCents | NULL | NULL | dbo | KioskSaleLines | 5 | UnitPriceCents | 1 | 0 |
| dbo | KioskSaleLines | USER_TABLE | 7 | LineTotalCents | NULL | NULL | dbo | KioskSaleLines | 6 | Quantity | 1 | 0 |
| dbo | KioskSales | USER_TABLE | 3 | OwnerType | NULL | NULL | dbo | KioskSales | 4 | EmployeeNo | 1 | 0 |
| dbo | KioskSales | USER_TABLE | 4 | EmployeeNo | NULL | NULL | dbo | KioskSales | 5 | ExternalAccountID | 1 | 0 |
| dbo | KioskSales | USER_TABLE | 5 | ExternalAccountID | NULL | NULL | dbo | KioskSales | 13 | RequestID | 1 | 0 |
| dbo | OrderCancellations | USER_TABLE | 2 | OrderType | NULL | NULL | dbo | OrderCancellations | 3 | OrderID | 1 | 0 |
| dbo | OrderCancellations | USER_TABLE | 3 | OrderID | NULL | NULL | dbo | OrderCancellations | 4 | GuestOrderID | 1 | 0 |
| dbo | Orders | USER_TABLE | 2 | EmployeeNo | NULL | NULL | dbo | Orders | 2 | EmployeeNo | 1 | 0 |
| dbo | Orders | USER_TABLE | 6 | OrderTime | NULL | NULL | dbo | Orders | 9 | CardID | 1 | 0 |
| dbo | SaladOrderCancellations | USER_TABLE | 2 | OrderType | NULL | NULL | dbo | SaladOrderCancellations | 3 | SaladOrderID | 1 | 0 |
| dbo | SaladOrderCancellations | USER_TABLE | 3 | SaladOrderID | NULL | NULL | dbo | SaladOrderCancellations | 4 | GuestSaladOrderID | 1 | 0 |
| dbo | SaladOrders | USER_TABLE | 2 | EmployeeNo | NULL | NULL | dbo | SaladOrders | 2 | EmployeeNo | 1 | 0 |
| dbo | SaladOrders | USER_TABLE | 6 | OrderTime | NULL | NULL | dbo | SaladOrders | 8 | CardID | 1 | 0 |
| dbo | vwExternalAccountBalances | VIEW | 0 | NULL | NULL | NULL | dbo | ExternalAccountLedger | 0 | NULL | 0 | 0 |
| dbo | vwExternalAccountBalances | VIEW | 0 | NULL | NULL | NULL | dbo | ExternalAccounts | 0 | NULL | 0 | 0 |
| dbo | vwExternalAccountBalances | VIEW | 0 | NULL | NULL | NULL | dbo | vwExternalLunchChargeEntries | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | ExternalLunchPrices | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | Meals | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | OrderCancellations | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | Orders | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | SaladOrderCancellations | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | SaladOrders | 0 | NULL | 0 | 0 |
| dbo | vwExternalLunchChargeEntries | VIEW | 0 | NULL | NULL | NULL | dbo | Salads | 0 | NULL | 0 | 0 |

### Security metadata — all exported permission targets
Source `lunchappDEV/docs/05-sql/09-security-metadata-1.csv` and `lunchappDEV/docs/05-sql/09-security-metadata-2.csv`. 254 explicit permission rows: dbo/dbo GRANT CONNECT DATABASE lunchappdb-dev, 252 public/dbo GRANT SELECT OBJECT_OR_COLUMN system targets, 1 public/sys GRANT SELECT OBJECT_OR_COLUMN system target. One role membership: db_owner -> dbo. These are database-level extracted rows, not all effective permissions or Azure/platform identity policy. No explicit application-table grants or an application principal occur in these files. Absence is not proof no effective user access exists via owner/role/server inheritance. System metadata read grants must not be described as anonymous business-table access.
| Grantee | Grantor | State | Permission | Class | Securable |
| --- | --- | --- | --- | --- | --- |
| dbo | dbo | GRANT | CONNECT | DATABASE | lunchappdb-dev |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[all_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[all_objects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[all_parameters] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[all_sql_modules] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[all_views] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[allocation_units] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[assemblies] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[assembly_files] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[assembly_modules] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[assembly_references] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[assembly_types] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[asymmetric_keys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[certificates] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[change_tracking_tables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[check_constraints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_encryption_key_values] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_encryption_keys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_master_key_definitions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_master_keys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_store_dictionaries] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_store_row_groups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_store_segments] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_type_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[column_xml_schema_collection_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[computed_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[conversation_endpoints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[conversation_groups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[conversation_priorities] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[crypt_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[data_spaces] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_audit_specification_details] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_audit_specifications] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_automatic_tuning_configurations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_automatic_tuning_mode] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_automatic_tuning_options] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_credentials] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_event_session_actions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_event_session_events] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_event_session_fields] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_event_session_targets] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_event_sessions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_files] |
| public | sys | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_firewall_rules] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_ledger_blocks] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_ledger_digest_locations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_ledger_transactions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_permissions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_principals] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_resource_governor_configuration] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_resource_governor_workload_groups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_role_members] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_scoped_configurations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[database_scoped_credentials] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[default_constraints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[destination_data_spaces] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[devops_database_principals] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[devops_principals] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[dm_db_column_store_row_group_physical_stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[dm_db_index_persisted_usage_stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[dm_db_resource_governor_configuration] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[dm_db_workload_group_resource_stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[edge_constraint_clauses] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[edge_constraints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[event_notifications] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[events] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[extended_procedures] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[extended_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_data_sources] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_file_formats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_classification_attributes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_classifications] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_classifications_mapping] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_sensitivity_classifications] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_sensitivity_labels] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_governance_sensitivity_labels_mapping] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_job_streams] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_libraries] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_library_files] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_library_setup_errors] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_models] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_stream_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_streaming_jobs] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_streams] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_table_partitioning_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_table_schema_changed_mdsync] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[external_tables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[federated_table_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[federation_distributions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[federation_member_distributions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[federation_members] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[federations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[filegroups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[filetable_system_defined_objects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[filetables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[foreign_key_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[foreign_keys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_catalogs] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_index_catalog_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_index_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_index_fragments] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_stoplists] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[fulltext_stopwords] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[function_order_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[hash_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[identity_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[index_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[index_resumable_operations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[information_protection_label_mapping] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[internal_partitions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[internal_tables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[json_index_paths] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[json_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[key_constraints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[key_encryptions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[ledger_column_history] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[ledger_table_history] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[masked_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[materialized_views] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[memory_optimized_tables_internal_attributes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[message_type_xml_schema_collection_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[module_assembly_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[numbered_procedure_parameters] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[numbered_procedures] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[objects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[parameter_type_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[parameter_xml_schema_collection_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[parameters] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[partition_functions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[partition_parameters] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[partition_range_values] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[partition_schemes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[partitions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_column_distribution_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_index_mappings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_materialized_view_column_distribution_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_materialized_view_distribution_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_materialized_view_mappings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_permanent_table_mappings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_table_distribution_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[pdw_table_mappings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[periods] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[plan_guides] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[procedures] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_context_settings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_plan] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_plan_by_hash] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_plan_feedback] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_plan_forcing_locations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query_hash_plan] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query_hints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query_hints_by_hash] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query_text] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_query_variant] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_replicas] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_runtime_stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_runtime_stats_interval] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[query_store_wait_stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[registered_search_properties] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[registered_search_property_lists] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[remote_data_archive_databases] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[remote_data_archive_tables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[remote_service_bindings] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[routes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[schemas] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[security_policies] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[security_predicates] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[selective_xml_index_namespaces] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[selective_xml_index_paths] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[semantic_index_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[semantic_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sensitivity_classifications] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sequences] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_contract_message_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_contract_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_contracts] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_message_types] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_queue_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[service_queues] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[services] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[spatial_index_tessellations] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[spatial_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sql_dependencies] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sql_modules] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[stats] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[stats_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[symmetric_keys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[synonyms] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[syscolumn_store_segments_2020] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[syscolumns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[syscolumns_2019] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[syscomments] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysconstraints] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysdatabase_principals_2021] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysdatabase_principals_2022] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysdepends] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysdevops_database_principals_2021] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysdevops_principals_2021] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysexternal_data_sources_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysexternal_data_sources_2017] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysexternal_file_formats_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysexternal_tables_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysfilegroups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysfiles] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysforeignkeys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysfulltextcatalogs] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysindexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysindexkeys] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysmembers] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysobjects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[syspermissions] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysprotects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_context_settings_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_query_hints_2019] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_runtime_stats_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_runtime_stats_2017] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_runtime_stats_2019] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_runtime_stats_interval_2016] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysquery_store_wait_stats_2019] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysreferences] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysserver_principals_2021] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[system_columns] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[system_objects] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[system_parameters] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[system_sql_modules] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[system_views] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[systypes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[sysusers] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[table_types] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[tables] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[time_zone_info] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[transmission_queue] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[trigger_events] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[triggers] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[type_assembly_usages] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[types] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[vector_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[views] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_indexes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_attributes] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_collections] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_component_placements] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_components] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_elements] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_facets] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_model_groups] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_namespaces] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_types] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_wildcard_namespaces] |
| public | dbo | GRANT | SELECT | OBJECT_OR_COLUMN | [sys].[xml_schema_wildcards] |

| Database role | Member |
| --- | --- |
| db_owner | dbo |

### Every SQL object in the registry (193 rows)
Source `lunchappDEV/docs/05-sql/01-objects.csv`. Indexes are separately enumerated above because sys.objects object totals do not count ordinary indexes; the 68 index total includes backing PK/UQ indexes. All exported object ms-shipped flags 0.
| Schema | Object | Type code | Description | Created | Modified | MS shipped flag |
| --- | --- | --- | --- | --- | --- | --- |
| dbo | CK_ExternalAccountLedger_Amount | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccountLedger_CreatedBy | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccountLedger_EntryType | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccountLedger_NoSelfReversal | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccountLedger_PurchaseSale | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccountLedger_ReversalLink | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | CK_ExternalAccounts_AccountMode | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | CK_ExternalAccounts_CreditLimit | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | CK_ExternalAccounts_DisplayName | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | CK_ExternalAccounts_ModeCreditLimit | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | CK_ExternalAccounts_Validity | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | CK_ExternalLunchPrices_PriceCents | C  | CHECK_CONSTRAINT | 2026-10-05 11:53:50.037 | 2026-10-05 11:53:50.037 | 0 |
| dbo | CK_GuestSaladOrders_Quantity | C  | CHECK_CONSTRAINT | 2026-10-01 10:15:42.667 | 2026-10-01 10:15:42.667 | 0 |
| dbo | CK_KioskCards_CardNumber | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.637 | 2026-10-01 12:10:28.637 | 0 |
| dbo | CK_KioskCards_Owner | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.637 | 2026-10-01 12:10:28.637 | 0 |
| dbo | CK_KioskCards_OwnerType | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.637 | 2026-10-01 12:10:28.637 | 0 |
| dbo | CK_KioskCards_Validity | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.637 | 2026-10-01 12:10:28.637 | 0 |
| dbo | CK_KioskLayoutItems_ColumnNo | C  | CHECK_CONSTRAINT | 2026-10-02 06:55:38.860 | 2026-10-02 06:55:38.860 | 0 |
| dbo | CK_KioskLayoutItems_RowNo | C  | CHECK_CONSTRAINT | 2026-10-02 06:55:38.860 | 2026-10-02 06:55:38.860 | 0 |
| dbo | CK_KioskLayouts_LayoutName | C  | CHECK_CONSTRAINT | 2026-10-02 06:55:38.830 | 2026-10-02 06:55:38.830 | 0 |
| dbo | CK_KioskProducts_NameEN | C  | CHECK_CONSTRAINT | 2026-10-02 06:58:44.810 | 2026-10-02 06:58:44.810 | 0 |
| dbo | CK_KioskProducts_Price | C  | CHECK_CONSTRAINT | 2026-10-02 06:58:44.830 | 2026-10-02 06:58:44.830 | 0 |
| dbo | CK_KioskSaleLines_LineTotalCents | C  | CHECK_CONSTRAINT | 2026-10-02 07:49:17.900 | 2026-10-02 07:49:17.900 | 0 |
| dbo | CK_KioskSaleLines_ProductName | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | CK_KioskSaleLines_Quantity | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | CK_KioskSaleLines_UnitPrice | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | CK_KioskSaleLines_UnitPriceCents | C  | CHECK_CONSTRAINT | 2026-10-02 07:49:36.293 | 2026-10-02 07:49:36.293 | 0 |
| dbo | CK_KioskSales_Owner | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | CK_KioskSales_OwnerReference | C  | CHECK_CONSTRAINT | 2026-10-02 07:44:46.687 | 2026-10-02 07:44:46.687 | 0 |
| dbo | CK_KioskSales_OwnerType | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | CK_KioskSales_Status | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | CK_KioskSales_TotalCents | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | CK_KioskSales_VoidFields | C  | CHECK_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | CK_ManualLunchAdjustments_Quantity | C  | CHECK_CONSTRAINT | 2026-10-05 08:25:53.583 | 2026-10-05 08:25:53.583 | 0 |
| dbo | CK_MenuCycles_NumberOfWeeks | C  | CHECK_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | CK_MenuCycles_Status | C  | CHECK_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | CK_MenuDays_DayNumber | C  | CHECK_CONSTRAINT | 2026-09-28 07:30:26.090 | 2026-09-28 07:30:26.090 | 0 |
| dbo | CK_MenuWeeks_WeekNumber | C  | CHECK_CONSTRAINT | 2026-09-28 07:30:26.087 | 2026-09-28 07:30:26.087 | 0 |
| dbo | CK_OrderCancellations_OrderType | C  | CHECK_CONSTRAINT | 2026-09-29 10:21:22.800 | 2026-09-29 10:21:22.800 | 0 |
| dbo | CK_OrderCancellations_Quantity | C  | CHECK_CONSTRAINT | 2026-09-29 10:21:22.827 | 2026-09-29 10:21:22.827 | 0 |
| dbo | CK_OrderCancellations_ReasonCode | C  | CHECK_CONSTRAINT | 2026-09-29 10:48:23.410 | 2026-09-29 10:48:23.410 | 0 |
| dbo | CK_OrderCancellations_Reference | C  | CHECK_CONSTRAINT | 2026-09-29 10:21:22.827 | 2026-09-29 10:21:22.827 | 0 |
| dbo | CK_Orders_New_Quantity | C  | CHECK_CONSTRAINT | 2026-09-28 12:17:08.817 | 2026-09-28 12:17:08.817 | 0 |
| dbo | CK_SaladOrderCancellations_OrderType | C  | CHECK_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | CK_SaladOrderCancellations_Quantity | C  | CHECK_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | CK_SaladOrderCancellations_Source | C  | CHECK_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | CK_SaladOrders_Quantity | C  | CHECK_CONSTRAINT | 2026-10-01 10:15:42.663 | 2026-10-01 10:15:42.663 | 0 |
| dbo | CK_Salads_NameEn_NotBlank | C  | CHECK_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | CK_Salads_NameFi_NotBlank | C  | CHECK_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | CK_Salads_NameSv_NotBlank | C  | CHECK_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | CK_Salads_SortOrder_NonNegative | C  | CHECK_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | DF__Employees__Activ__0A9D95DB | D  | DEFAULT_CONSTRAINT | 2026-09-25 07:09:59.317 | 2026-09-25 07:09:59.317 | 0 |
| dbo | DF__ImageAsse__Creat__6D6238AF | D  | DEFAULT_CONSTRAINT | 2026-10-06 11:24:21.720 | 2026-10-06 11:24:21.720 | 0 |
| dbo | DF__KioskProd__Activ__02084FDA | D  | DEFAULT_CONSTRAINT | 2026-09-25 07:08:51.450 | 2026-09-25 07:08:51.450 | 0 |
| dbo | DF__KioskTran__Trans__04E4BC85 | D  | DEFAULT_CONSTRAINT | 2026-09-25 07:08:51.457 | 2026-09-25 07:08:51.457 | 0 |
| dbo | DF__Meals__Active__778AC167 | D  | DEFAULT_CONSTRAINT | 2026-09-25 07:08:51.420 | 2026-09-25 07:08:51.420 | 0 |
| dbo | DF_ExternalAccountLedger_EntryTime | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | DF_ExternalAccounts_BalanceCents | D  | DEFAULT_CONSTRAINT | 2026-10-02 05:12:54.800 | 2026-10-02 05:12:54.800 | 0 |
| dbo | DF_ExternalAccounts_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | DF_ExternalAccounts_IsActive | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | DF_ExternalAccounts_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | DF_ExternalLunchPrices_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-05 11:53:50.033 | 2026-10-05 11:53:50.033 | 0 |
| dbo | DF_GuestOrders_OrderTime | D  | DEFAULT_CONSTRAINT | 2026-09-28 10:33:23.400 | 2026-09-28 10:33:23.400 | 0 |
| dbo | DF_GuestSaladOrders_OrderTime | D  | DEFAULT_CONSTRAINT | 2026-10-01 10:15:42.667 | 2026-10-01 10:15:42.667 | 0 |
| dbo | DF_KioskCards_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | DF_KioskCards_IsActive | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | DF_KioskCards_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | DF_KioskLayoutItems_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | DF_KioskLayoutItems_IsVisible | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | DF_KioskLayoutItems_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | DF_KioskLayouts_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.830 | 2026-10-02 06:55:38.830 | 0 |
| dbo | DF_KioskLayouts_IsActive | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.827 | 2026-10-02 06:55:38.827 | 0 |
| dbo | DF_KioskLayouts_IsDefault | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.827 | 2026-10-02 06:55:38.827 | 0 |
| dbo | DF_KioskLayouts_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:55:38.830 | 2026-10-02 06:55:38.830 | 0 |
| dbo | DF_KioskProducts_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:58:44.723 | 2026-10-02 06:58:44.723 | 0 |
| dbo | DF_KioskProducts_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-02 06:58:44.723 | 2026-10-02 06:58:44.723 | 0 |
| dbo | DF_KioskSales_CreatedBy | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | DF_KioskSales_SaleTime | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | DF_KioskSales_Status | D  | DEFAULT_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | DF_ManualLunchAdjustments_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-05 08:25:53.580 | 2026-10-05 08:25:53.580 | 0 |
| dbo | DF_ManualLunchAdjustments_Quantity | D  | DEFAULT_CONSTRAINT | 2026-10-05 08:25:53.580 | 2026-10-05 08:25:53.580 | 0 |
| dbo | DF_Meals_Category | D  | DEFAULT_CONSTRAINT | 2026-09-28 06:12:36.330 | 2026-09-28 06:12:36.330 | 0 |
| dbo | DF_MenuCycles_CreatedDate | D  | DEFAULT_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | DF_MenuCycles_Status | D  | DEFAULT_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | DF_MenuCycles_UpdatedDate | D  | DEFAULT_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | DF_MenuWeeks_CreatedDate | D  | DEFAULT_CONSTRAINT | 2026-09-28 07:30:26.087 | 2026-09-28 07:30:26.087 | 0 |
| dbo | DF_OrderCancellations_CancelledAt | D  | DEFAULT_CONSTRAINT | 2026-09-29 10:21:22.800 | 2026-09-29 10:21:22.800 | 0 |
| dbo | DF_Orders_New_OrderTime | D  | DEFAULT_CONSTRAINT | 2026-09-28 12:17:08.813 | 2026-09-28 12:17:08.813 | 0 |
| dbo | DF_SaladOrderCancellations_CancelledAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | DF_SaladOrders_OrderTime | D  | DEFAULT_CONSTRAINT | 2026-10-01 10:15:42.663 | 2026-10-01 10:15:42.663 | 0 |
| dbo | DF_Salads_CreatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | DF_Salads_IsActive | D  | DEFAULT_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | DF_Salads_SortOrder | D  | DEFAULT_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | DF_Salads_UpdatedAt | D  | DEFAULT_CONSTRAINT | 2026-10-01 09:43:23.667 | 2026-10-01 09:43:23.667 | 0 |
| dbo | FK__Balances__Employ__09A971A2 | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-25 07:08:51.477 | 2026-09-25 07:08:51.477 | 0 |
| dbo | FK__KioskTran__Emplo__05D8E0BE | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-25 07:08:51.457 | 2026-09-25 07:08:51.457 | 0 |
| dbo | FK__KioskTran__Produ__06CD04F7 | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-25 07:08:51.457 | 2026-09-25 07:08:51.457 | 0 |
| dbo | FK_DayMeals_Meals | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 07:30:26.100 | 2026-09-28 07:30:26.100 | 0 |
| dbo | FK_DayMeals_MenuDays | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 07:30:26.100 | 2026-09-28 07:30:26.100 | 0 |
| dbo | FK_ExternalAccountLedger_Accounts | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | FK_ExternalAccountLedger_Reversal | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | FK_ExternalAccountLedger_Sales | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | FK_GuestOrders_Employee | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 10:33:23.400 | 2026-09-28 10:33:23.400 | 0 |
| dbo | FK_GuestOrders_Meal | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 10:33:23.400 | 2026-09-28 10:33:23.400 | 0 |
| dbo | FK_GuestSaladOrders_Salads | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 10:15:42.667 | 2026-10-01 10:15:42.667 | 0 |
| dbo | FK_KioskCards_ExternalAccounts | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | FK_KioskLayoutItems_Layout | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-02 06:55:38.860 | 2026-10-02 06:55:38.860 | 0 |
| dbo | FK_KioskLayoutItems_Product | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-02 06:55:38.860 | 2026-10-02 06:55:38.860 | 0 |
| dbo | FK_KioskProducts_ImageAssets | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-06 11:24:34.703 | 2026-10-06 11:24:34.703 | 0 |
| dbo | FK_KioskSaleLines_Products | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | FK_KioskSaleLines_Sales | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | FK_KioskSales_Cards | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | FK_KioskSales_ExternalAccounts | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | FK_ManualLunchAdjustments_Employees | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-05 08:25:53.583 | 2026-10-05 08:25:53.583 | 0 |
| dbo | FK_Menu_Meals | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 06:14:51.233 | 2026-09-28 06:14:51.233 | 0 |
| dbo | FK_MenuDays_MenuWeeks | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 07:30:26.090 | 2026-09-28 07:30:26.090 | 0 |
| dbo | FK_MenuWeeks_MenuCycles | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-29 08:02:16.447 | 2026-09-29 08:02:16.447 | 0 |
| dbo | FK_OrderCancellations_GuestOrders | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-29 10:48:06.953 | 2026-09-29 10:48:06.953 | 0 |
| dbo | FK_OrderCancellations_Orders | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-29 10:48:06.937 | 2026-09-29 10:48:06.937 | 0 |
| dbo | FK_Orders_ExternalAccounts | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-05 06:34:52.307 | 2026-10-05 06:34:52.307 | 0 |
| dbo | FK_Orders_KioskCards | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-07 07:16:46.433 | 2026-10-07 07:16:46.433 | 0 |
| dbo | FK_Orders_New_Employee | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 12:17:08.813 | 2026-09-28 12:17:08.813 | 0 |
| dbo | FK_Orders_New_Meal | F  | FOREIGN_KEY_CONSTRAINT | 2026-09-28 12:17:08.817 | 2026-09-28 12:17:08.817 | 0 |
| dbo | FK_SaladOrderCancellations_Employee | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | FK_SaladOrderCancellations_Guest | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 11:43:05.670 | 2026-10-01 11:43:05.670 | 0 |
| dbo | FK_SaladOrders_ExternalAccounts | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-05 06:34:52.330 | 2026-10-05 06:34:52.330 | 0 |
| dbo | FK_SaladOrders_KioskCards | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-07 07:16:46.487 | 2026-10-07 07:16:46.487 | 0 |
| dbo | FK_SaladOrders_Salads | F  | FOREIGN_KEY_CONSTRAINT | 2026-10-01 10:15:42.663 | 2026-10-01 10:15:42.663 | 0 |
| dbo | PK__Balances__7AD0F1B69286B922 | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-25 07:08:51.477 | 2026-09-25 07:08:51.477 | 0 |
| dbo | PK__Employee__7AD0F1B670ECEDB0 | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-25 06:59:07.110 | 2026-09-25 06:59:07.110 | 0 |
| dbo | PK__GuestOrd__773A898A08AB97EF | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 10:33:23.397 | 2026-09-28 10:33:23.397 | 0 |
| dbo | PK__ImageAss__16EED56DA638C083 | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-06 11:24:21.720 | 2026-10-06 11:24:21.720 | 0 |
| dbo | PK__KioskPro__B40CC6EDFBBB280B | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-25 07:08:51.450 | 2026-09-25 07:08:51.450 | 0 |
| dbo | PK__KioskTra__55433A4B01D2A8D1 | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-25 07:08:51.457 | 2026-09-25 07:08:51.457 | 0 |
| dbo | PK__Meals__ACF6A65D46AC5673 | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-25 07:08:51.417 | 2026-09-25 07:08:51.417 | 0 |
| dbo | PK__Menu__C99ED2500D83E658 | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 06:14:51.233 | 2026-09-28 06:14:51.233 | 0 |
| dbo | PK_DayMeals | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 07:30:26.090 | 2026-09-28 07:30:26.090 | 0 |
| dbo | PK_ExternalAccountLedger | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 12:10:28.650 | 2026-10-01 12:10:28.650 | 0 |
| dbo | PK_ExternalAccounts | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 12:10:28.630 | 2026-10-01 12:10:28.630 | 0 |
| dbo | PK_ExternalLunchPrices | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-05 11:53:50.033 | 2026-10-05 11:53:50.033 | 0 |
| dbo | PK_GuestSaladOrders | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 10:15:42.667 | 2026-10-01 10:15:42.667 | 0 |
| dbo | PK_KioskCards | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | PK_KioskLayoutItems | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | PK_KioskLayouts | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-02 06:55:38.827 | 2026-10-02 06:55:38.827 | 0 |
| dbo | PK_KioskSaleLines | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.647 | 0 |
| dbo | PK_KioskSales | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 12:10:28.640 | 2026-10-01 12:10:28.640 | 0 |
| dbo | PK_ManualLunchAdjustments | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-05 08:25:53.580 | 2026-10-05 08:25:53.580 | 0 |
| dbo | PK_MenuCycles | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-29 08:02:16.420 | 2026-09-29 08:02:16.420 | 0 |
| dbo | PK_MenuDays | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 07:30:26.087 | 2026-09-28 07:30:26.087 | 0 |
| dbo | PK_MenuWeeks | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 07:30:26.083 | 2026-09-28 07:30:26.083 | 0 |
| dbo | PK_OrderCancellations | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-29 10:21:22.800 | 2026-09-29 10:21:22.800 | 0 |
| dbo | PK_Orders_New | PK | PRIMARY_KEY_CONSTRAINT | 2026-09-28 12:17:08.813 | 2026-09-28 12:17:08.813 | 0 |
| dbo | PK_SaladOrderCancellations | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 11:43:05.667 | 2026-10-01 11:43:05.667 | 0 |
| dbo | PK_SaladOrders | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 10:15:42.663 | 2026-10-01 10:15:42.663 | 0 |
| dbo | PK_Salads | PK | PRIMARY_KEY_CONSTRAINT | 2026-10-01 09:43:23.663 | 2026-10-01 09:43:23.663 | 0 |
| dbo | UQ_DayMeals_Day_Meal | UQ | UNIQUE_CONSTRAINT | 2026-09-28 07:30:26.100 | 2026-09-28 07:30:26.100 | 0 |
| dbo | UQ_ExternalLunchPrices_ValidFrom | UQ | UNIQUE_CONSTRAINT | 2026-10-05 11:53:50.033 | 2026-10-05 11:53:50.033 | 0 |
| dbo | UQ_GuestSaladOrders_HostDateSalad | UQ | UNIQUE_CONSTRAINT | 2026-10-01 10:15:42.667 | 2026-10-01 10:15:42.667 | 0 |
| dbo | UQ_KioskCards_CardNumber | UQ | UNIQUE_CONSTRAINT | 2026-10-01 12:10:28.633 | 2026-10-01 12:10:28.633 | 0 |
| dbo | UQ_KioskLayoutItems_Position | UQ | UNIQUE_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | UQ_KioskLayoutItems_Product | UQ | UNIQUE_CONSTRAINT | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | UQ_KioskLayouts_LayoutName | UQ | UNIQUE_CONSTRAINT | 2026-10-02 06:55:38.827 | 2026-10-02 06:55:38.827 | 0 |
| dbo | UQ_MenuDays_Week_Day | UQ | UNIQUE_CONSTRAINT | 2026-09-28 07:30:26.090 | 2026-09-28 07:30:26.090 | 0 |
| dbo | UQ_MenuWeeks_Cycle_Week | UQ | UNIQUE_CONSTRAINT | 2026-09-29 08:02:16.457 | 2026-09-29 08:02:16.457 | 0 |
| dbo | Balances | U  | USER_TABLE | 2026-09-25 07:08:51.473 | 2026-09-25 07:08:51.473 | 0 |
| dbo | DayMeals | U  | USER_TABLE | 2026-09-28 07:30:26.090 | 2026-09-28 07:30:26.090 | 0 |
| dbo | Employees | U  | USER_TABLE | 2026-09-25 06:59:07.110 | 2026-10-05 08:25:53.583 | 0 |
| dbo | ExternalAccountLedger | U  | USER_TABLE | 2026-10-01 12:10:28.647 | 2026-10-01 12:10:28.663 | 0 |
| dbo | ExternalAccounts | U  | USER_TABLE | 2026-10-01 12:10:28.630 | 2026-10-05 06:34:52.330 | 0 |
| dbo | ExternalLunchPrices | U  | USER_TABLE | 2026-10-05 11:53:50.010 | 2026-10-05 11:53:50.010 | 0 |
| dbo | GuestOrders | U  | USER_TABLE | 2026-09-28 10:33:23.397 | 2026-10-01 10:15:42.667 | 0 |
| dbo | GuestSaladOrders | U  | USER_TABLE | 2026-10-01 10:15:42.667 | 2026-10-01 11:43:05.670 | 0 |
| dbo | ImageAssets | U  | USER_TABLE | 2026-10-06 11:24:21.687 | 2026-10-06 11:24:58.597 | 0 |
| dbo | KioskCards | U  | USER_TABLE | 2026-10-01 12:10:28.633 | 2026-10-07 07:16:46.487 | 0 |
| dbo | KioskLayoutItems | U  | USER_TABLE | 2026-10-02 06:55:38.857 | 2026-10-02 06:55:38.857 | 0 |
| dbo | KioskLayouts | U  | USER_TABLE | 2026-10-02 06:55:38.820 | 2026-10-02 06:58:55.770 | 0 |
| dbo | KioskProducts | U  | USER_TABLE | 2026-09-25 07:08:51.450 | 2026-10-06 11:24:34.703 | 0 |
| dbo | KioskSaleLines | U  | USER_TABLE | 2026-10-01 12:10:28.643 | 2026-10-02 07:49:36.293 | 0 |
| dbo | KioskSales | U  | USER_TABLE | 2026-10-01 12:10:28.640 | 2026-10-02 08:10:52.517 | 0 |
| dbo | KioskTransactions | U  | USER_TABLE | 2026-09-25 07:08:51.457 | 2026-09-25 07:08:51.457 | 0 |
| dbo | ManualLunchAdjustments | U  | USER_TABLE | 2026-10-05 08:25:53.573 | 2026-10-05 08:25:53.583 | 0 |
| dbo | Meals | U  | USER_TABLE | 2026-09-25 07:08:51.417 | 2026-09-28 12:17:08.820 | 0 |
| dbo | Menu | U  | USER_TABLE | 2026-09-28 06:14:51.210 | 2026-09-28 06:14:51.210 | 0 |
| dbo | MenuCycles | U  | USER_TABLE | 2026-09-29 08:02:16.400 | 2026-09-29 08:02:16.450 | 0 |
| dbo | MenuDays | U  | USER_TABLE | 2026-09-28 07:30:26.087 | 2026-09-28 07:30:26.100 | 0 |
| dbo | MenuWeeks | U  | USER_TABLE | 2026-09-28 07:30:26.083 | 2026-09-29 08:02:16.463 | 0 |
| dbo | OrderCancellations | U  | USER_TABLE | 2026-09-29 10:21:22.797 | 2026-09-29 10:48:23.410 | 0 |
| dbo | Orders | U  | USER_TABLE | 2026-09-28 12:17:08.813 | 2026-10-07 08:14:48.223 | 0 |
| dbo | SaladOrderCancellations | U  | USER_TABLE | 2026-10-01 11:43:05.657 | 2026-10-01 11:43:05.690 | 0 |
| dbo | SaladOrders | U  | USER_TABLE | 2026-10-01 10:15:42.663 | 2026-10-07 08:14:48.280 | 0 |
| dbo | Salads | U  | USER_TABLE | 2026-10-01 09:43:23.647 | 2026-10-01 10:15:42.667 | 0 |
| dbo | vwExternalAccountBalances | V  | VIEW | 2026-10-01 12:10:28.700 | 2026-10-06 11:23:49.023 | 0 |
| dbo | vwExternalLunchChargeEntries | V  | VIEW | 2026-10-05 11:53:50.040 | 2026-10-06 11:23:49.003 | 0 |

## Integrity and current-code reconciliation

The reference above is the DEV extraction, not an executable rebuild baseline. Four employee logical references have no FK: SaladOrders.EmployeeNo, GuestSaladOrders.HostEmployeeNo, KioskCards.EmployeeNo and KioskSales.EmployeeNo. Lunch owner XOR/card-account consistency is API-only. The two cascades are MenuWeeks→MenuDays and MenuDays→DayMeals; all other delete actions and every update action are NO_ACTION. All exported FKs are enabled/trusted/not-for-replication=0; check trust is Unknown.

Current source mismatches: meal hard-delete uses Orders.MealID/GuestOrders.MealID instead of OrderedMealID; personal/guest salad replacement deletes cancellation-referenced rows; cancellation-preserving meal gross quantity can exceed SQL 50; personal salad duplicate merge has no final API cap despite SQL 50; external zero-total café sale conflicts with nonzero ledger amount. No schema/source fix was applied. Evidence: `lunchapp-api/src/functions/meals.js`, `lunchapp-api/src/functions/orders.js`, `lunchapp-api/src/functions/salad-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`, `lunchapp-api/src/functions/kiosk-sales.js`; `lunchappDEV/docs/05-sql/03-constraints.csv`, `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv`, `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv`. See 06/08/14 for contract consequences.

