# Revenue Trend section renders with correct title and period selector

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/revenue-trend.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Section title is "Weekly Revenue Trend" (when period is weekly).
- A period selector button with the currently selected period label ("Weekly" by default) is visible in the section header.
- Clicking the period button opens a dropdown with "Weekly" and "Monthly" options.
- A chart (Recharts SVG) is rendered in the section body.


## Notes

Refer to the automated test in `tests/admin/Dashboard/revenue-trend.spec.js` for implementation details.
