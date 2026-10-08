# Menu-cycle architecture

## Data hierarchy

```text
MenuCycles
  -> MenuWeeks
      -> MenuDays
          -> DayMeals
              -> Meals
```

## Cycle selection rule

For a requested date, select:

```sql
SELECT TOP (1)
    MenuCycleID,
    Name,
    StartDate,
    NumberOfWeeks
FROM dbo.MenuCycles
WHERE Status = N'Published'
  AND StartDate <= @RequestedDate
ORDER BY StartDate DESC, MenuCycleID DESC;
```

The selected cycle is the most recently started Published cycle applicable to the date.

## Rotation calculation

```text
Elapsed weeks = floor((RequestedDate - StartDate) / 7 days)
Rotation week = (Elapsed weeks modulo NumberOfWeeks) + 1
```

## Operational consequence

A summer cycle can remain Published while an autumn cycle is published with a future StartDate. Before the autumn StartDate, summer resolves. On the autumn StartDate, autumn week 1 resolves automatically.

No EndDate is required because the next applicable Published cycle implicitly supersedes the previous cycle.

## Statuses

- `Draft`: editable and unavailable to employee date resolution.
- `Published`: eligible for date resolution.
- `Archived`: retained for history and not editable in Menu Admin.

## Publish validation

A Draft cannot be published when:

- a configured week is missing
- Monday-Friday rows are incomplete
- a weekday has no assigned meal
- an assigned meal is archived
