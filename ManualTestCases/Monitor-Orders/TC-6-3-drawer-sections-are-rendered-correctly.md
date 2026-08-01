# Drawer sections are rendered correctly

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order.


## Expected Result

- Three sections are visible: "Customer & Shipping Details", "Book Details", "Timeline".

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
