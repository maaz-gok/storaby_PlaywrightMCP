# Orders list data matches API

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Capture the `GET /admin/orders?page=1&limit=10` response and compare against the first 3 rendered rows.


## Expected Result

- Row N's "Order Number" matches `items[N].orderNumber`.
- Row N's "Customer" matches `customerName` (fallback to `email`).
- Row N's "Story" matches `storyTitle` (or `—`).
- Row N's "Transaction" matches `£(price/100).toFixed(2)`.
- Row N's "Transaction Date" matches `createdAt` formatted as `DD Mon YYYY`.
- Row N's "Order Status" matches the human-readable label for `status`.
- The row count matches `items.length`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/data-consistency.spec.js` for implementation details.
