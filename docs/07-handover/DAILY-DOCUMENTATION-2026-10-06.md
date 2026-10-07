# Daily documentation - 2026-10-06

## Summary

The main objective was to add a future-proof image system while implementing images only for Cafe Kiosk products today. The result is an end-to-end workflow from browser-side cropping through private Blob Storage, SQL metadata, product assignment, kiosk display and image-library maintenance.

No meal or salad image fields were added. The generic image table allows those areas to adopt the same model later without redesigning the storage layer.

## 1. Database changes

### New table: `dbo.ImageAssets`

Created as a generic shared image metadata table rather than adding a raw URL directly to each business table.

Columns established during the session:

```text
ImageAssetID       INT IDENTITY primary key
DisplayName        NVARCHAR(255) NULL
BlobName           NVARCHAR(500) NOT NULL
OriginalFileName   NVARCHAR(255) NOT NULL
ContentType        NVARCHAR(100) NOT NULL
FileSize           BIGINT NULL
Width              INT NULL
Height             INT NULL
CreatedAt          DATETIME2 NOT NULL, default SYSUTCDATETIME()
CreatedBy          NVARCHAR(100) NULL
```

### Updated table: `dbo.KioskProducts`

Added:

```text
ImageAssetID INT NULL
```

Added a foreign key from `dbo.KioskProducts.ImageAssetID` to `dbo.ImageAssets.ImageAssetID`.

### Database decisions

- Only Cafe Kiosk products reference images today.
- Meals and salads were deliberately left unchanged because no meal or salad images currently exist.
- The image metadata model is generic so future tables can reference `ImageAssets` later.
- One product has zero or one image.
- One image may be reused by multiple products.
- The existing `KioskProducts.ImageUrl` column remains supported temporarily for compatibility.
- Blob names, not complete storage URLs, are stored in `ImageAssets`.
- `Width` and `Height` are currently `NULL`. The browser always produces an 800 x 800 result, but dimension metadata was not made a blocker.

## 2. Azure resources and configuration

### Storage account

Created a dedicated storage account:

```text
lunchappdevstorage
```

Settings used:

```text
Region: Sweden Central
Performance: Standard
Redundancy: LRS
```

### Blob container

Created:

```text
images
```

The container is private. Images are served through the Function App rather than direct anonymous Blob URLs.

Application blobs are stored beneath the virtual path:

```text
products/<guid>.<extension>
```

GUID names prevent accidental overwrites. Human-facing names remain in SQL as `DisplayName` and `OriginalFileName`.

### Function App settings

Added under App settings:

```text
ImageStorageConnection
ImageContainerName=images
```

`ImageStorageConnection` contains the dedicated storage account connection string. `AzureWebJobsStorage` was not reused because runtime storage and application images should remain separate.

## 3. API changes

The API is Node.js using Azure Functions programming model v4, `@azure/functions`, `mssql` and `app.http()` registration under `src/functions`.

### Updated dependency

Added to `package.json`:

```text
@azure/storage-blob
```

After replacing `package.json`, local development requires:

```powershell
npm install
func start
```

### New file: `src/functions/images.js`

Endpoints:

```text
GET    /api/images
GET    /api/images/{id}
GET    /api/images/{id}/content
POST   /api/images/upload
DELETE /api/images/{id}
```

Behaviour:

- Lists image metadata and `productUsageCount`.
- Returns one image's metadata.
- Streams private Blob content through the API.
- Accepts multipart form-data with a `file` field.
- Accepts optional `displayName` and `createdBy` fields.
- Supports JPEG, PNG, WebP and GIF uploads.
- Enforces a 5 MB uploaded-file limit.
- Creates a unique GUID-based blob name under `products/`.
- Writes metadata to `dbo.ImageAssets` after Blob upload.
- Deletes the uploaded Blob if the SQL insert fails.
- Blocks deletion when any `KioskProducts` row references the image.
- Deletes both Blob content and SQL metadata for unused images.

### Updated file: `src/functions/kiosk-products.js`

Changes:

- Accepts nullable `imageAssetId` on product create and update.
- Joins `dbo.ImageAssets` when reading products.
- Returns image metadata with product records.
- Returns a managed `/api/images/{id}/content` URL in `imageUrl` when `ImageAssetID` is assigned.
- Returns the old database value separately as `legacyImageUrl`.
- Retains existing product CRUD behaviour and inactive-product handling.

### API validation completed

The following path was tested successfully:

1. `GET /api/images` returned the library.
2. Multipart upload returned HTTP 201.
3. SQL metadata row was created.
4. GUID-named Blob appeared under `images/products/`.
5. `/api/images/{id}/content` displayed the private image in a browser.
6. Product assignment through `ImageAssetID` worked.
7. Kiosk product API returned the managed image URL.

