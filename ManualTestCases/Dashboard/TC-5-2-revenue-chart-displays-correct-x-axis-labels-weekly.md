# Revenue chart displays correct x-axis labels (weekly)

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The number of x-axis labels matches the number of data points in the API response.
- Each label is a formatted date derived from `data[i].period` (ISO date `YYYY-MM-DD` → `Mon D` format, e.g. `2026-07-28` → `Jul 28`).
- Labels are in chronological order.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
