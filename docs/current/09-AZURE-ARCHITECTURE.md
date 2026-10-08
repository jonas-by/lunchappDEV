# Azure architecture

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Observed Azure configuration

### Observed resource inventory

Evidence: `lunchappDEV/docs/02-architecture/account.json`, `lunchappDEV/docs/02-architecture/resourcegroups.json`, `lunchappDEV/docs/02-architecture/resources.json`.

Resource group `lunchapp`, swedencentral, provisioning Succeeded; account AzureCloud, Enabled. Subscription and tenant IDs intentionally redacted. There are **11 resources** in resources.json: 3 storage accounts, 1 static site, 1 logical SQL server, 2 databases (master and DEV), 1 Function plan, 1 Function App, 1 Insights component and 1 global action group. No production database appears in this supplied inventory. That does not prove no production deployment exists elsewhere.

### Function runtime and deployment package storage

Evidence: `lunchappDEV/docs/02-architecture/functionapps.json`, `lunchappDEV/docs/02-architecture/resources.json`.

`lunchapp-api-dev`, Linux, Running, enabled, HTTPS-only, public network Enabled, plan `ASP-lunchapp-bf86`. Runtime node/22. Plan FC1/FlexConsumption; configured instance memory 2048 MB, maximum 100 instances, site-update strategy Recreate, always-ready configuration Unknown (`null`). AlwaysOn false is observed but does not mean Flex always-ready capacity is disabled. Flex deployment storage is Blob container `app-package-lunchapp-api-dev-38f614f` in `lunchappafa5`, using StorageAccountConnectionString authentication via setting **name** `DEPLOYMENT_STORAGE_CONNECTION_STRING`; its value is not supplied. Runtime AzureWebJobsStorage account mapping is Unknown because settings values were not exported. Do not assume lunchappstorage is current runtime storage from its name.

Public API hostname: `lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net`; SCM host has `.scm.`. LastModifiedTimeUtc in Function export is 2026-10-06T11:55:09.103333. This is resource metadata, not proof which source revision is live. `siteConfig.cors`, appSettings, connectionStrings, IP restrictions and TLS minimum fields are null; operational values are Unknown. Outer clientCertEnabled false means no client-certificate enforcement evidenced, regardless of clientCertMode Required. Host SSL-state Disabled fields do not establish HTTPS is unavailable; httpsOnly is true and no certificate/probe export confirms service TLS behavior. Outbound IP lists are present; SQL firewall correlation remains Unknown. Exported VNet subnet is null, outboundVnetRouting flags all false. No VNet integration is represented in this export, but do not generalize to the entire subscription.

### Storage and image access

Evidence: `lunchappDEV/docs/02-architecture/storageaccounts.json`; `lunchapp-api/src/functions/images.js`; `lunchappDEV/docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md`.

All three accounts are StorageV2/Standard_LRS, Hot, swedencentral. All: allowBlobPublicAccess=false, allowSharedKeyAccess=true, allowCrossTenantReplication=false, HTTPS-only=true, TLS1_2, publicNetworkAccess=Enabled, defaultAction=Allow, no IP/VNet rules or private endpoint connections in supplied account exports. lunchappafa5 defaults to OAuth=true and bypass None; lunchappdevstorage and lunchappstorage defaultToOAuth=false and bypass AzureServices. Microsoft-managed encryption key source with enabled Blob/File encryption is observed; Blob versioning, soft-delete/container retention and restore policy are Unknown because service-property exports are absent. Infrastructure-encryption requirement is false for the latter two, Unknown for lunchappafa5.

Dedicated image architecture: account lunchappdevstorage, container images, BlobName convention `products/<guid>.<extension>` backed by `lunchapp-api/src/functions/images.js` and 2026-10-06 notes. Container privacy is a documented implementation claim corroborated by account-wide anonymous-Blob prohibition, **not a standalone container ACL observation**. Source streams content through anonymous GET `/api/images/{id}/content`; private backing storage does not ensure authorized application access. Do not publish image credentials or storage account keys.

### SQL, identity and security

Evidence: `lunchappDEV/docs/02-architecture/sqlservers.json`, `lunchappDEV/docs/02-architecture/functionapps.json`, `lunchappDEV/docs/02-architecture/resources.json`; `lunchappDEV/docs/05-sql/09-security-metadata-1.csv`, `lunchappDEV/docs/05-sql/09-security-metadata-2.csv`.

