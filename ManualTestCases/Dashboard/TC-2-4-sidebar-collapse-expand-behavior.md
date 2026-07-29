# Sidebar collapse/expand behavior

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/sidebar-navigation.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Sidebar width reduces (observed: 88px collapsed).
- Navigation text labels may become hidden (icons remain).
- A corresponding expand/hamburger button becomes available.
- Clicking the expand button restores the sidebar to full width.


## Notes

Refer to the automated test in `tests/admin/Dashboard/sidebar-navigation.spec.js` for implementation details.
