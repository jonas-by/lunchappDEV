# Café Kiosk clean rebuild

## Frontend
Copy all files from `frontend/` into the `bulla/` folder. Delete the old `demo-users.js` and `bulla-demo-layout.css`; they are not used.

## API
`api/kiosk-card-login.js` is the complete card-login Function. Deploy it only if the Function App does not already contain the last-five-digit normalization.

The existing deployed `kiosk-layouts.js` and `kiosk-sales.js` remain required. They are not frontend files and were not part of the broken POC folder.

Included behavior:
- SQL-backed card login
- Last-five-digit card normalization
- Shared `cafe-kiosk-card-session-v1` session key
- SQL-backed default layout
- SQL-backed sales
- UUID request IDs for idempotency
- Employee and guest/external accounts
- EN/SV/FI
- 60-second timeout
- Visible localized insufficient balance and credit-limit errors
