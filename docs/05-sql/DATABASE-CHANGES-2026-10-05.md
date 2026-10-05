# Database Changes: 2026-10-05

## Orders and SaladOrders ownership

Both tables support either an employee owner or an external-account owner.

### Orders

Relevant ownership columns:

```text
EmployeeNo         nullable
ExternalAccountID  nullable
```

### SaladOrders

Relevant ownership columns:

```text
EmployeeNo         nullable
ExternalAccountID  nullable
```

The intended invariant is exactly one owner per row.

## Unique-index correction

The original employee unique constraints treated all external rows as the same employee because `EmployeeNo` was `NULL`.

Example failure:

```text
Violation of UQ_Orders_New_Employee_Date_Meal
Duplicate key: (NULL, 2026-10-06, 8)
```

The solution is filtered unique indexes.

### Meal orders

```text
Employee uniqueness:
EmployeeNo + MenuDate + OrderedMealID
WHERE EmployeeNo IS NOT NULL

External uniqueness:
ExternalAccountID + MenuDate + OrderedMealID
WHERE ExternalAccountID IS NOT NULL
```

### Salad orders

```text
Employee uniqueness:
EmployeeNo + MenuDate + SaladID
WHERE EmployeeNo IS NOT NULL

External uniqueness:
ExternalAccountID + MenuDate + SaladID
WHERE ExternalAccountID IS NOT NULL
```

## ManualLunchAdjustments

Added a separate table for post-deadline employee lunch charges.

Conceptual structure:

```text
AdjustmentID
EmployeeNo
MenuDate
Quantity
Reason nullable
CreatedBy nullable
CreatedAt
```

This preserves the distinction between a normal employee order and an administrative late lunch addition.

## ExternalLunchPrices

Added effective-dated external lunch pricing.

```text
ExternalLunchPriceID
PriceCents
ValidFrom
CreatedAt
CreatedBy
```

Initial row:

```text
PriceCents: 1135
ValidFrom: 2026-09-01
```

`ValidFrom` is unique. Historical rows are retained and future price changes add new rows.

## vwExternalLunchChargeEntries

Added a derived view that calculates active external lunch charges from:

- External meal orders
- External salad orders
- Meal cancellations
- Salad cancellations
- Price valid on each order's `MenuDate`

Conceptual output:

```text
SourceType
SourceID
ExternalAccountID
MenuDate
ActiveQuantity
PriceCents
ChargeCents
ItemName
```

No permanent lunch charge row is inserted into `ExternalAccountLedger`.

## vwExternalAccountBalances

Updated balance calculation to combine:

```text
Existing ExternalAccountLedger total
- Derived external lunch charges
= BalanceCents
```

Behavior by account mode:

- Prepaid: lunch charges reduce available prepaid balance.
- Postpaid: negative balance becomes outstanding.
- Invoice: negative balance becomes outstanding.

## Derived ledger approach

External lunch ledger lines are generated from the effective-order view. Benefits:

- No duplicate charge when an order is saved repeatedly.
- Quantity edits recalculate automatically.
- Cancellations recalculate automatically.
- Existing orders from 2026-09-01 onward are valued automatically.
- Future prices do not rewrite historical order values.

## Existing cancellation model

The existing cancellation tables and workflows remain untouched. Reports, kitchen views, and external balances subtract cancellation quantities from original order quantities.
