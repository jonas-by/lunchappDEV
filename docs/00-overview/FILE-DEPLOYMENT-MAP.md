# File deployment map

## Azure Functions

Place these files under `src/functions/`:

- `menu-cycles.js`
- `menu-week.js`
- `current-menu.js`
- `kitchen-orders.js`
- `kitchen-order-cancellations.js`
- `meals.js`
- `orders.js`
- `guest-orders.js`
- `employees.js`

Restart locally with:

```powershell
func start
```

Deploy the Function App after local Postman checks pass.

## Admin frontend

- `employee-admin.html`
- `employee-admin.js`
- `menu-admin.html`
- `menu-admin.js`
- `kitchen-summary.html`
- `kitchen.js`
- `lunch.css`

## Employee frontend

- `/user/lunch.js`

The employee `index.html` did not require structural changes for menu cycles. If browser/CDN caching causes stale JavaScript, add or increment a cache-busting query string such as:

```html
<script src="lunch.js?v=20260929-1" defer></script>
```
