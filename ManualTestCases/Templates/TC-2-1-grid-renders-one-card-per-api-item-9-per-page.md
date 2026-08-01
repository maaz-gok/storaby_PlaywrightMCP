# Grid renders one card per API item, 9 per page

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Capture the `GET /story-templates/admin/all?page=1&limit=9` response.


## Expected Result

- The number of rendered cards equals `response.data.items.length` (9 on full pages).
- `response.data.limit === 9` and `totalPages === Math.ceil(total / 9)`.
- Pagination text equals `1-<items.length> of <total>`.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
