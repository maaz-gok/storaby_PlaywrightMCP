# Orders This Week bar heights reflect API data

## Summary

**Priority:** P1
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/orders-this-week.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Each bar's height (percentage) matches the client-side computed percentage from the API data.
- Days with zero orders show a flat/minimal bar (0%).
- The sum of all percentages should be `~100%` (rounded).


## Notes

Refer to the automated test in `tests/admin/Dashboard/orders-this-week.spec.js` for implementation details.
