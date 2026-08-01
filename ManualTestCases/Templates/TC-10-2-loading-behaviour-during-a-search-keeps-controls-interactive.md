# Loading behaviour during a search keeps controls interactive

## Summary

**Priority:** P2
**Type:** @regression
**Automated Spec:** `tests/admin/Templates/loading-empty-error.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Type a search query while a filter request is pending.
4. Verify controls remain usable during loading.


## Expected Result

- The search input and filter buttons remain enabled while a request is in flight.
- A stale in-flight response does not override the newest request (no out-of-order flicker).

## Notes

Refer to the automated test in `tests/admin/Templates/loading-empty-error.spec.js` for implementation details.
