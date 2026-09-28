# Lunch App Database Change Log
Period: 2026-09-26 to 2026-09-28

## Overview

The database evolved from a POC structure into the current MVP schema. This document summarizes the database additions, migrations, relationships, constraints, and quantity-model changes made since Friday.

## Core Tables

The current core schema consists of:

```text
Employees
Meals
MenuWeeks
MenuDays
DayMeals
Orders
GuestOrders
```

## Meals

The meal library stores reusable multilingual dishes.

Relevant structure:

```text
MealID
NameEN
NameSV
NameFI
Category
Active
```

Supported categories:

```text
Main
Vegetarian
Soup
Salad
Dessert
```

Purpose:

- Reusable menu dishes
- Multilingual employee display
- Menu filtering
- Kitchen reporting
- Soft deletion through `Active`

## Rotating Menu Structure

The earlier date-based POC menu was replaced by a reusable rotation model:

```text
MenuWeeks
  -> MenuDays
      -> DayMeals
          -> Meals
```

### MenuWeeks

Stores rotation week numbers.

```text
Week 1
Week 2
Week 3
Week 4
...
```

The current API supports week numbers 1 through 8.

### MenuDays

Stores weekdays for each rotation week:

```text
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
```

### DayMeals

Maps rotation weekdays to reusable meals.

### Menu Constraints

Week-number constraint:

```text
WeekNumber between 1 and 8
```

Day-number constraint:

```text
DayNumber between 1 and 5
```

Duplicate meal prevention:

```text
MenuDayID + MealID
```

The unique combination prevents adding the same meal more than once to the same menu day.

## Employees

Verified structure:

```text
EmployeeNo
FirstName
LastName
Email
CardNumber
Active
```

`EmployeeNo` is the primary key.

Employee API behavior now supports:

- Create
- Update
- Deactivate
- Restore
- Permanent deletion when no order history exists

### Employee Number Migration

An existing employee test record was changed from employee number `12345` to `10435`.

Because personal orders referenced the old employee number, the migration required coordinated updates to `Employees` and `Orders` while preserving the foreign key.

The resulting record uses:

```text
EmployeeNo = 10435
CardNumber = 10435
```

### Recommended Card Constraint

The API prevents duplicate non-null card numbers. The database should also enforce this with a filtered unique index after duplicate validation:

```sql
CREATE UNIQUE INDEX UX_Employees_CardNumber
ON dbo.Employees(CardNumber)
WHERE CardNumber IS NOT NULL;
```

## Personal Orders

### Original Design

The original structure was:

```text
OrderID
EmployeeNo
MenuDate
OrderedMealID
OrderTime
```

Quantity was represented by duplicate physical rows.

Example:

```text
2 lunches = 2 rows
```

This worked through API grouping but was unintuitive in SQL and unnecessarily complicated reporting.

### Revised Design

An explicit `Quantity` column was added through a replacement-table migration that grouped existing duplicates.

Current structure:

```text
OrderID
EmployeeNo
MenuDate
OrderedMealID
Quantity
OrderTime
```

Current behavior:

```text
2 lunches = 1 row with Quantity = 2
```

Benefits:

- One row per logical personal order
- Same basic quantity model as GuestOrders
- Simpler kitchen totals
- Simpler reporting
- Easier direct SQL inspection
- Fewer physical rows

### Personal Order Constraints

Foreign keys:

```text
Orders.EmployeeNo
  -> Employees.EmployeeNo

Orders.OrderedMealID
  -> Meals.MealID
```

Quantity check:

```text
Quantity between 1 and 50
```

Recommended or implemented logical uniqueness:

```text
EmployeeNo + MenuDate + OrderedMealID
```

This ensures one personal order line per employee, date, and meal.

## GuestOrders

A separate GuestOrders table was added instead of mixing personal and guest orders in one table.

Current structure:

```text
GuestOrderID
HostEmployeeNo
MenuDate
OrderedMealID
Quantity
WorkTask
OrderTime
```

Purpose:

- Keep guest lunches separate from employee payroll-related lunches
- Store the responsible host employee
- Store explicit guest quantity
- Require a work task, project, or business reason
- Simplify guest reporting

Relationships:

