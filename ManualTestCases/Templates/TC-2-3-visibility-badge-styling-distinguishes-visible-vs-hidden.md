# Visibility badge styling distinguishes Visible vs Hidden

## Summary

**Priority:** P1
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Inspect a Visible card badge, then apply the "Hidden" filter and inspect a Hidden card badge.


## Expected Result

- Visible badge: white background, green text, small green dot.
- Hidden badge: dark (`bg-storaby-secondary`) background, white text, amber dot.
- Both badges contain a dot indicator with `aria-hidden="true"`.

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
