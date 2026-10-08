# Documentation source map

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Authority and safe interpretation

Current frontend/API code, numbered SQL extraction and completed Azure exports outrank restart and handover prose. Next: `lunchappDEV/docs/START-HERE-2026-10-19.md`, 08 handover/changelog, 07, 06, 05 and older material. The 19 October title is a project-record date, future relative to this snapshot, not proof of elapsed work or deployment. A conflict between code and SQL remains a conflict. Blank Azure template/export fields mean **Unknown**, not disabled.

## Principal evidence for each of the 18 documents

### 00-START-HERE.md

- `lunchappDEV/docs/START-HERE-2026-10-19.md`
- `lunchappDEV/docs/HANDOVER-2026-10-08.md`
- `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md`

### 01-CURRENT-SOLUTION-OVERVIEW.md

- `lunchappDEV/index.html`
- `lunchappDEV/admin/index.html`
- `lunchapp-api/src/functions/orders.js`
- `lunchapp-api/src/functions/kiosk-sales.js`

### 02-SYSTEM-ARCHITECTURE.md

- `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`
- `lunchapp-api/package.json`
- `lunchapp-api/host.json`
- `lunchapp-api/src/functions/images.js`

### 03-CURRENT-DATABASE-SCHEMA.md

- `lunchappDEV/docs/05-sql/00-preflight.csv`
- `lunchappDEV/docs/05-sql/01-objects.csv`
- `lunchappDEV/docs/05-sql/02-tables-columns-1.csv`
- `lunchappDEV/docs/05-sql/02-tables-columns-2.csv`
- `lunchappDEV/docs/05-sql/03-constraints.csv`
- `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv`
- `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv`
- `lunchappDEV/docs/05-sql/05-indexes-1.csv`
- `lunchappDEV/docs/05-sql/05-indexes-2.csv`
- `lunchappDEV/docs/05-sql/06-programmable-objects.csv`
- `lunchappDEV/docs/05-sql/07-module-definitions.csv`
- Complete SQL constraint/index/dependency/security extraction ledger below supplements these principal paths.

### 04-DATABASE-DATA-DICTIONARY.md

- `lunchappDEV/docs/05-sql/02-tables-columns-2.csv`
- `lunchappDEV/docs/05-sql/03-constraints.csv`
- `lunchappDEV/docs/05-sql/05-indexes-2.csv`
- `lunchapp-api/src/functions/lunch-reports.js`
- `lunchapp-api/src/functions/images.js`
- Complete SQL constraint/index/dependency/security extraction ledger below supplements these principal paths.

### 05-DATABASE-RELATIONSHIPS.md

- `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv`
- `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv`
- `lunchappDEV/docs/05-sql/07-module-definitions.csv`
- Complete SQL constraint/index/dependency/security extraction ledger below supplements these principal paths.

### 06-CURRENT-API-SURFACE.md

- `lunchapp-api/src/functions/current-menu.js`
- `lunchapp-api/src/functions/orders.js`
- `lunchapp-api/src/functions/salad-orders.js`
- `lunchapp-api/src/functions/kiosk-reports.js`
- `lunchappDEV/user/my-orders.js`
- `lunchappDEV/admin/employee-admin.js`
- All26 API JS and all104 expanded frontend calls are exhaustively referenced in document06; this principal list is not a restricted coverage list.

### 07-CURRENT-FRONTEND-STRUCTURE.md

- `lunchappDEV/index.html`
- `lunchappDEV/admin/index.html`
- `lunchappDEV/user/lunch.js`
- `lunchappDEV/lunchkiosk/kiosk-shell.js`
- `lunchappDEV/bulla/order.js`
- All86 frontend HTML/JS/CSS are inventoried individually in document07.

### 08-BUSINESS-RULES.md

- `lunchapp-api/src/functions/orders.js`
- `lunchapp-api/src/functions/guest-orders.js`
- `lunchapp-api/src/functions/salad-orders.js`
- `lunchapp-api/src/functions/guest-salad-orders.js`
- `lunchapp-api/src/functions/kiosk-sales.js`
- `lunchappDEV/docs/05-sql/07-module-definitions.csv`

### 09-AZURE-ARCHITECTURE.md

- `lunchappDEV/docs/02-architecture/ARCHITECTURE-AND-DECISIONS-2026-10-05.md`
- `lunchappDEV/docs/02-architecture/ARCHITECTURE-NOTES-2026-10-07.md`
- `lunchappDEV/docs/02-architecture/FRONTEND-AND-API-CHANGES-2026-10-05.md`
- `lunchappDEV/docs/02-architecture/MENU-CYCLES.md`
- `lunchappDEV/docs/02-architecture/ORDER-CANCELLATIONS.md`
- `lunchappDEV/docs/02-architecture/account.json`
- `lunchappDEV/docs/02-architecture/functionapps.json`
- `lunchappDEV/docs/02-architecture/resourcegroups.json`
- `lunchappDEV/docs/02-architecture/resources.json`
- `lunchappDEV/docs/02-architecture/sqlservers.json`
- `lunchappDEV/docs/02-architecture/storageaccounts.json`

### 10-DEPLOYMENT-AND-OPERATIONS.md

