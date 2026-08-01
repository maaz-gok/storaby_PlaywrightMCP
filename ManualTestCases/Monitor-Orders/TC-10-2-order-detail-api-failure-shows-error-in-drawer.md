# Order detail API failure shows error in drawer

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Block the order detail API (500).
4. Click "View order" for the first row.


## Expected Result

- The drawer opens (may show an error/empty state instead of data).
- The drawer does not remain in a loading state indefinitely.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
