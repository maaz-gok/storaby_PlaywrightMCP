# Age Group dropdown lists all options

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Templates/age-group-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click the "Age Group" filter button.
4. Read the listbox options.


## Expected Result

- The dropdown opens with `role="listbox"`.
- Options are: All, Age 2-4, Age 4-8.

## Notes

Refer to the automated test in `tests/admin/Templates/age-group-filter.spec.js` for implementation details.
