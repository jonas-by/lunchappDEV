# Lunch App Order Data Model

## Purpose

This document describes how personal and guest lunch orders are stored in the Lunch App database, how quantities are represented, and how the order APIs expose the data to the frontend.

## Overview

The application uses separate tables for personal and guest orders:

- `dbo.Orders` stores personal employee lunch orders.
- `dbo.GuestOrders` stores guest lunches ordered by a host employee.
- Both tables store one logical order line per employee, date, and meal.
- Both tables use an explicit `Quantity` column.
- Both tables reference `dbo.Meals` and `dbo.Employees`.
- Rotating-menu configuration is stored separately.

```text
Employees
    |
    +----------------------+----------------------+
    |                                             |
    v                                             v
Orders                                      GuestOrders
Personal employee lunches                   Guest lunches
    |                                             |
    +----------------------+----------------------+
                           |
                           v
                         Meals
                           ^
                           |
MenuWeeks -> MenuDays -> DayMeals
```

## Personal Orders

### Table

```text
dbo.Orders
```

### Columns

| Column | Purpose |
|---|---|
| `OrderID` | Unique identity value for the order line. |
| `EmployeeNo` | Employee receiving the lunch. References `dbo.Employees.EmployeeNo`. |
| `MenuDate` | Calendar date on which the lunch will be served. |
| `OrderedMealID` | Selected meal. References `dbo.Meals.MealID`. |
| `Quantity` | Number of personal lunch portions on the order line. |
| `OrderTime` | Timestamp recorded when the order line was created. |

### Example

If employee `10435` orders two portions of Meal ID `5` for 2026-09-30, one row is stored:

```text
OrderID:       2
EmployeeNo:    10435
MenuDate:      2026-09-30
OrderedMealID: 5
Quantity:      2
OrderTime:     database-generated timestamp
```

The database and API now use the same quantity model:

```text
Database representation: one order line with Quantity
API representation:      one order line with quantity
```

### Uniqueness

The schema should enforce one personal order line for each combination of:

```text
EmployeeNo + MenuDate + OrderedMealID
```

This prevents duplicate logical order lines while still allowing any valid quantity within the configured limit.

## Guest Orders

### Table

```text
dbo.GuestOrders
```

### Columns

| Column | Purpose |
|---|---|
| `GuestOrderID` | Unique identity value for the guest order line. |
| `HostEmployeeNo` | Employee responsible for the guest order. References `dbo.Employees.EmployeeNo`. |
| `MenuDate` | Calendar date on which the guest lunch will be served. |
| `OrderedMealID` | Selected meal. References `dbo.Meals.MealID`. |
| `Quantity` | Number of guest portions represented by the order line. |
| `WorkTask` | Required work task, project, visit, or business reason. |
| `OrderTime` | Timestamp recorded when the guest order was created. |

### Example

If employee `10435` orders three portions of Vegetarian Lasagna for a supplier visit on 2026-10-02, one row is stored:

```text
GuestOrderID:   1
HostEmployeeNo: 10435
MenuDate:       2026-10-02
OrderedMealID:  6
Quantity:       3
WorkTask:       Supplier visit
OrderTime:      database-generated timestamp
```

## Employees and Order Ownership

### Personal orders

```text
Orders.EmployeeNo
    -> Employees.EmployeeNo
```

`EmployeeNo` identifies the employee receiving the personal lunch.

### Guest orders

```text
GuestOrders.HostEmployeeNo
    -> Employees.EmployeeNo
```

`HostEmployeeNo` identifies the employee responsible for the guest lunches. Individual guests do not currently have employee records or separate guest identities.

Employees with order history should normally be deactivated instead of permanently deleted. This preserves order history and referential integrity.

## Meals and Order Selection

Both personal and guest orders reference the reusable meal library:

```text
Orders.OrderedMealID
    -> Meals.MealID

GuestOrders.OrderedMealID
    -> Meals.MealID
```

Order rows do not copy meal names or categories. The APIs join the orders to `dbo.Meals` and return:

- English name
- Swedish name
- Finnish name
- Category

A corrected meal name or category is therefore reflected when order data is read later.

## Rotating Menu Relationship

The rotating menu is stored separately:

```text
MenuWeeks
    -> MenuDays
        -> DayMeals
            -> Meals
```

The menu determines which meals are available for a rotation week and weekday. Saved orders use a calendar date and `MealID`:

```text
Menu availability: rotation week + weekday -> MealID
Saved order:       calendar date + MealID + Quantity
```

Orders reference meals, not `MenuDayID` or `DayMealID`.

## Personal Orders API

### Read

```http
GET /api/orders?employeeNo=10435&dateFrom=2026-09-28&dateTo=2026-10-02
```

