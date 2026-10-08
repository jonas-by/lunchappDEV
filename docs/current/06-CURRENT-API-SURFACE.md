# Current API surface

**Evidence baseline:** supplied source snapshot, 2026-10-08; database extraction 2026-10-08 08:01:49.5401578 UTC, DEV only. Confirmed means supported by code or completed exports, not live deployment verification. Unknown, historical, planned and recommendation labels are intentional. No application deployment, source changes, service calls or live business tests were performed.

## Contract conventions and registration inventory

There are **36 registrations and 64 distinct method-route contracts** from all **26 API JavaScript files**. All registrations use anonymous Function authLevel; application identity/roles are not verified by supplied handlers. Platform Easy Auth is Unknown. Prefix /api is Azure default and host.json does not override it. Reports use selector branches, not additional registrations. Returned PascalCase SQL rows and mapped camelCase objects are intentionally not normalized in this documentation. No speculative request/response production examples are included.

| Registration | Source | Declared methods | Route | Auth |
|---|---|---|---|---|
| `current-menu` | `lunchapp-api/src/functions/current-menu.js:4` | GET | `/api/menu/current` | anonymous |
| `employees` | `lunchapp-api/src/functions/employees.js:4` | GET,POST | `/api/employees` | anonymous |
| `employee-item` | `lunchapp-api/src/functions/employees.js:11` | PUT,DELETE | `/api/employees/{employeeNo}` | anonymous |
| `external-lunch-prices` | `lunchapp-api/src/functions/external-lunch-prices.js:4` | GET,POST | `/api/external-lunch-prices` | anonymous |
| `guest-orders` | `lunchapp-api/src/functions/guest-orders.js:4` | GET,PUT | `/api/guest-orders` | anonymous |
| `guest-salad-orders` | `lunchapp-api/src/functions/guest-salad-orders.js:3` | GET,PUT | `/api/guest-salad-orders` | anonymous |
| `hello` | `lunchapp-api/src/functions/hello.js:3` | GET,POST | `/api/hello` | anonymous |
| `images-list` | `lunchapp-api/src/functions/images.js:15` | GET | `/api/images` | anonymous |
| `images-get` | `lunchapp-api/src/functions/images.js:60` | GET | `/api/images/{id:int}` | anonymous |
| `images-content` | `lunchapp-api/src/functions/images.js:86` | GET | `/api/images/{id:int}/content` | anonymous |
| `images-upload` | `lunchapp-api/src/functions/images.js:131` | POST | `/api/images/upload` | anonymous |
| `images-delete` | `lunchapp-api/src/functions/images.js:255` | DELETE | `/api/images/{id:int}` | anonymous |
| `kiosk-card-login` | `lunchapp-api/src/functions/kiosk-card-login.js:4` | POST | `/api/kiosk/card-login` | anonymous |
| `kiosk-cards` | `lunchapp-api/src/functions/kiosk-cards.js:4` | GET,POST,PUT,DELETE | `/api/kiosk/cards/{id?}` | anonymous |
| `kiosk-external-accounts` | `lunchapp-api/src/functions/kiosk-external-accounts.js:7` | GET,POST,PUT,DELETE | `/api/kiosk/external-accounts/{id?}` | anonymous |
| `kiosk-external-account-ledger` | `lunchapp-api/src/functions/kiosk-external-accounts.js:41` | GET | `/api/kiosk/external-accounts/{id}/ledger` | anonymous |
| `kiosk-external-account-deposit` | `lunchapp-api/src/functions/kiosk-external-accounts.js:141` | POST | `/api/kiosk/external-accounts/{id}/deposit` | anonymous |
| `kiosk-external-account-payment` | `lunchapp-api/src/functions/kiosk-external-accounts.js:150` | POST | `/api/kiosk/external-accounts/{id}/payment` | anonymous |
| `kiosk-external-account-adjustment` | `lunchapp-api/src/functions/kiosk-external-accounts.js:159` | POST | `/api/kiosk/external-accounts/{id}/adjustment` | anonymous |
| `kiosk-layouts` | `lunchapp-api/src/functions/kiosk-layouts.js:12` | GET,PUT | `/api/kiosk/layouts/{id?}` | anonymous |
| `kiosk-products` | `lunchapp-api/src/functions/kiosk-products.js:4` | GET,POST,PUT,DELETE | `/api/kiosk/products/{id?}` | anonymous |
| `kiosk-reports` | `lunchapp-api/src/functions/kiosk-reports.js:16` | GET | `/api/kiosk/reports/{report?}` | anonymous |
| `kiosk-sales` | `lunchapp-api/src/functions/kiosk-sales.js:4` | GET,POST | `/api/kiosk/sales/{id?}` | anonymous |
| `kitchen-order-cancellations` | `lunchapp-api/src/functions/kitchen-order-cancellations.js:13` | POST | `/api/kitchen/order-cancellations` | anonymous |
| `kitchen-orders` | `lunchapp-api/src/functions/kitchen-orders.js:4` | GET | `/api/kitchen/orders` | anonymous |
| `kitchen-salad-order-cancellations` | `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:4` | POST | `/api/kitchen/salad-order-cancellations` | anonymous |
| `kitchen-weekly-summary` | `lunchapp-api/src/functions/kitchen-weekly-summary.js:4` | GET | `/api/kitchen/weekly-summary` | anonymous |
| `lunch-reports` | `lunchapp-api/src/functions/lunch-reports.js:4` | GET | `/api/lunch-reports` | anonymous |
| `manual-lunch-adjustments` | `lunchapp-api/src/functions/manual-lunch-adjustments.js:4` | GET,POST | `/api/manual-lunch-adjustments` | anonymous |
| `meals` | `lunchapp-api/src/functions/meals.js:12` | GET,POST | `/api/meals` | anonymous |
| `meal-item` | `lunchapp-api/src/functions/meals.js:19` | PUT,DELETE | `/api/meals/{mealId}` | anonymous |
| `menu-cycles` | `lunchapp-api/src/functions/menu-cycles.js:4` | GET,POST,PUT | `/api/menu/cycles/{cycleId?}` | anonymous |
| `menu-week` | `lunchapp-api/src/functions/menu-week.js:4` | GET,PUT | `/api/menu/cycles/{cycleId}/weeks/{weekNumber}` | anonymous |
| `orders` | `lunchapp-api/src/functions/orders.js:4` | GET,PUT | `/api/orders` | anonymous |
| `salad-orders` | `lunchapp-api/src/functions/salad-orders.js:3` | GET,PUT | `/api/salad-orders` | anonymous |
| `salads` | `lunchapp-api/src/functions/salads.js:6` | GET,POST,PUT,DELETE | `/api/salads/{id?}` | anonymous |

## Request ownership and route-wide cautions

EmployeeNo and externalAccountId+cardId identify editable personal owner; hostEmployeeNo identifies separate guest records. Caller IDs are not authenticated claims. CardID scopes external edits, ExternalAccountID scopes financial reports. Query/date validation is not uniform: some endpoints accept regex-only dates, others actual calendar dates. Most 500 errors return details:error.message; some non-awaited promises bypass local catch. Individual endpoint rules below are authoritative.

## GET /api/menu/current

**Registration:** `current-menu` · **source:** `lunchapp-api/src/functions/current-menu.js:4` · **authLevel:** `anonymous`.

**Purpose:** Resolve effective published repeating menu cycle for requested date.

**Path parameters:** None.

**Query contract:** date optional, default Europe/Helsinki today.

**Request body / field validation:** None.

**Response envelope / success behavior:** requestedDate, cycle metadata, rotation week, menuWeekId, five days with meal records.

**Business validation and rules [API unless labelled SQL]:** Valid calendar YYYY-MM-DD; latest Published StartDate <= date; no cycle end date; repeats modulo NumberOfWeeks; 404 absent cycle/week.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.Meals`, `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/menu/current

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Date must use YYYY-MM-DD format' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; No published menu cycle covers ${requestedDate} |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Menu week ${weekNumber} does not exist in cycle ${cycle.MenuCycleID} |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `requestedDate` | value/mapping: requestedDate |
| `menuCycleId` | value/mapping: cycle.MenuCycleID |
| `cycleName` | value/mapping: cycle.Name |
| `cycleStartDate` | value/mapping: startDate |
| `numberOfWeeks` | value/mapping: cycle.NumberOfWeeks |
| `weekNumber` | value/mapping: weekNumber |
| `menuWeekId` | value/mapping: menuResult.recordset[0].MenuWeekID |
| `days` | value/mapping: days |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Current menu request failed' |
| `details` | value/mapping: error.message |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `dayNumber` | value/mapping: dayNumber |
| `meals` | array; [] |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `mealId` | value/mapping: row.MealID |
| `nameEN` | value/mapping: row.NameEN |
| `nameSV` | value/mapping: row.NameSV |
| `nameFI` | value/mapping: row.NameFI |
| `category` | value/mapping: row.Category |
| `active` | boolean; Boolean(row.Active) |

### Typed SQL bindings — GET /api/menu/current

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `requestedDate` | `sql.Date` |
| `cycleId` | `sql.Int` |
| `weekNumber` | `sql.Int` |

### Status and error contract — GET /api/menu/current

Source-explicit status codes: 200, 400, 404, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Date must use YYYY-MM-DD format`
- `No published menu cycle covers ${requestedDate}`
- `Menu week ${weekNumber} does not exist in cycle ${cycle.MenuCycleID}`
- `Current menu request failed`

### Integrity, transactions and limitations — GET /api/menu/current

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuDays_DayNumber`: ([DayNumber]>=(1) AND [DayNumber]<=(5))
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/employees

**Registration:** `employees` · **source:** `lunchapp-api/src/functions/employees.js:4` · **authLevel:** `anonymous`.

**Purpose:** List employee directory/library records.

**Path parameters:** None.

**Query contract:** includeInactive default false; search optional.

**Request body / field validation:** None.

**Response envelope / success behavior:** 200 raw PascalCase row array; returned fields/types are listed below.

**Business validation and rules [API unless labelled SQL]:** includeInactive parsed with default false; search trimmed; nullable employee Active treated as true; no pagination.

**Reads (including existence checks and view dependencies):** `dbo.Employees`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/login.js`, `lunchappDEV/admin/employee-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/employees

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**getEmployees payload:** `result.recordset`.

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Exact raw SQL record fields — GET /api/employees

The response array/record (or adjustments/adjustment member) exposes `EmployeeNo:int`, `FirstName:nullable string`, `LastName:nullable string`, `Email:nullable string`, `CardNumber:nullable string`, `Active:boolean-like SQL bit; GET COALESCE null to1`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — GET /api/employees

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `includeInactive` | `sql.Bit` |
| `search` | `sql.NVarChar(255)` |

### Status and error contract — GET /api/employees

Source-explicit status codes: 200, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Method not allowed`

### Integrity, transactions and limitations — GET /api/employees

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/employees

**Registration:** `employees` · **source:** `lunchapp-api/src/functions/employees.js:4` · **authLevel:** `anonymous`.

**Purpose:** Create employee record.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** POST employeeNo positive integer; firstName/lastName <=100, email <=255 and email syntax, cardNumber <=50, active boolean default true; all text nullable.

**Response envelope / success behavior:** 201 inserted PascalCase record and Location header; duplicate409 and validation400 where documented.

**Business validation and rules [API unless labelled SQL]:** Duplicate employeeNo or employee cardNumber 409; active null treated as active in listing; only Employees checked for card conflict.

**Reads (including existence checks and view dependencies):** `dbo.Employees`. **Writes:** `dbo.Employees`.

**Callers/intended integration, not roles:** `lunchappDEV/user/login.js`, `lunchappDEV/admin/employee-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/employees

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**createEmployee payload:** `result.recordset[0]`.

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**readJsonBody response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

**duplicateValueResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `code` | string; 'DUPLICATE_EMPLOYEE_VALUE' |
| `field` | value/mapping: field |
| `value` | value/mapping: value |
| `employeeNo` | value/mapping: employee.EmployeeNo |
| `employeeName` | value/mapping: employeeName |
| `error` | string; ${label} ${value} is already assigned to ${employeeName}. |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Exact raw SQL record fields — POST /api/employees

The response array/record (or adjustments/adjustment member) exposes `EmployeeNo:int`, `FirstName:nullable string`, `LastName:nullable string`, `Email:nullable string`, `CardNumber:nullable string`, `Active:boolean-like SQL bit; GET COALESCE null to1`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — POST /api/employees

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `employeeNo` | `sql.Int` |
| `cardNumber` | `sql.NVarChar(50)` |
| `firstName` | `sql.NVarChar(100)` |
| `lastName` | `sql.NVarChar(100)` |
| `email` | `sql.NVarChar(255)` |
| `active` | `sql.Bit` |

### Status and error contract — POST /api/employees

Source-explicit status codes: 201, 400, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Method not allowed`
- `Request body must be a JSON object`
- `employeeNo must be a positive integer`
- `firstName cannot exceed 100 characters`
- `lastName cannot exceed 100 characters`
- `email cannot exceed 255 characters`
- `cardNumber cannot exceed 50 characters`
- `email must contain a valid email address`
- `active must be true or false`
- `Request body must contain valid JSON`
- `${label} ${value} is already assigned to ${employeeName}.`

### Integrity, transactions and limitations — POST /api/employees

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/employees/{employeeNo}

**Registration:** `employee-item` · **source:** `lunchapp-api/src/functions/employees.js:11` · **authLevel:** `anonymous`.

**Purpose:** Update employee record.

**Path parameters:** employeeNo.

**Query contract:** None used by this method.

**Request body / field validation:** PUT nullable firstName,lastName,email,cardNumber; active defaults true; optional employeeNo must equal path.

**Response envelope / success behavior:** 200 updated PascalCase record; validation400, missing404 and duplicate409 where documented.

**Business validation and rules [API unless labelled SQL]:** Positive employeeNo; primary key immutable; hard delete prechecks only Orders and GuestOrders; other SQL FKs may fail with generic 500.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.GuestOrders`, `dbo.Orders`. **Writes:** `dbo.Employees`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/employee-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/employees/{employeeNo}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**updateEmployee payload:** `result.recordset[0]`.

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**readJsonBody response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

**duplicateValueResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `code` | string; 'DUPLICATE_EMPLOYEE_VALUE' |
| `field` | value/mapping: field |
| `value` | value/mapping: value |
| `employeeNo` | value/mapping: employee.EmployeeNo |
| `employeeName` | value/mapping: employeeName |
| `error` | string; ${label} ${value} is already assigned to ${employeeName}. |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Exact raw SQL record fields — PUT /api/employees/{employeeNo}

The response array/record (or adjustments/adjustment member) exposes `EmployeeNo:int`, `FirstName:nullable string`, `LastName:nullable string`, `Email:nullable string`, `CardNumber:nullable string`, `Active:boolean-like SQL bit; GET COALESCE null to1`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — PUT /api/employees/{employeeNo}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `employeeNo` | `sql.Int` |
| `cardNumber` | `sql.NVarChar(50)` |
| `firstName` | `sql.NVarChar(100)` |
| `lastName` | `sql.NVarChar(100)` |
| `email` | `sql.NVarChar(255)` |
| `active` | `sql.Bit` |

### Status and error contract — PUT /api/employees/{employeeNo}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `employeeNo must be a positive integer`
- `Employee number cannot be changed through this endpoint. Create a new employee or migrate the key separately.`
- `Method not allowed`
- `Request body must be a JSON object`
- `firstName cannot exceed 100 characters`
- `lastName cannot exceed 100 characters`
- `email cannot exceed 255 characters`
- `cardNumber cannot exceed 50 characters`
- `email must contain a valid email address`
- `active must be true or false`
- `Request body must contain valid JSON`
- `${label} ${value} is already assigned to ${employeeName}.`

### Integrity, transactions and limitations — PUT /api/employees/{employeeNo}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/employees/{employeeNo}

**Registration:** `employee-item` · **source:** `lunchapp-api/src/functions/employees.js:11` · **authLevel:** `anonymous`.

**Purpose:** Deactivate or hard-delete employee record.

**Path parameters:** employeeNo.

**Query contract:** hard optional boolean default false.

**Request body / field validation:** None.

**Response envelope / success behavior:** 200 success/deleteType plus deactivated record or hard-deleted ID; missing404; intended in-use409, subject to documented schema/precheck limits.

**Business validation and rules [API unless labelled SQL]:** Positive employeeNo; primary key immutable; hard delete prechecks only Orders and GuestOrders; other SQL FKs may fail with generic 500.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.GuestOrders`, `dbo.Orders`. **Writes:** `dbo.Employees`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/employee-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/employees/{employeeNo}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**deleteEmployee response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `deleteType` | string; 'soft' |
| `employee` | value/mapping: result.recordset[0] |

**deleteEmployee response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Employee cannot be permanently deleted because order history exists' |
| `employeeNo` | value/mapping: employeeNo |
| `personalOrderCount` | value/mapping: references.PersonalOrderCount |
| `guestOrderCount` | value/mapping: references.GuestOrderCount |
| `suggestion` | string; 'Use DELETE without ?hard=true to deactivate the employee instead' |

**deleteEmployee response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `deleteType` | string; 'hard' |
| `employeeNo` | value/mapping: employeeNo |

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Exact raw SQL record fields — DELETE /api/employees/{employeeNo}

The response array/record (or adjustments/adjustment member) exposes `EmployeeNo:int`, `FirstName:nullable string`, `LastName:nullable string`, `Email:nullable string`, `CardNumber:nullable string`, `Active:boolean-like SQL bit; GET COALESCE null to1`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — DELETE /api/employees/{employeeNo}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `employeeNo` | `sql.Int` |

### Status and error contract — DELETE /api/employees/{employeeNo}

Source-explicit status codes: 200, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `employeeNo must be a positive integer`
- `Employee cannot be permanently deleted because order history exists`
- `Method not allowed`

### Integrity, transactions and limitations — DELETE /api/employees/{employeeNo}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/external-lunch-prices

**Registration:** `external-lunch-prices` · **source:** `lunchapp-api/src/functions/external-lunch-prices.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read effective-date history or insert new external per-portion price.

**Path parameters:** None.

**Query contract:** None.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET current latest ValidFrom row (even future),prices; POST201 success/price.

**Business validation and rules [API unless labelled SQL]:** One price per start date SQL uniqueness ->409; current response not as-of-today; effective MenuDate pricing happens in SQL view.

**Reads (including existence checks and view dependencies):** `dbo.ExternalLunchPrices`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/external-lunch-prices.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/external-lunch-prices

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External lunch prices request failed' |
| `details` | value/mapping: error.message |

**readPrices response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `current` | value/mapping: result.recordset[0] ? mapPrice(result.recordset[0]) : null |
| `prices` | value/mapping: result.recordset.map(mapPrice) |

