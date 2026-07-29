# All four summary cards are displayed

## Summary

**Priority:** P0
**Type:** @smoke
**Automated Spec:** `tests/admin/Dashboard/summary-cards.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/dashboard


## Expected Result

- Four cards are displayed in a grid layout.
- Card titles (as `<label>` elements) are: "Total Revenue", "Orders Today", "Active Customers", "Books Generated".
- Each card displays a formatted value.
- Each card displays an icon (TrendingUp, ShoppingCart, Users, BookOpen).
- Cards do not overlap and are properly spaced.


## Notes

Refer to the automated test in `tests/admin/Dashboard/summary-cards.spec.js` for implementation details.