Example response:

```json
{
  "employeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": [
    {
      "orderId": 2,
      "employeeNo": 10435,
      "menuDate": "2026-09-30",
      "mealId": 5,
      "quantity": 2,
      "nameEN": "Fish Soup",
      "nameSV": "Fisksoppa",
      "nameFI": "Kalakeitto",
      "category": "Soup"
    }
  ]
}
```

The API reads `Orders.Quantity` directly. No grouping of duplicate physical rows is required.

### Save or replace

```http
PUT /api/orders
Content-Type: application/json
```

```json
{
  "employeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": [
    {
      "menuDate": "2026-09-29",
      "mealId": 3,
      "quantity": 1
    },
    {
      "menuDate": "2026-09-30",
      "mealId": 5,
      "quantity": 2
    }
  ]
}
```

`PUT /api/orders` replaces all personal orders for the submitted employee and date range:

1. Validate the employee, dates, meal IDs, and quantities.
2. Begin a SQL transaction.
3. Delete existing personal orders for the employee in the submitted date range.
4. Insert one row per submitted order line, including `Quantity`.
5. Commit the transaction.

An empty order array clears the submitted date range.

## Guest Orders API

### Read

```http
GET /api/guest-orders?hostEmployeeNo=10435&dateFrom=2026-09-28&dateTo=2026-10-02
```

### Save or replace

```http
PUT /api/guest-orders
Content-Type: application/json
```

```json
{
  "hostEmployeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": [
    {
      "menuDate": "2026-10-02",
      "mealId": 6,
      "quantity": 3,
      "workTask": "Supplier visit"
    }
  ]
}
```

`PUT /api/guest-orders` replaces all guest orders for the host employee in the submitted date range. Each submitted guest order becomes one row with an explicit quantity and required work task.

## Frontend Storage Behavior

```text
Current user session -> localStorage
Language preference  -> localStorage
Personal orders      -> Azure SQL
Guest orders         -> Azure SQL
Meals and menus      -> Azure SQL
Employees            -> Azure SQL
```

`localStorage` is not the source of truth for saved personal or guest orders.

## My Orders View

The My Orders page reads:

```text
GET /api/orders
GET /api/guest-orders
```

It shows:

- Personal meal name, category, and quantity
- Guest meal name, category, quantity, and work task
- Personal lunch total for the current week
- Guest lunch total for the current week
- Combined personal and guest total for the current month

## Kitchen Production Totals

Both tables now use explicit quantities, so kitchen reporting can use `SUM(Quantity)` consistently.

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

The combined result can be aggregated again by date and meal:

```text
Personal portions + Guest portions = Required kitchen portions
```

## Data Integrity Checks

### Personal-order orphans

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

Expected: zero rows.

### Guest-order orphans

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

Expected: zero rows.

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

Expected: zero rows.

### Personal quantities

```sql
SELECT
    EmployeeNo,
    MenuDate,
    OrderedMealID,
    Quantity
FROM dbo.Orders
ORDER BY
    MenuDate,
    EmployeeNo,
    OrderedMealID;
```

### Guest quantities

```sql
SELECT
    HostEmployeeNo,
    MenuDate,
    OrderedMealID,
    WorkTask,
    Quantity
FROM dbo.GuestOrders
ORDER BY
    MenuDate,
    HostEmployeeNo,
    OrderedMealID;
```

## Quantity Model

Personal and guest orders now use the same basic quantity model:

| Order type | Quantity representation |
|---|---|
| Personal | One row with `Quantity` |
| Guest | One row with `Quantity` |

For reporting:

```text
Personal quantity = SUM(Orders.Quantity)
Guest quantity    = SUM(GuestOrders.Quantity)
```

## Security and Validation Notes

Before a wider production rollout:

- APIs must verify that authenticated users can only read and modify their own orders.
- Employee number alone must not be treated as production authentication.
- The 08:30 deadline must be enforced by the API, not only by browser JavaScript.
- Administration and reporting endpoints must require appropriate authorization.
- Retention requirements must be defined for employee details and order history.

## Summary

```text
Personal orders
- Stored in dbo.Orders
- Owned by EmployeeNo
- One logical order line per date and meal
- Quantity stored explicitly

Guest orders
- Stored in dbo.GuestOrders
- Owned by HostEmployeeNo
- One logical order line per date, meal, and work task
- Quantity stored explicitly
- WorkTask is required

Both order types
- Reference dbo.Meals
- Use calendar serving dates
- Are replaced transactionally within a submitted date range
- Are displayed together in My Orders
- Use SUM(Quantity) for kitchen and reporting totals
```
