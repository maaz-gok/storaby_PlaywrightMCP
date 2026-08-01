# Page refresh restores default state

## Summary

**Priority:** P0
**Type:** @smoke @regression
**Automated Spec:** `tests/admin/Templates/browser-behaviour.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply a search query, an age-group filter, and navigate to page 2.
4. Reload the page.


## Expected Result

- After reload, all search/filter values reset to defaults and pagination returns to page 1.
- The full template list renders correctly.

## Notes

Refer to the automated test in `tests/admin/Templates/browser-behaviour.spec.js` for implementation details.
