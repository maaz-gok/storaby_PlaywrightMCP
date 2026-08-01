# Search does not persist after page refresh

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Search for "usman" and wait for results.
4. Reload the page.


## Expected Result

- The search input is empty after refresh.
- The table shows the full unfiltered list (10 rows on page 1).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
