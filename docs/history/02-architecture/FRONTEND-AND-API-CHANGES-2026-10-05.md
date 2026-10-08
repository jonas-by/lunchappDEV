# Frontend and API Changes: 2026-10-05

## Ordering APIs

### `orders.js`

The meal-order API now accepts exactly one owner:

- `employeeNo`
- `externalAccountId`

It validates active employees or active and currently valid external accounts. Reads, inserts, updates, and replacements use the appropriate owner column. External orders store `EmployeeNo = NULL` and an `ExternalAccountID` value.

### `salad-orders.js`

The salad-order API follows the same ownership model. External salad orders use `ExternalAccountID` and a nullable `EmployeeNo`.

### Owner payload model

Employee:

```json
{
  "employeeNo": 10435,
  "dateFrom": "2026-10-05",
  "dateTo": "2026-10-11",
  "orders": []
}
```

External:

```json
{
  "externalAccountId": 3,
  "dateFrom": "2026-10-05",
  "dateTo": "2026-10-11",
  "orders": []
}
```

## Lunch kiosk and user frontend

### External sessions

External card login stores:

- `ownerType = external`
- `externalAccountId`
- `cardHolderName`
- `displayName`
- `companyName`
- card metadata

Employee sessions remain backward-compatible.

### Guest ordering restrictions

External users:

- Do not see the guest-order menu entry.
- Are redirected away from the guest-order page if navigating directly.
- Do not call guest-order APIs from My Orders.

The frontend restriction is UX protection. Server-side guest-order validation remains the actual authorization boundary within the current pilot architecture.

### Lunch kiosk login page

The login page was restored to a centered card layout matching the Café Kiosk style. The language selector is located at the bottom. The centering is implemented through the `.login-shell` CSS container.

## Kitchen summary

### `kitchen-orders.js`

Personal meal and salad rows now resolve names as follows:

1. Employee first and last name for employee orders.
2. `KioskCards.CardHolderName` for external orders.
3. `ExternalAccounts.DisplayName` if no cardholder name is available.
4. Generic external-account fallback.

The current implementation selects the first active named card for an account because orders do not yet store the exact card used.

### `kitchen.js`

The UI no longer appends a missing employee number to external orders. Cancellation dialogs show the external display name without `null` values.

## Employee administration

### Manual lunch additions

The employee table includes an Add Lunch action. The dialog selects:

- Employee
- Lunch date, default today
- Quantity, default 1

The current UI intentionally omits reason and creator fields, although the database supports them.

### Compact actions

Table actions use icon buttons:

- 🍽️ Add lunch
- ✏️ Edit
- 🚫 Disable
- ↩️ Restore

Tooltips and accessible labels remain present.

## Lunch reports

### `lunch-reports.js`

The API returns:

- Employee payroll rows
- Separate external-account rows
- Guest lunch totals
- Summary counts

Employee lunch totals equal:

```text
Effective personal meal quantity
+ Effective personal salad quantity
+ Manual lunch additions
```

External lunch totals combine effective external meals and salads.

### `lunch-reports.html`, `lunch-reports.css`, `lunch-reports-ui.js`

Features include:

- Current and previous week presets
- Current and previous month presets
- Custom date range
- Swedish, Finnish, and English UI
- Employee payroll CSV export
- External-account CSV export

The external CSV contains:

```text
Account
Company
External reference
Invoice reference
Number of lunches
```

The frontend calls the standalone API host:

```text
https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/lunch-reports
```

## External lunch prices

### `external-lunch-prices.js` API

Supports:

- GET price history
- POST a new effective-dated price

Existing price rows are not edited. A future price change is represented by a new row with a new `ValidFrom` date.

### Admin page

The External Lunch Prices page shows:

- Current price
- Effective date
- Price history
- Form for adding the next price

The back link returns to `admin/index.html`.

## External account ledger

`kiosk-external-accounts.js` now combines:

- Existing financial ledger entries
- Derived external lunch purchase entries

Lunch entries are presented as `LunchPurchase` with a negative amount and a description containing quantity, unit price, and item name.

## Kiosk card balances

### `kiosk-cards.js`

The API now returns:

- `balanceCents`
- `availablePrepaidCents`
- `outstandingCents`

### `kiosk-cards-admin.js`

Card tiles display:

For prepaid:

```text
Balance
Available
Validity
```

For postpaid and invoice:

```text
Balance
Outstanding
Validity
```
