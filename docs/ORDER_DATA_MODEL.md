# Lunch App Order Data Model

## Purpose

This document describes how personal and guest lunch orders are stored in the Lunch App database, how quantities are represented, and how the order APIs expose the data to the frontend.

## Overview

The Lunch App stores personal and guest lunch orders in separate tables:

- `dbo.Orders` stores personal employee lunch orders.
- `dbo.GuestOrders` stores guest lunches ordered by a host employee.
- Both tables reference `dbo.Meals` for the selected dish.
- Both tables reference `dbo.Employees` for the employee responsible for the order.
- The rotating menu is stored separately and determines which meals are available for ordering.

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

### Current columns

| Column | Purpose |
|---|---|
| `OrderID` | Unique identity value for the physical order row. |
| `EmployeeNo` | Employee who ordered the lunch. References `dbo.Employees.EmployeeNo`. |
| `MenuDate` | Calendar date on which the lunch will be served. |
| `OrderedMealID` | Selected meal. References `dbo.Meals.MealID`. |
| `OrderTime` | Timestamp recorded when the order row was created. |

### Example: one personal lunch

If employee `10435` orders one Chicken Curry for 2026-09-29, one row is stored:

```text
OrderID:       1
EmployeeNo:    10435
MenuDate:      2026-09-29
OrderedMealID: 3
OrderTime:     database-generated timestamp
```

### Personal order quantities

The current `dbo.Orders` table does not have a `Quantity` column.

A quantity greater than one is represented by multiple physical rows with the same employee number, menu date, and meal ID.

For example, two portions of Meal ID `5` are stored as:

```text
OrderID  EmployeeNo  MenuDate     OrderedMealID
2        10435       2026-09-30   5
3        10435       2026-09-30   5
```

The Orders API groups matching rows and returns a logical quantity:

```json
{
  "menuDate": "2026-09-30",
  "mealId": 5,
  "quantity": 2
}
```

Therefore:

```text
Database representation: multiple rows
API representation:      one grouped order line with quantity
```

## Guest Orders

### Table

```text
dbo.GuestOrders
```

### Current columns

| Column | Purpose |
|---|---|
| `GuestOrderID` | Unique identity value for the guest order line. |
| `HostEmployeeNo` | Employee responsible for the guest order. References `dbo.Employees.EmployeeNo`. |
| `MenuDate` | Calendar date on which the guest lunch will be served. |
| `OrderedMealID` | Selected meal. References `dbo.Meals.MealID`. |
| `Quantity` | Number of guest portions represented by the order line. |
| `WorkTask` | Required work task, project, visit, or other business reason. |
| `OrderTime` | Timestamp recorded when the guest order was created. |

### Example: guest lunch order

If employee `10435` orders three portions of Vegetarian Lasagna for a supplier visit on 2026-10-02, one row is stored:

```text
GuestOrderID:  1
HostEmployeeNo: 10435
MenuDate:       2026-10-02
OrderedMealID:  6
Quantity:       3
WorkTask:       Supplier visit
OrderTime:      database-generated timestamp
```

Unlike personal orders, guest orders use a real `Quantity` column. Three guest lunches are therefore stored in one row rather than three duplicate rows.

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

`HostEmployeeNo` identifies the employee responsible for the guest lunches. The guests themselves do not currently have employee records or individual guest identities.

### Employee deactivation

Employees with order history should normally be deactivated rather than permanently deleted:

```sql
UPDATE dbo.Employees
SET Active = 0
WHERE EmployeeNo = @employeeNo;
```

This preserves personal and guest order history and maintains referential integrity.

## Meals and Order Selection

Both personal and guest orders reference the reusable meal library:

```text
Orders.OrderedMealID
    -> Meals.MealID

GuestOrders.OrderedMealID
    -> Meals.MealID
```

The order tables do not copy meal names or categories. The APIs join the order tables to `dbo.Meals` and return:

- English name
- Swedish name
- Finnish name
- Category

This means a meal-name or category correction is automatically reflected when order data is read later.

A meal referenced by menu or order history should normally be marked inactive instead of being permanently deleted.

## Rotating Menu Relationship

The rotating menu is stored separately:

```text
MenuWeeks
    -> MenuDays
        -> DayMeals
            -> Meals
```

### Menu tables

| Table | Purpose |
|---|---|
| `dbo.MenuWeeks` | Stores rotation week numbers, currently 1 through the configured cycle length. |
| `dbo.MenuDays` | Stores weekdays 1 through 5 for each rotation week. |
| `dbo.DayMeals` | Connects a rotation weekday to one or more reusable meals. |
| `dbo.Meals` | Stores the multilingual meal library and category. |

### Important distinction

The menu determines which meals are available for a date, but orders currently reference `MealID`, not `MenuDayID` or `DayMealID`.

```text
Menu availability: rotation week + weekday -> MealID
Saved order:       calendar date + MealID
```

This makes order history date-specific while keeping the menu reusable.

## Personal Orders API

### Read orders

```http
GET /api/orders?employeeNo=10435&dateFrom=2026-09-28&dateTo=2026-10-02
```

The API groups duplicate personal-order rows by:

- Employee number
- Menu date
- Meal ID

Example response:

