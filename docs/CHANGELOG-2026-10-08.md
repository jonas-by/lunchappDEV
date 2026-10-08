# Changelog - 2026-10-08

## Summary

The session focused on low-risk UI consistency improvements before vacation and on reviewing the state of project documentation. No database or API behavior was intentionally changed.

## Product Library

Files under `/admin/kioskproducts/`:

- Updated `kiosk-products-admin.html`.
- Updated `cafe-kiosk-admin.css`.
- `kiosk-products-admin.js` was included in coordinated replacement packages; focus behavior was updated in the final version.

Changes:

- Reduced the product image editor preview to a compact square presentation.
- Reordered the multilingual name fields:
  - Swedish is now the full-width first row.
  - English and Finnish share the second row.
- Changed the initial field focus from English to Swedish when opening both New Product and Edit Product dialogs.
- Preserved existing product payload fields and image-library integration.

## External Cards

Files under `/admin/kioskproducts/` or the currently deployed Café Kiosk admin folder, depending on the existing deployment layout:

- Updated `kiosk-cards-admin.html`.
- Updated `cafe-kiosk-admin.css`.
- `kiosk-cards-admin.js` was included unchanged in coordinated replacement packages.

Changes:

- Replaced the plain Active checkbox in the card dialog with the standard green switch control.
- Preserved the existing `cardActive` element ID and JavaScript behavior.
- Restyled the header action as a primary `+ New card` button matching the rest of the Café Kiosk admin interface.

## External Accounts

Files:

- Updated `external-accounts.html`.
- Updated `cafe-kiosk-admin.css`.
- `external-accounts.js` was included unchanged in coordinated replacement packages.

Changes:

- Restyled the header action as a primary `+ New account` button.
- Replaced the plain Active checkbox with the standard green switch control.
- Preserved the existing `accountActive` element ID and JavaScript behavior.
- The initial-card checkbox was not changed.

## Employee Admin

Files under `/admin/`:

- Updated `employee-admin.html`.
- Updated `lunch.css`.
- No employee JavaScript behavior was intentionally changed.

Changes:

- Replaced the plain employee Active checkbox with a green switch.
- Used employee-specific CSS class names to avoid collisions with generic page styles.
- Preserved the existing `editActive` element ID and payload behavior.
- Added employee-table-specific sizing rules intended to keep the desktop table inside its panel.
- Kept horizontal overflow available for narrow/mobile layouts.

## Documentation review

A broad review was made of the existing:

- READMEs
- Start-here documents
- Handovers
- Daily documentation
- Changelogs
- Architecture documents
- Database migrations and change documents
- API and frontend change documents
- Deployment and project overview documents

Conclusion:

- Major implemented functionality appears to be documented somewhere.
- The main documentation risk is fragmentation and stale overview files, not missing history.
- The solution needs consolidated current-state documents based on authoritative schema, source and Azure inventories.
- Image Library and reporting need stronger permanent documentation.
- Admin folder organization and historical `bulla` naming remain cleanup items.

## Database and API

- No SQL schema changes were made on 2026-10-08.
- No API route or backend business-rule changes were made on 2026-10-08.
- Existing element IDs used by JavaScript were intentionally retained during UI changes.

## Validation required

After deployment, verify:

- Product create/edit and image selection.
- Swedish initial focus in the product dialog.
- Card create/edit and Active state persistence.
- Account create/edit and Active state persistence.
- Employee create/edit and Active state persistence.
- Employee table at desktop and narrow viewport widths.
- Browser console remains free of new errors.
