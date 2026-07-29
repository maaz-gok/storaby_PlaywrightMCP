# Dashboard loads with authenticated session

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/dashboard-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Final URL is `/admin/dashboard`.
- Page title contains "Storaby".
- Welcome heading with text `Welcome updated!` is visible (uses admin name from auth state).
- Sidebar is visible with links: Dashboard, Monitor Orders, Templates.
- Header/profile section is visible in the top-right corner.
- Summary cards section is visible with 4 cards.
- Charts section is visible (revenue trend + orders this week).
- AI Generation Status section is visible.
- Recent Orders table is visible.
- Toast message "Signed in successfully." is displayed (role="status").
- All 5 dashboard API requests fire successfully (summary, revenue-trend, orders-this-week, ai-status, recent-orders).
- No console errors.


## Notes

Refer to the automated test in `tests/admin/Dashboard/dashboard-load.spec.js` for implementation details.
