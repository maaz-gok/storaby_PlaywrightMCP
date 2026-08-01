# Cover images load with correct dimensions

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Wait for cover images on page 1 to load; inspect their rendered dimensions.


## Expected Result

- Every card's cover image finishes loading (`naturalWidth > 0`).
- Images render at the expected aspect ratio with no layout shift after load.
- `alt` text equals the template name.

## Notes

Refer to the automated test in `tests/admin/Templates/loading-empty-error.spec.js` for implementation details.