- `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`
- `lunchapp-api/docs/README-AZURE.md`
- `lunchapp-api/.funcignore`
- `lunchapp-api/package-lock.json`
- `lunchappDEV/README-DEPLOYMENT 2026-10-05.md`

### 11-AUTHENTICATION-AND-SECURITY.md

- `lunchappDEV/docs/docs/ENTRA-ACCESS-DESIGN.md`
- `lunchappDEV/user/login.js`
- `lunchapp-api/src/functions/kiosk-card-login.js`
- `lunchapp-api/src/functions/images.js`

### 12-REPORTING.md

- `lunchapp-api/src/functions/lunch-reports.js`
- `lunchapp-api/src/functions/kiosk-reports.js`
- `lunchapp-api/src/functions/kitchen-orders.js`
- `lunchapp-api/src/functions/kitchen-weekly-summary.js`
- `lunchappDEV/admin/lunch-reports-ui.js`
- `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js`

### 13-TESTING-AND-VALIDATION.md

- `lunchappDEV/docs/06-testing/STABILIZATION-CHECKLIST.md`
- `lunchappDEV/docs/06-testing/POSTMAN-SMOKE-TESTS.md`
- `lunchappDEV/docs/06-testing/TESTING-AND-VALIDATION-2026-10-05.md`
- `lunchappDEV/docs/06-testing/TESTING-VALIDATION-2026-10-07.md`
- `lunchappDEV/test-employees.html`
- `lunchapp-api/package.json`

### 14-KNOWN-GAPS-AND-TODOS.md

- `lunchappDEV/docs/START-HERE-2026-10-19.md`
- `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md`
- `lunchappDEV/docs/HANDOVER-2026-10-08.md`
- `lunchapp-api/src/functions/orders.js`
- `lunchapp-api/src/functions/meals.js`
- `lunchappDEV/user/my-orders.js`

### 15-DOCUMENTATION-SOURCE-MAP.md

- `lunchappDEV/docs/05-sql/00-preflight.csv`
- `lunchappDEV/docs/START-HERE-2026-10-19.md`
- `lunchapp-api/src/functions/API-DOCUMENTATION.md`

### 16-HISTORICAL-TIMELINE.md

- `lunchapp-api/docs/BUILD-LOG.md`
- `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md`
- `lunchappDEV/docs/01-changelog/CHANGELOG-2026-10-07.md`
- `lunchappDEV/docs/CHANGELOG-2026-10-08.md`
- `lunchappDEV/docs/START-HERE-2026-10-19.md`

### 17-EXECUTIVE-SUMMARY.md

- `lunchappDEV/docs/START-HERE-2026-10-19.md`
- `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md`
- `lunchappDEV/docs/HANDOVER-2026-10-08.md`
- `lunchappDEV/docs/05-sql/07-module-definitions.csv`
- `lunchapp-api/src/functions/kiosk-sales.js`

## Superseded, historical-only and potentially obsolete sources

## Explicitly superseded or potentially obsolete material (reason, not filename date alone)

