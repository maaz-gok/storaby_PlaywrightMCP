# Unauthenticated user is redirected to login

## Summary

**Priority:** P0
**Type:** @critical @regression
**Automated Spec:** `tests/admin/Templates/page-load.spec.js`

## Steps to Reproduce

1. Open a clean browser context with no saved session.
2. Navigate directly to `/admin/templates`.


## Expected Result

- Final URL is `/admin/login`.
- Templates page content is not rendered.
- The "Admin Login" heading is visible.

## Notes

Refer to the automated test in `tests/admin/Templates/page-load.spec.js` for implementation details.
