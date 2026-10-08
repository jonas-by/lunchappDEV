# Start here tomorrow - 2026-10-06

## First task: validate the Image Library deployment

Open:

```text
/admin/kioskadmin/image-library.html
```

Check in this order:

1. All current images load.
2. Total, used and unused counts look correct.
3. Search works.
4. `Show unused only` works.
5. Preview opens and metadata looks sensible.
6. Delete is disabled for an image assigned to a product.
7. Upload a disposable image through Product Library, leave it unused, then delete it from Image Library.
8. Confirm the deleted row is gone from `dbo.ImageAssets`.
9. Confirm the GUID Blob is gone from `images/products/`.
10. Confirm the new Image Library card on `/admin/index.html` opens the page.

## Quick regression test

- Edit a Cafe Kiosk product.
- Choose an existing image.
- Save the product.
- Confirm Product Library shows it.
- Confirm the Cafe Kiosk shows it.
- Remove the image from the product and save.
- Confirm the kiosk falls back to its icon.

## If something fails

### Functions cannot load `images.js`

From the API project root:

```powershell
npm install
func start
```

### Image upload works but product does not show it

Check:

```sql
SELECT ProductID, NameEN, ImageAssetID, ImageUrl
FROM dbo.KioskProducts
ORDER BY ProductID;
```

Then verify:

```text
GET /api/kiosk/products/{id}
```

The response should contain `imageAssetId` and a managed `imageUrl` ending in `/api/images/{id}/content`.

### Image Library deletion returns HTTP 409

The image is still assigned to at least one product. Remove the assignment first. The protection is intentional.

## After validation

Do not immediately add folders, tags or image categories. Let real usage reveal whether any of that is needed.

Recommended next major item from the existing backlog:

```text
Store exact CardID on external meal and salad orders.
```

This should remain separate from the image work.

## Session rule

Continue using complete replacement files and ZIP packages. Do not switch back to manual snippets, because that recreates the deployed-versus-remembered version problem.
