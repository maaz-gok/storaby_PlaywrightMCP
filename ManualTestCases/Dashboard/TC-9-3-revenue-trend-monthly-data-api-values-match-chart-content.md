# Revenue Trend monthly data: API values match chart content

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Chart shows 12 data points (one per month).
- Revenue values match `data[i].revenue / 100`.
- Period labels are month names derived from `YYYY-MM` format.


## Notes

Refer to the automated test in `tests/admin/Dashboard/data-consistency.spec.js` for implementation details.