```json
{
  "employeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": [
    {
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

### Save orders

```http
PUT /api/orders
Content-Type: application/json
```

Example request:

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

### Replacement behavior

`PUT /api/orders` replaces all personal orders for the submitted employee and date range:

1. Begin SQL transaction.
2. Delete existing personal orders for the employee between `dateFrom` and `dateTo`.
3. Insert the submitted order rows.
4. Insert one physical row per personal lunch quantity.
5. Commit the transaction.

An empty order array clears all personal orders in that range:

```json
{
  "employeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": []
}
```

## Guest Orders API

### Read guest orders

```http
GET /api/guest-orders?hostEmployeeNo=10435&dateFrom=2026-09-28&dateTo=2026-10-02
```

Example response:

```json
{
  "hostEmployeeNo": 10435,
  "dateFrom": "2026-09-28",
  "dateTo": "2026-10-02",
  "orders": [
    {
      "guestOrderId": 1,
      "hostEmployeeNo": 10435,
      "menuDate": "2026-10-02",
      "mealId": 6,
      "quantity": 3,
      "workTask": "Supplier visit",
      "nameEN": "Vegetarian Lasagna",
      "nameSV": "Vegetarisk lasagne",
      "nameFI": "Kasvislasagne",
      "category": "Vegetarian"
    }
  ]
}
```

### Save guest orders

```http
PUT /api/guest-orders
Content-Type: application/json
```

Example request:

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

### Replacement behavior

`PUT /api/guest-orders` replaces all guest orders for the submitted host employee and date range:

1. Begin SQL transaction.
2. Delete existing guest orders for the host employee between `dateFrom` and `dateTo`.
3. Insert one row for each submitted guest order line.
4. Store the submitted quantity in `GuestOrders.Quantity`.
5. Store the required work task or project.
6. Commit the transaction.

An empty order array clears all guest orders in that range.

## Frontend Storage Behavior

Personal and guest orders are now stored in Azure SQL through the APIs.

`localStorage` is still used for the current browser session, including the logged-in employee object and selected language, but it is no longer the source of truth for saved personal or guest orders.

```text
Current user session -> localStorage
Language preference  -> localStorage
Personal orders      -> Azure SQL
Guest orders         -> Azure SQL
Meals and menus      -> Azure SQL
```

## My Orders View

The My Orders page reads both APIs:

```text
GET /api/orders
GET /api/guest-orders
```

It groups the results by calendar date and shows:

- Personal meal name, category, and quantity
- Guest meal name, category, quantity, and work task
- Personal lunch total for the current week
- Guest lunch total for the current week
- Combined personal and guest lunch total for the current month

## Kitchen Production Totals

A future kitchen summary should combine personal and guest quantities.

Conceptually:

```text
Personal lunch quantities
+
Guest lunch quantities
=
Required kitchen portions
```

Example:

```text
Chicken Curry

Personal portions: 12
Guest portions:     3
Total portions:    15
```

A reporting query can aggregate both sources with `UNION ALL`.

```sql
SELECT
    o.MenuDate,
    o.OrderedMealID AS MealID,
    COUNT(*) AS Quantity,
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

The kitchen API or reporting query can then aggregate the combined result by date and meal.

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

Expected result: zero rows.

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

Expected result: zero rows.

### Personal-order quantities

```sql
SELECT
    EmployeeNo,
    MenuDate,
    OrderedMealID,
    COUNT(*) AS Quantity
FROM dbo.Orders
GROUP BY
    EmployeeNo,
    MenuDate,
    OrderedMealID
ORDER BY
    MenuDate,
    EmployeeNo,
    OrderedMealID;
```

### Guest-order quantities

```sql
SELECT
    HostEmployeeNo,
    MenuDate,
    OrderedMealID,
    WorkTask,
    SUM(Quantity) AS Quantity
FROM dbo.GuestOrders
GROUP BY
    HostEmployeeNo,
    MenuDate,
    OrderedMealID,
    WorkTask
ORDER BY
    MenuDate,
    HostEmployeeNo,
    OrderedMealID;
```

## Known Design Difference

The two order tables represent quantities differently:

| Order type | Quantity representation |
|---|---|
| Personal | One physical row per portion |
| Guest | One order line with a `Quantity` value |

The APIs hide most of this difference from the frontend, but reports and direct SQL queries must account for it:

```text
Personal quantity = COUNT(*)
Guest quantity    = SUM(Quantity)
```

## Recommended Future Improvement

Add a `Quantity` column to `dbo.Orders` and store one personal order line per employee, date, and meal.

Recommended future structure:

```text
OrderID
EmployeeNo
MenuDate
OrderedMealID
Quantity
OrderTime
```

Benefits:

- Consistent quantity handling across personal and guest orders
- Fewer physical rows
- Simpler reporting
- Easier updates
- Clearer uniqueness rules

A suitable future unique constraint would be:

```text
EmployeeNo + MenuDate + OrderedMealID
```

The migration is not currently urgent because the Orders API already groups duplicate rows correctly.

## Security and Validation Notes

Before a wider production rollout:

- The API must verify that authenticated users can only read and modify their own orders.
- Employee number alone must not be treated as production authentication.
- The 08:30 ordering deadline must be enforced in the API, not only in browser JavaScript.
- Administrative and reporting endpoints must require appropriate authorization.
- Employee, card, email, and order-history retention requirements must be documented.

## Summary

```text
Personal orders
- Stored in dbo.Orders
- Owned by EmployeeNo
- Quantity represented by duplicate rows
- API groups rows into quantity

Guest orders
- Stored in dbo.GuestOrders
- Owned by HostEmployeeNo
- Quantity stored in a Quantity column
- WorkTask is required

Both order types
- Reference dbo.Meals
- Use calendar serving dates
- Are replaced transactionally within a submitted date range
- Are displayed together in My Orders
- Will later be combined for kitchen production totals
```
