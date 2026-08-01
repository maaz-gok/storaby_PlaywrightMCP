# Screen-reader names on key elements

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/accessibility.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Inspect the accessible names of the search input, filter buttons, action buttons, and badge.

## Expected Result

- Search input: labeled "Search templates".
- Filter buttons: exposed as combo boxes with their current value.
- Card actions have unique accessible names (`Edit <name>`, `Show|Hide <name>`, `Delete <name>`).
- Visibility badge is decorative (`aria-hidden` dot) and does not announce "dot".

## Notes

Refer to the automated test in `tests/admin/Templates/accessibility.spec.js` for implementation details.
