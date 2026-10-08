# Business rules

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## 1. Owner model and coexistence

| Rule | Enforcement and evidence | Important limit |
|---|---|---|
| Employee meals and external-card meals coexist in Orders; employee and external-card salads coexist in SaladOrders | **API** `orders.js:ownerFrom/putOrders`, `salad-orders.js:owner/put`; **SQL constraint** separate filtered unique employee/date/item and CardID/date/item indexes, foreign keys | SQL columns nullable; no extracted XOR/card-account consistency check for these two tables |
| EmployeeNo identifies employee editable owner; ExternalAccountID must be null; employee card mapping belongs Employees.CardNumber | **API** order owner parsing/inserts; café login/sales search Employees first | Direct SQL does not enforce lunch owner XOR; employee lookup login/sales does not check Active |
| External order editable owner = CardID; financial owner = ExternalAccountID | **API** GET/PUT use CardID filter and validate card belongs account; **SQL constraint** filtered CardID+MenuDate+OrderedMealID/SaladID uniqueness and card/account FKs | FKs individually validate keys, not that card/account match. CardID is required API; nullable SQL supports historical rows |
| Two cards sharing an account have distinct order views, shared billing balance | **API + SQL constraint + SQL view** above; `vwExternalAccountBalances` groups ExternalAccountID | Authorization is caller-provided card/account pair, not binding to verified login |
| Historical external rows with null CardID retained rather than arbitrarily attributed | **operational/docs-only** `docs/05-sql/DATABASE-CHANGES-2026-10-07.md` and daily documentation; **API** present GET CardID scope cannot load those rows | Null-card history still included in account reports/derived charges and kitchen; no backfill routine in source |
| Guests are employee-hosted separate records, not external-card account holders | **API** `lunchapp-api/src/functions/guest-orders.js`, `lunchapp-api/src/functions/guest-salad-orders.js`; distinct GuestOrders/GuestSaladOrders; **Frontend** external guest link hidden/guest mode rejected in `user/lunch.js` | HostEmployeeNo input alone is not caller identity. Guest salad host lacks FK/activity validation |
| orderType Employee in cancellation/kitchen includes external non-guest rows | **API/SQL view** external Orders/SaladOrders use cancellation OrderType Employee | Do not label this discriminator as payroll ownership; actual payroll tests nonnull EmployeeNo |
| External card API only manages external/temporary cards | **API** `lunchapp-api/src/functions/kiosk-cards.js` always External, EmployeeNo null | **SQL constraint** permits Employee or External KioskCards; API convention narrower than schema |
| Card uniqueness within Employees and within KioskCards | **SQL constraint** UX_Employees_CardNumber filtered nonnull; UQ_KioskCards_CardNumber | Across-table uniqueness only **API** kiosk-card create/update checks Employees; employee create/update do not check KioskCards. Employee-first resolution can mask an external mapping |

Sources: `lunchapp-api/src/functions/orders.js:20-59`, `lunchapp-api/src/functions/salad-orders.js:4-9`, `lunchapp-api/src/functions/kiosk-cards.js:107-225`, `kiosk-card-login.js:23-143`, SQL `lunchappDEV/docs/05-sql/03-constraints.csv`, `lunchappDEV/docs/05-sql/04-foreign-keys-2.csv`, `lunchappDEV/docs/05-sql/05-indexes-1.csv`, `lunchappDEV/docs/05-sql/05-indexes-2.csv`.

## 2. Active status and validity

