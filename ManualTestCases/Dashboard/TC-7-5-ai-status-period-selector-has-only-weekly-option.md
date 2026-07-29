# AI Status period selector has only Weekly option

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/ai-status.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The dropdown contains only one option: "Weekly".
- Selecting "Weekly" does not trigger a new API request (data is already loaded).


## Notes

Refer to the automated test in `tests/admin/Dashboard/ai-status.spec.js` for implementation details.
