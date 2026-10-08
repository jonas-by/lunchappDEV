# Meal archival and deletion

## Current policy

- Referenced meals are not permanently deleted.
- Normal deletion archives by setting `Active = 0`.
- Archived meals disappear from new menu selection.
- Historical menus and orders still resolve the meal.
- Hard deletion is permitted only when the meal has no references.

## Hard-delete reference checks

The meals API checks:

- `DayMeals`
- `Orders`
- `GuestOrders`

The API returns a structured 409 response when references exist.
