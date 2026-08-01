# Page refresh restores default state

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Monitor-Orders/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Apply a status filter (e.g. Printing), add a search, then reload the page.


## Expected Result

- The status filter button reverts to "Statuses".
- The search input is empty.
- Pagination shows "1-10".
- The table shows the full unfiltered list (10 rows).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/browser-behaviour.spec.js` for implementation details.
