# Mobile layout (375×812)

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/responsive.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Sidebar is hidden by default (accessible via hamburger "Open menu" button).
- Summary cards are in a single column.
- All sections stack vertically.
- Revenue chart and orders chart are full width.
- Recent Orders table may have horizontal scroll or truncated columns.
- Profile button in header may be simplified (avatar only or icon).
- "Open menu" hamburger button is visible in the header.
- Tapping "Open menu" shows the sidebar as an overlay with a backdrop.


## Notes

Refer to the automated test in `tests/admin/Dashboard/responsive.spec.js` for implementation details.
