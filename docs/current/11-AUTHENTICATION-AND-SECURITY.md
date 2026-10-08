# Authentication and security

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## 1. Route authentication facts

All **36 Azure HTTP registrations / 64 method-route contracts** explicitly use `authLevel: anonymous`. Thus Functions keys are not required by these registration definitions. No supplied handler/helper validates bearer/JWT/signature, Entra claims/groups/roles, cookies, x-ms-client-principal, tenant, authenticated EmployeeNo, server-side card session, or app-level administrative role. Full per-route registration/security/data-scope matrix follows in method matrix below; every method separately appears in 06-CURRENT-API-SURFACE.md.

**Unknown:** platform Easy Auth enabled state, token store/allowed audiences, SWA auth roles, reverse-proxy access policy, CORS allowlist, application settings values/Key Vault references, Azure RBAC for runtime principal. Anonymous handler policy alone must not be used to infer these deployment controls are absent. Conversely a future Entra design document does not prove deployed protection.

**API access/data scope:** read/list/report/admin mutations accept supplied IDs and filters. Employee/card existence, ownership linkage and active/validity rules provide business validation, not authentication. Report routes expose scope across all rows/accounts in selected range (or caller filter), not authenticated individual scope. Image GET/list/content have no application role check. API detail errors commonly return raw SQL/storage exception message under details; actual logging/redaction of errors not proven by source.

## 2. Actual personal-device employee login

`lunchappDEV/user/login.js` downloads `/employees?includeInactive=true`, matches entered employee number locally, checks Active locally, writes `lunch-poc-current-user-v17` localStorage and redirects. No password, challenge, Entra redirect/MSAL SDK, verified backend identity session or token is issued. Returned directory data includes card mappings and employee contact/name fields (contract only; no actual rows reproduced).

**Frontend:** directory match/activity check and page session presence redirect. **API:** employee meal/salad PUT separately validates database activity; GET doesn't. Browser persistence is a workflow convenience, not a server-verified authorization boundary.

`user/lunch.js` reads ownerType and numeric employee/card/account fields from browser storage and supplies them in plain JSON/query. `user/my-orders.js` trusts browser storage; external query lacks mandatory cardId and currently returns API validation errors. Admin callers do not add Authorization headers in supplied JavaScript. No Entra auth hooks found in supplied JS/HTML/JSON/workflow file scan.

## 3. Card trust and shared-tablet sessions

**API:** card-login POST resolves raw supplied cardNumber, trimmed/truncated100. Employees first exact CardNumber TOP1, no Active filter. Otherwise external KioskCards joined ExternalAccounts/view; requires card/account active/current validity; returns identity/balance snapshot and no signed token/session handle. This proves a card string matches a record, not independent caller attestation.

**API:** café sales POST re-resolves cardNumber server-side, strips nondigits and keeps last five digits, detects multiple Employee/external rows with TOP2, checks external validity/funds. Employee Active not checked. Card-login doesn't normalize last5; current kiosk frontends do. Employee/card administration trims raw numbers, so normalization isn't a universal API invariant. Employee conflicts are first resolution priority.

**API:** external lunch/salad owner input includes accountId+cardId, required link OwnerType External/cardActive/validity. Editable row scope CardID; billing field AccountID persisted. No reference to a card-login result/session/signature. Employee owner input just EmployeeNo. Guest input HostEmployeeNo; activity validation only meal guest PUT. No authenticated actor binding. Kitchen cancellation requires caller text cancelledBy; employee manual addition CreatedBy nullable; financial ledger actor string supplied by caller; these are audit labels, not verified identity.

**Frontend sessions:**

| Flow | Session storage | Timeout/cleanup | Enforcement boundary |
|---|---|---|---|
| Personal lunch | localStorage lunch-poc-current-user-v17 | Explicit logout; no server expiration in source | Frontend only |
| Lunch kiosk | sessionStorage lunch-kiosk-session-v1 plus lunch user localStorage | 60-second activity-reset timer; login page clears both; cancel/logout clears; normal successful save emits same-origin postMessage to shell to logout | Frontend only, no API expiry |
| Café kiosk | sessionStorage cafe-kiosk-card-session-v1 | 60-second activity-reset timer; successful purchase/cancel removes; login page clears | Frontend only; API rechecks card/funds on sale |

Sources `lunchkiosk/card-login.js:1-11`, `lunchkiosk/kiosk-shell.js`, `bulla/card-login.js:1-10`, `bulla/order.js:1-27`, `user/lunch.js:1-18/92/100`. Sessions do not gain new CardID fields when source changes; rescan/logout operationally documented. Header balance/credit snapshot can be stale; API café balance check is transactional.

