# Clear search restores full list

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Search for "usman" and wait for filtered results.
4. Clear the search input.


## Expected Result

- The table restores to the full unfiltered order list (10 rows on page 1).
- The search input is empty.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
