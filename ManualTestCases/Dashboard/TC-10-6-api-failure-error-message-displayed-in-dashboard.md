# API failure: Error message displayed in dashboard

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Dashboard/loading-states.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- An inline error message is displayed in the dashboard content area: "Some dashboard data failed to load. Check that the API is running and you are signed in as an admin."
- The rest of the page (other sections) still renders.
- The specific section whose API failed may show a broken/empty state.


## Notes

Refer to the automated test in `tests/admin/Dashboard/loading-states.spec.js` for implementation details.
