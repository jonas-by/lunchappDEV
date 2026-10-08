# Current frontend structure

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Runtime topology and intended audiences

- `/index.html` is the DEV/POC portal with clickable cards (inline JS `data-target`) to `/user/`, `/lunchkiosk/`, `/bulla/`, `/admin/`; it has self-contained inline styling and no API calls.
- `/user/` is employee personal-device ordering and the shared UI used by Lunch Kiosk external cards. `/user/index.html` is not a protected landing page; lunch.js redirects to login when its local owner is invalid. `/user/login.html` is employee-number directory lookup, not Entra. There is no standalone external account login in this area; external identity is supplied by kiosk card login.
- `/lunchkiosk/` is the card-reader shell for employees and external cards. `/lunchkiosk/order.html` embeds `../user/index.html` as a same-origin iframe. Moving this to another origin is not merely path renaming: shared localStorage and DOM access/postMessage validation are architectural dependencies.
- `/bulla/` is the SQL-backed Café Kiosk runtime for employee/external purchases, retaining historical Bulla folder naming. It is distinct from the historic `bulla/drunk copilot/` localStorage/demo generation.
- `/admin/` is menu/meal/salad/employee maintenance, daily/weekly kitchen summaries and lunch reports/prices. `/admin/kioskadmin/` is external accounts/cards, product/image/layout administration and café reporting. These are intended administrator/kitchen/finance audiences, **not enforced roles**.

## Session and auth contract

| Key/mechanism | Storage and consumers | Lifetime/assumptions |
|---|---|---|
| `lunch-poc-current-user-v17` | localStorage; user/login.js, lunch.js, my-orders.js; created also by lunchkiosk/card-login.js | Persistent browser/tab-shared identity; normal personal-device path has no TTL. Employee record or external record with exact cardId needed by lunch.js. No signed proof. |
| `lunch-kiosk-session-v1` | sessionStorage; lunchkiosk card login/shell | Separate tab session, nominal 60-second inactivity timer; shell also requires shared user key. Login, manual logout, timeout and successful non-guest order save clear both lunch identity/session keys. |
| `cafe-kiosk-card-session-v1` | sessionStorage; bulla login/order | Cleared on login entry, successful buy, cancel or 60-second inactivity. Funds are a login snapshot; authoritative API must enforce current funds. |
| `lunch-poc-language-v5` | localStorage; user, both kiosks, most kiosk admin pages | Shared preference but defaults differ (sv kiosk/login; en ordering/admin if absent). Language preference is not cleared with identity. |
| `lunch-poc-admin-language-v1` | localStorage; admin-i18n.js | Separate admin preference, English source keys and Swedish/Finnish dictionaries, mutation observer and `admin-language-changed` events. |
| `lunchapp-admin-language-v1` | localStorage; kiosk-reports-ui.js | Separate café report language default sv. |
| `lunch-report-language` | localStorage; lunch-reports-ui.js | Separate lunch report preference default sv. |
| Legacy `bulla-poc-*`, `lunch-poc-*` order/menu/employee keys | localStorage and old sessionStorage | POC/demo data in historic café and still-referenced Order Explorer, not current SQL order truth. Do not migrate these casually into real financial data. |

Card-reader normalization strips non-digits and keeps final five digits in current lunch/café login scripts. Card validity/account relation checks belong to the backend. Kitchen displays employee number or last-five card digits; billing still aggregates at ExternalAccountID. Historical external orders with null CardID remain account history and must not be assigned to an arbitrary person/card (07 SQL/architecture notes).

Lunch shell resets its timer on parent activity and events wired into the same-origin framed document. Successful non-guest save emits `{type:'LUNCH_KIOSK_ORDER_SAVED'}` only when framed; shell checks exact origin and iframe source before logout. Guest save does not send the success logout event. Normal standalone `/user/` does not automatically log out after save. The shell catches DOM-access failures and logs a warning rather than proving cross-origin compatibility.

## Functional walkthrough

### Employee, guest and external lunch/salad

User lunch.js loads active salads, current-menu data for each displayed week's Monday, and personal/guest meal and salad orders for the displayed range. Weekdays show today through Friday; Friday also includes next Monday-Friday; weekends show next week. Current cycle/week selection comes from the API, not a hard-coded POC anchor. `simulateFriday` remains a visible POC date simulation control. Browser-local 08:30 time locks the effective current day's steppers. The reviewed current personal meal/salad API does not implement a deadline check; older notes explicitly call server enforcement future work. Timezone and production deadline policy need backend/business confirmation.

Employee query/payload uses employeeNo; guest uses hostEmployeeNo and required workTask/project; external personal orders use externalAccountId AND cardId. There are no external guest orders: drawer hides the link, guest page redirects, and shared script rejects external guest mode. These are UX restrictions, not identity authorization. Historical docs describe active-host validation, but current `lunchapp-api/src/functions/guest-salad-orders.js:5-6` validates hostEmployeeNo shape and active salads without an employee existence/active query. Do not assume meal and salad guest validation are identical.

Save emits independent meal and salad PUTs; UI clears dirty state only when both resolve. Cancellation-aware meals load remaining quantities. Salad original-quantity behavior is a current backend conflict. My Orders loads current week and month for personal and, employee only, guest meal/salad sets; external queries omit required cardId. No employee-facing cancellation history panel is evident.

### Kitchen

Daily page groups by `itemType:mealId`, shows active quantities, people and guest work tasks, searches name/employee/card-last5/workTask, selects arbitrary day and prints expanded details. It selects meal versus salad cancellation endpoint and source ID, supports quantity/reason/comment/cancelledBy, requires text for OTHER, reloads after success while preserving expanded groups. External personal rows are reported in the API's non-guest employee branch; the frontend's “employee” subtotal label is not a separate verified external breakdown. Weekly page charts meals/salads for weekdays, totals and meal cancellations, raw salad popularity and reason groups; do not claim payroll CSV or employee/project breakdown from old landing copy.

### Meal, salad, menu cycles/weeks

Meal Library supports multilingual category-filtered library, active/inactive search, create/edit/archive/restore/hard-delete controls and local dirty snapshot. Hard-delete reference protection is intended but its current API check is incompatible with exported SQL: `lunchapp-api/src/functions/meals.js:316-317` queries Orders.MealID/GuestOrders.MealID while `lunchappDEV/docs/05-sql/02-tables-columns-2.csv:47,176` exposes OrderedMealID. The hard-delete branch can error before intended reference conflict handling; normal soft-deactivate is separate. Salad Admin persists multilingual names, active state and sort order, creates/updates/deactivates independently of meals. Menu Builder lists active meals, existing cycles and every cycle week, supports drag/drop/add/remove/reorder/copy previous week, creates Draft cycles, publishes and archives via API; archived state disables editing in normal rendering. Weekly saves are sequential, so no all-weeks atomicity claim. A newer applicable Published cycle supersedes older rotation on StartDate according to backend selection; future Published cycle is not immediate takeover.

