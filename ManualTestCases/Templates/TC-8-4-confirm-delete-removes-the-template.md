# Confirm delete removes the template

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Open the delete dialog for a template.
4. Click "Yes, delete".
5. Wait for the delete to complete.


## Expected Result

- A DELETE request fires for the template's endpoint.
- On success, the card disappears from the grid and a success toast appears.
- **Simulated test flow:** the automated test intercepts the DELETE request, so no real template is removed. Manual run should use disposable data only.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
