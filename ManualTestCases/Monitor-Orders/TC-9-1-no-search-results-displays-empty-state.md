# No search results displays empty state

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Search for "ZZZZNONEXISTENT12345".


## Expected Result

- The "No orders found." empty state message is visible.
- Pagination shows "0-0 of 0".
- All pagination buttons are disabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
