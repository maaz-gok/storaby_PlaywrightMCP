# Filter persists after pagination

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Generating Final" status filter.
4. Click "Next page" (if enabled).


## Expected Result

- The filter button still shows "Generating Final" after pagination.
- All displayed rows still have the "Generating Final" status.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
