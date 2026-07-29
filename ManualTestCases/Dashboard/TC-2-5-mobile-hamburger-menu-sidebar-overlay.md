# Mobile hamburger menu (sidebar overlay)

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/sidebar-navigation.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Sidebar appears as an overlay (or slides in from left) with a dark backdrop overlay.
- Navigation links are visible and clickable.
- Clicking a navigation link or the overlay closes the menu.


## Notes

Refer to the automated test in `tests/admin/Dashboard/sidebar-navigation.spec.js` for implementation details.
