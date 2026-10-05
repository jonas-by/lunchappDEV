# Hey you two: start here tomorrow

Date prepared: 2026-10-01

Do not start a new side quest before completing this list.

## Immediate first task

### Fix the Cards Admin UI to match the final card model

The APIs were corrected at the end of the day:

- Employee cards live only in `dbo.Employees.CardNumber`
- Employee cards are managed in Employee Admin
- `dbo.KioskCards` is only for external and temporary cards

However, the current `kioskadmin/kiosk-cards-admin.html` and `kioskadmin/kiosk-cards-admin.js` were created before that correction. They still show an owner-type selector and employee-number fields.

Tomorrow's first deliverable:

1. Rename the page visually from **Kiosk cards** to **External cards**.
2. Remove the Employee/External owner selector.
3. Remove the employee-number field.
4. Always require an external account.
5. Send this payload to `/api/kiosk/cards`:

```json
{
  "cardNumber": "90017",
  "externalAccountId": 8,
  "displayNameOverride": "Supplier visitor card",
  "isActive": true,
  "validFrom": "2026-10-01T00:00:00Z",
  "validUntil": "2026-12-31T23:59:59Z"
}
```

6. Update the main admin card label from **Café Kiosk cards** to **External cards**.
7. Smoke-test creating, editing, deactivating and logging in with an external card.

## Verify today's final API deployment

Before further coding, test:

```http
POST /api/kiosk/card-login
```

Employee card test:

- Use a card number already stored in `dbo.Employees.CardNumber`
- Expected response: `ownerType: employee`
- No row should be required in `dbo.KioskCards`

External card test:

- Create an external account
- Create an external card through the API or corrected admin UI
- Expected response: `ownerType: external`
- Verify account mode and balance are returned

Also verify that creating an external card with an employee card number returns HTTP 409.

## Second task

### Convert Café Kiosk product administration to the API

Current product administration is still the localStorage POC.

Replace localStorage usage with:

```text
GET    /api/kiosk/products?includeInactive=true
POST   /api/kiosk/products
PUT    /api/kiosk/products/{id}
DELETE /api/kiosk/products/{id}
```

Preserve:

- EN, SV and FI names
- Price in cents
- Active status
- Sort order
- Icon fallback
- Product image field

Do not store Base64 images in SQL. Keep `ImageUrl` as the production model. Blob upload can be handled later if necessary.

## Third task

### Build the Café Kiosk sales API

Only begin this after External Cards Admin and Products Admin work end to end.

The sales API must:

- Accept `cardNumber` or `cardId` plus product IDs and quantities
- Resolve the card server-side
- Re-read active products and prices from SQL
- Calculate totals server-side
- Reject inactive products
- Create `KioskSales` and `KioskSaleLines` in one transaction
- For external accounts, insert a negative `Purchase` ledger entry
- Enforce prepaid balance
- Enforce postpaid/invoice credit limit
- Return sale ID, total, and updated balance/outstanding amount
- Never trust prices or totals from the browser

Suggested route:

```text
POST /api/kiosk/sales
```

Suggested request:

```json
{
  "cardNumber": "90017",
  "lines": [
    {
      "productId": 3,
      "quantity": 2
    }
  ]
}
```

## Then, and only then

Convert the user-facing Café Kiosk POC:

1. Card login uses `/api/kiosk/card-login`
2. Products load from `/api/kiosk/products`
3. Checkout posts to `/api/kiosk/sales`
4. Prepaid cards show available balance
5. Postpaid/invoice cards show outstanding amount
6. Employee purchases snapshot `EmployeeNo`
7. External purchases post to the ledger

## Do not forget

- The folder is `kioskadmin/` relative to the main admin `index.html`.
- Employee cards are not duplicated in `dbo.KioskCards`.
- `dbo.KioskCards` is external/temporary cards only.
- `kitchen-weekly-summary.js` is the Function App file.
- Browser-side `weekly-summary.js` belongs only in the web project.
- Salad orders are independent order items, not attributes of meals.
- The working name is **Café Kiosk**. **Baltic Café** remains a possible future name.

## Definition of a productive tomorrow

Tomorrow is successful if:

- External Cards Admin matches the final API model
- External card login works end to end
- Product Admin uses SQL through the API
- `kiosk-sales.js` is at least designed and preferably deployed

If a shiny unrelated dashboard appears before those are done, somebody has wandered off again.