## 4. Entra: code versus plan

`lunchappDEV/docs/docs/ENTRA-ACCESS-DESIGN.md` recommends security groups assigned app roles and SWA/API claims enforcement. Proposed LunchUser/KitchenOperator/CafeAdministrator/FinanceReporter/SystemAdministrator are **docs-only**, not application roles enforced by supplied backend. Shared tablet card workflow intentionally distinct from admin Entra concept.

2026-10-07 handover and changelog explicitly defer Entra authorization. 2026-10-08 handover says revisit after stable state documentation. No staticwebapp.config.json or API auth middleware appears in supplied inventory. Absence in retrieved files is not definitive deployed route configuration; production deployment evidence still needed. Historical architecture 'employee-only lunch kiosk' is superseded by current external CardID source, not an auth implementation statement.

## 5. SQL access

**API:** SQL server access is `mssql` using `process.env.SqlConnectionString`; per-file sql.connect with shared driver pool behavior. SQL login/host/credential values intentionally not read into this package or copied. No managed-identity token acquisition, Entra SQL credential provider or Key Vault client appears in API source. Actual connection-string authentication type **Unknown**, not inferred from setting name alone.

**API:** values passed via typed `.input()` parameters. Dynamic ownership table/column choices derive from fixed employee/external branch constants; IDs for IN clauses are bound generated parameter names; OPENJSON uses JSON parameter input for products/items. Query-local CTE names/aliases aren't database objects. There are no API EXEC/stored-procedure calls.

**SQL constraint:** extracted 27 tables/2views, 34 FKs,51checks,43defaults,68indexes; zero extracted triggers/procedures/SQLfunctions. No trigger can be assumed to supply missing business checks. Ownership FK links do not prove authenticated access, active-state or account/card matching. Current tables non-temporal per export. No supplied row-level security policy object or code usage of SQL session context; actual permission/principal scope still **Unknown**.

**SQL permission evidence:** `docs/05-sql/09-security-metadata-1.csv` includes dbo CONNECT and public SELECT on SQL system metadata, not a demonstrated broad grant on application tables. `lunchappDEV/docs/05-sql/09-security-metadata-2.csv` shows dbo in db_owner. `lunchappDEV/docs/05-sql/00-preflight.csv` is extraction context, not proof runtime application principal is dbo/db_owner. Don't turn extractor privilege into runtime authorization claim. Export lacks complete server/Azure runtime credential mapping.

**API transactions:** serializable + row locks for café sale/funds, external ledger insert/deactivate/account create, cancellation append, layout replacement. Employee/meal/order/menu edits generally use ordinary transaction or standalone writes; no global role/actor check. Financial funds enforcement lunch/salad intentionally deferred. SQL constraints backstop FKs/quantities/uniqueness; they are business/data integrity, not API data-scope controls.

## 6. Blob access and image serving

**API:** `BlobServiceClient.fromConnectionString(process.env.ImageStorageConnection)` and `ImageContainerName`; connection setting names only documented. No direct SAS creation, client-visible storage key, managed identity token acquisition or direct anonymous blob serving logic in source. Dated 2026-10-06 handover identifies images container in lunchappdevstorage.

**Azure exported account properties:** all three storage account exports set allowBlobPublicAccess false, minimumTlsVersion TLS1_2, publicNetworkAccess Enabled, identity null. Account-level publicAccess denial supports private blob design; exact live container policy/access key rotation/network restrictions **Unknown**. PublicNetworkAccess Enabled does not mean blobs anonymously readable.

**API:** anonymous content route reads metadata then private blob, buffers entire download and returns Content-Type/length/inline filename and `Cache-Control: public,max-age=3600`. Storage privacy and API reader authorization are separate: anonymous API with public response cache is current source behavior. No download URL token in mapImage. Product imageURL generated from request scheme/host and /api path; legacy image URL still returned separately.

**API upload validation:** form file/type/size checks (<=5MiB); declared MIME allowlist not decoded-file/dimension validation. Width/Height NULL in SQL; crop/resize performed only browser-side. **Frontend** product source image max10MiB, cropped JPEG0.9 output; 800x800 dimensions documented and canvas supplies it. API UUID filenames/sanitized original/header names; no overwritten fixed original filenames.

**API lifecycle:** upload blob first→SQL metadata→best-effort blob cleanup on error. Delete unused checks count→blob delete→SQL delete; NO_ACTION product FK protection for metadata, but cross-service atomicity not implemented. No soft-delete or cleanup scheduler. Retention/orphan recovery **operational/Unknown**. This is factual consistency documentation, not probing or remediation.

