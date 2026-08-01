# Drawer header displays order number and status

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order.


## Expected Result

- The drawer shows the order number as a heading.
- The current status is displayed as a badge.
- A close button (`aria-label="Close"`) is present.
- The drawer order number matches the order number in the first table row.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
