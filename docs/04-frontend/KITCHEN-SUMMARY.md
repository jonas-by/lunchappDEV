# Daily Kitchen Summary

## Data source

```text
GET /api/kitchen/orders?dateFrom={date}&dateTo={date}
```

## Current behaviour

- Defaults the date input to the local current date.
- Supports arbitrary historical or future date selection.
- Shows total, employee, guest, and meal-choice counts.
- Groups active quantities by meal.
- Uses expandable meal accordions.
- Separates employee and guest rows within each meal.
- Shows guest work task/project.
- Supports search by name, employee number, or guest work task.
- Supports EN/SV/FI meal names, categories, date formatting, and cancellation labels.
- Prints all meal details expanded.

## Cancellation UI

Each active order has a small outlined Cancel/Avboka/Peruuta button.

The dialog contains:

- employee or host
- dish
- date
- guest work task/project
- quantity to cancel
- reason
- additional information
- cancelled by

After success, the modal closes, the selected date reloads, the expanded meal remains open, and active totals update.
