# Navigate to Templates and back to Dashboard

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Dashboard/sidebar-navigation.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- URL is `/admin/templates`.
- Page heading is "Template Management".
- Templates nav item is highlighted as active.
- Template cards/grid is rendered with filters (Age Group, Storefront section, Visibility), search, "New template" button, and pagination.
- Returns to dashboard correctly.


## Notes

Refer to the automated test in `tests/admin/Dashboard/sidebar-navigation.spec.js` for implementation details.
