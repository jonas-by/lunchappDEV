# Next session handover

## Planned target

Rebuild Weekly Summary against the production kitchen reporting API.

## Existing POC files

- `weekly-summary.html`
- `weekly-summary.js`
- `order-data.js`, POC data source to remove
- `lunch.css`

## Recommended approach

Use a Monday-Sunday or Monday-Friday date range against:

```text
GET /api/kitchen/orders?dateFrom={monday}&dateTo={friday}
```

Reuse the normalized order rows already consumed by Daily Kitchen Summary.

## Suggested Weekly Summary outputs

- employee portion total
- unique employee count
- guest portion total
- guest project/comment count
- rows grouped by employee
- guest totals grouped by exact work task/project
- CSV export for employee lunches
- CSV export for guest lunches
- print-friendly layout

## Important regression warning

Do not reintroduce `order-data.js`, demo rows, or LocalStorage report data. Weekly Summary should read exclusively from the Azure kitchen reporting API.

## Future reporting ideas

- cancellation count by reason
- insufficient-portions incidents by dish
- affected employees
- cancellation trend over time
- ordered versus cancelled portions
