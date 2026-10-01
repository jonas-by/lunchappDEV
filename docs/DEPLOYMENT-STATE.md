# Deployment state and file map

Date: 2026-10-01

## Function App files created or updated today

Lunch and salads:

```text
salads.js
salad-orders.js
guest-salad-orders.js
kitchen-orders.js
kitchen-salad-order-cancellations.js
kitchen-weekly-summary.js
```

Café Kiosk:

```text
kiosk-products.js
kiosk-card-login.js
kiosk-cards.js
kiosk-external-accounts.js
```

## Database scripts created today

```text
dbo.Salads.sql
independent-salad-orders.sql
add-salad-order-cancellations.sql
cafe-kiosk-schema.sql
```

## Web files created or updated today

Lunch ordering:

```text
lunch.js
lunch.css
my-orders.js
kitchen.js
weekly-summary.js
weekly-summary.html
weekly-summary.css
```

Café Kiosk administration:

```text
kioskadmin/external-accounts.html
kioskadmin/external-accounts.js
kioskadmin/kiosk-cards-admin.html
kioskadmin/kiosk-cards-admin.js
kioskadmin/cafe-kiosk-admin.css
```

Main administration navigation:

```text
index.html
```

## Important final card model

```text
dbo.Employees.CardNumber
  = employee physical cards
  = managed by Employee Admin
  = used for lunch and Café Kiosk login

dbo.KioskCards
  = external and temporary cards only
  = always linked to dbo.ExternalAccounts
  = managed by External Cards Admin
```

## Current mismatch to fix first tomorrow

The deployed API follows the final model, but the current Cards Admin front end may still contain:

- Owner type selection
- Employee card option
- Employee number field

Those elements must be removed.

## Main admin navigation paths

From the main admin `index.html`:

```text
kioskadmin/external-accounts.html
kioskadmin/kiosk-cards-admin.html
```

## Weekly summary filename warning

Correct locations:

```text
API:
  src/functions/kitchen-weekly-summary.js

Web:
  weekly-summary.js
```

Do not place the browser-side file in the Function App folder.