### Employee maintenance and manual late adjustments

Employee Admin fetches active/inactive directory, searches/filter status, creates/edits, disables/restores, optional hard-deletes with confirmation and imports CSV through per-employee POST/PUT. Duplicate errors and fields are surfaced in dialog. Add Lunch posts manual-lunch-adjustments with employeeNo/date/quantity/reason=null; UI does not supply creator. Manual adjustments are distinct audit/charge additions, not a rewrite of employee source orders or an implicit daily kitchen production order. FINA report includes them; source backend decides production inclusion.

### External accounts/cards/finance

Accounts manage Prepaid/Postpaid/Invoice, credit limit, references/contact/validity/notes/active state; search/mode/inactive filters; optional new linked card; deposit or payment modal; ledger up to limit=300. A backend adjustment route exists but this browser UI does not expose it. Initial card creation is separate from account creation and can fail after the account exists. Cards page manages **external/temporary cards only**, cardholderName and linked account, validity timestamps and active state; financial tiles display balance/available or outstanding. Employee cards remain in Employee Admin, not duplicated in KioskCards. No frontend route token or role check is supplied for financial writes.

### Products, layout, image library

Current Product Library uses API `price` in euros and `active`, not old examples' priceCents/isActive product payload. Multilingual names (English required; Swedish initial focus), managed imageAssetId and legacyImageUrl coexist. Browser cropper accepts JPEG/PNG/WebP/GIF sources <=10 MB and produces 800x800 JPEG at quality .9, uploaded as multipart file/displayName/createdBy; backend output upload limit is 5 MB. Upload occurs on Use image, before product save. Cancelling product edit leaves the shared asset intentionally available. Remove image unassigns, not deletes asset.

Image Library lists usage and metadata, search/unused filter/preview, and permanent unused-asset deletion. API checks current references and deletes Blob plus SQL metadata; this is hard-delete, not an evidenced soft-delete/versioned asset lifecycle. Only KioskProducts currently reference images; generic future meal/salad integration was deliberately not implemented (06 daily documentation). Private Blob content is served via public pilot API, not direct anonymous blob URLs or SAS/browser-direct uploads. Layout Builder has two columns, product uniqueness, drag/movement/add/remove and local dirty tracking; saves replacement items with column/row/isVisible. Café runtime merges latest products into saved layout items to refresh image data; legacy image fallback remains.

### Reports and exports

Lunch reports use standalone `/api/lunch-reports`, date presets/custom range and EN/SV/FI; UI builds employee CSV (number/name/lunch count) and external CSV (account/company/external reference/invoice reference/lunch count) locally with BOM, semicolon and CRLF. Employee quantity definition: effective personal meals + effective personal salads + manual adjustments; guests are separate, not payroll, unless business rule changes. External lunch CSV counts are not a currency-invoice service by themselves. Café reports have overview, transactions with pageSize 50, owner/status filters, payroll and external invoicing tabs. CSV download navigates to API export with type payroll/external-summary/external-details. Report dates use Finnish local calendar conversion on server, different from lunch MenuDate. Business acceptance by FINA/payroll is pending. LocalStorage Bulla report and Order Explorer must not be included as authoritative financial report sources.

## Frontend deployment evidence and operational sequence

`lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`: push to main deploys, PR opened/synchronize/reopened creates/updates preview and closed closes preview. Uses checkout@v3 (submodules true; lfs false), Azure/static-web-apps-deploy@v1, secret references only, app_location `/`, api_location empty, output_location empty. No test/lint/build commands or custom-domain routing config supplied. This deploys frontend repository, not `lunchapp-api`; API historical deployment is separate/manual Functions publish (`lunchapp-api/docs/README-AZURE.md`), not this workflow.

Known frontend base URL is `https://black-bay-0c822f703.3.azurestaticapps.net`; API fetches generally hard-code the DEV standalone Function hostname. No evidenced prod configuration injection or environment-specific frontend host switch. PR preview origins need actual Function CORS verification; allowed main origin in old docs does not prove previews work. Root deployment can retain historic/test pages unless separately excluded. Actual CI run/status/commit/output artifacts and deployed hash comparison were not supplied.

Deployment recommendations already documented: preserve complete coordinated file sets; deploy API compatibility before shared user/kiosk changes; rescan after session schema changes; avoid restoring `/kiosk/` POC generation; preserve private Blob container; deploy employee HTML and admin lunch.css together; verify browser/CDN caching and console errors; treat `/admin/kioskproducts/` mentions as unresolved layout discrepancy, not authority to relocate files. Historical `lunchappDEV/README-DEPLOYMENT 2026-10-05.md` references package-only api/frontend/sql directories and optional owner constraint script not present under those paths in this source snapshot. No deploy was performed here.

### Appendix A — every HTML page/entry (37)

#### `lunchappDEV/admin/bulla-products.html`
- **Area/purpose:** Legacy local browser product editor
- **Intended user group:** Legacy café demo administrators
- **Current/historical status:** legacy localStorage POC; removed from current landing navigation
- **Deployment path:** /admin/bulla-products.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/bulla-products.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** localStorage bulla-poc-products-v1; no API/role checks
- **Navigation/iframe targets:** `admin/index.html`, `bulla/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-old (2).html`, `admin/index-old.html`
- **Missing local references:** None

#### `lunchappDEV/admin/bulla-report.html`
- **Area/purpose:** Legacy local café purchase report + CSV
- **Intended user group:** Legacy demo finance/admin
- **Current/historical status:** legacy localStorage POC; removed from current landing navigation
- **Deployment path:** /admin/bulla-report.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/bulla-report.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** localStorage bulla-poc-order-log-v1; no API/role checks
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-old (2).html`, `admin/index-old.html`
- **Missing local references:** None

#### `lunchappDEV/admin/employee-admin.html`
- **Area/purpose:** Employees CRUD, CSV import, manual Add Lunch
- **Intended user group:** People admins/kitchen
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/employee-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/employee-admin.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** `GET /api/employees`; `PUT /api/employees/{employeeNo}`; `POST /api/employees`; `DELETE /api/employees/{employeeNo}`; `POST /api/manual-lunch-adjustments`
- **Session/auth assumptions:** No guard; anonymous APIs; Employee Active is record data, not login role
- **Navigation/iframe targets:** `admin/index.html`, `kiosk/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** `kiosk/index.html`

