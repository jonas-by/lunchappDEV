# Lunch App Frontend

## Purpose

This repository contains the browser-based frontend for the Lunch App proof of concept and future production application.

The frontend is hosted in Azure Static Web Apps and is automatically deployed from GitHub when changes are pushed to the configured branch.

## Local path

```text
C:\lunchapp\lunchappDEV
```

## Azure resource

| Setting | Value |
|---|---|
| Resource group | `lunchapp` |
| Service | Azure Static Web Apps |
| Static Web App URL | `https://black-bay-0c822f703.3.azurestaticapps.net` |
| Region | Sweden Central |
| Deployment source | GitHub |

## Current backend integration

The frontend can call the development API at:

```text
https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api
```

The first working end-to-end test is:

```text
GET /api/employees
```

The test page is:

```text
test-employees.html
```

The successful request path is:

```text
Azure Static Web App
    -> Azure Function App
    -> Azure SQL Database
    -> JSON response
    -> Browser
```

## CORS

The Function App CORS configuration allows this frontend origin:

```text
https://black-bay-0c822f703.3.azurestaticapps.net
```

Important: enter the origin without a trailing slash.

Local files opened with `file://` do not use the same origin. Test cross-origin API calls through the deployed Static Web App or a local development web server.

## Planned migration from static data

Suggested order:

1. Meals
2. Kiosk products
3. Employees and card lookup
4. Menu weeks and menu days
5. Lunch orders
6. Kiosk transactions and prepaid balances

Start with read-only endpoints before moving business-critical write operations to the API.

## Git workflow

Typical deployment flow:

```powershell
git status
git add .
git commit -m "Describe the change"
git push
```

A push to the configured GitHub branch triggers deployment to Azure Static Web Apps.

## Current smoke test

Open:

```text
https://black-bay-0c822f703.3.azurestaticapps.net/test-employees.html
```

Click **Load Employees**. A successful test returns employee data from Azure SQL through the Function App.

## Security notes

- Never place SQL credentials or connection strings in frontend JavaScript.
- The browser must communicate only with the API, never directly with Azure SQL.
- Replace temporary anonymous endpoints with appropriate authentication and authorization before production rollout.
- Remove or restrict diagnostic pages when no longer needed.
