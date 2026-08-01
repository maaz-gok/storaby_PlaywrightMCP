# No orders in database via API mock

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Mock the orders API to return an empty items array.
3. Navigate to /admin/orders.


## Expected Result

- The "No orders found." empty state is displayed.
- A single empty-state table row is rendered.
- The app handles an empty database gracefully.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
