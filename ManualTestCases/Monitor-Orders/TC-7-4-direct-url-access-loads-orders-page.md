# Direct URL access loads orders page

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Open a new tab and navigate directly to `/admin/orders`.


## Expected Result

- The orders page loads correctly with an existing session.
- The "Order Management" heading is visible.
- The table is populated (10 rows on page 1).

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/browser-behaviour.spec.js` for implementation details.
