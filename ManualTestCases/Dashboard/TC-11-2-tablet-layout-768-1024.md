# Tablet layout (768×1024)

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/responsive.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Summary cards wrap to 2 columns.
- Revenue Trend and Orders This Week stack vertically.
- AI Generation Status and Recent Orders stack vertically.
- Sidebar may be collapsed by default or still visible.


## Notes

Refer to the automated test in `tests/admin/Dashboard/responsive.spec.js` for implementation details.
