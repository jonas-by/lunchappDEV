# Current architecture

## Frontend folders

```text
/user/          Personal-device lunch ordering
/lunchkiosk/    Shared-tablet lunch ordering shell
/bulla/         Café Kiosk customer interface
/admin/         Lunch and Café Kiosk administration
/admin/kioskadmin/  Café Kiosk administration and reports
```

The exact administration root name may differ in the repository. Relative links in the current landing page assume `kioskadmin/` is below that root.

## Shared backend

The current pilot uses one Azure Function App and one Azure SQL database.

Important Café Kiosk endpoints:

```text
/api/kiosk/card-login
/api/kiosk/layouts/default
/api/kiosk/sales
/api/kiosk/reports/*
```

Lunch ordering continues to use the existing lunch menu, order, guest-order and order-history endpoints used by `/user/`.

## Identity sources

Shared data:

- Employees
- Employee card mappings
- External accounts
- External kiosk cards

Café Kiosk supports employee and external ownership.

Lunch kiosk currently supports employee ownership only. External lunch ordering needs an explicit backend owner model before it is enabled.

## Browser sessions

```text
Café Kiosk:   cafe-kiosk-card-session-v1
Lunch kiosk:  lunch-kiosk-session-v1
Lunch user:   lunch-poc-current-user-v17
```

The lunch kiosk intentionally creates the existing lunch-user record after employee card login so `/user/` can run unchanged. Timeout and logout remove both lunch kiosk and lunch-user sessions.

## Deployment direction

Pilot:

```text
One repository
One Static Web App
Multiple folders
One shared API
One shared database
```

Likely production:

```text
lunch.balticyachts.fi       → personal lunch frontend
lunchkiosk.balticyachts.fi  → lunch kiosk frontend
Café Kiosk hostname         → Café Kiosk frontend
Separate deployment workflows where useful
Shared APIs and database
```
