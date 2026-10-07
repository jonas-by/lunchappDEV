# Changelog: 2026-10-05

## External lunch ordering

- Added external ownership to regular meal and salad ordering.
- Made `Orders.EmployeeNo` and `SaladOrders.EmployeeNo` nullable.
- Added and used `ExternalAccountID` on `Orders` and `SaladOrders`.
- Updated ordering APIs and frontend session handling for employee and external owners.
- External users can order meals and salads.
- External users cannot place guest orders.
- Guest-order navigation is hidden for external sessions and direct access is blocked.
- Updated My Orders behavior so external users only load personal meal and salad orders.

## Database uniqueness fixes

- Replaced employee-only unique constraints that treated all external users as the same `NULL` employee.
- Added filtered unique indexes for employee meal orders and external meal orders.
- Added filtered unique indexes for employee salad orders and external salad orders.

## Lunch kiosk UX

- Restored a centered Café Kiosk-style login layout for Lunch Kiosk.
- Moved the language selector to the bottom of the login card.
- Updated card login/session handling for external accounts.
- Corrected stale deployment and browser-cache confusion during rollout.

## Kitchen views

- Updated kitchen order API and UI to show external cardholder names instead of `Employee null null`.
- External display fallback order is cardholder name, external account display name, then a generic external-account label.
- Corrected the card primary-key reference from `KioskCardID` to `CardID`.
- Existing cancellation behavior remains unchanged.

## Manual lunch additions

- Added `ManualLunchAdjustments` for post-deadline employee lunch purchases.
- Added an **Add lunch** action to Employee Administration.
- Manual additions store employee, date, quantity, optional reason, creator, and timestamp.
- Reason and creator are planned in the data model but omitted from the current UI.
- Replaced cramped text actions with compact icon actions in Employee Administration.

## Lunch reporting

- Added Lunch Reports page and API.
- Added employee payroll export with employee number, employee name, and number of lunches.
- Payroll quantity includes effective meals, effective salads, and manual additions.
- Cancellations reduce report quantities.
- Guest lunches and external lunches are excluded from employee payroll.
- Added separate external-account lunch report and CSV export.
- External CSV includes external reference and invoice reference.
- Corrected the report frontend to use the standalone LunchApp API host.

## External lunch finance

- Added effective-dated external lunch prices.
- Seeded external lunch price at €11.35 from 2026-09-01.
- Added derived meal and salad lunch charges for external accounts.
- Included lunch charges in prepaid balances and postpaid/invoice outstanding balances.
- Added external lunch purchases to the existing external-account ledger view.
- Added a standalone External Lunch Prices administration page.
- Existing orders are valued automatically by menu date.
- Edits and cancellations recalculate charges without duplicate ledger transactions.

## External card administration

- Added balance information to external card tiles.
- Prepaid cards show balance and available amount.
- Postpaid and invoice cards show balance and outstanding amount.
- This gives kitchen staff a direct answer when a cardholder asks how much is available or owed.

## Admin landing page

- Added Lunch Reports.
- Added External Lunch Prices.
- Created a separate People and Access section for:
  - Employee Administration
  - External Accounts
  - Kiosk Cards
- Renamed lunch maintenance section to Menus.
- Renamed Café section to Products and Layout.
- Added Finance Settings section.
- Changed External Lunch Prices back navigation to the main admin index.
