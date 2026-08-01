# Templates page structure renders correctly

## Summary

**Priority:** P1
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/page-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates


## Expected Result

- Sidebar is visible with the app logo, navigation links (Dashboard, Monitor Orders, Templates), and a collapse button.
- The three filter buttons expose `aria-haspopup="listbox"`: Age Group, Storefront section, Visibility.
- Clicking "New template" opens the "Create template" drawer; pressing Escape closes it.
- Pagination controls are visible: pagination text plus First/Previous/Next/Last page buttons.

## Notes

Refer to the automated test in `tests/admin/Templates/page-load.spec.js` for implementation details.