```text
GuestOrders.HostEmployeeNo
  -> Employees.EmployeeNo

GuestOrders.OrderedMealID
  -> Meals.MealID
```

Guest quantities have always been stored explicitly:

```text
Quantity = number of guest portions
```

## Unified Quantity Model

Following the personal-order migration, both order tables now use explicit quantities:

```text
Personal quantity = SUM(Orders.Quantity)
Guest quantity    = SUM(GuestOrders.Quantity)
```

This simplifies future kitchen totals:

```text
Personal portions
+
Guest portions
=
Required kitchen portions
```

Example aggregation:

```sql
SELECT
    o.MenuDate,
    o.OrderedMealID AS MealID,
    SUM(o.Quantity) AS Quantity,
    'Personal' AS OrderType
FROM dbo.Orders o
GROUP BY
    o.MenuDate,
    o.OrderedMealID

UNION ALL

SELECT
    go.MenuDate,
    go.OrderedMealID AS MealID,
    SUM(go.Quantity) AS Quantity,
    'Guest' AS OrderType
FROM dbo.GuestOrders go
GROUP BY
    go.MenuDate,
    go.OrderedMealID;
```

## Soft Delete Strategy

Soft deletion is implemented through:

```text
Employees.Active
Meals.Active
```

Soft deletion is preferred because employees and meals may be referenced by menu or order history.

Permanent deletion is allowed only when no dependent history exists.

The APIs return `409 Conflict` when permanent deletion would violate retained history.

## Referential Integrity

Current important references:

```text
Orders.EmployeeNo
  -> Employees.EmployeeNo

Orders.OrderedMealID
  -> Meals.MealID

GuestOrders.HostEmployeeNo
  -> Employees.EmployeeNo

GuestOrders.OrderedMealID
  -> Meals.MealID

DayMeals.MealID
  -> Meals.MealID

DayMeals.MenuDayID
  -> MenuDays.MenuDayID

MenuDays.MenuWeekID
  -> MenuWeeks.MenuWeekID
```

## Data Integrity Checks

### Personal order orphans

```sql
SELECT o.*
FROM dbo.Orders o
LEFT JOIN dbo.Employees e
    ON e.EmployeeNo = o.EmployeeNo
LEFT JOIN dbo.Meals m
    ON m.MealID = o.OrderedMealID
WHERE e.EmployeeNo IS NULL
   OR m.MealID IS NULL;
```

Expected result: zero rows.

### Guest order orphans

```sql
SELECT go.*
FROM dbo.GuestOrders go
LEFT JOIN dbo.Employees e
    ON e.EmployeeNo = go.HostEmployeeNo
LEFT JOIN dbo.Meals m
    ON m.MealID = go.OrderedMealID
WHERE e.EmployeeNo IS NULL
   OR m.MealID IS NULL;
```

Expected result: zero rows.

### Duplicate personal order lines

```sql
SELECT
    EmployeeNo,
    MenuDate,
    OrderedMealID,
    COUNT(*) AS DuplicateCount
FROM dbo.Orders
GROUP BY
    EmployeeNo,
    MenuDate,
    OrderedMealID
HAVING COUNT(*) > 1;
```

Expected result: zero rows.

### Duplicate employee card numbers

```sql
SELECT
    CardNumber,
    COUNT(*) AS EmployeeCount
FROM dbo.Employees
WHERE CardNumber IS NOT NULL
GROUP BY CardNumber
HAVING COUNT(*) > 1;
```

Expected result: zero rows.

## Recommended Future Configuration Table

The rotation anchor is currently configured in frontend JavaScript.

A future settings table should store values such as:

```text
RotationStartDate
MenuCycleWeeks
OrderDeadline
```

Possible structure:

```text
SettingKey
SettingValue
UpdatedTime
```

This would allow rotation and deadline changes without a frontend redeployment.

## Current Database Status

The database now supports the full MVP workflow:

```text
Employees
  -> Login and order ownership

Meals
  -> Reusable multilingual dish library

MenuWeeks -> MenuDays -> DayMeals
  -> Rolling menu configuration

Orders
  -> Personal employee lunches with explicit quantity

GuestOrders
  -> Guest lunches with explicit quantity and work task
```

Status:

```text
Database ready for MVP stabilization and kitchen reporting
```
