# Reporting

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Reporting register

### R01 Employee lunch/payroll deduction counts

- **Audience/purpose:** payroll/FINA employee lunch deduction preparation; one portion equals one lunch-count deduction regardless meal/salad (**Frontend UI text/API arithmetic**). Monetary deduction rate/import format **Unknown**.
- **Entry:** `lunchappDEV/admin/lunch-reports.html`, `admin/lunch-reports-ui.js:1-11`, payroll tab. Date presets this/previous month or week.
- **API:** GET `/api/lunch-reports?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD`; required ordered dates regex checked **API**, no calendar validation or maximum range.
- **SQL:** `lunch-reports.js:employeeReport`; Orders EmployeeNo nonnull, SaladOrders EmployeeNo nonnull, both cancellation tables, optional ManualLunchAdjustments, Employees. Direct SQL CTE queries, not an employee report view. Optional table detected via OBJECT_ID.
- **Date basis:** MenuDate BETWEEN endpoints inclusive; cancellation occurrence date is irrelevant — cancel sums grouped per source regardless CancelledAt. Manual adjustment MenuDate included; CreatedAt irrelevant.
- **Inclusion/cancellation:** sum max(gross-canceled,0) meals + salads + manual additions; only positive totals emitted; inactive historical employees not filtered. Guest/external orders/café purchases excluded.
- **Output:** employeeNo/firstName/lastName/employeeName/mealLunches/saladLunches/manualLunches/numberOfLunches and summary. Browser creates BOM UTF-8 semicolon CRLF CSV `lunch-payroll_<from>_<to>.csv`; localized headings employee number/name/number lunches; no EUR amount/period columns inside CSV. Filename captures period.
- **Downstream:** payroll deduction preparation **docs-only intent**; no direct payroll integration, approval, import acknowledgement, export-run persistence, settlement status or re-export protection in code. Actual FINA acceptance **Unknown/deferred** (2026-10-07 handover/testing).
- **Validation:** 2026-10-05 developer report load/export claimed; not rerun here. Cancellation/positive manual count logic verified statically.

### R02 External lunch count export

- **Audience/purpose:** external billing/FINA reconciliation, separate from employee payroll (**Frontend/API**). Count, not invoice money generation.
- **Entry/API:** same Lunch Reports page external tab and GET `/api/lunch-reports`; external CSV created browser-side.
- **SQL:** `lunch-reports.js:externalReport`; Orders/SaladOrders ExternalAccountID nonnull, cancellations of OrderType Employee, ExternalAccounts. Group by billing account; CardID not group key. Null-CardID historical external rows still included.
- **Date/cancellation:** inclusive MenuDate range; net quantities clamped0; fully canceled excluded; no IsActive/validity/accountMode filter. Both meal and salad count independently.
- **Output:** externalAccountId/displayName/companyName/externalReference/invoiceReference/mealLunches/saladLunches/numberOfLunches. CSV `external-lunches_<from>_<to>.csv` headers localized account/company/count plus fixed English External reference/Invoice reference. Export omits numeric account ID and amount/unit price; CSV period only filename.
- **Downstream:** manual account/invoice reference matching **docs-only**; actual invoices, VAT, rate/rounding, batching, settlement import spec **Unknown**. Not same report as café external-invoicing; not a complete combined lunch+café financial export.
- **Validation:** developer export/reference checks reported 2026-10-05; two-card ownership tests 2026-10-07 don't independently validate this export with finance.

### R03 Guest lunch summary

- **Audience/purpose:** kitchen/administrative oversight of non-payroll guest portions, distinct employee-hosted workflow.
- **Entry/API:** Lunch Reports guest summary KPI (no dedicated export) from same GET `/api/lunch-reports`.
- **SQL:** `guestReport`: GuestOrders + meal Guest cancellations, GuestSaladOrders + salad Guest cancellations. No host/group/task breakdown here; kitchen detail offers WorkTask.
- **Date/cancellation:** inclusive MenuDate; net clamped0; all hosts including inactive, no owner joins/filter.
- **Output/downstream:** `{mealLunches,saladLunches,totalLunches}` and summary.guestLunches; browser KPI. Work-task accounting allocation/report recipient **Unknown**; no guest payroll row or direct invoicing export.

