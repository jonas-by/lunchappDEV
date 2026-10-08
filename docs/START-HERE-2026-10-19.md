# Start Here - 2026-10-19

## Purpose

This document is the restart point after the one-week vacation. The LunchApp environment was deliberately left in a stable state on 2026-10-08. The final pre-vacation session focused on UI consistency and documentation review rather than new functionality.

## Read first

Recommended reading order:

1. `HANDOVER-2026-10-08.md`
2. `CHANGELOG-2026-10-08.md`
3. `HANDOVER-2026-10-07.md`
4. `DATABASE-CHANGES-2026-10-07.md`
5. `ARCHITECTURE-NOTES-2026-10-07.md`

Treat the dated handovers and change documents from 2026-10-05 through 2026-10-08 as more current than the old overview files. Several overview documents are now historical and must not be assumed to describe the deployed solution.

## Current state

The solution currently includes:

- Employee lunch ordering
- Salad ordering
- Guest lunch and salad ordering
- Kitchen summaries and traceability
- Lunch reporting and exports
- External accounts and external cards
- Card-scoped external lunch ownership
- Café Kiosk products, layouts, sales and balances
- Prepaid, postpaid and invoice account handling
- Image Library with private blob-backed images
- Admin interfaces for employees, products, cards, accounts, layouts, reports and images

The most recent architectural change before vacation was the CardID ownership model completed on 2026-10-07. ExternalAccountID remains the billing owner while CardID identifies the person/card that owns an external order.

## Changes completed on 2026-10-08

The following UI consistency work was completed:

- Product images in the Product Library editor were reduced to a compact preview.
- Product name fields were reordered so Swedish is full-width above English and Finnish.
- Swedish now receives initial focus when opening the Product Library new/edit dialog.
- External Cards now use the standard green Active switch.
- External Cards received a properly styled `+ New card` header action.
- External Accounts received a properly styled `+ New account` header action.
- External Accounts now use the standard green Active switch.
- Employee Admin now uses a namespaced green Active switch.
- Employee Admin table sizing was adjusted to prevent unnecessary desktop horizontal scrolling while preserving mobile overflow.

## First actions on 2026-10-19

1. Smoke-test the final 2026-10-08 UI changes in the deployed environment:
   - Product Library editor image size and language-field order
   - Product Library Swedish initial focus
   - External Cards Active switch and New card button
   - External Accounts Active switch and New account button
   - Employee Admin Active switch
   - Employee Admin table at normal desktop width and at mobile width
2. Check the browser console for errors on every changed admin page.
3. Verify that creating and editing products, cards, accounts and employees still sends the original payloads.
4. Confirm that the final pre-vacation commits are present in `main` and deployed.

## Main outstanding work

### 1. Consolidate the documentation into current source-of-truth documents

The documentation review on 2026-10-08 found that implementation history is well preserved, but the current state is fragmented across handovers, changelogs, architecture notes and migration documents.

Create and maintain:

- `CURRENT-SOLUTION-OVERVIEW.md`
- `CURRENT-DATABASE-SCHEMA.md`
- `CURRENT-API-SURFACE.md`
- `CURRENT-FRONTEND-STRUCTURE.md`
- `AZURE-DEPLOYMENT.md`
- `BUSINESS-RULES.md`
- `REPORTING.md`

The old `PROJECT-STATUS.md`, `API-REFERENCE.md`, `DEPLOYMENT-STATE.md` and parts of the old overview set should be archived or clearly marked historical after the consolidated documents exist.

### 2. Extract authoritative technical inventories before generating final documentation

Collect source-of-truth exports rather than reconstructing the system from memory:

- Complete SQL schema: tables, columns, keys, constraints, indexes, views, procedures and functions
- Azure resources and resource groups
- Function Apps and application settings, with secrets redacted
- SQL Server and database configuration
- Storage accounts, containers and image storage conventions
- API folder/function inventory and routes
- Frontend folder/file tree and deployment paths
- Authentication and authorization configuration
- Reporting/export inventory and business consumers

These inventories can then be supplied to Cowork with the historical documents to generate a coherent documentation set. Accuracy must take priority over filling gaps by inference.

### 3. Admin folder cleanup and naming consistency

Admin files are currently split between `/admin/`, `/admin/kioskadmin/` and `/admin/kioskproducts/`, while the Café Kiosk frontend still has historical `bulla` naming in places. Cleanup is still pending.

Do not move folders casually. First create a deployment/path inventory and search all HTML, JavaScript, deployment scripts and documentation for hard-coded relative paths. Perform the cleanup as a separate tested change.

### 4. Permanent Image Library documentation

The Image Library worked with little friction and was therefore documented mainly in daily notes and handovers. Add it to the permanent architecture, database, API and Azure storage documentation, including:

- `ImageAssets`
- Private blob storage design
- API-streamed image access
- Upload/crop flow
- Product-image relationships
- Soft-delete or lifecycle behavior

### 5. Reporting documentation

Create a clear inventory of payroll, external account, kitchen, guest and financial reports. For each report, document source data, inclusion/exclusion rules, business purpose and downstream recipient or process.

## Working strategy after vacation

- Validate the deployed state before coding.
- Keep changes small and commit each logical change separately.
- Continue supplying complete replacement files or coordinated ZIPs rather than manual patch fragments.
- Update the handover and changelog at the end of each session.
- Do not add major features until the current-state documentation package is assembled.

## Suggested Cowork preparation prompt

Use this only after the authoritative inventories have been collected:

> Produce technical system documentation for the LunchApp solution using the supplied SQL schema, Azure inventory, API source, frontend structure and dated project documents as evidence. Treat the extracted schema, configuration and source files as authoritative. Use dated handovers and changelogs to explain intent and historical decisions. Do not infer missing functionality or configuration. Mark unknown, unverified or conflicting information explicitly. Produce a current solution overview, system architecture, database reference, API surface, frontend structure, Azure deployment guide, business rules, reporting reference, operational procedures and rebuild/recovery guide. Separate current state from historical changes and deprecated material. Assume the reader is a technically competent developer or administrator who has never seen the solution.

## Definition of a good restart

The first session after vacation is successful when:

- The 2026-10-08 UI changes are verified in production/development as appropriate.
- No regression is found in create/edit flows.
- Technical inventory collection has started.
- One current-state document has been created from authoritative data rather than memory.
