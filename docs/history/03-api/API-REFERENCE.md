# API reference

## Menu cycles

```text
GET  /api/menu/cycles
GET  /api/menu/cycles/{cycleId}
POST /api/menu/cycles
PUT  /api/menu/cycles/{cycleId}
```

Create a draft cycle:

```json
{
  "name": "Autumn menu",
  "startDate": "2026-10-26",
  "numberOfWeeks": 4,
  "status": "Draft"
}
```

Publish:

```json
{
  "status": "Published"
}
```

Archive:

```json
{
  "status": "Archived"
}
```

## Cycle-aware menu weeks

```text
GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}
PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}
```

## Current menu by date

```text
GET /api/menu/current
GET /api/menu/current?date=2026-10-26
```

## Kitchen reporting

```text
GET /api/kitchen/orders?dateFrom=2026-09-29&dateTo=2026-09-29
```

Order rows include:

```json
{
  "orderType": "employee",
  "orderId": 123,
  "guestOrderId": null,
  "quantity": 1,
  "originalQuantity": 2,
  "cancelledQuantity": 1,
  "activeQuantity": 1,
  "canCancel": true
}
```

## Kitchen cancellation

```text
POST /api/kitchen/order-cancellations
```

Employee example:

```json
{
  "orderType": "employee",
  "orderId": 123,
  "quantity": 1,
  "reasonCode": "INSUFFICIENT_PORTIONS",
  "reasonText": "Supplier delivered one portion too few",
  "cancelledBy": "Kitchen"
}
```

Guest example:

```json
{
  "orderType": "guest",
  "guestOrderId": 456,
  "quantity": 1,
  "reasonCode": "KITCHEN_CORRECTION",
  "reasonText": "Removed at host request",
  "cancelledBy": "Kitchen"
}
```