### R04 Kitchen daily/order traceability

- **Audience/purpose:** kitchen staff portion preparation, employee/external/guest lookup, reasoned cancellation, printout (**operational intent**, no actual collection status).
- **Entry:** `admin/kitchen-summary.html` + `admin/kitchen.js:23-35`. Browser-selected day defaults local today. Search/filter/group accordions; print expands content via page behavior/styles.
- **API:** GET `/api/kitchen/orders?dateFrom=<day>&dateTo=<day>`; API supports broader ordered regexdate range.
- **SQL:** kitchen-orders unified UNION ALL across Orders, GuestOrders, SaladOrders, GuestSaladOrders; Meals/Salads labels, Employees, ExternalAccounts, KioskCards CardID exact join; both cancellation tables. Current active source SQL, not legacy local browser data.
- **Date/cancellation:** MenuDate inclusive. Net quantity source−sum cancels, positive rows only. Non-guest external rows carry orderType employee; actual EmployeeNo nullable. CardNumberLast5 conveys external card identity. Guest WorkTask carried.
- **Output:** per-source IDs,itemType,orderType,MenuDate,employeeNo/cardNumberLast5/employeeName,mealId (`S<id>` for salad),saladId,names/category,quantity/activeQuantity,canCancel,workTask,orderTime; summary orderRows/portions/meals/salads. Does NOT expose original/canceled sums on active rows or full cancellation history.
- **Action/downstream:** POST kitchen/order-cancellations or kitchen/salad-order-cancellations and refresh. Print/browser consumption; no kitchen system/export integration or immutable served event. Employee Add Lunch is instead Employee Admin → ManualLunchAdjustments and not part of this production total.
- **Unknown:** staff acceptance, weekday operating assumptions, print distribution/retention. Exact external fallback names for null-card history remain account-level.

### R05 Kitchen ISO-week summary/statistics

- **Audience/purpose:** kitchen planning/performance, meal cancellation percentage/reasons, gross salad popularity.
- **Entry:** `admin/weekly-summary.html` + `lunchappDEV/admin/weekly-summary.js`; `lunchappDEV/admin/statistics.js` is another source caller using relative `/api` host (deployment binding unknown). UI weekdays only; API retains all seven days.
- **API:** GET `/api/kitchen/weekly-summary?week=YYYY-Www` validates pattern/week1..53; no check week53 exists for year.
- **SQL:** kitchen-weekly-summary.js CTEs Orders/GuestOrders + OrderCancellations for ordered/net/canceled meals; SaladOrders/GuestSaladOrders for gross salad sums/popularity; Salads names. Cancellation reasons from OrderCancellations tied by source MenuDate. No SaladOrderCancellations usage.
- **Dates:** ISO Monday–Sunday computed UTC from Jan4; MenuDate inclusive. Detail canceledAt not date basis.
- **Output:** seven daily zero-filled rows ordered/served/cancelled/meals/salads/total; totals including cancellationPercent = meal-canceled/meal-ordered, peakDay; saladPopularity; meal cancellationReasons; `cancellations: []` always. `served` = derived remaining meals; peakDay.served equals total meals+gross salads, semantically different from daily served.
- **Cancellation discrepancy:** salads not netted and reasons/detail omit salad cancellations, despite implemented cancellation endpoints. Weekly total differs daily/lunch finance after salad cancel. UI note 'not implemented yet' is stale relative global functionality but describes lack of weekly adjustment.
- **Output/downstream:** JSON graphs/table/browser, possible page print; no dedicated API CSV or automated planning integration. Staff feedback/definition of 'served'/KPI acceptance **Unknown**.

### R06 Café overview

