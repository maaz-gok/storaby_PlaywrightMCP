# Skeleton cards render while the grid loads

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Delay the list API response (e.g. via throttling) and observe the initial load.


## Expected Result

- While the request is pending, skeleton cards are visible.
- When the response resolves, real template cards replace the skeletons.
- No layout jump breaks the grid structure.

## Notes

Refer to the automated test in `tests/admin/Templates/loading-empty-error.spec.js` for implementation details.
