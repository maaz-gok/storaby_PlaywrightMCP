# AI Generation Status section renders with correct elements

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/ai-status.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Section title is "AI Generation Status".
- A period selector showing "Weekly" is present (no other options available).
- Four status items are displayed: "Queue", "Processing", "Completed today", "Failed".
- Each status item shows a numeric count (e.g. "2 stories", "0 stories", "32 stories", "37 stories").
- Each status item shows a percentage (e.g. "2.8%", "0%", "45.1%", "52.1%").
- A donut (pie) chart visualizes the four values with matching colors.
- A legend with color indicators is visible.


## Notes

Refer to the automated test in `tests/admin/Dashboard/ai-status.spec.js` for implementation details.
