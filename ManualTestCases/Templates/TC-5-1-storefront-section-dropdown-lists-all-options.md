# Storefront section dropdown lists all options

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/storefront-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click the "Storefront section" filter button.
4. Read the listbox options.


## Expected Result

- The dropdown opens with `role="listbox"`.
- Options are: All, Home Screen, Book Details, Kids Corner.

## Notes

Refer to the automated test in `tests/admin/Templates/storefront-filter.spec.js` for implementation details.