- **Audience:** café administrators/finance descriptive completed-sales performance.
- **Entry:** `admin/kioskadmin/kiosk-reports.html` overview tab; `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:20`.
- **API:** GET `/api/kiosk/reports` (default overview) or `/overview`, query from/to optional defaults UTC-month-start and UTC-today; groupBy day(default)/week/month. Calendar dates valid, ordered, inclusive <=370days **API**.
- **SQL:** kiosk-reports.js:getOverview reads KioskSales and KioskSaleLines. Status Completed only; summary avoids sale-header multiplication using per-sale OUTER APPLY line quantity. Trend day/week/month and top20 product ranking by quantity/revenue; product name = MAX snapshot, not immutable current catalog name.
- **Date basis:** SaleTime treated UTC, converted SQL `FLE Standard Time` (Europe/Helsinki in response). Summary local start/end converted to UTC half-open boundaries; trend/products local-date inclusive. Month/week labels may extend outside selection while sums remain limited to selection. No gap-filled zero periods.
- **Cancellation:** no lunch cancellation relevance. Voided/Refunded/PartiallyRefunded sale statuses excluded; supplied API creates only Completed, no refund action. Completed totals not automatically net refunds/ledger credits.
- **Output/downstream:** period/groupBy/timeZone, summary sales cents/trans counts/product quantities employee/external split, trend, topProducts. JSON no-store; UI chart; no overview CSV in API. Actual accounting revenue/VAT treatment **Unknown**.

### R07 Café transaction explorer

- **Audience:** café admin/finance transaction traceability; not owner-specific self-service history.
- **Entry/API:** kiosk reports transactions tab; GET `/api/kiosk/reports/transactions?from=&to=&page=&pageSize=&ownerType=&status=`.
- **SQL:** KioskSales left joins Employees/KioskCards/ExternalAccounts, lines separately read for current page via OPENJSON IDs; current owner/account labels plus sale snapshots. Owner scope supplied filter, not authenticated user.
- **Date/cancellation:** same Helsinki local SaleTime period. No status filter by default includes all SQL statuses. Explicit parser permits Completed or Voided only, cannot explicitly choose SQL Refunded/PartiallyRefunded. Lunch cancellations/ledger adjustments absent.
- **Output:** period,page,pageSize (default50 max200), totalRows, rows with saleTime,status,ownerType,employeeNo,externalAccountId,displayName/company/mode,totalCents,items snapshots. page defaults1 on invalidpositive; past-last empty page returns totalRows0 because window count available only in returned records. Browser may interpret empty page as no results.
- **Downstream:** expandable trace view; GET `/api/kiosk/sales/{id}` separately yields source sale raw details. No transaction CSV selector, undo/refund API, retention policy or external reconciliation proof.

### R08 Café employee payroll amounts

- **Audience/purpose:** payroll/FINA employee café purchase deduction amount, unlike lunch count-based report.
- **Entry/API:** kiosk report payroll tab, GET `/api/kiosk/reports/payroll`; export `/api/kiosk/reports/export?type=payroll&from=&to=`.
- **SQL:** getPayroll KioskSales Completed, OwnerType Employee, EmployeeNo nonnull; Employees LEFT JOIN gives fallback for missing current directory entry; aggregate EmployeeNo and current name. KioskSaleLines not needed for totals; no current product prices recalculation.
- **Date/cancellation:** Helsinki local SaleTime date; completed only; no lunch/cancellation/manual count/ledger included. Missing employee name fallback; inactive employees not filtered.
- **Output:** rows employeeNo,employeeName,transactionCount,totalCents; summary employeeCount/count/cents. API CSV filename `cafe-kiosk-payroll-<from>_<to>.csv`; columns PeriodStart;PeriodEnd;EmployeeNo;EmployeeName;TransactionCount;TotalAmount. TotalAmount fixed2decimal comma EUR; BOM, quoted cells, semicolon, CRLF, attachment/no-store.
- **Downstream:** payroll manually imports/uses CSV **docs-only intended**. Actual import contract, retry prevention, date-close lock, FINA validation **Unknown/deferred**. No payroll money written to database or account ledger on employee sale.

