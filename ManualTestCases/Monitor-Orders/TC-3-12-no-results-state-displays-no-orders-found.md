# No results state displays "No orders found."

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Search for "ZZZZNONEXISTENT12345" and wait.


## Expected Result

- A single table row displays the "No orders found." message.
- Pagination text shows "0-0 of 0".
- All pagination buttons (First, Previous, Next, Last) are disabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
