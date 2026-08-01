# Previous page returns to page 1 data

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click "Next page", then click "Previous page".


## Expected Result

- Pagination text reverts to "1-10".
- The first row matches the original page 1 first row.
- The Previous button is disabled again.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
