# Duplicate template names render as separate cards

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/card-grid.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Find a template name shared by multiple API items (differing by age version).


## Expected Result

- Each API item renders its own card even when names collide.
- Duplicate-name cards are distinguishable by their age tag.
- Action buttons are scoped to the individual card (name + age tag).

## Notes

Refer to the automated test in `tests/admin/Templates/card-grid.spec.js` for implementation details.