- **API:** employee meal/salad PUT and manual lunch POST require active employee (`COALESCE(Active,1)=1`); guest meal PUT requires `Active=1` specifically. Employee directory also treats null Active as true. Guest salad PUT does not validate host activity/existence.
- **API:** external meal/salad PUT validates account IsActive, inclusive SQL-current-date ValidFrom/ValidUntil and external card IsActive/linkage/validity. GET validates external card, **not external account active/validity**. Employee GET has no employee activity check.
- **API:** café card-login and sale check external card validity against full JavaScript `now`; account validity against UTC date string. Lunch card check compares datetime columns with `CAST(GETDATE() AS date)`: behavior differs for start/end timestamps during a day and from JavaScript UTC date. **Unknown:** business-approved boundary timezone and actual server GETDATE timezone.
- **API:** employee café login/sale lookup lacks Active check. This is narrower than directory/meal PUT behavior; do not describe inactive employee rejection as universally enforced.
- **API + SQL constraint:** validity ordering checked on account/card administration. Account dates are SQL date, card dates datetime2. Active card cannot be assigned inactive account (API); card dates need not fit within account dates.
- **API:** account DELETE deactivates account and active linked cards transactionally; card DELETE deactivates only that card. Account update setting isActive false does not run cascade-to-card operation. Runtime external checks still reject inactive account.
- **API:** financial deposit/payment/adjustment require active account but do not enforce current ValidFrom/ValidUntil; those are management operations, not equivalent to card purchasing.

## 3. Ordering window and deadline

- **Frontend:** daily 08:30 browser-local time lock for effective-today only (`user/lunch.js:60-64`). Friday UI displays current Friday plus next Monday–Friday; weekends display next weekdays. POC Friday simulation remains visible. Browser timezone/clock drives lock; API does not receive an attested clock.
- **API:** meal/salad/guest save validates dates within client replacement range, not ordering cutoff, published menu membership, allowed business weekdays, past/future maximum range, or meal active state. User cannot infer server enforcement from a disabled stepper.
- **API:** employee/external meal quantity each 1..50 and merged date/item cap50. **SQL constraint:** Orders.Quantity 1..50. API preserves canceled quantities by storing requested ACTIVE quantity + previous canceled quantity; the resulting GROSS quantity may exceed SQL cap50 and fail.
- **API:** personal salad each input 1..50, duplicate date/salad summed without final cap; **SQL constraint:** SaladOrders.Quantity <=50 can reject merged result. No active-salad existence prevalidation in personal route; FK handles nonexisting SaladID.
- **API:** guest meals 1..100 per input/merged key; task nonempty <=200; actual calendar date validated. GuestOrders has no extracted quantity upper-bound constraint. Duplicate payload key includes lowercase task, but update reconciliation key excludes task; multiple same date/meal tasks can overwrite the same existing row or generate distinct new rows inconsistently.
- **API:** guest salads merged cap50, active salads required, payload-level WorkTask trunc200/nonblank; **SQL constraint:** quantity1..50 and host/date/salad uniqueness. Unlike guest meals, no active host test; extracted table has no host FK.
- **Frontend/API:** meals and salads saved as separate concurrent PUTs (`user/lunch.js:92`, Promise.all), each own SQL transaction. **Unknown/not implemented:** atomic combined save; partial persistence possible if one fails.

## 4. Replacement and cancellations — retain versus delete distinction

- **API:** kitchen meal/salad cancellation appends audit row; does not decrement/delete source quantity. Positive cancellation quantity, source discriminator/IDs, reason code and caller-supplied cancelledBy required. OTHER needs explanation. Meal quantity defaults1; salad quantity required. Reason enum six: INSUFFICIENT_PORTIONS, EMPLOYEE_REQUEST, EMPLOYEE_ABSENT, WRONG_DISH, KITCHEN_CORRECTION, OTHER.
- **SQL constraint:** both cancellation tables enforce positive quantity and correct one-source-ID shape; FKs NO_ACTION preserve linked source. Meal reason enum also SQL constraint; salad reason enum **API only**. Aggregate cancellation total<=original is **API** serializable row/cancellation locks, not extracted SQL aggregate constraint.
- **API:** meals and guest meals GET subtract cancellations and filter remaining>0. Kitchen daily and lunch reports also subtract both meal and salad cancellations; financial charge view subtracts cancellation sums.
- **API:** meal PUT preserves cancellation-linked source rows; update increases gross to active submitted + canceled. Omitted uncancelled rows are deleted. Omitted canceled rows are retained **without changing gross quantity**, so a partially canceled line omitted from payload retains its previous remaining quantity; omission is not necessarily 'cancel all remaining'. Fully canceled rows remain hidden in active GET.
- **API:** personal/guest salad GET returns gross quantities without cancellation fields. Their PUT unconditionally deletes all in range then reinserts. **SQL constraint:** cancellation NO_ACTION FKs block this delete when any source in range is linked; API generic500. Therefore broad handover/checklist claims cancellation survives save are substantiated for meals but not implemented for salad replacement. No fixes made.
- **API:** weekly kitchen summary subtracts only meal cancellations; salad popularity/totals gross. Its cancellationReasons reads OrderCancellations only; cancellations detail array always empty. 'Served' is derived remaining count, **not actual collection/check-in tracking**.
- **operational/Unknown:** authorized staff may use cancellation workflow; no API role check validates kitchen status and audit actor strings are not verified identity.

