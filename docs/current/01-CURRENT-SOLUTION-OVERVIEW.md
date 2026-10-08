# Current solution overview

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Users and subsystems

| Intended audience (not enforced role) | Source entry | Primary capability |
|---|---|---|
| Employee personal device | `lunchappDEV/user/login.html`, `user/index.html`, `user/my-orders.html` | Employee-number lookup; meals/salads; employee-hosted guests; week/month overview |
| Employee/external shared lunch kiosk | `lunchappDEV/lunchkiosk/index.html`, `lunchkiosk/order.html` | Card scan; same-origin ordering iframe; inactivity/success logout |
| Employee/external café kiosk | `lunchappDEV/bulla/index.html`, `bulla/order.html` | Card login, product layout, integer-cent sale, external funds check |
| Kitchen | `lunchappDEV/admin/kitchen-summary.html`, `admin/weekly-summary.html` | Daily active portions, traceability/cancellation, weekly statistics with known gross-salad discrepancy |
| Menu/employee administrator | `lunchappDEV/admin/meal-library.html`, `admin/salad-admin.html`, `admin/menu-admin.html`, `admin/employee-admin.html` | Libraries, cycles/weeks, employee/card maintenance, manual Add Lunch |
| Account/café administrator | `lunchappDEV/admin/kioskadmin/external-accounts.html`, `kiosk-cards-admin.html`, `lunchappDEV/admin/kioskadmin/kiosk-products-admin.html`, `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.html`, `lunchappDEV/admin/kioskadmin/image-library.html` | Accounts, external cards, funding/payments, products/layout/private-backed images |
| Payroll/FINA/finance | `lunchappDEV/admin/lunch-reports.html`, `admin/kioskadmin/kiosk-reports.html` | Separate lunch-count and café-amount CSV preparation; approval/integration unknown |

Paths without a repository prefix in this table remain relative to lunchappDEV; exact dependencies are in document 07.

## End-to-end workflows

1. **Employee lunch:** directory lookup creates browser identity. User loads applicable Published menu and salads, saves meal and salad ranges in two independent API transactions. Guest mode adds host workTask; manual late count is a distinct Employee Admin workflow. Browser-local cutoff is not backend authorization/deadline enforcement.
2. **External lunch:** valid external card supplies CardID plus ExternalAccountID. Each card edits its own orders; all cards share account billing. SQL produces derived net meal/salad charges by MenuDate/effective price; these are not physical ledger writes. No lunch affordability rejection currently exists. External My Orders omits required cardId in current source.
3. **Kitchen:** daily API joins four order sources and nets both cancellation types. Audit cancellations append reductions and retain source via NO_ACTION FKs. Salad replacement and weekly summary are not cancellation-consistent; see 14.
4. **Café:** card login, latest products/layout, server-priced sale. External account locking and funds/credit checks precede sale/line/negative Purchase ledger transaction; employee sales feed payroll amount reports. Replay uses requestId with documented consistency limitations.
5. **Finance:** lunch payroll counts exclude guests/external/café; manual employee additions count. External lunch counts aggregate account, not card. Café external invoicing uses current account labels/mode; CSV export neither issues invoices nor settles anything.
6. **Images:** browser crops, API multipart uploads Blob and SQL metadata; product links reusable ImageAssetID; anonymous content API serves private-backed bytes. Unused deletion is permanent and cross-service non-atomic.

Evidence: `lunchapp-api/src/functions/current-menu.js`, `lunchapp-api/src/functions/orders.js`, `lunchapp-api/src/functions/guest-orders.js`, `lunchapp-api/src/functions/salad-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`, `lunchapp-api/src/functions/kitchen-orders.js`, `lunchapp-api/src/functions/kitchen-weekly-summary.js`, `lunchapp-api/src/functions/kiosk-sales.js`, `lunchapp-api/src/functions/kiosk-reports.js`, `lunchapp-api/src/functions/images.js`; `lunchappDEV/user/lunch.js`, `user/my-orders.js`, `admin/employee-admin.js`; `lunchappDEV/docs/05-sql/07-module-definitions.csv`.

## Source-current versus deployed

The completed Azure inventory proves resource properties at export time, not the currently deployed code revision. Source contains current independent salad/CardID/café/image/report features; old POC/deferred statements cannot override it. No deployed package hashes, current Easy Auth/CORS/app-settings export, final recipient acceptance or restore test was supplied. The system is a DEV/pilot with implemented workflows and material integration/integrity/access gaps, not a certified secure or production-ready service.

Resources: SWA `lunchapp` Standard in West Europe; API `lunchapp-api-dev` Linux Node 22 Flex Consumption; SQL `lunchappsql/lunchappdb-dev`; three storage accounts and Insights in Sweden Central. Evidence: `lunchappDEV/docs/02-architecture/resources.json`, `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`, `lunchapp-api/docs/README-AZURE.md`. See 09 for property provenance and 14 for Unknowns.

