# Total Revenue displays correct formatted value

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Dashboard/summary-cards.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- UI displays `totalRevenue / 100` formatted as British pounds with `£` prefix and comma separators.
- Example: `totalRevenue: 172442` → UI shows `£1,724`.
- The formatted value matches: `£` + (totalRevenue / 100).toLocaleString(`en-GB`, {minimumFractionDigits: 0, maximumFractionDigits: 0}).


## Notes

Refer to the automated test in `tests/admin/Dashboard/summary-cards.spec.js` for implementation details.
