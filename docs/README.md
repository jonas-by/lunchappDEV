# Lunch App and Café Kiosk handover

Date: 2026-10-02

This package records the working baseline reached today, the important architectural decisions, deployment locations, known limitations and the recommended starting point for the next session.

## Current status

The following workflows were tested successfully today:

- Café Kiosk card login using shared employee and external card data
- Last-five-digit card-reader normalization
- Café Kiosk product layout and purchases
- Prepaid balance rejection with a visible localized warning
- Café Kiosk reporting overview
- Transaction reporting with product-line details
- Payroll totals per employee
- External-invoicing totals
- CSV export with semicolon delimiters, decimal commas and Nordic characters
- Trilingual administration landing page
- Lunch kiosk employee card login
- Lunch kiosk reuse of the existing personal lunch-ordering UI
- Lunch kiosk 60-second inactivity logout

## Documentation map

- `docs/CHANGELOG-2026-10-02.md`: detailed record of today's work
- `docs/CURRENT-ARCHITECTURE.md`: folders, APIs, sessions and data ownership
- `docs/NEXT-SESSION.md`: ordered next steps and warnings against side quests
- `docs/ENTRA-ACCESS-DESIGN.md`: recommended authentication and authorization model
- `docs/TEST-PLAN.md`: pilot checklist for next week
- `sql/SQL-CHANGES-2026-10-02.sql`: SQL change record and verification queries

## Start here next time

1. Commit and tag the current working baseline.
2. Fix and formalize guest-lunch ordering ownership and reporting.
3. Build the proper Azure Blob product-image library.
4. Add Microsoft Entra ID authentication and group-based administration access.
5. Only after those are stable, revisit scheduled reports.

Do not start by rebuilding the Café Kiosk frontend. It works. Leave the functioning toaster alone.
