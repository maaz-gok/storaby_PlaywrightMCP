# API failure shows graceful error state

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Monitor-Orders/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Block/fail the orders API (connection refused or 500).
3. Navigate to /admin/orders.


## Expected Result

- The application handles the API failure without a full-page crash.
- The search and filter controls are still rendered.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/loading-empty-error.spec.js` for implementation details.
