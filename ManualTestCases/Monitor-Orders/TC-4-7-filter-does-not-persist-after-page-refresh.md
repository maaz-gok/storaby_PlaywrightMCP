# Filter does not persist after page refresh

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Printing" status filter.
4. Reload the page.


## Expected Result

- The filter button reverts to "Statuses" after refresh.
- The full unfiltered list is restored (10 rows on page 1).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
