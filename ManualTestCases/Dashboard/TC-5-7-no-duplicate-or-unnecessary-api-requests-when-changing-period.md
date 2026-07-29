# No duplicate or unnecessary API requests when changing period

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Exactly 2 requests fire (one for monthly, one for weekly).
- No duplicate requests for the same period.
- No stale data displayed (UI updates after each request).


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
