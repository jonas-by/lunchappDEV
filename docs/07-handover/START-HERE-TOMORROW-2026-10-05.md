# Start Here Tomorrow: 2026-10-05

## First 15 minutes

1. Pull or open the latest deployed repository version.
2. Confirm the final files from 2026-10-05 are committed.
3. Verify these pages still load:
   - `admin/index.html`
   - `admin/lunch-reports.html`
   - `admin/external-lunch-prices.html`
   - `admin/kioskadmin/external-accounts.html`
   - `admin/kioskadmin/kiosk-cards-admin.html`
4. Place one small external test order and confirm:
   - Kitchen shows cardholder name.
   - External account ledger shows lunch purchase.
   - Balance changes by €11.35.
   - Card tile shows the same balance/outstanding value.

## Documentation checkpoint

Update the repository root `README.md` using this package. Ensure the API host and new database objects are documented.

## Primary focus: image library

Recommended first design decision:

```text
One shared image library
├── Meal images
├── Salad images if needed
└── Café Kiosk product images
```

Questions to settle before implementation:

- Azure Blob Storage container structure
- Public versus private blob access
- Upload route and admin authorization
- Image resizing and supported formats
- Whether database tables store blob URL, blob name, or image asset ID
- Reuse of one image across multiple products/meals
- Placeholder and missing-image behavior
- Cleanup policy for unreferenced images

Recommended production-minded model:

```text
ImageAssets
├── ImageAssetID
├── BlobName
├── OriginalFileName
├── ContentType
├── Width
├── Height
├── FileSize
├── CreatedAt
└── CreatedBy
```

Then reference `ImageAssetID` from meals or products rather than scattering raw URLs.

## Do not forget

High-priority architecture follow-up:

```text
External account
→ multiple cards
→ store exact CardID on Orders and SaladOrders
```

This is not required before starting the image library, but it should remain near the top of the backlog.

## Suggested next-session order

1. Repository/documentation sanity check.
2. Image library architecture.
3. Blob Storage setup.
4. Image upload API.
5. Admin image browser/upload UI.
6. Meal Library integration.
7. Café Product Library integration.
8. Kiosk and ordering UI image display.

Avoid mixing the CardID schema migration into the image-library work unless a blocking cardholder attribution issue appears. One side quest at a time, allegedly.
