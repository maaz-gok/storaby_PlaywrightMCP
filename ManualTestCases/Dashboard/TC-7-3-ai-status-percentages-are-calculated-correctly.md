# AI Status percentages are calculated correctly

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/ai-status.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Each displayed percentage matches the expected value (within rounding tolerance, e.g. ±0.1%).
- The sum of all displayed percentages equals 100% (within rounding tolerance).


## Notes

Refer to the automated test in `tests/admin/Dashboard/ai-status.spec.js` for implementation details.
