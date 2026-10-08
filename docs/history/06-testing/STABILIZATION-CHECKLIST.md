# Stabilization checklist

## Menu cycles

- [ ] Existing migrated cycle loads all four weeks.
- [ ] New Draft cycle creates the configured number of weeks.
- [ ] Each new week contains Monday-Friday rows.
- [ ] Week data remains isolated between cycles.
- [ ] Incomplete Draft cannot be published.
- [ ] Draft containing an archived meal cannot be published.
- [ ] Future Published cycle does not take over early.
- [ ] Future Published cycle takes over on StartDate.
- [ ] Archived cycle remains readable but not editable.

## Employee ordering

- [ ] Personal order load and save work.
- [ ] Guest order load and save work.
- [ ] Saving another order after a kitchen cancellation does not cause an FK error.
- [ ] Fully cancelled order does not reappear after saving other dates.
- [ ] Current-menu endpoint returns the correct cycle and week.
- [ ] Friday simulation works across a cycle transition.

## Kitchen Summary

- [ ] Date defaults to today.
- [ ] Date heading follows selected language.
- [ ] Meal names and categories follow selected language.
- [ ] Meal accordion opens and closes.
- [ ] Employee and guest quantities match API totals.
- [ ] Guest work task/project is visible.
- [ ] Search filters by employee number, name, and guest project.
- [ ] Print output expands details and hides cancellation controls.

## Cancellations

- [ ] Employee cancellation succeeds.
- [ ] Guest cancellation succeeds.
- [ ] Partial cancellation succeeds.
- [ ] Over-cancellation returns 409.
- [ ] Fully cancelled order disappears from active kitchen totals.
- [ ] Daily total, employee total, guest total, and meal total decrease correctly.
- [ ] Cancellation survives employee or guest order save.
- [ ] Reason labels work in EN/SV/FI.
- [ ] OTHER requires additional information.
- [ ] Cancellation history remains in `OrderCancellations`.