## 5. Financial sources: derived lunch charges ≠ physical ledger

- **SQL view:** `vwExternalLunchChargeEntries` combines external Orders and external SaladOrders; each net-active portion is charged once at ExternalLunchPrices rate. Meal and salad portions both independently contribute (not a bundled meal+salad lunch price). SourceType MealOrder/SaladOrder and source ID retained; CardID not output, account is financial owner.
- **SQL view:** effective rate = latest ValidFrom <= MenuDate, tie ordered ExternalLunchPriceID descending. CROSS APPLY suppresses rows with no applicable price — absent price is not an explicit zero-charge row/error. Adding retroactive price can dynamically change historical balances; no per-order immutable price snapshot is stored.
- **API + SQL constraint:** price inserts positive cents, unique ValidFrom,409 duplicate. GET `current` returns newest ValidFrom row, including future dates; name 'current' must not be interpreted as effective-today.
- **SQL view:** account balance = SUM(physical ExternalAccountLedger.AmountCents) − SUM(derived active lunch ChargeCents). Prepaid available returns same signed balance only for Prepaid, else0; outstanding=max(-balance,0). Legacy `ExternalAccounts.BalanceCents` column exists but current API takes view value instead; not the financial source of truth.
- **API:** account ledger GET union adds virtual LunchPurchase lines with negative synthetic ledger IDs. These are display-only, not physical ledger writes. Never insert derived lunch entries into physical ledger merely because they appear on 'ledger' UI: that would double-charge.
- **API + SQL constraint:** café sale makes KioskSales, KioskSaleLines, and for external ownership one negative Purchase linked SaleID in one serializable transaction. Unique RequestID and PurchaseSale indexes support replay safety. Product prices/names snapshotted at sale; SQL LineTotalCents computed UnitPriceCents×Quantity.
- **API:** café external funds checked using shared balance view, including existing derived lunches. Lock relevant account before read/write; Prepaid total<=AvailablePrepaidCents, Postpaid/Invoice total<=max(creditLimit-outstanding,0), missing limit rejected409. Equality accepted; no special Invoice bypass. CreditLimit configured nonnegative; Prepaid null/zero only. **Frontend:** basket Buy disabled from login snapshot; API remains authoritative for actual sale.
- **API/Unknown:** lunch/salad PUT has NO funds/credit check/account financial lock; **docs-only/deferred** enforcement confirmed by 2026-10-07 handover. Shared view balances can turn negative after lunch saves. Café transaction serializability does not make parallel lunch edits follow same account-lock protocol.
- **API:** all product totals in integer cents; product catalog price decimal EUR; external per-portion lunch price integer cents. Employee lunch report emits counts only, employee café payroll emits EUR amount totals. Actual payroll deduction unit cost, accounting booking rules, tax/VAT, settlement recipient formats **Unknown**.
- **SQL constraint/API difference:** free product price allowed0; free external sale total0 passes API financial checks but negative Purchase amount0 violates ledger nonzero check; external zero-total purchase can fail while employee zero-total sale can succeed. No tests executed.

Sources: `lunchappDEV/docs/05-sql/07-module-definitions.csv` (both complete view definitions); API `external-lunch-prices.js:21-68`, `kiosk-external-accounts.js:68-144/317-609`, `lunchapp-api/src/functions/kiosk-sales.js:4-10`.

## 6. Prepaid, Postpaid, Invoice, payments and adjustments