## 4. Product Library frontend

Location:

```text
admin/kioskadmin/
```

Complete files generated:

```text
kiosk-products-admin.html
kiosk-products-admin.js
cafe-kiosk-admin.css
```

### Added workflow

- Current image preview in the product editor.
- `Upload and crop` action.
- `Choose existing` shared-library picker.
- `Remove image` action.
- Hidden `ImageAssetID` state included in product save payload.
- Searchable existing-image picker.
- Product-card image thumbnails.
- Legacy image URL compatibility.
- English, Swedish and Finnish UI strings.

### Browser cropper

Implemented without a third-party frontend library.

Features:

- Accepts JPEG, PNG, WebP and GIF source files.
- Fixed square crop area.
- Mouse and touch drag-to-position.
- Zoom slider.
- Browser canvas output at 800 x 800 px.
- JPEG output at 0.90 quality.
- Upload happens when `Use image` is clicked.

The original local file is not uploaded. Only the prepared square output is sent to the API.

If the product dialog is cancelled after `Use image`, the uploaded image remains in the shared library. This is intentional because the asset can be reused or removed later from the Image Library page.

## 5. Cafe Kiosk frontend

Location:

```text
lunchappDEV/bulla/
```

Updated complete file:

```text
order.js
```

The kiosk's existing renderer and CSS already supported `product.imageUrl` and `object-fit: cover`. The missing part was fresh image data in layout results.

The updated load logic:

1. Loads the default kiosk layout.
2. Loads the current product library in parallel.
3. Merges current product data into layout items by `productId`.
4. Preserves the saved layout position and visibility settings.

Display fallback order:

1. Managed product image.
2. Configured product icon.
3. Package emoji.

The kiosk was visually verified with images for Nocko and Skinksemla while Bulla correctly retained the fallback icon.

## 6. Image Library frontend

Location:

```text
admin/kioskadmin/
```

New files:

```text
image-library.html
image-library.js
```

Updated shared file:

```text
cafe-kiosk-admin.css
```

Features:

- Grid of all shared image assets.
- Total, used and unused summary counts.
- Search by display name, filename and related metadata.
- `Show unused only` filter.
- Full-size preview dialog.
- File metadata and product usage count.
- Delete button disabled for used images.
- Confirmation dialog for permanent deletion.
- API remains the final authority and returns HTTP 409 if usage changes before deletion.
- English, Swedish and Finnish UI.

Direct URL:

```text
/admin/kioskadmin/image-library.html
```

## 7. Admin landing page

Updated complete file:

```text
admin/index.html
```

Changes:

- Added an `Image library` card linking to `kioskadmin/image-library.html`.
- Updated Product Library description to say `images` instead of `image URLs`.
- Updated Kiosk cards description to `Temporary external cards.` because employee cards are maintained under Employee Admin.

Cafe Kiosk navigation is now:

```text
Product library
Image library
Layout builder
```

## 8. Decisions made

- Database first, then storage, API and frontend.
- Generic image metadata table, but product integration only today.
- Private Blob container with API streaming.
- Dedicated storage account rather than reusing Function runtime storage.
- GUID Blob names and human-readable SQL metadata.
- Browser-side crop and normalization so kitchen staff do not need image-dimension instructions.
- Shared image reuse rather than forcing one upload per product.
- Complete replacement files and ZIP packages only. Avoid manual snippets and local/deployed divergence.
- No folders, categories, tags, versions or other digital-asset-management features at this stage.
- No authorization changes today. Existing endpoints remain anonymous in line with the current API baseline.

## 9. Generated deployment packages

```text
lunchapp-image-api-package-2026-10-06.zip
cafe-kiosk-product-image-ui-2026-10-06.zip
cafe-kiosk-image-display-2026-10-06.zip
cafe-kiosk-image-library-2026-10-06.zip
admin-index-image-library-2026-10-06.zip
```

## 10. Known follow-up items

- Verify all Image Library page functions after deployment, especially unused-image deletion.
- Consider updating `kiosk-layouts.js` later so it directly joins `ImageAssets`; the kiosk currently refreshes product data client-side to obtain current image URLs.
- Add authorization before production. Upload and delete endpoints are currently anonymous.
- Decide whether image replacement needs cache-busting later. New uploads use new asset IDs and GUIDs, so the current workflow naturally avoids most cache issues.
- Consider recording 800 x 800 dimensions in SQL later, but this is not operationally required.
- Clean up admin folder organization later. Cafe Kiosk admin pages currently live under `admin/kioskadmin/`, while most other admin pages live directly under `admin/`.