Logical server `lunchappsql`, FQDN lunchappsql.database.windows.net, Sweden Central, state Ready, SQL server API version 12.0, minimum TLS 1.2, public network Enabled, outbound restriction Disabled, no exported private endpoint connections, exported identity null. AD administrator configured (personal identifiers omitted), AD-only authentication false. Server retentionDays -1 is **not evidence of database backup retention**. DEV database inventory: GP_S_Gen5, GeneralPurpose, Gen5, capacity 2, kind v12.0,user,vcore,serverless,freelimit. Master: GP_SYSTEM/System/family SYSTEM/capacity 4. Serverless/free-limit kind does not prove current overage billing setting; overage Disabled exists only in old design documentation, not a completed database property export.

Function identity null and SQL identity null mean no managed identities represented on those resources in these exports. Source uses SQL and Blob connection-string APIs; actual deployed credentials/principal permissions are not exported. Database permission extraction contains only dbo CONNECT plus public system metadata SELECT grants and dbo membership in db_owner. It does not verify a least-privilege application principal; login-level metadata, Azure RBAC, database roles beyond returned membership, Entra groups and platform auth are incomplete/Unknown. Current source authLevel anonymous is distinct from Easy Auth, whose config is Unknown. Entra role design in `lunchappDEV/docs/docs/ENTRA-ACCESS-DESIGN.md` is planned, not an observed control.

### Monitoring, backups and recovery

Evidence: `lunchappDEV/docs/02-architecture/resources.json`, `lunchappDEV/docs/02-architecture/functionapps.json`; `lunchapp-api/host.json`; `lunchappDEV/docs/05-sql/00-preflight.csv`.

Application Insights component `lunchapp-api-dev` and Function hidden-link to it are observed, plus action group `Application Insights Smart Detection` (global). host.json enables Application Insights sampling excluding Request telemetry. Instrumentation/app-connection-setting values are not exported; ingestion, retention, alert rule binding, owners and live health are Unknown. Do not convert resource linkage into a statement that telemetry is currently flowing.

No backup export establishes SQL PITR retention, LTR, geo-redundancy, restore points, Storage versioning/soft deletion, Function backup state or restore-test success. FULL recovery mode in preflight is not a recoverability guarantee. RPO/RTO, operational owners and tested recovery are Unknown. A rebuild requires an independently verified full schema script, valid configuration/secrets supplied through secure channels, image Blob + SQL metadata restoration with referential consistency, verified CI/manual deployment and an actual smoke/restore test. Historical migration fragments are not a complete ordered baseline; never bulk-replay them unreviewed. No recovery commands were executed during this analysis.

### Source deployment configuration and safe release checklist

Frontend evidence: `lunchappDEV/.github/workflows/azure-static-web-apps-black-bay-0c822f703.yml`. GitHub Actions ubuntu-latest, checkout@v3 with submodules true/LFS false; Azure/static-web-apps-deploy@v1 action upload; main pushes and opened/synchronize/reopened main PRs deploy; closed PR action closes environment. app_location `/`, api_location empty, output_location empty. Secret **names only**: AZURE_STATIC_WEB_APPS_API_TOKEN_BLACK_BAY_0C822F703 and GITHUB_TOKEN. No staticwebapp.config.json, root package.json/build pipeline or API workflow was found in provided source. Therefore no supplied SWA route/role/header policy can be claimed.

