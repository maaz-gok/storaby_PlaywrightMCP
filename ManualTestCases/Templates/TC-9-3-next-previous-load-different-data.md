# Next/Previous load different data

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/pagination.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Record the first card title on page 1.
4. Click Next, record the first card title, then click Previous.


## Expected Result

- Clicking Next fires a request with `page=2` and renders different template cards.
- Clicking Previous returns to `page=1` and the original first card.

## Notes

Refer to the automated test in `tests/admin/Templates/pagination.spec.js` for implementation details.
