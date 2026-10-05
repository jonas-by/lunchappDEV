# Testing and Validation: 2026-10-05

## Verified manually

- Employee ordering still works after owner-model changes.
- External card login works.
- External meal ordering works.
- External salad ordering works.
- External guest-order navigation is hidden.
- External users can access personal order views.
- Kitchen summary shows external orders.
- Kitchen summary shows cardholder names rather than null employee values.
- Manual Add Lunch action works.
- Lunch payroll report loads and exports.
- External lunch report loads and exports.
- External CSV contains external and invoice references.
- External lunch charges appear in External Accounts.
- External lunch charges affect balances.
- Kiosk Cards page shows balance and outstanding/available values.
- Centered Lunch Kiosk login layout is deployed and visually correct.

## Bugs found and fixed

### Duplicate external meal orders

Cause: unfiltered employee unique constraint treated all external users as one `NULL` employee.

Fix: separate filtered unique employee and external indexes.

### Duplicate external salad orders

Cause: same issue in `SaladOrders`.

Fix: separate filtered unique employee and external indexes.

### Empty 500 responses

The frontend sometimes received a blank HTTP 500. Azure Function logs provided the SQL exception and should remain the preferred debugging source for server errors.

### Wrong kitchen card key

The kitchen API initially referenced `KioskCardID`; the real key is `CardID`.

### Wrong lunch-report API host

The report initially called `/api/lunch-reports` on the Static Web App and received HTML instead of JSON.

Correct host:

```text
https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net
```

## Known limitations

- External orders do not store the exact `CardID` used.
- If an external account has multiple cards, kitchen attribution selects the first active named card.
- Prepaid lunch ordering is not blocked when funds are insufficient; balance may become negative.
- Price administration API is anonymous in the pilot.
- External lunch price administration page is currently English-only.
- No end-user acceptance test has been completed with FINA/payroll or kitchen staff.
- Current testing is thorough developer testing but may reflect habitual workflows.

## Suggested regression tests after future changes

1. Employee meal and salad ordering.
2. Employee guest ordering.
3. External meal and salad ordering for each account mode.
4. Meal and salad cancellation.
5. Manual lunch addition.
6. Kitchen totals and cardholder names.
7. Employee payroll CSV.
8. External CSV and reference fields.
9. Prepaid balance after lunch.
10. Postpaid and Invoice outstanding after lunch.
11. Card tile financial values.
12. Price boundary test across two effective dates.
