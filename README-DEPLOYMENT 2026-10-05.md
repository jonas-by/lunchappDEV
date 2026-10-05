# External lunch ordering package

## Folder mapping
- `api/` -> Azure Functions API source folder
- `frontend/user/` -> Static Web App `/user/`
- `frontend/lunchkiosk/` -> Static Web App `/lunchkiosk/`
- `sql/` -> optional final integrity constraints

## Deploy order
1. Back up or commit the current working version.
2. Deploy all files in `api/` together.
3. Deploy `frontend/user/` and `frontend/lunchkiosk/` together.
4. Test employee own orders, employee guest orders, external own orders, My Orders, and timeout/logout.
5. Only after successful testing, run `sql/02-add-owner-check-constraints.sql`.

## Important
The endpoints remain `authLevel: anonymous`, matching the pilot architecture. The guest APIs still validate an active host employee, but true identity-based authorization requires the planned Entra ID/security phase.
