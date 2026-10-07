# LunchApp Documentation

This package documents the LunchApp, Lunch Kiosk, Kitchen, and Café Kiosk work completed during the session recorded as **2026-10-06**.

## Folder structure

```text
00-overview/
01-changelog/
02-architecture/
03-api/
04-frontend/
05-sql/
06-testing/
07-handover/
```

## Session outcome

The work completed the high-priority CardID architecture for external lunch ordering, restored and improved external account information in the Café Kiosk, and added funds and credit enforcement for café purchases.

Key results:

- External lunch and salad orders now identify the exact card used.
- Multiple cards belonging to one external account have separate editable order views.
- The Lunch Kiosk logs out immediately after a successful save.
- Kitchen staff see the exact external cardholder and the last five digits of the card number.
- Café Kiosk users see prepaid balance or remaining credit.
- Café purchases are blocked when prepaid funds or postpaid/invoice credit are insufficient.
- The shared external account ledger and balance view remain the authoritative financial source.

## Important paths

- General administration frontend: `/admin/`
- Café kiosk administration frontend: `/admin/kioskadmin/`
- Lunch kiosk shell: `/lunchkiosk/`
- Shared employee/external lunch-ordering frontend: `/user/`
- Café kiosk frontend: `/bulla/`
- API source: `/api/`

## Naming cleanup backlog

- Rename `/bulla/` to `/cafe/` later.
- Review the split between `/admin/` and `/admin/kioskadmin/` later.
- Do not perform either cleanup while financial and ordering functionality is still being stabilized.
