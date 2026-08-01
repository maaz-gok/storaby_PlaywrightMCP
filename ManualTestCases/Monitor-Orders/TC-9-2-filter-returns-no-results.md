# Filter returns no results

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select a status filter that returns no orders (e.g. Shipped, if empty on staging).


## Expected Result

- The "No orders found." empty state is displayed.
- Pagination shows "0-0 of 0".
- Pagination buttons are disabled.
- The filter button still shows the selected status.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
