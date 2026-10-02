# Lunch kiosk pilot

Copy the following files into `/lunchkiosk/`:

- `index.html` (rename `lunchkiosk-index.html`)
- `card-login.js`
- `order.html` (rename `lunchkiosk-order.html`)
- `kiosk-shell.js`
- `lunchkiosk.css`

The kiosk uses the existing `/user/` ordering pages inside a same-origin shell. This preserves the current lunch ordering layout and API behavior while adding card login, explicit logout and a 60-second inactivity timeout.

## Supported in this pilot

- Employees from the shared Café Kiosk card-login API
- Last-five-digit card normalization
- Existing personal lunch, salad, guest lunch and order-history functionality
- EN/SV/FI preference inherited by `/user/`
- 60-second timeout across pages loaded in the ordering frame
- Separate kiosk session key

## External accounts

External cards are recognized by the shared card-login API but deliberately blocked with a localized message. The existing lunch-order APIs require `employeeNo` or `hostEmployeeNo`; they do not yet have an external-account owner model. Enabling external lunch ordering safely requires backend and database work. Guest lunch ordering must remain unavailable to external accounts when that support is added.

## Future split

The `/lunchkiosk/` shell is self-contained and can later move to its own Static Web App. Its only current frontend dependency is the relative `../user/` page set.
