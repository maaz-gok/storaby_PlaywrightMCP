# Search and filter results match backend filtered responses

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a search query, then an age-group filter, then a combination, capturing each response.


## Expected Result

- Rendered cards match `response.data.items` for every search/filter combination.
- Search/filter parameters (`q`, `ageGroup`, `storefrontSection`, `visibility`) are reflected in the request.
- `total` in the response matches the rendered result count.

## Notes

Refer to the automated test in `tests/admin/Templates/data-consistency.spec.js` for implementation details.
