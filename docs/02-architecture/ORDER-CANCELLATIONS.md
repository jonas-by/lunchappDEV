# Order-cancellation architecture

## Principle

Kitchen cancellations do not delete the original order. The source order remains intact and one or more cancellation records reduce the active quantity.

```text
ActiveQuantity = OriginalQuantity - SUM(Cancellation.Quantity)
```

## Supported order types

- Employee order, linked through `OrderID`
- Guest order, linked through `GuestOrderID`

Exactly one source reference is populated for each cancellation.

## Reason codes

- `INSUFFICIENT_PORTIONS`
- `EMPLOYEE_REQUEST`
- `EMPLOYEE_ABSENT`
- `WRONG_DISH`
- `KITCHEN_CORRECTION`
- `OTHER`

`OTHER` requires explanatory text in the API.

## Transaction rules

The cancellation API uses a serializable transaction and locking to prevent two simultaneous requests from cancelling more than the active quantity.

The API:

1. Locks and loads the source order.
2. Sums previous cancellations.
3. Calculates available quantity.
4. Rejects over-cancellation or an already fully cancelled order.
5. Inserts the cancellation.
6. Returns original, cancelled, and active quantities.

## Order-save compatibility

The original order APIs previously deleted all rows in a date range and reinserted them. Foreign keys from `OrderCancellations` correctly blocked that behaviour.

The updated APIs now reconcile rows:

- preserve existing order IDs
- update existing quantities
- insert new rows
- delete removed rows only when no cancellation references exist
- return active quantities after cancellation
