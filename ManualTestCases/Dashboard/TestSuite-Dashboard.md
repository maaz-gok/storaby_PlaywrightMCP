# Manual Test Cases — Storaby Admin Dashboard

Manual QA test cases for the scenarios covered by the automated Playwright suite in `tests/admin/Dashboard/`. Each file below corresponds 1:1 to an automated test that is currently passing against `https://staging.storaby.com/admin/dashboard`.

Source plan: [specs/admin-dashboard.md](../../specs/admin-dashboard.md)

## Index

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-1.1](TC-1.1-dashboard-loads-authenticated.md) | Dashboard loads with authenticated session | P0 | Smoke, Critical | `dashboard-load.spec.js` |
| [TC-1.2](TC-1.2-unauthenticated-redirect.md) | Unauthenticated user is redirected to login | P0 | Critical, Regression | `dashboard-load.spec.js` |
| [TC-1.3](TC-1.3-dashboard-structure.md) | Dashboard page structure renders correctly | P1 | Smoke | `dashboard-load.spec.js` |
| [TC-2.1](TC-2.1-sidebar-links-visible.md) | Sidebar navigation links are visible and clickable | P0 | Smoke | `sidebar-navigation.spec.js` |
| [TC-2.2](TC-2.2-navigate-orders-and-back.md) | Navigate to Monitor Orders and back to Dashboard | P0 | Smoke, Critical | `sidebar-navigation.spec.js` |
| [TC-2.3](TC-2.3-navigate-templates-and-back.md) | Navigate to Templates and back to Dashboard | P1 | Smoke, Regression | `sidebar-navigation.spec.js` |
| [TC-2.4](TC-2.4-sidebar-collapse-expand.md) | Sidebar collapse/expand behavior | P2 | Regression | `sidebar-navigation.spec.js` |
| [TC-2.5](TC-2.5-mobile-hamburger-menu.md) | Mobile hamburger menu opens sidebar overlay | P2 | Regression | `sidebar-navigation.spec.js` |
| [TC-3.1](TC-3.1-profile-displays-name-email.md) | Profile button displays admin name and email | P0 | Smoke | `admin-profile.spec.js` |
| [TC-3.2](TC-3.2-profile-dropdown-settings-signout.md) | Profile dropdown opens with Settings and Sign out | P0 | Smoke, Critical | `admin-profile.spec.js` |
| [TC-3.3](TC-3.3-settings-navigation.md) | Click Settings navigates to settings page | P1 | Smoke, Regression | `admin-profile.spec.js` |
| [TC-3.4](TC-3.4-sign-out.md) | Sign out clears session and redirects to login | P1 | Critical, Regression | `admin-profile.spec.js` |
| [TC-4.1](TC-4.1-all-four-cards-displayed.md) | All four summary cards are displayed | P0 | Smoke | `summary-cards.spec.js` |
| [TC-4.2](TC-4.2-total-revenue-formatted.md) | Total Revenue displays correct formatted value | P0 | Smoke, Critical | `summary-cards.spec.js` |
| [TC-4.3](TC-4.3-orders-today-value.md) | Orders Today displays correct value | P0 | Smoke, Critical | `summary-cards.spec.js` |
| [TC-4.4](TC-4.4-active-customers-value.md) | Active Customers displays correct value | P0 | Smoke, Critical | `summary-cards.spec.js` |
| [TC-4.5](TC-4.5-books-generated-value.md) | Books Generated displays correct value | P0 | Smoke, Critical | `summary-cards.spec.js` |
| [TC-4.6](TC-4.6-cards-not-clickable.md) | Summary cards are not clickable | P2 | Regression | `summary-cards.spec.js` |
| [TC-5.1](TC-5.1-revenue-trend-section-renders.md) | Revenue Trend section renders with title and period selector | P0 | Smoke | `revenue-trend.spec.js` |
| [TC-5.2](TC-5.2-x-axis-labels-weekly.md) | Revenue chart x-axis labels match API data (weekly) | P1 | Smoke | `revenue-trend.spec.js` |
| [TC-5.3](TC-5.3-y-axis-values.md) | Revenue chart displays correct y-axis values | P1 | Smoke | `revenue-trend.spec.js` |
| [TC-5.4](TC-5.4-data-points-reflect-api.md) | Revenue chart data points reflect API response values | P1 | Regression | `revenue-trend.spec.js` |
| [TC-5.5](TC-5.5-switch-period.md) | Switch period from Weekly to Monthly | P1 | Smoke, Regression | `revenue-trend.spec.js` |
| [TC-5.6](TC-5.6-tooltip-hover.md) | Revenue chart tooltip on hover | P2 | Regression | `revenue-trend.spec.js` |
| [TC-5.7](TC-5.7-no-duplicate-requests.md) | No duplicate API requests when changing period | P2 | Regression | `revenue-trend.spec.js` |
| [TC-6.1](TC-6.1-orders-this-week-section-renders.md) | Orders This Week section renders with chart | P0 | Smoke | `orders-this-week.spec.js` |
| [TC-6.2](TC-6.2-bar-heights-reflect-api.md) | Orders This Week bar heights reflect API data | P1 | Smoke, Critical | `orders-this-week.spec.js` |
| [TC-6.3](TC-6.3-tooltip-hover.md) | Orders This Week tooltip on hover | P2 | Regression | `orders-this-week.spec.js` |
| [TC-7.1](TC-7.1-ai-status-section-renders.md) | AI Status section renders with all elements | P0 | Smoke | `ai-status.spec.js` |
| [TC-7.2](TC-7.2-counts-match-api.md) | AI Status counts match API response | P0 | Smoke, Critical | `ai-status.spec.js` |
| [TC-7.3](TC-7.3-percentages-calculated-correctly.md) | AI Status percentages are calculated correctly | P1 | Regression | `ai-status.spec.js` |
| [TC-7.4](TC-7.4-donut-chart-visualizes-ratios.md) | AI Status donut chart renders with segments | P1 | Regression | `ai-status.spec.js` |
| [TC-7.5](TC-7.5-period-selector-weekly-only.md) | AI Status period selector shows only Weekly | P2 | Smoke | `ai-status.spec.js` |
| [TC-8.1](TC-8.1-recent-orders-table-renders.md) | Recent Orders section renders with table | P0 | Smoke | `recent-orders.spec.js` |
| [TC-8.2](TC-8.2-data-matches-api.md) | Recent Orders data matches API response | P0 | Smoke, Critical | `recent-orders.spec.js` |
| [TC-8.3](TC-8.3-action-button-present.md) | Recent Orders action button is present for each row | P1 | Smoke, Regression | `recent-orders.spec.js` |
| [TC-8.4](TC-8.4-view-all-navigates.md) | View All navigates to orders management page | P0 | Smoke | `recent-orders.spec.js` |
| [TC-8.5](TC-8.5-orders-page-status-filter.md) | Orders page status filter opens dropdown | P1 | Regression | `recent-orders.spec.js` |
| [TC-8.6](TC-8.6-orders-page-search.md) | Orders page search input is present | P1 | Regression | `recent-orders.spec.js` |
| [TC-8.7](TC-8.7-orders-page-pagination.md) | Orders page pagination is displayed | P1 | Regression | `recent-orders.spec.js` |
| [TC-9.1](TC-9.1-all-api-requests-return-200.md) | All dashboard API requests return 200 | P1 | Regression | `data-consistency.spec.js` |
| [TC-9.2](TC-9.2-revenue-trend-weekly-api-matches-chart.md) | Revenue Trend weekly data: API matches chart | P1 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-9.3](TC-9.3-revenue-trend-monthly-api-matches-chart.md) | Revenue Trend monthly data: API matches chart | P1 | Regression | `data-consistency.spec.js` |
| [TC-9.4](TC-9.4-orders-this-week-percentages-vs-ui.md) | Orders This Week percentages sum to 100% | P1 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-9.5](TC-9.5-recent-orders-api-fields-map-to-ui.md) | Recent Orders API fields map to UI columns | P1 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-9.6](TC-9.6-total-revenue-consistency-card-vs-trend.md) | Total Revenue: card vs revenue trend sum | P2 | Regression | `data-consistency.spec.js` |
| [TC-10.1](TC-10.1-skeleton-loading-states.md) | Skeleton loading states appear during data fetch | P2 | Regression | `loading-states.spec.js` |
| [TC-10.2](TC-10.2-empty-orders-this-week.md) | Empty orders-this-week handled gracefully | P2 | Regression | `loading-states.spec.js` |
| [TC-10.3](TC-10.3-empty-revenue-data.md) | Empty revenue trend handled gracefully | P2 | Regression | `loading-states.spec.js` |
| [TC-10.4](TC-10.4-empty-ai-status.md) | Empty AI status handled gracefully | P2 | Regression | `loading-states.spec.js` |
| [TC-10.5](TC-10.5-empty-recent-orders.md) | Empty recent orders shows empty message | P2 | Regression | `loading-states.spec.js` |
| [TC-10.6](TC-10.6-api-failure-error-message.md) | API failure shows error message gracefully | P2 | Regression | `loading-states.spec.js` |
| [TC-11.1](TC-11.1-desktop-layout.md) | Desktop layout (1440x900) | P1 | Smoke | `responsive.spec.js` |
| [TC-11.2](TC-11.2-tablet-layout.md) | Tablet layout (768x1024) | P2 | Regression | `responsive.spec.js` |
| [TC-11.3](TC-11.3-mobile-layout.md) | Mobile layout (375x812) | P2 | Regression | `responsive.spec.js` |
| [TC-12.1](TC-12.1-no-console-errors-on-load.md) | No console errors on dashboard load | P1 | Smoke | `console-errors.spec.js` |
| [TC-12.2](TC-12.2-no-console-errors-period-switch.md) | No console errors on period switch | P2 | Regression | `console-errors.spec.js` |
| [TC-12.3](TC-12.3-no-console-errors-navigation.md) | No console errors on navigation | P2 | Regression | `console-errors.spec.js` |

**Total: 58 test cases** (matching all scenarios in `specs/admin-dashboard.md`).

## Shared Preconditions

- Environment: `https://staging.storaby.com`
- API Base: `https://api.staging.storaby.com`
- Test account: `usman+admin@geeksofkolachi.com` / `Admin@123`
- Start from a logged-in state on `/admin/dashboard` unless noted otherwise (clear browser storage first, authenticate via the login form).
- Viewport: 1440×900 (desktop) unless the test specifies a different viewport.
- Currency: GBP (£) — values stored as pence in API, divided by 100 for display.