## 7. Azure/deployment/export limitations

Export `docs/02-architecture/functionapps.json`: Function App Linux Running, Sweden Central, Node22 Flex configuration, httpsOnly true, publicNetworkAccess Enabled, identity null. keyVaultReferenceIdentity SystemAssigned is a reference setting, not proof an identity is assigned. siteConfig.cors, appSettings, connectionStrings and ipSecurityRestrictions are null: Unknown, not disabled/empty secure policy. Deployment storage authentication type StorageAccountConnectionString references setting name DEPLOYMENT_STORAGE_CONNECTION_STRING (name only; no value). No dedicated EasyAuth/CORS/application-setting-name export exists in supplied architecture evidence. Export is no live verification; no inferred tenant/groups/key values. Source APIs served direct hard-coded Function App host, frontend deployed separately SWA. SWA export region westeurope conflicts with older README wording; source inventory does not establish deployed version. SQL server export sqlservers.json shows public network Enabled, minimum TLS1.2, configured AD administrator with AD-only false, identity null and no represented private endpoint connections; not proof of runtime principal or permission. Storage exports show shared key enabled, public network/default Allow and no represented private endpoints; anonymous blob denial remains distinct from network reachability. `lunchapp-api/host.json` applicationInsights sampling enabled, Request excluded from sampling; does not configure API auth or detailed application logging retention/redaction.

**Secret handling:** local.settings.json is present in collected evidence and ignored by .gitignore; values were not copied. Only configuration key names inspected: AzureWebJobsStorage, FUNCTIONS_WORKER_RUNTIME, SqlConnectionString. Ignore status isn't proof file wasn't previously committed/shared. Function runtime storage and image storage settings are distinct by name. Deployment workflow/action secrets and Azure connection values must stay redacted; secret names may be documented, never actual values.

**Unknown:** effective Function authsettings/SWA route roles, TLS minimum for Function beyond httpsOnly, approved CORS origins, secret rotation/Key Vault references, log redaction/retention, database runtime permissions/firewall/Entra-only policy, RBAC assignments, DNS/custom URL, live deployment version/role tests, report data handling/retention. No unsupported security assurance made.

## 8. Evidence/test status

- Code review of all26 JS/helpers and all registrations completed; SQL extraction checked against object/column/constraint/view references. See03-CURRENT-DATABASE-SCHEMA.md and15-DOCUMENTATION-SOURCE-MAP.md.
- Documented 2026-10-07 card ownership/balance UI/ledger integration developer tests are historical evidence, not independent assurance. Direct café API reject/concurrency tests explicitly still recommended. Finance/payroll acceptance deferred.
- No API calls, probes, exploitation, tests, service login, database queries, secrets output or source fixes performed. This documentation does not certify production security.

## Per-method registration/authentication/data-scope matrix

