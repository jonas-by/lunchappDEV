# Architecture Notes 2026-10-06

## External account and card ownership

External purchasing and ordering now deliberately use two identifiers:

| Identifier | Responsibility |
|---|---|
| `ExternalAccountID` | Billing, balances, reporting, account mode, credit limit, company/account ownership |
| `CardID` | Exact physical card, cardholder traceability, editable lunch/salad order ownership |

One external account may own multiple cards. Each card must have an independent editable lunch-order view, while charges and reports remain aggregated at account level.

## Order identity rules

### Employee order

```text
EmployeeNo       = populated
ExternalAccountID = NULL
CardID            = NULL
```

### External card order

```text
EmployeeNo        = NULL
ExternalAccountID = populated
CardID            = populated and belongs to ExternalAccountID
```

### Guest order

Guest ordering continues through the existing guest-order tables and APIs. No external CardID change was made to guest ordering.

## Financial source of truth

`dbo.ExternalAccountLedger` is the account transaction ledger.

Verified Café purchase flow:

```text
Café Kiosk purchase
  -> dbo.KioskSales
  -> dbo.ExternalAccountLedger, negative Purchase entry
  -> dbo.vwExternalAccountBalances
```

External lunch charges are included through the balance view's lunch-charge logic. The view exposes:

- `BalanceCents`
- `AvailablePrepaidCents`
- `OutstandingCents`
- `CreditLimitCents`

The same balance view is now used for Café Kiosk login display and authoritative purchase enforcement.

## Concurrency decision

Financial enforcement must be performed inside the API transaction.

For Café sales, the API locks the relevant external account row before reading the balance view and creating the sale/ledger rows. This prevents two simultaneous requests from both using the same remaining funds.

Frontend checks are UX only and must never be considered authoritative.

## Lunch Kiosk composition

`/lunchkiosk/` is a kiosk shell. It embeds the existing `/user/` ordering UI.

```text
/lunchkiosk/index.html
  -> card login
/lunchkiosk/order.html
  -> iframe for /user/index.html
/user/lunch.js
  -> calls orders and salad-orders APIs
```

A same-origin `postMessage` signals successful save from `/user/` to the kiosk shell. The shell performs complete logout.

## Directory decisions

- General admin pages: `/admin/`
- Café kiosk admin pages: `/admin/kioskadmin/`
- Café kiosk runtime: `/bulla/`
- Planned future rename: `/bulla/` to `/cafe/`

Path cleanup is deliberately deferred until current flows are stable.
