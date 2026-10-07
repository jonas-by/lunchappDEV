# Frontend Changes 2026-10-06

## `/lunchkiosk/card-login.js`

- Stores the database `cardId` for external/temp cards in the shared user session.
- Requires both ExternalAccountID and CardID for a valid external login.
- Keeps the richer kiosk session for shell-level identity and timeout handling.

## `/user/lunch.js`

- Reads CardID from the current user session.
- Adds CardID to external GET query parameters.
- Adds CardID to external lunch and salad PUT payloads.
- Treats external identity as valid only when both ExternalAccountID and CardID are present.
- Notifies the parent Lunch Kiosk shell after a successful non-guest save.

## `/lunchkiosk/kiosk-shell.js`

- Listens for the successful-save message from the embedded `/user/` page.
- Clears the shared user session and Lunch Kiosk session.
- Returns immediately to the card scanning page.
- Retains the existing inactivity timeout and manual logout.

## `/admin/kitchen.js`

- Displays employee number for employee orders.
- Displays last five card-number digits for external-card orders.
- Searches by cardholder name, employee number, last five card digits, and work task.
- Displays the same external card identifier in the cancellation dialog.

## `/bulla/order.js`

### Header information

- Prepaid accounts show available balance.
- Postpaid and Invoice accounts show available credit.
- Company name remains visible.
- Employee display remains unchanged.

### Basket enforcement UX

- Calculates known available funds from the login session.
- Disables Buy when basket total exceeds available funds.
- Shows available funds and basket total in the footer.
- Shows localized insufficient-balance or credit-limit feedback.
- Retains API-side validation as the final authority.

## Unchanged companion files

Some ZIP packages included complete companion files such as `order.html`, `bulla.css`, and `card-login.js` even when their content did not require a change. This follows the project rule of supplying full replacement packages rather than manual snippets.

## UX backlog

- Reduce the image size in the Café Kiosk product edit dialog in `kiosk-products-admin.html`.
- Preserve aspect ratio and prevent the image from dominating the edit form.
