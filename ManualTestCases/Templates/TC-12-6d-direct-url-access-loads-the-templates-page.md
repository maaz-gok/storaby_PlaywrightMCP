# Direct URL access loads the templates page

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Open a new tab and paste `https://staging.storaby.com/admin/templates` directly into the address bar.


## Expected Result

- The templates page loads at /admin/templates with grid, filters, and pagination intact.
- No broken layout or client-side routing errors occur.

## Notes

Refer to the automated test in `tests/admin/Templates/browser-behaviour.spec.js` for implementation details.
