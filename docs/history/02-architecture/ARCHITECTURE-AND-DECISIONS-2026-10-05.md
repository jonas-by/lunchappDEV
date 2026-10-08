# Architecture and Decisions: 2026-10-05

## Preserve history instead of rewriting it

Normal orders, cancellations, and manual additions remain separate concepts.

- Orders represent what was ordered.
- Cancellations represent later reductions.
- Manual lunch adjustments represent administrative post-deadline additions.

This keeps audit history and prevents operational corrections from being disguised as normal employee orders.

## One lunch equals one payroll unit

Meals, soups, vegetarian salads, and other lunch types all count as one lunch unit per quantity for payroll purposes.

Payroll does not need dish-level pricing. The final payroll export intentionally contains only employee identity and number of lunches.

## Employees and external accounts are separate reporting audiences

- Employee lunches belong in payroll deduction reporting.
- External lunches belong in external account and invoicing reporting.
- Guest lunches remain separate and are not included in employee payroll without an explicit later business rule.

## External account modes share one financial model

All external lunch purchases have the same effective price and appear in the external account ledger.

- Prepaid uses the positive balance as available value.
- Postpaid and Invoice use negative balance as outstanding debt.

The same derived charge mechanism supports all three modes.

## Effective-dated prices

Lunch prices only go forward. Historical prices are immutable.

A price change is created as a new row with a new effective date. Orders are valued using the price valid on their menu date.

## Derived lunch charges instead of writing ledger transactions

External lunch charges are calculated from current effective orders instead of inserted into the financial ledger.

This decision avoids:

- Duplicate charges on repeated PUT requests
- Reconciliation logic after order edits
- Reversal-entry proliferation for normal order changes

The external account ledger endpoint presents derived lunch entries together with stored Café and payment entries.

## External cardholder attribution

Kitchen staff need a person's name, not an invoicing company name. Therefore kitchen views prefer `CardHolderName`.

Current limitation: orders store only `ExternalAccountID`. If one account has several cards, the exact ordering card cannot be identified reliably.

High-priority follow-up:

```text
Store CardID on Orders and SaladOrders for external orders.
```

## Admin information architecture

People administration is shared across Lunch Service and Café Kiosk. Employee Administration, External Accounts, and Kiosk Cards therefore belong under one People and Access section rather than being split by service.

Reports stay under Operations and Reporting. Price maintenance belongs under Finance Settings.

## Pilot security boundary

The current Function APIs still use `authLevel: anonymous`. This matches the pilot architecture but is not the final production authorization model.

Planned direction:

- Entra ID for administration and kitchen access
- Role-based authorization for sensitive financial and price endpoints
- Card-based kiosk sessions for operational ordering
