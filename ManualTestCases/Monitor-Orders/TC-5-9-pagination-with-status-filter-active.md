# Pagination with status filter active

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select the "Printing" status filter.
4. Click "Next page" (if enabled).


## Expected Result

- The request includes both the page and the status parameter.
- All displayed rows still have the "Printing" status.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
