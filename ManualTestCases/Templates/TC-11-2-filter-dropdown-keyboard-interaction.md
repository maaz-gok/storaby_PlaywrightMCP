# Filter dropdown keyboard interaction

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/accessibility.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Focus an Age Group / Storefront / Visibility filter button.
4. Open it with Enter/Space, arrow through options, select with Enter, close with Escape.

## Expected Result

- The dropdown opens and closes via keyboard.
- Arrow keys move between options; Enter/Space selects; Escape closes without changing the value.
- The selected value is announced via `aria-selected` / listbox semantics.

## Notes

Refer to the automated test in `tests/admin/Templates/accessibility.spec.js` for implementation details.
