# Empty state: No AI generation records

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/loading-states.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- AI status shows all counts as 0.
- All percentages show 0%.
- Donut chart may show an empty circle or equal segments.


## Notes

Refer to the automated test in `tests/admin/Dashboard/loading-states.spec.js` for implementation details.
