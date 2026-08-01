# Table headers are correct

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/orders-table.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Seven column headers are visible, in order: "Order Number", "Customer", "Story", "Transaction", "Transaction Date", "Order Status", "Action".
- Headers are in the correct order as listed.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/orders-table.spec.js` for implementation details.
