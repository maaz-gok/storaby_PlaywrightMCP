# Revenue chart displays correct y-axis values

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Y-axis shows formatted revenue values using abbreviated notation: `£0`, `£400`, `£800`, `£1.2k`, `£1.6k`.
- Tick interval is appropriate for the data range.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
