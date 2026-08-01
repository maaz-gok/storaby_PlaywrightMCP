# Backdrop click closes the delete dialog without deleting

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Open the delete dialog for a template.
4. Click the dialog backdrop.


## Expected Result

- The dialog closes.
- No DELETE request fires; the template remains on the grid.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
