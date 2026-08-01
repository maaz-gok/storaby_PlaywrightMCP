# Browser back navigates to dashboard

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate from the Dashboard to /admin/templates.
3. Click the browser Back button.


## Expected Result

- The app navigates back to the Dashboard (/admin/dashboard or equivalent).
- No dead-end or stuck state occurs.

## Notes

Refer to the automated test in `tests/admin/Templates/browser-behaviour.spec.js` for implementation details.
