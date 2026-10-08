# Testing and validation

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## What exists versus what was executed

The downloaded frontend has a diagnostic HTML page, manual regression/checklists and developer test narratives, **not an automated frontend test suite or recorded browser test run**. No package.json/test harness/browser snapshots/CI tests exist in that tree. An empty unchecked checkbox list is a plan, never an executed pass. The analysis performed offline source extraction, syntax checks and synthetic pure-function checks only; `13-TESTING-AND-VALIDATION.md` records exact scope/results. No network, database, deployed browser, credentials, live orders, cancellations or financial writes were exercised.

| Evidence record | Evidence class | What can be said / limits |
|---|---|---|
| `lunchapp-api/docs/BUILD-LOG.md` (25 Sep) | Historical developer execution narrative | Git frontend deploy, hello/employees and frontend→API→SQL smoke path reportedly worked, including CORS fix. No CI receipt attached; do not reproduce test employee details. |
| `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md` | Historical developer manual verification | Employee/meal/menu/personal/guest/my-orders flows reportedly verified; schema quantity migration. Describes prior menu/week route and pre-kitchen architecture, not current regression coverage. |
| `docs/00-overview/PROJECT-STATUS.md` and `docs/01-changelog/CHANGELOG-2026-09-29.md` | Status/change narrative | Duplicate messages/menu cycles/kitchen/cancellation implementation and “stable and tested” claim. No granular executed checklist or logs. |
| `docs/06-testing/STABILIZATION-CHECKLIST.md` | Unexecuted checklist | All supplied boxes unchecked; covers cycles/deadline simulation/kitchen/cancellation/print. Cannot infer passes. |
| `docs/06-testing/POSTMAN-SMOKE-TESTS.md` | Manual request recipe | Current menu/daily kitchen/meal cancellation requests and expected 201 then 409, preserved cancellation FK. No execution response archive provided. |
| `docs/docs/TEST-PLAN.md` | Historical pilot plan | Café/report/lunch kiosk/feedback checks; external lunch deliberate-block expectation superseded by 05/07 code. Not an acceptance report. |
| `docs/README 2026-10-02.md`, `docs/docs/CHANGELOG-2026-10-02.md` | Developer test narrative | Café employee/external buying, reports/Excel Nordic CSV and Lunch Kiosk login/timeout reportedly tested. Does not validate later CardID/my-orders/image changes. |
| `docs/06-testing/TESTING-AND-VALIDATION-2026-10-05.md` | Explicit “Verified manually” | External meals/salads, kitchen names, manual addition, lunch CSV/balances/card tiles/login layout. Explicitly no FINA/payroll/kitchen end-user acceptance; CardID limitation now historical. |
| `docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md` and `lunchappDEV/docs/07-handover/HANDOVER-2026-10-06.md` | Explicit API end-to-end + visual assertion | Image list/upload 201/Blob+SQL/content/product assignment/API URL verified; kiosk images/icon visually verified. Dedicated Image Library functions/deletion marked pending, not passed. |
| `docs/06-testing/TESTING-VALIDATION-2026-10-07.md` | Explicit observed synthetic/developer workflows | Two cards one account separated rows/views/kitchen identities; successful non-guest save logout; prepaid over-limit Buy disabled; Café sale+negative ledger entry reportedly observed. Direct API rejection/concurrency still recommended. Kitchen identity has expectations but not separately described executed response detail. |
| `docs/HANDOVER-2026-10-08.md`, `lunchappDEV/docs/CHANGELOG-2026-10-08.md`, `lunchappDEV/docs/START-HERE-2026-10-19.md` | Packaged UI changes + future validation | Create/edit, focus, toggle persistence, desktop/mobile employee scroll and console checks requested after deploy. No completed post-change smoke evidence; actual source differences remain. |

All table paths without root prefix are relative to `lunchappDEV/`.

## Highest-priority regression set (new analysis recommendation, not already-executed tests)

