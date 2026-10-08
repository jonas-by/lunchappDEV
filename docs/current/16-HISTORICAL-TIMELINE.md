# Historical timeline

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Authority and safe interpretation

Current frontend/API code, numbered SQL extraction and completed Azure exports outrank restart and handover prose. Next: `lunchappDEV/docs/START-HERE-2026-10-19.md`, 08 handover/changelog, 07, 06, 05 and older material. The 19 October title is a project-record date, future relative to this snapshot, not proof of elapsed work or deployment. A conflict between code and SQL remains a conflict. Blank Azure template/export fields mean **Unknown**, not disabled.

## Chronology with implementation precedence

| Recorded period | Major change/decision | Current-code consequence and historical boundary |
|---|---|---|
| 25 Sep | Existing static/local POC gains separate Azure Function/SQL backend; Git SWA deploy and employees smoke test; Node Functions v4, public DEV endpoints | `lunchapp-api/docs/BUILD-LOG.md`, `lunchapp-api/docs/ARCHITECTURE-DECISIONS.md`; initial SQL nine tables is historical, not full current rebuild. Two repos remain actual downloaded split. |
| 26–28 Sep | Relational rotation; employee numbers to integers; explicit personal Quantity instead of duplicate rows; GuestOrders; API-backed employee/meal/menu/orders/My Orders | `docs/05-sql/DATABASE_CHANGELOG_2026-09-26_to_2026-09-28.md`, `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md`; initial /menu/week route superseded. |
| 29 Sep | MenuCycles with per-cycle week uniqueness, Draft/Published/Archived/date-based current-menu; referenced meals archive; daily kitchen SQL; audit cancellations require stable IDs | `docs/01-changelog/CHANGELOG-2026-09-29.md`, menu/cancellation architecture+migration docs; local anchor and delete/reinsert order model no longer correct for meal orders. |
| 01 Oct | Salads become independent SaladOrders/GuestSaladOrders, not attributes of main orders; salad cancellation/daily/weekly rollout; café six-table sales/line/ledger architecture; employee cards only Employees and external cards only KioskCards | `docs/2026-10-01/CHANGELOG-2026-10-01.md`; experimental add-salads-to-orders.sql is historical design step, independent-salad-orders.sql replaces it. Weekly cancellation implementation still must be read from code. |
| 02 Oct | Clean SQL-backed café replaces mixed POC generation; standardized session, UUID requests, default layout; reporting/CSV; trilingual admin; separate same-origin Lunch Kiosk shell | `docs/docs/CHANGELOG-2026-10-02.md`, bulla README; local Bulla products/order log no longer runtime source; external Lunch Kiosk initially deliberately blocked. |
| 05 Oct | External lunch meal/salad account owner, filtered employee/external uniqueness, kitchen cardholder guess; manual late additions; payroll-count lunch reports; effective dated prices; derived lunch charges merge with stored café/payment ledger | `docs/01-changelog/CHANGELOG-2026-10-05.md`, architecture/database/testing/handover; no fake employee external identities; no stored duplicate LunchPurchase rows. Account-only ownership later superseded by CardID. |
| 06 Oct | Generic ImageAssets + nullable product relation, dedicated private blob container/API streaming, browser crop/reuse, current product refresh merged into café layout, Image Library | `docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md`; supersedes direct browser-SAS/public URL/WebP proposal in older NEXT-SESSION. Meal/salad image integration deliberately absent. |
| 07 Oct | Orders/SaladOrders CardID, card-date-item filtered uniqueness, exact kitchen joins/last5 identity; post-save kiosk logout; café shared balance-view display/server limit locks | `docs/01-changelog/CHANGELOG-2026-10-07.md`, HANDOVER+API/frontend/database/testing; older first-active-card lookup and account-only external order payloads historical. Current My Orders missed this migration. Historical null-card rows explicitly unassigned. |
| 08 Oct | UI consistency packages and documentation assessment, no intentional API/SQL changes; restart task is smoke checks/inventory/doc consolidation | `docs/CHANGELOG-2026-10-08.md`, `lunchappDEV/docs/HANDOVER-2026-10-08.md`; source only partly matches polished-package claims. |
| 19 Oct restart title | Future return-from-vacation guide summarizing 08 state and intended first actions | `docs/START-HERE-2026-10-19.md`; contextual planning date, not a live future release or executed validation record. |

All unprefixed frontend history paths above are relative to `lunchappDEV/`.

## Major evolution and interpretation

The early employee/localStorage POC became SQL-backed directory/meal/guest/menu-cycle ordering, then reasoned kitchen cancellation/reporting, independent salads and SQL Cafe sales/reporting. 05 October added external ownership/derived lunch charges/manual counts; 06 introduced private-backed managed product images; 07 separated external editable ownership by CardID while preserving ExternalAccountID billing and strengthened Cafe funds/credit behavior. 08 is primarily coordinated UI/scroll/toggle wording, not an evidenced API/schema migration.

Older employee-only kiosk, frontend-rotation, account-only uniqueness, direct/public/SAS image proposals and local reporting records are historical or partially superseded, not current authority. Historical schema scripts and first.txt/second.txt differ from the08 numbered extraction; neither initial baseline script rebuilds current schema. No git history was supplied, so chronology is dated project-record evidence, not independently verified commit/deployment time.

`lunchappDEV/docs/START-HERE-2026-10-19.md` is future-dated relative to snapshot08 October and summarizes/restarts intended work; it does not prove a deployment occurred on19 October. Exact historical/source classifications and conflicts are in15/14. Timeline omits cosmetic tweak-by-tweak detail and preserves substantive model/architecture changes.

Evidence: `lunchapp-api/docs/BUILD-LOG.md`, `lunchappDEV/docs/07-handover/DAILY_PROGRESS_2026-09-28.md`, `lunchappDEV/docs/02-architecture/ARCHITECTURE-AND-DECISIONS-2026-10-05.md`, `lunchappDEV/docs/07-handover/DAILY-DOCUMENTATION-2026-10-06.md`, `lunchappDEV/docs/05-sql/DATABASE-CHANGES-2026-10-07.md`, `lunchappDEV/docs/CHANGELOG-2026-10-08.md`, `lunchappDEV/docs/START-HERE-2026-10-19.md`.

