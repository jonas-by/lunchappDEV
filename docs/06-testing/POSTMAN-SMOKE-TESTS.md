# Postman smoke tests

## Current menu

```http
GET /api/menu/current?date=2026-09-28
GET /api/menu/current?date=2026-10-26
```

## Kitchen daily report

```http
GET /api/kitchen/orders?dateFrom=2026-09-29&dateTo=2026-09-29
```

## Employee cancellation

```http
POST /api/kitchen/order-cancellations
Content-Type: application/json
```

```json
{
  "orderType": "employee",
  "orderId": 1,
  "quantity": 1,
  "reasonCode": "INSUFFICIENT_PORTIONS",
  "reasonText": "DEV test",
  "cancelledBy": "Kitchen"
}
```

## Expected cancellation checks

- First valid request returns 201.
- Repeating against a fully cancelled order returns 409.
- Kitchen report no longer counts the cancelled quantity.
- Saving unrelated employee orders does not produce an FK exception.