1. External My Orders with two cards under one account: cardId must be included, identities isolated, meals AND salads week/month load; compare exact browser network queries against source.
2. Salad-only order: daily badge, footer aggregate, dirty/save, guest project warning, reload and My Orders quantities. Current footer counter fails offline synthetic case.
3. Employee/external salad after partial/full kitchen cancellation: retained IDs/FK, active quantity, repeat saves, cancelled-row survival, daily/weekly/lunch-finance agreement. Current API shape suggests an FK regression and original-quantity disagreement; execute only in controlled test database.
4. Source-path integrity: current portal links, missing statistics.html, employee back/ordering link, legacy Order Explorer labeling and POC rows. Navigate all current entries at deployed base, not file://.
5. Image crop/picker/admin new/edit: missing scoped CSS selectors, local source limit/output size, selection/remove/legacy fallback, English required/Swedish focus, cancellation leaves unused asset, used-delete 409 and unused Blob+SQL removal. No meal/salad-image support assumption.
6. 08 coordinated UI: product compact preview, language order/focus, cards/accounts `+ New` button after JS localization, all Active payload booleans, employee desktop/mobile overflow. Compare deployed files/hashes before diagnosing browser cache.
7. Café funds API: below/equal/above prepaid balance and postpaid/invoice available credit; missing limit; simultaneous requests sharing an account; employee unaffected; no sale/ledger rows on rejection; duplicate requestId replay. Frontend/session-snapshot blocking alone is not enough.
8. Failure/partial-save tests: reject one meal/salad PUT and verify the other operation state; optional initial card failure after account creation; sequential week/CSV/library update failure; reload/retry messaging and duplicate prevention.
9. Reporting acceptance: cancelled portions/manual employee additions/guest exclusion/external attribution/effective-price boundaries; café completed-only financial aggregates, void filters, invoice/postpaid combinations, period timezone boundaries, pagination and Nordic BOM/semicolon/decimal CSV; signoff by FINA/payroll and kitchen.
10. Kiosk session: scan long/nondigit reader input, external account inactive/card expired, 60-second inactivity across nested pages, guest-save not immediate logout, personal-save complete logout, manual/logout clearing both keys, rescanned sessions after schema updates, multiple tabs sharing lunch localStorage. Standalone user should not unexpectedly log out on save.
11. Menu lifecycle: cycle/week isolation, future StartDate takeover, publish incompleteness/archived-meal rejection, archive read-only, Friday cross-cycle view and date-lock timezone policy.
12. Deployment/auth: main/PR-preview API origin CORS, no same-origin API HTML response assumption, anonymous pilot explicitly labeled, role design not presented as implemented, obsolete/test output route exclusion/protection decided with actual deploy configuration.

## Agreed TODOs carried forward versus new observations

**Explicitly agreed existing work:** external lunch/salad funds+credit enforcement with financial delta and coordinated meal/salad save design; direct café API/concurrency validation; FINA/payroll and kitchen feedback; Entra/roles; complete authoritative documentation and Azure/SQL/API/frontend inventories; permanent Image Library/reporting documentation; validate final 08 UI/employee scrolling; later folder/Bulla→Café/custom URL cleanup. Sources: `docs/07-handover/HANDOVER-2026-10-07.md`, `lunchappDEV/docs/07-handover/START-HERE-TOMORROW-2026-10-07.md`, `docs/HANDOVER-2026-10-08.md`, `lunchappDEV/docs/START-HERE-2026-10-19.md`.

**Resolved earlier TODOs in current code:** SQL migration of core ordering/menu/employees; weekly API page exists; external card-only Admin; café product/layout/sale/report conversion; shared product image library; exact external CardID owner and kitchen identity. Do not keep those as wholly unimplemented just because older overviews list them. Image deletion validation and actual deployed-state proof remain distinct.

**New analysis findings/recommendations, not previously agreed completion work:** My Orders CardID omission; current missing statistics page and legacy explorer exposure; salad API/reference/weekly cancellation discrepancies; salad-only footer count; current image-selector/style/package mismatch; `+ New` localized overwrite; employee old kiosk link; historical/test deploy-output inclusion review; cross-tab shared local identity analysis. These must be labeled findings/questions rather than silently promoted to stakeholder decisions.

## Consolidated source/schema boundary regression additions — not executed

