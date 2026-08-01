# Search input renders with correct placeholder

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates


## Expected Result

- A search input is visible with placeholder text "Search templates".
- The input is initially empty.

## Notes

Refer to the automated test in `tests/admin/Templates/search.spec.js` for implementation details.