#### `lunchappDEV/admin/external-lunch-prices.html`
- **Area/purpose:** Effective-dated lunch price history/create
- **Intended user group:** Finance admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/external-lunch-prices.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/external-lunch-prices.js`
- **CSS dependencies:** `admin/external-lunch-prices.css`
- **API calls:** `GET /api/external-lunch-prices`; `POST /api/external-lunch-prices`
- **Session/auth assumptions:** No guard; anonymous API; English-only page
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/index - read only friday.html`
- **Area/purpose:** Historic service navigation variant
- **Intended user group:** Historical admin users
- **Current/historical status:** historical landing snapshot; no inbound current reference
- **Deployment path:** /admin/index - read only friday.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; current CSS/i18n reused; filename does not implement read-only ordering
- **Navigation/iframe targets:** `user/index.html`, `admin/meal-library.html`, `admin/statistics.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/employee-admin.html`, `admin/order-explorer.html`, `admin/bulla-products.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/bulla-report.html`, `admin/kioskadmin/external-accounts.html`, `admin/kioskadmin/kiosk-cards-admin.html`, `admin/kioskadmin/kiosk-products-admin.html`, `admin/kioskadmin/kiosk-layout-builder.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/statistics.html`

#### `lunchappDEV/admin/index-2026-10-05.html`
- **Area/purpose:** Historic service navigation variant
- **Intended user group:** Historical admin users
- **Current/historical status:** historical landing snapshot; no inbound current reference
- **Deployment path:** /admin/index-2026-10-05.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/admin-landing.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; current CSS/i18n reused; filename does not implement read-only ordering
- **Navigation/iframe targets:** `user/index.html`, `admin/kitchen-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/order-explorer.html`, `admin/statistics.html`, `admin/meal-library.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/employee-admin.html`, `bulla/index.html`, `admin/kioskadmin/kiosk-products-admin.html`, `admin/kioskadmin/kiosk-layout-builder.html`, `admin/kioskadmin/external-accounts.html`, `admin/kioskadmin/kiosk-cards-admin.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/statistics.html`

#### `lunchappDEV/admin/index-2026-10-06.html`
- **Area/purpose:** Historic service navigation variant
- **Intended user group:** Historical admin users
- **Current/historical status:** historical landing snapshot; no inbound current reference
- **Deployment path:** /admin/index-2026-10-06.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/admin-landing.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; current CSS/i18n reused; filename does not implement read-only ordering
- **Navigation/iframe targets:** `user/index.html`, `admin/kitchen-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/lunch-reports.html`, `admin/order-explorer.html`, `admin/statistics.html`, `admin/meal-library.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/employee-admin.html`, `admin/kioskadmin/external-accounts.html`, `admin/kioskadmin/kiosk-cards-admin.html`, `bulla/index.html`, `admin/kioskadmin/kiosk-products-admin.html`, `admin/kioskadmin/kiosk-layout-builder.html`, `admin/external-lunch-prices.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/statistics.html`

#### `lunchappDEV/admin/index-old (2).html`
- **Area/purpose:** Historic service navigation variant
- **Intended user group:** Historical admin users
- **Current/historical status:** historical landing snapshot; no inbound current reference
- **Deployment path:** /admin/index-old (2).html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; current CSS/i18n reused; filename does not implement read-only ordering
- **Navigation/iframe targets:** `user/index.html`, `admin/meal-library.html`, `admin/statistics.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/employee-admin.html`, `admin/order-explorer.html`, `admin/bulla-products.html`, `admin/bulla-report.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/statistics.html`

#### `lunchappDEV/admin/index-old.html`
- **Area/purpose:** Historic service navigation variant
- **Intended user group:** Historical admin users
- **Current/historical status:** historical landing snapshot; no inbound current reference
- **Deployment path:** /admin/index-old.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; current CSS/i18n reused; filename does not implement read-only ordering
- **Navigation/iframe targets:** `user/index.html`, `admin/meal-library.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/employee-admin.html`, `admin/order-explorer.html`, `admin/bulla-products.html`, `admin/bulla-report.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/admin/index.html`
- **Area/purpose:** Service administration landing/navigation
- **Intended user group:** Kitchen/admin/finance
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/admin-landing.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No authentication/session guard; AdminI18n preference only
- **Navigation/iframe targets:** `user/index.html`, `admin/kitchen-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/kitchen-summary.html`, `admin/weekly-summary.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/lunch-reports.html`, `admin/order-explorer.html`, `admin/statistics.html`, `admin/meal-library.html`, `admin/menu-admin.html`, `admin/salad-admin.html`, `admin/employee-admin.html`, `admin/kioskadmin/external-accounts.html`, `admin/kioskadmin/kiosk-cards-admin.html`, `bulla/index.html`, `admin/kioskadmin/kiosk-products-admin.html`, `admin/kioskadmin/image-library.html`, `admin/kioskadmin/kiosk-layout-builder.html`, `admin/external-lunch-prices.html`
- **Inbound HTML references:** `admin/bulla-products.html`, `admin/bulla-report.html`, `admin/employee-admin.html`, `admin/external-lunch-prices.html`, `admin/kioskadmin/external-accounts.html`, `admin/kioskadmin/image-library.html`, `admin/kioskadmin/kiosk-cards-admin.html`, `admin/kioskadmin/kiosk-layout-builder.html`, `admin/kioskadmin/kiosk-products-admin.html`, `admin/kioskadmin/kiosk-reports.html`, `admin/kitchen-summary.html`, `admin/lunch-reports.html`, `admin/meal-library.html`, `admin/menu-admin.html`, `admin/order-explorer.html`, `admin/salad-admin.html`, `admin/weekly-summary.html`, `index.html`
- **Missing local references:** `admin/statistics.html`

