# Combined Hidden + Age Group produces an empty state

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/visibility-filter.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply "Visibility: Hidden" plus "Age Group: Age 2-4" — a combination expected to return zero items.
4. Wait for the list to reload.


## Expected Result

- The request includes both `visibility=hidden` and `ageGroup=2-4`.
- The "No templates found." empty state is displayed (zero cards).

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-filter.spec.js` for implementation details.