| Controlled synthetic case | Expected assertion / currently identified discrepancy | Enforcement under test |
|---|---|---|
| Meal active50 plus prior canceled1 | Current API gross51 can violate SQL50; require documented rejection/consistent model | API + SQL constraint |
| Personal salad duplicate30+30 | API merge uncapped, SQL50 rejects60 | API + SQL constraint |
| Guest same meal/date with two WorkTasks | Payload dedupe task vs reconciliation ignoring task must not silently overwrite | API reconciliation |
| Guest salad nonexistent/inactive positive host | Numeric validation only; no host query/FK, unlike guest meals | API + missing FK |
| External free Cafe basket | Catalog0 allowed but physical Purchase0 prohibited; transaction must not partly persist | API + SQL transaction/check |
| Employee inactive Cafe login/sale | Current lookup lacks Active check; approved business policy unresolved | API |
| Cross-table duplicate card | External API checks Employees; employee update does not check external cards | API + independent uniques |
| Future and retroactive external price | GET newest may be future; charge as-of MenuDate; retro rate changes derived balance | API + SQL views |
| Missing historical effective price | CROSS APPLY removes charge row; not explicit zero/error | SQL view |
| Omitted partially canceled meal | Current save retains previous gross/remaining; omission does not zero active count | API reconciliation |
| Direct Published cycle create / empty Published week / Archived metadata edit | Completeness/read-only protections are path-specific, not universal | API |
| RequestID reused with changed owner/items | Existing sale replay lacks payload/owner consistency recheck | API |
| External account management outside valid dates / concurrent mode change | Management active-only; mode update not serializable financial lock | API |
| Rename account/card or change account mode | Historical Cafe report labels/inclusion use current metadata | API reporting |
| Image assign/delete race or Blob/SQL failure | No distributed transaction; preserve referential/content consistency | API + FK + Blob |
| Refund/void filters | Schema statuses wider than parser/actions; do not infer implemented workflow | API + SQL checks |
| Transaction page beyond last | Window-count totalRows can0; UI/report pagination interpretation | API response |
| Lunch date changed without refresh then export | Filename may differ from loaded dataset period | Frontend |

Evidence: `lunchapp-api/src/functions/orders.js`, `lunchapp-api/src/functions/salad-orders.js`, `lunchapp-api/src/functions/guest-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`, `lunchapp-api/src/functions/kiosk-sales.js`, `kiosk-card-login.js`, `lunchapp-api/src/functions/employees.js`, `lunchapp-api/src/functions/kiosk-cards.js`, `external-lunch-prices.js`, `lunchapp-api/src/functions/menu-cycles.js`, `lunchapp-api/src/functions/menu-week.js`, `lunchapp-api/src/functions/kiosk-external-accounts.js`, `lunchapp-api/src/functions/kiosk-reports.js`, `lunchapp-api/src/functions/images.js`; `lunchappDEV/admin/lunch-reports-ui.js`; `lunchappDEV/docs/05-sql/03-constraints.csv`, `lunchappDEV/docs/05-sql/07-module-definitions.csv`.

## Documentation-package checks actually performed

Completed domain review: all26 API JS and helpers, 36 registrations/64 contracts, all86 frontend HTML/JS/CSS files and 84 first-party Markdown/TXT documentation sources, all27 SQL-folder files and11 architecture files. Counts reconciled: 27 tables/205 columns/2 full views/130 constraints/34 FKs/68 indexes/141 index-column rows/104 dependencies/254 permissions/1 role membership/193 registry objects. API syntax checks passed26; source manifest integrity234 checked, zero differences. Offline frontend syntax/dependency/synthetic checks are detailed in the source-analysis evidence register above; none invoke services.

Final package checks include exact18 filenames and single top heading each; every route/page/asset/column and extracted constraint/FK/index/security target presence; both complete view definitions; route/schema/caller reconciliation; Markdown link/fence/path/secret-marker scans; critical-finding consistency and central gaps; ZIP contents and post-publication byte equality. The accompanying handoff records current pass counts and any explicitly bounded scan limitations.

**Not performed:** npm test as acceptance (placeholder), live HTTP/SQL/Blob/auth/CORS/security tests, deployed-browser/visual tests, concurrent financial writes, migrations, deployments, recipient acceptance, recovery/restore tests. Historical developer claims and unchecked recipes remain separate from actual analysis checks.

