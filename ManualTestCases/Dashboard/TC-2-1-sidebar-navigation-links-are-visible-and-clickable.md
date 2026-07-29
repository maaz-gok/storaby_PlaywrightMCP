# Sidebar navigation links are visible and clickable

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/sidebar-navigation.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Navigation link "Dashboard" is present with `href="/admin/dashboard"`.
- Navigation link "Monitor Orders" is present with `href="/admin/orders"`.
- Navigation link "Templates" is present with `href="/admin/templates"`.
- Dashboard link is highlighted as active (`aria-current="page"` or active class).
- Each link is visible and clickable.


## Notes

Refer to the automated test in `tests/admin/Dashboard/sidebar-navigation.spec.js` for implementation details.
