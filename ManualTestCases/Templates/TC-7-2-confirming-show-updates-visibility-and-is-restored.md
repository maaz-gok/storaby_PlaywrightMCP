# Confirming "Show" updates visibility and is restored

## Summary

**Priority:** P0
**Type:** @smoke @critical
**Automated Spec:** `tests/admin/Templates/visibility-toggle.spec.js`

## Steps to Reproduce

1. Login as admin (usman+admin@geeksofkolachi.com / Admin@123)
2. Navigate to /admin/templates
3. Apply the "Hidden" filter and locate a hidden template.
4. Click "Show", then confirm with "Yes, show".
5. Wait for the update to complete, then reload the page and re-apply the "Hidden" filter.


## Expected Result

- A PATCH request is fired for the template's visibility endpoint.
- The card's badge flips to "Visible" (green).
- **Simulated test flow:** the automated test intercepts the PATCH and fakes a success response — the change must NOT persist after reload, so the template is still present and hidden afterwards. Manual run should use disposable data only.

## Notes

Refer to the automated test in `tests/admin/Templates/visibility-toggle.spec.js` for implementation details.
