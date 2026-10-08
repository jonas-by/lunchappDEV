# Lunch App DEV documentation package

Documentation snapshot for work completed on 2026-09-29.

## Folder structure

- `00-overview/` project status and deployment map
- `01-changelog/` chronological and component-level changes
- `02-architecture/` menu cycles, current-menu resolution, and cancellations
- `03-api/` API endpoint reference and deployment notes
- `04-frontend/` admin, employee, and kitchen UI changes
- `05-sql/` database changes kept separate from application documentation
- `06-testing/` stabilization and regression checklists
- `07-handover/` current status and recommended next work session

## Current headline status

- Employee administration duplicate validation is working and visible inside the dialog.
- Employee dialogs save with Enter.
- Menu rotation now uses database-backed menu cycles rather than a hard-coded frontend anchor.
- Draft, publish, and archive flows exist for menu cycles.
- Employee-facing menus resolve the correct published cycle by date.
- Daily Kitchen Summary reads production data from Azure SQL through a dedicated reporting API.
- Kitchen-side order cancellation is audit-based and supports employee and guest orders.
- Personal and guest order APIs preserve cancellation references instead of deleting and recreating referenced rows.

## Next planned work

Build the production-backed Weekly Summary using the existing `/api/kitchen/orders` reporting endpoint.
