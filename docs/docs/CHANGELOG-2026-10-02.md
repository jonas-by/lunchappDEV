# Changelog, 2 October 2026

## Café Kiosk frontend

- Replaced mixed POC and SQL-backed frontend files with a clean working set.
- Standardized the session key as `cafe-kiosk-card-session-v1`.
- Reused the shared card-login API.
- Retained last-five-digit card normalization for reader values such as `0004910435` becoming `10435`.
- Loaded the saved kiosk layout from `/api/kiosk/layouts/default`.
- Submitted purchases through `/api/kiosk/sales`.
- Used UUID request IDs for purchase idempotency.
- Preserved EN, SV and FI support.
- Added a 60-second inactivity timeout.
- Added visible localized purchase errors.
- Preserved the basket after an insufficient-balance or credit-limit rejection.
- Verified employee and external-account purchases.

## Café Kiosk reporting API

Created `kiosk-reports.js` with these routes:

```text
GET /api/kiosk/reports/overview
GET /api/kiosk/reports/transactions
GET /api/kiosk/reports/payroll
GET /api/kiosk/reports/external-invoicing
GET /api/kiosk/reports/export
```

Capabilities:

- Inclusive Finnish calendar-date filtering
- Daily, weekly and monthly overview grouping
- Revenue, purchase count and product quantity
- Employee versus external sales split
- Top-product totals
- Paginated transactions with product lines
- Payroll totals per employee
- External invoice/postpaid totals
- Payroll, external-summary and external-detail CSV exports
- UTF-8 BOM, semicolon delimiter, quoted fields, decimal comma and CRLF output

Fixed an overview failure caused by applying `AT TIME ZONE` directly to a SQL `date`. The date is now converted to `datetime2` first.

## Café Kiosk reporting UI

Created a responsive reporting page with:

- Date presets and custom ranges
- Overview cards and sales trend
- Top-products ranking
- Expandable transaction rows
- Owner and status filters
- Payroll table and CSV export
- External invoicing table and CSV exports
- EN, SV and FI interface

Verified that exported CSV files preserve `Å`, `Ä` and `Ö` correctly in Excel.

## Administration landing page

- Reorganized navigation into daily work, lunch service and Café Kiosk sections.
- Added prominent links to kitchen summary and Café Kiosk reports.
- Added links for product library, layout builder, external accounts and kiosk cards.
- Removed obsolete POC links and the exposed technical file-path block.
- Added isolated `admin-landing.css` so the redesign does not alter other administration pages.
- Extended `admin-i18n.js` with complete Swedish and Finnish vocabulary for the new landing page.

## Lunch kiosk pilot

Created `/lunchkiosk/` as a separate frontend shell while retaining the existing `/user/` ordering implementation.

Included:

- Shared employee card login through `/api/kiosk/card-login`
- Last-five-digit card normalization
- Separate kiosk session key: `lunch-kiosk-session-v1`
- Existing personal-device lunch UI loaded from `/user/`
- Existing lunch, salad, guest-order and order-history behavior
- 60-second inactivity timeout across framed pages
- Explicit logout and session cleanup
- EN, SV and FI preference inheritance

External cards are recognized but blocked for lunch ordering in the pilot. The lunch-order APIs currently require employee ownership fields and should not be tricked into storing external customers as employees.

## Important lesson from today

Always replace related files as a complete, version-consistent set. Mixing POC and SQL-backed generations caused both immediate session redirects and card-recognition failures. Future changes should be delivered as complete files with a manifest, not patch fragments.
