# AI Status counts match API response

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/ai-status.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- "Queue" count matches `pending`.
- "Processing" count matches `processing`.
- "Completed today" count matches `completedToday`.
- "Failed" count matches `failed`.


## Notes

Refer to the automated test in `tests/admin/Dashboard/ai-status.spec.js` for implementation details.
