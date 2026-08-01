# Search input renders with correct placeholder

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- A search input is visible.
- It has `type="search"` and placeholder "Search anything...".

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