**mapPrice response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalLunchPriceId` | value/mapping: row.ExternalLunchPriceID |
| `priceCents` | number; Number(row.PriceCents) |
| `validFrom` | date/time string; formatDate(row.ValidFrom) |
| `createdAt` | value/mapping: row.CreatedAt |
| `createdBy` | value/mapping: row.CreatedBy |

### Status and error contract — GET /api/external-lunch-prices

Source-explicit status codes: 200, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `External lunch prices request failed`

### Integrity, transactions and limitations — GET /api/external-lunch-prices

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalLunchPrices_PriceCents`: ([PriceCents]>(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/external-lunch-prices

**Registration:** `external-lunch-prices` · **source:** `lunchapp-api/src/functions/external-lunch-prices.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read effective-date history or insert new external per-portion price.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** POST priceCents positive integer,validFrom regexdate,createdBy optional trunc255.

**Response envelope / success behavior:** GET current latest ValidFrom row (even future),prices; POST201 success/price.

**Business validation and rules [API unless labelled SQL]:** One price per start date SQL uniqueness ->409; current response not as-of-today; effective MenuDate pricing happens in SQL view.

**Reads (including existence checks and view dependencies):** `dbo.ExternalLunchPrices`. **Writes:** `dbo.ExternalLunchPrices`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/external-lunch-prices.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/external-lunch-prices

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External lunch prices request failed' |
| `details` | value/mapping: error.message |

**savePrice response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `price` | value/mapping: mapPrice(result.recordset[0]) |

**savePrice response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A lunch price already exists for that start date.' |

**mapPrice response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalLunchPriceId` | value/mapping: row.ExternalLunchPriceID |
| `priceCents` | number; Number(row.PriceCents) |
| `validFrom` | date/time string; formatDate(row.ValidFrom) |
| `createdAt` | value/mapping: row.CreatedAt |
| `createdBy` | value/mapping: row.CreatedBy |

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

### Typed SQL bindings — POST /api/external-lunch-prices

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `PriceCents` | `sql.Int` |
| `ValidFrom` | `sql.Date` |
| `CreatedBy` | `sql.NVarChar(255)` |

### Status and error contract — POST /api/external-lunch-prices

Source-explicit status codes: 201, 400, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `External lunch prices request failed`
- `Request body must contain valid JSON.`
- `priceCents must be a positive integer.`
- `validFrom must use YYYY-MM-DD format.`
- `A lunch price already exists for that start date.`

### Integrity, transactions and limitations — POST /api/external-lunch-prices

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalLunchPrices_PriceCents`: ([PriceCents]>(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/guest-orders

**Registration:** `guest-orders` · **source:** `lunchapp-api/src/functions/guest-orders.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or reconcile employee-hosted guest meal orders (not external-card ordering).

**Path parameters:** None.

**Query contract:** hostEmployeeNo positive; optional dateFrom/dateTo valid calendar dates ordered.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET host/date/net-active orders, workTask and cancellation fields; PUT success/host/date/orderLines/totalGuestLunches.

**Business validation and rules [API unless labelled SQL]:** Active employee host and meal existence checked on PUT; dedupe key date/meal/lowercase-workTask but reconcile key date/meal only; cancellation-linked source rows retained; no menu-active/deadline enforcement.

**Reads (including existence checks and view dependencies):** `dbo.GuestOrders`, `dbo.Meals`, `dbo.OrderCancellations`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js` guest mode, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/guest-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Guest orders request failed' |
| `details` | value/mapping: error.message |

**getGuestOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `hostEmployeeNo` | value/mapping: hostEmployeeNo |
| `dateFrom` | value/mapping: dateFrom |
| `dateTo` | value/mapping: dateTo |
| `orders` | value/mapping: result.recordset.map(row => ({ guestOrderId: row.GuestOrderID, hostEmployeeNo: row.HostEmployeeNo, menuDate: formatSqlDate(row.MenuDate), mealId: row.MealID, quantity: row.Quantity, originalQuantity: row.OriginalQuantity, cancelledQuantity: Number(row.CancelledQuantity), activeQuantity: row.Quantity, workTask: row.WorkTask, orderTime: row.OrderTime, nameEN: row.NameEN, nameSV: row.NameSV, nameFI: row.NameFI, category: row.Category })) |

**getGuestOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `guestOrderId` | value/mapping: row.GuestOrderID |
| `hostEmployeeNo` | value/mapping: row.HostEmployeeNo |
| `menuDate` | value/mapping: formatSqlDate(row.MenuDate) |
| `mealId` | value/mapping: row.MealID |
| `quantity` | value/mapping: row.Quantity |
| `originalQuantity` | value/mapping: row.OriginalQuantity |
| `cancelledQuantity` | number; Number(row.CancelledQuantity) |
| `activeQuantity` | value/mapping: row.Quantity |
| `workTask` | value/mapping: row.WorkTask |
| `orderTime` | value/mapping: row.OrderTime |
| `nameEN` | value/mapping: row.NameEN |
| `nameSV` | value/mapping: row.NameSV |
| `nameFI` | value/mapping: row.NameFI |
| `category` | value/mapping: row.Category |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — GET /api/guest-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `hostEmployeeNo` | `sql.Int` |
| `dateFrom` | `sql.Date` |
| `dateTo` | `sql.Date` |

### Status and error contract — GET /api/guest-orders

Source-explicit status codes: 200, 400, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Method not allowed`
- `Guest orders request failed`
- `hostEmployeeNo must be a positive integer`
- `dateFrom must use YYYY-MM-DD format`
- `dateTo must use YYYY-MM-DD format`
- `dateFrom cannot be later than dateTo`

### Integrity, transactions and limitations — GET /api/guest-orders

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/guest-orders

**Registration:** `guest-orders` · **source:** `lunchapp-api/src/functions/guest-orders.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or reconcile employee-hosted guest meal orders (not external-card ordering).

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** PUT hostEmployeeNo,dateFrom,dateTo,orders[{menuDate,mealId,quantity,workTask}]; quantity1..100; workTask nonblank <=200.

**Response envelope / success behavior:** GET host/date/net-active orders, workTask and cancellation fields; PUT success/host/date/orderLines/totalGuestLunches.

**Business validation and rules [API unless labelled SQL]:** Active employee host and meal existence checked on PUT; dedupe key date/meal/lowercase-workTask but reconcile key date/meal only; cancellation-linked source rows retained; no menu-active/deadline enforcement.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.GuestOrders`, `dbo.Meals`, `dbo.OrderCancellations`. **Writes:** `dbo.GuestOrders`.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js` guest mode, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/guest-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Guest orders request failed' |
| `details` | value/mapping: error.message |

**putGuestOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Host employee does not exist or is inactive' |
| `hostEmployeeNo` | value/mapping: payload.hostEmployeeNo |

**putGuestOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'One or more submitted meals do not exist' |
| `missingMealIds` | value/mapping: missingMealIds |

**putGuestOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `hostEmployeeNo` | value/mapping: payload.hostEmployeeNo |
| `dateFrom` | value/mapping: payload.dateFrom |
| `dateTo` | value/mapping: payload.dateTo |
| `orderLines` | value/mapping: payload.orders.length |
| `totalGuestLunches` | value/mapping: payload.orders.reduce( (sum, order) => sum + order.quantity, 0 ) |

**putGuestOrders payload:** `{             const parameterName = mealId${index};             mealRequest.input(parameterName, sql.Int, mealId);             return @${parameterName};         }`.

**readJsonBody response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — PUT /api/guest-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `hostEmployeeNo` | `sql.Int` |
| `dateFrom` | `sql.Date` |
| `dateTo` | `sql.Date` |
| `guestOrderId` | `sql.Int` |
| `quantity` | `sql.Int` |
| `workTask` | `sql.NVarChar(200)` |
| `menuDate` | `sql.Date` |
| `mealId` | `sql.Int` |

### Status and error contract — PUT /api/guest-orders

Source-explicit status codes: 200, 400, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Method not allowed`
- `Guest orders request failed`
- `Host employee does not exist or is inactive`
- `One or more submitted meals do not exist`
- `Request body must be a JSON object`
- `hostEmployeeNo must be a positive integer`
- `dateFrom and dateTo must use YYYY-MM-DD format`
- `dateFrom cannot be later than dateTo`
- `orders must be an array`
- `Every order must be an object`
- `Every menuDate must use YYYY-MM-DD format`
- `Order date ${menuDate} is outside the replacement range`
- `Every mealId must be a positive integer`
- `Every quantity must be an integer between 1 and 100`
- `Every guest order must include workTask`
- `workTask cannot exceed 200 characters`
- `Combined quantity for one guest order cannot exceed 100`
- `Request body must contain valid JSON`

### Integrity, transactions and limitations — PUT /api/guest-orders

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/guest-salad-orders

**Registration:** `guest-salad-orders` · **source:** `lunchapp-api/src/functions/guest-salad-orders.js:3` · **authLevel:** `anonymous`.

**Purpose:** Read or replace employee-hosted guest salads.

**Path parameters:** None.

**Query contract:** hostEmployeeNo required; dateFrom/dateTo optional GET.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET host/date/saladOrders gross quantity and workTask; PUT success/saladOrderLines/totalSalads.

**Business validation and rules [API unless labelled SQL]:** Checks active salads before PUT; no employee-host existence/activity check; no host FK in extract; deletes all scoped source rows, blocked if cancellation-linked; malformed GET dates ignored.

**Reads (including existence checks and view dependencies):** `dbo.GuestSaladOrders`, `dbo.Salads`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js` guest mode, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/guest-salad-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'guest-salad-orders failed' |
| `details` | value/mapping: error.message |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `hostEmployeeNo` | value/mapping: person |
| `dateFrom` | value/mapping: from |
| `dateTo` | value/mapping: to |
| `saladOrders` | value/mapping: r.recordset.map(row=>({saladOrderId:row.GuestSaladOrderID,menuDate:fmt(row.MenuDate),saladId:row.SaladID,quantity:row.Quantity,orderTime:row.OrderTime,nameEn:row.NameEn,nameSv:row.NameSv,nameFi:row.NameFi, workTask: row.WorkTask})) |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladOrderId` | value/mapping: row.GuestSaladOrderID |
| `menuDate` | value/mapping: fmt(row.MenuDate) |
| `saladId` | value/mapping: row.SaladID |
| `quantity` | value/mapping: row.Quantity |
| `orderTime` | value/mapping: row.OrderTime |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `workTask` | value/mapping: row.WorkTask |

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

### Typed SQL bindings — GET /api/guest-salad-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `person` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |

### Status and error contract — GET /api/guest-salad-orders

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `guest-salad-orders failed`
- `hostEmployeeNo must be a positive integer`

### Integrity, transactions and limitations — GET /api/guest-salad-orders

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/guest-salad-orders

**Registration:** `guest-salad-orders` · **source:** `lunchapp-api/src/functions/guest-salad-orders.js:3` · **authLevel:** `anonymous`.

**Purpose:** Read or replace employee-hosted guest salads.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** PUT hostEmployeeNo,dateFrom,dateTo,workTask required trunc200, saladOrders[{menuDate,saladId,quantity}] summed cap50.

**Response envelope / success behavior:** GET host/date/saladOrders gross quantity and workTask; PUT success/saladOrderLines/totalSalads.

**Business validation and rules [API unless labelled SQL]:** Checks active salads before PUT; no employee-host existence/activity check; no host FK in extract; deletes all scoped source rows, blocked if cancellation-linked; malformed GET dates ignored.

**Reads (including existence checks and view dependencies):** `dbo.GuestSaladOrders`, `dbo.Salads`. **Writes:** `dbo.GuestSaladOrders`.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js` guest mode, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/guest-salad-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'guest-salad-orders failed' |
| `details` | value/mapping: error.message |

**put response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `saladOrderLines` | value/mapping: payload.saladOrders.length |
| `totalSalads` | value/mapping: payload.saladOrders.reduce((a,x)=>a+x.quantity,0) |

**put payload:** `{q.input('id'+i,sql.Int,id);return '@id'+i;}`.

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `hostEmployeeNo` | value/mapping: person |
| `dateFrom` | value/mapping: from |
| `dateTo` | value/mapping: to |
| `saladOrders` | value/mapping: r.recordset.map(row=>({saladOrderId:row.GuestSaladOrderID,menuDate:fmt(row.MenuDate),saladId:row.SaladID,quantity:row.Quantity,orderTime:row.OrderTime,nameEn:row.NameEn,nameSv:row.NameSv,nameFi:row.NameFi, workTask: row.WorkTask})) |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladOrderId` | value/mapping: row.GuestSaladOrderID |
| `menuDate` | value/mapping: fmt(row.MenuDate) |
| `saladId` | value/mapping: row.SaladID |
| `quantity` | value/mapping: row.Quantity |
| `orderTime` | value/mapping: row.OrderTime |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `workTask` | value/mapping: row.WorkTask |

### Typed SQL bindings — PUT /api/guest-salad-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `person` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `menuDate` | `sql.Date` |
| `saladId` | `sql.Int` |
| `quantity` | `sql.Int` |
| `workTask` | `sql.NVarChar(200)` |

### Status and error contract — PUT /api/guest-salad-orders

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `guest-salad-orders failed`
- `Request body must be JSON`
- `One or more salads do not exist or are inactive`
- `Body must be an object`
- `Invalid hostEmployeeNo or date range`
- `saladOrders must be an array`
- `workTask is required`
- `Invalid salad order`
- `Combined salad quantity cannot exceed 50`
- `hostEmployeeNo must be a positive integer`

### Integrity, transactions and limitations — PUT /api/guest-salad-orders

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/hello

**Registration:** `hello` · **source:** `lunchapp-api/src/functions/hello.js:3` · **authLevel:** `anonymous`.

**Purpose:** Diagnostic greeting; not a database health check.

**Path parameters:** None.

**Query contract:** name optional; query wins over raw text body.

**Request body / field validation:** None.

**Response envelope / success behavior:** Plain text Hello, <name>!; implicit 200.

**Business validation and rules [API unless labelled SQL]:** No validation or database access.

**Reads (including existence checks and view dependencies):** None. **Writes:** None.

**Callers/intended integration, not roles:** Any diagnostic caller.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`. **Setting names only:** None.

### Status and error contract — GET /api/hello

Source-explicit status codes: Implicit 200 / delegated wrapper status; see purpose/response.

### Integrity, transactions and limitations — GET /api/hello

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/hello

**Registration:** `hello` · **source:** `lunchapp-api/src/functions/hello.js:3` · **authLevel:** `anonymous`.

**Purpose:** Diagnostic greeting; not a database health check.

**Path parameters:** None.

**Query contract:** name optional; query takes precedence over raw text body.

**Request body / field validation:** Text body optional.

**Response envelope / success behavior:** Plain text Hello, <name>!; implicit 200.

**Business validation and rules [API unless labelled SQL]:** No validation or database access.

**Reads (including existence checks and view dependencies):** None. **Writes:** None.

**Callers/intended integration, not roles:** Any diagnostic caller.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`. **Setting names only:** None.

### Status and error contract — POST /api/hello

Source-explicit status codes: Implicit 200 / delegated wrapper status; see purpose/response.

### Integrity, transactions and limitations — POST /api/hello

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/images

**Registration:** `images-list` · **source:** `lunchapp-api/src/functions/images.js:15` · **authLevel:** `anonymous`.

**Purpose:** List shared image assets with product usage counts.

**Path parameters:** None.

**Query contract:** None.

**Request body / field validation:** None.

**Response envelope / success behavior:** Mapped metadata array with absolute API contentUrl, not blob credentials.

**Business validation and rules [API unless labelled SQL]:** No IsActive/softdelete filter;all metadata;usage includes inactive products.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/image-library.js`, `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `@azure/storage-blob`, `crypto`, `mssql`, `path`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/images

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**mapImage response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `imageAssetId` | value/mapping: imageAssetId |
| `displayName` | value/mapping: row.DisplayName |
| `originalFileName` | value/mapping: row.OriginalFileName |
| `contentType` | value/mapping: row.ContentType |
| `fileSize` | value/mapping: row.FileSize === null \|\| row.FileSize === undefined ? null : Number(row.FileSize) |
| `width` | value/mapping: row.Width |
| `height` | value/mapping: row.Height |
| `createdAt` | value/mapping: row.CreatedAt |
| `createdBy` | value/mapping: row.CreatedBy |
| `productUsageCount` | number; Number(row.ProductUsageCount \|\| 0) |
| `contentUrl` | value/mapping: absoluteApiUrl(request, /api/images/${imageAssetId}/content) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting image record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Status and error contract — GET /api/images

Source-explicit status codes: 200, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `A conflicting image record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — GET /api/images

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/images/{id:int}

**Registration:** `images-get` · **source:** `lunchapp-api/src/functions/images.js:60` · **authLevel:** `anonymous`.

**Purpose:** Read one image asset metadata.

**Path parameters:** id:int.

**Query contract:** id:int path positive.

**Request body / field validation:** None.

**Response envelope / success behavior:** Mapped metadata with usagecount/contentUrl.

**Business validation and rules [API unless labelled SQL]:** 404 missing asset.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`/image library.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `@azure/storage-blob`, `crypto`, `mssql`, `path`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/images/{id:int}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid image asset ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Image asset not found.' |

**mapImage response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `imageAssetId` | value/mapping: imageAssetId |
| `displayName` | value/mapping: row.DisplayName |
| `originalFileName` | value/mapping: row.OriginalFileName |
| `contentType` | value/mapping: row.ContentType |
| `fileSize` | value/mapping: row.FileSize === null \|\| row.FileSize === undefined ? null : Number(row.FileSize) |
| `width` | value/mapping: row.Width |
| `height` | value/mapping: row.Height |
| `createdAt` | value/mapping: row.CreatedAt |
| `createdBy` | value/mapping: row.CreatedBy |
| `productUsageCount` | number; Number(row.ProductUsageCount \|\| 0) |
| `contentUrl` | value/mapping: absoluteApiUrl(request, /api/images/${imageAssetId}/content) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting image record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Typed SQL bindings — GET /api/images/{id:int}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ImageAssetID` | `sql.Int` |

### Status and error contract — GET /api/images/{id:int}

Source-explicit status codes: 200, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid image asset ID.`
- `Image asset not found.`
- `A conflicting image record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — GET /api/images/{id:int}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/images/{id:int}/content

**Registration:** `images-content` · **source:** `lunchapp-api/src/functions/images.js:86` · **authLevel:** `anonymous`.

**Purpose:** Serve private blob content via API buffer.

**Path parameters:** id:int.

**Query contract:** id:int path positive.

**Request body / field validation:** None.

**Response envelope / success behavior:** Binary body;stored Content-Type;Content-Length;inline filename;public max-age3600.

**Business validation and rules [API unless labelled SQL]:** 404 absent SQL metadata/blob;downloads to buffer (not streaming HTTP);no signed URL/auth required in handler.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** None.

**Callers/intended integration, not roles:** Product image tags;image library.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `@azure/storage-blob`, `crypto`, `mssql`, `path`. **Setting names only:** `ImageContainerName`, `ImageStorageConnection`, `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/images/{id:int}/content

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid image asset ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Image asset not found.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Image file not found in Blob Storage.' |

**serviceError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error && error.message ? error.message : String(error) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting image record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Typed SQL bindings — GET /api/images/{id:int}/content

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ImageAssetID` | `sql.Int` |

### Status and error contract — GET /api/images/{id:int}/content

Source-explicit status codes: 200, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid image asset ID.`
- `Image asset not found.`
- `Image file not found in Blob Storage.`
- `A conflicting image record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — GET /api/images/{id:int}/content

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/images/upload

**Registration:** `images-upload` · **source:** `lunchapp-api/src/functions/images.js:131` · **authLevel:** `anonymous`.

**Purpose:** Upload shared image blob then insert metadata; cleanup blob on metadata failure.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** multipart file required nonempty <=5MiB; declared type JPEG/PNG/WebP/GIF;displayName optional255;createdBy optional100.

**Response envelope / success behavior:** 201 metadata/contentUrl.

**Business validation and rules [API unless labelled SQL]:** products/randomUUID.ext;SQL Width/Height NULL;MIME allowlist not image decoding;400badform/type/empty413size;storage connection+container env settings;cleanup best effort.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`. **Writes:** `dbo.ImageAssets`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js` crop/upload workflow.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `@azure/storage-blob`, `crypto`, `mssql`, `path`. **Setting names only:** `ImageContainerName`, `ImageStorageConnection`, `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/images/upload

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A multipart/form-data field named file is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Unsupported image type. Allowed types are JPEG, PNG, WebP and GIF.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The uploaded image is empty.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The uploaded image exceeds the 5 MB limit.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The request must use multipart/form-data.' |
| `details` | value/mapping: error.message |

**mapImage response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `imageAssetId` | value/mapping: imageAssetId |
| `displayName` | value/mapping: row.DisplayName |
| `originalFileName` | value/mapping: row.OriginalFileName |
| `contentType` | value/mapping: row.ContentType |
| `fileSize` | value/mapping: row.FileSize === null \|\| row.FileSize === undefined ? null : Number(row.FileSize) |
| `width` | value/mapping: row.Width |
| `height` | value/mapping: row.Height |
| `createdAt` | value/mapping: row.CreatedAt |
| `createdBy` | value/mapping: row.CreatedBy |
| `productUsageCount` | number; Number(row.ProductUsageCount \|\| 0) |
| `contentUrl` | value/mapping: absoluteApiUrl(request, /api/images/${imageAssetId}/content) |

**serviceError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error && error.message ? error.message : String(error) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting image record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Typed SQL bindings — POST /api/images/upload

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `DisplayName` | `sql.NVarChar(255)` |
| `BlobName` | `sql.NVarChar(500)` |
| `OriginalFileName` | `sql.NVarChar(255)` |
| `ContentType` | `sql.NVarChar(100)` |
| `FileSize` | `sql.BigInt` |
| `CreatedBy` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/images/upload

Source-explicit status codes: 201, 400, 409, 413, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `A multipart/form-data field named file is required.`
- `Unsupported image type. Allowed types are JPEG, PNG, WebP and GIF.`
- `The uploaded image is empty.`
- `The uploaded image exceeds the 5 MB limit.`
- `The request must use multipart/form-data.`
- `A conflicting image record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — POST /api/images/upload

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/images/{id:int}

**Registration:** `images-delete` · **source:** `lunchapp-api/src/functions/images.js:255` · **authLevel:** `anonymous`.

**Purpose:** Permanently delete unused blob and SQL metadata.

**Path parameters:** id:int.

**Query contract:** None used by this method.

**Request body / field validation:** None.

**Response envelope / success behavior:** 200 deleted/imageAssetId/blobName.

**Business validation and rules [API unless labelled SQL]:** 404metadata;409 productusage>0 (inactive included);blob deleteIfExists beforeSQLDELETE;not atomic;no softdelete, no orphan sweeper.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** `dbo.ImageAssets`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/image-library.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `@azure/storage-blob`, `crypto`, `mssql`, `path`. **Setting names only:** `ImageContainerName`, `ImageStorageConnection`, `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/images/{id:int}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid image asset ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Image asset not found.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The image is assigned to one or more kiosk products and cannot be deleted.' |
| `productUsageCount` | value/mapping: usageCount |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `deleted` | boolean true |
| `imageAssetId` | value/mapping: id |
| `blobName` | value/mapping: image.BlobName |

**serviceError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error && error.message ? error.message : String(error) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting image record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Typed SQL bindings — DELETE /api/images/{id:int}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ImageAssetID` | `sql.Int` |

### Status and error contract — DELETE /api/images/{id:int}

Source-explicit status codes: 200, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid image asset ID.`
- `Image asset not found.`
- `The image is assigned to one or more kiosk products and cannot be deleted.`
- `A conflicting image record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — DELETE /api/images/{id:int}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/card-login

**Registration:** `kiosk-card-login` · **source:** `lunchapp-api/src/functions/kiosk-card-login.js:4` · **authLevel:** `anonymous`.

**Purpose:** Resolve supplied card into employee or external identity and financial snapshot.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** cardNumber required string trim/trunc100; no secret/PIN/token.

**Response envelope / success behavior:** employee ownerType/employeeNo/cardNumber/displayName; external cardId/account/company/mode/credit/balance/available/outstanding.

**Business validation and rules [API unless labelled SQL]:** Employees first exact match, no Active filter; external card/account active and validity checked; no server session or signed identity issued;404 unknown403 inactive/outsidevalidity.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/lunchkiosk/card-login.js`, `lunchappDEV/bulla/card-login.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/card-login

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'cardNumber is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ownerType` | string; 'employee' |
| `employeeNo` | value/mapping: employee.EmployeeNo |
| `cardNumber` | value/mapping: String(employee.CardNumber) |
| `displayName` | value/mapping: employeeName \|\| Employee ${employee.EmployeeNo} |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card not found.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card is inactive.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card is not valid yet.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card has expired.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is not valid yet.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account has expired.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `cardId` | value/mapping: card.CardID |
| `cardNumber` | value/mapping: card.CardNumber |
| `ownerType` | string; 'external' |
| `externalAccountId` | value/mapping: card.ExternalAccountID |
| `cardHolderName` | value/mapping: card.CardHolderName |
| `displayName` | value/mapping: card.CardHolderName \|\| card.DisplayName |
| `companyName` | value/mapping: card.CompanyName |
| `accountMode` | value/mapping: card.AccountMode |
| `creditLimitCents` | value/mapping: card.CreditLimitCents |
| `balanceCents` | number; Number(card.BalanceCents) |
| `availableBalanceCents` | number; Number(card.AvailablePrepaidCents) |
| `outstandingCents` | number; Number(card.OutstandingCents) |
| `availableCreditCents` | value/mapping: Math.max( Number(card.CreditLimitCents \|\| 0) - Number(card.OutstandingCents \|\| 0), 0 ) |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk card login failed.' |
| `details` | value/mapping: error.message |

### Typed SQL bindings — POST /api/kiosk/card-login

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `CardNumber` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kiosk/card-login

Source-explicit status codes: 200, 400, 403, 404, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Request body must contain valid JSON.`
- `cardNumber is required.`
- `Card not found.`
- `Card is inactive.`
- `Card is not valid yet.`
- `Card has expired.`
- `External account is inactive.`
- `External account is not valid yet.`
- `External account has expired.`
- `Kiosk card login failed.`

### Integrity, transactions and limitations — POST /api/kiosk/card-login

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/cards/{id?}

**Registration:** `kiosk-cards` · **source:** `lunchapp-api/src/functions/kiosk-cards.js:4` · **authLevel:** `anonymous`.

**Purpose:** Manage external/temporary cards (employee card mappings remain Employees).

**Path parameters:** id?.

**Query contract:** id optional; includeInactive defaultfalse even item lookup.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET mapped card(s) with account/balance; POST201,PUT/DELETE200 inserted card mapping.

**Business validation and rules [API unless labelled SQL]:** External-only API; employee number conflict409; active card cannot point inactive account409; referenced account exists; dates not constrained within account validity; SQL allows employee-type cards but API not.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/cards/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid card ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**getCards response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card number already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is invalid.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk external cards request failed.' |
| `details` | value/mapping: error.message |

**mapCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `cardId` | value/mapping: row.CardID |
| `cardNumber` | value/mapping: row.CardNumber |
| `ownerType` | string; 'external' |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `cardHolderName` | value/mapping: row.CardHolderName |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `accountIsActive` | boolean; Boolean(row.AccountIsActive) |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | value/mapping: row.ValidFrom |
| `validUntil` | value/mapping: row.ValidUntil |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — GET /api/kiosk/cards/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `CardID` | `sql.Int` |
| `IncludeInactive` | `sql.Bit` |

### Status and error contract — GET /api/kiosk/cards/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid card ID.`
- `Card ID is required.`
- `Method not allowed.`
- `External card not found.`
- `External card number already exists.`
- `The external account is invalid.`
- `Kiosk external cards request failed.`

### Integrity, transactions and limitations — GET /api/kiosk/cards/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/cards/{id?}

**Registration:** `kiosk-cards` · **source:** `lunchapp-api/src/functions/kiosk-cards.js:4` · **authLevel:** `anonymous`.

**Purpose:** Manage external/temporary cards (employee card mappings remain Employees).

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT cardNumber required trunc100,externalAccountId positive,cardHolderName optional trunc200,isActive defaulttrue,validFrom/validUntil ISOdatetime ordered.

**Response envelope / success behavior:** GET mapped card(s) with account/balance; POST201,PUT/DELETE200 inserted card mapping.

**Business validation and rules [API unless labelled SQL]:** External-only API; employee number conflict409; active card cannot point inactive account409; referenced account exists; dates not constrained within account validity; SQL allows employee-type cards but API not.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`. **Writes:** `dbo.KioskCards`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/cards/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid card ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**createCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: value.error |

**createCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'This card number is already assigned to an employee.' |
| `employeeNo` | value/mapping: conflict.EmployeeNo |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card number already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is invalid.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk external cards request failed.' |
| `details` | value/mapping: error.message |

**mapInsertedCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `cardId` | value/mapping: row.CardID |
| `cardNumber` | value/mapping: row.CardNumber |
| `ownerType` | string; 'external' |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `cardHolderName` | value/mapping: row.CardHolderName |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | value/mapping: row.ValidFrom |
| `validUntil` | value/mapping: row.ValidUntil |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — POST /api/kiosk/cards/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `CardNumber` | `sql.NVarChar(100)` |
| `ExternalAccountID` | `sql.Int` |
| `CardHolderName` | `sql.NVarChar(200)` |
| `IsActive` | `sql.Bit` |
| `ValidFrom` | `sql.DateTime2` |
| `ValidUntil` | `sql.DateTime2` |

### Status and error contract — POST /api/kiosk/cards/{id?}

Source-explicit status codes: 201, 400, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid card ID.`
- `Card ID is required.`
- `Method not allowed.`
- `This card number is already assigned to an employee.`
- `External card number already exists.`
- `The external account is invalid.`
- `Kiosk external cards request failed.`
- `External account does not exist.`
- `An active card cannot be assigned to an inactive external account.`
- `cardNumber is required.`
- `externalAccountId is required.`
- `validFrom must be a valid ISO date/time.`
- `validUntil must be a valid ISO date/time.`
- `validFrom cannot be later than validUntil.`

### Integrity, transactions and limitations — POST /api/kiosk/cards/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/kiosk/cards/{id?}

**Registration:** `kiosk-cards` · **source:** `lunchapp-api/src/functions/kiosk-cards.js:4` · **authLevel:** `anonymous`.

**Purpose:** Manage external/temporary cards (employee card mappings remain Employees).

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT cardNumber required trunc100,externalAccountId positive,cardHolderName optional trunc200,isActive defaulttrue,validFrom/validUntil ISOdatetime ordered.

**Response envelope / success behavior:** GET mapped card(s) with account/balance; POST201,PUT/DELETE200 inserted card mapping.

**Business validation and rules [API unless labelled SQL]:** External-only API; employee number conflict409; active card cannot point inactive account409; referenced account exists; dates not constrained within account validity; SQL allows employee-type cards but API not.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`. **Writes:** `dbo.KioskCards`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/kiosk/cards/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid card ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**updateCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: value.error |

**updateCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'This card number is already assigned to an employee.' |
| `employeeNo` | value/mapping: conflict.EmployeeNo |

**updateCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card number already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is invalid.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk external cards request failed.' |
| `details` | value/mapping: error.message |

**mapInsertedCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `cardId` | value/mapping: row.CardID |
| `cardNumber` | value/mapping: row.CardNumber |
| `ownerType` | string; 'external' |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `cardHolderName` | value/mapping: row.CardHolderName |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | value/mapping: row.ValidFrom |
| `validUntil` | value/mapping: row.ValidUntil |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — PUT /api/kiosk/cards/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `CardID` | `sql.Int` |
| `CardNumber` | `sql.NVarChar(100)` |
| `ExternalAccountID` | `sql.Int` |
| `CardHolderName` | `sql.NVarChar(200)` |
| `IsActive` | `sql.Bit` |
| `ValidFrom` | `sql.DateTime2` |
| `ValidUntil` | `sql.DateTime2` |

### Status and error contract — PUT /api/kiosk/cards/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid card ID.`
- `Card ID is required.`
- `Method not allowed.`
- `This card number is already assigned to an employee.`
- `External card not found.`
- `External card number already exists.`
- `The external account is invalid.`
- `Kiosk external cards request failed.`
- `External account does not exist.`
- `An active card cannot be assigned to an inactive external account.`
- `cardNumber is required.`
- `externalAccountId is required.`
- `validFrom must be a valid ISO date/time.`
- `validUntil must be a valid ISO date/time.`
- `validFrom cannot be later than validUntil.`

### Integrity, transactions and limitations — PUT /api/kiosk/cards/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/kiosk/cards/{id?}

**Registration:** `kiosk-cards` · **source:** `lunchapp-api/src/functions/kiosk-cards.js:4` · **authLevel:** `anonymous`.

**Purpose:** Manage external/temporary cards (employee card mappings remain Employees).

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET mapped card(s) with account/balance; POST201,PUT/DELETE200 inserted card mapping.

**Business validation and rules [API unless labelled SQL]:** External-only API; employee number conflict409; active card cannot point inactive account409; referenced account exists; dates not constrained within account validity; SQL allows employee-type cards but API not.

**Reads (including existence checks and view dependencies):** `dbo.KioskCards`. **Writes:** `dbo.KioskCards`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/kiosk/cards/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid card ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Card ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**deactivateCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External card number already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is invalid.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk external cards request failed.' |
| `details` | value/mapping: error.message |

**mapInsertedCard response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `cardId` | value/mapping: row.CardID |
| `cardNumber` | value/mapping: row.CardNumber |
| `ownerType` | string; 'external' |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `cardHolderName` | value/mapping: row.CardHolderName |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | value/mapping: row.ValidFrom |
| `validUntil` | value/mapping: row.ValidUntil |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — DELETE /api/kiosk/cards/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `CardID` | `sql.Int` |

### Status and error contract — DELETE /api/kiosk/cards/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid card ID.`
- `Card ID is required.`
- `Method not allowed.`
- `External card not found.`
- `External card number already exists.`
- `The external account is invalid.`
- `Kiosk external cards request failed.`

### Integrity, transactions and limitations — DELETE /api/kiosk/cards/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/external-accounts/{id?}

**Registration:** `kiosk-external-accounts` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:7` · **authLevel:** `anonymous`.

**Purpose:** Manage billing accounts and read derived financial balances.

**Path parameters:** id?.

**Query contract:** id optional; includeInactive defaultfalse list; accountMode optional Prepaid|Postpaid|Invoice.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET account(s) mapped with view financial totals/cardcounts;POST201;PUT/DELETE200.

**Business validation and rules [API unless labelled SQL]:** Mode change blocked if derived balance nonzero409; prepaid credit null/0 only; opening balance inserts Prepayment in same serializable transaction; DELETE deactivates account and all active linked cards, preserves history.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`, `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/external-accounts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**getAccounts response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**getAccounts response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'accountMode must be Prepaid, Postpaid or Invoice.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — GET /api/kiosk/external-accounts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `IncludeInactive` | `sql.Bit` |
| `AccountMode` | `sql.NVarChar(20)` |
| `ExternalAccountID` | `sql.Int` |

### Status and error contract — GET /api/kiosk/external-accounts/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `External account ID is required.`
- `Method not allowed.`
- `External account not found.`
- `accountMode must be Prepaid, Postpaid or Invoice.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — GET /api/kiosk/external-accounts/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/external-accounts/{id?}

**Registration:** `kiosk-external-accounts` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:7` · **authLevel:** `anonymous`.

**Purpose:** Manage billing accounts and read derived financial balances.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT displayName required trunc150,accountMode required,companyName200,externalReference100,invoiceReference100,contactName150,contactEmail254,creditLimitCents nullable nonnegative,isActive defaulttrue,validFrom/validUntil calendar dates ordered,notes1000; POST openingBalanceCents nonnegative Prepaidonly,createdBy.

**Response envelope / success behavior:** GET account(s) mapped with view financial totals/cardcounts;POST201;PUT/DELETE200.

**Business validation and rules [API unless labelled SQL]:** Mode change blocked if derived balance nonzero409; prepaid credit null/0 only; opening balance inserts Prepayment in same serializable transaction; DELETE deactivates account and all active linked cards, preserves history.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`. **Writes:** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`, `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/external-accounts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**createAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: value.error |

**createAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'openingBalanceCents must be a non-negative integer.' |

**createAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'openingBalanceCents is only allowed for Prepaid accounts.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapInsertedAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number 0 |
| `availablePrepaidCents` | number 0 |
| `outstandingCents` | number 0 |
| `activeCardCount` | number 0 |
| `totalCardCount` | number 0 |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — POST /api/kiosk/external-accounts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `AmountCents` | `sql.Int` |
| `Description` | `sql.NVarChar(500)` |
| `CreatedBy` | `sql.NVarChar(100)` |
| `DisplayName` | `sql.NVarChar(150)` |
| `CompanyName` | `sql.NVarChar(200)` |
| `AccountMode` | `sql.NVarChar(20)` |
| `ExternalReference` | `sql.NVarChar(100)` |
| `InvoiceReference` | `sql.NVarChar(100)` |
| `ContactName` | `sql.NVarChar(150)` |
| `ContactEmail` | `sql.NVarChar(254)` |
| `CreditLimitCents` | `sql.Int` |
| `IsActive` | `sql.Bit` |
| `ValidFrom` | `sql.Date` |
| `ValidUntil` | `sql.Date` |
| `Notes` | `sql.NVarChar(1000)` |

### Status and error contract — POST /api/kiosk/external-accounts/{id?}

Source-explicit status codes: 201, 400, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `External account ID is required.`
- `Method not allowed.`
- `openingBalanceCents must be a non-negative integer.`
- `openingBalanceCents is only allowed for Prepaid accounts.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`
- `displayName is required.`
- `accountMode must be Prepaid, Postpaid or Invoice.`
- `creditLimitCents must be a non-negative integer or null.`
- `Prepaid accounts cannot have a credit limit.`
- `validFrom must use YYYY-MM-DD format.`
- `validUntil must use YYYY-MM-DD format.`
- `validFrom cannot be later than validUntil.`
- `contactEmail is invalid.`

### Integrity, transactions and limitations — POST /api/kiosk/external-accounts/{id?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/kiosk/external-accounts/{id?}

**Registration:** `kiosk-external-accounts` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:7` · **authLevel:** `anonymous`.

**Purpose:** Manage billing accounts and read derived financial balances.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT displayName required trunc150,accountMode required,companyName200,externalReference100,invoiceReference100,contactName150,contactEmail254,creditLimitCents nullable nonnegative,isActive defaulttrue,validFrom/validUntil calendar dates ordered,notes1000; POST openingBalanceCents nonnegative Prepaidonly,createdBy.

**Response envelope / success behavior:** GET account(s) mapped with view financial totals/cardcounts;POST201;PUT/DELETE200.

**Business validation and rules [API unless labelled SQL]:** Mode change blocked if derived balance nonzero409; prepaid credit null/0 only; opening balance inserts Prepayment in same serializable transaction; DELETE deactivates account and all active linked cards, preserves history.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccounts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`, `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/kiosk/external-accounts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**updateAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: value.error |

**updateAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**updateAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Account mode cannot be changed while the account balance is non-zero.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapInsertedAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number 0 |
| `availablePrepaidCents` | number 0 |
| `outstandingCents` | number 0 |
| `activeCardCount` | number 0 |
| `totalCardCount` | number 0 |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — PUT /api/kiosk/external-accounts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `DisplayName` | `sql.NVarChar(150)` |
| `CompanyName` | `sql.NVarChar(200)` |
| `AccountMode` | `sql.NVarChar(20)` |
| `ExternalReference` | `sql.NVarChar(100)` |
| `InvoiceReference` | `sql.NVarChar(100)` |
| `ContactName` | `sql.NVarChar(150)` |
| `ContactEmail` | `sql.NVarChar(254)` |
| `CreditLimitCents` | `sql.Int` |
| `IsActive` | `sql.Bit` |
| `ValidFrom` | `sql.Date` |
| `ValidUntil` | `sql.Date` |
| `Notes` | `sql.NVarChar(1000)` |

### Status and error contract — PUT /api/kiosk/external-accounts/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `External account ID is required.`
- `Method not allowed.`
- `External account not found.`
- `Account mode cannot be changed while the account balance is non-zero.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`
- `displayName is required.`
- `accountMode must be Prepaid, Postpaid or Invoice.`
- `creditLimitCents must be a non-negative integer or null.`
- `Prepaid accounts cannot have a credit limit.`
- `validFrom must use YYYY-MM-DD format.`
- `validUntil must use YYYY-MM-DD format.`
- `validFrom cannot be later than validUntil.`
- `contactEmail is invalid.`

### Integrity, transactions and limitations — PUT /api/kiosk/external-accounts/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/kiosk/external-accounts/{id?}

**Registration:** `kiosk-external-accounts` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:7` · **authLevel:** `anonymous`.

**Purpose:** Manage billing accounts and read derived financial balances.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET account(s) mapped with view financial totals/cardcounts;POST201;PUT/DELETE200.

**Business validation and rules [API unless labelled SQL]:** Mode change blocked if derived balance nonzero409; prepaid credit null/0 only; opening balance inserts Prepayment in same serializable transaction; DELETE deactivates account and all active linked cards, preserves history.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccounts`, `dbo.KioskCards`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`, `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/kiosk/external-accounts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**deactivateAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — DELETE /api/kiosk/external-accounts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |

### Status and error contract — DELETE /api/kiosk/external-accounts/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `External account ID is required.`
- `Method not allowed.`
- `External account not found.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — DELETE /api/kiosk/external-accounts/{id?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/external-accounts/{id}/ledger

**Registration:** `kiosk-external-account-ledger` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:41` · **authLevel:** `anonymous`.

**Purpose:** Read combined physical ledger plus derived virtual lunch purchase entries.

**Path parameters:** id.

**Query contract:** id path;dateFrom/dateTo optional valid dates ordered;limit default200 clamped1..1000.

**Request body / field validation:** None.

**Response envelope / success behavior:** account mapped;entries mapped (negative synthetic IDs for virtual lunch purchases).

**Business validation and rules [API unless labelled SQL]:** Union ExternalAccountLedger + vwExternalLunchChargeEntries; virtual LunchPurchase never physically inserted; meals -SourceID, salads -(10^12+SourceID); dateTo inclusive via nextday exclusive;404 account.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`, `dbo.vwExternalLunchChargeEntries`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/external-accounts/{id}/ledger

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'dateFrom must use YYYY-MM-DD format.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'dateTo must use YYYY-MM-DD format.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'dateFrom cannot be later than dateTo.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'limit must be an integer between 1 and 1000.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `account` | value/mapping: mapAccount(account) |
| `entries` | value/mapping: result.recordset.map(mapLedgerEntry) |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Typed SQL bindings — GET /api/kiosk/external-accounts/{id}/ledger

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `DateFrom` | `sql.Date` |
| `DateTo` | `sql.Date` |
| `Limit` | `sql.Int` |

### Status and error contract — GET /api/kiosk/external-accounts/{id}/ledger

Source-explicit status codes: 200, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `dateFrom must use YYYY-MM-DD format.`
- `dateTo must use YYYY-MM-DD format.`
- `dateFrom cannot be later than dateTo.`
- `limit must be an integer between 1 and 1000.`
- `External account not found.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — GET /api/kiosk/external-accounts/{id}/ledger

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/external-accounts/{id}/deposit

**Registration:** `kiosk-external-account-deposit` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:141` · **authLevel:** `anonymous`.

**Purpose:** Append positive Prepayment for a prepaid billing account.

**Path parameters:** id.

**Query contract:** None used by this method.

**Request body / field validation:** amountCents positive integer,createdBy required trunc100;description500,settlementReference100,invoiceNumber100 optional.

**Response envelope / success behavior:** 201 entry and refreshed account.

**Business validation and rules [API unless labelled SQL]:** Account exists404,active409;Prepaid only409; serializable account lock on insert; date validity not checked; no idempotency key.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccountLedger`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/external-accounts/{id}/deposit

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'amountCents must be a positive integer.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'createdBy is required.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Deposits are only allowed for Prepaid accounts.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Use the deposit endpoint for Prepaid accounts.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `entry` | value/mapping: mapLedgerEntry(result.recordset[0]) |
| `account` | value/mapping: mapAccount(account) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

**mapLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ledgerEntryId` | value/mapping: row.LedgerEntryID |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `entryTime` | value/mapping: row.EntryTime |
| `entryType` | value/mapping: row.EntryType |
| `amountCents` | number; Number(row.AmountCents) |
| `saleId` | value/mapping: row.SaleID |
| `settlementReference` | value/mapping: row.SettlementReference |
| `invoiceNumber` | value/mapping: row.InvoiceNumber |
| `description` | value/mapping: row.Description |
| `createdBy` | value/mapping: row.CreatedBy |
| `reversesLedgerEntryId` | value/mapping: row.ReversesLedgerEntryID |

### Typed SQL bindings — POST /api/kiosk/external-accounts/{id}/deposit

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `EntryType` | `sql.NVarChar(30)` |
| `AmountCents` | `sql.Int` |
| `SettlementReference` | `sql.NVarChar(100)` |
| `InvoiceNumber` | `sql.NVarChar(100)` |
| `Description` | `sql.NVarChar(500)` |
| `CreatedBy` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kiosk/external-accounts/{id}/deposit

Source-explicit status codes: 201, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `Request body must contain valid JSON.`
- `amountCents must be a positive integer.`
- `createdBy is required.`
- `External account not found.`
- `External account is inactive.`
- `Deposits are only allowed for Prepaid accounts.`
- `Use the deposit endpoint for Prepaid accounts.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — POST /api/kiosk/external-accounts/{id}/deposit

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/external-accounts/{id}/payment

**Registration:** `kiosk-external-account-payment` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:150` · **authLevel:** `anonymous`.

**Purpose:** Append positive Payment to postpaid/invoice account.

**Path parameters:** id.

**Query contract:** None used by this method.

**Request body / field validation:** JSON object: amountCents positive integer; createdBy required string trimmed/truncated100; description optional string max500; settlementReference and invoiceNumber optional max100. Postpaid/Invoice account only; no purchase replay key..

**Response envelope / success behavior:** 201 entry and refreshed account.

**Business validation and rules [API unless labelled SQL]:** Account exists/active;Prepaid rejected409(use deposit); no overpayment restriction or invoice generation;serializable insert; no idempotency key.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccountLedger`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/external-accounts/{id}/payment

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'amountCents must be a positive integer.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'createdBy is required.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Deposits are only allowed for Prepaid accounts.' |

**handleLedgerCredit response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Use the deposit endpoint for Prepaid accounts.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `entry` | value/mapping: mapLedgerEntry(result.recordset[0]) |
| `account` | value/mapping: mapAccount(account) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

**mapLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ledgerEntryId` | value/mapping: row.LedgerEntryID |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `entryTime` | value/mapping: row.EntryTime |
| `entryType` | value/mapping: row.EntryType |
| `amountCents` | number; Number(row.AmountCents) |
| `saleId` | value/mapping: row.SaleID |
| `settlementReference` | value/mapping: row.SettlementReference |
| `invoiceNumber` | value/mapping: row.InvoiceNumber |
| `description` | value/mapping: row.Description |
| `createdBy` | value/mapping: row.CreatedBy |
| `reversesLedgerEntryId` | value/mapping: row.ReversesLedgerEntryID |

### Typed SQL bindings — POST /api/kiosk/external-accounts/{id}/payment

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `EntryType` | `sql.NVarChar(30)` |
| `AmountCents` | `sql.Int` |
| `SettlementReference` | `sql.NVarChar(100)` |
| `InvoiceNumber` | `sql.NVarChar(100)` |
| `Description` | `sql.NVarChar(500)` |
| `CreatedBy` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kiosk/external-accounts/{id}/payment

Source-explicit status codes: 201, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `Request body must contain valid JSON.`
- `amountCents must be a positive integer.`
- `createdBy is required.`
- `External account not found.`
- `External account is inactive.`
- `Deposits are only allowed for Prepaid accounts.`
- `Use the deposit endpoint for Prepaid accounts.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — POST /api/kiosk/external-accounts/{id}/payment

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/external-accounts/{id}/adjustment

**Registration:** `kiosk-external-account-adjustment` · **source:** `lunchapp-api/src/functions/kiosk-external-accounts.js:159` · **authLevel:** `anonymous`.

**Purpose:** Append signed Credit or Adjustment to billing ledger.

**Path parameters:** id.

**Query contract:** None used by this method.

**Request body / field validation:** entryType Credit|Adjustment,amountCents nonzero signedinteger,createdBy required,description required;settlementReference optional.

**Response envelope / success behavior:** 201 entry and refreshed account.

**Business validation and rules [API unless labelled SQL]:** Account exists/active; both signs permitted even Credit; no mode restriction; no reversal link exposed; separate from manual employee lunch adjustment.

**Reads (including existence checks and view dependencies):** `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccountLedger`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/external-accounts.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/external-accounts/{id}/adjustment

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid external account ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'entryType must be Credit or Adjustment.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'amountCents must be a non-zero integer.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'createdBy is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'description is required for adjustments.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account not found.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'External account is inactive.' |

**insertLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `entry` | value/mapping: mapLedgerEntry(result.recordset[0]) |
| `account` | value/mapping: mapAccount(account) |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting external account record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The external account is referenced by another record.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapAccount response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `externalReference` | value/mapping: row.ExternalReference |
| `invoiceReference` | value/mapping: row.InvoiceReference |
| `contactName` | value/mapping: row.ContactName |
| `contactEmail` | value/mapping: row.ContactEmail |
| `creditLimitCents` | value/mapping: row.CreditLimitCents |
| `isActive` | boolean; Boolean(row.IsActive) |
| `validFrom` | date/time string; dateOnly(row.ValidFrom) |
| `validUntil` | date/time string; dateOnly(row.ValidUntil) |
| `notes` | value/mapping: row.Notes |
| `balanceCents` | number; Number(row.BalanceCents \|\| 0) |
| `availablePrepaidCents` | number; Number(row.AvailablePrepaidCents \|\| 0) |
| `outstandingCents` | number; Number(row.OutstandingCents \|\| 0) |
| `activeCardCount` | number; Number(row.ActiveCardCount \|\| 0) |
| `totalCardCount` | number; Number(row.TotalCardCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

**mapLedgerEntry response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ledgerEntryId` | value/mapping: row.LedgerEntryID |
| `externalAccountId` | value/mapping: row.ExternalAccountID |
| `entryTime` | value/mapping: row.EntryTime |
| `entryType` | value/mapping: row.EntryType |
| `amountCents` | number; Number(row.AmountCents) |
| `saleId` | value/mapping: row.SaleID |
| `settlementReference` | value/mapping: row.SettlementReference |
| `invoiceNumber` | value/mapping: row.InvoiceNumber |
| `description` | value/mapping: row.Description |
| `createdBy` | value/mapping: row.CreatedBy |
| `reversesLedgerEntryId` | value/mapping: row.ReversesLedgerEntryID |

### Typed SQL bindings — POST /api/kiosk/external-accounts/{id}/adjustment

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ExternalAccountID` | `sql.Int` |
| `EntryType` | `sql.NVarChar(30)` |
| `AmountCents` | `sql.Int` |
| `SettlementReference` | `sql.NVarChar(100)` |
| `InvoiceNumber` | `sql.NVarChar(100)` |
| `Description` | `sql.NVarChar(500)` |
| `CreatedBy` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kiosk/external-accounts/{id}/adjustment

Source-explicit status codes: 201, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid external account ID.`
- `Request body must contain valid JSON.`
- `entryType must be Credit or Adjustment.`
- `amountCents must be a non-zero integer.`
- `createdBy is required.`
- `description is required for adjustments.`
- `External account not found.`
- `External account is inactive.`
- `A conflicting external account record already exists.`
- `The external account is referenced by another record.`

### Integrity, transactions and limitations — POST /api/kiosk/external-accounts/{id}/adjustment

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/layouts/{id?}

**Registration:** `kiosk-layouts` · **source:** `lunchapp-api/src/functions/kiosk-layouts.js:12` · **authLevel:** `anonymous`.

**Purpose:** List layouts, read default/ID layout or replace items.

**Path parameters:** id?.

**Query contract:** id optional; special GET default;PUT positiveid.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET array or layout metadata+items+embedded product;PUT refreshed layout.

**Business validation and rules [API unless labelled SQL]:** Serializable replace; active products only; no create/delete or metadata edit route; getLayout uses legacy ImageUrl not ImageAssets; café merges fresh products API to compensate.

**Reads (including existence checks and view dependencies):** `dbo.KioskLayoutItems`, `dbo.KioskLayouts`, `dbo.KioskProducts`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/layouts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid layout ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Layout ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**listLayouts response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `layoutId` | number; Number(row.LayoutID) |
| `layoutName` | value/mapping: row.LayoutName |
| `isActive` | boolean; Boolean(row.IsActive) |
| `isDefault` | boolean; Boolean(row.IsDefault) |
| `itemCount` | number; Number(row.ItemCount \|\| 0) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

**getDefaultLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'No active default kiosk layout exists.' |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `layoutItemId` | number; Number(row.LayoutItemID) |
| `productId` | number; Number(row.ProductID) |
| `columnNo` | number; Number(row.ColumnNo) |
| `rowNo` | number; Number(row.RowNo) |
| `isVisible` | boolean; Boolean(row.IsVisible) |
| `product` | object {productId: number; Number(row.ProductID); nameEn: value/mapping: row.NameEN; nameSv: value/mapping: row.NameSV; nameFi: value/mapping: row.NameFI; price: number; Number(row.Price); icon: value/mapping: row.Icon; imageUrl: value/mapping: row.ImageUrl; active: boolean; Boolean(row.Active)} |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Layout not found.' |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `layoutId` | number; Number(layout.LayoutID) |
| `layoutName` | value/mapping: layout.LayoutName |
| `isActive` | boolean; Boolean(layout.IsActive) |
| `isDefault` | boolean; Boolean(layout.IsDefault) |
| `createdAt` | value/mapping: layout.CreatedAt |
| `updatedAt` | value/mapping: layout.UpdatedAt |
| `items` | value/mapping: itemResult.recordset.map(row => ({ layoutItemId: Number(row.LayoutItemID), productId: Number(row.ProductID), columnNo: Number(row.ColumnNo), rowNo: Number(row.RowNo), isVisible: Boolean(row.IsVisible), product: { productId: Number(row.ProductID), nameEn: row.NameEN, nameSv: row.NameSV, nameFi: row.NameFI, price: Number(row.Price), icon: row.Icon, imageUrl: row.ImageUrl, active: Boolean(row.Active) } })) |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The layout contains a duplicate product or position.' |
| `details` | value/mapping: error.message |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The layout conflicts with a database constraint.' |
| `details` | value/mapping: error.message |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk layouts request failed.' |
| `details` | value/mapping: error.message |

### Typed SQL bindings — GET /api/kiosk/layouts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `LayoutID` | `sql.Int` |

### Status and error contract — GET /api/kiosk/layouts/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid layout ID.`
- `Layout ID is required.`
- `Method not allowed.`
- `No active default kiosk layout exists.`
- `Layout not found.`
- `The layout contains a duplicate product or position.`
- `The layout conflicts with a database constraint.`
- `Kiosk layouts request failed.`

### Integrity, transactions and limitations — GET /api/kiosk/layouts/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskLayoutItems_ColumnNo`: ([ColumnNo]=(2) OR [ColumnNo]=(1))
- `CK_KioskLayoutItems_RowNo`: ([RowNo]>=(1))
- `CK_KioskLayouts_LayoutName`: (len(ltrim(rtrim([LayoutName])))>(0))
- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/kiosk/layouts/{id?}

**Registration:** `kiosk-layouts` · **source:** `lunchapp-api/src/functions/kiosk-layouts.js:12` · **authLevel:** `anonymous`.

**Purpose:** List layouts, read default/ID layout or replace items.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** PUT items[{productId,columnNo1|2,rowNo1..32767,isVisible defaulttrue}] max500,unique products/positions,consecutive rows percolumn.

**Response envelope / success behavior:** GET array or layout metadata+items+embedded product;PUT refreshed layout.

**Business validation and rules [API unless labelled SQL]:** Serializable replace; active products only; no create/delete or metadata edit route; getLayout uses legacy ImageUrl not ImageAssets; café merges fresh products API to compensate.

**Reads (including existence checks and view dependencies):** `dbo.KioskLayoutItems`, `dbo.KioskLayouts`, `dbo.KioskProducts`. **Writes:** `dbo.KioskLayoutItems`, `dbo.KioskLayouts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/kiosk/layouts/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid layout ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Layout ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The layout contains a duplicate product or position.' |
| `details` | value/mapping: error.message |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The layout conflicts with a database constraint.' |
| `details` | value/mapping: error.message |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk layouts request failed.' |
| `details` | value/mapping: error.message |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `layoutItemId` | number; Number(row.LayoutItemID) |
| `productId` | number; Number(row.ProductID) |
| `columnNo` | number; Number(row.ColumnNo) |
| `rowNo` | number; Number(row.RowNo) |
| `isVisible` | boolean; Boolean(row.IsVisible) |
| `product` | object {productId: number; Number(row.ProductID); nameEn: value/mapping: row.NameEN; nameSv: value/mapping: row.NameSV; nameFi: value/mapping: row.NameFI; price: number; Number(row.Price); icon: value/mapping: row.Icon; imageUrl: value/mapping: row.ImageUrl; active: boolean; Boolean(row.Active)} |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Layout not found.' |

**getLayout response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `layoutId` | number; Number(layout.LayoutID) |
| `layoutName` | value/mapping: layout.LayoutName |
| `isActive` | boolean; Boolean(layout.IsActive) |
| `isDefault` | boolean; Boolean(layout.IsDefault) |
| `createdAt` | value/mapping: layout.CreatedAt |
| `updatedAt` | value/mapping: layout.UpdatedAt |
| `items` | value/mapping: itemResult.recordset.map(row => ({ layoutItemId: Number(row.LayoutItemID), productId: Number(row.ProductID), columnNo: Number(row.ColumnNo), rowNo: Number(row.RowNo), isVisible: Boolean(row.IsVisible), product: { productId: Number(row.ProductID), nameEn: row.NameEN, nameSv: row.NameSV, nameFi: row.NameFI, price: Number(row.Price), icon: row.Icon, imageUrl: row.ImageUrl, active: Boolean(row.Active) } })) |

**normalizeItems response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | number; Number(item.productId) |
| `columnNo` | number; Number(item.columnNo) |
| `rowNo` | number; Number(item.rowNo) |
| `isVisible` | value/mapping: item.isVisible !== false |

### Typed SQL bindings — PUT /api/kiosk/layouts/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `LayoutID` | `sql.Int` |
| `ProductIDs` | `sql.NVarChar(sql.MAX)` |
| `ItemsJson` | `sql.NVarChar(sql.MAX)` |

### Status and error contract — PUT /api/kiosk/layouts/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid layout ID.`
- `Layout ID is required.`
- `Method not allowed.`
- `The layout contains a duplicate product or position.`
- `The layout conflicts with a database constraint.`
- `Kiosk layouts request failed.`
- `Layout not found.`
- `items must be an array.`
- `A layout may contain at most 500 products.`
- `Every item requires a positive integer productId.`
- `columnNo must be 1 or 2.`
- `rowNo must be between 1 and 32767.`
- `Product ${productId} appears more than once.`
- `Position column ${columnNo}, row ${rowNo} is used more than once.`
- `Rows in column ${columnNo} must be consecutive starting at 1.`

### Integrity, transactions and limitations — PUT /api/kiosk/layouts/{id?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskLayoutItems_ColumnNo`: ([ColumnNo]=(2) OR [ColumnNo]=(1))
- `CK_KioskLayoutItems_RowNo`: ([RowNo]>=(1))
- `CK_KioskLayouts_LayoutName`: (len(ltrim(rtrim([LayoutName])))>(0))
- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/products/{id?}

**Registration:** `kiosk-products` · **source:** `lunchapp-api/src/functions/kiosk-products.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/deactivate café product library and managed-image links.

**Path parameters:** id?.

**Query contract:** id optional;includeInactive defaultfalse list.

**Request body / field validation:** None.

**Response envelope / success behavior:** Mapped product array/item includes managed image URL preferred over legacy URL;create201;update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** POST rejects id;PUT/DELETE require id;DELETE soft;ImageAssetID existence via FK; SQL conflicts409; product price EUR decimal, sales integercents.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/products/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid product ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Do not include a product ID when creating a product.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**getProducts response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | value/mapping: row.ProductID |
| `nameEn` | value/mapping: row.NameEN |
| `nameSv` | value/mapping: row.NameSV |
| `nameFi` | value/mapping: row.NameFI |
| `price` | number; Number(row.Price) |
| `icon` | value/mapping: row.Icon |
| `imageAssetId` | value/mapping: imageAssetId |
| `imageDisplayName` | value/mapping: row.ImageDisplayName \|\| null |
| `imageOriginalFileName` | value/mapping: row.ImageOriginalFileName \|\| null |
| `imageContentType` | value/mapping: row.ImageContentType \|\| null |
| `imageFileSize` | value/mapping: row.ImageFileSize === null \|\| row.ImageFileSize === undefined ? null : Number(row.ImageFileSize) |
| `imageUrl` | value/mapping: managedImageUrl \|\| row.ImageUrl |
| `legacyImageUrl` | value/mapping: row.ImageUrl |
| `active` | boolean; Boolean(row.Active) |
| `isActive` | boolean; Boolean(row.Active) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — GET /api/kiosk/products/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `IncludeInactive` | `sql.Bit` |
| `ProductID` | `sql.Int` |

### Status and error contract — GET /api/kiosk/products/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid product ID.`
- `Do not include a product ID when creating a product.`
- `Product ID is required.`
- `Method not allowed.`
- `Product not found.`
- `A conflicting record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — GET /api/kiosk/products/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/products/{id?}

**Registration:** `kiosk-products` · **source:** `lunchapp-api/src/functions/kiosk-products.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/deactivate café product library and managed-image links.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT nameEn required trunc255,nameSv/nameFi optional255,price nonnegative <=99999999.99 <=2decimals,icon100,imageUrl500,imageAssetId positiveornull,active/isActive defaulttrue.

**Response envelope / success behavior:** Mapped product array/item includes managed image URL preferred over legacy URL;create201;update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** POST rejects id;PUT/DELETE require id;DELETE soft;ImageAssetID existence via FK; SQL conflicts409; product price EUR decimal, sales integercents.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** `dbo.KioskProducts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/products/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid product ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Do not include a product ID when creating a product.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**createProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: validation.error |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | value/mapping: row.ProductID |
| `nameEn` | value/mapping: row.NameEN |
| `nameSv` | value/mapping: row.NameSV |
| `nameFi` | value/mapping: row.NameFI |
| `price` | number; Number(row.Price) |
| `icon` | value/mapping: row.Icon |
| `imageAssetId` | value/mapping: imageAssetId |
| `imageDisplayName` | value/mapping: row.ImageDisplayName \|\| null |
| `imageOriginalFileName` | value/mapping: row.ImageOriginalFileName \|\| null |
| `imageContentType` | value/mapping: row.ImageContentType \|\| null |
| `imageFileSize` | value/mapping: row.ImageFileSize === null \|\| row.ImageFileSize === undefined ? null : Number(row.ImageFileSize) |
| `imageUrl` | value/mapping: managedImageUrl \|\| row.ImageUrl |
| `legacyImageUrl` | value/mapping: row.ImageUrl |
| `active` | boolean; Boolean(row.Active) |
| `isActive` | boolean; Boolean(row.Active) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — POST /api/kiosk/products/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ProductID` | `sql.Int` |
| `NameEN` | `sql.NVarChar(255)` |
| `NameSV` | `sql.NVarChar(255)` |
| `NameFI` | `sql.NVarChar(255)` |
| `Price` | `sql.Decimal(10, 2)` |
| `Icon` | `sql.NVarChar(100)` |
| `ImageUrl` | `sql.NVarChar(500)` |
| `ImageAssetID` | `sql.Int` |
| `Active` | `sql.Bit` |

### Status and error contract — POST /api/kiosk/products/{id?}

Source-explicit status codes: 201, 400, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid product ID.`
- `Do not include a product ID when creating a product.`
- `Product ID is required.`
- `Method not allowed.`
- `A conflicting record already exists.`
- `The requested change conflicts with existing data or a database constraint.`
- `nameEn is required.`
- `price is required and must be a non-negative number with no more than two decimal places.`
- `imageAssetId must be a positive integer or null.`

### Integrity, transactions and limitations — POST /api/kiosk/products/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/kiosk/products/{id?}

**Registration:** `kiosk-products` · **source:** `lunchapp-api/src/functions/kiosk-products.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/deactivate café product library and managed-image links.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT nameEn required trunc255,nameSv/nameFi optional255,price nonnegative <=99999999.99 <=2decimals,icon100,imageUrl500,imageAssetId positiveornull,active/isActive defaulttrue.

**Response envelope / success behavior:** Mapped product array/item includes managed image URL preferred over legacy URL;create201;update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** POST rejects id;PUT/DELETE require id;DELETE soft;ImageAssetID existence via FK; SQL conflicts409; product price EUR decimal, sales integercents.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** `dbo.KioskProducts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/kiosk/products/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid product ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Do not include a product ID when creating a product.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**updateProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: validation.error |

**updateProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | value/mapping: row.ProductID |
| `nameEn` | value/mapping: row.NameEN |
| `nameSv` | value/mapping: row.NameSV |
| `nameFi` | value/mapping: row.NameFI |
| `price` | number; Number(row.Price) |
| `icon` | value/mapping: row.Icon |
| `imageAssetId` | value/mapping: imageAssetId |
| `imageDisplayName` | value/mapping: row.ImageDisplayName \|\| null |
| `imageOriginalFileName` | value/mapping: row.ImageOriginalFileName \|\| null |
| `imageContentType` | value/mapping: row.ImageContentType \|\| null |
| `imageFileSize` | value/mapping: row.ImageFileSize === null \|\| row.ImageFileSize === undefined ? null : Number(row.ImageFileSize) |
| `imageUrl` | value/mapping: managedImageUrl \|\| row.ImageUrl |
| `legacyImageUrl` | value/mapping: row.ImageUrl |
| `active` | boolean; Boolean(row.Active) |
| `isActive` | boolean; Boolean(row.Active) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — PUT /api/kiosk/products/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ProductID` | `sql.Int` |
| `NameEN` | `sql.NVarChar(255)` |
| `NameSV` | `sql.NVarChar(255)` |
| `NameFI` | `sql.NVarChar(255)` |
| `Price` | `sql.Decimal(10, 2)` |
| `Icon` | `sql.NVarChar(100)` |
| `ImageUrl` | `sql.NVarChar(500)` |
| `ImageAssetID` | `sql.Int` |
| `Active` | `sql.Bit` |

### Status and error contract — PUT /api/kiosk/products/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid product ID.`
- `Do not include a product ID when creating a product.`
- `Product ID is required.`
- `Method not allowed.`
- `Product not found.`
- `A conflicting record already exists.`
- `The requested change conflicts with existing data or a database constraint.`
- `nameEn is required.`
- `price is required and must be a non-negative number with no more than two decimal places.`
- `imageAssetId must be a positive integer or null.`

### Integrity, transactions and limitations — PUT /api/kiosk/products/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/kiosk/products/{id?}

**Registration:** `kiosk-products` · **source:** `lunchapp-api/src/functions/kiosk-products.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/deactivate café product library and managed-image links.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** None.

**Response envelope / success behavior:** Mapped product array/item includes managed image URL preferred over legacy URL;create201;update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** POST rejects id;PUT/DELETE require id;DELETE soft;ImageAssetID existence via FK; SQL conflicts409; product price EUR decimal, sales integercents.

**Reads (including existence checks and view dependencies):** `dbo.ImageAssets`, `dbo.KioskProducts`. **Writes:** `dbo.KioskProducts`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js`, `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/kiosk/products/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid product ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Do not include a product ID when creating a product.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**deactivateProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Product not found.' |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'A conflicting record already exists.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'The requested change conflicts with existing data or a database constraint.' |
| `details` | value/mapping: error.message |

**databaseError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**mapProduct response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | value/mapping: row.ProductID |
| `nameEn` | value/mapping: row.NameEN |
| `nameSv` | value/mapping: row.NameSV |
| `nameFi` | value/mapping: row.NameFI |
| `price` | number; Number(row.Price) |
| `icon` | value/mapping: row.Icon |
| `imageAssetId` | value/mapping: imageAssetId |
| `imageDisplayName` | value/mapping: row.ImageDisplayName \|\| null |
| `imageOriginalFileName` | value/mapping: row.ImageOriginalFileName \|\| null |
| `imageContentType` | value/mapping: row.ImageContentType \|\| null |
| `imageFileSize` | value/mapping: row.ImageFileSize === null \|\| row.ImageFileSize === undefined ? null : Number(row.ImageFileSize) |
| `imageUrl` | value/mapping: managedImageUrl \|\| row.ImageUrl |
| `legacyImageUrl` | value/mapping: row.ImageUrl |
| `active` | boolean; Boolean(row.Active) |
| `isActive` | boolean; Boolean(row.Active) |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — DELETE /api/kiosk/products/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ProductID` | `sql.Int` |

### Status and error contract — DELETE /api/kiosk/products/{id?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid product ID.`
- `Do not include a product ID when creating a product.`
- `Product ID is required.`
- `Method not allowed.`
- `Product not found.`
- `A conflicting record already exists.`
- `The requested change conflicts with existing data or a database constraint.`

### Integrity, transactions and limitations — DELETE /api/kiosk/products/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/reports/{report?}

**Registration:** `kiosk-reports` · **source:** `lunchapp-api/src/functions/kiosk-reports.js:16` · **authLevel:** `anonymous`.

**Purpose:** Dispatch café overview/transactions/payroll/external-invoicing/export report.

**Path parameters:** report?.

**Query contract:** report path optional defaultoverview;from/to default UTC monthstart/today realdates <=370inclusive days;groupByday|week|month;page default1;pageSize default50 max200;ownerTypeemployee|external;statusCompleted|Voided;accountMode commalist defaultInvoice;type/report export selector.

**Request body / field validation:** None.

**Response envelope / success behavior:** JSON no-store for overview/transactions/payroll/external-invoicing; export returns CSV BOM, quoted semicolon columns, CRLF and decimal-comma TotalAmount with attachment header. Exact selector schemas, inclusion, dates and CSV headings are documented below and in12-REPORTING.md..

**Business validation and rules [API unless labelled SQL]:** FLE Standard Time SQL local sale-date filtering;overview/payroll/external onlyCompleted;transactions allstatuses bydefault;payroll EmployeeNo amount aggregate;external billing account/mode aggregate; no lunch/ledger/manualadjustments included.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.KioskSaleLines`, `dbo.KioskSales`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/reports/{report?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**getOverview response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `period` | value/mapping: periodPayload(period, { groupBy, timeZone: 'Europe/Helsinki' }) |
| `summary` | object {totalSalesCents: number; number(summary.TotalSalesCents); transactionCount: number; number(summary.TransactionCount); productQuantity: number; number(summary.ProductQuantity); employeeSalesCents: number; number(summary.EmployeeSalesCents); externalSalesCents: number; number(summary.ExternalSalesCents); employeeTransactionCount: number; number(summary.EmployeeTransactionCount); externalTransactionCount: number; number(summary.ExternalTransactionCount)} |
| `trend` | value/mapping: trendResult.recordset.map(row => ({ periodStart: dateOnly(row.PeriodStart), periodEnd: dateOnly(row.PeriodEnd), totalSalesCents: number(row.TotalSalesCents), transactionCount: number(row.TransactionCount), productQuantity: number(row.ProductQuantity) })) |
| `topProducts` | value/mapping: productsResult.recordset.map(row => ({ productId: number(row.ProductID), productName: row.ProductName, quantity: number(row.Quantity), totalSalesCents: number(row.TotalSalesCents) })) |

**getOverview response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `periodStart` | date/time string; dateOnly(row.PeriodStart) |
| `periodEnd` | date/time string; dateOnly(row.PeriodEnd) |
| `totalSalesCents` | number; number(row.TotalSalesCents) |
| `transactionCount` | number; number(row.TransactionCount) |
| `productQuantity` | number; number(row.ProductQuantity) |

**getOverview response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | number; number(row.ProductID) |
| `productName` | value/mapping: row.ProductName |
| `quantity` | number; number(row.Quantity) |
| `totalSalesCents` | number; number(row.TotalSalesCents) |

**getTransactions response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `period` | value/mapping: periodPayload(period) |
| `page` | value/mapping: page |
| `pageSize` | value/mapping: pageSize |
| `totalRows` | value/mapping: result.recordset.length ? number(result.recordset[0].TotalRows) : 0 |
| `rows` | value/mapping: result.recordset.map(row => ({ saleId: number(row.SaleID), saleTime: row.SaleTime, status: row.Status, ownerType: String(row.OwnerType).toLowerCase(), employeeNo: nullableNumber(row.EmployeeNo), externalAccountId: nullableNumber(row.ExternalAccountID), displayName: row.DisplayName, companyName: row.CompanyName, accountMode: row.AccountMode, totalCents: number(row.TotalCents), items: linesBySale.get(number(row.SaleID)) \|\| [] })) |

**getTransactions response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleLineId` | number; number(line.SaleLineID) |
| `productId` | number; number(line.ProductID) |
| `productName` | value/mapping: line.ProductNameSnapshot |
| `unitPriceCents` | number; number(line.UnitPriceCents) |
| `quantity` | number; number(line.Quantity) |
| `lineTotalCents` | number; number(line.LineTotalCents) |

**getTransactions response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleId` | number; number(row.SaleID) |
| `saleTime` | value/mapping: row.SaleTime |
| `status` | value/mapping: row.Status |
| `ownerType` | value/mapping: String(row.OwnerType).toLowerCase() |
| `employeeNo` | number; nullableNumber(row.EmployeeNo) |
| `externalAccountId` | number; nullableNumber(row.ExternalAccountID) |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `totalCents` | number; number(row.TotalCents) |
| `items` | value/mapping: linesBySale.get(number(row.SaleID)) \|\| [] |

**getPayroll response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `period` | value/mapping: periodPayload(period) |
| `summary` | object {employeeCount: value/mapping: rows.length; transactionCount: value/mapping: rows.reduce((sum, row) => sum + row.transactionCount, 0); totalCents: value/mapping: rows.reduce((sum, row) => sum + row.totalCents, 0)} |
| `rows` | value/mapping: rows |

**getPayroll response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `employeeNo` | number; number(row.EmployeeNo) |
| `employeeName` | value/mapping: row.EmployeeName \|\| Employee ${row.EmployeeNo} |
| `transactionCount` | number; number(row.TransactionCount) |
| `totalCents` | number; number(row.TotalCents) |

**getExternalInvoicing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `period` | value/mapping: periodPayload(period, { accountModes: modes }) |
| `summary` | object {accountCount: value/mapping: rows.length; transactionCount: value/mapping: rows.reduce((sum, row) => sum + row.transactionCount, 0); totalCents: value/mapping: rows.reduce((sum, row) => sum + row.totalCents, 0)} |
| `rows` | value/mapping: rows |

**getExternalInvoicing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | number; number(row.ExternalAccountID) |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `transactionCount` | number; number(row.TransactionCount) |
| `totalCents` | number; number(row.TotalCents) |

**errorResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk reporting request failed.' |
| `details` | value/mapping: error.message |

**periodPayload response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `from` | value/mapping: period.from |
| `to` | value/mapping: period.to |

**getExternalDetails response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | number; number(row.ExternalAccountID) |
| `displayName` | value/mapping: row.DisplayName |
| `companyName` | value/mapping: row.CompanyName |
| `accountMode` | value/mapping: row.AccountMode |
| `cardHolderName` | value/mapping: row.CardHolderName |
| `saleId` | number; number(row.SaleID) |
| `saleTime` | value/mapping: row.SaleTime |
| `totalCents` | number; number(row.TotalCents) |

### Typed SQL bindings — GET /api/kiosk/reports/{report?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `GroupBy` | `sql.NVarChar(10)` |
| `OwnerType` | `sql.NVarChar(20)` |
| `Status` | `sql.NVarChar(20)` |
| `Offset` | `sql.Int` |
| `PageSize` | `sql.Int` |
| `SaleIDs` | `sql.NVarChar(sql.MAX)` |
| `ModesJson` | `sql.NVarChar(sql.MAX)` |
| `FromDate` | `sql.Date` |
| `ToDate` | `sql.Date` |

### Status and error contract — GET /api/kiosk/reports/{report?}

Source-explicit status codes: 200, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Kiosk reporting request failed.`

### Integrity, transactions and limitations — GET /api/kiosk/reports/{report?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskSaleLines_LineTotalCents`: ([LineTotalCents]=CONVERT([bigint],[UnitPriceCents])*[Quantity])
- `CK_KioskSaleLines_ProductName`: (len(ltrim(rtrim([ProductNameSnapshot])))>(0))
- `CK_KioskSaleLines_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(100))
- `CK_KioskSaleLines_UnitPrice`: ([UnitPriceCents]>=(0))
- `CK_KioskSaleLines_UnitPriceCents`: ([UnitPriceCents]>=(0))
- `CK_KioskSales_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskSales_OwnerReference`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL AND [CardID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL AND [CardID] IS NOT NULL)
- `CK_KioskSales_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskSales_Status`: ([Status]=N'Refunded' OR [Status]=N'PartiallyRefunded' OR [Status]=N'Voided' OR [Status]=N'Completed')
- `CK_KioskSales_TotalCents`: ([TotalCents]>=(0))
- `CK_KioskSales_VoidFields`: ([Status]<>N'Voided' OR [VoidedAt] IS NOT NULL AND [VoidedBy] IS NOT NULL AND [VoidReason] IS NOT NULL)

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kiosk/sales/{id?}

**Registration:** `kiosk-sales` · **source:** `lunchapp-api/src/functions/kiosk-sales.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read sale by ID or create idempotent card-resolved café purchase.

**Path parameters:** id?.

**Query contract:** id optional path but GET requires positive safeinteger.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET sale+lines;POST201 sale/financial beforeafter/items;replay200 same sale+alreadyProcessed.

**Business validation and rules [API unless labelled SQL]:** Serializable;RequestID UPDLOCK/HOLDLOCK; employee card authoritative first no activity check; external card/account current active/validity; active products and server price snapshots;total<=intmax;Prepaid available view funds,Postpaid/Invoice configured limit-outstanding; external negative Purchase ledger same transaction.

**Reads (including existence checks and view dependencies):** `dbo.KioskSaleLines`, `dbo.KioskSales`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kiosk/sales/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Sale ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Sale not found.' |

**readSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleId` | number; Number(x.SaleID) |
| `cardId` | value/mapping: x.CardID===null?null:Number(x.CardID) |
| `ownerType` | value/mapping: String(x.OwnerType).toLowerCase() |
| `employeeNo` | value/mapping: x.EmployeeNo===null?null:Number(x.EmployeeNo) |
| `externalAccountId` | value/mapping: x.ExternalAccountID===null?null:Number(x.ExternalAccountID) |
| `saleTime` | value/mapping: x.SaleTime |
| `totalCents` | number; Number(x.TotalCents) |
| `status` | value/mapping: x.Status |
| `createdBy` | value/mapping: x.CreatedBy |
| `items` | value/mapping: r.recordset.filter(y=>y.SaleLineID!==null).map(y=>({saleLineId:Number(y.SaleLineID),productId:Number(y.ProductID),productName:y.ProductNameSnapshot,unitPriceCents:Number(y.UnitPriceCents),quantity:Number(y.Quantity),lineTotalCents:Number(y.LineTotalCents)})) |

**readSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleLineId` | number; Number(y.SaleLineID) |
| `productId` | number; Number(y.ProductID) |
| `productName` | value/mapping: y.ProductNameSnapshot |
| `unitPriceCents` | number; Number(y.UnitPriceCents) |
| `quantity` | number; Number(y.Quantity) |
| `lineTotalCents` | number; Number(y.LineTotalCents) |

**fail response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'This request has already been processed.' |

**fail response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk sales request failed.' |
| `details` | value/mapping: e.message |

### Typed SQL bindings — GET /api/kiosk/sales/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ID` | `sql.BigInt` |

### Status and error contract — GET /api/kiosk/sales/{id?}

Source-explicit status codes: Implicit 200 / delegated wrapper status; see purpose/response.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Sale ID is required.`
- `Sale not found.`
- `This request has already been processed.`
- `Kiosk sales request failed.`

### Integrity, transactions and limitations — GET /api/kiosk/sales/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskSaleLines_LineTotalCents`: ([LineTotalCents]=CONVERT([bigint],[UnitPriceCents])*[Quantity])
- `CK_KioskSaleLines_ProductName`: (len(ltrim(rtrim([ProductNameSnapshot])))>(0))
- `CK_KioskSaleLines_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(100))
- `CK_KioskSaleLines_UnitPrice`: ([UnitPriceCents]>=(0))
- `CK_KioskSaleLines_UnitPriceCents`: ([UnitPriceCents]>=(0))
- `CK_KioskSales_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskSales_OwnerReference`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL AND [CardID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL AND [CardID] IS NOT NULL)
- `CK_KioskSales_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskSales_Status`: ([Status]=N'Refunded' OR [Status]=N'PartiallyRefunded' OR [Status]=N'Voided' OR [Status]=N'Completed')
- `CK_KioskSales_TotalCents`: ([TotalCents]>=(0))
- `CK_KioskSales_VoidFields`: ([Status]<>N'Voided' OR [VoidedAt] IS NOT NULL AND [VoidedBy] IS NOT NULL AND [VoidReason] IS NOT NULL)

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kiosk/sales/{id?}

**Registration:** `kiosk-sales` · **source:** `lunchapp-api/src/functions/kiosk-sales.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read sale by ID or create idempotent card-resolved café purchase.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST requestId UUIDv1..5,cardNumber required (digits last5 normalization),items nonempty productId/quantity1..100 summed cap100,createdBy defaultKiosk trunc100.

**Response envelope / success behavior:** GET sale+lines;POST201 sale/financial beforeafter/items;replay200 same sale+alreadyProcessed.

**Business validation and rules [API unless labelled SQL]:** Serializable;RequestID UPDLOCK/HOLDLOCK; employee card authoritative first no activity check; external card/account current active/validity; active products and server price snapshots;total<=intmax;Prepaid available view funds,Postpaid/Invoice configured limit-outstanding; external negative Purchase ledger same transaction.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccountLedger`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.KioskProducts`, `dbo.KioskSaleLines`, `dbo.KioskSales`, `dbo.vwExternalAccountBalances`. **Writes:** `dbo.ExternalAccountLedger`, `dbo.KioskSaleLines`, `dbo.KioskSales`.

**Callers/intended integration, not roles:** `lunchappDEV/bulla/order.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kiosk/sales/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Sale ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Sale not found.' |

**createSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `alreadyProcessed` | boolean true |

**createSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleId` | value/mapping: saleId |
| `saleTime` | value/mapping: ins.recordset[0].SaleTime |
| `status` | string; 'Completed' |
| `ownerType` | value/mapping: owner.ownerType.toLowerCase() |
| `employeeNo` | value/mapping: owner.employeeNo |
| `externalAccountId` | value/mapping: owner.externalAccountId |
| `cardId` | value/mapping: owner.cardId |
| `displayName` | value/mapping: owner.displayName |
| `accountMode` | value/mapping: owner.accountMode |
| `totalCents` | value/mapping: total |
| `balanceBeforeCents` | value/mapping: before |
| `balanceAfterCents` | value/mapping: after |
| `items` | value/mapping: lines.map(lineJson) |

**fail response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'This request has already been processed.' |

**fail response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kiosk sales request failed.' |
| `details` | value/mapping: e.message |

**getLines payload:** `{const p=m.get(x.productId),unit=Math.round(Number(p.Price)*100);return{productId:x.productId,productNameSnapshot:txt(p.NameSV\|\|p.NameEN\|\|p.NameFI,150),unitPriceCents:unit,quantity:x.quantity,lineTotalCents:unit*x.quantity};}`.

**readSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleId` | number; Number(x.SaleID) |
| `cardId` | value/mapping: x.CardID===null?null:Number(x.CardID) |
| `ownerType` | value/mapping: String(x.OwnerType).toLowerCase() |
| `employeeNo` | value/mapping: x.EmployeeNo===null?null:Number(x.EmployeeNo) |
| `externalAccountId` | value/mapping: x.ExternalAccountID===null?null:Number(x.ExternalAccountID) |
| `saleTime` | value/mapping: x.SaleTime |
| `totalCents` | number; Number(x.TotalCents) |
| `status` | value/mapping: x.Status |
| `createdBy` | value/mapping: x.CreatedBy |
| `items` | value/mapping: r.recordset.filter(y=>y.SaleLineID!==null).map(y=>({saleLineId:Number(y.SaleLineID),productId:Number(y.ProductID),productName:y.ProductNameSnapshot,unitPriceCents:Number(y.UnitPriceCents),quantity:Number(y.Quantity),lineTotalCents:Number(y.LineTotalCents)})) |

**readSale response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saleLineId` | number; Number(y.SaleLineID) |
| `productId` | number; Number(y.ProductID) |
| `productName` | value/mapping: y.ProductNameSnapshot |
| `unitPriceCents` | number; Number(y.UnitPriceCents) |
| `quantity` | number; Number(y.Quantity) |
| `lineTotalCents` | number; Number(y.LineTotalCents) |

**normalItems response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `productId` | value/mapping: productId |
| `quantity` | value/mapping: quantity |

### Typed SQL bindings — POST /api/kiosk/sales/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `RequestID` | `sql.UniqueIdentifier` |
| `CardID` | `sql.Int` |
| `OwnerType` | `sql.NVarChar(20)` |
| `EmployeeNo` | `sql.Int` |
| `ExternalAccountID` | `sql.Int` |
| `TotalCents` | `sql.Int` |
| `CreatedBy` | `sql.NVarChar(100)` |
| `SaleID` | `sql.BigInt` |
| `Lines` | `sql.NVarChar(sql.MAX)` |
| `AmountCents` | `sql.Int` |
| `Card` | `sql.NVarChar(100)` |
| `IDs` | `sql.NVarChar(sql.MAX)` |
| `ID` | `sql.Int` |
| `ID` | `sql.BigInt` |

### Status and error contract — POST /api/kiosk/sales/{id?}

Source-explicit status codes: Implicit 200 / delegated wrapper status; see purpose/response.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Sale ID is required.`
- `Sale not found.`
- `This request has already been processed.`
- `Kiosk sales request failed.`
- `items must be a non-empty array.`
- `Every item requires a valid productId and quantity between 1 and 100.`
- `Combined quantity for product ${id} exceeds 100.`

### Integrity, transactions and limitations — POST /api/kiosk/sales/{id?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers; RequestID replay/uniqueness path; same requestId does not enforce payload/owner consistency on replay.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccountLedger_Amount`: ([AmountCents]<>(0))
- `CK_ExternalAccountLedger_CreatedBy`: (len(ltrim(rtrim([CreatedBy])))>(0))
- `CK_ExternalAccountLedger_EntryType`: ([EntryType]=N'Reversal' OR [EntryType]=N'Adjustment' OR [EntryType]=N'Refund' OR [EntryType]=N'Credit' OR [EntryType]=N'Invoice' OR [EntryType]=N'Payment' OR [EntryType]=N'Purchase' OR [EntryType]=N'Prepayment')
- `CK_ExternalAccountLedger_NoSelfReversal`: ([ReversesLedgerEntryID] IS NULL OR [ReversesLedgerEntryID]<>[LedgerEntryID])
- `CK_ExternalAccountLedger_PurchaseSale`: ([EntryType]<>N'Purchase' OR [SaleID] IS NOT NULL)
- `CK_ExternalAccountLedger_ReversalLink`: ([EntryType]<>N'Reversal' OR [ReversesLedgerEntryID] IS NOT NULL)
- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskProducts_NameEN`: (len(ltrim(rtrim([NameEN])))>(0))
- `CK_KioskProducts_Price`: ([Price]>=(0))
- `CK_KioskSaleLines_LineTotalCents`: ([LineTotalCents]=CONVERT([bigint],[UnitPriceCents])*[Quantity])
- `CK_KioskSaleLines_ProductName`: (len(ltrim(rtrim([ProductNameSnapshot])))>(0))
- `CK_KioskSaleLines_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(100))
- `CK_KioskSaleLines_UnitPrice`: ([UnitPriceCents]>=(0))
- `CK_KioskSaleLines_UnitPriceCents`: ([UnitPriceCents]>=(0))
- `CK_KioskSales_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskSales_OwnerReference`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL AND [CardID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL AND [CardID] IS NOT NULL)
- `CK_KioskSales_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskSales_Status`: ([Status]=N'Refunded' OR [Status]=N'PartiallyRefunded' OR [Status]=N'Voided' OR [Status]=N'Completed')
- `CK_KioskSales_TotalCents`: ([TotalCents]>=(0))
- `CK_KioskSales_VoidFields`: ([Status]<>N'Voided' OR [VoidedAt] IS NOT NULL AND [VoidedBy] IS NOT NULL AND [VoidReason] IS NOT NULL)

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kitchen/order-cancellations

**Registration:** `kitchen-order-cancellations` · **source:** `lunchapp-api/src/functions/kitchen-order-cancellations.js:13` · **authLevel:** `anonymous`.

**Purpose:** Append reasoned cancellation to a retained meal source row.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** orderType employee|guest; matching orderId|guestOrderId only; quantity positive default1; reasonCode allowed six values; OTHER requires reasonText <=500; cancelledBy required <=100.

**Response envelope / success behavior:** 201 cancellationId, source/owner/meal/date, original/cancelled/active quantities and audit fields.

**Business validation and rules [API unless labelled SQL]:** Serializable transaction locks source and cancellation rows; 404 absent;409 fully cancelled/overcancel; same employee branch also handles external Orders.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.GuestOrders`, `dbo.Meals`, `dbo.OrderCancellations`, `dbo.Orders`. **Writes:** `dbo.OrderCancellations`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kitchen.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kitchen/order-cancellations

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kitchen order cancellation failed' |
| `details` | value/mapping: error.message |

**createCancellation response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: cancellation.orderType === 'Employee' ? Employee order ${cancellation.orderId} does not exist : Guest order ${cancellation.guestOrderId} does not exist |

**createCancellation response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'This order has already been fully cancelled' |
| `originalQuantity` | value/mapping: originalQuantity |
| `cancelledQuantity` | value/mapping: previouslyCancelled |
| `activeQuantity` | number 0 |

**createCancellation response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Cancellation quantity exceeds the active order quantity' |
| `requestedQuantity` | value/mapping: cancellation.quantity |
| `originalQuantity` | value/mapping: originalQuantity |
| `cancelledQuantity` | value/mapping: previouslyCancelled |
| `activeQuantity` | value/mapping: availableQuantity |

**createCancellation response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `orderCancellationId` | value/mapping: inserted.OrderCancellationID |
| `orderType` | value/mapping: cancellation.orderType.toLowerCase() |
| `orderId` | value/mapping: cancellation.orderType === 'Employee' ? cancellation.orderId : null |
| `guestOrderId` | value/mapping: cancellation.orderType === 'Guest' ? cancellation.guestOrderId : null |
| `menuDate` | value/mapping: formatSqlDate(order.MenuDate) |
| `employeeNo` | value/mapping: order.EmployeeNo |
| `employeeName` | array; [order.FirstName, order.LastName] .filter(Boolean) .join(' ') \|\| Employee ${order.EmployeeNo} |
| `mealId` | value/mapping: order.MealID |
| `mealName` | value/mapping: order.NameEN \|\| order.NameSV \|\| order.NameFI \|\| Meal ${order.MealID} |
| `originalQuantity` | value/mapping: originalQuantity |
| `cancelledQuantity` | value/mapping: totalCancelledQuantity |
| `activeQuantity` | value/mapping: activeQuantity |
| `reasonCode` | value/mapping: cancellation.reasonCode |
| `reasonText` | value/mapping: cancellation.reasonText |
| `cancelledBy` | value/mapping: cancellation.cancelledBy |
| `cancelledAt` | value/mapping: inserted.CancelledAt |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — POST /api/kitchen/order-cancellations

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `orderType` | `sql.NVarChar(20)` |
| `orderId` | `sql.Int` |
| `guestOrderId` | `sql.Int` |
| `quantity` | `sql.Int` |
| `reasonCode` | `sql.NVarChar(50)` |
| `reasonText` | `sql.NVarChar(500)` |
| `cancelledBy` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kitchen/order-cancellations

Source-explicit status codes: 201, 400, 404, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Request body must contain valid JSON`
- `Kitchen order cancellation failed`
- `This order has already been fully cancelled`
- `Cancellation quantity exceeds the active order quantity`
- `Request body must be a JSON object`
- `orderType must be employee or guest`
- `orderId is required for an employee cancellation`
- `guestOrderId must not be supplied for an employee cancellation`
- `guestOrderId is required for a guest cancellation`
- `orderId must not be supplied for a guest cancellation`
- `quantity must be a positive integer`
- `reasonCode must be INSUFFICIENT_PORTIONS, EMPLOYEE_REQUEST,`
- `reasonText must not exceed 500 characters`
- `reasonText is required when reasonCode is OTHER`
- `cancelledBy is required`
- `cancelledBy must not exceed 100 characters`

### Integrity, transactions and limitations — POST /api/kitchen/order-cancellations

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kitchen/orders

**Registration:** `kitchen-orders` · **source:** `lunchapp-api/src/functions/kitchen-orders.js:4` · **authLevel:** `anonymous`.

**Purpose:** Operational active meal/salad traceability rows and portion totals.

**Path parameters:** None.

**Query contract:** dateFrom,dateTo required regex YYYY-MM-DD and ordered.

**Request body / field validation:** None.

**Response envelope / success behavior:** orders unified itemType/orderType IDs/net quantity, employeeName/cardNumberLast5/workTask; summary orderRows,portions,meals,salads.

**Business validation and rules [API unless labelled SQL]:** Includes Orders/SaladOrders employee and external together as orderType employee; guests separate; subtracts both cancellation tables and excludes net<=0; exact CardID join, not account TOP1 guessing.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.GuestOrders`, `dbo.GuestSaladOrders`, `dbo.KioskCards`, `dbo.Meals`, `dbo.OrderCancellations`, `dbo.Orders`, `dbo.SaladOrderCancellations`, `dbo.SaladOrders`, `dbo.Salads`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kitchen.js`, `lunchappDEV/admin/kitchen-summary.html`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kitchen/orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Valid dateFrom and dateTo are required' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `dateFrom` | value/mapping: dateFrom |
| `dateTo` | value/mapping: dateTo |
| `orders` | value/mapping: orders |
| `summary` | object {orderRows: value/mapping: orders.length; portions: value/mapping: sum(orders); meals: value/mapping: sum(orders.filter(x => x.itemType === 'meal')); salads: value/mapping: sum(orders.filter(x => x.itemType === 'salad'))} |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kitchen orders request failed' |
| `details` | value/mapping: error.message |

### Typed SQL bindings — GET /api/kitchen/orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `dateFrom` | `sql.Date` |
| `dateTo` | `sql.Date` |

### Status and error contract — GET /api/kitchen/orders

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Valid dateFrom and dateTo are required`
- `Kitchen orders request failed`

### Integrity, transactions and limitations — GET /api/kitchen/orders

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_SaladOrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_SaladOrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_SaladOrderCancellations_Source`: ([OrderType]=N'Employee' AND [SaladOrderID] IS NOT NULL AND [GuestSaladOrderID] IS NULL OR [OrderType]=N'Guest' AND [SaladOrderID] IS NULL AND [GuestSaladOrderID] IS NOT NULL)
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/kitchen/salad-order-cancellations

**Registration:** `kitchen-salad-order-cancellations` · **source:** `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:4` · **authLevel:** `anonymous`.

**Purpose:** Append cancellation to retained employee/external or guest salad source row.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** orderType employee|guest; saladOrderId|guestSaladOrderId; quantity positive required; same six reasonCodes; OTHER text required; cancelledBy required (trunc100), text trunc500.

**Response envelope / success behavior:** 201 success/cancellationId/cancelledQuantity/remainingQuantity.

**Business validation and rules [API unless labelled SQL]:** Serializable locks;404 missing;400 quantity above remaining (meal cancellation instead409); no SQL reason-code check on SaladOrderCancellations; no source mutation.

**Reads (including existence checks and view dependencies):** `dbo.GuestSaladOrders`, `dbo.SaladOrderCancellations`, `dbo.SaladOrders`, `dbo.Salads`. **Writes:** `dbo.SaladOrderCancellations`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/kitchen.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/kitchen/salad-order-cancellations

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kitchen salad cancellation failed' |
| `details` | value/mapping: error.message |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad order not found' |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `cancellationId` | value/mapping: inserted.recordset[0].SaladOrderCancellationID |
| `cancelledQuantity` | value/mapping: c.quantity |
| `remainingQuantity` | value/mapping: active-c.quantity |

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

### Typed SQL bindings — POST /api/kitchen/salad-order-cancellations

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `id` | `sql.Int` |
| `type` | `sql.NVarChar(20)` |
| `sid` | `sql.Int` |
| `gsid` | `sql.Int` |
| `qty` | `sql.Int` |
| `code` | `sql.NVarChar(50)` |
| `text` | `sql.NVarChar(500)` |
| `by` | `sql.NVarChar(100)` |

### Status and error contract — POST /api/kitchen/salad-order-cancellations

Source-explicit status codes: 201, 400, 404, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Request body must contain valid JSON`
- `Kitchen salad cancellation failed`
- `Salad order not found`
- `Cannot cancel ${c.quantity}; only ${active} active portion(s) remain`
- `orderType must be employee or guest`
- `saladOrderId is required`
- `guestSaladOrderId is required`
- `quantity must be a positive integer`
- `Invalid reasonCode`
- `reasonText is required when reasonCode is OTHER`
- `cancelledBy is required`

### Integrity, transactions and limitations — POST /api/kitchen/salad-order-cancellations

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests; explicit SERIALIZABLE isolation in reachable helpers; explicit SQL locking hints in reachable helpers.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_SaladOrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_SaladOrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_SaladOrderCancellations_Source`: ([OrderType]=N'Employee' AND [SaladOrderID] IS NOT NULL AND [GuestSaladOrderID] IS NULL OR [OrderType]=N'Guest' AND [SaladOrderID] IS NULL AND [GuestSaladOrderID] IS NOT NULL)
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/kitchen/weekly-summary

**Registration:** `kitchen-weekly-summary` · **source:** `lunchapp-api/src/functions/kitchen-weekly-summary.js:4` · **authLevel:** `anonymous`.

**Purpose:** ISO-week kitchen performance totals and popularity.

**Path parameters:** None.

**Query contract:** week required YYYY-Www, week1..53.

**Request body / field validation:** None.

**Response envelope / success behavior:** week/start/end/generatedAt, totals,daily seven days,saladPopularity,cancellationReasons,cancellations emptyarray.

**Business validation and rules [API unless labelled SQL]:** Meal cancellations subtracted; salads gross without salad cancellations; ordered/served/cancelled refer meals, total=net meals+gross salads; seven-day API vs weekday UI; week53 not validated against actual ISO year.

**Reads (including existence checks and view dependencies):** `dbo.GuestOrders`, `dbo.GuestSaladOrders`, `dbo.OrderCancellations`, `dbo.Orders`, `dbo.SaladOrders`, `dbo.Salads`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/weekly-summary.js`, `lunchappDEV/admin/statistics.js` historical host variant.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/kitchen/weekly-summary

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'week is required and must use YYYY-Www format, for example 2026-W40' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `week` | value/mapping: week |
| `weekStart` | value/mapping: range.weekStart |
| `weekEnd` | value/mapping: range.weekEnd |
| `generatedAt` | value/mapping: new Date().toISOString() |
| `totals` | value/mapping: totals |
| `daily` | value/mapping: daily |
| `saladPopularity` | value/mapping: (result.recordsets[1] \|\| []).map(row => ({ saladId: row.SaladID, nameEn: row.NameEn, nameSv: row.NameSv, nameFi: row.NameFi, quantity: Number(row.Quantity) })) |
| `cancellationReasons` | value/mapping: (result.recordsets[2] \|\| []).map(row => ({ reasonCode: row.ReasonCode, quantity: Number(row.Quantity) })) |
| `cancellations` | array; [] |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Kitchen weekly summary request failed' |
| `details` | value/mapping: error.message |

**handler payload:** `{                 const row = rowsByDate.get(date) \|\| {};                 const ordered = Number(row.OrderedQuantity \|\| 0);                 const meals = Number(row.ServedQuantity \|\| 0);                 const cancelled = Number(row.CancelledQuantity \|\| 0);                 const salads = Number(row.SaladQuantity \|\| 0);                  return {                     date,                     isoDay: index + 1,                     dayName: ISO_DAY_NAMES[index],                     ordered,                     served: meals,                     cancelled,                     meals,                     salads,                     total: meals + salads                 };             }`.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladId` | value/mapping: row.SaladID |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `quantity` | number; Number(row.Quantity) |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `reasonCode` | value/mapping: row.ReasonCode |
| `quantity` | number; Number(row.Quantity) |

### Typed SQL bindings — GET /api/kitchen/weekly-summary

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `weekStart` | `sql.Date` |
| `weekEnd` | `sql.Date` |

### Status and error contract — GET /api/kitchen/weekly-summary

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `week is required and must use YYYY-Www format, for example 2026-W40`
- `Kitchen weekly summary request failed`

### Integrity, transactions and limitations — GET /api/kitchen/weekly-summary

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/lunch-reports

**Registration:** `lunch-reports` · **source:** `lunchapp-api/src/functions/lunch-reports.js:4` · **authLevel:** `anonymous`.

**Purpose:** Payroll lunch count, external account lunch count, guest totals.

**Path parameters:** None.

**Query contract:** dateFrom,dateTo required regex dates and ordered.

**Request body / field validation:** None.

**Response envelope / success behavior:** summary,employees,externalAccounts,guests,manualAdjustmentsAvailable.

**Business validation and rules [API unless labelled SQL]:** Counts net meals+net salads; employee also positive manual adjustments if table exists; guests excluded payroll/external; no money amounts; SQL queries clamp net to0; inactive historical owners included.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.GuestOrders`, `dbo.GuestSaladOrders`, `dbo.ManualLunchAdjustments`, `dbo.OrderCancellations`, `dbo.Orders`, `dbo.SaladOrderCancellations`, `dbo.SaladOrders`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/lunch-reports-ui.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/lunch-reports

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'dateFrom and dateTo are required in YYYY-MM-DD format.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'dateFrom cannot be later than dateTo.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `dateFrom` | value/mapping: dateFrom |
| `dateTo` | value/mapping: dateTo |
| `summary` | object {employeeLunches: value/mapping: employee.reduce((n,x)=>n+x.numberOfLunches,0); employeeCount: value/mapping: employee.length; externalLunches: value/mapping: external.reduce((n,x)=>n+x.numberOfLunches,0); externalAccountCount: value/mapping: external.length; guestLunches: value/mapping: guests.totalLunches} |
| `employees` | value/mapping: employee |
| `externalAccounts` | value/mapping: external |
| `guests` | value/mapping: guests |
| `manualAdjustmentsAvailable` | value/mapping: hasManual |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Lunch reports request failed.' |
| `details` | value/mapping: error.message |

**employeeReport response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `employeeNo` | value/mapping: x.EmployeeNo |
| `firstName` | value/mapping: x.FirstName\|\|'' |
| `lastName` | value/mapping: x.LastName\|\|'' |
| `employeeName` | array; [x.FirstName,x.LastName].filter(Boolean).join(' ') |
| `mealLunches` | number; Number(x.MealLunches) |
| `saladLunches` | number; Number(x.SaladLunches) |
| `manualLunches` | number; Number(x.ManualLunches) |
| `numberOfLunches` | number; Number(x.NumberOfLunches) |

**externalReport response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `externalAccountId` | value/mapping: x.ExternalAccountID |
| `displayName` | value/mapping: x.DisplayName\|\|'' |
| `companyName` | value/mapping: x.CompanyName\|\|'' |
| `externalReference` | value/mapping: x.ExternalReference\|\|'' |
| `invoiceReference` | value/mapping: x.InvoiceReference\|\|'' |
| `mealLunches` | number; Number(x.MealLunches) |
| `saladLunches` | number; Number(x.SaladLunches) |
| `numberOfLunches` | number; Number(x.NumberOfLunches) |

**guestReport response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `mealLunches` | number; Number(x.MealLunches) |
| `saladLunches` | number; Number(x.SaladLunches) |
| `totalLunches` | number; Number(x.MealLunches)+Number(x.SaladLunches) |

### Typed SQL bindings — GET /api/lunch-reports

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `from` | `sql.Date` |
| `to` | `sql.Date` |

### Status and error contract — GET /api/lunch-reports

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `dateFrom and dateTo are required in YYYY-MM-DD format.`
- `dateFrom cannot be later than dateTo.`
- `Lunch reports request failed.`

### Integrity, transactions and limitations — GET /api/lunch-reports

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_GuestSaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_ManualLunchAdjustments_Quantity`: ([Quantity]>(0) AND [Quantity]<=(50))
- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_SaladOrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_SaladOrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_SaladOrderCancellations_Source`: ([OrderType]=N'Employee' AND [SaladOrderID] IS NOT NULL AND [GuestSaladOrderID] IS NULL OR [OrderType]=N'Guest' AND [SaladOrderID] IS NULL AND [GuestSaladOrderID] IS NOT NULL)
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/manual-lunch-adjustments

**Registration:** `manual-lunch-adjustments` · **source:** `lunchapp-api/src/functions/manual-lunch-adjustments.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/create positive employee lunch-count correction.

**Path parameters:** None.

**Query contract:** employeeNo optional positive filter; dateFrom/dateTo optional default wide.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET adjustments raw SQL rows joined names; POST201 success/adjustment.

**Business validation and rules [API unless labelled SQL]:** Active employee required POST404 otherwise; positive additions only; not meal/salad production order, not external ledger adjustment; no correction/delete route.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ManualLunchAdjustments`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/employee-admin.js` Add Lunch.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/manual-lunch-adjustments

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Manual lunch request failed' |
| `details` | value/mapping: error.message |

**list response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `adjustments` | value/mapping: result.recordset |

### Exact raw SQL record fields — GET /api/manual-lunch-adjustments

The response array/record (or adjustments/adjustment member) exposes `AdjustmentID:int`, `EmployeeNo:int`, `MenuDate:SQL date serialized by client`, `Quantity:int`, `Reason:nullable string`, `CreatedBy:nullable string`, `CreatedAt:UTC SQL timestamp`, `FirstName:nullable string`, `LastName:nullable string`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — GET /api/manual-lunch-adjustments

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `employeeNo` | `sql.Int` |

### Status and error contract — GET /api/manual-lunch-adjustments

Source-explicit status codes: 200, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Manual lunch request failed`

### Integrity, transactions and limitations — GET /api/manual-lunch-adjustments

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ManualLunchAdjustments_Quantity`: ([Quantity]>(0) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/manual-lunch-adjustments

**Registration:** `manual-lunch-adjustments` · **source:** `lunchapp-api/src/functions/manual-lunch-adjustments.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/create positive employee lunch-count correction.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** POST employeeNo,menuDate,quantity default1 integer1..50, reason optional trunc250, createdBy optional trunc255.

**Response envelope / success behavior:** GET adjustments raw SQL rows joined names; POST201 success/adjustment.

**Business validation and rules [API unless labelled SQL]:** Active employee required POST404 otherwise; positive additions only; not meal/salad production order, not external ledger adjustment; no correction/delete route.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ManualLunchAdjustments`. **Writes:** `dbo.ManualLunchAdjustments`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/employee-admin.js` Add Lunch.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/manual-lunch-adjustments

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Manual lunch request failed' |
| `details` | value/mapping: error.message |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'employeeNo, menuDate and a quantity from 1 to 50 are required' |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Active employee not found' |

**create response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `adjustment` | value/mapping: result.recordset[0] |

### Exact raw SQL record fields — POST /api/manual-lunch-adjustments

The response array/record (or adjustments/adjustment member) exposes `AdjustmentID:int`, `EmployeeNo:int`, `MenuDate:SQL date serialized by client`, `Quantity:int`, `Reason:nullable string`, `CreatedBy:nullable string`, `CreatedAt:UTC SQL timestamp`, `FirstName:nullable string`, `LastName:nullable string`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — POST /api/manual-lunch-adjustments

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `employeeNo` | `sql.Int` |
| `menuDate` | `sql.Date` |
| `quantity` | `sql.Int` |
| `reason` | `sql.NVarChar(250)` |
| `createdBy` | `sql.NVarChar(255)` |

### Status and error contract — POST /api/manual-lunch-adjustments

Source-explicit status codes: 201, 400, 404, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Manual lunch request failed`
- `Request body must contain valid JSON`
- `employeeNo, menuDate and a quantity from 1 to 50 are required`
- `Active employee not found`

### Integrity, transactions and limitations — POST /api/manual-lunch-adjustments

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ManualLunchAdjustments_Quantity`: ([Quantity]>(0) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/meals

**Registration:** `meals` · **source:** `lunchapp-api/src/functions/meals.js:12` · **authLevel:** `anonymous`.

**Purpose:** List meal directory/library records.

**Path parameters:** None.

**Query contract:** includeInactive default false; category optional Main/Vegetarian/Soup/Salad/Dessert.

**Request body / field validation:** None.

**Response envelope / success behavior:** 200 raw PascalCase row array; returned fields/types are listed below.

**Business validation and rules [API unless labelled SQL]:** includeInactive defaults false; optional category normalized against Main,Vegetarian,Soup,Salad,Dessert; invalid category400; archived meals omitted by default.

**Reads (including existence checks and view dependencies):** `dbo.Meals`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/meal-library.js`, `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/meals

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**getMeals response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Category must be one of: ${[...VALID_CATEGORIES].join(', ')} |

**getMeals payload:** `result.recordset`.

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Exact raw SQL record fields — GET /api/meals

The response array/record (or adjustments/adjustment member) exposes `MealID:int`, `NameEN:string`, `NameSV:string`, `NameFI:string`, `Category:string`, `Active:SQL bit`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — GET /api/meals

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `includeInactive` | `sql.Bit` |
| `category` | `sql.NVarChar(20)` |

### Status and error contract — GET /api/meals

Source-explicit status codes: 200, 400, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Category must be one of: ${[...VALID_CATEGORIES].join(', ')}`
- `Method not allowed`

### Integrity, transactions and limitations — GET /api/meals

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/meals

**Registration:** `meals` · **source:** `lunchapp-api/src/functions/meals.js:12` · **authLevel:** `anonymous`.

**Purpose:** Create meal record.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** POST nameEN,nameSV,nameFI nonblank <=200; category required; active boolean default true.

**Response envelope / success behavior:** 201 inserted PascalCase record and Location header; duplicate409 and validation400 where documented.

**Business validation and rules [API unless labelled SQL]:** Category case-insensitive normalized; active listing only unless includeInactive.

**Reads (including existence checks and view dependencies):** `dbo.Meals`. **Writes:** `dbo.Meals`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/meal-library.js`, `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/meals

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**createMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: mealResult.error |

**createMeal payload:** `result.recordset[0]`.

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**readJsonBody response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

### Exact raw SQL record fields — POST /api/meals

The response array/record (or adjustments/adjustment member) exposes `MealID:int`, `NameEN:string`, `NameSV:string`, `NameFI:string`, `Category:string`, `Active:SQL bit`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — POST /api/meals

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `nameEN` | `sql.NVarChar(200)` |
| `nameSV` | `sql.NVarChar(200)` |
| `nameFI` | `sql.NVarChar(200)` |
| `category` | `sql.NVarChar(20)` |
| `active` | `sql.Bit` |

### Status and error contract — POST /api/meals

Source-explicit status codes: 201, 400, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Method not allowed`
- `Request body must be a JSON object`
- `Missing or empty fields: ${missingFields.join(', ')}`
- `Maximum name length is 200 characters: ${tooLongFields.join(', ')}`
- `Category must be one of: ${[...VALID_CATEGORIES].join(', ')}`
- `active must be true or false`
- `Request body must contain valid JSON`

### Integrity, transactions and limitations — POST /api/meals

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/meals/{mealId}

**Registration:** `meal-item` · **source:** `lunchapp-api/src/functions/meals.js:19` · **authLevel:** `anonymous`.

**Purpose:** Update meal record.

**Path parameters:** mealId.

**Query contract:** None used by this method.

**Request body / field validation:** PUT nameEN,nameSV,nameFI,category required; active boolean default true.

**Response envelope / success behavior:** 200 updated PascalCase record; validation400, missing404 and duplicate409 where documented.

**Business validation and rules [API unless labelled SQL]:** Soft delete preserves references; hard-delete SQL incorrectly checks Orders.MealID and GuestOrders.MealID instead of OrderedMealID; extracted schema implies failure.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.GuestOrders`, `dbo.Meals`, `dbo.Orders`. **Writes:** `dbo.Meals`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/meal-library.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/meals/{mealId}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'mealId must be a positive integer' |

**updateMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: mealResult.error |

**updateMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Meal ${mealId} does not exist |

**updateMeal payload:** `result.recordset[0]`.

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

**readJsonBody response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Request body must contain valid JSON' |

### Exact raw SQL record fields — PUT /api/meals/{mealId}

The response array/record (or adjustments/adjustment member) exposes `MealID:int`, `NameEN:string`, `NameSV:string`, `NameFI:string`, `Category:string`, `Active:SQL bit`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — PUT /api/meals/{mealId}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `mealId` | `sql.Int` |
| `nameEN` | `sql.NVarChar(200)` |
| `nameSV` | `sql.NVarChar(200)` |
| `nameFI` | `sql.NVarChar(200)` |
| `category` | `sql.NVarChar(20)` |
| `active` | `sql.Bit` |

### Status and error contract — PUT /api/meals/{mealId}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `mealId must be a positive integer`
- `Meal ${mealId} does not exist`
- `Method not allowed`
- `Request body must be a JSON object`
- `Missing or empty fields: ${missingFields.join(', ')}`
- `Maximum name length is 200 characters: ${tooLongFields.join(', ')}`
- `Category must be one of: ${[...VALID_CATEGORIES].join(', ')}`
- `active must be true or false`
- `Request body must contain valid JSON`

### Integrity, transactions and limitations — PUT /api/meals/{mealId}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/meals/{mealId}

**Registration:** `meal-item` · **source:** `lunchapp-api/src/functions/meals.js:19` · **authLevel:** `anonymous`.

**Purpose:** Deactivate or hard-delete meal record.

**Path parameters:** mealId.

**Query contract:** hard optional boolean default false.

**Request body / field validation:** None.

**Response envelope / success behavior:** 200 success/deleteType plus deactivated record or hard-deleted ID; missing404; intended in-use409, subject to documented schema/precheck limits.

**Business validation and rules [API unless labelled SQL]:** Soft delete preserves references; hard-delete SQL incorrectly checks Orders.MealID and GuestOrders.MealID instead of OrderedMealID; extracted schema implies failure.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.GuestOrders`, `dbo.Meals`, `dbo.Orders`. **Writes:** `dbo.Meals`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/meal-library.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/meals/{mealId}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'mealId must be a positive integer' |

**deleteMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Meal ${mealId} does not exist |

**deleteMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `deleteType` | string; 'soft' |
| `meal` | value/mapping: result.recordset[0] |

**deleteMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Meal cannot be permanently deleted because it is used in menus or orders' |
| `mealId` | value/mapping: mealId |
| `referenceCount` | value/mapping: referenceCount |
| `references` | object {menus: number; Number(references.MenuReferences); orders: number; Number(references.OrderReferences); guestOrders: number; Number(references.GuestOrderReferences)} |
| `suggestion` | string; 'Archive the meal instead' |

**deleteMeal response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `deleteType` | string; 'hard' |
| `mealId` | value/mapping: mealId |

**methodNotAllowed response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**serverError response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |
| `details` | value/mapping: error.message |

### Exact raw SQL record fields — DELETE /api/meals/{mealId}

The response array/record (or adjustments/adjustment member) exposes `MealID:int`, `NameEN:string`, `NameSV:string`, `NameFI:string`, `Category:string`, `Active:SQL bit`. Employee/meals create/update OUTPUT casing remains PascalCase; manual POST returns inserted adjustment metadata without joined FirstName/LastName. Timestamp serialization follows mssql/Functions, not a guaranteed custom format. See03/04 for full null/default constraints.

### Typed SQL bindings — DELETE /api/meals/{mealId}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `mealId` | `sql.Int` |

### Status and error contract — DELETE /api/meals/{mealId}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `mealId must be a positive integer`
- `Meal ${mealId} does not exist`
- `Meal cannot be permanently deleted because it is used in menus or orders`
- `Method not allowed`

### Integrity, transactions and limitations — DELETE /api/meals/{mealId}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/menu/cycles/{cycleId?}

**Registration:** `menu-cycles` · **source:** `lunchapp-api/src/functions/menu-cycles.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update repeating menu cycle.

**Path parameters:** cycleId?.

**Query contract:** cycleId optionalpositiveparsedinteger;POST noID,PUT requiresID.

**Request body / field validation:** None.

**Response envelope / success behavior:** Mapped cycles withconfiguredWeeks;create201 Location;update200.

**Business validation and rules [API unless labelled SQL]:** StartDate uniqueness API precheck only;create initializes weeksandfive weekdays;publish transition PUT validatescompleteweeks/days andnoarchivedmeals;POST Published bypassesthischeck;archivedcycle metadata stillmutable;publishedweeks editable.

**Reads (including existence checks and view dependencies):** `dbo.MenuCycles`, `dbo.MenuWeeks`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/menu/cycles/{cycleId?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu cycle request failed' |
| `details` | value/mapping: error.message |

**listCycles payload:** `result.recordset.map(mapCycle)`.

**getCycle payload:** `mapCycle(result.recordset[0])`.

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**mapCycle response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `menuCycleId` | value/mapping: row.MenuCycleID |
| `name` | value/mapping: row.Name |
| `startDate` | date/time string; formatDate(row.StartDate) |
| `numberOfWeeks` | value/mapping: row.NumberOfWeeks |
| `status` | value/mapping: row.Status |
| `configuredWeeks` | value/mapping: row.ConfiguredWeeks === undefined ? row.NumberOfWeeks : Number(row.ConfiguredWeeks) |
| `createdDate` | value/mapping: row.CreatedDate |
| `updatedDate` | value/mapping: row.UpdatedDate |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — GET /api/menu/cycles/{cycleId?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `cycleId` | `sql.Int` |

### Status and error contract — GET /api/menu/cycles/{cycleId?}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Cycle ID must be a positive integer`
- `Do not include a cycle ID when creating a menu cycle`
- `Cycle ID is required when updating a menu cycle`
- `Method not allowed`
- `Menu cycle request failed`

### Integrity, transactions and limitations — GET /api/menu/cycles/{cycleId?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/menu/cycles/{cycleId?}

**Registration:** `menu-cycles` · **source:** `lunchapp-api/src/functions/menu-cycles.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update repeating menu cycle.

**Path parameters:** cycleId?.

**Query contract:** None used by this method.

**Request body / field validation:** POST name<=100,startDate validMonday,numberOfWeeks integer1..8,statusDraft|Published|Archived;PUT mergesexisting;weekcount immutable.

**Response envelope / success behavior:** Mapped cycles withconfiguredWeeks;create201 Location;update200.

**Business validation and rules [API unless labelled SQL]:** StartDate uniqueness API precheck only;create initializes weeksandfive weekdays;publish transition PUT validatescompleteweeks/days andnoarchivedmeals;POST Published bypassesthischeck;archivedcycle metadata stillmutable;publishedweeks editable.

**Reads (including existence checks and view dependencies):** `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`. **Writes:** `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/menu/cycles/{cycleId?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu cycle request failed' |
| `details` | value/mapping: error.message |

**createCycle response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `menuCycleId` | value/mapping: cycleId |
| `configuredWeeks` | value/mapping: cycle.numberOfWeeks |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**conflictResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Another menu cycle already starts on ${startDate} |
| `conflictingCycle` | object {menuCycleId: value/mapping: conflict.MenuCycleID; name: value/mapping: conflict.Name; status: value/mapping: conflict.Status} |

### Typed SQL bindings — POST /api/menu/cycles/{cycleId?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `name` | `sql.NVarChar(100)` |
| `startDate` | `sql.Date` |
| `numberOfWeeks` | `sql.TinyInt` |
| `status` | `sql.NVarChar(20)` |
| `cycleId` | `sql.Int` |
| `weekNumber` | `sql.Int` |
| `menuWeekId` | `sql.Int` |
| `dayNumber` | `sql.TinyInt` |
| `excludedCycleId` | `sql.Int` |

### Status and error contract — POST /api/menu/cycles/{cycleId?}

Source-explicit status codes: 201, 400, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Cycle ID must be a positive integer`
- `Do not include a cycle ID when creating a menu cycle`
- `Cycle ID is required when updating a menu cycle`
- `Method not allowed`
- `Menu cycle request failed`
- `Request body must be a JSON object`
- `Unknown properties: ${unknownFields.join(', ')}`
- `Name is required`
- `Name must not exceed 100 characters`
- `Start date must use YYYY-MM-DD format and be a valid date`
- `Start date must be a Monday`
- `Number of weeks must be an integer between 1 and 8`
- `Status must be Draft, Published or Archived`
- `Request body must contain valid JSON`
- `Another menu cycle already starts on ${startDate}`

### Integrity, transactions and limitations — POST /api/menu/cycles/{cycleId?}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuDays_DayNumber`: ([DayNumber]>=(1) AND [DayNumber]<=(5))
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/menu/cycles/{cycleId?}

**Registration:** `menu-cycles` · **source:** `lunchapp-api/src/functions/menu-cycles.js:4` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update repeating menu cycle.

**Path parameters:** cycleId?.

**Query contract:** None used by this method.

**Request body / field validation:** POST name<=100,startDate validMonday,numberOfWeeks integer1..8,statusDraft|Published|Archived;PUT mergesexisting;weekcount immutable.

**Response envelope / success behavior:** Mapped cycles withconfiguredWeeks;create201 Location;update200.

**Business validation and rules [API unless labelled SQL]:** StartDate uniqueness API precheck only;create initializes weeksandfive weekdays;publish transition PUT validatescompleteweeks/days andnoarchivedmeals;POST Published bypassesthischeck;archivedcycle metadata stillmutable;publishedweeks editable.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.Meals`, `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`. **Writes:** `dbo.MenuCycles`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/menu/cycles/{cycleId?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu cycle request failed' |
| `details` | value/mapping: error.message |

**updateCycle response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Changing the number of weeks is not supported after a cycle has been created' |
| `currentNumberOfWeeks` | value/mapping: existing.NumberOfWeeks |

**updateCycle response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu cycle cannot be published' |
| `configuredWeeks` | value/mapping: publishValidation.configuredWeeks |
| `expectedWeeks` | value/mapping: existing.NumberOfWeeks |
| `incompleteDays` | value/mapping: publishValidation.incompleteDays |
| `archivedMeals` | value/mapping: publishValidation.archivedMeals |

**updateCycle payload:** `mapCycle(result.recordset[0])`.

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**validateCycleForPublishing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `weekNumber` | value/mapping: weekNumber |
| `dayNumber` | value/mapping: dayNumber |
| `reason` | string; 'Menu week does not exist' |

**validateCycleForPublishing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `weekNumber` | value/mapping: weekNumber |
| `dayNumber` | value/mapping: dayNumber |
| `reason` | string; 'Menu day does not exist' |

**validateCycleForPublishing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `weekNumber` | value/mapping: weekNumber |
| `dayNumber` | value/mapping: dayNumber |
| `reason` | string; 'No meals assigned' |

**validateCycleForPublishing response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `weekNumber` | value/mapping: weekNumber |
| `dayNumber` | value/mapping: dayNumber |
| `mealId` | value/mapping: row.MealID |
| `mealName` | value/mapping: row.NameEN \|\| row.NameSV \|\| row.NameFI \|\| Meal ${row.MealID} |

**mapCycle response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `menuCycleId` | value/mapping: row.MenuCycleID |
| `name` | value/mapping: row.Name |
| `startDate` | date/time string; formatDate(row.StartDate) |
| `numberOfWeeks` | value/mapping: row.NumberOfWeeks |
| `status` | value/mapping: row.Status |
| `configuredWeeks` | value/mapping: row.ConfiguredWeeks === undefined ? row.NumberOfWeeks : Number(row.ConfiguredWeeks) |
| `createdDate` | value/mapping: row.CreatedDate |
| `updatedDate` | value/mapping: row.UpdatedDate |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**conflictResponse response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Another menu cycle already starts on ${startDate} |
| `conflictingCycle` | object {menuCycleId: value/mapping: conflict.MenuCycleID; name: value/mapping: conflict.Name; status: value/mapping: conflict.Status} |

### Typed SQL bindings — PUT /api/menu/cycles/{cycleId?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `cycleId` | `sql.Int` |
| `name` | `sql.NVarChar(100)` |
| `startDate` | `sql.Date` |
| `status` | `sql.NVarChar(20)` |
| `excludedCycleId` | `sql.Int` |

### Status and error contract — PUT /api/menu/cycles/{cycleId?}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Cycle ID must be a positive integer`
- `Do not include a cycle ID when creating a menu cycle`
- `Cycle ID is required when updating a menu cycle`
- `Method not allowed`
- `Menu cycle request failed`
- `Changing the number of weeks is not supported after a cycle has been created`
- `Menu cycle cannot be published`
- `Request body must be a JSON object`
- `Unknown properties: ${unknownFields.join(', ')}`
- `Name is required`
- `Name must not exceed 100 characters`
- `Start date must use YYYY-MM-DD format and be a valid date`
- `Start date must be a Monday`
- `Number of weeks must be an integer between 1 and 8`
- `Status must be Draft, Published or Archived`
- `Request body must contain valid JSON`
- `Another menu cycle already starts on ${startDate}`

### Integrity, transactions and limitations — PUT /api/menu/cycles/{cycleId?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuDays_DayNumber`: ([DayNumber]>=(1) AND [DayNumber]<=(5))
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}

**Registration:** `menu-week` · **source:** `lunchapp-api/src/functions/menu-week.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or replace all five weekday meal assignments for rotation week.

**Path parameters:** cycleId, weekNumber.

**Query contract:** cycleId positiveparsedint;weekNumber1..8 path.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET cycle/weekmetadata,fivedays/meals;PUT success/insertedMeals.

**Business validation and rules [API unless labelled SQL]:** Active meals required409;existingcycle/week/days required;archived cycle blocks409;deleteall DayMeals forweek theninsert intransaction;Published remains editable;no subsequent completenesscheck.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.Meals`, `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu week request failed' |
| `details` | value/mapping: error.message |

**getMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `menuCycleId` | value/mapping: firstRow.MenuCycleID |
| `cycleName` | value/mapping: firstRow.CycleName |
| `startDate` | date/time string; formatDate(firstRow.StartDate) |
| `numberOfWeeks` | value/mapping: firstRow.NumberOfWeeks |
| `status` | value/mapping: firstRow.Status |
| `menuWeekId` | value/mapping: firstRow.MenuWeekID |
| `weekNumber` | value/mapping: weekNumber |
| `days` | value/mapping: days |

**getMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `dayNumber` | value/mapping: dayNumber |
| `meals` | array; [] |

**getMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `mealId` | value/mapping: row.MealID |
| `nameEN` | value/mapping: row.NameEN |
| `nameSV` | value/mapping: row.NameSV |
| `nameFI` | value/mapping: row.NameFI |
| `category` | value/mapping: row.Category |
| `active` | boolean; Boolean(row.Active) |

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `cycleId` | `sql.Int` |
| `weekNumber` | `sql.Int` |

### Status and error contract — GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Cycle ID must be a positive integer`
- `Week number must be an integer between 1 and 8`
- `Method not allowed`
- `Menu week request failed`

### Integrity, transactions and limitations — GET /api/menu/cycles/{cycleId}/weeks/{weekNumber}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuDays_DayNumber`: ([DayNumber]>=(1) AND [DayNumber]<=(5))
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}

**Registration:** `menu-week` · **source:** `lunchapp-api/src/functions/menu-week.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or replace all five weekday meal assignments for rotation week.

**Path parameters:** cycleId, weekNumber.

**Query contract:** None used by this method.

**Request body / field validation:** PUT days exactlyfive unique dayNumber1..5,mealIds positiveintegers arrays deduped.

**Response envelope / success behavior:** GET cycle/weekmetadata,fivedays/meals;PUT success/insertedMeals.

**Business validation and rules [API unless labelled SQL]:** Active meals required409;existingcycle/week/days required;archived cycle blocks409;deleteall DayMeals forweek theninsert intransaction;Published remains editable;no subsequent completenesscheck.

**Reads (including existence checks and view dependencies):** `dbo.DayMeals`, `dbo.Meals`, `dbo.MenuCycles`, `dbo.MenuDays`, `dbo.MenuWeeks`. **Writes:** `dbo.DayMeals`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/menu-admin.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Menu week request failed' |
| `details` | value/mapping: error.message |

**putMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Archived meals cannot be added to a menu' |
| `inactiveMealIds` | value/mapping: inactiveMealIds |

**putMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Archived menu cycles cannot be edited' |

**putMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; Menu cycle ${cycleId}, week ${weekNumber} is missing weekdays in the database |
| `missingDays` | value/mapping: missingDays |

**putMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `menuCycleId` | value/mapping: cycleId |
| `weekNumber` | value/mapping: weekNumber |
| `insertedMeals` | value/mapping: insertedMeals |

**putMenuWeek response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `dayNumber` | value/mapping: day.dayNumber |
| `mealIds` | array; [...new Set(day.mealIds)] |

**putMenuWeek payload:** `{             const parameterName = mealId${index};             mealCheckRequest.input(parameterName, sql.Int, mealId);             return @${parameterName};         }`.

**badRequest response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**badRequestWithDetails response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

**notFound response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: message |

### Typed SQL bindings — PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `cycleId` | `sql.Int` |
| `weekNumber` | `sql.Int` |
| `menuDayId` | `sql.Int` |
| `mealId` | `sql.Int` |

### Status and error contract — PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}

Source-explicit status codes: 200, 400, 404, 405, 409, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Cycle ID must be a positive integer`
- `Week number must be an integer between 1 and 8`
- `Method not allowed`
- `Menu week request failed`
- `Request body must contain valid JSON`
- `Archived meals cannot be added to a menu`
- `Archived menu cycles cannot be edited`
- `Menu cycle ${cycleId}, week ${weekNumber} is missing weekdays in the database`

### Integrity, transactions and limitations — PUT /api/menu/cycles/{cycleId}/weeks/{weekNumber}

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_MenuCycles_NumberOfWeeks`: ([NumberOfWeeks]>=(1) AND [NumberOfWeeks]<=(8))
- `CK_MenuCycles_Status`: ([Status]=N'Archived' OR [Status]=N'Published' OR [Status]=N'Draft')
- `CK_MenuDays_DayNumber`: ([DayNumber]>=(1) AND [DayNumber]<=(5))
- `CK_MenuWeeks_WeekNumber`: ([WeekNumber]>=(1) AND [WeekNumber]<=(8))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/orders

**Registration:** `orders` · **source:** `lunchapp-api/src/functions/orders.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or reconcile meal orders scoped to employee or external card.

**Path parameters:** None.

**Query contract:** employeeNo XOR externalAccountId/externalAccountID; external also requires cardId/cardID; dateFrom/dateTo optional GET.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET owner/date envelope and net-active orders including originalQuantity/cancelledQuantity; PUT success/orderLines/totalLunches.

**Business validation and rules [API unless labelled SQL]:** External CardID is editable order owner, ExternalAccountID billing owner; PUT validates owner active/current validity and card linkage; GET validates external card not account or employee activity; meal existence only, no active/menu/date deadline check; preserves cancellation-linked rows.

**Reads (including existence checks and view dependencies):** `dbo.KioskCards`, `dbo.Meals`, `dbo.OrderCancellations`, `dbo.Orders`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js`, `lunchappDEV/user/my-orders.js`, lunchkiosk embedded user flow.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Orders request failed' |
| `details` | value/mapping: error.message |

**getOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ownerType` | value/mapping: o.type |
| `employeeNo` | value/mapping: o.employeeNo\|\|null |
| `externalAccountId` | value/mapping: o.externalAccountId\|\|null |
| `dateFrom` | value/mapping: from |
| `dateTo` | value/mapping: to |
| `orders` | value/mapping: r.recordset.map(x=>({orderId:x.OrderID,employeeNo:x.EmployeeNo,externalAccountId:x.ExternalAccountID,cardId:x.CardID,menuDate:fmt(x.MenuDate),mealId:x.MealID,quantity:x.Quantity,originalQuantity:x.OriginalQuantity,cancelledQuantity:Number(x.CancelledQuantity),orderTime:x.OrderTime,nameEN:x.NameEN,nameSV:x.NameSV,nameFI:x.NameFI,category:x.Category})) |

**getOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `orderId` | value/mapping: x.OrderID |
| `employeeNo` | value/mapping: x.EmployeeNo |
| `externalAccountId` | value/mapping: x.ExternalAccountID |
| `cardId` | value/mapping: x.CardID |
| `menuDate` | value/mapping: fmt(x.MenuDate) |
| `mealId` | value/mapping: x.MealID |
| `quantity` | value/mapping: x.Quantity |
| `originalQuantity` | value/mapping: x.OriginalQuantity |
| `cancelledQuantity` | number; Number(x.CancelledQuantity) |
| `orderTime` | value/mapping: x.OrderTime |
| `nameEN` | value/mapping: x.NameEN |
| `nameSV` | value/mapping: x.NameSV |
| `nameFI` | value/mapping: x.NameFI |
| `category` | value/mapping: x.Category |

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

### Typed SQL bindings — GET /api/orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ownerId` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `cardId` | `sql.Int` |
| `externalAccountId` | `sql.Int` |

### Status and error contract — GET /api/orders

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Orders request failed`
- `Card does not exist, is inactive, is outside its validity period, or does not belong to the external account`
- `dateFrom must use YYYY-MM-DD format`
- `dateTo must use YYYY-MM-DD format`
- `dateFrom cannot be later than dateTo`
- `Supply exactly one of employeeNo or externalAccountId`
- `cardId is only valid for external accounts`
- `cardId is required for external account orders`

### Integrity, transactions and limitations — GET /api/orders

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/orders

**Registration:** `orders` · **source:** `lunchapp-api/src/functions/orders.js:4` · **authLevel:** `anonymous`.

**Purpose:** Read or reconcile meal orders scoped to employee or external card.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** PUT owner fields, dateFrom,dateTo required; orders[{menuDate,mealId,quantity}] positive integer 1..50; dates within range; duplicate date/meal summed <=50.

**Response envelope / success behavior:** GET owner/date envelope and net-active orders including originalQuantity/cancelledQuantity; PUT success/orderLines/totalLunches.

**Business validation and rules [API unless labelled SQL]:** External CardID is editable order owner, ExternalAccountID billing owner; PUT validates owner active/current validity and card linkage; GET validates external card not account or employee activity; meal existence only, no active/menu/date deadline check; preserves cancellation-linked rows.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.Meals`, `dbo.OrderCancellations`, `dbo.Orders`. **Writes:** `dbo.Orders`.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js`, `lunchappDEV/user/my-orders.js`, lunchkiosk embedded user flow.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Orders request failed' |
| `details` | value/mapping: error.message |

**putOrders response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `ownerType` | value/mapping: o.type |
| `employeeNo` | value/mapping: o.employeeNo\|\|null |
| `externalAccountId` | value/mapping: o.externalAccountId\|\|null |
| `orderLines` | value/mapping: lines.length |
| `totalLunches` | value/mapping: lines.reduce((a,x)=>a+x.quantity,0) |

**bad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: error |

### Typed SQL bindings — PUT /api/orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `ownerId` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `id` | `sql.Int` |
| `q` | `sql.Int` |
| `cardId` | `sql.Int` |
| `employeeNo` | `sql.Int` |
| `externalAccountId` | `sql.Int` |
| `d` | `sql.Date` |
| `m` | `sql.Int` |

### Status and error contract — PUT /api/orders

Source-explicit status codes: 200, 400, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Orders request failed`
- `Request body must contain valid JSON`
- `Invalid date range or orders array`
- `Card does not exist, is inactive, is outside its validity period, or does not belong to the external account`
- `Invalid order`
- `Combined quantity cannot exceed 50`
- `One or more submitted meals do not exist`
- `Supply exactly one of employeeNo or externalAccountId`
- `cardId is only valid for external accounts`
- `cardId is required for external account orders`

### Integrity, transactions and limitations — PUT /api/orders

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_OrderCancellations_OrderType`: ([OrderType]=N'Guest' OR [OrderType]=N'Employee')
- `CK_OrderCancellations_Quantity`: ([Quantity]>(0))
- `CK_OrderCancellations_ReasonCode`: ([ReasonCode]=N'OTHER' OR [ReasonCode]=N'KITCHEN_CORRECTION' OR [ReasonCode]=N'WRONG_DISH' OR [ReasonCode]=N'EMPLOYEE_ABSENT' OR [ReasonCode]=N'EMPLOYEE_REQUEST' OR [ReasonCode]=N'INSUFFICIENT_PORTIONS')
- `CK_OrderCancellations_Reference`: ([OrderType]=N'Employee' AND [OrderID] IS NOT NULL AND [GuestOrderID] IS NULL OR [OrderType]=N'Guest' AND [GuestOrderID] IS NOT NULL AND [OrderID] IS NULL)
- `CK_Orders_New_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/salad-orders

**Registration:** `salad-orders` · **source:** `lunchapp-api/src/functions/salad-orders.js:3` · **authLevel:** `anonymous`.

**Purpose:** Read or replace salad orders scoped to employee or external card.

**Path parameters:** None.

**Query contract:** Same owner fields as orders; optional dateFrom/dateTo GET.

**Request body / field validation:** None.

**Response envelope / success behavior:** GET owner envelope with gross saladOrders quantities; PUT success/saladOrderLines/totalSalads.

**Business validation and rules [API unless labelled SQL]:** External card validation; PUT owner active; deletes all scoped source rows then inserts; no cancellation preservation; no salad activity/existence precheck beyond SQL FK; malformed GET date defaults broad range; no range-order GET rejection.

**Reads (including existence checks and view dependencies):** `dbo.KioskCards`, `dbo.SaladOrders`, `dbo.Salads`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js`, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/salad-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'salad-orders failed' |
| `details` | value/mapping: error.message |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ownerType` | value/mapping: o.type |
| `employeeNo` | value/mapping: o.employeeNo\|\|null |
| `externalAccountId` | value/mapping: o.externalAccountId\|\|null |
| `saladOrders` | value/mapping: r.recordset.map(x=>({saladOrderId:x.SaladOrderID,employeeNo:x.EmployeeNo,externalAccountId:x.ExternalAccountID,cardId:x.CardID,menuDate:fmt(x.MenuDate),saladId:x.SaladID,quantity:x.Quantity,orderTime:x.OrderTime,nameEn:x.NameEn,nameSv:x.NameSv,nameFi:x.NameFi})) |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladOrderId` | value/mapping: x.SaladOrderID |
| `employeeNo` | value/mapping: x.EmployeeNo |
| `externalAccountId` | value/mapping: x.ExternalAccountID |
| `cardId` | value/mapping: x.CardID |
| `menuDate` | value/mapping: fmt(x.MenuDate) |
| `saladId` | value/mapping: x.SaladID |
| `quantity` | value/mapping: x.Quantity |
| `orderTime` | value/mapping: x.OrderTime |
| `nameEn` | value/mapping: x.NameEn |
| `nameSv` | value/mapping: x.NameSv |
| `nameFi` | value/mapping: x.NameFi |

### Typed SQL bindings — GET /api/salad-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `id` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `cardId` | `sql.Int` |
| `externalAccountId` | `sql.Int` |

### Status and error contract — GET /api/salad-orders

Source-explicit status codes: 200, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `salad-orders failed`
- `Card does not exist, is inactive, is outside its validity period, or does not belong to the external account`
- `Supply exactly one of employeeNo or externalAccountId`
- `cardId is only valid for external accounts`
- `cardId is required for external account salad orders`

### Integrity, transactions and limitations — GET /api/salad-orders

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/salad-orders

**Registration:** `salad-orders` · **source:** `lunchapp-api/src/functions/salad-orders.js:3` · **authLevel:** `anonymous`.

**Purpose:** Read or replace salad orders scoped to employee or external card.

**Path parameters:** None.

**Query contract:** None used by this method.

**Request body / field validation:** PUT owner,dateFrom,dateTo,saladOrders[{menuDate,saladId,quantity}]; individual 1..50; duplicate summed without final combined cap.

**Response envelope / success behavior:** GET owner envelope with gross saladOrders quantities; PUT success/saladOrderLines/totalSalads.

**Business validation and rules [API unless labelled SQL]:** External card validation; PUT owner active; deletes all scoped source rows then inserts; no cancellation preservation; no salad activity/existence precheck beyond SQL FK; malformed GET date defaults broad range; no range-order GET rejection.

**Reads (including existence checks and view dependencies):** `dbo.Employees`, `dbo.ExternalAccounts`, `dbo.KioskCards`, `dbo.SaladOrders`, `dbo.Salads`. **Writes:** `dbo.SaladOrders`.

**Callers/intended integration, not roles:** `lunchappDEV/user/lunch.js`, `lunchappDEV/user/my-orders.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/salad-orders

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'salad-orders failed' |
| `details` | value/mapping: error.message |

**put response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `success` | boolean true |
| `ownerType` | value/mapping: o.type |
| `saladOrderLines` | value/mapping: lines.length |
| `totalSalads` | value/mapping: lines.reduce((a,x)=>a+x.quantity,0) |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `ownerType` | value/mapping: o.type |
| `employeeNo` | value/mapping: o.employeeNo\|\|null |
| `externalAccountId` | value/mapping: o.externalAccountId\|\|null |
| `saladOrders` | value/mapping: r.recordset.map(x=>({saladOrderId:x.SaladOrderID,employeeNo:x.EmployeeNo,externalAccountId:x.ExternalAccountID,cardId:x.CardID,menuDate:fmt(x.MenuDate),saladId:x.SaladID,quantity:x.Quantity,orderTime:x.OrderTime,nameEn:x.NameEn,nameSv:x.NameSv,nameFi:x.NameFi})) |

**get response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladOrderId` | value/mapping: x.SaladOrderID |
| `employeeNo` | value/mapping: x.EmployeeNo |
| `externalAccountId` | value/mapping: x.ExternalAccountID |
| `cardId` | value/mapping: x.CardID |
| `menuDate` | value/mapping: fmt(x.MenuDate) |
| `saladId` | value/mapping: x.SaladID |
| `quantity` | value/mapping: x.Quantity |
| `orderTime` | value/mapping: x.OrderTime |
| `nameEn` | value/mapping: x.NameEn |
| `nameSv` | value/mapping: x.NameSv |
| `nameFi` | value/mapping: x.NameFi |

### Typed SQL bindings — PUT /api/salad-orders

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `id` | `sql.Int` |
| `from` | `sql.Date` |
| `to` | `sql.Date` |
| `employeeNo` | `sql.Int` |
| `externalAccountId` | `sql.Int` |
| `cardId` | `sql.Int` |
| `d` | `sql.Date` |
| `s` | `sql.Int` |
| `q` | `sql.Int` |

### Status and error contract — PUT /api/salad-orders

Source-explicit status codes: 200, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `salad-orders failed`
- `Request body must be JSON`
- `Invalid date range or saladOrders`
- `Owner does not exist, is inactive, or is outside its validity period`
- `Card does not exist, is inactive, is outside its validity period, or does not belong to the external account`
- `Invalid salad order`
- `Supply exactly one of employeeNo or externalAccountId`
- `cardId is only valid for external accounts`
- `cardId is required for external account salad orders`

### Integrity, transactions and limitations — PUT /api/salad-orders

SQL transaction present in reachable branch helpers; transaction boundaries are per endpoint, not across frontend requests.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_ExternalAccounts_AccountMode`: ([AccountMode]=N'Invoice' OR [AccountMode]=N'Postpaid' OR [AccountMode]=N'Prepaid')
- `CK_ExternalAccounts_CreditLimit`: ([CreditLimitCents] IS NULL OR [CreditLimitCents]>=(0))
- `CK_ExternalAccounts_DisplayName`: (len(ltrim(rtrim([DisplayName])))>(0))
- `CK_ExternalAccounts_ModeCreditLimit`: ([AccountMode]<>N'Prepaid' OR [CreditLimitCents] IS NULL OR [CreditLimitCents]=(0))
- `CK_ExternalAccounts_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_KioskCards_CardNumber`: (len(ltrim(rtrim([CardNumber])))>(0))
- `CK_KioskCards_Owner`: ([OwnerType]=N'Employee' AND [EmployeeNo] IS NOT NULL AND [ExternalAccountID] IS NULL OR [OwnerType]=N'External' AND [EmployeeNo] IS NULL AND [ExternalAccountID] IS NOT NULL)
- `CK_KioskCards_OwnerType`: ([OwnerType]=N'External' OR [OwnerType]=N'Employee')
- `CK_KioskCards_Validity`: ([ValidFrom] IS NULL OR [ValidUntil] IS NULL OR [ValidFrom]<=[ValidUntil])
- `CK_SaladOrders_Quantity`: ([Quantity]>=(1) AND [Quantity]<=(50))
- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## GET /api/salads/{id?}

**Registration:** `salads` · **source:** `lunchapp-api/src/functions/salads.js:6` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/archive independent salad library.

**Path parameters:** id?.

**Query contract:** id optional path; includeInactive default false (list only).

**Request body / field validation:** None.

**Response envelope / success behavior:** List array or individual mapped salad; create201; update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** DELETE only soft deactivation; GET item does not filter inactive; missing item404.

**Reads (including existence checks and view dependencies):** `dbo.Salads`. **Writes:** None.

**Callers/intended integration, not roles:** `lunchappDEV/admin/salad-admin.js`, `lunchappDEV/user/lunch.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — GET /api/salads/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid salad ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad API request failed.' |
| `details` | value/mapping: error.message |

**getSalads response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad not found.' |

**mapSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladId` | value/mapping: row.SaladID |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `isActive` | boolean; Boolean(row.IsActive) |
| `sortOrder` | value/mapping: row.SortOrder |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — GET /api/salads/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `SaladID` | `sql.Int` |
| `IncludeInactive` | `sql.Bit` |

### Status and error contract — GET /api/salads/{id?}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid salad ID.`
- `Salad ID is required.`
- `Method not allowed.`
- `Salad API request failed.`
- `Salad not found.`

### Integrity, transactions and limitations — GET /api/salads/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## POST /api/salads/{id?}

**Registration:** `salads` · **source:** `lunchapp-api/src/functions/salads.js:6` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/archive independent salad library.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT nameEn,nameSv,nameFi required, trimmed/truncated100; sortOrder nonnegative integer default0; isActive defaulttrue.

**Response envelope / success behavior:** List array or individual mapped salad; create201; update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** DELETE only soft deactivation; GET item does not filter inactive; missing item404.

**Reads (including existence checks and view dependencies):** `dbo.Salads`. **Writes:** `dbo.Salads`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/salad-admin.js`, `lunchappDEV/user/lunch.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — POST /api/salads/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid salad ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad API request failed.' |
| `details` | value/mapping: error.message |

**createSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: validation.error |

**mapSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladId` | value/mapping: row.SaladID |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `isActive` | boolean; Boolean(row.IsActive) |
| `sortOrder` | value/mapping: row.SortOrder |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — POST /api/salads/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `NameEn` | `sql.NVarChar(100)` |
| `NameSv` | `sql.NVarChar(100)` |
| `NameFi` | `sql.NVarChar(100)` |
| `IsActive` | `sql.Bit` |
| `SortOrder` | `sql.Int` |

### Status and error contract — POST /api/salads/{id?}

Source-explicit status codes: 201, 400, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid salad ID.`
- `Salad ID is required.`
- `Method not allowed.`
- `Salad API request failed.`
- `nameEn, nameSv and nameFi are required.`
- `sortOrder must be a non-negative integer.`

### Integrity, transactions and limitations — POST /api/salads/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## PUT /api/salads/{id?}

**Registration:** `salads` · **source:** `lunchapp-api/src/functions/salads.js:6` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/archive independent salad library.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** POST/PUT nameEn,nameSv,nameFi required, trimmed/truncated100; sortOrder nonnegative integer default0; isActive defaulttrue.

**Response envelope / success behavior:** List array or individual mapped salad; create201; update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** DELETE only soft deactivation; GET item does not filter inactive; missing item404.

**Reads (including existence checks and view dependencies):** `dbo.Salads`. **Writes:** `dbo.Salads`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/salad-admin.js`, `lunchappDEV/user/lunch.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — PUT /api/salads/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid salad ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad API request failed.' |
| `details` | value/mapping: error.message |

**updateSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | value/mapping: validation.error |

**updateSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad not found.' |

**mapSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladId` | value/mapping: row.SaladID |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `isActive` | boolean; Boolean(row.IsActive) |
| `sortOrder` | value/mapping: row.SortOrder |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — PUT /api/salads/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `SaladID` | `sql.Int` |
| `NameEn` | `sql.NVarChar(100)` |
| `NameSv` | `sql.NVarChar(100)` |
| `NameFi` | `sql.NVarChar(100)` |
| `IsActive` | `sql.Bit` |
| `SortOrder` | `sql.Int` |

### Status and error contract — PUT /api/salads/{id?}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid salad ID.`
- `Salad ID is required.`
- `Method not allowed.`
- `Salad API request failed.`
- `Salad not found.`
- `nameEn, nameSv and nameFi are required.`
- `sortOrder must be a non-negative integer.`

### Integrity, transactions and limitations — PUT /api/salads/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## DELETE /api/salads/{id?}

**Registration:** `salads` · **source:** `lunchapp-api/src/functions/salads.js:6` · **authLevel:** `anonymous`.

**Purpose:** List/read/create/update/archive independent salad library.

**Path parameters:** id?.

**Query contract:** None used by this method.

**Request body / field validation:** None.

**Response envelope / success behavior:** List array or individual mapped salad; create201; update/deactivate200.

**Business validation and rules [API unless labelled SQL]:** DELETE only soft deactivation; GET item does not filter inactive; missing item404.

**Reads (including existence checks and view dependencies):** `dbo.Salads`. **Writes:** `dbo.Salads`.

**Callers/intended integration, not roles:** `lunchappDEV/admin/salad-admin.js`, `lunchappDEV/user/lunch.js`.

**Security/data scope:** No JWT, Entra claims, API role, or server session verification in supplied handler/helpers; infrastructure auth unknown. Caller-selected path/query/body IDs; business owner validation where explicitly described, not authenticated caller binding. CORS is not application authorization; Easy Auth/deployed policy Unknown.

**Dependencies:** `@azure/functions`, `mssql`. **Setting names only:** `SqlConnectionString`.

### Response fields and nested record shapes — DELETE /api/salads/{id?}

Field casing below is intentional. Mapping expressions describe code-selected values, not sample production records. Wrapper/data variables refer to the nested mapping or SQL projection; optional/null behavior is preserved. Error bodies are included where returned.

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Invalid salad ID.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad ID is required.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Method not allowed.' |

**handler response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad API request failed.' |
| `details` | value/mapping: error.message |

**deactivateSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `error` | string; 'Salad not found.' |

**mapSalad response/record mapping:**

| Field | Shape / source mapping |
|---|---|
| `saladId` | value/mapping: row.SaladID |
| `nameEn` | value/mapping: row.NameEn |
| `nameSv` | value/mapping: row.NameSv |
| `nameFi` | value/mapping: row.NameFi |
| `isActive` | boolean; Boolean(row.IsActive) |
| `sortOrder` | value/mapping: row.SortOrder |
| `createdAt` | value/mapping: row.CreatedAt |
| `updatedAt` | value/mapping: row.UpdatedAt |

### Typed SQL bindings — DELETE /api/salads/{id?}

These are implementation parameter names/types, not a second JSON schema; JSON names and optionality are defined in the request contract above.

| Parameter | SQL client type |
|---|---|
| `SaladID` | `sql.Int` |

### Status and error contract — DELETE /api/salads/{id?}

Source-explicit status codes: 200, 400, 404, 405, 500.

Exact reachable-branch error messages (template values interpolate at runtime; not production examples):

- `Invalid salad ID.`
- `Salad ID is required.`
- `Method not allowed.`
- `Salad API request failed.`
- `Salad not found.`

### Integrity, transactions and limitations — DELETE /api/salads/{id?}

No explicit SQL transaction in the method evidence; reads do not imply mutation/settlement.

Relevant extracted SQL checks (complete defaults/keys/indexes in 03/04):

- `CK_Salads_NameEn_NotBlank`: (len(ltrim(rtrim([NameEn])))>(0))
- `CK_Salads_NameFi_NotBlank`: (len(ltrim(rtrim([NameFi])))>(0))
- `CK_Salads_NameSv_NotBlank`: (len(ltrim(rtrim([NameSv])))>(0))
- `CK_Salads_SortOrder_NonNegative`: ([SortOrder]>=(0))

**Validation confidence:** high static source/extracted schema; no live HTTP/SQL/Blob execution. Cross-endpoint exceptions and known findings are centralized in 14-KNOWN-GAPS-AND-TODOS.md.

## Frontend-to-API reconciliation — every expanded call (104)

All current, orphaned and historical sources are included. A matching registration is not proof of matching request fields or correct host/CORS. External My Orders GET calls match the route but omit required cardId. Statistics calls match path but use same-origin host without supplied SWA API binding. API upload/download/image requests and dynamic branches are included, not only literal fetches.

| Source:line | Method | Expanded route | Query fields | Body fields | Status / match / caveat |
|---|---|---|---|---|---|
| `lunchappDEV/test-employees.html:25` | GET | `/api/employees` | {} |  | diagnostic/test entry; not current portal navigation; matched registration; business contract requires separate verification; Diagnostic renders complete response; do not reproduce employee data in docs. |
| `lunchappDEV/admin/employee-admin.js:72` | GET | `/api/employees` | {"includeInactive": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/employee-admin.js:183` | PUT | `/api/employees/{employeeNo}` | {} | employeeNo, firstName, lastName, email, cardNumber, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; edit, restore (active=true), CSV update respectively |
| `lunchappDEV/admin/employee-admin.js:277` | PUT | `/api/employees/{employeeNo}` | {} | employeeNo, firstName, lastName, email, cardNumber, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; edit, restore (active=true), CSV update respectively |
| `lunchappDEV/admin/employee-admin.js:369` | PUT | `/api/employees/{employeeNo}` | {} | employeeNo, firstName, lastName, email, cardNumber, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; edit, restore (active=true), CSV update respectively |
| `lunchappDEV/admin/employee-admin.js:188` | POST | `/api/employees` | {} | employeeNo, firstName, lastName, email, cardNumber, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/employee-admin.js:375` | POST | `/api/employees` | {} | employeeNo, firstName, lastName, email, cardNumber, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/employee-admin.js:266` | DELETE | `/api/employees/{employeeNo}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; soft deactivate |
| `lunchappDEV/admin/employee-admin.js:298` | DELETE | `/api/employees/{employeeNo}` | {"hard": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; hard-delete confirmation; backend reference protection |
| `lunchappDEV/admin/employee-admin.js:224` | POST | `/api/manual-lunch-adjustments` | {} | employeeNo, menuDate, quantity, reason=null | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; No createdBy field from UI |
| `lunchappDEV/admin/external-lunch-prices.js:7` | GET | `/api/external-lunch-prices` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/external-lunch-prices.js:8` | POST | `/api/external-lunch-prices` | {} | priceCents, validFrom | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kitchen.js:29` | GET | `/api/kitchen/orders` | {"dateFrom": "selected day", "dateTo": "same selected day"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kitchen.js:32` | POST | `/api/kitchen/order-cancellations` | {} | orderType, orderId or guestOrderId, quantity, reasonCode, reasonText, cancelledBy | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kitchen.js:32` | POST | `/api/kitchen/salad-order-cancellations` | {} | orderType, saladOrderId or guestSaladOrderId, quantity, reasonCode, reasonText, cancelledBy | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kitchen-old-delete-later.js:29` | GET | `/api/kitchen/orders` | {"dateFrom": "selected day", "dateTo": "same selected day"} |  | historical superseded script; kitchen-summary.html loads kitchen.js; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kitchen-old-delete-later.js:32` | POST | `/api/kitchen/order-cancellations` | {} | orderType, orderId or guestOrderId, quantity, reasonCode, reasonText, cancelledBy | historical superseded script; kitchen-summary.html loads kitchen.js; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/lunch-reports-ui.js:6` | GET | `/api/lunch-reports` | {"dateFrom": "fromDate", "dateTo": "toDate"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; CSV exports are generated locally, not API calls |
| `lunchappDEV/admin/meal-library.js:100` | GET | `/api/meals` | {"includeInactive": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/meal-library.js:277` | POST | `/api/meals` | {} | nameEN, nameSV, nameFI, category, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/meal-library.js:300` | PUT | `/api/meals/{mealId}` | {} | nameEN, nameSV, nameFI, category, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/meal-library.js:340` | DELETE | `/api/meals/{mealId}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/meal-library.js:368` | DELETE | `/api/meals/{mealId}` | {"hard": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/menu-admin.js:109` | GET | `/api/meals` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/menu-admin.js:124` | GET | `/api/menu/cycles` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/menu-admin.js:144` | GET | `/api/menu/cycles/{selectedCycleId}/weeks/{index+1}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/menu-admin.js:312` | PUT | `/api/menu/cycles/{selectedCycleId}/weeks/{index+1}` | {} | days[].dayNumber, days[].mealIds | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; sequential save of all weeks; not one whole-cycle transaction |
| `lunchappDEV/admin/menu-admin.js:360` | PUT | `/api/menu/cycles/{selectedCycleId}` | {} | status=Published\|Archived | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/menu-admin.js:415` | POST | `/api/menu/cycles` | {} | name, startDate, numberOfWeeks, status=Draft | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/salad-admin.js:50` | GET | `/api/salads` | {"includeInactive": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/salad-admin.js:108` | DELETE | `/api/salads/{saladId}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/salad-admin.js:144` | POST | `/api/salads` | {} | nameEn, nameSv, nameFi, isActive, sortOrder | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; isNew branch |
| `lunchappDEV/admin/salad-admin.js:144` | PUT | `/api/salads/{saladId}` | {} | nameEn, nameSv, nameFi, isActive, sortOrder | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; existing branch |
| `lunchappDEV/admin/statistics.js:139` | GET | `/api/kitchen/weekly-summary` | {"week": "weekPicker YYYY-Www"} |  | orphaned asset; no HTML reference in supplied snapshot; matched registration; business contract requires separate verification; No supplied statistics.html or SWA proxy configuration; differs from active weekly summary host |
| `lunchappDEV/admin/weekly-summary.js:11` | GET | `/api/kitchen/weekly-summary` | {"week": "weekPicker YYYY-Www"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; API ignores salad cancellations; UI explicitly describes limitation |
| `lunchappDEV/user/login.js:108` | GET | `/api/employees` | {"includeInactive": "true"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; Employee-number selection with local active check, not authenticated identity |
| `lunchappDEV/bulla/card-login.js:9` | POST | `/api/kiosk/card-login` | {} | cardNumber | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; strip non-digits and keep final five digits |
| `lunchappDEV/lunchkiosk/card-login.js:10` | POST | `/api/kiosk/card-login` | {} | cardNumber | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; strip non-digits and keep final five digits |
| `lunchappDEV/bulla/order.js:23` | GET | `/api/kiosk/layouts/default` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/bulla/order.js:23` | GET | `/api/kiosk/products` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/bulla/order.js:24` | POST | `/api/kiosk/sales` | {} | requestId(UUID), cardNumber, createdBy=Kiosk, items[].productId, items[].quantity | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; No prices from client; UUID regenerated on each buy attempt |
| `lunchappDEV/user/lunch.js:76` | GET | `/api/salads` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/user/lunch.js:77` | GET | `/api/menu/current` | {"date": "monday of each displayed week"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/user/lunch.js:84` | GET | `/api/orders` | {"dateFrom": "displayed range start", "dateTo": "displayed range end", "employeeNo": "employee branch only", "externalAccountId": "external branch only", "cardId": "external branch only (required)"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; isGuest ternary; external guests blocked |
| `lunchappDEV/user/lunch.js:92` | PUT | `/api/orders` | {} | employeeNo OR (externalAccountId AND cardId), dateFrom, dateTo, orders[].menuDate, orders[].mealId, orders[].quantity | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; meal and salad independently PUT using Promise.all; partial commit possible |
| `lunchappDEV/user/lunch.js:84` | GET | `/api/salad-orders` | {"dateFrom": "displayed range start", "dateTo": "displayed range end", "employeeNo": "employee branch only", "externalAccountId": "external branch only", "cardId": "external branch only (required)"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; isGuest ternary; external guests blocked |
| `lunchappDEV/user/lunch.js:92` | PUT | `/api/salad-orders` | {} | employeeNo OR (externalAccountId AND cardId), dateFrom, dateTo, saladOrders[].menuDate, saladOrders[].saladId, saladOrders[].quantity | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; meal and salad independently PUT using Promise.all; partial commit possible |
| `lunchappDEV/user/lunch.js:84` | GET | `/api/guest-orders` | {"dateFrom": "displayed range start", "dateTo": "displayed range end", "hostEmployeeNo": "currentUser.employeeNumber"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; isGuest ternary; external guests blocked |
| `lunchappDEV/user/lunch.js:92` | PUT | `/api/guest-orders` | {} | hostEmployeeNo, dateFrom, dateTo, orders[].menuDate, orders[].mealId, orders[].quantity, orders[].workTask | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; meal and salad independently PUT using Promise.all; partial commit possible |
| `lunchappDEV/user/lunch.js:84` | GET | `/api/guest-salad-orders` | {"dateFrom": "displayed range start", "dateTo": "displayed range end", "hostEmployeeNo": "currentUser.employeeNumber"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; isGuest ternary; external guests blocked |
| `lunchappDEV/user/lunch.js:92` | PUT | `/api/guest-salad-orders` | {} | hostEmployeeNo, dateFrom, dateTo, saladOrders[].menuDate, saladOrders[].saladId, saladOrders[].quantity, workTask | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; meal and salad independently PUT using Promise.all; partial commit possible |
| `lunchappDEV/user/my-orders.js:30` | GET | `/api/orders` | {"dateFrom": "week or month start", "dateTo": "week or month end", "employeeNo": "employee branch", "externalAccountId": "external branch; cardId MISSING"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; External branch calls personal endpoints without cardId and current APIs return 400; no guest requests for external |
| `lunchappDEV/user/my-orders.js:30` | GET | `/api/salad-orders` | {"dateFrom": "week or month start", "dateTo": "week or month end", "employeeNo": "employee branch", "externalAccountId": "external branch; cardId MISSING"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; External branch calls personal endpoints without cardId and current APIs return 400; no guest requests for external |
| `lunchappDEV/user/my-orders.js:30` | GET | `/api/guest-orders` | {"dateFrom": "week or month start", "dateTo": "week or month end", "hostEmployeeNo": "employee only"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; External branch calls personal endpoints without cardId and current APIs return 400; no guest requests for external |
| `lunchappDEV/user/my-orders.js:30` | GET | `/api/guest-salad-orders` | {"dateFrom": "week or month start", "dateTo": "week or month end", "hostEmployeeNo": "employee only"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; External branch calls personal endpoints without cardId and current APIs return 400; no guest requests for external |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:139` | GET | `/api/kiosk/external-accounts` | {"includeInactive": "showInactive.checked"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:232` | GET | `/api/kiosk/external-accounts/{id}/ledger` | {"limit": "300"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; No paging beyond 300 in UI |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:297` | DELETE | `/api/kiosk/external-accounts/{id}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; deactivate account and cards |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:310` | POST | `/api/kiosk/external-accounts` | {} | displayName, companyName, accountMode, creditLimitCents (null prepaid), externalReference, invoiceReference, contactName, contactEmail, validFrom, validUntil, notes, isActive | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:310` | PUT | `/api/kiosk/external-accounts/{id}` | {} | displayName, companyName, accountMode, creditLimitCents (null prepaid), externalReference, invoiceReference, contactName, contactEmail, validFrom, validUntil, notes, isActive | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:323` | POST | `/api/kiosk/cards` | {} | cardNumber, cardHolderName, externalAccountId=created account, isActive=true, validFrom=null, validUntil=null | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; optional initial card; independent request after account creation; partial success possible |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:362` | POST | `/api/kiosk/external-accounts/{id}/deposit` | {} | amountCents, createdBy, description, settlementReference, invoiceNumber | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; dynamic ${op} from deposit/payment controls; adjustment not exposed |
| `lunchappDEV/admin/kioskadmin/external-accounts.js:362` | POST | `/api/kiosk/external-accounts/{id}/payment` | {} | amountCents, createdBy, description, settlementReference, invoiceNumber | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; dynamic ${op} from deposit/payment controls; adjustment not exposed |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js:115` | GET | `/api/kiosk/cards` | {"includeInactive": "showInactive.checked"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js:116` | GET | `/api/kiosk/external-accounts` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js:201` | DELETE | `/api/kiosk/cards/{id}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js:213` | POST | `/api/kiosk/cards` | {} | cardNumber, cardHolderName, externalAccountId, validFrom (ISO UTC), validUntil (ISO UTC), isActive | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-cards-admin.js:213` | PUT | `/api/kiosk/cards/{id}` | {} | cardNumber, cardHolderName, externalAccountId, validFrom (ISO UTC), validUntil (ISO UTC), isActive | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:10` | GET | `/api/kiosk/external-accounts` | {"includeInactive": "showInactive.checked"} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:17` | GET | `/api/kiosk/external-accounts/{id}/ledger` | {"limit": "300"} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; No paging beyond 300 in UI |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | DELETE | `/api/kiosk/external-accounts/{id}` | {} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; deactivate account and cards |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | POST | `/api/kiosk/external-accounts` | {} | displayName, companyName, accountMode, creditLimitCents (null prepaid), externalReference, invoiceReference, contactName, contactEmail, validFrom, validUntil, notes, isActive | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | PUT | `/api/kiosk/external-accounts/{id}` | {} | displayName, companyName, accountMode, creditLimitCents (null prepaid), externalReference, invoiceReference, contactName, contactEmail, validFrom, validUntil, notes, isActive | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | POST | `/api/kiosk/cards` | {} | cardNumber, cardHolderName, externalAccountId=created account, isActive=true, validFrom=null, validUntil=null | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; optional initial card; independent request after account creation; partial success possible |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | POST | `/api/kiosk/external-accounts/{id}/deposit` | {} | amountCents, createdBy, description, settlementReference, invoiceNumber | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; dynamic ${op} from deposit/payment controls; adjustment not exposed |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/external-accounts.js:19` | POST | `/api/kiosk/external-accounts/{id}/payment` | {} | amountCents, createdBy, description, settlementReference, invoiceNumber | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; dynamic ${op} from deposit/payment controls; adjustment not exposed |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js:112` | GET | `/api/kiosk/cards` | {"includeInactive": "showInactive.checked"} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js:113` | GET | `/api/kiosk/external-accounts` | {} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js:198` | DELETE | `/api/kiosk/cards/{id}` | {} |  | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js:210` | POST | `/api/kiosk/cards` | {} | cardNumber, cardHolderName, externalAccountId, validFrom (ISO UTC), validUntil (ISO UTC), isActive | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/bak drunk copilot/kiosk-cards-admin.js:210` | PUT | `/api/kiosk/cards/{id}` | {} | cardNumber, cardHolderName, externalAccountId, validFrom (ISO UTC), validUntil (ISO UTC), isActive | historical backup/demo; not referenced by current navigation; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/image-library.js:7` | GET | `/api/images` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/image-library.js:15` | DELETE | `/api/images/{imageAssetId}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; hard delete unused Blob+SQL asset; UI disables used images |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:65` | GET | `/api/kiosk/products` | {"includeInactive": "showInactive.checked"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:88` | POST | `/api/kiosk/products` | {} | nameEn, nameSv, nameFi, price (euro number), icon, imageUrl (legacy), imageAssetId, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:88` | PUT | `/api/kiosk/products/{id}` | {} | nameEn, nameSv, nameFi, price (euro number), icon, imageUrl (legacy), imageAssetId, active | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:89` | DELETE | `/api/kiosk/products/{id}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:92` | GET | `/api/images` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:116` | POST | `/api/images/upload` | {} | multipart file:800x800 JPEG, displayName, createdBy=Product library | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; 10 MB local source limit; backend 5 MB output limit; upload before product Save |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js:79` | GET | `/api/kiosk/layouts` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js:80` | GET | `/api/kiosk/products` | {"includeInactive": "false"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js:99` | GET | `/api/kiosk/layouts/{layoutId}` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js:263` | PUT | `/api/kiosk/layouts/{layoutId}` | {} | items[].productId, items[].columnNo, items[].rowNo, items[].isVisible=true | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:20` | GET | `/api/kiosk/reports/overview` | {"from": "fromDate", "to": "toDate", "groupBy": "day\|week\|month"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:21` | GET | `/api/kiosk/reports/transactions` | {"from": "fromDate", "to": "toDate", "page": "page", "pageSize": "50", "ownerType": "optional employee\|external", "status": "optional Completed\|Voided"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:22` | GET | `/api/kiosk/reports/payroll` | {"from": "fromDate", "to": "toDate"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:23` | GET | `/api/kiosk/reports/external-invoicing` | {"from": "fromDate", "to": "toDate", "accountMode": "Invoice\|Postpaid\|Invoice,Postpaid"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:24` | GET | `/api/kiosk/reports/export` | {"from": "fromDate", "to": "toDate", "type": "payroll"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; Not fetch; must include for API reconciliation |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:24` | GET | `/api/kiosk/reports/export` | {"from": "fromDate", "to": "toDate", "type": "external-summary", "accountMode": "selected account mode"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; Not fetch; must include for API reconciliation |
| `lunchappDEV/admin/kioskadmin/kiosk-reports-ui.js:24` | GET | `/api/kiosk/reports/export` | {"from": "fromDate", "to": "toDate", "type": "external-details", "accountMode": "selected account mode"} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; Not fetch; must include for API reconciliation |
| `lunchappDEV/admin/kioskadmin/image-library.js:11` | GET | `/api/images/{imageAssetId}/content` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; API-returned contentUrl/imageUrl via img.src; legacy URLs may be non-API requests |
| `lunchappDEV/admin/kioskadmin/kiosk-products-admin.js:95` | GET | `/api/images/{imageAssetId}/content` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; API-returned contentUrl/imageUrl via img.src; legacy URLs may be non-API requests |
| `lunchappDEV/bulla/order.js:15` | GET | `/api/images/{imageAssetId}/content` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; API-returned contentUrl/imageUrl via img.src; legacy URLs may be non-API requests |
| `lunchappDEV/admin/kioskadmin/kiosk-layout-builder.js:155` | GET | `/api/images/{imageAssetId}/content` | {} |  | current referenced source; live deployment unverified; matched registration; business contract requires separate verification; API-returned contentUrl/imageUrl via img.src; legacy URLs may be non-API requests |

### Unmatched frontend route paths

No unmatched method/route path in the 104 expanded calls. Parameter/host incompatibilities remain; absence of path mismatch is not functional acceptance.

### Supplied method contracts with no frontend caller

| Method | Route | Source | Interpretation |
|---|---|---|---|
| GET | `/api/hello` | `lunchapp-api/src/functions/hello.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |
| POST | `/api/hello` | `lunchapp-api/src/functions/hello.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |
| GET | `/api/images/{id:int}` | `lunchapp-api/src/functions/images.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |
| POST | `/api/kiosk/external-accounts/{id}/adjustment` | `lunchapp-api/src/functions/kiosk-external-accounts.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |
| GET | `/api/kiosk/sales/{id?}` | `lunchapp-api/src/functions/kiosk-sales.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |
| GET | `/api/manual-lunch-adjustments` | `lunchapp-api/src/functions/manual-lunch-adjustments.js` | Available source method; no supplied UI integration identified, not necessarily obsolete |

### Naming, overlap and duplicated functionality

- Meal/salad/employee APIs return mixed PascalCase and camelCase and distinct nameEN/nameEn conventions. Product current payload uses price EUR and active, not older priceCents/isActive examples. Kiosk external cards are current-only external ownership although SQL retains employee enum.
- Active weekly-summary page and orphaned Statistics script target the same weekly API with different host assumptions. Historical external-account/card backup generation also calls current anonymous routes but is not current navigation; all calls above remain accounted for.
- Legacy Order Explorer and Bulla report are browser-local, not duplicate SQL reporting APIs. Employee manual Add Lunch caller is admin/employee-admin.js, not kitchen.js.
- Meal vs independent salad and employee/external vs guest routes intentionally overlap business purpose but have differing cancellation, validation and ownership behavior. Do not consolidate them in a contract by analogy.

## API versus extracted SQL usage reconciliation

Every extracted table/view is accounted for below. API reads may include validation joins and views; no direct usage was located for retained Balances, Menu and KioskTransactions. Dynamic owner branching was included. Complete schema and column participation is in 03/04; the mismatch register is in 14.

| SQL object | Source use |
|---|---|
| dbo.Balances | No direct use in current API; do not equate table existence with active workflow. |
| dbo.DayMeals | `lunchapp-api/src/functions/current-menu.js:60`, `lunchapp-api/src/functions/meals.js:315`, `lunchapp-api/src/functions/menu-cycles.js:354`, `lunchapp-api/src/functions/menu-week.js:76`, `lunchapp-api/src/functions/menu-week.js:271`, `lunchapp-api/src/functions/menu-week.js:290`. |
| dbo.Employees | `lunchapp-api/src/functions/employees.js:84`, `lunchapp-api/src/functions/employees.js:124`, `lunchapp-api/src/functions/employees.js:150`, `lunchapp-api/src/functions/employees.js:210`, `lunchapp-api/src/functions/employees.js:230`, `lunchapp-api/src/functions/employees.js:267`, `lunchapp-api/src/functions/employees.js:325`, `lunchapp-api/src/functions/guest-orders.js:166`, `lunchapp-api/src/functions/kiosk-card-login.js:24`, `lunchapp-api/src/functions/kiosk-card-login.js:33`, `lunchapp-api/src/functions/kiosk-cards.js:197`, `lunchapp-api/src/functions/kiosk-reports.js:199`, `lunchapp-api/src/functions/kiosk-reports.js:282`, `lunchapp-api/src/functions/kiosk-sales.js:6`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:211`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:237`, `lunchapp-api/src/functions/kitchen-orders.js:57`, `lunchapp-api/src/functions/kitchen-orders.js:79`, `lunchapp-api/src/functions/kitchen-orders.js:100`, `lunchapp-api/src/functions/kitchen-orders.js:128`, `lunchapp-api/src/functions/lunch-reports.js:59`, `lunchapp-api/src/functions/manual-lunch-adjustments.js:39`, `lunchapp-api/src/functions/manual-lunch-adjustments.js:57`, `lunchapp-api/src/functions/orders.js:29`, `lunchapp-api/src/functions/salad-orders.js:6`. |
| dbo.ExternalAccountLedger | `lunchapp-api/src/functions/kiosk-external-accounts.js:94`, `lunchapp-api/src/functions/kiosk-external-accounts.js:346`, `lunchapp-api/src/functions/kiosk-external-accounts.js:529`, `lunchapp-api/src/functions/kiosk-sales.js:5`. |
| dbo.ExternalAccounts | `lunchapp-api/src/functions/kiosk-card-login.js:74`, `lunchapp-api/src/functions/kiosk-cards.js:66`, `lunchapp-api/src/functions/kiosk-cards.js:209`, `lunchapp-api/src/functions/kiosk-external-accounts.js:243`, `lunchapp-api/src/functions/kiosk-external-accounts.js:287`, `lunchapp-api/src/functions/kiosk-external-accounts.js:322`, `lunchapp-api/src/functions/kiosk-external-accounts.js:381`, `lunchapp-api/src/functions/kiosk-external-accounts.js:422`, `lunchapp-api/src/functions/kiosk-external-accounts.js:434`, `lunchapp-api/src/functions/kiosk-external-accounts.js:507`, `lunchapp-api/src/functions/kiosk-reports.js:201`, `lunchapp-api/src/functions/kiosk-reports.js:327`, `lunchapp-api/src/functions/kiosk-reports.js:378`, `lunchapp-api/src/functions/kiosk-sales.js:6`, `lunchapp-api/src/functions/kiosk-sales.js:8`, `lunchapp-api/src/functions/kitchen-orders.js:58`, `lunchapp-api/src/functions/kitchen-orders.js:101`, `lunchapp-api/src/functions/lunch-reports.js:74`, `lunchapp-api/src/functions/orders.js:30`, `lunchapp-api/src/functions/salad-orders.js:6`. |
| dbo.ExternalLunchPrices | `lunchapp-api/src/functions/external-lunch-prices.js:23`, `lunchapp-api/src/functions/external-lunch-prices.js:54`. |
| dbo.GuestOrders | `lunchapp-api/src/functions/employees.js:301`, `lunchapp-api/src/functions/guest-orders.js:96`, `lunchapp-api/src/functions/guest-orders.js:239`, `lunchapp-api/src/functions/guest-orders.js:259`, `lunchapp-api/src/functions/guest-orders.js:276`, `lunchapp-api/src/functions/guest-orders.js:290`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:236`, `lunchapp-api/src/functions/kitchen-orders.js:77`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:51`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:136`, `lunchapp-api/src/functions/lunch-reports.js:83`, `lunchapp-api/src/functions/meals.js:317`. |
| dbo.GuestSaladOrders | `lunchapp-api/src/functions/guest-salad-orders.js:4`, `lunchapp-api/src/functions/guest-salad-orders.js:5`, `lunchapp-api/src/functions/kitchen-orders.js:126`, `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:5`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:80`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:115`, `lunchapp-api/src/functions/lunch-reports.js:85`. |
| dbo.ImageAssets | `lunchapp-api/src/functions/images.js:35`, `lunchapp-api/src/functions/images.js:194`, `lunchapp-api/src/functions/images.js:296`, `lunchapp-api/src/functions/images.js:332`, `lunchapp-api/src/functions/kiosk-products.js:199`. |
| dbo.KioskCards | `lunchapp-api/src/functions/kiosk-card-login.js:73`, `lunchapp-api/src/functions/kiosk-cards.js:65`, `lunchapp-api/src/functions/kiosk-cards.js:103`, `lunchapp-api/src/functions/kiosk-cards.js:151`, `lunchapp-api/src/functions/kiosk-cards.js:177`, `lunchapp-api/src/functions/kiosk-external-accounts.js:251`, `lunchapp-api/src/functions/kiosk-external-accounts.js:295`, `lunchapp-api/src/functions/kiosk-external-accounts.js:438`, `lunchapp-api/src/functions/kiosk-reports.js:200`, `lunchapp-api/src/functions/kiosk-reports.js:379`, `lunchapp-api/src/functions/kiosk-sales.js:6`, `lunchapp-api/src/functions/kitchen-orders.js:59`, `lunchapp-api/src/functions/kitchen-orders.js:102`, `lunchapp-api/src/functions/orders.js:34`, `lunchapp-api/src/functions/salad-orders.js:7`. |
| dbo.KioskLayoutItems | `lunchapp-api/src/functions/kiosk-layouts.js:55`, `lunchapp-api/src/functions/kiosk-layouts.js:128`, `lunchapp-api/src/functions/kiosk-layouts.js:207`, `lunchapp-api/src/functions/kiosk-layouts.js:214`. |
| dbo.KioskLayouts | `lunchapp-api/src/functions/kiosk-layouts.js:54`, `lunchapp-api/src/functions/kiosk-layouts.js:81`, `lunchapp-api/src/functions/kiosk-layouts.js:104`, `lunchapp-api/src/functions/kiosk-layouts.js:177`, `lunchapp-api/src/functions/kiosk-layouts.js:242`. |
| dbo.KioskProducts | `lunchapp-api/src/functions/images.js:36`, `lunchapp-api/src/functions/images.js:277`, `lunchapp-api/src/functions/images.js:329`, `lunchapp-api/src/functions/kiosk-layouts.js:129`, `lunchapp-api/src/functions/kiosk-layouts.js:191`, `lunchapp-api/src/functions/kiosk-products.js:86`, `lunchapp-api/src/functions/kiosk-products.js:127`, `lunchapp-api/src/functions/kiosk-products.js:154`, `lunchapp-api/src/functions/kiosk-products.js:198`, `lunchapp-api/src/functions/kiosk-sales.js:7`. |
| dbo.KioskSaleLines | `lunchapp-api/src/functions/kiosk-reports.js:62`, `lunchapp-api/src/functions/kiosk-reports.js:114`, `lunchapp-api/src/functions/kiosk-reports.js:128`, `lunchapp-api/src/functions/kiosk-reports.js:231`, `lunchapp-api/src/functions/kiosk-sales.js:5`, `lunchapp-api/src/functions/kiosk-sales.js:9`. |
| dbo.KioskSales | `lunchapp-api/src/functions/kiosk-reports.js:58`, `lunchapp-api/src/functions/kiosk-reports.js:91`, `lunchapp-api/src/functions/kiosk-reports.js:127`, `lunchapp-api/src/functions/kiosk-reports.js:198`, `lunchapp-api/src/functions/kiosk-reports.js:281`, `lunchapp-api/src/functions/kiosk-reports.js:326`, `lunchapp-api/src/functions/kiosk-reports.js:377`, `lunchapp-api/src/functions/kiosk-sales.js:5`, `lunchapp-api/src/functions/kiosk-sales.js:9`. |
| dbo.KioskTransactions | No direct use in current API; do not equate table existence with active workflow. |
| dbo.ManualLunchAdjustments | `lunchapp-api/src/functions/lunch-reports.js:14`, `lunchapp-api/src/functions/lunch-reports.js:39`, `lunchapp-api/src/functions/manual-lunch-adjustments.js:38`, `lunchapp-api/src/functions/manual-lunch-adjustments.js:63`. |
| dbo.Meals | `lunchapp-api/src/functions/current-menu.js:62`, `lunchapp-api/src/functions/guest-orders.js:97`, `lunchapp-api/src/functions/guest-orders.js:195`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:213`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:239`, `lunchapp-api/src/functions/kitchen-orders.js:56`, `lunchapp-api/src/functions/kitchen-orders.js:78`, `lunchapp-api/src/functions/meals.js:114`, `lunchapp-api/src/functions/meals.js:165`, `lunchapp-api/src/functions/meals.js:229`, `lunchapp-api/src/functions/meals.js:271`, `lunchapp-api/src/functions/meals.js:349`, `lunchapp-api/src/functions/menu-cycles.js:356`, `lunchapp-api/src/functions/menu-week.js:78`, `lunchapp-api/src/functions/menu-week.js:167`, `lunchapp-api/src/functions/orders.js:43`, `lunchapp-api/src/functions/orders.js:53`. |
| dbo.Menu | `lunchapp-api/src/functions/current-menu.js:25`, `lunchapp-api/src/functions/current-menu.js:57`, `lunchapp-api/src/functions/current-menu.js:58`, `lunchapp-api/src/functions/menu-cycles.js:70`, `lunchapp-api/src/functions/menu-cycles.js:71`, `lunchapp-api/src/functions/menu-cycles.js:105`, `lunchapp-api/src/functions/menu-cycles.js:106`, `lunchapp-api/src/functions/menu-cycles.js:155`, `lunchapp-api/src/functions/menu-cycles.js:179`, `lunchapp-api/src/functions/menu-cycles.js:199`, `lunchapp-api/src/functions/menu-cycles.js:251`, `lunchapp-api/src/functions/menu-cycles.js:314`, `lunchapp-api/src/functions/menu-cycles.js:351`, `lunchapp-api/src/functions/menu-cycles.js:352`, `lunchapp-api/src/functions/menu-cycles.js:442`, `lunchapp-api/src/functions/menu-week.js:71`, `lunchapp-api/src/functions/menu-week.js:72`, `lunchapp-api/src/functions/menu-week.js:74`, `lunchapp-api/src/functions/menu-week.js:216`, `lunchapp-api/src/functions/menu-week.js:217`, `lunchapp-api/src/functions/menu-week.js:219`, `lunchapp-api/src/functions/menu-week.js:272`, `lunchapp-api/src/functions/menu-week.js:274`. |
| dbo.MenuCycles | `lunchapp-api/src/functions/current-menu.js:25`, `lunchapp-api/src/functions/menu-cycles.js:70`, `lunchapp-api/src/functions/menu-cycles.js:105`, `lunchapp-api/src/functions/menu-cycles.js:155`, `lunchapp-api/src/functions/menu-cycles.js:251`, `lunchapp-api/src/functions/menu-cycles.js:314`, `lunchapp-api/src/functions/menu-cycles.js:442`, `lunchapp-api/src/functions/menu-week.js:71`, `lunchapp-api/src/functions/menu-week.js:216`. |
| dbo.MenuDays | `lunchapp-api/src/functions/current-menu.js:58`, `lunchapp-api/src/functions/menu-cycles.js:199`, `lunchapp-api/src/functions/menu-cycles.js:352`, `lunchapp-api/src/functions/menu-week.js:74`, `lunchapp-api/src/functions/menu-week.js:219`, `lunchapp-api/src/functions/menu-week.js:272`. |
| dbo.MenuWeeks | `lunchapp-api/src/functions/current-menu.js:57`, `lunchapp-api/src/functions/menu-cycles.js:71`, `lunchapp-api/src/functions/menu-cycles.js:106`, `lunchapp-api/src/functions/menu-cycles.js:179`, `lunchapp-api/src/functions/menu-cycles.js:351`, `lunchapp-api/src/functions/menu-week.js:72`, `lunchapp-api/src/functions/menu-week.js:217`, `lunchapp-api/src/functions/menu-week.js:274`. |
| dbo.OrderCancellations | `lunchapp-api/src/functions/guest-orders.js:102`, `lunchapp-api/src/functions/guest-orders.js:240`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:119`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:259`, `lunchapp-api/src/functions/kitchen-orders.js:24`, `lunchapp-api/src/functions/kitchen-orders.js:31`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:38`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:55`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:132`, `lunchapp-api/src/functions/lunch-reports.js:43`, `lunchapp-api/src/functions/lunch-reports.js:68`, `lunchapp-api/src/functions/lunch-reports.js:82`, `lunchapp-api/src/functions/orders.js:43`, `lunchapp-api/src/functions/orders.js:55`. |
| dbo.Orders | `lunchapp-api/src/functions/employees.js:299`, `lunchapp-api/src/functions/kitchen-order-cancellations.js:210`, `lunchapp-api/src/functions/kitchen-orders.js:55`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:34`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:133`, `lunchapp-api/src/functions/lunch-reports.js:46`, `lunchapp-api/src/functions/lunch-reports.js:69`, `lunchapp-api/src/functions/meals.js:316`, `lunchapp-api/src/functions/orders.js:43`, `lunchapp-api/src/functions/orders.js:55`, `lunchapp-api/src/functions/orders.js:56`, `lunchapp-api/src/functions/orders.js:57`. |
| dbo.SaladOrderCancellations | `lunchapp-api/src/functions/kitchen-orders.js:106`, `lunchapp-api/src/functions/kitchen-orders.js:132`, `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:5`, `lunchapp-api/src/functions/lunch-reports.js:49`, `lunchapp-api/src/functions/lunch-reports.js:70`, `lunchapp-api/src/functions/lunch-reports.js:84`. |
| dbo.SaladOrders | `lunchapp-api/src/functions/kitchen-orders.js:98`, `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:5`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:74`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:109`, `lunchapp-api/src/functions/lunch-reports.js:52`, `lunchapp-api/src/functions/lunch-reports.js:71`, `lunchapp-api/src/functions/salad-orders.js:8`, `lunchapp-api/src/functions/salad-orders.js:9`. |
| dbo.Salads | `lunchapp-api/src/functions/guest-salad-orders.js:4`, `lunchapp-api/src/functions/guest-salad-orders.js:5`, `lunchapp-api/src/functions/kitchen-orders.js:99`, `lunchapp-api/src/functions/kitchen-orders.js:127`, `lunchapp-api/src/functions/kitchen-salad-order-cancellations.js:5`, `lunchapp-api/src/functions/kitchen-weekly-summary.js:125`, `lunchapp-api/src/functions/salad-orders.js:8`, `lunchapp-api/src/functions/salads.js:51`, `lunchapp-api/src/functions/salads.js:68`, `lunchapp-api/src/functions/salads.js:88`, `lunchapp-api/src/functions/salads.js:111`, `lunchapp-api/src/functions/salads.js:136`. |

### vwExternalAccountBalances

```sql
 CREATE   VIEW dbo.vwExternalAccountBalances AS     WITH LedgerTotals AS     (         SELECT ExternalAccountID, SUM(AmountCents) AS LedgerCents         FROM dbo.ExternalAccountLedger         GROUP BY ExternalAccountID     ),     LunchTotals AS     (         SELECT ExternalAccountID, SUM(ChargeCents) AS LunchChargeCents         FROM dbo.vwExternalLunchChargeEntries         GROUP BY ExternalAccountID     )     SELECT         a.ExternalAccountID,         a.DisplayName,         a.CompanyName,         a.AccountMode,         a.CreditLimitCents,         COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0) AS BalanceCents,         CASE             WHEN a.AccountMode = N'Prepaid'                 THEN COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0)             ELSE 0         END AS AvailablePrepaidCents,         CASE             WHEN COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0) < 0                 THEN -(COALESCE(l.LedgerCents, 0) - COALESCE(x.LunchChargeCents, 0))             ELSE 0         END AS OutstandingCents     FROM dbo.ExternalAccounts a     LEFT JOIN LedgerTotals l ON l.ExternalAccountID = a.ExternalAccountID     LEFT JOIN LunchTotals x ON x.ExternalAccountID = a.ExternalAccountID; 
```

### vwExternalLunchChargeEntries

```sql
 CREATE   VIEW dbo.vwExternalLunchChargeEntries AS     WITH MealCancellations AS     (         SELECT OrderID, SUM(Quantity) AS CancelledQuantity         FROM dbo.OrderCancellations         WHERE OrderType = N'Employee'         GROUP BY OrderID     ),     SaladCancellations AS     (         SELECT SaladOrderID, SUM(Quantity) AS CancelledQuantity         FROM dbo.SaladOrderCancellations         WHERE OrderType = N'Employee'         GROUP BY SaladOrderID     ),     MealCharges AS     (         SELECT             N'MealOrder' AS SourceType,             o.OrderID AS SourceID,             o.ExternalAccountID,             o.MenuDate,             o.Quantity - COALESCE(c.CancelledQuantity, 0) AS ActiveQuantity,             p.PriceCents,             m.NameEN AS ItemName         FROM dbo.Orders o         INNER JOIN dbo.Meals m ON m.MealID = o.OrderedMealID         LEFT JOIN MealCancellations c ON c.OrderID = o.OrderID         CROSS APPLY         (             SELECT TOP (1) ep.PriceCents             FROM dbo.ExternalLunchPrices ep             WHERE ep.ValidFrom <= o.MenuDate             ORDER BY ep.ValidFrom DESC, ep.ExternalLunchPriceID DESC         ) p         WHERE o.ExternalAccountID IS NOT NULL           AND o.Quantity - COALESCE(c.CancelledQuantity, 0) > 0     ),     SaladCharges AS     (         SELECT             N'SaladOrder' AS SourceType,             o.SaladOrderID AS SourceID,             o.ExternalAccountID,             o.MenuDate,             o.Quantity - COALESCE(c.CancelledQuantity, 0) AS ActiveQuantity,             p.PriceCents,             s.NameEn AS ItemName         FROM dbo.SaladOrders o         INNER JOIN dbo.Salads s ON s.SaladID = o.SaladID         LEFT JOIN SaladCancellations c ON c.SaladOrderID = o.SaladOrderID         CROSS APPLY         (             SELECT TOP (1) ep.PriceCents             FROM dbo.ExternalLunchPrices ep             WHERE ep.ValidFrom <= o.MenuDate             ORDER BY ep.ValidFrom DESC, ep.ExternalLunchPriceID DESC         ) p         WHERE o.ExternalAccountID IS NOT NULL           AND o.Quantity - COALESCE(c.CancelledQuantity, 0) > 0     ),     Charges AS     (         SELECT * FROM MealCharges         UNION ALL         SELECT * FROM SaladCharges     )     SELECT         SourceType,         SourceID,         ExternalAccountID,         MenuDate,         ActiveQuantity,         PriceCents,         ActiveQuantity * PriceCents AS ChargeCents,         ItemName     FROM Charges; 
```

## Identifier reconciliation

All statically named dbo objects referenced by API exist in extracted table/view list; dynamic Employees/ExternalAccounts also exist. Exceptions are **columns/behavior**, not missing tables. `meals.js:deleteMeal` references `Orders.MealID` and `GuestOrders.MealID` that are absent; correct current columns are `OrderedMealID`. `KioskSales.RequestID`, `Orders.CardID`, `SaladOrders.CardID`, `KioskCards.CardHolderName`, `ImageAssets.DisplayName`, `KioskProducts.ImageAssetID` all confirmed. `KioskSaleLines.LineTotalCents` is persisted computed and API does not insert it. SQL view fields verified from module definitions. Alias/CTE identifiers such as MealCancel, CombinedLedger, Owners, Source, boundaries, lineTotals, requested, p and c are query-local, not missing database objects. `OBJECT_ID` manual-adjustment feature check uses the existing table. No stored-procedure/function invocation appears in API.

Current schema permits SQL employee KioskCards while API supports only External; Orders and SaladOrders nullable ownership fields have FKs but no XOR/card-account matching check in 03-constraints.csv; that rule is API-only. Four employee logical links have no declared FK in the extract: GuestSaladOrders.HostEmployeeNo, SaladOrders.EmployeeNo, KioskCards.EmployeeNo, and KioskSales.EmployeeNo. No MenuCycles StartDate unique index, Monday constraint, published-completeness constraint, or immutable Archived metadata constraint is extracted. Cancellation FKs are NO_ACTION; sum<=source constraint is not extracted, enforced API transaction only. GuestOrders no quantity check/unique date/meal/task index. Salad cancellation reason-code enumeration exists API only; meal cancellation enum also SQL constraint.