| Workflow/rule | Enforcement | Scope/unknown |
|---|---|---|
| Prepaid positive opening balance permitted, otherwise rejected | API, serializable account + Prepayment insert; SQL constraint valid account mode and nonzero ledger amounts | CreatedBy defaults System; initial prepaid funding not separate evidence of actual cash receipt |
| Deposit = positive Prepayment, prepaid only | API | Active account; date validity unchecked; no request idempotency |
| Payment = positive Payment, Postpaid/Invoice only | API | Positive settlement not invoice creation; overpayment allowed; optional invoiceNumber/reference descriptive |
| Credit/Adjustment = signed nonzero amount plus description/createdBy | API + SQL constraint amount/type | Credit can be negative; both types same sign validation; no automatic linked reversal exposed |
| Mode cannot change while view balance nonzero | API | Read-then-update, not serializable financial lock in updateAccount; no extracted SQL mode-change constraint |
| Invoice and Postpaid café purchases both hard-limited | API | Limit null blocks; prepaid existing positive credit cannot be configured except0/null |
| Ledger Purchase needs SaleID; Reversal needs reverse link; cannot self-reverse; one reversal target index | SQL constraint | Schema supports Invoice/Refund/Reversal and refunded statuses, but no supplied API endpoint creates those workflows |
| Manual employee Add Lunch is positive count only | API + SQL constraint | ManualLunchAdjustments increases lunch payroll count; no guest/external charge/kitchen production record; no negative/edit/delete endpoint |
| Export does not settle or mark invoices processed | API/read-only reports | Downstream posting/reconciliation/approval/idempotent import Unknown |

## 7. Libraries, menu cycles and editability

- **API:** meal/salad/product DELETE is soft archival/deactivation by default; salad/product have no hard-delete route. Meal historical joins generally don't filter active, preserving readable names; library list excludes archived by default.
- **API:** archived meals cannot be newly assigned through menu-week PUT; **SQL constraint:** only existence FK, not Active. Meal order PUT checks existence, not active/menu assignment. Personal salad PUT similarly may insert inactive salad; guest salad PUT rejects inactive.
- **API + SQL constraint:** menu cycle numberOfWeeks1..8; weekdays1..5; menu week1..8; day/meal assignment unique. **API:** start date valid Monday, duplicate StartDate precheck; **SQL constraint:** no Monday/StartDate uniqueness in extraction.
- **API:** current menu picks newest Published start<=requested date, rotation repeats indefinitely; future Published does not take over early. No end-date data or fixed four-week current assumption.
- **API:** POST initializes every week/day transactionally. PUT publication transition validates all weeks, each weekday has at least one assigned meal, no archived meals. **Enforcement gap API:** POST allows status Published without completeness validation; editing existing Published weeks can empty days without republish validation.
- **API:** archived cycle's week assignments cannot edit; metadata PUT has no Archived status prohibition and can change name/start/status. 'Archived read-only' claims are only partly enforced.
- **API:** cycle weekcount immutable after creation, but cycle StartDate can change. **Unknown:** business approval/lock of already ordered periods; orders store MenuDate/meal independent of cycle ID.
- **API/SQL discrepancy:** meal hard-delete precheck queries nonexistent source MealID columns; refer OrderedMealID current schema. Hard employee delete precheck covers only meals/guests, not other referencing tables; SQL may reject other references and generic500 rather than planned409.

## 8. Images and lifecycle

- **API:** multipart max5MiB; allowed declared JPEG/PNG/WebP/GIF; buffer upload under products/randomUUID.ext. File basename sanitized for metadata/header; SQL metadata FileSize actual buffer length, Width/Height NULL. No API image decoding/resize/crop/dimension enforcement.
- **Frontend:** crop before upload in Product Library; uploading creates reusable shared asset before product save. Cancelling product dialog after upload leaves unused library asset intentionally (**operational/docs** 2026-10-06 daily note).
- **API + SQL constraint:** product references ImageAssets by FK; mapped product prefers `/api/images/{id}/content`, retains legacy URL separately. Layout endpoint uses legacy ImageUrl; café merges refreshed products route to get managed image.
- **Azure/operational:** exported storage accounts deny public blob access; dated handover identifies private images container. **API:** content endpoint anonymous, buffers private download and returns public one-hour cache. Private storage does not mean authenticated API serving.
- **API:** deletion counts all product references, including inactive, refuses409 in use; deletes blob then metadata permanently; no soft-delete column/workflow. No cross-service transaction; failure/assignment race can leave broken metadata/image reference. SQL FK can block metadata delete after blob removal. Upload-error cleanup is best-effort; no scheduled orphan cleanup in supplied source.