### R09 Café external account invoicing summary

- **Audience:** external finance/invoicing preparation; billing account is ExternalAccountID, not CardID.
- **Entry/API:** kiosk reports external tab; GET `/api/kiosk/reports/external-invoicing?from=&to=&accountMode=Invoice,Postpaid`; API default Invoice; source UI provides Invoice, Postpaid, both. Parser also accepts Prepaid and filters recognized tokens (mixed unknown+valid silently ignores unknown).
- **SQL:** getExternalInvoicing Completed external KioskSales joined current ExternalAccounts and OPENJSON mode list; group account,company/displayName/current mode. No ledger/view/lunch charges/payment/manual adjustment included.
- **Date/cancellation:** Helsinki local SaleTime range; current mode used to decide historic sale inclusion, so changing account mode at balance0 can change report attribution; completed-only status. Refund accounting not netted.
- **Output:** period.accountModes, summary accountCount/trans/cents, rows externalAccountId/displayName/companyName/accountMode/count/totalCents. Export `type=external-summary`: CSV PeriodStart;PeriodEnd;ExternalAccountID;DisplayName;CompanyName;AccountMode;TransactionCount;TotalAmount.
- **Downstream:** manual external invoicing **docs-only**, not invoice generation or clearing ledger. Unlike lunch CSV, café summary omits ExternalReference/InvoiceReference despite current account fields. BusinessID, full billing address, tax/VAT and export recipient specification **Unknown**.

### R10 Café external detailed invoicing export

- **Audience:** finance supporting sale-by-sale external billing evidence/account reconciliation.
- **Entry/API:** external detail export button; GET `/api/kiosk/reports/export?type=external-details&from=&to=&accountMode=`. Not separately registered or exposed as JSON report path.
- **SQL:** getExternalDetails Completed external KioskSales INNER JOIN current ExternalAccounts, LEFT JOIN KioskCards, mode list; ordered account/company then sale time/ID; detail one row per sale, not line item.
- **Date/cancellation:** Helsinki local date for selection, SaleTimeUTC in output; statuses Completed only; same current-mode caveat. Account billing group; current cardHolderName attribution may change after rename/reassignment; no card ID/number in CSV.
- **Output:** `cafe-kiosk-external-details-<from>_<to>.csv`; PeriodStart;PeriodEnd;ExternalAccountID;DisplayName;CompanyName;AccountMode;CardHolderName;SaleID;SaleTimeUTC;TotalAmount. No product lines/lunch entries/physical ledger adjustments or invoice reference.
- **Downstream/unknown:** no invoice number emitted/recorded, mark-billed/reconciliation/settlement automatic process; buyer/card trace changes historically with directory edits.

### R11 External financial balance and combined ledger view

- **Audience:** café/account administrators and finance, customer login balance snapshot; not payroll.
- **Entry:** External Accounts page account tiles/detail; Kiosk Cards tiles and card-login response. API GET `/api/kiosk/external-accounts/{id?}`, `/api/kiosk/cards/{id?}`, POST card-login, GET account `/ledger`.
- **SQL:** vwExternalAccountBalances = physical ledger signed sum minus vwExternalLunchChargeEntries derived sums. Ledger API union physical ExternalAccountLedger and derived meal/salad LunchPurchase; account metadata/current cardcounts. No writes for reading reports.
- **Date basis:** balance entire history/all dates, not date-filtered by UI report period. Physical ledger filtering EntryTime (UTC defaults), virtual lunch EntryTime = midnight MenuDate. dateTo exclusive nextday ensures inclusive date. Ledger limit default200 clamped1..1000, no pagination/cursor/total count; bounded returned list may not sum to displayed entire-history balance.
- **Cancellation:** SQL view net meal/salad quantities; price as-of MenuDate latest valid price; missing price rows omitted. Cancellation changes derived balance retroactively without a refund ledger entry; no immutable lunch charge snapshot.
- **Output:** signed balance, available prepaid, outstanding, credit; ledger entries virtual synthetic negative IDs and descriptions, physical SaleID/references/audit fields. No general ledger CSV in supplied API; query reports display data only.
- **Downstream:** payment/deposit/adjustment management separate append actions; statements/invoice/reversals/export/import and physical-cash receipt/reconciliation conventions **Unknown**. Documented warning never physically insert virtual lunches twice.