#### `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.html`
- **Area/purpose:** Historical duplicate Account CRUD/initial card/deposit/payment/ledger
- **Intended user group:** People/finance admins
- **Current/historical status:** historical backup/demo; not referenced by current navigation
- **Deployment path:** /admin/kioskadmin/bak drunk copilot/external-accounts.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/bak drunk copilot/external-accounts.js`
- **CSS dependencies:** `admin/kioskadmin/bak drunk copilot/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/external-accounts`; `GET /api/kiosk/external-accounts/{id}/ledger`; `DELETE /api/kiosk/external-accounts/{id}`; `POST /api/kiosk/external-accounts`; `PUT /api/kiosk/external-accounts/{id}`; `POST /api/kiosk/cards`; `POST /api/kiosk/external-accounts/{id}/deposit`; `POST /api/kiosk/external-accounts/{id}/payment`
- **Session/auth assumptions:** No guard; still calls real anonymous APIs; back ../index.html resolves to absent kioskadmin/index.html
- **Navigation/iframe targets:** `admin/kioskadmin/index.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/kioskadmin/index.html`

#### `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html`
- **Area/purpose:** Historical duplicate External/temp card CRUD and finance tiles
- **Intended user group:** People/access admins
- **Current/historical status:** historical backup/demo; not referenced by current navigation
- **Deployment path:** /admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js`
- **CSS dependencies:** `admin/kioskadmin/bak drunk copilot/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/cards`; `GET /api/kiosk/external-accounts`; `DELETE /api/kiosk/cards/{id}`; `POST /api/kiosk/cards`; `PUT /api/kiosk/cards/{id}`
- **Session/auth assumptions:** No guard; still calls real anonymous APIs; back ../index.html resolves to absent kioskadmin/index.html
- **Navigation/iframe targets:** `admin/kioskadmin/index.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** `admin/kioskadmin/index.html`

#### `lunchappDEV/admin/kioskadmin/external-accounts.html`
- **Area/purpose:** Account CRUD/initial card/deposit/payment/ledger
- **Intended user group:** People/finance admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/external-accounts.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/external-accounts.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/kioskadmin/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/external-accounts`; `GET /api/kiosk/external-accounts/{id}/ledger`; `DELETE /api/kiosk/external-accounts/{id}`; `POST /api/kiosk/external-accounts`; `PUT /api/kiosk/external-accounts/{id}`; `POST /api/kiosk/cards`; `POST /api/kiosk/external-accounts/{id}/deposit`; `POST /api/kiosk/external-accounts/{id}/payment`
- **Session/auth assumptions:** No guard; anonymous financial APIs; shared language preference
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kioskadmin/image-library.html`
- **Area/purpose:** Shared product image usage/preview/unused delete
- **Intended user group:** Café product admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/image-library.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/image-library.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/kioskadmin/cafe-kiosk-admin.css`
- **API calls:** `GET /api/images`; `DELETE /api/images/{imageAssetId}`; `GET /api/images/{imageAssetId}/content`
- **Session/auth assumptions:** No guard; delete disabled by cached usage; backend rechecks
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.html`
- **Area/purpose:** External/temp card CRUD and finance tiles
- **Intended user group:** People/access admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/kiosk-cards-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/kiosk-cards-admin.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/kioskadmin/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/cards`; `GET /api/kiosk/external-accounts`; `DELETE /api/kiosk/cards/{id}`; `POST /api/kiosk/cards`; `PUT /api/kiosk/cards/{id}`
- **Session/auth assumptions:** No guard; externalAccountId relation/validity; no employee owner option
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.html`
- **Area/purpose:** Two-column saved layout editor
- **Intended user group:** Café admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/kiosk-layout-builder.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/kiosk-layout-builder.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/kioskadmin/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/layouts`; `GET /api/kiosk/products`; `GET /api/kiosk/layouts/{layoutId}`; `PUT /api/kiosk/layouts/{layoutId}`; `GET /api/images/{imageAssetId}/content`
- **Session/auth assumptions:** No guard; local unsaved columns/dirty state; API transactional item replacement
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kioskadmin/kiosk-products-admin.html`
- **Area/purpose:** API-backed product CRUD and image crop/picker
- **Intended user group:** Café product admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/kiosk-products-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/kiosk-products-admin.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/kioskadmin/cafe-kiosk-admin.css`
- **API calls:** `GET /api/kiosk/products`; `POST /api/kiosk/products`; `PUT /api/kiosk/products/{id}`; `DELETE /api/kiosk/products/{id}`; `GET /api/images`; `POST /api/images/upload`; `GET /api/images/{imageAssetId}/content`
- **Session/auth assumptions:** No guard; local editor/crop state; multipart upload then product save independent
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kioskadmin/kiosk-reports.html`
- **Area/purpose:** Café overview/transactions/payroll/external invoicing and API CSV
- **Intended user group:** Café admins/FINA/payroll
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kioskadmin/kiosk-reports.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/kioskadmin/kiosk-reports-ui.js`
- **CSS dependencies:** `admin/kioskadmin/kiosk-reports.css`
- **API calls:** `GET /api/kiosk/reports/overview`; `GET /api/kiosk/reports/transactions`; `GET /api/kiosk/reports/payroll`; `GET /api/kiosk/reports/external-invoicing`; `GET /api/kiosk/reports/export`
- **Session/auth assumptions:** No guard; lunchapp-admin-language-v1 preference; anonymous report/export APIs
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/kitchen-summary.html`
- **Area/purpose:** Daily production detail + meal/salad cancellation/print
- **Intended user group:** Kitchen operators
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/kitchen-summary.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/kitchen.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** `GET /api/kitchen/orders`; `POST /api/kitchen/order-cancellations`; `POST /api/kitchen/salad-order-cancellations`
- **Session/auth assumptions:** No guard; cancelledBy is user-entered audit label, not verified actor
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/lunch-reports.html`
- **Area/purpose:** Lunch count payroll/external report + local CSV
- **Intended user group:** Payroll/FINA
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/lunch-reports.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/lunch-reports-ui.js`
- **CSS dependencies:** `admin/lunch-reports.css`
- **API calls:** `GET /api/lunch-reports`
- **Session/auth assumptions:** No guard; separate lunch-report-language preference
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index-2026-10-06.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/meal-library.html`
- **Area/purpose:** Multilingual reusable meal catalogue
- **Intended user group:** Kitchen/menu admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/meal-library.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/meal-library.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** `GET /api/meals`; `POST /api/meals`; `PUT /api/meals/{mealId}`; `DELETE /api/meals/{mealId}`
- **Session/auth assumptions:** No guard; API-backed data with local dirty snapshot
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`, `admin/menu-admin.html`
- **Missing local references:** None

#### `lunchappDEV/admin/menu-admin.html`
- **Area/purpose:** Cycle/week menu builder and Draft/Publish/Archive
- **Intended user group:** Kitchen/menu admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/menu-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/menu-admin.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** `GET /api/meals`; `GET /api/menu/cycles`; `GET /api/menu/cycles/{selectedCycleId}/weeks/{index+1}`; `PUT /api/menu/cycles/{selectedCycleId}/weeks/{index+1}`; `PUT /api/menu/cycles/{selectedCycleId}`; `POST /api/menu/cycles`
- **Session/auth assumptions:** No guard; archive editability UX plus API policy
- **Navigation/iframe targets:** `admin/index.html`, `admin/meal-library.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/order-explorer.html`
- **Area/purpose:** Legacy browser/demo employee/meal order explorer + print
- **Intended user group:** Demo/admin users
- **Current/historical status:** currently referenced legacy POC; not SQL report
- **Deployment path:** /admin/order-explorer.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/order-data.js`, `admin/order-explorer.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** No guard; AdminOrderData localStorage and synthetic demo rows, not SQL
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/salad-admin.html`
- **Area/purpose:** Independent salad catalogue CRUD/deactivate
- **Intended user group:** Kitchen/menu admins
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/salad-admin.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/salad-admin.js`
- **CSS dependencies:** `admin/lunch.css`
- **API calls:** `GET /api/salads`; `DELETE /api/salads/{saladId}`; `POST /api/salads`; `PUT /api/salads/{saladId}`
- **Session/auth assumptions:** No guard; anonymous API; trilingual catalogue validation
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/admin/weekly-summary.html`
- **Area/purpose:** Weekly portions/chart/salad popularity/meal cancellation reasons + print
- **Intended user group:** Kitchen operators
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /admin/weekly-summary.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `admin/admin-i18n.js`, `admin/weekly-summary.js`
- **CSS dependencies:** `admin/lunch.css`, `admin/weekly-summary.css`
- **API calls:** `GET /api/kitchen/weekly-summary`
- **Session/auth assumptions:** No guard; anonymous API; raw salad quantity report
- **Navigation/iframe targets:** `admin/index.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`
- **Missing local references:** None

