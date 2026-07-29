# Revenue Trend weekly data: API values match chart content

## Summary

**Priority:** P1
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- The number of chart data points equals `data.length`.
- Each data point's revenue value matches `data[i].revenue / 100`.
- Each data point's period label matches the formatted `data[i].period`.


## Notes

Refer to the automated test in `tests/admin/Dashboard/data-consistency.spec.js` for implementation details.
