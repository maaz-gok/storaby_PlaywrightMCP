# Switch period from Weekly to Monthly

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- A new API request fires: `GET /admin/dashboard/revenue-trend?period=monthly`.
- Section title updates to "Monthly Revenue Trend".
- Period selector button now shows "Monthly".
- Chart re-renders with monthly data (12 data points for 12 months).
- X-axis labels show month names (e.g. "January", "February") derived from `YYYY-MM` periods.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
