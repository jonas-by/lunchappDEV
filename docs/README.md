# LunchApp / Cafe Kiosk documentation

This documentation package records the image-library work completed on 2026-10-06.

## Documents

- `DAILY-DOCUMENTATION-2026-10-06.md`: detailed technical record of database, Azure, API and frontend changes.
- `HANDOVER-2026-10-06.md`: current state, deployed components, decisions, cautions and backlog.
- `START-HERE-TOMORROW-2026-10-06.md`: shortest practical restart path for the next session.

## Scope completed today

A complete Cafe Kiosk product-image workflow was implemented:

1. Generic SQL image-asset metadata with a nullable product reference.
2. Private Azure Blob Storage container and Function App configuration.
3. Node.js Azure Functions image API.
4. Product Library upload, crop, reuse and assignment UI.
5. Cafe Kiosk image rendering with icon fallback.
6. Dedicated Image Library page with safe deletion of unused assets.
7. Admin landing-page navigation update.

The authoritative working method remains: generate and deploy complete replacement files rather than applying manual snippets.