#### `lunchappDEV/bulla/drunk copilot/index.html`
- **Area/purpose:** Historic local/demo card scan
- **Intended user group:** Demo employee users
- **Current/historical status:** historical backup/demo; not referenced by current navigation
- **Deployment path:** /bulla/drunk copilot/index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `bulla/drunk copilot/card-login.js`
- **CSS dependencies:** `bulla/drunk copilot/bulla.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** Old bulla-poc-card-session-v1 and local employee list; not SQL card login
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/bulla/drunk copilot/order.html`
- **Area/purpose:** Historic local/demo basket/purchase log
- **Intended user group:** Demo employee users
- **Current/historical status:** historical backup/demo; not referenced by current navigation
- **Deployment path:** /bulla/drunk copilot/order.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `bulla/drunk copilot/order.js`
- **CSS dependencies:** `bulla/drunk copilot/bulla.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** Old browser products/order log/session; 60-second timer; no API calls
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/bulla/index.html`
- **Area/purpose:** Current café card scanning/login
- **Intended user group:** Employees and external cardholders
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /bulla/index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `bulla/card-login.js`
- **CSS dependencies:** `bulla/bulla.css`
- **API calls:** `POST /api/kiosk/card-login`
- **Session/auth assumptions:** Clears cafe-kiosk-card-session-v1 then API card lookup
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** `admin/bulla-products.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index.html`, `index.html`
- **Missing local references:** None

