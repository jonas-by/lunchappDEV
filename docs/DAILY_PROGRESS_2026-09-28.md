# Lunch App - Development Summary
Date: 2026-09-28

## Overview

Today's focus was moving remaining core functionality from POC/localStorage implementations to Azure SQL and Azure Functions APIs.

The application now supports:

- Employee management
- Meal management
- Rotating menu management
- Personal lunch ordering
- Guest lunch ordering
- Personal order history
- Guest order history
- Azure SQL persistence throughout the main workflow

The solution has moved beyond a proof-of-concept and can now be considered a functional MVP candidate pending stabilization testing.

## Implemented Today

### Menu API

Completed:

```text
GET /api/menu/week/{weekNumber}
PUT /api/menu/week/{weekNumber}
```

Purpose:

- Load rotation week configuration
- Save rotation week configuration
- Store menus in Azure SQL

Tables used:

```text
MenuWeeks
MenuDays
DayMeals
Meals
```

### Menu Builder

Connected the Menu Builder frontend to Azure APIs and removed localStorage menu storage.

Added:

```text
GET /api/meals
GET /api/menu/week/{week}
PUT /api/menu/week/{week}
```

Features verified:

- Drag and drop meals
- Add meal
- Remove meal
- Copy previous week
- Save week
- Reload from database

### Meal Library

Connected the Meal Library frontend to Azure APIs.

Implemented:

```text
GET /api/meals
POST /api/meals
PUT /api/meals/{mealId}
DELETE /api/meals/{mealId}
```

Features verified:

- Create meal
- Edit meal
- Disable meal
- Restore meal
- Hard delete meal

Resolved the duplicate Fisksoppa test data. One duplicate was removed entirely through the application.

### Personal Orders API

Implemented:

```text
GET /api/orders
PUT /api/orders
```

Purpose:

- Store personal employee orders
- Load existing employee orders

Verified:

- Save orders
- Edit orders
- Remove orders
- Reload after refresh

### Guest Orders API

Implemented:

```text
GET /api/guest-orders
PUT /api/guest-orders
```

Purpose:

- Store guest lunches separately
- Associate guest lunches with the host employee
- Require a work task or project

Verified:

- Save guest order
- Edit guest order
- Delete guest order
- Reload after refresh

### Employee Administration API

Implemented:

```text
GET /api/employees
POST /api/employees
PUT /api/employees/{employeeNo}
DELETE /api/employees/{employeeNo}
```

Features:

- Create employee
- Edit employee
- Disable employee
- Restore employee
- Hard delete employee
- CSV import support

Verified against Azure SQL.

### Employee Administration Frontend

Replaced the localStorage implementation and connected the page to the Employees API.

Features verified:

- Create employee
- Edit employee
- Search employee
- Disable employee
- Restore employee

### Login

Removed the hardcoded employee list.

Login now uses:

```text
GET /api/employees
```

Features:

- Employee validation through SQL
- Active-status enforcement
- Dynamic employee lookup
- Employee preview while typing

Verified using multiple employees.

### My Orders

Reworked My Orders to load data from SQL-backed APIs.

Personal orders:

```text
GET /api/orders
```

Guest orders:

```text
GET /api/guest-orders
```

Displays:

- Personal lunches
- Guest lunches
- Weekly totals
- Monthly totals
- Guest work task or project

Verified successfully.

### Personal Order Quantity Model

The personal order schema was updated to use an explicit `Quantity` column instead of representing quantity as duplicate rows.

New personal order structure:

```text
OrderID
EmployeeNo
MenuDate
OrderedMealID
Quantity
OrderTime
```

The Orders API and order data-model documentation were updated accordingly.

## Current Functional Status

### Working

- Employee management
- API-backed login
- Meal library
- Menu Builder
- Menu rotation
- Personal orders
- Guest orders
- My Orders
- Azure SQL persistence
- Multilingual menus in English, Swedish, and Finnish
- Explicit quantity handling for personal and guest orders

### Remaining Major Components

#### Kitchen Dashboard

Not yet implemented.

Planned purpose:

```text
Personal orders
+
Guest orders
=
Production totals
```

#### Authentication and Authorization

Current state:

```text
Employee-number-based login
```

Future requirement:

```text
Entra ID or another properly authenticated backend identity
```

#### Deadline Enforcement

Current state:

```text
JavaScript and client-side enforcement
```

Future requirement:

```text
API-side enforcement
```

## Documentation Created

- Stabilization test checklist page
- `ORDER_DATA_MODEL.md`
- Daily development summary
- Database change log

## Milestone Assessment

Status:

```text
Functional MVP candidate
```

Main workflow now operational:

```text
Employee
  -> Login
  -> View menu
  -> Order personal or guest lunch
  -> Save to Azure SQL
  -> View own orders
  -> Kitchen reporting next
```

## Next Recommended Task

Implement the Kitchen Dashboard using both order tables to produce meal and production totals.

```sql
Orders
UNION ALL
GuestOrders
```

Because both tables now have an explicit `Quantity` column, kitchen totals can consistently use `SUM(Quantity)`.
