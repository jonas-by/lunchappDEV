# Daily Documentation 2026-10-06

## Summary

The session focused on external-card ownership, kiosk safety, kitchen traceability, and external-account financial controls.

The largest architectural correction was separating the external account used for billing from the individual card used to own and edit an order:

```text
ExternalAccountID = financial and reporting owner
CardID            = individual order owner
```

This model is now used consistently for external lunch and salad orders.

## Work completed

### 1. External CardID on lunch and salad orders

- Added nullable `CardID` columns to `dbo.Orders` and `dbo.SaladOrders`.
- Added foreign keys to `dbo.KioskCards(CardID)`.
- Updated lunch and salad order APIs to accept, validate, store, and return `cardId`.
- External card validation checks that the card:
  - exists;
  - is active;
  - is within its validity period;
  - belongs to the supplied external account.
- Employee orders continue to use `CardID = NULL`.
- Historical external orders with `CardID = NULL` remain historical account records and are not assigned to a card retrospectively.

### 2. Card-specific external order ownership

The initial CardID update still loaded external orders by `ExternalAccountID`. This was corrected.

For external users:

- GET operations are scoped by `CardID`.
- PUT reconciliation is scoped by `CardID`.
- A card can only load, update, or remove its own lunch and salad orders.
- Billing and reports can still aggregate by `ExternalAccountID`.

Validated with two cards connected to the same external account:

- Card 8 ordered one meal.
- Card 9 ordered another meal.
- Each card saw only its own order.
- The database stored separate rows with the correct CardID values.

### 3. Database uniqueness correction

The old filtered unique indexes allowed only one external account order per date and item. This conflicted with multiple cards on one account.

Old model:

```text
ExternalAccountID + MenuDate + Meal/Salad
```

New model:

```text
CardID + MenuDate + Meal/Salad
```

The old external-account unique indexes were replaced by filtered unique indexes on CardID.

### 4. Lunch Kiosk session safety

The Lunch Kiosk now logs out immediately after a successful non-guest order save.

Implementation:

- `/user/lunch.js` sends a same-origin `postMessage` after a successful save when hosted inside the kiosk iframe.
- `/lunchkiosk/kiosk-shell.js` receives the message, clears LunchApp user and kiosk session storage, and returns to card login.
- Normal use of `/user/` outside the kiosk is not automatically logged out.

### 5. Kitchen identity improvements

- The kitchen API now joins `dbo.KioskCards` using the exact `Orders.CardID` or `SaladOrders.CardID`.
- The previous `TOP (1)` account-level cardholder guess was removed.
- The kitchen API returns `cardNumberLast5` for external-card orders.
- `/admin/kitchen.js` displays:
  - employee number for employee orders;
  - last five card-number digits for external-card orders.
- Kitchen search includes the last five card-number digits.
- The cancellation dialog shows the same identifier.

### 6. Café Kiosk funds display

The Café Kiosk header now shows financial availability for external/temp cards.

- Prepaid: available balance.
- Postpaid: available credit.
- Invoice: available credit.
- Employee cards: existing employee information only.

Available credit is calculated as:

```text
CreditLimitCents - OutstandingCents
```

with a displayed minimum of zero.

### 7. Café Kiosk purchase enforcement

The Café Kiosk now blocks external purchases when funds or credit are insufficient.

Rules:

- Prepaid: basket total must not exceed `AvailablePrepaidCents`.
- Postpaid: basket total must not exceed `CreditLimitCents - OutstandingCents`.
- Invoice: same credit rule as Postpaid.
- Missing credit limit on Postpaid or Invoice blocks the purchase.
- Employees are unaffected.

The frontend disables the Buy button and shows available funds versus basket total. The API performs the authoritative check inside the transaction.

### 8. Financial architecture verified

A café sale was verified to create:

- a completed row in `dbo.KioskSales`;
- a matching negative `Purchase` row in `dbo.ExternalAccountLedger` linked by `SaleID`.

`dbo.vwExternalAccountBalances` is therefore the shared financial source covering:

- external account ledger entries;
- café purchases;
- external lunch charges;
- payments and manual adjustments represented in the ledger/view logic.

## Issues found and corrected

- Old frontend files from `/kiosk/` were archived because the active Lunch Kiosk lives in `/lunchkiosk/` and reuses `/user/`.
- CardID was initially stored in the kiosk session but not the shared user session consumed by `/user/`.
- External orders were initially still scoped by account rather than card.
- Old unique indexes blocked two cards from ordering the same item/date under one account.
- A kitchen SQL update initially added a result column to an unequal number of `UNION ALL` branches. The corrected API returns the same column count from all four branches.
- Existing browser sessions had to be cleared and cards rescanned when new session fields were introduced.

## Current priority

Next major implementation:

**Hard-block external lunch and salad order saves when prepaid funds or postpaid/invoice credit are insufficient.**

This requires net-difference charging logic because lunch orders are editable.
