# Responsive grid layout

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Check the grid at 1440×900, 768px, and 375px viewports.


## Expected Result

- Desktop (1440×900): 3 columns, 9 cards visible.
- Tablet (768px): 2 columns.
- Mobile (375px): 1 column, heading still visible.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
