# Browser forward returns to templates page

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates, then back to Dashboard.
3. Click the browser Forward button.


## Expected Result

- The app returns to /admin/templates.
- The grid loads correctly with all controls present.

## Notes

Refer to the automated test in `tests/admin/Templates/browser-behaviour.spec.js` for implementation details.
