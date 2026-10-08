# Start Here - 2026-10-19 (Revised After Documentation Review)

## Welcome back from Spain 🍻

Before building anything new, spend the first session validating the current state of the solution. The documentation review and Cowork-generated documentation uncovered several items that should be verified before additional feature work begins.

The goal of the first session is:

1. Confirm that production/development matches the documented state.
2. Verify Cowork's findings.
3. Decide whether the next phase is bug fixing, documentation consolidation, or new features.

---

# Read first

Recommended reading order:

1. 00-START-HERE.md (Cowork generated)
2. HANDOVER-2026-10-08.md
3. CHANGELOG-2026-10-08.md
4. 14-KNOWN-GAPS-AND-TODOS.md
5. 17-EXECUTIVE-SUMMARY.md
6. 03-CURRENT-DATABASE-SCHEMA.md
7. 08-BUSINESS-RULES.md

Treat the Cowork-generated documentation package as the new baseline.

Historical handovers and changelogs remain valuable reference material, but source code, SQL extraction results and the generated documentation now represent the most complete current picture of the solution.

---

# First actions after vacation

## 1. Verify deployment parity

Before changing any code:

- Confirm latest commits are present in Git.
- Confirm deployed frontend matches repository.
- Confirm deployed API matches repository.
- Confirm SQL schema matches extracted documentation package.
- Confirm no local-only changes were forgotten before vacation.

---

## 2. Re-run smoke tests

### Product Library

Verify:

- Compact image preview
- Swedish / English / Finnish field layout
- Swedish initial focus
- Image Library integration

### External Cards

Verify:

- Active switch
- New Card button
- Create/edit functionality

### External Accounts

Verify:

- Active switch
- New Account button
- Create/edit functionality

### Employee Admin

Verify:

- Active switch
- Desktop layout
- Mobile layout
- Horizontal scrollbar behaviour

---

## 3. Validate Cowork findings

These should be reviewed before major feature work resumes.

### External My Orders

Investigate whether external users can retrieve their own orders correctly.

Potential issue:

- Missing CardID/cardId parameter handling.

### Salad cancellation handling

Verify:

- Salad cancellation flows
- Modification after cancellation
- Referential integrity

### Weekly salad reporting

Verify:

- Weekly totals match daily totals
- Cancellation handling is consistent

### Meal hard delete

Verify:

- Hard-delete validation path
- Current column references

### External lunch balance enforcement

Review current behaviour.

Potential issue:

- Lunch ordering may not enforce account limits in the same way as Café Kiosk purchases.

---

# Priority backlog

## P0 - Verify before new development

- External My Orders CardID handling
- Salad cancellation / replacement behaviour
- Weekly salad reporting consistency
- Meal hard-delete validation
- Verify deployed authentication configuration

---

## P1 - Documentation consolidation

Create or finalize:

- CURRENT-SOLUTION-OVERVIEW
- CURRENT-DATABASE-SCHEMA
- CURRENT-API-SURFACE
- CURRENT-FRONTEND-STRUCTURE
- AZURE-ARCHITECTURE
- BUSINESS-RULES

Use the generated documentation as the primary source.

---

## P1 - Azure and security

### Microsoft Entra authentication

Revisit Entra integration.

Areas to review:

- Employee authentication
- Administrator authorization
- API access model
- Lunch Kiosk authentication strategy
- Café Kiosk authentication strategy

Goal:

Move from planned design to implementation plan.

---

## P2 - User experience improvements

### Nice URL for the application

Investigate replacing the current Azure-generated URL with a friendly company URL.

Examples:

- lunch.baltic-yachts.fi
- lunchapp.company.tld
- cafe.company.tld

Review:

- Static Web App custom domains
- DNS ownership
- Certificates
- Internal/external accessibility

---

## P2 - Folder and naming cleanup

Still pending:

- Admin folder rationalization
- Historical bulla naming cleanup
- Deployment path verification before moving files

Do not do this casually.

Create a full path/reference inventory first.

---

## P3 - Future feature work

Only once P0 items are verified.

Potential candidates:

- Additional reporting
- Entra integration
- UX improvements
- Operational tooling
- Documentation automation

---

# Documentation package status

The project now has:

- SQL extraction package
- Azure evidence templates
- API inventory
- Frontend inventory
- Business rules documentation
- Deployment documentation
- Historical timeline
- Known gaps register

This is the strongest documentation state the project has had so far.

---

# Definition of a successful restart session

A successful first session after vacation means:

- Environment verified
- Deployment verified
- Cowork findings reviewed
- No surprise regressions found
- Next development phase selected

Only then start building new functionality.
