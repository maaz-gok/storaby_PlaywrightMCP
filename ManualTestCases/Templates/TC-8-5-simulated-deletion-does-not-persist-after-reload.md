# Simulated deletion does not persist after reload

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Delete a template (confirm in the dialog).
4. Reload the page.


## Expected Result

- **Simulated test flow:** the automated test intercepts the DELETE and returns success, so the template temporarily disappears.
- After reload, the template is still present — proving the deletion was not persisted (data was not actually removed).
- Manual run: if deleting real data, the template should stay deleted; use disposable data only.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
