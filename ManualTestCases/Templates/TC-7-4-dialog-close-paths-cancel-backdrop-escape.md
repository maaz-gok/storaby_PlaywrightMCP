# Dialog close paths: cancel, backdrop, Escape

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/visibility-toggle.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Open the "Show"/"Hide" dialog for a template.
4. Close it once via each path: click "Cancel", click the backdrop, press Escape.


## Expected Result

- The dialog closes on every path without firing a PATCH request.
- The card's visibility badge is unchanged after each close.
- Focus returns to the triggering card's action button.

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-toggle.spec.js` for implementation details.
