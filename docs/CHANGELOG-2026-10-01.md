# Changelog: Lunch App and Café Kiosk

Date: 2026-10-01

## Executive summary

Today we completed the salad-ordering model across the lunch application and established the first production-grade foundation for the newly named **Café Kiosk**.

The lunch application now treats salads as independent order items rather than attributes attached to main dishes. Employees and guest hosts can order multiple salad types and quantities. Salad orders are persisted, shown in My Orders, included in daily and weekly kitchen summaries, and can be cancelled by the kitchen.

For Café Kiosk, we created the core database schema, product/card/account APIs, external-account ledger operations, and initial administration pages. The card model was corrected before stopping: employee cards remain authoritative in `dbo.Employees.CardNumber`, while `dbo.KioskCards` is reserved for external and temporary cards.

---

## 1. Salad administration

### Database and API

Created `dbo.Salads` with:

- EN, SV and FI names
- Active status
- Display sort order
- Created and updated timestamps
- Database constraints and active/sort index

Created `/api/salads` CRUD endpoints:

- `GET /api/salads`
- `GET /api/salads?includeInactive=true`
- `GET /api/salads/{id}`
- `POST /api/salads`
- `PUT /api/salads/{id}`
- `DELETE /api/salads/{id}`

Delete is a soft delete through `IsActive = 0`.

### Salad administration front end

Converted the localStorage POC salad administration page to the API. It now:

- Loads active and inactive salads
- Creates and updates multilingual salad records
- Deactivates existing salads
- Persists sort order
- Validates EN, SV and FI names

---

## 2. Independent salad ordering

### Final design decision

The initial implementation attached `SaladID` to a meal order. We corrected this after clarifying the business rule:

- A main dish and a salad are normally alternatives
- A person may occasionally order both
- Guest lunch orders may include several different salad types

The final model therefore uses independent salad orders.

### Database tables

Created:

- `dbo.SaladOrders`
- `dbo.GuestSaladOrders`

Removed the experimental `SaladID` linkage from:

- `dbo.Orders`
- `dbo.GuestOrders`

Each salad-order table stores date, salad, quantity, and employee/host context. Guest salad orders also store the work task or project.

### APIs

Created:

- `GET/PUT /api/salad-orders`
- `GET/PUT /api/guest-salad-orders`

The APIs:

- Replace salad orders over a supplied date range
- Validate that salads exist and are active
- Support multiple salad types per date
- Aggregate duplicate date/salad combinations
- Support guest work-task information

### Employee and guest ordering front end

Updated `lunch.js` and `lunch.css` to:

- Load active salads from `/api/salads`
- Render salads as independent rows with quantity steppers
- Load saved employee or guest salad orders
- Save meals and salads through separate API calls
- Track unsaved changes for both datasets
- Include salads in daily and overall counters
- Restore quantities after reload
- Preserve the 08:30 ordering lock
- Restore the yellow closed-order design
- Correct the alignment of the warning and SALADS heading

The save operation now persists meals and salads together with `Promise.all`. If either call fails, the page remains dirty and shows an error.

---

## 3. My Orders

Updated My Orders to load:

- Personal meal orders
- Personal salad orders
- Guest meal orders
- Guest salad orders

The page now:

- Separates main dishes and salads visually
- Includes salad quantities in weekly totals
- Includes salad quantities in monthly totals
- Shows guest work-task information for salad orders
- Supports EN, SV and FI names and labels

---

## 4. Daily kitchen summary

Updated `/api/kitchen/orders` to return:

- Employee meal orders
- Guest meal orders
- Employee salad orders
- Guest salad orders
- Remaining quantities after cancellations
- Correct source IDs for each order type

Updated the daily kitchen front end so meal and salad groups cannot collide and each salad appears as its own production item.

### Salad cancellation support

Created:

- `dbo.SaladOrderCancellations`
- `POST /api/kitchen/salad-order-cancellations`

The kitchen can now cancel salad orders with:

- Partial quantities
- Reason codes
- Optional comments
- Cancelled-by audit information

The daily summary subtracts recorded salad cancellations and hides fully cancelled salad-order rows.

---

## 5. Weekly kitchen summary

Updated `/api/kitchen/weekly-summary` to return:

- Main dishes served
- Salads ordered
- Total portions
- Meal cancellations
- Daily main-dish and salad totals
- Salad popularity
- Meal cancellation reasons

Updated the weekly front end with:

