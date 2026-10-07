# API Changes 2026-10-06

## `orders.js`

- Accepts `cardId` for external orders.
- Requires both `externalAccountId` and `cardId` for external order operations.
- Validates card ownership, active status, and validity dates.
- External GET requests are scoped by CardID.
- External PUT reconciliation is scoped by CardID.
- Inserts and updates persist `CardID`.
- Employee behaviour remains scoped by EmployeeNo.
- GET responses include `cardId`.

## `salad-orders.js`

- Mirrors the external CardID rules used by `orders.js`.
- External GET, replacement/delete, and insert operations are scoped by CardID.
- Inserts persist both ExternalAccountID and CardID.
- Employee behaviour remains unchanged.

## `kitchen-orders.js`

- Resolves external cardholder names with exact CardID joins.
- Removes account-level `TOP (1)` card guessing.
- Returns the last five digits of `KioskCards.CardNumber` as `cardNumberLast5`.
- Returns NULL for `cardNumberLast5` in employee and guest branches.
- Keeps the four `UNION ALL` result sets column-compatible.

## `kiosk-card-login.js`

For external/temp cards, the response includes:

- `cardId`
- `externalAccountId`
- `cardHolderName`
- `displayName`
- `companyName`
- `accountMode`
- `creditLimitCents`
- `balanceCents`
- `availableBalanceCents`
- `outstandingCents`
- `availableCreditCents`

Available credit is calculated as credit limit minus outstanding balance, never below zero for display purposes.

## `kiosk-sales.js`

Café purchase enforcement now:

1. Starts a serializable transaction.
2. Resolves and validates the card owner.
3. Calculates the basket total from active product prices in the database.
4. Locks the external account row.
5. Reads authoritative values from `dbo.vwExternalAccountBalances`.
6. Applies account-mode rules.
7. Creates the sale, sale lines, and external ledger entry only if funds are sufficient.

### Enforcement rules

```text
Prepaid available = AvailablePrepaidCents
Postpaid available = CreditLimitCents - OutstandingCents
Invoice available = CreditLimitCents - OutstandingCents
```

A missing credit limit blocks Postpaid and Invoice purchases.

### Expected API conflicts

Insufficient prepaid funds:

```json
{
  "error": "Insufficient prepaid balance."
}
```

Insufficient postpaid/invoice credit:

```json
{
  "error": "Credit limit exceeded."
}
```

The API uses HTTP 409 for these business-rule conflicts.
