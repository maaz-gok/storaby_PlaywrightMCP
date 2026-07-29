# Dashboard page structure renders correctly

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/dashboard-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Left sidebar contains the app logo/brand, navigation links (Dashboard, Monitor Orders, Templates), and a collapse button.
- Main content area contains: welcome heading, summary cards grid (4 cards), revenue trend chart section, orders-this-week chart section, AI generation status section, recent orders table.
- Header contains: profile avatar, admin name, admin email, and a dropdown/menu indicator.


## Notes

Refer to the automated test in `tests/admin/Dashboard/dashboard-load.spec.js` for implementation details.
