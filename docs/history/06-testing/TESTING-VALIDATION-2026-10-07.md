# Testing and Validation 2026-10-07

## External lunch CardID validation

Validated using two external cards connected to the same account.

Expected and observed:

- First card created its own meal order.
- Second card created a different meal order.
- Database rows contained the correct ExternalAccountID and separate CardID values.
- First card did not see the second card's order.
- Second card did not see the first card's order.
- Kitchen view displayed the correct cardholder for each order.

## Lunch Kiosk logout validation

Expected:

1. Scan card.
2. Save a normal lunch order.
3. API requests complete successfully.
4. Embedded user page notifies shell.
5. Shell clears sessions and returns to card scan.

This behaviour was confirmed during card-specific ordering tests.

## Kitchen identity validation

Expected:

- Employee orders show employee number.
- External orders show last five card-number digits.
- Search finds external orders using those digits.
- Cancellation dialog uses the same identifier.

## Café funds display validation

Prepaid test account displayed:

```text
Prepaid · Balance €1.00 · <company/account name>
```

A €1.30 basket with €1.00 available showed:

```text
Available €1.00 · Basket €1.30
```

and Buy was disabled.

## Café ledger integration validation

A café purchase was verified in both tables:

- `dbo.KioskSales`: completed external sale with CardID, ExternalAccountID, and TotalCents.
- `dbo.ExternalAccountLedger`: matching negative Purchase amount linked by SaleID.

This confirms that Café purchases flow into the shared balance model.

## API enforcement validation still recommended

Frontend blocking is confirmed. Also perform a direct or manipulated API request above available funds to confirm the API returns HTTP 409 and does not create sale or ledger rows.

Suggested tests:

### Prepaid

- Basket below balance: accepted.
- Basket equal to balance: accepted.
- Basket above balance: rejected.

### Postpaid and Invoice

- Basket below remaining credit: accepted.
- Basket equal to remaining credit: accepted.
- Basket above remaining credit: rejected.
- Missing credit limit: rejected.

### Concurrency

Submit two simultaneous purchases whose combined value exceeds remaining funds. Only one request should succeed.

### Employee

Employee purchases should remain unaffected.

## Regression checks

- Employee lunch ordering.
- Guest lunch and salad ordering.
- External lunch cancellation.
- Kitchen cancellation workflow.
- Café purchase completion and logout.
- External account reporting.
- Payroll reporting.

