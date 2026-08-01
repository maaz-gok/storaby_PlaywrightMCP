# Clicking View Order opens a slide-over drawer

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/order-detail.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Click the eye-icon "View order" button for the first row.


## Expected Result

- A slide-over drawer opens with a backdrop overlay.
- The URL does not change (remains `/admin/orders`).
- A `GET /admin/orders/:id` request fires.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/order-detail.spec.js` for implementation details.
