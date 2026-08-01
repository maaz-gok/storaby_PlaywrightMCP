# Logical tab order through the main content

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/accessibility.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Press Tab repeatedly and record the focus order.

## Expected Result

- Focus moves logically: sidebar → search → filter buttons → New template → first template card (title link, action buttons) → pagination.
- Every focused element shows a visible focus indicator.
- No focus is trapped or skipped.

## Notes

Refer to the automated test in `tests/admin/Templates/accessibility.spec.js` for implementation details.
