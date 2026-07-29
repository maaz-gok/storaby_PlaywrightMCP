# AI Status donut chart visualizes ratios correctly

## Summary

**Priority:** P1
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/ai-status.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Four segments are rendered.
- Segment sizes visually correspond to the displayed percentages.
- Each segment's color matches the corresponding legend item.


## Notes

Refer to the automated test in `tests/admin/Dashboard/ai-status.spec.js` for implementation details.
