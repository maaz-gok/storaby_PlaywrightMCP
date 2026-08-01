# Templates page loads with authenticated session

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/page-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates


## Expected Result

- Final URL is `/admin/templates`.
- Page title contains "Storaby".
- Heading "Template Management" is visible.
- Sidebar is visible with links: Dashboard, Monitor Orders, Templates.
- "Templates" nav link has `aria-current="page"`.
- Header/profile section is visible in the top-right corner.
- Search input, Age Group / Storefront section / Visibility filter buttons, "New template" button, template cards, and pagination text are present.
- Pagination text matches the format `N-N of N`.
- No console errors.

## Notes

Refer to the automated test in `tests/admin/Templates/page-load.spec.js` for implementation details.
