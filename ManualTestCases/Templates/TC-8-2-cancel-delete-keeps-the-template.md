# Cancel delete keeps the template

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Open the delete dialog for a template.
4. Click "Cancel".
5. Reload the page.


## Expected Result

- The dialog closes without firing a DELETE request.
- The template is still present on the grid after reload.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
