# Table displays 10 rows per page

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/orders-table.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Exactly 10 rows are rendered in the table body.
- Each row contains 7 cells.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/orders-table.spec.js` for implementation details.
