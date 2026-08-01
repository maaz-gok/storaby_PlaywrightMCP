# Card count and page size match the backend

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Capture the page-1 response and count the rendered cards.


## Expected Result

- Rendered card count equals `response.data.items.length`.
- Card order matches the order of `items` in the response.
- Page size is 9 per page.

## Notes

Refer to the automated test in `tests/admin/Templates/data-consistency.spec.js` for implementation details.
