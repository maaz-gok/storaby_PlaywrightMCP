# Browser back navigates to dashboard

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard, then click "Monitor Orders" in the sidebar.
3. Click the browser back button.


## Expected Result

- URL becomes `/admin/dashboard`.
- The dashboard welcome heading is visible.
- The "Dashboard" nav link has `aria-current="page"`.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/browser-behaviour.spec.js` for implementation details.
