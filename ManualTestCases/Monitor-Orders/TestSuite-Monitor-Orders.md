# Manual Test Cases — Storaby Monitor Orders

Manual QA test cases for the scenarios covered by the automated Playwright suite in `tests/admin/Monitor-Orders/`. Each file below corresponds 1:1 to an automated test that is currently passing against `https://staging.storaby.com/admin/orders`.

Source plan: [specs/order-management.md](../../specs/order-management.md)

## Index

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-1.1](TC-1-1-orders-page-loads-with-authenticated-session.md) | Orders page loads with authenticated session | P0 | Smoke, Critical | `page-load.spec.js` |
| [TC-1.2](TC-1-2-unauthenticated-user-is-redirected-to-login.md) | Unauthenticated user is redirected to login | P0 | Critical, Regression | `page-load.spec.js` |
| [TC-1.3](TC-1-3-orders-page-structure-renders-correctly.md) | Orders page structure renders correctly | P1 | Smoke | `page-load.spec.js` |
| [TC-2.1](TC-2-1-table-headers-are-correct.md) | Table headers are correct | P0 | Smoke | `orders-table.spec.js` |
| [TC-2.2](TC-2-2-table-displays-10-rows-per-page.md) | Table displays 10 rows per page | P0 | Smoke | `orders-table.spec.js` |
| [TC-2.3](TC-2-3-table-row-status-badges-render-with-correct-styling.md) | Table row status badges render with correct styling | P1 | Smoke, Regression | `orders-table.spec.js` |
| [TC-2.4](TC-2-4-action-column-contains-eye-icon-button-for-each-row.md) | Action column contains eye-icon button for each row | P1 | Smoke | `orders-table.spec.js` |
| [TC-2.5](TC-2-5-no-sorting-available-on-table-columns.md) | No sorting available on table columns | P2 | Regression | `orders-table.spec.js` |
| [TC-2.6](TC-2-6-story-column-displays-values-in-italic.md) | Story column displays values in italic | P2 | Smoke | `orders-table.spec.js` |
| [TC-3.1](TC-3-1-search-input-renders-with-correct-placeholder.md) | Search input renders with correct placeholder | P0 | Smoke | `search.spec.js` |
| [TC-3.2](TC-3-2-search-is-debounced-and-fires-api-request-after-pause.md) | Search is debounced and fires API request after pause | P0 | Smoke, Critical | `search.spec.js` |
| [TC-3.3](TC-3-3-search-by-order-number-prefix-returns-matching-orders.md) | Search by order number prefix returns matching orders | P0 | Smoke, Critical | `search.spec.js` |
| [TC-3.4](TC-3-4-search-by-customer-name-returns-filtered-results.md) | Search by customer name returns filtered results | P0 | Smoke, Critical | `search.spec.js` |
| [TC-3.5](TC-3-5-search-with-leading-trailing-spaces.md) | Search with leading/trailing spaces | P2 | Regression | `search.spec.js` |
| [TC-3.6](TC-3-6-search-with-special-characters.md) | Search with special characters | P2 | Regression | `search.spec.js` |
| [TC-3.7](TC-3-7-search-with-numeric-values.md) | Search with numeric values | P2 | Regression | `search.spec.js` |
| [TC-3.8](TC-3-8-clear-search-restores-full-list.md) | Clear search restores full list | P0 | Smoke | `search.spec.js` |
| [TC-3.9](TC-3-9-search-and-status-filter-combination.md) | Search and status filter combination | P1 | Regression | `search.spec.js` |
| [TC-3.10](TC-3-10-search-persistence-after-pagination.md) | Search persistence after pagination | P1 | Regression | `search.spec.js` |
| [TC-3.11](TC-3-11-search-does-not-persist-after-page-refresh.md) | Search does not persist after page refresh | P2 | Regression | `search.spec.js` |
| [TC-3.12](TC-3-12-no-results-state-displays-no-orders-found.md) | No results state displays "No orders found." | P0 | Smoke, Regression | `search.spec.js` |
| [TC-4.1](TC-4-1-status-filter-button-renders-correctly.md) | Status filter button renders correctly | P0 | Smoke | `status-filter.spec.js` |
| [TC-4.2](TC-4-2-status-filter-dropdown-opens-with-all-11-options.md) | Status filter dropdown opens with all 11 options | P0 | Smoke, Critical | `status-filter.spec.js` |
| [TC-4.3](TC-4-3-selecting-a-status-filters-the-table.md) | Selecting a status filters the table | P0 | Smoke, Critical | `status-filter.spec.js` |
| [TC-4.4](TC-4-4-selecting-all-resets-the-filter.md) | Selecting "All" resets the filter | P0 | Smoke | `status-filter.spec.js` |
| [TC-4.5](TC-4-5-each-status-option-is-selectable.md) | Each status option is selectable | P1 | Regression | `status-filter.spec.js` |
| [TC-4.6](TC-4-6-filter-persists-after-pagination.md) | Filter persists after pagination | P1 | Regression | `status-filter.spec.js` |
| [TC-4.7](TC-4-7-filter-does-not-persist-after-page-refresh.md) | Filter does not persist after page refresh | P2 | Regression | `status-filter.spec.js` |
| [TC-5.1](TC-5-1-pagination-controls-rendered-with-correct-disabled-states-on-page-1.md) | Pagination controls rendered with correct disabled states on page 1 | P0 | Smoke | `pagination.spec.js` |
| [TC-5.2](TC-5-2-page-indicator-shows-correct-ranges.md) | Page indicator shows correct ranges | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-5.3](TC-5-3-next-page-loads-new-data.md) | Next page loads new data | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-5.4](TC-5-4-previous-page-returns-to-page-1-data.md) | Previous page returns to page 1 data | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-5.5](TC-5-5-first-page-button-navigates-to-page-1.md) | First page button navigates to page 1 | P1 | Regression | `pagination.spec.js` |
| [TC-5.6](TC-5-6-last-page-button-navigates-to-the-final-page.md) | Last page button navigates to the final page | P1 | Regression | `pagination.spec.js` |
| [TC-5.7](TC-5-7-pagination-button-disabled-states-are-correct.md) | Pagination button disabled states are correct | P1 | Regression | `pagination.spec.js` |
| [TC-5.8](TC-5-8-pagination-with-search-active.md) | Pagination with search active | P1 | Regression | `pagination.spec.js` |
| [TC-5.9](TC-5-9-pagination-with-status-filter-active.md) | Pagination with status filter active | P1 | Regression | `pagination.spec.js` |
| [TC-5.10](TC-5-10-pagination-boundaries-when-total-is-less-than-or-equal-to-limit.md) | Pagination boundaries when total <= limit | P2 | Regression | `pagination.spec.js` |
| [TC-6.1](TC-6-1-clicking-view-order-opens-a-slide-over-drawer.md) | Clicking View Order opens a slide-over drawer | P0 | Smoke, Critical | `order-detail.spec.js` |
| [TC-6.2](TC-6-2-drawer-header-displays-order-number-and-status.md) | Drawer header displays order number and status | P0 | Smoke | `order-detail.spec.js` |
| [TC-6.3](TC-6-3-drawer-sections-are-rendered-correctly.md) | Drawer sections are rendered correctly | P0 | Smoke | `order-detail.spec.js` |
| [TC-6.4](TC-6-4-customer-and-shipping-details-section.md) | Customer & Shipping Details section | P1 | Smoke, Critical | `order-detail.spec.js` |
| [TC-6.5](TC-6-5-book-details-section.md) | Book Details section | P1 | Smoke, Critical | `order-detail.spec.js` |
| [TC-6.6](TC-6-6-timeline-section-is-rendered.md) | Timeline section is rendered | P1 | Smoke | `order-detail.spec.js` |
| [TC-6.7](TC-6-7-drawer-close-via-close-button.md) | Drawer close via close button | P1 | Smoke | `order-detail.spec.js` |
| [TC-6.8](TC-6-8-drawer-close-via-backdrop-click.md) | Drawer close via backdrop click | P1 | Regression | `order-detail.spec.js` |
| [TC-6.9](TC-6-9-drawer-close-via-escape-key.md) | Drawer close via Escape key | P1 | Regression | `order-detail.spec.js` |
| [TC-6.10](TC-6-10-opening-different-orders-shows-different-data.md) | Opening different orders shows different data | P1 | Smoke | `order-detail.spec.js` |
| [TC-7.1](TC-7-1-browser-back-navigates-to-dashboard.md) | Browser back navigates to dashboard | P0 | Smoke, Critical | `browser-behaviour.spec.js` |
| [TC-7.2](TC-7-2-browser-forward-returns-to-orders-page.md) | Browser forward returns to orders page | P1 | Regression | `browser-behaviour.spec.js` |
| [TC-7.3](TC-7-3-page-refresh-restores-default-state.md) | Page refresh restores default state | P0 | Smoke, Regression | `browser-behaviour.spec.js` |
| [TC-7.4](TC-7-4-direct-url-access-loads-orders-page.md) | Direct URL access loads orders page | P1 | Regression | `browser-behaviour.spec.js` |
| [TC-8.1](TC-8-1-skeleton-loaders-appear-while-table-data-is-loading.md) | Skeleton loaders appear while table data is loading | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-9.1](TC-9-1-no-search-results-displays-empty-state.md) | No search results displays empty state | P0 | Smoke, Regression | `loading-empty-error.spec.js` |
| [TC-9.2](TC-9-2-filter-returns-no-results.md) | Filter returns no results | P1 | Regression | `loading-empty-error.spec.js` |
| [TC-9.3](TC-9-3-no-orders-in-database-via-api-mock.md) | No orders in database via API mock | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-10.1](TC-10-1-api-failure-shows-graceful-error-state.md) | API failure shows graceful error state | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-10.2](TC-10-2-order-detail-api-failure-shows-error-in-drawer.md) | Order detail API failure shows error in drawer | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-12.1](TC-12-1-orders-list-api-returns-200.md) | Orders list API returns 200 | P1 | Regression | `data-consistency.spec.js` |
| [TC-12.2](TC-12-2-orders-list-data-matches-api.md) | Orders list data matches API | P0 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-12.3](TC-12-3-status-filtered-list-all-rows-belong-to-selected-status.md) | Status filtered list: all rows belong to selected status | P0 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-12.4](TC-12-4-order-detail-drawer-fields-match-api.md) | Order detail drawer fields match API | P0 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-12.5](TC-12-5-no-console-errors-during-all-interactions.md) | No console errors during all interactions | P1 | Smoke | `data-consistency.spec.js` |

**Total: 63 test cases** (matching all scenarios in `specs/order-management.md`).

## Shared Preconditions

- Environment: `https://staging.storaby.com`
- API Base: `https://api.staging.storaby.com`
- Test account: `usman+admin@geeksofkolachi.com` / `Admin@123`
- Start from a logged-in state on `/admin/orders` unless noted otherwise (clear browser storage first, authenticate via the login form).
- Viewport: 1440×900 (desktop) unless the test specifies a different viewport.
- Currency: GBP (£) — values stored as pence in API, divided by 100 for display.
- Orders list API: `GET /admin/orders?page=1&limit=10`; totals on staging (e.g. 85 orders across 9 pages) may drift — never hardcode counts.
