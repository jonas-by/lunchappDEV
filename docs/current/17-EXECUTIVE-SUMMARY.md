# Executive summary

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Purpose and current capability

LunchApp coordinates multilingual employee lunch/salad, employee-hosted guests and external-card orders; kitchen portion visibility/cancellations; employee/external Cafe purchases; menu/employee/account/card/product/layout/image administration; and payroll/FINA reporting preparation. It is an implemented DEV/pilot system with substantial SQL/API/browser functionality, not a certified production-ready, secure or fully tested service.

The two repositories deploy separately: Static Web Apps frontend and Node22 Linux/Flex Functions API, with DEV Azure SQL, three storage accounts and Insights resources. Completed Azure evidence places SWA in West Europe, overriding older Sweden Central prose; most application resources are Sweden Central. Actual deployed revisions, complete access settings, recoverability and business acceptance remain unverified.

## Financial and ownership essentials

EmployeeNo identifies employee/payroll ownership. External CardID separates each card's editable orders; ExternalAccountID aggregates shared billing. Guests remain separate hosted portions. External lunch charges are dynamically derived from net orders/effective price in SQL views, not stored physical ledger charges. Physical external Cafe Purchase ledger entries and deposits/payments combine with derived lunches to form balance. Never post virtual lunch entries again.

Cafe external funds/credit enforcement exists in current source. Lunch/salad affordability enforcement does not; balances can become negative through editable lunch orders. Lunch payroll exports count portions; Cafe payroll exports monetary EUR amounts. External count/export/reporting does not itself issue invoices, settle accounts, or prove FINA/payroll import acceptance. Current account/card labels and account mode can alter historical Cafe report presentation/inclusion.

## Five most important source-confirmed findings

1. **Access maturity:** all36 Function registrations are anonymous, with no supplied application Entra/role verification; platform Easy Auth/CORS remain Unknown. Browser employee/card selection is not authenticated identity.
2. **Cancellation integrity/reporting:** personal/guest salad reads are gross and replacement deletes conflict with NO_ACTION cancellation FKs; weekly kitchen salads are gross while daily/finance net them.
3. **External workflow mismatch:** My Orders omits mandatory cardId, unlike ordering; source/API integration is incompatible despite route match and older reported tests.
4. **Financial boundary:** Cafe enforces external funds, editable lunch does not; derived charges/retroactive rates and current labels mean historical reporting is not wholly immutable.
5. **Schema/operations consistency:** hard meal-delete checks wrong MealID columns; cancellation-preserving quantity, salad merge and free external Cafe total can violate SQL checks. Matching deployment and tested recovery were not established.

## Priorities and dependencies

**Immediate:** establish deployed-code/schema/configuration parity and safe restore/test fixtures; reconcile cancellation and integration/schema defects; verify access controls and static output handling. Source findings are not measurements of current production incidents.

**Existing agreed next work:** external lunch financial delta/atomic combined saves, direct Cafe API/concurrency validation, FINA/payroll/kitchen acceptance, Entra/roles and final08 UI validation. Later naming/custom URL work must preserve same-origin kiosk/session/navigation assumptions. See14 for complete gap ownership questions and13 for not-yet-executed regressions.

## Five unresolved management questions

1. Which exact frontend/API revisions are deployed and do they match current DEV schema and intended08 UI set?
2. What actual Easy Auth, role policy, CORS/access/principal/least-privilege settings protect users and financial/admin data?
3. What approved policy covers lunch funds, meal+salad atomicity, ordering deadlines/timezones and cancellation replacement?
4. Have FINA/payroll/kitchen accepted report definitions/import formats, recipients, reconciliation and re-export controls?
5. What retained backups, RPO/RTO, operational ownership and successful SQL+Blob restore evidence exist?

## Documentation assurance

The18-document package includes all27 tables/205 columns,130 constraints,34 FKs,68 indexes, two complete views, dependencies/security metadata, all64 route contracts and all37 HTML/34 JS/15 CSS frontend inventories, with234-file evidence accounting. Source semantics and extracted schema are high-confidence; omitted Azure policy/deployed revisions/business acceptance are explicitly Unknown. 26 API syntax checks and234 unchanged hashes are offline structural/integrity results, not live integration/security/concurrency/restore certification.

Primary evidence: `lunchappDEV/docs/START-HERE-2026-10-19.md`, `lunchappDEV/docs/HANDOVER-2026-10-08.md`, `lunchappDEV/docs/07-handover/HANDOVER-2026-10-07.md`, `lunchappDEV/docs/05-sql/07-module-definitions.csv`, `lunchappDEV/user/my-orders.js`, `lunchapp-api/src/functions/orders.js`, `lunchapp-api/src/functions/salad-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`, `lunchapp-api/src/functions/kitchen-weekly-summary.js`, `lunchapp-api/src/functions/kiosk-sales.js`, `lunchapp-api/src/functions/meals.js`. Full principal/file provenance is in15.

