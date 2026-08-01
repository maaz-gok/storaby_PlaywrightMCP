# Manual Test Cases — Storaby Template Management

Manual QA test cases for the scenarios covered by the automated Playwright suite in `tests/admin/Templates/`. Each file below corresponds 1:1 to an automated test that is currently passing against `https://staging.storaby.com/admin/templates`.

Source plan: [specs/template-management.md](../../specs/template-management.md)

## Index

| Test Case ID | Title | Priority | Type | Automated Spec |
|---|---|---|---|---|
| [TC-1.1](TC-1-1-templates-page-loads-with-authenticated-session.md) | Templates page loads with authenticated session | P0 | Smoke, Critical | `page-load.spec.js` |
| [TC-1.2](TC-1-2-unauthenticated-user-is-redirected-to-login.md) | Unauthenticated user is redirected to login | P0 | Critical, Regression | `page-load.spec.js` |
| [TC-1.3](TC-1-3-templates-page-structure-renders-correctly.md) | Templates page structure renders correctly | P1 | Smoke | `page-load.spec.js` |
| [TC-2.1](TC-2-1-grid-renders-one-card-per-api-item-9-per-page.md) | Grid renders one card per API item, 9 per page | P0 | Smoke, Critical | `card-grid.spec.js` |
| [TC-2.2](TC-2-2-every-card-field-matches-the-backend-response.md) | Every card field matches the backend response | P0 | Smoke, Critical | `card-grid.spec.js` |
| [TC-2.3](TC-2-3-visibility-badge-styling-distinguishes-visible-vs-hidden.md) | Visibility badge styling distinguishes Visible vs Hidden | P1 | Smoke, Regression | `card-grid.spec.js` |
| [TC-2.4](TC-2-4-duplicate-template-names-render-as-separate-cards.md) | Duplicate template names render as separate cards | P1 | Regression | `card-grid.spec.js` |
| [TC-2.5](TC-2-5-long-template-names-clamp-to-two-lines.md) | Long template names clamp to two lines | P2 | Regression | `card-grid.spec.js` |
| [TC-2.6](TC-2-6-broken-cover-image-does-not-break-the-card.md) | Broken cover image does not break the card | P2 | Regression | `card-grid.spec.js` |
| [TC-2.7](TC-2-7-responsive-grid-layout.md) | Responsive grid layout | P2 | Regression | `card-grid.spec.js` |
| [TC-3.1](TC-3-1-search-input-renders-with-correct-placeholder.md) | Search input renders with correct placeholder | P0 | Smoke | `search.spec.js` |
| [TC-3.2](TC-3-2-search-is-debounced-and-fires-a-single-api-request.md) | Search is debounced and fires a single API request | P0 | Smoke, Critical | `search.spec.js` |
| [TC-3.3](TC-3-3-partial-and-case-insensitive-search-return-the-same-set.md) | Partial and case-insensitive search return the same set | P0 | Smoke, Regression | `search.spec.js` |
| [TC-3.4](TC-3-4-search-trims-leading-trailing-spaces.md) | Search trims leading/trailing spaces | P2 | Regression | `search.spec.js` |
| [TC-3.5](TC-3-5-search-with-an-exact-full-name.md) | Search with an exact full name | P1 | Regression | `search.spec.js` |
| [TC-3.6](TC-3-6-search-matches-name-genre-and-prompt-text.md) | Search matches name, genre, and prompt text | P1 | Regression | `search.spec.js` |
| [TC-3.7](TC-3-7-search-with-numbers-returns-empty-state.md) | Search with numbers returns empty state | P2 | Regression | `search.spec.js` |
| [TC-3.8](TC-3-8-search-with-special-characters-is-url-encoded.md) | Search with special characters is URL-encoded | P2 | Regression | `search.spec.js` |
| [TC-3.9](TC-3-9-clearing-the-search-restores-the-full-list.md) | Clearing the search restores the full list | P0 | Smoke | `search.spec.js` |
| [TC-3.10](TC-3-10-no-result-search-shows-the-no-templates-found-empty-state.md) | No-result search shows the "No templates found." empty state | P0 | Smoke, Regression | `search.spec.js` |
| [TC-3.11](TC-3-11-a-new-search-resets-pagination-to-page-1.md) | A new search resets pagination to page 1 | P1 | Regression | `search.spec.js` |
| [TC-3.12](TC-3-12-search-persists-across-pagination.md) | Search persists across pagination | P1 | Regression | `search.spec.js` |
| [TC-4.1](TC-4-1-age-group-dropdown-lists-all-options.md) | Age Group dropdown lists all options | P0 | Smoke | `age-group-filter.spec.js` |
| [TC-4.2](TC-4-2-selecting-an-age-group-filters-the-grid.md) | Selecting an age group filters the grid | P0 | Smoke, Critical | `age-group-filter.spec.js` |
| [TC-4.3](TC-4-3-age-group-results-match-the-backend-response.md) | Age Group results match the backend response | P0 | Smoke, Critical | `age-group-filter.spec.js` |
| [TC-4.4](TC-4-4-all-resets-the-age-group-filter.md) | "All" resets the Age Group filter | P0 | Smoke | `age-group-filter.spec.js` |
| [TC-4.5](TC-4-5-age-group-filter-combines-with-search.md) | Age Group filter combines with search | P1 | Regression | `age-group-filter.spec.js` |
| [TC-4.6](TC-4-6-age-group-filter-resets-after-page-refresh.md) | Age Group filter resets after page refresh | P2 | Regression | `age-group-filter.spec.js` |
| [TC-5.1](TC-5-1-storefront-section-dropdown-lists-all-options.md) | Storefront section dropdown lists all options | P0 | Smoke | `storefront-filter.spec.js` |
| [TC-5.2](TC-5-2-selecting-a-storefront-section-filters-the-grid.md) | Selecting a storefront section filters the grid | P0 | Smoke, Critical | `storefront-filter.spec.js` |
| [TC-5.3](TC-5-3-all-resets-the-storefront-filter.md) | "All" resets the Storefront filter | P0 | Smoke | `storefront-filter.spec.js` |
| [TC-5.4](TC-5-4-storefront-filter-combines-with-age-group-and-search.md) | Storefront filter combines with Age Group and search | P1 | Regression | `storefront-filter.spec.js` |
| [TC-6.1](TC-6-1-visibility-dropdown-lists-all-options.md) | Visibility dropdown lists all options | P0 | Smoke | `visibility-filter.spec.js` |
| [TC-6.2](TC-6-2-filtering-by-visible-returns-active-templates.md) | Filtering by "Visible" returns active templates | P0 | Smoke, Critical | `visibility-filter.spec.js` |
| [TC-6.3](TC-6-3-filtering-by-hidden-returns-inactive-templates.md) | Filtering by "Hidden" returns inactive templates | P0 | Smoke, Critical | `visibility-filter.spec.js` |
| [TC-6.4](TC-6-4-all-resets-the-visibility-filter.md) | "All" resets the Visibility filter | P1 | Regression | `visibility-filter.spec.js` |
| [TC-6.5](TC-6-5-combined-hidden-and-age-group-produces-an-empty-state.md) | Combined Hidden + Age Group produces an empty state | P2 | Regression | `visibility-filter.spec.js` |
| [TC-7.1](TC-7-1-show-flow-opens-a-dialog-and-cancel-does-not-change-visibility.md) | "Show" flow opens a dialog and cancel does not change visibility | P0 | Smoke, Critical | `visibility-toggle.spec.js` |
| [TC-7.2](TC-7-2-confirming-show-updates-visibility-and-is-restored.md) | Confirming "Show" updates visibility and is restored | P0 | Smoke, Critical | `visibility-toggle.spec.js` |
| [TC-7.3](TC-7-3-hide-flow-makes-a-visible-template-hidden-and-is-restored.md) | "Hide" flow makes a visible template hidden and is restored | P0 | Smoke, Critical | `visibility-toggle.spec.js` |
| [TC-7.4](TC-7-4-dialog-close-paths-cancel-backdrop-escape.md) | Dialog close paths: cancel, backdrop, Escape | P1 | Regression | `visibility-toggle.spec.js` |
| [TC-8.1](TC-8-1-delete-button-opens-a-confirmation-dialog.md) | Delete button opens a confirmation dialog | P0 | Smoke, Critical | `delete-template.spec.js` |
| [TC-8.2](TC-8-2-cancel-delete-keeps-the-template.md) | Cancel delete keeps the template | P0 | Smoke, Critical | `delete-template.spec.js` |
| [TC-8.3](TC-8-3-backdrop-click-closes-the-delete-dialog-without-deleting.md) | Backdrop click closes the delete dialog without deleting | P1 | Regression | `delete-template.spec.js` |
| [TC-8.4](TC-8-4-confirm-delete-removes-the-template.md) | Confirm delete removes the template | P0 | Smoke, Critical | `delete-template.spec.js` |
| [TC-8.5](TC-8-5-simulated-deletion-does-not-persist-after-reload.md) | Simulated deletion does not persist after reload | P1 | Regression | `delete-template.spec.js` |
| [TC-8.6](TC-8-6-delete-failure-shows-an-error-toast-and-keeps-the-template.md) | Delete failure shows an error toast and keeps the template | P2 | Regression | `delete-template.spec.js` |
| [TC-8.7](TC-8-7-deleting-the-last-template-on-a-filtered-view-shows-the-empty-state.md) | Deleting the last template on a filtered view shows the empty state | P2 | Regression | `delete-template.spec.js` |
| [TC-9.1](TC-9-1-pagination-controls-render-with-correct-disabled-states.md) | Pagination controls render with correct disabled states | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-9.2](TC-9-2-page-indicator-ranges-are-correct.md) | Page indicator ranges are correct | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-9.3](TC-9-3-next-previous-load-different-data.md) | Next/Previous load different data | P0 | Smoke, Critical | `pagination.spec.js` |
| [TC-9.4](TC-9-4-first-last-page-buttons-navigate-to-boundaries.md) | First/Last page buttons navigate to boundaries | P1 | Regression | `pagination.spec.js` |
| [TC-9.5](TC-9-5-pagination-composes-with-search-and-filters.md) | Pagination composes with search and filters | P1 | Regression | `pagination.spec.js` |
| [TC-9.6](TC-9-6-single-page-and-no-result-pagination-boundaries.md) | Single-page and no-result pagination boundaries | P2 | Regression | `pagination.spec.js` |
| [TC-10.1](TC-10-1-skeleton-cards-render-while-the-grid-loads.md) | Skeleton cards render while the grid loads | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-10.2](TC-10-2-loading-behaviour-during-a-search-keeps-controls-interactive.md) | Loading behaviour during a search keeps controls interactive | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-10.3](TC-10-3-empty-state-markup-for-no-results.md) | Empty state markup for no results | P0 | Smoke, Regression | `loading-empty-error.spec.js` |
| [TC-10.4](TC-10-4-api-failure-keeps-the-grid-in-the-skeleton-state.md) | API failure keeps the grid in the skeleton state | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-10.5](TC-10-5-cover-images-load-with-correct-dimensions.md) | Cover images load with correct dimensions | P2 | Regression | `loading-empty-error.spec.js` |
| [TC-11.1](TC-11-1-logical-tab-order-through-the-main-content.md) | Logical tab order through the main content | P2 | Regression | `accessibility.spec.js` |
| [TC-11.2](TC-11-2-filter-dropdown-keyboard-interaction.md) | Filter dropdown keyboard interaction | P2 | Regression | `accessibility.spec.js` |
| [TC-11.3](TC-11-3-dialog-keyboard-behaviour-focus-trap-and-escape.md) | Dialog keyboard behaviour: focus trap and Escape | P2 | Regression | `accessibility.spec.js` |
| [TC-11.4](TC-11-4-screen-reader-names-on-key-elements.md) | Screen-reader names on key elements | P2 | Regression | `accessibility.spec.js` |
| [TC-12.1](TC-12-1-all-list-requests-return-200-with-the-expected-envelope.md) | All list requests return 200 with the expected envelope | P1 | Regression | `data-consistency.spec.js` |
| [TC-12.2](TC-12-2-card-count-and-page-size-match-the-backend.md) | Card count and page size match the backend | P0 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-12.3](TC-12-3-search-and-filter-results-match-backend-filtered-responses.md) | Search and filter results match backend filtered responses | P0 | Smoke, Critical | `data-consistency.spec.js` |
| [TC-12.4](TC-12-4-visibility-state-on-cards-matches-the-backend-isactive-field.md) | Visibility state on cards matches the backend isActive field | P1 | Regression | `data-consistency.spec.js` |
| [TC-12.5](TC-12-5-no-console-errors-on-any-listing-interaction.md) | No console errors on any listing interaction | P1 | Smoke | `data-consistency.spec.js` |
| [TC-12.6a](TC-12-6a-browser-back-navigates-to-dashboard.md) | Browser back navigates to dashboard | P0 | Smoke, Critical | `browser-behaviour.spec.js` |
| [TC-12.6b](TC-12-6b-browser-forward-returns-to-templates-page.md) | Browser forward returns to templates page | P1 | Regression | `browser-behaviour.spec.js` |
| [TC-12.6c](TC-12-6c-page-refresh-restores-default-state.md) | Page refresh restores default state | P0 | Smoke, Regression | `browser-behaviour.spec.js` |
| [TC-12.6d](TC-12-6d-direct-url-access-loads-the-templates-page.md) | Direct URL access loads the templates page | P1 | Regression | `browser-behaviour.spec.js` |

**Total: 72 test cases** (matching all scenarios in `specs/template-management.md`).

## Shared Preconditions

- Environment: `https://staging.storaby.com`
- API Base: `https://api.staging.storaby.com`
- Test account: `usman+admin@geeksofkolachi.com` / `Admin@123`
- Start from a logged-in state on `/admin/templates` unless noted otherwise (clear browser storage first, authenticate via the login form).
- Viewport: 1440×900 (desktop) unless the test specifies a different viewport.
- Templates list API: `GET /story-templates/admin/all?page=1&limit=9`; totals on staging (e.g. 26 templates) may drift — never hardcode counts.
- **Destructive actions:** never delete or permanently toggle real staging templates. The automated suite intercepts the DELETE and visibility PATCH requests; manual testing should only run those flows against approved disposable data.