## 9. Historical discrepancies and current interpretation

1. `docs/docs/CURRENT-ARCHITECTURE.md`: employee-only lunch kiosk/external ownership still needed → superseded by current CardID code and 2026-10-07 changes.
2. 2026-10-05 testing notes: external orders lack exact CardID and kitchen picks first card → superseded; current exact CardID joins, nullable unbackfilled history remains.
3. 2026-10-05 handover 'lunch entries in ledger' → virtual display entries, not physical ledger; same handover warns not to insert derived charges.
4. Weekly UI says salad cancellations 'not implemented yet' → cancellation endpoint/table and daily/report finance subtraction implemented, weekly summary still ignores them.
5. Archived cycle read-only checklist → week edits blocked, metadata edits not blocked.
6. Entra role and app-group design → planned, not implemented in supplied code; 2026-10-08 explicitly revisits later.
7. Whole-state 'complete and validated' → two-card ownership developer validation documented, café direct API/concurrency, FINA/payroll acceptance and final UI smoke tests still recommended/deferred.
8. SQL first.txt/second.txt 2026-10-07 early extracts lack CardID → current 2026-10-08 numbered CSV includes it; do not use older extracts/migrations as schema.
9. Schema permits refunded sale statuses; transactions filter parser accepts only Completed/Voided, completed-only reports ignore refunded/partially-refunded; no supplied refund endpoint.

## 10. Unknowns and documentation boundaries

Business-approved payroll rate/import file specification; FINA approval and invoicing recipient process; business timezone for card validity; deployment commit parity and live API runtime; Easy Auth/Entra tenant app-role mappings; actual SQL application principal/least privilege; live container access policy beyond exported account setting/daily notes; backup retention/orphan recovery; workflow handling of partial meal/salad saves; financial net-delta enforcement for editable lunch; old null-card attribution remediation; production report reconciliation and duplicated export import control. These are **Unknown** or explicitly **docs-only/deferred**, not silently implemented.

## Frontend reconciliation supplement

- **Frontend:** `user/lunch.js:total()` excludes salad selections in the ordering-page summary; independent frontend static validation reports a salad-only selection totals0 there. This is a presentation/count discrepancy, not proof salad PUT failed or that authoritative lunch-report SQL excludes salads (it includes them). See 07-CURRENT-FRONTEND-STRUCTURE.md and 06-CURRENT-API-SURFACE.md for full call reconciliation and validation evidence.
- **Frontend/documentation-only:** snapshot actual Café admin folder is admin/kioskadmin, not admin/kioskproducts mentioned in final UI change documents. Missing entry references and CSS/action presentation mismatches are centralized in frontend findings; no source path changes made.
- **API:** guest salad host is only numeric-positive validated; no active-host query/FK. Existing active-host-protection documentation applies to guest meals, not guest salads.


## Enforcement summary and operational vocabulary

Employee lunch/salad and guest lunch/salad are independent quantity sources. External personal orders coexist with employee orders, but guest records never become external billing owners. Meals and salads count as separate portions; “served” in reporting is net remaining order quantity, not actual consumption. Payroll/FINA (financial administration), Café/Bulla (current runtime folder), lunchkiosk (shared lunch shell), workTask/WorkTask (guest project/business task), and EN/SV/FI UI names retain supplied English/Swedish/Finnish vocabulary.

Enforcement must be read per rule: frontend clock/guest hiding/archived-week editing are UI behavior; API validates supplied owner linkage and individual funds logic; SQL checks/FKs/indexes constrain records; SQL views derive historical financial values; operational/doc-only assumptions require acceptance. Recommendations are not implemented rules. No identity or role proof is supplied.

Direct SQL can differ from API invariants: nullable lunch owner columns have no XOR check, logical employee links lack FKs, cancellation total bound is API-only, Monday/StartDate uniqueness is API-only, and salad cancellation reason enum is API-only. These limitations remain explicit in documents 03/05/06/14.

