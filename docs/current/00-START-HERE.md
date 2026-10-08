# Start here

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Authority and safe interpretation

Current frontend/API code, numbered SQL extraction and completed Azure exports outrank restart and handover prose. Next: `lunchappDEV/docs/START-HERE-2026-10-19.md`, 08 handover/changelog, 07, 06, 05 and older material. The 19 October title is a project-record date, future relative to this snapshot, not proof of elapsed work or deployment. A conflict between code and SQL remains a conflict. Blank Azure template/export fields mean **Unknown**, not disabled.

## What LunchApp is

LunchApp supports employee lunch and salad ordering, employee-hosted guest portions, external-card ordering with shared financial accounts, kitchen summaries/cancellations, café kiosk sales and finance preparation. Static multilingual browser pages and a separately deployed Azure Functions API use a DEV Azure SQL database and private-backed managed product images. Current capabilities are source-confirmed; matching live deployment is unverified.

## Recommended reading order

1. [Executive summary](17-EXECUTIVE-SUMMARY.md) and [solution overview](01-CURRENT-SOLUTION-OVERVIEW.md): purpose, users, maturity.
2. [Architecture](02-SYSTEM-ARCHITECTURE.md), [Azure](09-AZURE-ARCHITECTURE.md), [operations](10-DEPLOYMENT-AND-OPERATIONS.md): components and evidence boundaries.
3. [Business rules](08-BUSINESS-RULES.md), [reporting](12-REPORTING.md), [security](11-AUTHENTICATION-AND-SECURITY.md): quantities, money, access.
4. [API](06-CURRENT-API-SURFACE.md) and [frontend](07-CURRENT-FRONTEND-STRUCTURE.md): exact integration contracts and every page/asset.
5. [Schema](03-CURRENT-DATABASE-SCHEMA.md), [dictionary](04-DATABASE-DATA-DICTIONARY.md), [relationships](05-DATABASE-RELATIONSHIPS.md): complete extracted database.
6. [Validation](13-TESTING-AND-VALIDATION.md), [gaps](14-KNOWN-GAPS-AND-TODOS.md), [source map](15-DOCUMENTATION-SOURCE-MAP.md), [history](16-HISTORICAL-TIMELINE.md).

## Safe resumption

- Establish approved DEV access, exact deployed SWA/API revisions and a clean recoverable test database before any controlled writes. Confirm current configuration through secure channels; this package contains setting names, not values.
- Read the centralized gaps before accepting earlier “tested/deployed” statements. Preserve evidence and coordinated HTML/JS/CSS sets. Do not replay old baseline or experimental salad SQL as current DDL.
- Keep EmployeeNo (employee), CardID (external editable owner) and ExternalAccountID (external billing owner) distinct. Guests are separate. Derived lunch charges must never be inserted again into the physical ledger.
- Do not mistake selected employee number/card scan/browser storage for authenticated access, or planned Entra roles for implemented roles. All 36 source registrations are anonymous; platform Easy Auth remains Unknown.
- Do not rename Bulla/kioskadmin folders or remove historical files without an independently reviewed dependency/output map. This documentation generation changed no source.

## Immediate priorities

**Existing agreed backlog:** lunch/salad financial delta enforcement and coordinated saves; café direct API/concurrency validation; FINA/payroll/kitchen acceptance; Entra/roles; final 08 UI validation; later naming cleanup.

**New source-analysis recommendations:** reconcile cancellation-linked salad replacement and weekly gross salads; external My Orders cardId omission; meal hard-delete schema mismatch; missing Statistics/current POC Order Explorer; SQL quantity/zero-ledger boundaries; deployment/auth/CORS/restore evidence.

## Package scope

Exactly 18 Markdown documents, no originals, raw analysis bundles, sample production rows or credentials. Coverage: 234 source files accounted for, 26 API JS semantically inspected, 36 registrations/64 method-route contracts, all 37 HTML/34 JS/15 CSS frontend files, 27 tables/205 columns/2 views/34 FKs/68 indexes. Syntax/integrity checks are not live acceptance tests.

Primary evidence: `lunchappDEV/docs/START-HERE-2026-10-19.md`, `lunchappDEV/docs/HANDOVER-2026-10-08.md`, `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md`, `lunchapp-api/src/functions/orders.js`, `lunchapp-api/src/functions/salad-orders.js`, `lunchappDEV/docs/05-sql/07-module-definitions.csv`.

