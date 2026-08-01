# Browser forward returns to orders page

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders, then go back to the dashboard.
3. Click the browser forward button.


## Expected Result

- URL becomes `/admin/orders`.
- The "Order Management" heading is visible.
- The "Monitor Orders" nav link has `aria-current="page"`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/browser-behaviour.spec.js` for implementation details.
