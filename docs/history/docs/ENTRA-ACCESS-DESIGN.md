# Microsoft Entra ID access design

## Recommendation

Yes, security groups are the right administrative unit, but application roles should be the authorization contract used by the application.

Recommended pattern:

```text
Entra security group
    ↓ assigned to
Enterprise application app role
    ↓ emitted as
roles claim
    ↓ enforced by
Static Web App routes and API authorization
```

This keeps membership management in groups while keeping application code based on stable role names rather than tenant-specific group object IDs.

## Proposed app roles

```text
LunchUser
KitchenOperator
CafeAdministrator
FinanceReporter
SystemAdministrator
```

Suggested group mapping:

```text
SG-LunchApp-Users         → LunchUser
SG-LunchApp-Kitchen       → KitchenOperator
SG-LunchApp-CafeAdmins    → CafeAdministrator
SG-LunchApp-Finance       → FinanceReporter
SG-LunchApp-SystemAdmins  → SystemAdministrator
```

## Suggested access

```text
/user/*                         authenticated users
/admin/kitchen-summary*         KitchenOperator, SystemAdministrator
/admin/menu-admin*              KitchenOperator, SystemAdministrator
/admin/kioskadmin/products*     CafeAdministrator, SystemAdministrator
/admin/kioskadmin/layout*       CafeAdministrator, SystemAdministrator
/admin/kioskadmin/reports*      CafeAdministrator, FinanceReporter, SystemAdministrator
Payroll/export API routes       FinanceReporter, SystemAdministrator
External invoicing exports      FinanceReporter, SystemAdministrator
```

Shared tablet kiosks should not require interactive Entra login for every purchase. Kiosk card login remains an application workflow, while administrative pages and sensitive reporting are protected by Entra.

## Implementation note

Azure Static Web Apps can restrict routes by roles. Mapping Entra group membership to custom Static Web Apps roles may require custom-role assignment logic. Another robust option is a normal Entra app registration with app roles assigned to groups and API-side role-claim enforcement.

Before implementation, decide whether the current Static Web App plan and authentication model support the desired custom-role approach without preview-only features.
