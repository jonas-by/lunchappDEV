SET XACT_ABORT ON;
BEGIN TRANSACTION;

IF OBJECT_ID(N'dbo.ManualLunchAdjustments', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.ManualLunchAdjustments (
        AdjustmentID int IDENTITY(1,1) NOT NULL CONSTRAINT PK_ManualLunchAdjustments PRIMARY KEY,
        EmployeeNo int NOT NULL,
        MenuDate date NOT NULL,
        Quantity int NOT NULL CONSTRAINT DF_ManualLunchAdjustments_Quantity DEFAULT (1),
        Reason nvarchar(250) NULL,
        CreatedBy nvarchar(255) NULL,
        CreatedAt datetime2(0) NOT NULL CONSTRAINT DF_ManualLunchAdjustments_CreatedAt DEFAULT (SYSUTCDATETIME()),
        CONSTRAINT FK_ManualLunchAdjustments_Employees FOREIGN KEY (EmployeeNo) REFERENCES dbo.Employees(EmployeeNo),
        CONSTRAINT CK_ManualLunchAdjustments_Quantity CHECK (Quantity > 0 AND Quantity <= 50)
    );
    CREATE INDEX IX_ManualLunchAdjustments_MenuDate_EmployeeNo
        ON dbo.ManualLunchAdjustments(MenuDate, EmployeeNo);
END;

COMMIT TRANSACTION;
