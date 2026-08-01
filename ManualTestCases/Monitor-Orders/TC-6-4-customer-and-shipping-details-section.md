# Customer & Shipping Details section

## Summary

**Priority:** P1
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order.


## Expected Result

- The "Customer & Shipping Details" section shows the customer name.
- The customer email is displayed below the name.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
