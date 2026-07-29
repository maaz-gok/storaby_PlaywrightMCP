# Revenue chart data points reflect API response values

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Each data point's visual height/position corresponds to `data[i].revenue / 100` in pounds.
- Zero-revenue periods display a flat line / zero-height bar.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
