# Delete button opens a confirmation dialog

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/delete-template.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Click a card's "Delete" button.
4. Read the dialog contents.


## Expected Result

- A dialog titled "Delete template" opens.
- It states the template name and "You are about to delete this template."
- It contains Cancel and "Yes, delete" buttons.
- No DELETE request fires yet.

## Notes

Refer to the automated test in `tests/admin/Templates/delete-template.spec.js` for implementation details.
