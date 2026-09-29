# Changelog, 2026-09-29

## Employee administration

- Improved duplicate employee-number and card-number errors.
- API now returns structured duplicate information including field, value, employee number, and employee name.
- Error appears inside the employee dialog rather than in the global toast.
- Invalid field receives focus and red highlighting.
- Enter now activates Save Employee.

## Menu cycles

- Added `MenuCycles` database model.
- Migrated existing four-week menu into cycle 1.
- DEV cycle start date set to `2026-09-28` as week 1.
- Replaced global `WeekNumber` uniqueness with `(MenuCycleID, WeekNumber)` uniqueness.
- Added cycle listing, creation, update, publish, and archive API support.
- New cycle creation automatically creates weeks and Monday-Friday menu-day rows.
- Publish validation blocks incomplete cycles and cycles containing archived meals.
- Menu Admin now supports cycle selection, new draft cycles, publishing, and archiving.

## Menu resolution

- Replaced the hard-coded LocalStorage POC rotation anchor.
- Added date-based current-menu resolution.
- Employee UI requests menu data by calendar date.
- The latest Published cycle whose StartDate is on or before the requested date wins.
- No explicit EndDate is required.

## Meal deletion and archival

- Referenced meals are archived instead of permanently deleted.
- Hard deletion checks menu assignments, employee orders, and guest orders.
- Archived meals remain readable in historical data.

## Kitchen reporting

- Added a shared kitchen order-reporting API.
- Daily Kitchen Summary moved from `order-data.js` and demo data to Azure SQL.
- Added date selection, today default, refresh, search, daily totals, expandable meals, guest details within meals, printing, and trilingual date/category display.
- Removed the duplicate standalone guest-details panel.

## Kitchen cancellation

- Added audit-based order cancellation support.
- Added partial cancellation and fixed cancellation reason codes.
- Added a trilingual cancellation dialog.
- Added cancellation-aware kitchen totals.
- Updated personal and guest order APIs to preserve referenced order IDs and avoid foreign-key failures.
