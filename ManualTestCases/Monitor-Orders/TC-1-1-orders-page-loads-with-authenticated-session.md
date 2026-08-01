# Orders page loads with authenticated session

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Monitor-Orders/page-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/orders


## Expected Result

- Final URL is `/admin/orders`.
- Page title contains "Storaby".
- Heading "Order Management" is visible.
- Sidebar is visible with links: Dashboard, Monitor Orders, Templates.
- "Monitor Orders" nav link has `aria-current="page"`.
- Header/profile section is visible in the top-right corner.
- No console errors.

## Notes

Refer to the automated test in `tests/admin/Monitor-Orders/page-load.spec.js` for implementation details.
