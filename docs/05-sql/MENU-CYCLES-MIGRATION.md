# MenuCycles migration summary

## Added table

```sql
CREATE TABLE dbo.MenuCycles
(
    MenuCycleID INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_MenuCycles PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    NumberOfWeeks TINYINT NOT NULL,
    Status NVARCHAR(20) NOT NULL
        CONSTRAINT DF_MenuCycles_Status DEFAULT (N'Draft'),
    CreatedDate DATETIME2(0) NOT NULL
        CONSTRAINT DF_MenuCycles_CreatedDate DEFAULT (SYSUTCDATETIME()),
    UpdatedDate DATETIME2(0) NOT NULL
        CONSTRAINT DF_MenuCycles_UpdatedDate DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT CK_MenuCycles_NumberOfWeeks
        CHECK (NumberOfWeeks BETWEEN 1 AND 8),
    CONSTRAINT CK_MenuCycles_Status
        CHECK (Status IN (N'Draft', N'Published', N'Archived'))
);
```

## MenuWeeks change

```sql
ALTER TABLE dbo.MenuWeeks
ADD MenuCycleID INT NOT NULL;
```

The migration initially added the column as nullable, assigned the existing weeks to the migrated cycle, and then changed it to NOT NULL.

## Foreign key

```sql
ALTER TABLE dbo.MenuWeeks
ADD CONSTRAINT FK_MenuWeeks_MenuCycles
    FOREIGN KEY (MenuCycleID)
    REFERENCES dbo.MenuCycles(MenuCycleID);
```

## Uniqueness change

The old global uniqueness constraint on `WeekNumber` was removed and replaced with:

```sql
ALTER TABLE dbo.MenuWeeks
ADD CONSTRAINT UQ_MenuWeeks_Cycle_Week
    UNIQUE (MenuCycleID, WeekNumber);
```

## DEV seed cycle

```text
Name: Current four-week menu
StartDate: 2026-09-28
NumberOfWeeks: 4
Status: Published
```
