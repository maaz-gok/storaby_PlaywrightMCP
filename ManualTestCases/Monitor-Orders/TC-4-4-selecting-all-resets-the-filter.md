# Selecting "All" resets the filter

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Printing" status filter and wait for filtered results.
4. Open the dropdown and select "All".


## Expected Result

- The filter button text reverts to "Statuses".
- The full unfiltered list is restored (10 rows on page 1).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
