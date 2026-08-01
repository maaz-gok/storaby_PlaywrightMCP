# "Show" flow opens a dialog and cancel does not change visibility

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/visibility-toggle.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply the "Hidden" filter and locate a hidden template.
4. Click the card's "Show" button.
5. Read the dialog, then click "Cancel".


## Expected Result

- A dialog opens titled "Show template" stating the template name and "You are about to show this template."
- The dialog has Cancel and "Yes, show" buttons.
- After Cancel: the dialog closes, no PATCH request fires, and the card still shows the "Hidden" badge.

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-toggle.spec.js` for implementation details.
