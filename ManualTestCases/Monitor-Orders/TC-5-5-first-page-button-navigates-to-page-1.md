# First page button navigates to page 1

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click "Next page" twice to reach page 3.
4. Click "First page".


## Expected Result

- Pagination text shows "1-10".
- First and Previous buttons are disabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
