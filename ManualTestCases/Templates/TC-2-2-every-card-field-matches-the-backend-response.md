# Every card field matches the backend response

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Capture the page-1 response and compare each rendered card against its API item.


## Expected Result

- Card N's title text equals `items[N].name`.
- Card N's cover `img[alt]` equals `items[N].name`; `src` starts with the `coverImageUrl` path prefix (ignore the signed query).
- Card N's age tag equals the mapped `ageVersion` ("Age 2-4" / "Age 4-8").
- Card N's storefront tag equals the mapped `shelfCategory`.
- Card N's badge equals `isActive ? "Visible" : "Hidden"`.
- Action buttons have accessible names `Edit <name>`, `Hide|Show <name>`, `Delete <name>`.
- Card order matches `data.items` order.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
