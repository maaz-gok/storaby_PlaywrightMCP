# Revenue chart tooltip on hover (if available)

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- A tooltip appears showing the period label and the revenue value.
- Tooltip content matches the corresponding API data point.
- Tooltip values are formatted in the same currency format.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
