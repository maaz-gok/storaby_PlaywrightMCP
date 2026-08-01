# Opening different orders shows different data

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order, note the order number, close it.
4. Open the drawer for the second order.


## Expected Result

- The second order's drawer shows a different order number from the first.
- Each drawer open triggers a new API request.
- The URL remains `/admin/orders`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
