# Unauthenticated user is redirected to login

## Summary

**Priority:** P0
**Type:** @critical @regression
**Automated Spec:** `tests/admin/Dashboard/dashboard-load.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)


## Expected Result

- Final URL is `/admin/admin/login`.
- Dashboard content is not rendered.
- Final URL is /admin/login

## Notes

Refer to the automated test in `tests/admin/Dashboard/dashboard-load.spec.js` for implementation details.
