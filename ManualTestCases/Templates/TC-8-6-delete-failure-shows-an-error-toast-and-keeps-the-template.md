# Delete failure shows an error toast and keeps the template

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. (Automated test) intercept the DELETE request and return an error / disconnect.
4. Confirm deletion in the dialog.


## Expected Result

- An error toast appears (e.g. "Failed to delete template").
- The card remains on the grid.
- The page does not crash.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
