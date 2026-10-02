# Administration landing page

Complete replacement package for the administration landing page.

## Deploy

Copy these files into the administration root:

- `index.html`
- `admin-landing.css`

Keep the existing files in place:

- `lunch.css`
- `admin-i18n.js`

The landing page still loads both of those existing files. `admin-landing.css` is deliberately separate and loaded after `lunch.css`, so the redesign does not alter styling on other lunch administration pages.

## Removed from the landing page

- Obsolete `bulla-products.html` link
- Commented-out POC report link
- Technical file-path block

No destination pages, APIs or existing administration files are modified.
