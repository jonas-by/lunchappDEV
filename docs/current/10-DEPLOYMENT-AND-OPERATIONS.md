# Deployment and operations

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Authority and safe interpretation

Current frontend/API code, numbered SQL extraction and completed Azure exports outrank restart and handover prose. Next: `lunchappDEV/docs/START-HERE-2026-10-19.md`, 08 handover/changelog, 07, 06, 05 and older material. The 19 October title is a project-record date, future relative to this snapshot, not proof of elapsed work or deployment. A conflict between code and SQL remains a conflict. Blank Azure template/export fields mean **Unknown**, not disabled.

### Source deployment configuration and safe release checklist

Frontend evidence: `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`. GitHub Actions ubuntu-latest, checkout@v3 with submodules true/LFS false; Azure/static-web-apps-deploy@v1 action upload; main pushes and opened/synchronize/reopened main PRs deploy; closed PR action closes environment. app_location `/`, api_location empty, output_location empty. Secret **names only**: AZURE_STATIC_WEB_APPS_API_TOKEN_BLACK_BAY_0C822F703 and GITHUB_TOKEN. No staticwebapp.config.json, root package.json/build pipeline or API workflow was found in provided source. Therefore no supplied SWA route/role/header policy can be claimed.

API evidence: `lunchapp-api/package.json`, `lunchapp-api/host.json`, `lunchapp-api/.funcignore`, `lunchapp-api/.gitignore`, `docs/README-AZURE.md`. Entry main src/functions/*.js; scripts start `func start`, test placeholder `echo "No tests yet..."`; dependencies @azure/functions ^4.0.0, @azure/storage-blob ^12.28.0, mssql ^12.7.2 (ranges, not deployed resolved versions). package.json name and description are blank, version 1.0.0. package-lock.json lockfileVersion 3 names the package lunchapp-api, version 1.0.0, with resolved @azure/functions 4.16.5, @azure/storage-blob 12.34.0 and mssql 12.7.2. These are checked-in lockfile resolutions, not verified deployed versions. host schema 2.0; extension bundle Microsoft.Azure.Functions.ExtensionBundle [4.*,5.0.0). local.settings.json is ignored by Git and .funcignore yet is present in the supplied collection; its values were not output. .funcignore also excludes git/vscode, test, JS maps/TS and selected development modules, but does not explicitly exclude docs. Ignore patterns do not prove the file was never committed previously. Manual publish **documented, not executed**: `func azure functionapp publish lunchapp-api-dev`. Nothing establishes the currently deployed commit/package checksum.

Settings-name provenance: SqlConnectionString (current API usage; local file key); ImageStorageConnection and ImageContainerName (current images.js and 2026-10-06 deployed-setting claim); AzureWebJobsStorage and FUNCTIONS_WORKER_RUNTIME (local file key); DEPLOYMENT_STORAGE_CONNECTION_STRING (observed Flex deployment reference). No additional Azure app setting names are verified. Never publish their values or complete connection strings.

Safe release checks to adapt into operational documentation: verify exact source revisions and CI/publish outcome; verify Function CORS via dedicated export; verify platform auth rather than equating anonymous source with all platform behavior; confirm required setting **names** without exposing values; prove SQL/schema compatibility, preserving exact WorkTask column spelling; confirm image storage/container lifecycle; test read and controlled write paths with approved synthetic fixtures; verify browser errors and existing routes; inspect produced static artifact to exclude sensitive collection outputs; verify restore procedures before production rollout. Preserve paired UI/CSS package changes per `lunchappDEV/docs/HANDOVER-2026-10-08.md`; do not reorganize admin/kioskproducts/admin/kioskadmin/bulla paths casually.

## Frontend deployment evidence and operational sequence

`lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`: push to main deploys, PR opened/synchronize/reopened creates/updates preview and closed closes preview. Uses checkout@v3 (submodules true; lfs false), Azure/static-web-apps-deploy@v1, secret references only, app_location `/`, api_location empty, output_location empty. No test/lint/build commands or custom-domain routing config supplied. This deploys frontend repository, not `lunchapp-api`; API historical deployment is separate/manual Functions publish (`lunchapp-api/docs/README-AZURE.md`), not this workflow.

Known frontend base URL is `https://black-bay-0c822f703.3.azurestaticapps.net`; API fetches generally hard-code the DEV standalone Function hostname. No evidenced prod configuration injection or environment-specific frontend host switch. PR preview origins need actual Function CORS verification; allowed main origin in old docs does not prove previews work. Root deployment can retain historic/test pages unless separately excluded. Actual CI run/status/commit/output artifacts and deployed hash comparison were not supplied.

Deployment recommendations already documented: preserve complete coordinated file sets; deploy API compatibility before shared user/kiosk changes; rescan after session schema changes; avoid restoring `/kiosk/` POC generation; preserve private Blob container; deploy employee HTML and admin lunch.css together; verify browser/CDN caching and console errors; treat `/admin/kioskproducts/` mentions as unresolved layout discrepancy, not authority to relocate files. Historical `lunchappDEV/README-DEPLOYMENT 2026-10-05.md` references package-only api/frontend/sql directories and optional owner constraint script not present under those paths in this source snapshot. No deploy was performed here.

## Evidenced deployment processes versus recommendations

| Area | Evidenced process | Not established |
|---|---|---|
| Frontend | Root SWA GitHub main/PR workflow, separate static files | Run receipts, deployed commit/content, exclusions, route authorization, cache invalidation |
| API | Manual Functions publish documented; Node v4 package/host/ignore configuration | Current published package hash, API CI/release approval, actual app-settings/auth/CORS |
| SQL | DEV complete schema metadata export; historical forward migrations | Full ordered executable baseline, migration ledger/current data seeds, deployment/rollback receipt |
| Images | Product multipart upload, private-backed Blob, SQL metadata, content API, permanent unused deletion | Actual container service policy, lifecycle/backup/restore/production deletion test |
| Logging | Insights resource linkage and host sampling | Actual ingestion, retained diagnostics, alert bindings/owners, live exception/latency health |

Source: `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`, `lunchapp-api/docs/README-AZURE.md`, `lunchapp-api/package.json`, `lunchapp-api/host.json`, `lunchapp-api/.funcignore`, `lunchapp-api/src/functions/images.js`, `lunchappDEV/docs/05-sql/00-preflight.csv`. Current resource metadata is in 09.

## Recommended controlled release checklist — not executed

1. Identify approved target environment, owners, complete source revision and coordinated UI set. Compare currently deployed hashes before diagnosing source bugs as production incidents.
2. Export actual CORS/Easy Auth/access/settings names, SQL application principal/grants/firewall and image service/container policy through secure owner-controlled channels. Confirm secrets exist without echoing values.
3. Obtain recoverable SQL/Blob snapshots and a tested baseline/forward migration plan. Review current schema compatibility, especially OrderedMealID/CardID/WorkTask, 50-portion bounds and cancellation references. Never blindly replay experimental salad or POC CREATE TABLE scripts.
4. Deploy API-compatible revision using the documented approved publish procedure; independently verify publish outcome. Frontend workflow does not deploy API. Any schema migration must be reviewed by a database owner separately.
5. Deploy the matching complete static HTML/JS/CSS set. Verify root output excludes sensitive infrastructure/configuration/history content as appropriate; exclusion is not currently evidenced. Confirm main and PR preview origins deliberately allowed or rejected.
6. Run approved synthetic read/control-write regressions from 13 in a controlled DEV database; inspect transactions, cancellation netting, report tie-out and image assignment/deletion. No source fixes are included in this documentation package.
7. Verify kiosk re-scan/session version handling, browser/CDN caches, direct links and console/network errors. Record deployed hashes, timestamps, outcomes and release owner.
8. Require FINA/payroll/kitchen acceptance and access/recovery approval before wider rollout; this package does not grant production readiness.

## Configuration checklist — names only

SqlConnectionString; ImageStorageConnection; ImageContainerName; AzureWebJobsStorage; FUNCTIONS_WORKER_RUNTIME; DEPLOYMENT_STORAGE_CONNECTION_STRING. Workflow secret references: AZURE_STATIC_WEB_APPS_API_TOKEN_BLACK_BAY_0C822F703 and GITHUB_TOKEN. Source/observed-name provenance is in 09. Runtime AzureWebJobsStorage account mapping and actual principal are Unknown. Do not put connection strings, SAS or keys in static files, logs or this package.

## Practical troubleshooting — source-backed symptom map

| Symptom | Evidence-backed first check | Limit/safe next action |
|---|---|---|
| External My Orders 400 | user/my-orders.js omits cardId, unlike user/lunch.js | Compare deployed query/code; do not change source here |
| Salad save 500 after cancellation | delete/reinsert conflicts with NO_ACTION FK | Preserve source/audit rows; inspect controlled DEV, no blind audit deletion |
| Hard meal delete fails | meals.js precheck uses MealID absent from Orders/GuestOrders | Soft deactivate separate; reconcile with extracted OrderedMealID |
| Weekly versus daily salad totals disagree | weekly summary gross salads, daily/report net | Do not “correct” finance using gross weekly totals |
| Browser CORS/network or same-origin HTML response | standalone Function host vs relative Statistics /api | Verify actual origin/policy/host, not CORS as authorization |
| Image metadata exists but bytes fail | cross-service upload/delete not atomic; product references include inactive | Check owner-controlled Blob+SQL consistency; never disclose credentials |
| External free sale fails | zero external Purchase violates ledger AmountCents<>0 | Distinguish catalog free price from external ledger persistence |
| Prepaid lunch negative balance | no lunch funds enforcement, derived charges | Cafe checks do not cover editable lunch saves |
| “New card” loses plus or crop styles missing | translations overwrite text; scoped selectors absent | Compare coordinated source/deployed CSS, final 08 visual smoke |
| Menu/CSV batch partly saved | independent endpoint requests; no whole-batch transaction | Reload authoritative state, avoid assumed rollback/retry duplicates |

Evidence: `lunchappDEV/user/my-orders.js`, `user/lunch.js`, `admin/kioskadmin/kiosk-cards-admin.js`, `admin/kioskadmin/cafe-kiosk-admin.css`; `lunchapp-api/src/functions/salad-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`, `lunchapp-api/src/functions/meals.js`, `lunchapp-api/src/functions/kitchen-weekly-summary.js`, `lunchapp-api/src/functions/images.js`, `lunchapp-api/src/functions/kiosk-sales.js`; `lunchappDEV/docs/05-sql/03-constraints.csv`, `lunchappDEV/docs/05-sql/04-foreign-keys-1.csv`.

## Recommended rollback and recovery boundaries — not verified

Frontend rollback must restore a coordinated revision compatible with API/session contracts, not isolated old CSS/POC files. API rollback must preserve SQL/CardID/image contract compatibility and identify the prior published package. Schema rollback cannot be inferred from old CREATE TABLE files; plan forward correction or independently tested restore with database owner. Never remove cancellation references or duplicate virtual lunch ledger rows to force a rollback.

SQL PITR/LTR/geo retention, Blob versioning/soft delete, RPO/RTO, restore permissions, retained image metadata/blob parity and latest recovery test are Unknown. FULL recovery model and storage encryption are not evidence of usable restores. Unused asset hard deletion may be irreversible without an independently verified backup. A recovery plan must include metadata and blobs, not just one side.

## Recommended rebuild sequence — blocked by Unknown prerequisites

1. Establish approved tenant/subscription/resource group and secure operators (identifiers withheld here).
2. Provision verified SQL database/server/network/principal and run a complete reviewed current schema baseline, then necessary synthetic/reference seeds. Full executable baseline and seed set not supplied.
3. Restore/create required image storage and verified container policy; restore blobs and matching ImageAssets/product links together. Runtime and deployment storage mapping need actual settings.
4. Provision/configure Function Node 22/Flex resources, telemetry, least-privilege secrets and auth/CORS/access policy; publish verified revision.
5. Provision/configure SWA Standard West Europe, GitHub workflow secret, exclusions and role routing as approved; deploy compatible frontend.
6. Verify safe synthetic orders/cancellations/Cafe/funds/reports/images, acceptance, alerting and full restore before production decision.

This is a recommendation, not a tested runbook or authorization to deploy. Exact resource properties and unresolved dependencies remain in 09/14.

