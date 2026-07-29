# Books Generated displays correct value

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/summary-cards.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- UI value matches `String(booksGenerated)`.


## Notes

Refer to the automated test in `tests/admin/Dashboard/summary-cards.spec.js` for implementation details.
