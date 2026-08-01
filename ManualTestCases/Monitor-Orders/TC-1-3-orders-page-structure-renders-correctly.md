# Orders page structure renders correctly

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Monitor-Orders/page-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Sidebar is visible with links: Dashboard, Monitor Orders, Templates, plus a sidebar collapse button.
- "Monitor Orders" nav link has `aria-current="page"`.
- Search input is visible with placeholder "Search anything...".
- Status filter button is visible with `aria-label="Statuses"`.
- Orders table is visible.
- Pagination controls are visible: pagination text, First/Previous/Next/Last page buttons.
- Header/profile area shows the profile avatar and profile menu button.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/page-load.spec.js` for implementation details.
