# Broken cover image does not break the card

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Block image requests and reload the page.


## Expected Result

- The card still renders title, age/category tags, badge, and action buttons.
- The image container keeps its placeholder instead of collapsing.
- The `img` still has the correct `alt`.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
