# OrderCancellations schema

## Table created

```sql
CREATE TABLE dbo.OrderCancellations
(
    OrderCancellationID INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_OrderCancellations PRIMARY KEY,
    OrderType NVARCHAR(20) NOT NULL,
    OrderID INT NULL,
    GuestOrderID INT NULL,
    Quantity INT NOT NULL,
    ReasonCode NVARCHAR(50) NOT NULL,
    ReasonText NVARCHAR(500) NULL,
    CancelledBy NVARCHAR(100) NOT NULL,
    CancelledAt DATETIME2(0) NOT NULL
        CONSTRAINT DF_OrderCancellations_CancelledAt
        DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_OrderCancellations_OrderType
        CHECK (OrderType IN (N'Employee', N'Guest')),
    CONSTRAINT CK_OrderCancellations_Quantity
        CHECK (Quantity > 0),
    CONSTRAINT CK_OrderCancellations_Reference
        CHECK
        (
            (OrderType = N'Employee' AND OrderID IS NOT NULL AND GuestOrderID IS NULL)
            OR
            (OrderType = N'Guest' AND GuestOrderID IS NOT NULL AND OrderID IS NULL)
        )
);
```

## Foreign keys added

```sql
ALTER TABLE dbo.OrderCancellations
ADD CONSTRAINT FK_OrderCancellations_Orders
    FOREIGN KEY (OrderID)
    REFERENCES dbo.Orders(OrderID);

ALTER TABLE dbo.OrderCancellations
ADD CONSTRAINT FK_OrderCancellations_GuestOrders
    FOREIGN KEY (GuestOrderID)
    REFERENCES dbo.GuestOrders(GuestOrderID);
```

No cascade delete should be added.

## Indexes added

```sql
CREATE INDEX IX_OrderCancellations_OrderID
    ON dbo.OrderCancellations(OrderID)
    WHERE OrderID IS NOT NULL;

CREATE INDEX IX_OrderCancellations_GuestOrderID
    ON dbo.OrderCancellations(GuestOrderID)
    WHERE GuestOrderID IS NOT NULL;

CREATE INDEX IX_OrderCancellations_CancelledAt
    ON dbo.OrderCancellations(CancelledAt);

CREATE INDEX IX_OrderCancellations_ReasonCode
    ON dbo.OrderCancellations(ReasonCode);
```

## Recommended optional constraint

```sql
ALTER TABLE dbo.OrderCancellations
ADD CONSTRAINT CK_OrderCancellations_ReasonCode
CHECK
(
    ReasonCode IN
    (
        N'INSUFFICIENT_PORTIONS',
        N'EMPLOYEE_REQUEST',
        N'EMPLOYEE_ABSENT',
        N'WRONG_DISH',
        N'KITCHEN_CORRECTION',
        N'OTHER'
    )
);
```
