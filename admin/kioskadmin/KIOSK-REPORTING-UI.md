# Café Kiosk Reporting UI

Copy these three complete files into `/kioskadmin/`:

- `kiosk-reports.html`
- `kiosk-reports-ui.js`
- `kiosk-reports.css`

The page expects the reporting API at:

```text
https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk/reports
```

Features:

- Today, current/previous week, and current/previous month presets
- Custom date range
- Daily, weekly, and monthly overview grouping
- Revenue and sales summary cards
- Trend chart without external chart libraries
- Top products
- Paginated expandable transactions
- Employee/external and status filters
- Payroll totals and CSV export
- External invoicing totals, account-mode filter, summary CSV and detail CSV
- EN/SV/FI interface

The back link points to `../index.html`, matching the current `/kioskadmin/` folder convention.

No separate POC files or external JavaScript libraries are required.
