# Each status option is selectable

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/status-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders
3. Select each status in turn: Pending, Paid, Generating Final, Submitted To Print, Printing, Shipped, Delivered, Cancelled, Generation Failed, Refunded.


## Expected Result

- Each status option is selectable from the dropdown.
- Where rows are returned, every displayed row's status matches the selected status.
- No console errors or page breaks for any status.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/status-filter.spec.js` for implementation details.
