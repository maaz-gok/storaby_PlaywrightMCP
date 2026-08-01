# Order detail drawer fields match API

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Open the drawer for the first order and capture the `GET /admin/orders/:id` response.


## Expected Result

- Drawer order number matches `orderNumber`.
- Drawer status badge matches the human-readable `status`.
- Customer name matches `customerName`.
- Story title matches `storyTitle`.
- Amount matches `£(price/100).toFixed(2)`.
- Payment status matches the human-readable `paymentStatus`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/data-consistency.spec.js` for implementation details.
