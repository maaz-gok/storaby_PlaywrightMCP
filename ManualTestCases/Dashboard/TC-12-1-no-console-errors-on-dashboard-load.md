# No console errors on dashboard load

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/console-errors.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- No console errors (`console.error`) are present.
- No uncaught exceptions or unhandled promise rejections.
- React render warnings (if any) are documented but not required to fail the test.


## Notes

Refer to the automated test in `tests/admin/Dashboard/console-errors.spec.js` for implementation details.
