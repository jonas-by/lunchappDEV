# Café Kiosk card-number normalization

The card reader may return a longer numeric string. The kiosk now strips non-digits and uses the final five digits.

Example: `0004910435` becomes `10435`.

Deploy:

- `card-login.js` with the kiosk frontend.
- `kiosk-card-login.js` to the Azure Function App.
- `kiosk-sales.js` to the Azure Function App.

Normalization exists in both the frontend and APIs deliberately. The frontend sends the intended value, while both APIs remain safe for other callers.
