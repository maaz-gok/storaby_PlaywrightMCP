# Dialog keyboard behaviour: focus trap and Escape

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/accessibility.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Open the delete (or show/hide) dialog.
4. Tab through the dialog repeatedly, then press Escape.

## Expected Result

- Focus moves into the dialog on open and is trapped inside it (Tab cycles between its buttons).
- Escape closes the dialog and returns focus to the triggering card button.
- The dialog has an accessible name and `role="dialog"`/`aria-modal`.

## Notes

Refer to the automated test in `tests/admin/Templates/accessibility.spec.js` for implementation details.