- `lunchappDEV/lunchkiosk/LUNCHKIOSK-README.md` and `docs/docs/CURRENT-ARCHITECTURE.md` say external lunch cards are blocked / employee-only. Current lunchkiosk card login plus user lunch code accepts external account+CardID; 05/07 changes supersede this **capability statement**, while shell composition/session guidance still useful.
- `docs/00-overview/PROJECT-STATUS.md`: says weekly summary remains local and cancellation reporting future. Current weekly-summary.html/js calls SQL API. Its local Order Explorer warning still applies. Partial historical record, not wholesale false.
- `docs/03-api/API-REFERENCE.md` and `docs/00-overview/FILE-DEPLOYMENT-MAP.md`: contain only pre-salad/café/finance/image route/file inventory; current 26 function source files/36 registrations are authoritative. Menu-cycle and meal-cancellation examples still represent implemented routes.
- `docs/DEPLOYMENT-STATE.md`: 01 card UI mismatch and limited file map are superseded by current external-only cards UI and later paths/image/finance/CardID. Do not use as full deployment manifest.
- `docs/ORDER_DATA_MODEL.md`: employee-only ownership and wholesale transactional replacement prose omit independent salads/external account+CardID and stable cancellation IDs. Retain original decision history; update current definitions from code/SQL.
- `docs/docs/NEXT-SESSION.md` image design suggests managed identity, upload SAS/direct Blob, WebP and final public URL. 06 implemented **private container, API multipart upload, JPEG crop, SQL BlobName/ImageAssetID**, not that proposal. Scheduled reports in this file are explicitly postponed, not implemented Timer jobs.
- `docs/02-architecture/ARCHITECTURE-AND-DECISIONS-2026-10-05.md`, `lunchappDEV/docs/02-architecture/FRONTEND-AND-API-CHANGES-2026-10-05.md`, `docs/05-sql/DATABASE-CHANGES-2026-10-05.md`: external account-only uniqueness/payload and guessed cardholder superseded by 07 CardID changes. Finance effective-price/derived-charge/manual-adjustment decisions remain current.
- `docs/06-testing/TESTING-AND-VALIDATION-2026-10-05.md`: no exact CardID limitation resolved by 07 source; “verified external My Orders” cannot transfer to 07 unchanged My Orders contract. Insufficient lunch funds limitation remains.
- `docs/04-frontend/FRONTEND-CHANGES-2026-10-07.md` product-image reduction backlog is described as completed in 08 prose, but corresponding selected-image CSS is absent; mark conflict/pending verification, not confidently done.
- `docs/README.md` labels session 2026-10-06 but narrates CardID/credit work also documented under 07, and calls API path `/api/` generically though actual API sources are separate repository `src/functions/`. Content and code outrank inconsistent label.
- `docs/2026-10-01/README.md` describes 29 Sep snapshot and weekly work to do; actual directory title is not chronology evidence for each claim.
- `admin/README.txt` patch instructions refer to missing statistics.html/statistics-card.html and local POC statistics; current statistics.js is a different weekly API script without page. Evidence of mixed package generations, not a deploy-ready complete package.
- `admin/ADMIN-LANDING-README.md` explicitly removes obsolete bulla-products link and commented POC report; current root no longer links bulla-products or bulla-report, but still exposes POC Order Explorer and missing Statistics. Do not claim all POC navigation was removed.
- `admin/index-old.html`, `lunchappDEV/admin/index-old (2).html`, `lunchappDEV/admin/index - read only friday.html`, `lunchappDEV/admin/index-2026-10-05.html`, `lunchappDEV/admin/index-2026-10-06.html`: no current inbound navigation; differing navigation demonstrates earlier local Bulla links / no lunch reporting/prices / no Image Library. These are **historical snapshots**, not true current copies or a Friday read-only runtime controller. Direct-path deployment is still possible.
- `admin/kitchen-old-delete-later.js`: no HTML reference, lacks current salad cancellation/card-last5 identity handling and is superseded by kitchen.js loaded by kitchen-summary.html.
- `admin/bulla-products.html/js` and `bulla-report.html/js`: localStorage product editor/order-log CSV, not current API product/report UI; current landing removed links. They remain compatible with old café POC only.
- `admin/order-data.js`: old anchor/local order/menu/employee keys and synthetic demo source, **not orphaned** because current order-explorer.html loads it. Do not delete based only on old naming.
- `admin/statistics.js`, `lunchappDEV/admin/statistics.css`: no statistics.html supplied; current admin page still links missing destination. Orphaned assets/potential intended feature, not verified obsolete deletions.
- `admin/kioskadmin/bak drunk copilot/` HTML/JS/CSS: unreferenced duplicate-generation external account/card admin under extra path depth, with wrong relative back navigation for this physical location and older presentation. They contain real anonymous API calls, so not harmless static screenshots.
- `bulla/drunk copilot/` index/card-login/order/CSS: local demo identity, browser products and purchase log; active bulla uses API, different session key and DOM. READMEs in same backup folder claim SQL-backed replacements that do not describe its currently present POC runtime. `kiosk-card-login.js` is CommonJS Azure Function source misfiled there, no script tag, not a browser login alternative. `lunchappDEV/bulla/drunk copilot/demo-users.js` / `lunchappDEV/bulla/drunk copilot/bulla-demo-layout.css` not referenced, and active `bulla/README 2026-10-02.md` explicitly instructs removal from active runtime.
- `lunchkiosk/lunchkiosk-old.css`: unreferenced older centered-login generation (current CSS adds login-shell container); existing `lunchappDEV/lunchkiosk/lunchkiosk.css` is the actual loaded asset.
- `database/001_create_tables.sql` and `lunchappDEV/database/001_1_create_tables.sql`: 9 versus 14 CREATE TABLE inventories; first includes initial Balances/KioskTransactions/no cycles, second adds GuestOrders/MenuCycles/cancellations but still no independent salads/new café sales/image/finance. **Neither is full current rebuild**. Schema exports and forward migration evidence must outrank them.
- `lunchapp-api/docs/README-AZURE.md` and `lunchapp-api/docs/ARCHITECTURE-DECISIONS.md`: foundational single endpoint/migration plan and deployment decisions, not current endpoint or permission/network proof. Actual Azure exports need separate verification.
- `lunchapp-api/src/functions/API-DOCUMENTATION.md`: draft says 22 endpoints and employee-only order scope; current source has 26 function JS and 36 HTTP registrations, external/card/finance/image expansion. Do not cite count as current.
- `lunchapp-api/src/functions/KIOSK-SALES-API-README.md`: says no idempotency and allows missing non-prepaid credit; current kiosk sends requestId and 07 code/handover enforce missing credit blocking. Old ledger-only balance explanation is superseded by balance-view integration.
- `lunchapp-api/src/functions/README-cafe-kiosk-apis.txt`: includes employee KioskCards owner example. `lunchapp-api/src/functions/README-kiosk-card-model.txt` and current code supersede that; employee cards belong only Employees.
- `lunchapp-api/docs/add-salads-to-orders.sql`: experimental meal-linked salad attributes, superseded by `lunchapp-api/docs/independent-salad-orders.sql` and separate current routes/tables. Do not rerun as a current required migration.

## Exact runtime file classification ledger

“Historical”, “unreferenced”, “orphaned” and “duplicate-generation” are not deletion approval. No true byte-duplicate status is asserted without a digest comparison. Current Order Explorer uses POC order-data.js; Statistics assets lack their page. All paths are exact, repository-relative.

