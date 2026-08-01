# Deleting the last template on a filtered view shows the empty state

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a filter whose result set contains exactly one template.
4. Delete that template and confirm.


## Expected Result

- After deletion the grid shows the "No templates found." empty state.
- No pagination controls are shown for an empty result set.
- The page does not crash.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
