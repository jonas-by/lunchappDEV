# Product image cropper and picker

Deploy these three complete replacement files to `admin/kioskadmin/`:

- `kiosk-products-admin.html`
- `kiosk-products-admin.js`
- `cafe-kiosk-admin.css`

## Included

- Upload a local JPEG, PNG, WebP or GIF.
- Square crop canvas with mouse, touch dragging and zoom.
- Browser-generated 800 x 800 JPEG output.
- Upload to `/api/images/upload`.
- Shared image picker using `/api/images`.
- Assign and remove `ImageAssetID` in the product payload.
- Existing legacy image URLs remain visible until removed or replaced.
- English, Swedish and Finnish UI text.

## Quick test

1. Open Product Library and edit a product.
2. Click Upload and crop.
3. Select an image, drag and zoom it, then click Use image.
4. Save the product.
5. Reopen the product and confirm the image remains assigned.
6. Open Choose existing and confirm the uploaded image appears.
7. Confirm the Product Library card displays the image.

The image is uploaded when Use image is clicked, before the product itself is saved. If the product dialog is then cancelled, the image stays in the shared library and can be reused later.
