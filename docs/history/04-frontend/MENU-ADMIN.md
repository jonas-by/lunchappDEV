# Menu Admin

## Cycle controls

- Select existing cycle.
- Create a new Draft cycle.
- Configure name, Monday StartDate, and 1-8 weeks.
- Publish a complete Draft.
- Archive an existing cycle.

## Week editing

Menu-week reads and writes use:

```text
/api/menu/cycles/{cycleId}/weeks/{weekNumber}
```

The UI no longer uses the ambiguous legacy route `/api/menu/week/{weekNumber}`.

## Archived cycles

Archived cycles remain selectable for historical viewing. Save and Copy Previous Week are disabled.