API evidence: `lunchapp-api/package.json`, `lunchapp-api/host.json`, `lunchapp-api/.funcignore`, `lunchapp-api/.gitignore`, `docs/README-AZURE.md`. Entry main src/functions/*.js; scripts start `func start`, test placeholder `echo "No tests yet..."`; dependencies @azure/functions ^4.0.0, @azure/storage-blob ^12.28.0, mssql ^12.7.2 (ranges, not deployed resolved versions). package.json name and description are blank, version 1.0.0. package-lock.json lockfileVersion 3 names the package lunchapp-api, version 1.0.0, with resolved @azure/functions 4.16.5, @azure/storage-blob 12.34.0 and mssql 12.7.2. These are checked-in lockfile resolutions, not verified deployed versions. host schema 2.0; extension bundle Microsoft.Azure.Functions.ExtensionBundle [4.*,5.0.0). local.settings.json is ignored by Git and .funcignore yet is present in the supplied collection; its values were not output. .funcignore also excludes git/vscode, test, JS maps/TS and selected development modules, but does not explicitly exclude docs. Ignore patterns do not prove the file was never committed previously. Manual publish **documented, not executed**: `func azure functionapp publish lunchapp-api-dev`. Nothing establishes the currently deployed commit/package checksum.

Settings-name provenance: SqlConnectionString (current API usage; local file key); ImageStorageConnection and ImageContainerName (current images.js and 2026-10-06 deployed-setting claim); AzureWebJobsStorage and FUNCTIONS_WORKER_RUNTIME (local file key); DEPLOYMENT_STORAGE_CONNECTION_STRING (observed Flex deployment reference). No additional Azure app setting names are verified. Never publish their values or complete connection strings.

Safe release checks to adapt into operational documentation: verify exact source revisions and CI/publish outcome; verify Function CORS via dedicated export; verify platform auth rather than equating anonymous source with all platform behavior; confirm required setting **names** without exposing values; prove SQL/schema compatibility, preserving exact WorkTask column spelling; confirm image storage/container lifecycle; test read and controlled write paths with approved synthetic fixtures; verify browser errors and existing routes; inspect produced static artifact to exclude sensitive collection outputs; verify restore procedures before production rollout. Preserve paired UI/CSS package changes per `lunchappDEV/docs/HANDOVER-2026-10-08.md`; do not reorganize admin/kioskproducts/admin/kioskadmin/bulla paths casually.

### Explicit unresolved questions

- Exact API deployment revision and whether it matches the source snapshot and extracted DEV schema?
- Current Function CORS, Easy Auth, access restriction and deployed app-setting-name inventories?
- Current runtime storage account and application SQL principal/least-privilege permissions?
- Static artifact exclusions: are docs and infrastructure exports uploaded by the root workflow?
- Database backup/PITR/LTR settings, Storage lifecycle/versioning/soft-delete, recovery ownership/RPO/RTO and latest restore test?
- DEV/free-offer billing, auto-pause/min capacity/database max size, SQL firewall and auditing/encryption specifics?
- Is employee-owned KioskCards support deprecated in source only or intentionally retained for compatibility, and should missing logical employee FKs be reviewed?

**Confidence:** high for extracted SQL objects/counts and non-null Azure properties, high for source configuration and explicit code-vs-schema differences; medium for historically claimed deployments/private container; Unknown for deployed revisions, omitted settings, platform auth and backups.

## Azure exact resource inventory — resource reference
| Exact resource name | Resource type | Region | Kind | SKU / tier / capacity | Provisioning |
| --- | --- | --- | --- | --- | --- |
| lunchappstorage | Microsoft.Storage/storageAccounts | swedencentral | StorageV2 | Standard_LRS / Standard / None | Succeeded |
| lunchapp | Microsoft.Web/staticSites | westeurope | Unknown | Standard / Standard / None | Succeeded |
| lunchappsql | Microsoft.Sql/servers | swedencentral | v12.0 | Unknown | Succeeded |
| lunchappsql/master | Microsoft.Sql/servers/databases | swedencentral | v12.0,system,serverless | GP_SYSTEM / System / 4 | Succeeded |
| lunchappsql/lunchappdb-dev | Microsoft.Sql/servers/databases | swedencentral | v12.0,user,vcore,serverless,freelimit | GP_S_Gen5 / GeneralPurpose / 2 | Succeeded |
| lunchappafa5 | Microsoft.Storage/storageAccounts | swedencentral | StorageV2 | Standard_LRS / Standard / None | Succeeded |
| ASP-lunchapp-bf86 | Microsoft.Web/serverFarms | swedencentral | functionapp | FC1 / FlexConsumption / 0 | Succeeded |
| lunchapp-api-dev | microsoft.insights/components | swedencentral | web | Unknown | Succeeded |
| lunchapp-api-dev | Microsoft.Web/sites | swedencentral | functionapp,linux | Unknown | Succeeded |
| Application Insights Smart Detection | microsoft.insights/actiongroups | global | Unknown | Unknown | Succeeded |
| lunchappdevstorage | Microsoft.Storage/storageAccounts | swedencentral | StorageV2 | Standard_LRS / Standard / None | Succeeded |


## Evidence properties versus unverified actual service policy

Six completed architecture JSON exports are CLI resource observations, not a deployment test. Non-null properties above are confirmed at extraction; null nested Easy Auth/CORS/settings/access fields remain Unknown. Account-level anonymous Blob prohibition corroborates private backing storage, not a live container ACL listing. Function app identity null means none represented in the export; keyVaultReferenceIdentity=SystemAssigned is only a preference. TLS/HTTPS metadata has field-level nuances and was not probed.

Older README region Sweden Central does not override Static Web App West Europe from resources.json. Exact resource names/hostnames identify components; tenant/subscription/operator/principal identifiers and configuration values are deliberately redacted. No production resource inventory is established outside the supplied resource group. Resource Running/Succeeded and a last-modified timestamp do not prove matching code, current availability or recovery readiness.

Primary exact evidence files are enumerated in 15-DOCUMENTATION-SOURCE-MAP.md under infrastructure coverage. No separate firewall/CORS/auth/container/backup/deployment-receipt exports were supplied. Operational recommendations and rebuild order are in 10, factual trust boundaries in 11, centralized Unknowns in 14.

