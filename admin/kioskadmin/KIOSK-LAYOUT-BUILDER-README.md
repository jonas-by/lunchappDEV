# Café Kiosk Layout Builder

## Included files

- `kiosk-layouts.js`: Azure Functions API.
- `kiosk-layout-builder.html`: administration page.
- `kiosk-layout-builder.js`: drag-and-drop and movement controls.
- `cafe-kiosk-admin.css`: shared admin stylesheet with Layout Builder additions.

## API routes

- `GET /api/kiosk/layouts`
- `GET /api/kiosk/layouts/{layoutId}`
- `GET /api/kiosk/layouts/default`
- `PUT /api/kiosk/layouts/{layoutId}`

## Save payload

```json
{
  "items": [
    { "productId": 1, "columnNo": 1, "rowNo": 1, "isVisible": true },
    { "productId": 2, "columnNo": 2, "rowNo": 1, "isVisible": true }
  ]
}
```

The API replaces all items for the selected layout inside one serializable SQL transaction. It validates active products, unique products, unique positions, two-column placement and consecutive row numbering.

## Builder behaviour

- Clicking Add places a product in the shorter column.
- Dragging supports reordering and moving products between columns.
- Products can be dragged back into Available products to remove them.
- Buttons provide move-to-top, up, down, move-to-bottom, switch-column and remove actions.
- Changes remain local until Save layout is clicked.
- The page warns before leaving with unsaved changes.

## Deployment note

The HTML expects `lunch.css` one directory above the kiosk admin folder and `cafe-kiosk-admin.css` in the same folder.
