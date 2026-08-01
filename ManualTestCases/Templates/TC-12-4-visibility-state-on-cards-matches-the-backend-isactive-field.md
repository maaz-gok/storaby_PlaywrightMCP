# Visibility state on cards matches the backend isActive field

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/data-consistency.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Capture the response and compare each card's badge against `isActive`.


## Expected Result

- `isActive: true` → badge reads "Visible" (green).
- `isActive: false` → badge reads "Hidden" (amber).
- The action button matches the state: `Hide` for visible, `Show` for hidden.

## Notes

Refer to the automated test in `tests/admin/Templates/data-consistency.spec.js` for implementation details.