| Method | Route | Function/authLevel | Scope/trust |
|---|---|---|---|
| GET | /api/menu/current | current-menu / anonymous | Resolve effective published repeating menu cycle for requested date — caller IDs/filters; no application identity/role check |
| GET | /api/employees | employees / anonymous | Employee directory list or create employee — caller IDs/filters; no application identity/role check |
| POST | /api/employees | employees / anonymous | Employee directory list or create employee — caller IDs/filters; no application identity/role check |
| PUT | /api/employees/{employeeNo} | employee-item / anonymous | Update employee or deactivate/permanently delete — caller IDs/filters; no application identity/role check |
| DELETE | /api/employees/{employeeNo} | employee-item / anonymous | Update employee or deactivate/permanently delete — caller IDs/filters; no application identity/role check |
| GET | /api/external-lunch-prices | external-lunch-prices / anonymous | Read effective-date history or insert new external per-portion price — caller IDs/filters; no application identity/role check |
| POST | /api/external-lunch-prices | external-lunch-prices / anonymous | Read effective-date history or insert new external per-portion price — caller IDs/filters; no application identity/role check |
| GET | /api/guest-orders | guest-orders / anonymous | Read or reconcile employee-hosted guest meal orders (not external-card ordering) — caller IDs/filters; no application identity/role check |
| PUT | /api/guest-orders | guest-orders / anonymous | Read or reconcile employee-hosted guest meal orders (not external-card ordering) — caller IDs/filters; no application identity/role check |
| GET | /api/guest-salad-orders | guest-salad-orders / anonymous | Read or replace employee-hosted guest salads — caller IDs/filters; no application identity/role check |
| PUT | /api/guest-salad-orders | guest-salad-orders / anonymous | Read or replace employee-hosted guest salads — caller IDs/filters; no application identity/role check |
| GET | /api/hello | hello / anonymous | Diagnostic greeting; not a database health check — caller IDs/filters; no application identity/role check |
| POST | /api/hello | hello / anonymous | Diagnostic greeting; not a database health check — caller IDs/filters; no application identity/role check |
| GET | /api/images | images-list / anonymous | List shared image assets with product usage counts — caller IDs/filters; no application identity/role check |
| GET | /api/images/{id:int} | images-get / anonymous | Read one image asset metadata — caller IDs/filters; no application identity/role check |
| GET | /api/images/{id:int}/content | images-content / anonymous | Serve private blob content via API buffer — caller IDs/filters; no application identity/role check |
| POST | /api/images/upload | images-upload / anonymous | Upload shared image blob then insert metadata; cleanup blob on metadata failure — caller IDs/filters; no application identity/role check |
| DELETE | /api/images/{id:int} | images-delete / anonymous | Permanently delete unused blob and SQL metadata — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/card-login | kiosk-card-login / anonymous | Resolve supplied card into employee or external identity and financial snapshot — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/cards/{id?} | kiosk-cards / anonymous | Manage external/temporary cards (employee card mappings remain Employees) — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/cards/{id?} | kiosk-cards / anonymous | Manage external/temporary cards (employee card mappings remain Employees) — caller IDs/filters; no application identity/role check |
| PUT | /api/kiosk/cards/{id?} | kiosk-cards / anonymous | Manage external/temporary cards (employee card mappings remain Employees) — caller IDs/filters; no application identity/role check |
| DELETE | /api/kiosk/cards/{id?} | kiosk-cards / anonymous | Manage external/temporary cards (employee card mappings remain Employees) — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/external-accounts/{id?} | kiosk-external-accounts / anonymous | Manage billing accounts and read derived financial balances — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/external-accounts/{id?} | kiosk-external-accounts / anonymous | Manage billing accounts and read derived financial balances — caller IDs/filters; no application identity/role check |
| PUT | /api/kiosk/external-accounts/{id?} | kiosk-external-accounts / anonymous | Manage billing accounts and read derived financial balances — caller IDs/filters; no application identity/role check |
| DELETE | /api/kiosk/external-accounts/{id?} | kiosk-external-accounts / anonymous | Manage billing accounts and read derived financial balances — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/external-accounts/{id}/ledger | kiosk-external-account-ledger / anonymous | Read combined physical ledger plus derived virtual lunch purchase entries — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/external-accounts/{id}/deposit | kiosk-external-account-deposit / anonymous | Append positive Prepayment for a prepaid billing account — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/external-accounts/{id}/payment | kiosk-external-account-payment / anonymous | Append positive Payment to postpaid/invoice account — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/external-accounts/{id}/adjustment | kiosk-external-account-adjustment / anonymous | Append signed Credit or Adjustment to billing ledger — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/layouts/{id?} | kiosk-layouts / anonymous | List layouts, read default/ID layout or replace items — caller IDs/filters; no application identity/role check |
| PUT | /api/kiosk/layouts/{id?} | kiosk-layouts / anonymous | List layouts, read default/ID layout or replace items — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/products/{id?} | kiosk-products / anonymous | List/read/create/update/deactivate café product library and managed-image links — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/products/{id?} | kiosk-products / anonymous | List/read/create/update/deactivate café product library and managed-image links — caller IDs/filters; no application identity/role check |
| PUT | /api/kiosk/products/{id?} | kiosk-products / anonymous | List/read/create/update/deactivate café product library and managed-image links — caller IDs/filters; no application identity/role check |
| DELETE | /api/kiosk/products/{id?} | kiosk-products / anonymous | List/read/create/update/deactivate café product library and managed-image links — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/reports/{report?} | kiosk-reports / anonymous | Dispatch café overview/transactions/payroll/external-invoicing/export report — caller IDs/filters; no application identity/role check |
| GET | /api/kiosk/sales/{id?} | kiosk-sales / anonymous | Read sale by ID or create idempotent card-resolved café purchase — caller IDs/filters; no application identity/role check |
| POST | /api/kiosk/sales/{id?} | kiosk-sales / anonymous | Read sale by ID or create idempotent card-resolved café purchase — caller IDs/filters; no application identity/role check |
| POST | /api/kitchen/order-cancellations | kitchen-order-cancellations / anonymous | Append reasoned cancellation to a retained meal source row — caller IDs/filters; no application identity/role check |
| GET | /api/kitchen/orders | kitchen-orders / anonymous | Operational active meal/salad traceability rows and portion totals — caller IDs/filters; no application identity/role check |
| POST | /api/kitchen/salad-order-cancellations | kitchen-salad-order-cancellations / anonymous | Append cancellation to retained employee/external or guest salad source row — caller IDs/filters; no application identity/role check |
| GET | /api/kitchen/weekly-summary | kitchen-weekly-summary / anonymous | ISO-week kitchen performance totals and popularity — caller IDs/filters; no application identity/role check |
| GET | /api/lunch-reports | lunch-reports / anonymous | Payroll lunch count, external account lunch count, guest totals — caller IDs/filters; no application identity/role check |
| GET | /api/manual-lunch-adjustments | manual-lunch-adjustments / anonymous | List/create positive employee lunch-count correction — caller IDs/filters; no application identity/role check |
| POST | /api/manual-lunch-adjustments | manual-lunch-adjustments / anonymous | List/create positive employee lunch-count correction — caller IDs/filters; no application identity/role check |
| GET | /api/meals | meals / anonymous | List/create multilingual meal library — caller IDs/filters; no application identity/role check |
| POST | /api/meals | meals / anonymous | List/create multilingual meal library — caller IDs/filters; no application identity/role check |
| PUT | /api/meals/{mealId} | meal-item / anonymous | Update/archive meal or attempt guarded hard deletion — caller IDs/filters; no application identity/role check |
| DELETE | /api/meals/{mealId} | meal-item / anonymous | Update/archive meal or attempt guarded hard deletion — caller IDs/filters; no application identity/role check |
| GET | /api/menu/cycles/{cycleId?} | menu-cycles / anonymous | List/read/create/update repeating menu cycle — caller IDs/filters; no application identity/role check |
| POST | /api/menu/cycles/{cycleId?} | menu-cycles / anonymous | List/read/create/update repeating menu cycle — caller IDs/filters; no application identity/role check |
| PUT | /api/menu/cycles/{cycleId?} | menu-cycles / anonymous | List/read/create/update repeating menu cycle — caller IDs/filters; no application identity/role check |
| GET | /api/menu/cycles/{cycleId}/weeks/{weekNumber} | menu-week / anonymous | Read or replace all five weekday meal assignments for rotation week — caller IDs/filters; no application identity/role check |
| PUT | /api/menu/cycles/{cycleId}/weeks/{weekNumber} | menu-week / anonymous | Read or replace all five weekday meal assignments for rotation week — caller IDs/filters; no application identity/role check |
| GET | /api/orders | orders / anonymous | Read or reconcile meal orders scoped to employee or external card — caller IDs/filters; no application identity/role check |
| PUT | /api/orders | orders / anonymous | Read or reconcile meal orders scoped to employee or external card — caller IDs/filters; no application identity/role check |
| GET | /api/salad-orders | salad-orders / anonymous | Read or replace salad orders scoped to employee or external card — caller IDs/filters; no application identity/role check |
| PUT | /api/salad-orders | salad-orders / anonymous | Read or replace salad orders scoped to employee or external card — caller IDs/filters; no application identity/role check |
| GET | /api/salads/{id?} | salads / anonymous | List/read/create/update/archive independent salad library — caller IDs/filters; no application identity/role check |
| POST | /api/salads/{id?} | salads / anonymous | List/read/create/update/archive independent salad library — caller IDs/filters; no application identity/role check |
| PUT | /api/salads/{id?} | salads / anonymous | List/read/create/update/archive independent salad library — caller IDs/filters; no application identity/role check |
| DELETE | /api/salads/{id?} | salads / anonymous | List/read/create/update/archive independent salad library — caller IDs/filters; no application identity/role check |


## Control-state classification

**Confirmed source/export facts:** anonymous Function registrations; no supplied app JWT/role verification; employee number and card lookup; client session timers; server-side individual ownership/validity checks; SQL and private-backed Blob access through connection-string APIs; exported HTTPS/TLS/storage public-access prohibitions and public-network flags. Those checks are business/data validation, not caller authorization.

**Planned/docs-only:** Entra app/role/group design and wider access model. **Unknown:** Easy Auth, actual deployed route policy, CORS, settings/principal permissions, current auth revision, SQL auditing/encryption/firewall specifics and restore readiness. Null export fields do not mean disabled controls.

**Recommendations, not implemented controls:** restrict administrative/financial operations to verified server-side identity/roles; bind editable owner to authenticated claims; review least privilege and audit actor authenticity; decide static historical/test output exclusions; verify secret lifecycle, platform/network policy, image authorization/cache and financial data scope. This is factual documentation, not a penetration test or exploitation assessment. No live security probes were run.