#### `lunchappDEV/bulla/order.html`
- **Area/purpose:** Current café saved layout/basket/purchase
- **Intended user group:** Employees and external cardholders
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /bulla/order.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `bulla/order.js`
- **CSS dependencies:** `bulla/bulla.css`
- **API calls:** `GET /api/kiosk/layouts/default`; `GET /api/kiosk/products`; `POST /api/kiosk/sales`; `GET /api/images/{imageAssetId}/content`
- **Session/auth assumptions:** Requires sessionStorage café session/card number; 60-second activity timer; API authoritativeness required
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/index.html`
- **Area/purpose:** DEV entry portal
- **Intended user group:** All pilot users
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** None external; root/test/guest have inline script as noted
- **CSS dependencies:** Inline/self-contained styles
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** Inline navigation only; no identity check
- **Navigation/iframe targets:** `user/index.html`, `lunchkiosk/index.html`, `bulla/index.html`, `admin/index.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/lunchkiosk/index.html`
- **Area/purpose:** Current Lunch Kiosk card scanning/login
- **Intended user group:** Employees and external cardholders
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /lunchkiosk/index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `lunchkiosk/card-login.js`
- **CSS dependencies:** `lunchkiosk/lunchkiosk.css`
- **API calls:** `POST /api/kiosk/card-login`
- **Session/auth assumptions:** Clears shared user localStorage and kiosk sessionStorage; API card lookup; exact external cardId required
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** `index.html`
- **Missing local references:** None

#### `lunchappDEV/lunchkiosk/order.html`
- **Area/purpose:** Lunch Kiosk same-origin user iframe shell
- **Intended user group:** Employees and external cardholders
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /lunchkiosk/order.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `lunchkiosk/kiosk-shell.js`
- **CSS dependencies:** `lunchkiosk/lunchkiosk.css`
- **API calls:** None (browser-local/navigation only)
- **Session/auth assumptions:** Requires lunch-kiosk-session-v1 and user key; 60-second timer; success message origin/source check
- **Navigation/iframe targets:** `user/index.html`
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/test-employees.html`
- **Area/purpose:** Employee API diagnostic JSON renderer
- **Intended user group:** Developers
- **Current/historical status:** diagnostic/test entry; not current portal navigation
- **Deployment path:** /test-employees.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** None external; root/test/guest have inline script as noted
- **CSS dependencies:** Inline/self-contained styles
- **API calls:** `GET /api/employees`
- **Session/auth assumptions:** No guard; fetches employee directory; avoid operational use
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/user/guest-order.html`
- **Area/purpose:** Host employee guest meals + salads/project
- **Intended user group:** Employees hosting visitors
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /user/guest-order.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `user/lunch.js`
- **CSS dependencies:** `user/lunch.css`
- **API calls:** `GET /api/salads`; `GET /api/menu/current`; `GET /api/orders`; `PUT /api/orders`; `GET /api/salad-orders`; `PUT /api/salad-orders`; `GET /api/guest-orders`; `PUT /api/guest-orders`; `GET /api/guest-salad-orders`; `PUT /api/guest-salad-orders`
- **Session/auth assumptions:** Shared employee local user; redirects external owners; hostEmployeeNo+required workTask
- **Navigation/iframe targets:** `user/index.html`
- **Inbound HTML references:** `user/index.html`
- **Missing local references:** None

#### `lunchappDEV/user/index.html`
- **Area/purpose:** Personal meal + independent salad order
- **Intended user group:** Employees; external via kiosk session
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /user/index.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `user/lunch.js`
- **CSS dependencies:** `user/lunch.css`
- **API calls:** `GET /api/salads`; `GET /api/menu/current`; `GET /api/orders`; `PUT /api/orders`; `GET /api/salad-orders`; `PUT /api/salad-orders`; `GET /api/guest-orders`; `PUT /api/guest-orders`; `GET /api/guest-salad-orders`; `PUT /api/guest-salad-orders`
- **Session/auth assumptions:** lunch-poc-current-user-v17; employee number OR external account+cardId; redirects invalid owner
- **Navigation/iframe targets:** `user/index.html`, `user/guest-order.html`, `user/my-orders.html`
- **Inbound HTML references:** `admin/index - read only friday.html`, `admin/index-2026-10-05.html`, `admin/index-2026-10-06.html`, `admin/index-old (2).html`, `admin/index-old.html`, `admin/index.html`, `index.html`, `lunchkiosk/order.html`, `user/guest-order.html`, `user/index.html`, `user/my-orders.html`
- **Missing local references:** None

#### `lunchappDEV/user/login.html`
- **Area/purpose:** Employee-number lookup/login
- **Intended user group:** Employees on personal devices
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /user/login.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `user/login.js`
- **CSS dependencies:** `user/lunch.css`
- **API calls:** `GET /api/employees`
- **Session/auth assumptions:** Loads complete inactive-inclusive directory, active check in browser, writes localStorage; not authenticated token
- **Navigation/iframe targets:** None in static markup; JS redirect paths covered in session/runtime discussion
- **Inbound HTML references:** None in supplied HTML; directory/index or runtime JS entry may still apply
- **Missing local references:** None

#### `lunchappDEV/user/my-orders.html`
- **Area/purpose:** Week/month personal and guest meal/salad overview
- **Intended user group:** Employees; intended external cardholders
- **Current/historical status:** current referenced source; live deployment unverified
- **Deployment path:** /user/my-orders.html (index may also be directory entry; actual deployed contents unverified)
- **JS dependencies:** `user/my-orders.js`
- **CSS dependencies:** `user/lunch.css`
- **API calls:** `GET /api/orders`; `GET /api/salad-orders`; `GET /api/guest-orders`; `GET /api/guest-salad-orders`
- **Session/auth assumptions:** Shared user localStorage; external guard only accountId and queries lack cardId (contract defect)
- **Navigation/iframe targets:** `user/index.html`
- **Inbound HTML references:** `user/index.html`
- **Missing local references:** None

### Appendix B — every JavaScript asset (34)

| Exact source | Purpose/status | Referencing HTML | Browser API source accounting |
|---|---|---|---|
| `lunchappDEV/admin/admin-i18n.js` | current referenced source; live deployment unverified Shared EN source/SV/FI dictionaries; DOM observer and language event; no API. | admin/bulla-products.html, admin/bulla-report.html, admin/employee-admin.html, admin/index - read only friday.html, admin/index-2026-10-05.html, admin/index-2026-10-06.html, admin/index-old (2).html, admin/index-old.html, admin/index.html, admin/kitchen-summary.html, admin/meal-library.html, admin/menu-admin.html, admin/order-explorer.html, admin/salad-admin.html, admin/weekly-summary.html | No browser API requests |
| `lunchappDEV/admin/bulla-products.js` | legacy localStorage POC; removed from current landing navigation | admin/bulla-products.html | No browser API requests |
| `lunchappDEV/admin/bulla-report.js` | legacy localStorage POC; removed from current landing navigation | admin/bulla-report.html | No browser API requests |
| `lunchappDEV/admin/employee-admin.js` | current referenced source; live deployment unverified | admin/employee-admin.html | GET /api/employees; PUT /api/employees/{employeeNo}; POST /api/employees; DELETE /api/employees/{employeeNo}; POST /api/manual-lunch-adjustments |
| `lunchappDEV/admin/external-lunch-prices.js` | current referenced source; live deployment unverified | admin/external-lunch-prices.html | GET /api/external-lunch-prices; POST /api/external-lunch-prices |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js` | historical backup/demo; not referenced by current navigation | admin/kioskadmin/bak drunk copilot/external-accounts.html | GET /api/kiosk/external-accounts; GET /api/kiosk/external-accounts/{id}/ledger; DELETE /api/kiosk/external-accounts/{id}; POST /api/kiosk/external-accounts; PUT /api/kiosk/external-accounts/{id}; POST /api/kiosk/cards; POST /api/kiosk/external-accounts/{id}/deposit; POST /api/kiosk/external-accounts/{id}/payment |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js` | historical backup/demo; not referenced by current navigation | admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html | GET /api/kiosk/cards; GET /api/kiosk/external-accounts; DELETE /api/kiosk/cards/{id}; POST /api/kiosk/cards; PUT /api/kiosk/cards/{id} |
| `lunchappDEV/admin/kioskadmin/external-accounts.js` | current referenced source; live deployment unverified | admin/kioskadmin/external-accounts.html | GET /api/kiosk/external-accounts; GET /api/kiosk/external-accounts/{id}/ledger; DELETE /api/kiosk/external-accounts/{id}; POST /api/kiosk/external-accounts; PUT /api/kiosk/external-accounts/{id}; POST /api/kiosk/cards; POST /api/kiosk/external-accounts/{id}/deposit; POST /api/kiosk/external-accounts/{id}/payment |
| `lunchappDEV/admin/kioskadmin/image-library.js` | current referenced source; live deployment unverified | admin/kioskadmin/image-library.html | GET /api/images; DELETE /api/images/{imageAssetId}; GET /api/images/{imageAssetId}/content |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js` | current referenced source; live deployment unverified | admin/kioskadmin/kiosk-cards-admin.html | GET /api/kiosk/cards; GET /api/kiosk/external-accounts; DELETE /api/kiosk/cards/{id}; POST /api/kiosk/cards; PUT /api/kiosk/cards/{id} |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js` | current referenced source; live deployment unverified | admin/kioskadmin/kiosk-layout-builder.html | GET /api/kiosk/layouts; GET /api/kiosk/products; GET /api/kiosk/layouts/{layoutId}; PUT /api/kiosk/layouts/{layoutId}; GET /api/images/{imageAssetId}/content |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js` | current referenced source; live deployment unverified | admin/kioskadmin/kiosk-products-admin.html | GET /api/kiosk/products; POST /api/kiosk/products; PUT /api/kiosk/products/{id}; DELETE /api/kiosk/products/{id}; GET /api/images; POST /api/images/upload; GET /api/images/{imageAssetId}/content |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js` | current referenced source; live deployment unverified | admin/kioskadmin/kiosk-reports.html | GET /api/kiosk/reports/overview; GET /api/kiosk/reports/transactions; GET /api/kiosk/reports/payroll; GET /api/kiosk/reports/external-invoicing; GET /api/kiosk/reports/export |
| `lunchappDEV/admin/kitchen-old-delete-later.js` | historical superseded script; kitchen-summary.html loads kitchen.js | No HTML reference | GET /api/kitchen/orders; POST /api/kitchen/order-cancellations |
| `lunchappDEV/admin/kitchen.js` | current referenced source; live deployment unverified | admin/kitchen-summary.html | GET /api/kitchen/orders; POST /api/kitchen/order-cancellations; POST /api/kitchen/salad-order-cancellations |
| `lunchappDEV/admin/lunch-reports-ui.js` | current referenced source; live deployment unverified | admin/lunch-reports.html | GET /api/lunch-reports |
| `lunchappDEV/admin/meal-library.js` | current referenced source; live deployment unverified | admin/meal-library.html | GET /api/meals; POST /api/meals; PUT /api/meals/{mealId}; DELETE /api/meals/{mealId} |
| `lunchappDEV/admin/menu-admin.js` | current referenced source; live deployment unverified | admin/menu-admin.html | GET /api/meals; GET /api/menu/cycles; GET /api/menu/cycles/{selectedCycleId}/weeks/{index+1}; PUT /api/menu/cycles/{selectedCycleId}/weeks/{index+1}; PUT /api/menu/cycles/{selectedCycleId}; POST /api/menu/cycles |
| `lunchappDEV/admin/order-data.js` | currently referenced legacy POC; not SQL report Browser/local/demo data helper; loaded by current Order Explorer. | admin/order-explorer.html | No browser API requests |
| `lunchappDEV/admin/order-explorer.js` | currently referenced legacy POC; not SQL report Consumes AdminOrderData; local group/filter/print only. | admin/order-explorer.html | No browser API requests |
| `lunchappDEV/admin/salad-admin.js` | current referenced source; live deployment unverified | admin/salad-admin.html | GET /api/salads; DELETE /api/salads/{saladId}; POST /api/salads; PUT /api/salads/{saladId} |
| `lunchappDEV/admin/statistics.js` | orphaned asset; no HTML reference in supplied snapshot | No HTML reference | GET /api/kitchen/weekly-summary |
| `lunchappDEV/admin/weekly-summary.js` | current referenced source; live deployment unverified | admin/weekly-summary.html | GET /api/kitchen/weekly-summary |
| `lunchappDEV/bulla/card-login.js` | current referenced source; live deployment unverified | bulla/index.html | POST /api/kiosk/card-login |
| `lunchappDEV/bulla/drunk copilot/card-login.js` | historical backup/demo; not referenced by current navigation | bulla/drunk copilot/index.html | No browser API requests |
| `lunchappDEV/bulla/drunk copilot/demo-users.js` | historical backup/demo; not referenced by current navigation Unreferenced demo card-button generator. | No HTML reference | No browser API requests |
| `lunchappDEV/bulla/drunk copilot/kiosk-card-login.js` | historical backup/demo; not referenced by current navigation Misfiled CommonJS Functions server implementation, not browser JS; no script tag. | No HTML reference | No browser API requests |
| `lunchappDEV/bulla/drunk copilot/order.js` | historical backup/demo; not referenced by current navigation | bulla/drunk copilot/order.html | No browser API requests |
| `lunchappDEV/bulla/order.js` | current referenced source; live deployment unverified | bulla/order.html | GET /api/kiosk/layouts/default; GET /api/kiosk/products; POST /api/kiosk/sales; GET /api/images/{imageAssetId}/content |
| `lunchappDEV/lunchkiosk/card-login.js` | current referenced source; live deployment unverified | lunchkiosk/index.html | POST /api/kiosk/card-login |
| `lunchappDEV/lunchkiosk/kiosk-shell.js` | current referenced source; live deployment unverified Iframe/timer/logout/postMessage logic; API calls delegated to framed /user/. | lunchkiosk/order.html | No browser API requests |
| `lunchappDEV/user/login.js` | current referenced source; live deployment unverified | user/login.html | GET /api/employees |
| `lunchappDEV/user/lunch.js` | current referenced source; live deployment unverified | user/guest-order.html, user/index.html | GET /api/salads; GET /api/menu/current; GET /api/orders; PUT /api/orders; GET /api/salad-orders; PUT /api/salad-orders; GET /api/guest-orders; PUT /api/guest-orders; GET /api/guest-salad-orders; PUT /api/guest-salad-orders |
| `lunchappDEV/user/my-orders.js` | current referenced source; live deployment unverified | user/my-orders.html | GET /api/orders; GET /api/salad-orders; GET /api/guest-orders; GET /api/guest-salad-orders |

### Appendix C — every stylesheet (15)

| Exact source | Responsibility/status | Referencing HTML |
|---|---|---|
| `lunchappDEV/admin/admin-landing.css` | Isolated landing redesign loaded after lunch.css. current referenced source; live deployment unverified | admin/index-2026-10-05.html, admin/index-2026-10-06.html, admin/index.html |
| `lunchappDEV/admin/external-lunch-prices.css` | Self-contained English price maintenance. current referenced source; live deployment unverified | admin/external-lunch-prices.html |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/cafe-kiosk-admin.css` | Historical duplicate older admin-grid presentation. historical backup/demo; not referenced by current navigation | admin/kioskadmin/bak drunk copilot/external-accounts.html, admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.html |
| `lunchappDEV/admin/kioskadmin/cafe-kiosk-admin.css` | Shared account/card/product/layout/image management CSS. Managed-image crop/picker/editor class selectors absent; green switches exist. current referenced source; live deployment unverified | admin/kioskadmin/external-accounts.html, admin/kioskadmin/image-library.html, admin/kioskadmin/kiosk-cards-admin.html, admin/kioskadmin/kiosk-layout-builder.html, admin/kioskadmin/kiosk-products-admin.html |
| `lunchappDEV/admin/kioskadmin/kiosk-reports.css` | Self-contained café reporting responsive styles. current referenced source; live deployment unverified | admin/kioskadmin/kiosk-reports.html |
| `lunchappDEV/admin/lunch-reports.css` | Self-contained lunch report layout. current referenced source; live deployment unverified | admin/lunch-reports.html |
| `lunchappDEV/admin/lunch.css` | Shared broad admin styles plus historical lunch/kitchen/Bulla rules and final scoped employee table/toggle rules. Not identical to user/lunch.css. current referenced source; live deployment unverified | admin/bulla-products.html, admin/bulla-report.html, admin/employee-admin.html, admin/index - read only friday.html, admin/index-2026-10-05.html, admin/index-2026-10-06.html, admin/index-old (2).html, admin/index-old.html, admin/index.html, admin/kioskadmin/external-accounts.html, admin/kioskadmin/image-library.html, admin/kioskadmin/kiosk-cards-admin.html, admin/kioskadmin/kiosk-layout-builder.html, admin/kioskadmin/kiosk-products-admin.html, admin/kitchen-summary.html, admin/meal-library.html, admin/menu-admin.html, admin/order-explorer.html, admin/salad-admin.html, admin/weekly-summary.html |
| `lunchappDEV/admin/statistics.css` | Orphaned earlier statistics chart/table style. orphaned asset; no HTML reference in supplied snapshot | No HTML reference |
| `lunchappDEV/admin/weekly-summary.css` | Referenced weekly chart/table style, similar to statistics base plus stacked meal/salad chart. current referenced source; live deployment unverified | admin/weekly-summary.html |
| `lunchappDEV/bulla/bulla.css` | Current café card scan and two-column runtime styles. current referenced source; live deployment unverified | bulla/index.html, bulla/order.html |
| `lunchappDEV/bulla/drunk copilot/bulla-demo-layout.css` | Unreferenced demo-card-button style; active README instructs removal. historical backup/demo; not referenced by current navigation | No HTML reference |
| `lunchappDEV/bulla/drunk copilot/bulla.css` | Historical POC café style; incompatible runtime generation. historical backup/demo; not referenced by current navigation | bulla/drunk copilot/index.html, bulla/drunk copilot/order.html |
| `lunchappDEV/lunchkiosk/lunchkiosk-old.css` | Unreferenced earlier login centering without current login-shell. orphaned asset; no HTML reference in supplied snapshot | No HTML reference |
| `lunchappDEV/lunchkiosk/lunchkiosk.css` | Current login-shell centering, shell bar and iframe sizing. current referenced source; live deployment unverified | lunchkiosk/index.html, lunchkiosk/order.html |
| `lunchappDEV/user/lunch.css` | Shared user order/login/history styles plus accumulated historical admin rules; adds ordering deadline/salad sections, not employee final admin rules. current referenced source; live deployment unverified | user/guest-order.html, user/index.html, user/login.html, user/my-orders.html |

