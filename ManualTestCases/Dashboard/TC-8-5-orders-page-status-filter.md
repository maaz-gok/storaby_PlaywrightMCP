# Orders page status filter

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/recent-orders.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- A dropdown opens with all order status options: Pending, Paid, Generating Final, Submitted To Print, Printing, Shipped, Delivered, Cancelled, Generation Failed, Refunded.
- Selecting a status filters the table and triggers a new API request (`GET /admin/orders?page=1&limit=10&status=<STATUS>`).
- The table updates to show only matching orders.


## Notes

Refer to the automated test in `tests/admin/Dashboard/recent-orders.spec.js` for implementation details.
