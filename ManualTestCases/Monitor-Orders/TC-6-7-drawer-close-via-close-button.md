# Drawer close via close button

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order.
4. Click the close button (`aria-label="Close"`).


## Expected Result

- The drawer closes and is no longer visible.
- The URL remains `/admin/orders`.
- The table is interactive again.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