| Exact file | Evidence-based classification |
|---|---|
| `lunchappDEV/admin/bulla-products.html` | legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-products.js` | legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-report.html` | legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-report.js` | legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/index - read only friday.html` | historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-2026-10-05.html` | historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-2026-10-06.html` | historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-old (2).html` | historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-old.html` | historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/cafe-kiosk-admin.css` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.html` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kitchen-old-delete-later.js` | historical superseded script; kitchen-summary.html loads kitchen.js |
| `lunchappDEV/admin/order-data.js` | currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/order-explorer.html` | currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/order-explorer.js` | currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/statistics.css` | orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/admin/statistics.js` | orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/bulla/drunk copilot/bulla-demo-layout.css` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/bulla.css` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/card-login.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/demo-users.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/index.html` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/kiosk-card-login.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/order.html` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/order.js` | historical backup/demo; not referenced by current navigation |
| `lunchappDEV/lunchkiosk/lunchkiosk-old.css` | orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/test-employees.html` | diagnostic/test entry; not current portal navigation |

## Complete first-party documentation source ledger

### Appendix D — full first-party documentation source ledger

This ledger includes ALL 68 frontend Markdown and 6 frontend TXT files plus API-side project Markdown/TXT. The four large frontend TXT schema extracts are metadata evidence, not narrative specifications; no database record values are copied. HTML/JS/CSS sources are exhaustively mapped above. SQL/CSV/Azure JSON are source-of-truth evidence for the final SQL/Azure agents; the source manifest counts and missing-file checks do not convert them to live state.

| Exact evidence source | Type and use / precedence warning |
|---|---|
| `lunchappDEV/README-DEPLOYMENT 2026-10-05.md` | External lunch ordering package; Folder mapping; Deploy order; Important — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/README.md` | lunchappDEV — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/ADMIN-LANDING-I18N-README.md` | Administration landing page, trilingual baseline — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/ADMIN-LANDING-README.md` | Administration landing page; Deploy; Removed from the landing page — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/README.txt` | Package/patch instructions — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/kioskadmin/KIOSK-LAYOUT-BUILDER-README.md` | Café Kiosk Layout Builder; Included files; API routes; Save payload; Builder behaviour — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/kioskadmin/KIOSK-REPORTING-UI.md` | Café Kiosk Reporting UI — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/kioskadmin/README-IMAGE-LIBRARY.md` | Image library — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/admin/kioskadmin/README-IMAGE-UI.md` | Product image cropper and picker; Included; Quick test — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/bulla/README 2026-10-02.md` | Café Kiosk clean rebuild; Frontend; API — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/bulla/README 2026-10-06.md` | Café Kiosk product image display patch — image work/handover (docs/README.md date label conflict separately noted). |
| `lunchappDEV/bulla/drunk copilot/CARD-NUMBER-NORMALIZATION.md` | Café Kiosk card-number normalization — historical package copy; compare actual backup source, not replacement claims. |
| `lunchappDEV/bulla/drunk copilot/COMPLETE-KIOSK-FRONTEND.md` | Complete Café Kiosk frontend — historical package copy; compare actual backup source, not replacement claims. |
| `lunchappDEV/bulla/drunk copilot/README.txt` | Package/patch instructions — historical package copy; compare actual backup source, not replacement claims. |
| `lunchappDEV/bulla/drunk copilot/REAL-KIOSK-README.md` | Real Café Kiosk — historical package copy; compare actual backup source, not replacement claims. |
| `lunchappDEV/database/extract-external-account-finance-schema.txt` | SQL schema/view extract; technical metadata evidence, not project narrative or deployment proof; raw content not reproduced. |
| `lunchappDEV/database/vwExternalAccountBalances.txt` | SQL schema/view extract; technical metadata evidence, not project narrative or deployment proof; raw content not reproduced. |
| `lunchappDEV/docs/00-overview/FILE-DEPLOYMENT-MAP.md` | File deployment map; Azure Functions; Admin frontend; Employee frontend — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/00-overview/PROJECT-STATUS.md` | Project status, 2026-09-29; Stable and tested; Employee administration; Menu administration; Employee ordering — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-09-29.md` | Changelog, 2026-09-29; Employee administration; Menu cycles; Menu resolution; Meal deletion and archival — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-10-05.md` | Changelog: 2026-10-05; External lunch ordering; Database uniqueness fixes; Lunch kiosk UX; Kitchen views — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-10-07.md` | Changelog 2026-10-07; Added; Changed; Fixed; Deferred — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/02-architecture/ARCHITECTURE-AND-DECISIONS-2026-10-05.md` | Architecture and Decisions: 2026-10-05; Preserve history instead of rewriting it; One lunch equals one payroll unit; Employees and external accounts are separate reporting audiences; External account modes share one financial model — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/02-architecture/ARCHITECTURE-NOTES-2026-10-07.md` | Architecture Notes 2026-10-07; External account and card ownership; Order identity rules; Employee order; External card order — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/02-architecture/FRONTEND-AND-API-CHANGES-2026-10-05.md` | Frontend and API Changes: 2026-10-05; Ordering APIs; `lunchapp-api/src/functions/orders.js`; `lunchapp-api/src/functions/salad-orders.js`; Owner payload model — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/02-architecture/MENU-CYCLES.md` | Menu-cycle architecture; Data hierarchy; Cycle selection rule; Rotation calculation; Operational consequence — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/02-architecture/ORDER-CANCELLATIONS.md` | Order-cancellation architecture; Principle; Supported order types; Reason codes; Transaction rules — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/03-api/API-CHANGES-2026-10-07.md` | API Changes 2026-10-07; `lunchapp-api/src/functions/orders.js`; `lunchapp-api/src/functions/salad-orders.js`; `lunchapp-api/src/functions/kitchen-orders.js`; `kiosk-card-login.js` — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/03-api/API-REFERENCE.md` | API reference; Menu cycles; Cycle-aware menu weeks; Current menu by date; Kitchen reporting — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/04-frontend/FRONTEND-CHANGES-2026-10-07.md` | Frontend Changes 2026-10-07; `/lunchkiosk/card-login.js`; `/user/lunch.js`; `/lunchkiosk/kiosk-shell.js`; `/admin/kitchen.js` — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/04-frontend/KITCHEN-SUMMARY.md` | Daily Kitchen Summary; Data source; Current behaviour; Cancellation UI — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/04-frontend/MENU-ADMIN.md` | Menu Admin; Cycle controls; Week editing; Archived cycles — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/DATABASE-CHANGES-2026-10-05.md` | Database Changes: 2026-10-05; Orders and SaladOrders ownership; Orders; SaladOrders; Unique-index correction — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/05-sql/DATABASE-CHANGES-2026-10-07.md` | Database Changes 2026-10-07; Columns added; Foreign keys added; Unique index changes; Existing objects verified — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/05-sql/DATABASE_CHANGELOG_2026-09-26_to_2026-09-28.md` | Lunch App Database Change Log; Overview; Core Tables; Meals; Rotating Menu Structure — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/MEAL-ARCHIVAL-NOTES.md` | Meal archival and deletion; Current policy; Hard-delete reference checks — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/MENU-CYCLES-MIGRATION.md` | MenuCycles migration summary; Added table; MenuWeeks change; Foreign key; Uniqueness change — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/ORDER-CANCELLATIONS.md` | OrderCancellations schema; Table created; Foreign keys added; Indexes added; Recommended optional constraint — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/README.md` | SQL changes — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/05-sql/first.txt` | SQL schema/view extract; technical metadata evidence, not project narrative or deployment proof; raw content not reproduced. |
| `lunchappDEV/docs/05-sql/second.txt` | SQL schema/view extract; technical metadata evidence, not project narrative or deployment proof; raw content not reproduced. |
| `lunchappDEV/docs/06-testing/POSTMAN-SMOKE-TESTS.md` | Postman smoke tests; Current menu; Kitchen daily report; Employee cancellation; Expected cancellation checks — recipes/checklist, not completed execution evidence. |
| `lunchappDEV/docs/06-testing/STABILIZATION-CHECKLIST.md` | Stabilization checklist; Menu cycles; Employee ordering; Kitchen Summary; Cancellations — recipes/checklist, not completed execution evidence. |
| `lunchappDEV/docs/06-testing/TESTING-AND-VALIDATION-2026-10-05.md` | Testing and Validation: 2026-10-05; Verified manually; Bugs found and fixed; Duplicate external meal orders; Duplicate external salad orders — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/06-testing/TESTING-VALIDATION-2026-10-07.md` | Testing and Validation 2026-10-07; External lunch CardID validation; Lunch Kiosk logout validation; Kitchen identity validation; Café funds display validation — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md` | Daily documentation - 2026-10-06; Summary; 1. Database changes; New table: `dbo.ImageAssets`; Updated table: `dbo.KioskProducts` — image work/handover (docs/README.md date label conflict separately noted). |
| `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md` | Lunch App - Development Summary; Overview; Implemented Today; Menu API; Menu Builder — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-05.md` | Handover: 2026-10-05; Current status; Major deployed capabilities; Employees; External accounts — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-06.md` | Handover - 2026-10-06; Current state; Important paths; Important API routes; Operational cautions — image work/handover (docs/README.md date label conflict separately noted). |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md` | Handover 2026-10-07; Current state; Files changed during the session; API; Lunch Kiosk and user frontend — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/07-handover/NEXT-SESSION.md` | Next session handover; Planned target; Existing POC files; Recommended approach; Suggested Weekly Summary outputs — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW 2026-10-01.md` | Hey you two: start here tomorrow; Immediate first task; Fix the Cards Admin UI to match the final card model; Verify today's final API deployment; Second task — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-05.md` | Start Here Tomorrow: 2026-10-05; First 15 minutes; Documentation checkpoint; Primary focus: image library; Do not forget — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-06.md` | Start here tomorrow - 2026-10-06; First task: validate the Image Library deployment; Quick regression test; If something fails; Functions cannot load `lunchapp-api/src/functions/images.js` — image work/handover (docs/README.md date label conflict separately noted). |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-07.md` | Start Here Tomorrow 2026-10-07; First task; Do not start by editing frontend files; Questions to resolve before implementation; Recommended technical direction — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/2026-10-01/CHANGELOG-2026-10-01.md` | Changelog: Lunch App and Café Kiosk; Executive summary; 1. Salad administration; Database and API; Salad administration front end — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/2026-10-01/README.md` | Lunch App DEV documentation package; Folder structure; Current headline status; Next planned work — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/CHANGELOG-2026-10-08.md` | Changelog - 2026-10-08; Summary; Product Library; External Cards; External Accounts — latest handover/restart context; code/SQL/config overrides, validation still pending. |
| `lunchappDEV/docs/DAILY-DOCUMENTATION-2026-10-07.md` | Daily Documentation 2026-10-07; Summary; Work completed; 1. External CardID on lunch and salad orders; 2. Card-specific external order ownership — CardID/financial architecture session; current source overrides any broad completion claims. |
| `lunchappDEV/docs/DEPLOYMENT-STATE.md` | Deployment state and file map; Function App files created or updated today; Database scripts created today; Web files created or updated today; Important final card model — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/HANDOVER-2026-10-08.md` | Handover - 2026-10-08; Session objective; Completed work; Product Library; External Cards — latest handover/restart context; code/SQL/config overrides, validation still pending. |
| `lunchappDEV/docs/ORDER_DATA_MODEL.md` | Lunch App Order Data Model; Purpose; Overview; Personal Orders; Table — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/README 2026-10-02.md` | Lunch App and Café Kiosk handover; Current status; Documentation map; Start here next time — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/README 2026-10-05.md` | LunchApp Documentation Package; Contents; Current headline state; Repository note — external-account lunch/finance session; ownership portions superseded by 07 CardID. |
| `lunchappDEV/docs/README 2026-10-06.md` | LunchApp / Cafe Kiosk documentation; Documents; Scope completed today — image work/handover (docs/README.md date label conflict separately noted). |
| `lunchappDEV/docs/README-AZURE.md` | Lunch App Frontend; Purpose; Local path; Azure resource; Current backend integration — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/README.md` | LunchApp Documentation; Folder structure; Session outcome; Important paths; Naming cleanup backlog — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/START-HERE-2026-10-19.md` | Start Here - 2026-10-19; Purpose; Read first; Current state; Changes completed on 2026-10-08 — latest handover/restart context; code/SQL/config overrides, validation still pending. |
| `lunchappDEV/docs/docs/CHANGELOG-2026-10-02.md` | Changelog, 2 October 2026; Café Kiosk frontend; Café Kiosk reporting API; Café Kiosk reporting UI; Administration landing page — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/docs/CURRENT-ARCHITECTURE.md` | Current architecture; Frontend folders; Shared backend; Identity sources; Browser sessions — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/docs/ENTRA-ACCESS-DESIGN.md` | Microsoft Entra ID access design; Recommendation; Proposed app roles; Suggested access; Implementation note — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchappDEV/docs/docs/NEXT-SESSION.md` | Next session; Start with these tasks, in this order; 1. Guest lunch ordering; 2. Product image library; 3. Microsoft Entra ID access — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchappDEV/docs/docs/TEST-PLAN.md` | Pilot test plan; Café Kiosk; Reporting; Lunch kiosk; Feedback to collect — recipes/checklist, not completed execution evidence. |
| `lunchappDEV/lunchkiosk/LUNCHKIOSK-README.md` | Lunch kiosk pilot; Supported in this pilot; External accounts; Future split — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/docs/ARCHITECTURE-DECISIONS.md` | Lunch App Architecture Decisions; Decision summary; 1. Separate frontend and backend repositories; Decision; Reasoning — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/docs/BUILD-LOG.md` | Lunch App Build Log; 25 September 2026; Starting point; Git and frontend deployment verified; Azure SQL provisioned — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/docs/README-AZURE.md` | Lunch App API; Purpose; Local path; Azure resources; Current endpoint — partial historical/proposed architecture; use source/dated successors for current inventory. |
| `lunchapp-api/src/functions/API-DOCUMENTATION.md` | LunchApp API Documentation (Draft v1); Overview; Core Lunch APIs; hello.js; current-menu.js — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/KIOSK-REPORTING-API.md` | Café Kiosk Reporting API; Deploy; Endpoints; Common parameters; Overview — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/KIOSK-REPORTING-OVERVIEW-FIX.md` | Café Kiosk reporting overview fix — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/KIOSK-SALES-API-README.md` | Café Kiosk Sales API; Files; Routes; Create a sale; Read a sale — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/README-cafe-kiosk-apis.txt` | Package/patch instructions — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/README-external-accounts-api.txt` | Package/patch instructions — component/design/history evidence; absence of execution receipt is not a test pass. |
| `lunchapp-api/src/functions/README-kiosk-card-model.txt` | Package/patch instructions — component/design/history evidence; absence of execution receipt is not a test pass. |

Documentation ledger total: **84** first-party Markdown/TXT paths (includes schema extracts).

## Full 234-file inspection/accounting audit

Complete collection:188 frontend-repository files+46 API-repository files; no download/listing failures; exclusions only .git and node_modules. Every frontend HTML/JS/CSS source86, API JS26, SQL-folder27 and architecture-folder11 file was fully read/decoded by completed domain analysis. All84 first-party Markdown/TXT documentation files were examined/accounted for by frontend/API ledgers. Other package/configuration/export files are classified below; collection integrity does not imply business-semantic review of every lockfile line. Sensitive local configuration was inspected by names only, never values in documentation. No original evidence is bundled.

| Exact source file | Review/accounting class |
|---|---|
| `lunchapp-api/.funcignore` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/.gitignore` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/host.json` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/local.settings.json` | Sensitive configuration: setting names only; all values excluded |
| `lunchapp-api/package-lock.json` | JSON-parsed dependency/version configuration evidence; not deployed dependency proof |
| `lunchapp-api/package.json` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/.vscode/extensions.json` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/docs/ARCHITECTURE-DECISIONS.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/docs/BUILD-LOG.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/docs/README-AZURE.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/docs/add-salad-order-cancellations.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/docs/add-salads-to-orders.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/docs/independent-salad-orders.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchapp-api/src/functions/API-DOCUMENTATION.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/KIOSK-REPORTING-API.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/KIOSK-REPORTING-OVERVIEW-FIX.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/KIOSK-SALES-API-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/README-cafe-kiosk-apis.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/README-external-accounts-api.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/README-kiosk-card-model.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchapp-api/src/functions/current-menu.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/employees.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/external-lunch-prices.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/guest-orders.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/guest-salad-orders.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/hello.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/images.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-card-login.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-cards.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-external-accounts.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-layouts.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-products.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-reports.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kiosk-sales.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kitchen-order-cancellations.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kitchen-orders.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/kitchen-weekly-summary.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/lunch-reports.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/manual-lunch-adjustments.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/meals.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/menu-cycles.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/menu-week.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/orders.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/salad-orders.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchapp-api/src/functions/salads.js` | Full API handler/helper static semantic review; registration/caller/schema reconciliation; syntax check |
| `lunchappDEV/README-DEPLOYMENT 2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/index.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/test-employees.html` | Full frontend content/dependency/navigation/session/call classification: diagnostic/test entry; not current portal navigation |
| `lunchappDEV/admin/ADMIN-LANDING-I18N-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/ADMIN-LANDING-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/README.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/admin-i18n.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/admin-landing.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/bulla-products.html` | Full frontend content/dependency/navigation/session/call classification: legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-products.js` | Full frontend content/dependency/navigation/session/call classification: legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-report.html` | Full frontend content/dependency/navigation/session/call classification: legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/bulla-report.js` | Full frontend content/dependency/navigation/session/call classification: legacy localStorage POC; removed from current landing navigation |
| `lunchappDEV/admin/employee-admin.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/employee-admin.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/external-lunch-prices.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/external-lunch-prices.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/external-lunch-prices.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/index - read only friday.html` | Full frontend content/dependency/navigation/session/call classification: historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-2026-10-05.html` | Full frontend content/dependency/navigation/session/call classification: historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-2026-10-06.html` | Full frontend content/dependency/navigation/session/call classification: historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-old (2).html` | Full frontend content/dependency/navigation/session/call classification: historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index-old.html` | Full frontend content/dependency/navigation/session/call classification: historical landing snapshot; no inbound current reference |
| `lunchappDEV/admin/index.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kitchen-old-delete-later.js` | Full frontend content/dependency/navigation/session/call classification: historical superseded script; kitchen-summary.html loads kitchen.js |
| `lunchappDEV/admin/kitchen-summary.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kitchen.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/lunch-reports-ui.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/lunch-reports.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/lunch-reports.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/lunch.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/meal-library.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/meal-library.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/menu-admin.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/menu-admin.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/order-data.js` | Full frontend content/dependency/navigation/session/call classification: currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/order-explorer.html` | Full frontend content/dependency/navigation/session/call classification: currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/order-explorer.js` | Full frontend content/dependency/navigation/session/call classification: currently referenced legacy POC; not SQL report |
| `lunchappDEV/admin/salad-admin.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/salad-admin.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/statistics.css` | Full frontend content/dependency/navigation/session/call classification: orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/admin/statistics.js` | Full frontend content/dependency/navigation/session/call classification: orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/admin/weekly-summary.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/weekly-summary.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/weekly-summary.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/README 2026-10-02.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/README 2026-10-06.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/bulla.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/card-login.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/index.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/order.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/order.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/database/001_1_create_tables.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchappDEV/database/001_create_tables.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchappDEV/database/01-external-lunch-finance.sql` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchappDEV/database/extract-external-account-finance-schema.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/database/vwExternalAccountBalances.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/CHANGELOG-2026-10-08.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/DAILY-DOCUMENTATION-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/DEPLOYMENT-STATE.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/HANDOVER-2026-10-08.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/ORDER_DATA_MODEL.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/README 2026-10-02.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/README 2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/README 2026-10-06.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/README-AZURE.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/START-HERE-2026-10-19.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/lunchkiosk/LUNCHKIOSK-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/lunchkiosk/card-login.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/lunchkiosk/index.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/lunchkiosk/kiosk-shell.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/lunchkiosk/lunchkiosk-old.css` | Full frontend content/dependency/navigation/session/call classification: orphaned asset; no HTML reference in supplied snapshot |
| `lunchappDEV/lunchkiosk/lunchkiosk.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/lunchkiosk/order.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/guest-order.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/index.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/login.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/login.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/lunch.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/lunch.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/my-orders.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/user/my-orders.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml` | Configuration/migration/export/reference accounted for and relevant source evidence evaluated; source hash preserved |
| `lunchappDEV/admin/kioskadmin/KIOSK-LAYOUT-BUILDER-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/kioskadmin/KIOSK-REPORTING-UI.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/kioskadmin/README-IMAGE-LIBRARY.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/kioskadmin/README-IMAGE-UI.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/kioskadmin/cafe-kiosk-admin.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/external-accounts.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/external-accounts.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/image-library.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/image-library.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-reports.css` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/admin/kioskadmin/kiosk-reports.html` | Full frontend content/dependency/navigation/session/call classification: current referenced source; live deployment unverified |
| `lunchappDEV/bulla/drunk copilot/CARD-NUMBER-NORMALIZATION.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/drunk copilot/COMPLETE-KIOSK-FRONTEND.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/drunk copilot/README.txt` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/drunk copilot/REAL-KIOSK-README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/bulla/drunk copilot/bulla-demo-layout.css` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/bulla.css` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/card-login.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/demo-users.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/index.html` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/kiosk-card-login.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/order.html` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/bulla/drunk copilot/order.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/docs/00-overview/FILE-DEPLOYMENT-MAP.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/00-overview/PROJECT-STATUS.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-09-29.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/01-changelog/CHANGELOG-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/02-architecture/ARCHITECTURE-AND-DECISIONS-2026-10-05.md` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/ARCHITECTURE-NOTES-2026-10-07.md` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/FRONTEND-AND-API-CHANGES-2026-10-05.md` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/MENU-CYCLES.md` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/ORDER-CANCELLATIONS.md` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/account.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/functionapps.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/resourcegroups.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/resources.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/sqlservers.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/02-architecture/storageaccounts.json` | Full architecture evidence/narrative read; completed JSON properties versus blank templates separated |
| `lunchappDEV/docs/03-api/API-CHANGES-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/03-api/API-REFERENCE.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/04-frontend/FRONTEND-CHANGES-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/04-frontend/KITCHEN-SUMMARY.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/04-frontend/MENU-ADMIN.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/05-sql/00-preflight.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/01-create-manual-lunch-adjustments.sql` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/01-objects.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/02-tables-columns-1.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/02-tables-columns-2.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/03-constraints.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/05-indexes-1.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/05-indexes-2.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/06-programmable-objects.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/07-module-definitions.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/08-dependencies-fixed.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/09-security-metadata-1.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/09-security-metadata-2.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/10-documentation-summary.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/DATABASE-CHANGES-2026-10-05.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/DATABASE-CHANGES-2026-10-07.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/DATABASE_CHANGELOG_2026-09-26_to_2026-09-28.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/MEAL-ARCHIVAL-NOTES.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/MENU-CYCLES-MIGRATION.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/ORDER-CANCELLATIONS.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/README.md` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/SQL-CHANGES-2026-10-02.sql` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/dbo.vwExternalAccountBalances.csv` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/first.txt` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/05-sql/second.txt` | Full SQL metadata/definition/history decoding; all rows reconciled; no business rows |
| `lunchappDEV/docs/06-testing/POSTMAN-SMOKE-TESTS.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/06-testing/STABILIZATION-CHECKLIST.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/06-testing/TESTING-AND-VALIDATION-2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/06-testing/TESTING-VALIDATION-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-06.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/NEXT-SESSION.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW 2026-10-01.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-05.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-06.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-07.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/2026-10-01/CHANGELOG-2026-10-01.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/2026-10-01/README.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/docs/CHANGELOG-2026-10-02.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/docs/CURRENT-ARCHITECTURE.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/docs/ENTRA-ACCESS-DESIGN.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/docs/NEXT-SESSION.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/docs/docs/TEST-PLAN.md` | Documentation evidence/history/plan read; subordinate to code and current exports |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/cafe-kiosk-admin.css` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.html` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js` | Full frontend content/dependency/navigation/session/call classification: historical backup/demo; not referenced by current navigation |

## Conflict and unverified-information disposition

All30 API findings,14 frontend conflicts, Azure/runtime/security/recovery Unknowns and business/metadata interpretation gaps are centralized in14. Major conflicts: West Europe SWA versus older Sweden Central README; CardID versus older account-only payloads; gross/replacement salads versus cancellation-safe prose; current hard-delete schema mismatch; derived versus physical lunch ledger; Cafe versus lunch funds enforcement; final08 UI/CSS/path alignment; current account labels/mode versus immutable reporting expectations; planned Entra versus implemented authorization; historic future-dated record versus deployment facts. Source-specific details are in14, not resolved by choosing older prose.

## Coverage confidence and checks

High for extracted database objects/definitions and source API/frontend behavior, including mismatches. Azure high for non-null exported properties, bounded/Unknown for omitted policy. Business rules high where enforced source/view facts, lower/Unknown for business acceptance. Deployment/recovery unverified. No live network/service call or source fix/deploy was performed. 26 API Node syntax checks and234 source hashes are actual offline checks. Exact documentation package/schema/route/link/secret/ZIP/publication results are in13 and the delivery handoff.

