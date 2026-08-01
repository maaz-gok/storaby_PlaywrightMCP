# Book Details section

## Summary

**Priority:** P1
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order.


## Expected Result

- The "Book Details" section shows the story title (matches the Story column value).
- The Amount is shown formatted as `£N.NN` (e.g. `£29.99`).
- The Payment status is displayed as a badge.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
