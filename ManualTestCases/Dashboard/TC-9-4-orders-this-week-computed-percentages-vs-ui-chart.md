# Orders This Week: computed percentages vs UI chart

## Summary

**Priority:** P1
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Each bar's percentage matches the computed value (±1% rounding tolerance).
- Sunday's bar corresponds to orders with Sunday's date, etc.


## Notes

Refer to the automated test in `tests/admin/Dashboard/data-consistency.spec.js` for implementation details.