- Main dishes card
- Salads card
- Total portions card
- Cancelled meals card
- Main-dish versus salad daily chart
- Daily breakdown table
- Salad popularity section
- Existing meal cancellation-reason section

Important definition:

- Main-dish figures are served quantities after meal cancellations
- Salad figures are ordered quantities minus salad cancellations once the cancellation support is deployed

### Deployment issue resolved

We encountered a filename collision between the browser-side `weekly-summary.js` and the Function App API file. The correct structure is:

```text
API project:
  src/functions/kitchen-weekly-summary.js

Web project:
  weekly-summary.js
```

The API folder must not contain a duplicate browser-side `weekly-summary.js`.

---

## 6. Café Kiosk naming and architecture

The working product name is now **Café Kiosk**. **Baltic Café** remains a possible future branding option.

The production architecture was defined as:

- Product catalogue
- Card lookup
- Sale headers and lines
- External accounts
- Immutable financial ledger
- Future sale voiding and refunds

Money is stored as integer cents and timestamps use UTC.

---

## 7. Café Kiosk database schema

Created the six-table schema:

- `dbo.KioskProducts`
- `dbo.ExternalAccounts`
- `dbo.KioskCards`
- `dbo.KioskSales`
- `dbo.KioskSaleLines`
- `dbo.ExternalAccountLedger`

Also created:

- `dbo.vwExternalAccountBalances`

The view exposes:

- Balance
- Available prepaid amount
- Outstanding amount

### External account modes

Supported modes:

- `Prepaid`
- `Postpaid`
- `Invoice`

Ledger sign convention:

- Positive amounts add value or reduce debt
- Negative amounts consume value or increase debt

Examples:

```text
Prepayment +5000
Purchase    -350
Payment    +2000
Refund      +350
```

---

## 8. Café Kiosk APIs

### Products

Created `kiosk-products.js`:

- `GET /api/kiosk/products`
- `GET /api/kiosk/products?includeInactive=true`
- `GET /api/kiosk/products/{id}`
- `POST /api/kiosk/products`
- `PUT /api/kiosk/products/{id}`
- `DELETE /api/kiosk/products/{id}`

Delete is a soft delete.

### External accounts

Created `kiosk-external-accounts.js`:

- Account CRUD
- Ledger history
- Prepaid deposits
- Postpaid and invoice payments
- Manual credits and adjustments
- Balance and outstanding amount
- Account deactivation with assigned-card deactivation
- Transactional opening balance for prepaid accounts

### Card login and card administration

Created and then corrected:

- `kiosk-card-login.js`
- `kiosk-cards.js`

Final authoritative model:

```text
Employee physical card
  -> dbo.Employees.CardNumber
  -> managed in Employee Admin

External/temporary card
  -> dbo.KioskCards
  -> dbo.ExternalAccounts
  -> managed in Café Kiosk External Cards Admin
```

The login API first checks `dbo.Employees.CardNumber`. If no employee matches, it checks active external cards in `dbo.KioskCards`.

The external-card API rejects card numbers already assigned to employees.

---

## 9. Café Kiosk administration pages

Created:

- `kioskadmin/external-accounts.html`
- `kioskadmin/external-accounts.js`
- `kioskadmin/kiosk-cards-admin.html`
- `kioskadmin/kiosk-cards-admin.js`
- `kioskadmin/cafe-kiosk-admin.css`

External Accounts Admin supports:

- Create and edit accounts
- Prepaid, postpaid and invoice modes
- Deposits and payments
- Ledger history
- Validity and credit limits
- Search, filtering and deactivation

Cards Admin was initially built for employee and external cards. After the final API correction, it must be simplified tomorrow to manage external cards only.

Added both administration links to the main admin `index.html`:

```text
kioskadmin/external-accounts.html
kioskadmin/kiosk-cards-admin.html
```

Visible Bulla labels in the main administration layout were renamed to Café Kiosk.

---

## 10. Known follow-up items

- Update Cards Admin UI to external cards only
- Convert Café Kiosk product administration from localStorage to `/api/kiosk/products`
- Build `kiosk-sales.js`
- Convert user-facing card login and product ordering to the production APIs
- Build sales history and sale-void workflow
- Add Café Kiosk reporting against SQL data
- Decide how external-card lunch purchases should post to the external-account ledger
- Eventually clean the unused employee-owner columns from `dbo.KioskCards`, after confirming no data relies on them
- Review all navigation labels after the future corporate rebrand
