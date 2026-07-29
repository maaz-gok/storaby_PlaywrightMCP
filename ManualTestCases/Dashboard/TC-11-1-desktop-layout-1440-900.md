# Desktop layout (1440×900)

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/responsive.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Sidebar is visible and expanded.
- Summary cards are in a 4-column grid.
- Revenue Trend and Orders This Week are side-by-side in a 2-column grid.
- AI Generation Status and Recent Orders are side-by-side.
- All content fits without horizontal scrolling.
- Each section is within its designated column.


## Notes

Refer to the automated test in `tests/admin/Dashboard/responsive.spec.js` for implementation details.
