# Project status, 2026-09-29

## Stable and tested

### Employee administration

- Add and edit employees through the API.
- Duplicate employee number and card number validation.
- Duplicate messages identify the employee currently using the value.
- Validation appears inside the Add/Edit Employee dialog.
- The offending field is highlighted.
- Enter submits the dialog.

### Menu administration

- Meal library is API-backed.
- Four-week menu data was migrated into a database-backed menu cycle.
- Multiple cycles can coexist.
- New cycles can be prepared in advance as Draft.
- Draft cycles can be Published after completeness validation.
- Published cycles can be Archived.
- Menu weeks are unique within a cycle, not globally.
- Archived dishes remain available in historical menu data but are excluded from new selections.

### Employee ordering

- Personal and guest orders use APIs.
- The employee view no longer calculates rotation with a hard-coded anchor.
- `/api/menu/current?date=YYYY-MM-DD` resolves the published cycle and rotation week.
- A future published cycle automatically takes over on its StartDate.

### Kitchen view

- Daily production totals are loaded from `/api/kitchen/orders`.
- Employee and guest portions are grouped by dish.
- Each dish is an expandable accordion with the people and guest projects underneath.
- Date defaults to today.
- Dates, categories, and cancellation reasons support English, Swedish, and Finnish.
- Orders can be cancelled after the 08:30 deadline.
- Cancellations preserve history and reduce active production totals.

## Known follow-up work

- Weekly Summary remains POC/local-data based.
- Order Explorer remains POC/local-data based.
- Statistics remains to be rebuilt against production APIs.
- Employee-facing cancellation history is not yet shown explicitly.
- Authentication and authorization for kitchen cancellation are not implemented yet. `CancelledBy` currently defaults to `Kitchen`.
- Cancellation reporting and shortage trend graphs are future work.
