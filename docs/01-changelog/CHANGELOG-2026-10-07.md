# Changelog 2026-10-06

## Added

- `CardID` support for external rows in `dbo.Orders` and `dbo.SaladOrders`.
- Card-to-account validation in lunch and salad order APIs.
- Per-card order ownership for external lunch and salad ordering.
- Automatic Lunch Kiosk logout after successful save.
- Exact external cardholder resolution in the kitchen API.
- Last five card-number digits in the kitchen order view, search, and cancellation dialog.
- Available-credit value in the Café Kiosk login response.
- Prepaid balance and postpaid/invoice available-credit display in the Café Kiosk header.
- Frontend funds check in the Café Kiosk basket.
- Transactional server-side funds and credit enforcement in the Café sales API.

## Changed

- External order GET and PUT scope changed from `ExternalAccountID` to `CardID`.
- Kitchen cardholder lookup changed from account-level `TOP (1)` guessing to exact CardID joins.
- External order uniqueness changed from account/date/item to card/date/item.
- Café purchase balance checks now use `dbo.vwExternalAccountBalances` instead of summing ledger rows directly.
- Postpaid and Invoice accounts now hard-block purchases beyond available credit.

## Fixed

- Separate cards on one external account seeing and editing each other's lunch orders.
- External order rows being inserted with `CardID = NULL`.
- Lunch Kiosk remaining signed in after an order was saved.
- Kitchen UI displaying `null` where employee number is absent for external-card orders.
- Kitchen SQL `UNION ALL` column mismatch introduced during card-number display work.
- Café Kiosk no longer showing available funds/credit for external cards.
- Prepaid Café Kiosk users being able to build a basket above the available balance without immediate feedback.

## Deferred

- Funds and credit enforcement for external lunch and salad orders.
- Payroll and FINA validation.
- Kitchen operational feedback.
- Scale down the product image in the Café Kiosk product edit dialog.
- Rename `/bulla/` to `/cafe/`.
- Admin directory cleanup.
- Entra ID and role-based authorization.