CSS content inventory found no @import or url() dependency in any supplied stylesheet. Inline styles and dynamically generated charts/images remain part of their HTML/JS sources. All 15 have balanced braces in a simple offline check; this is not browser rendering or a CSS validation suite.

### Appendix D — responsibility of every JavaScript file

This expands the asset status/caller matrix above to describe an explicit purpose for every asset, including files with no API calls. User groups, dependencies, authentication and navigation are inherited from the exact referencing HTML entries in Appendix A; orphaned and server-misfile assets have no active browser entry. All dependencies are local scripts/styles; no external frontend libraries are referenced.

| Exact JavaScript path | Detailed responsibility |
|---|---|
| `lunchappDEV/admin/admin-i18n.js` | Translate admin DOM and inserted elements with EN/SV/FI vocabulary; persist admin language and dispatch language-change event. |
| `lunchappDEV/admin/bulla-products.js` | LocalStorage POC product editor: multilingual names, browser images, cents, sort/active state, dirty tracking and save. |
| `lunchappDEV/admin/bulla-report.js` | LocalStorage POC café order-log period/filter/group summary and local payroll-like CSV, not current café financial API. |
| `lunchappDEV/admin/employee-admin.js` | Employee directory CRUD/status/search, validation dialogs, CSV import and manual post-deadline lunch adjustment dialog. |
| `lunchappDEV/admin/external-lunch-prices.js` | Load effective price/history and POST next dated price; euro input to integer cents; no row edit/delete UI. |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js` | Historical duplicate account/financial admin generation; still has real API writes, not a screenshot. |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js` | Historical duplicate external card admin generation; real API writes, older presentation. |
| `lunchappDEV/admin/kioskadmin/external-accounts.js` | Account create/edit/deactivate, optional separately created initial card, balance/deposit/payment/300-row ledger UI. |
| `lunchappDEV/admin/kioskadmin/image-library.js` | API-backed image usage/filter/preview/metadata and permanent delete of unused images. |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js` | External/temp cards create/edit/deactivate/account linking/validity and balance/outstanding tiles. |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js` | Two-column product placement/drag/movement and replacement-item save with local dirty tracking. |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js` | Product CRUD, price/name/active/image assignment, shared image picker and 800px JPEG crop/upload workflow. |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js` | Overview/transactions/payroll/external invoice panels, date/filter/paging and three API CSV download types. |
| `lunchappDEV/admin/kitchen-old-delete-later.js` | Earlier daily meal summary/cancellation generation without current independent salad cancellation or exact card-last5 identity. |
| `lunchappDEV/admin/kitchen.js` | Daily meal/salad grouping, search, localized kitchen identity/cancellation dialog, refresh and print. |
| `lunchappDEV/admin/lunch-reports-ui.js` | Lunch payroll/external/guest KPI date filtering and local employee/external CSV export. |
| `lunchappDEV/admin/meal-library.js` | API-backed multilingual reusable catalogue CRUD, categories, archive/restore, hard-delete control and dirty snapshots. |
| `lunchappDEV/admin/menu-admin.js` | Cycle lifecycle/new draft plus week menu loading/editing/reordering/copying/sequential whole-cycle-week saves. |
| `lunchappDEV/admin/order-data.js` | Legacy local browser/menu/order/employee helper plus synthetic demo rows; exposes window.AdminOrderData. |
| `lunchappDEV/admin/order-explorer.js` | Group/filter/print legacy browser or demo orders by employee or meal using AdminOrderData. |
| `lunchappDEV/admin/salad-admin.js` | API-backed independent multilingual salad master records; sort, active state, create/update/deactivate. |
| `lunchappDEV/admin/statistics.js` | Orphaned weekly API summary chart/table/cancellation rendering, same-origin API host; required page absent. |
| `lunchappDEV/admin/weekly-summary.js` | Current standalone-API weekly meal/salad totals, daily chart, raw salad popularity and meal cancellation reasons. |
| `lunchappDEV/bulla/card-login.js` | SQL-backed café card normalization/login, tab session creation and navigation to current order page. |
| `lunchappDEV/bulla/drunk copilot/card-login.js` | POC local employee/card identity and old bulla-poc tab session; no SQL API. |
| `lunchappDEV/bulla/drunk copilot/demo-users.js` | Unreferenced local/demo employee card-button generation. |
| `lunchappDEV/bulla/drunk copilot/kiosk-card-login.js` | Misfiled backend CommonJS Azure Function registration/SQL card lookup, not browser-loadable frontend login. |
| `lunchappDEV/bulla/drunk copilot/order.js` | POC browser product basket and localStorage purchase log, old session and 60-second timeout, no real sale API. |
| `lunchappDEV/bulla/order.js` | Default-layout plus fresh-product merge, image fallback, café basket/funds UX, UUID sale submission and 60-second logout. |
| `lunchappDEV/lunchkiosk/card-login.js` | Shared card lookup, employee/external exact-card session projection, shared user identity and shell entry. |
| `lunchappDEV/lunchkiosk/kiosk-shell.js` | Same-origin iframe activity wiring, 60-second inactivity, logout cleanup and source/origin-checked successful-save message. |
| `lunchappDEV/user/login.js` | Fetch complete directory and choose active employee by employee number; browser-local identity, no token. |
| `lunchappDEV/user/lunch.js` | Personal/guest/external meal/salad ordering, API menu resolution, date range/deadline UX, dual saves and kiosk success signaling. |
| `lunchappDEV/user/my-orders.js` | Week/month personal and employee guest meal/salad history/totals; external query lacks mandatory cardId. |


## Frontend-wide classification and deployment notes

All 37 pages and all 34 JS/15 CSS files are inventoried above. Status is dependency/source status, not live deployment proof; age alone is never obsolescence. Historical duplicate generation, orphaned assets and current linked POCs need separate treatment. The complete exact-file classification ledger is in 15 and chronology in 16. All 104 expanded API calls, including historical/implicit image/export routes, are reconciled individually in 06.

No page supplies an enforced administrator/kitchen/finance role. Session keys are client state. Root SWA deploy and unknown exclusions may leave direct paths reachable; actual deployed output/policy was not inspected. All missing local references and styling/contract conflicts are centralized in 14. Source-backed UI behavior is distinct from the 08 handover's intended compact styling.

