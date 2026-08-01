# Last page button navigates to the final page

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click "Last page".


## Expected Result

- Pagination text shows the final range ending in `of <total>` (e.g. `81-85 of 85`).
- Next and Last buttons are disabled.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/pagination.spec.js` for implementation details.
