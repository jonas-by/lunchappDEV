# Start Here Tomorrow 2026-10-06

## First task

Implement authoritative funds and credit enforcement for external lunch and salad orders.

## Do not start by editing frontend files

First define and validate the financial delta calculation in the API/database flow.

The ordering frontend submits meals and salads separately with `Promise.all()`. Financial enforcement should treat the user's intended save consistently and avoid one request succeeding while the other fails.

## Questions to resolve before implementation

1. Is one external lunch price charged per meal portion, salad portion, or both according to current business rules?
2. Does replacing a meal with another meal on the same date have zero net financial effect?
3. Does reducing an order immediately free prepaid funds/credit?
4. Should meal and salad saves be combined into one coordinated endpoint or transaction?
5. How should partial failure be prevented when meals and salads are saved concurrently?

## Recommended technical direction

1. Inspect the current external lunch charge view and price lookup.
2. Calculate the existing charge for the card/account and affected date range.
3. Calculate the proposed charge after the submitted changes.
4. Set:

```text
additionalRequiredCents = max(0, proposedChargeCents - existingChargeCents)
```

5. Lock the external account.
6. Read `dbo.vwExternalAccountBalances`.
7. Apply the same rules used by Café sales:
   - Prepaid: additional required must fit available prepaid balance.
   - Postpaid/Invoice: additional required must fit remaining credit.
8. Apply order changes only if the check succeeds.
9. Return clear HTTP 409 responses with available, required, and shortfall values.

## Files likely needed

### API

- `orders.js`
- `salad-orders.js`
- `external-lunch-prices.js`
- Current external lunch charge/report view definitions

### Frontend

- `/user/lunch.js`
- Possibly `/lunchkiosk/kiosk-shell.js` only if save orchestration changes

### SQL/data definitions

- `dbo.vwExternalAccountBalances`
- `dbo.vwExternalLunchChargeEntries`
- External lunch price table/view
- Relevant unique indexes and cancellation tables

## Quick regression baseline

Before new changes, confirm:

- Two cards on one account only see their own orders.
- CardID is populated on new external orders and salads.
- Lunch Kiosk logs out after successful save.
- Kitchen shows cardholder and last five card digits.
- Café prepaid over-limit basket disables Buy.

## Side backlog, do not drift into first

- Product edit dialog image scaling.
- `/bulla/` to `/cafe/` rename.
- Admin folder restructuring.
- Entra authorization.

One financial workflow at a time. We have tested the alternative approach extensively. 😅
