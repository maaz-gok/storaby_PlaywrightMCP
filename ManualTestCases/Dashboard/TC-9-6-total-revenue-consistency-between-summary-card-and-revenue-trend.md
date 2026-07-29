# Total Revenue consistency between summary card and revenue trend

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The total revenue summary card value equals the sum of weekly revenue trend values (both in pence, divided by 100).


## Notes

Refer to the automated test in `tests/admin/Dashboard/data-consistency.spec.js` for implementation details.