### R12 Personal/guest order overview

- **Audience:** employee or external-card holder personal check; guest overview only employee host. Not finance payroll report.
- **Entry:** `user/my-orders.html` + `lunchappDEV/user/my-orders.js`; current browser-local Mon–Fri and calendar month.
- **API/SQL:** `/orders`, `/salad-orders`, `/guest-orders`, `/guest-salad-orders` GETs scoped employee/host or card owner. Date MenuDate inclusive.
- **Cancellation/output:** meal GET net and retained audits; salad GET gross, thus totals overstate active salads after cancel. UI daily rows and personal/guest/week/month totals, names/task; no CSV. Externals skip guests.
- **Known integration discrepancy:** external query builds only externalAccountId and dates, omits required cardId; API400; external My Orders fails despite current ordering page correctly supplying CardID. Developer 2026-10-05 personal-view validation predates mandatory CardID change.
- **Downstream:** self-service display; no proof of payroll money/collected meal. Session identity trust is browser state.

### R13 Historical local browser café report

- **Audience:** POC/demo administrator; **not current Azure financial source**.
- **Entry:** `admin/bulla-report.html` + `lunchappDEV/admin/bulla-report.js`, localStorage `bulla-poc-order-log-v1`. No API route/SQL use.
- **Dates/output:** browser-local selected week/month ranges over timestamped browser history; groups employee totals; CSV bulla-period-history.csv employee number/name/amount, decimalcomma BOMsemicolon. Exact inclusion depends local browser log, not current server Completed/cancellation semantics.
- **Cancellation/downstream:** no authoritative SQL cancellations/ledger reconciliation; cannot substitute for R08/R09. Current deployment exposure/obsolete page retirement **Unknown**; historical source retained, not assumed live.

### R14 Historical local order explorer

- **Audience:** POC/demo kitchen/admin browsing.
- **Entry:** `admin/order-explorer.html` + `lunchappDEV/admin/order-explorer.js` → window.AdminOrderData from `lunchappDEV/admin/order-data.js`.
- **API/SQL:** none; localStorage employee/guest selection records and demo fallback menu/person data. Date selected ISO week, local browser computations; employee/meal views, search/demo toggle and print.
- **Cancellation/output/downstream:** no source cancellation accounting; browser printable grouping; no finance integration. Do not mix these rows with Azure kitchen reports; demo data explicitly nonauthoritative. Deployment exposure/retirement **Unknown**.

## Export controls and interpretation

- **API:** café reports/export read-only; no audit row recording export issuance, billed/settled status, period closure or recipient. **Frontend:** lunch CSV generated from current loaded payload; changing dates without refresh may place new date filename on old payload (**static risk, not runtime-tested**).
- **API:** café dates default based UTC but sale bucketing Helsinki; callers normally supply explicit dates. **Frontend:** lunch UI date presets and order deadlines browser-local; do not silently state all reports use the same timezone.
- **API/SQL view:** net 'served' = remaining ordered quantities, no consumption scan/check-in evidence. Meal+salad counts both charged/count independently; finance approval of this interpretation remains pending.
- **Unknown:** financial report recipients, payroll/FINA validation/signoff, legal/tax handling, reconciliation tie-out, CSV application expectations, import idempotency, refund/void production workflow.
- **Test evidence:** 2026-10-05 manual lunch/report load/export/reference checks and 2026-10-07 two-card/ledger developer checks are documented. Above code/schema observations not live tests. No test/API/database calls performed for this package.

