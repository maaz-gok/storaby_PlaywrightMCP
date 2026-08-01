# Search with special characters

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/search.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Type `"@#$"` in the search input and wait.


## Expected Result

- The request is sent with the special characters URL-encoded.
- The app does not break: if zero results, the "No orders found." empty state renders.
- No console errors.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/search.spec.js` for implementation details.
