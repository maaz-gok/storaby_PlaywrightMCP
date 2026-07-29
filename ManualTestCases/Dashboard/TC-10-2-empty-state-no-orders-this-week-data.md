# Empty state: No orders-this-week data

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/loading-states.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The Orders This Week chart shows empty/zeroed bars.
- No error message is displayed — the chart handles empty data gracefully.


## Notes

Refer to the automated test in `tests/admin/Dashboard/loading-states.spec.js` for implementation details.
