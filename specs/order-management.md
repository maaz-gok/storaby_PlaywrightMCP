# Test Plan: Order Management

**Target:** https://staging.storaby.com/admin/orders
**API Base:** https://api.staging.storaby.com
**Seed:** tests/seed.spec.js
**Date:** 2026-07-29

## Overview

Covers the full Order Management page at `/admin/orders` after successful authentication: page structure, orders table, search, status filter, pagination, order detail drawer, browser history, loading states, empty states, accessibility, and comprehensive API-to-UI data validation. Explored live against staging using Playwright (Chromium headless) with network capture and DOM inspection.

## Environment

| Property | Value |
|---|---|
| Base URL | `https://staging.storaby.com` |
| API Base | `https://api.staging.storaby.com` |
| Orders URL | `/admin/orders` |
| Login URL | `/admin/login` |
| Auth storage key | `storaby-auth` (localStorage) |
| Currency | GBP (£) — values stored as pence in API, divided by 100 for display |
| Viewport explored | 1440×900 (desktop) |

## Test Account

- Email: `usman+admin@geeksofkolachi.com`
- Password: `Admin@123`
- Display name: `admin`

## API Endpoints (Order Management)

| Endpoint | Method | Called On | Query Params |
|---|---|---|---|
| `/auth/login` | POST | Login submit | — |
| `/users` | GET | Dashboard load | — |
| `/admin/orders` | GET | Orders page load | `?page=1&limit=10` |
| `/admin/orders` | GET | Search | `?page=1&limit=10&search=<query>` |
| `/admin/orders` | GET | Status filter | `?page=1&limit=10&status=<STATUS>` |
| `/admin/orders` | GET | Pagination | `?page=<N>&limit=10` |
| `/admin/orders/:id` | GET | Order detail drawer open | — |

### `GET /admin/orders?page=1&limit=10`

```json
{
  "data": {
    "items": [
      {
        "_id": "6a6a20e97c6021c867ab21f6",
        "orderNumber": "ST-8RCA",
        "customer": {
          "customerName": "Alex",
          "email": "usman+alex@geeksofkolachi.com"
        },
        "storyTitle": "The Glowing Envelope",
        "price": 2999,
        "createdAt": "2026-07-29T...",
        "status": "GENERATING_FINAL"
      }
    ],
    "total": 85,
    "page": 1,
    "limit": 10,
    "totalPages": 9
  },
  "status": 200,
  "message": "Orders retrieved successfully"
}
```

### `GET /admin/orders/:id`

```json
{
  "data": {
    "_id": "6a6a20e97c6021c867ab21f6",
    "orderNumber": "ST-8RCA",
    "customer": {
      "customerName": "Alex",
      "email": "usman+alex@geeksofkolachi.com",
      "shippingAddress": "..."
    },
    "storyTitle": "The Glowing Envelope",
    "price": 2999,
    "createdAt": "2026-07-29T...",
    "status": "GENERATING_FINAL",
    "paymentStatus": "PAID",
    "timeline": [...]
  },
  "status": 200,
  "message": "Order retrieved successfully"
}
```

## API Response Fields vs UI Columns (Orders Table)

| API Field | UI Column Header | Formatting |
|---|---|---|
| `orderNumber` | Order Number | Plain text `ST-8RCA` |
| `customer.customerName` (fallback `customer.email`) | Customer | Plain text |
| `storyTitle` (fallback `—`) | Story | Italic text |
| `price` | Transaction | `£29.99` (pence / 100, 2 decimal places) |
| `createdAt` | Transaction Date | `29 Jul 2026` (DD Mon YYYY) |
| `status` | Order Status | Badge with icon + human label |
| — | Action | Eye icon button with `aria-label="View order <orderNumber>"` |

## Discovered Order Statuses

| API Value | UI Label | Badge Colour | Observed |
|---|---|---|---|
| `PENDING` | Pending | Yellow/gold | Yes |
| `PAID` | Paid | Green | Yes |
| `GENERATING_FINAL` | Generating Final | Yellow/gold | Yes |
| `SUBMITTED_TO_PRINT` | Submitted To Print | Teal/blue | Yes |
| `PRINTING` | Printing | Indigo/blue | Yes |
| `SHIPPED` | Shipped | Green | Yes (0 results on test data) |
| `DELIVERED` | Delivered | Green | Yes (0 results on test data) |
| `CANCELLED` | Cancelled | Red | Yes (0 results on test data) |
| `GENERATION_FAILED` | Generation Failed | Red | Yes (0 results on test data) |
| `REFUNDED` | Refunded | Red | Yes (0 results on test data) |

## Page Objects Available

| Class | File |
|---|---|
| `LoginPage` | `src/pages/LoginPage.js` |
| `DashboardPage` | `src/pages/DashboardPage.js` |
| `OrdersPage` | `src/pages/OrdersPage.js` |

The `OrdersPage` currently has locators for: `heading`, `searchInput`, `statusFilterButton`, `statusDropdown`, `statusOptions`, `tableRows`, `paginationText`, `nextPageButton`, `prevPageButton`, `pageButtons`. The Generator should extend it for this plan's scenarios.

---

## Preconditions

- Staging environment reachable at `https://staging.storaby.com`.
- API reachable at `https://api.staging.storaby.com`.
- Known-good admin account: `usman+admin@geeksofkolachi.com` / `Admin@123`.
- Browser storage cleared before authentication (fresh `storaby-auth` state).
- No rate-limiting observed on any endpoint.
- Total orders count > 10 to allow pagination testing (observed: 85 total orders).

---

## Scenarios

### 1.x — Page Load & Structure

#### Scenario 1.1 — Orders page loads with authenticated session

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Fresh browser context, logged out.
- **Steps:**
  1. Navigate to `/admin/login`.
  2. Log in with valid credentials.
  3. Wait for navigation to `/admin/dashboard`.
  4. Click "Monitor Orders" in the sidebar.
  5. Wait for URL to become `/admin/orders`.
  6. Wait for `networkidle`.
- **Assertions:**
  - Final URL is `/admin/orders`.
  - Page title contains "Storaby".
  - Heading "Order Management" is visible as a heading role.
  - Sidebar is visible with links: Dashboard, Monitor Orders, Templates.
  - "Monitor Orders" nav link has `aria-current="page"`.
  - Header/profile section is visible in the top-right corner showing admin name and email.
  - No console errors.
- **Edge cases:**
  - Page should not redirect back to login.
  - The heading text is "Order Management" with "Management" in italic.

#### Scenario 1.2 — Unauthenticated user is redirected to login

- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Clean browser context, no localStorage session.
- **Steps:**
  1. Navigate directly to `/admin/orders`.
- **Assertions:**
  - Final URL is `/admin/login`.
  - Orders page content is not rendered.
- **Edge cases:**
  - Same guard applies to `/admin/dashboard`, `/admin/templates`, `/admin/settings`.

#### Scenario 1.3 — Orders page structure renders correctly

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page after successful load.
- **Steps:**
  1. Observe the full page structure.
- **Assertions:**
  - Left sidebar contains the app logo, navigation links (Dashboard, Monitor Orders, Templates), and a collapse button.
  - "Monitor Orders" link is highlighted with active styling and `aria-current="page"`.
  - Main content area contains: search input (placeholder "Search anything..."), status filter button (aria-label "Statuses"), orders table, pagination controls.
  - Header contains: profile avatar, admin name, admin email, and a dropdown indicator.
- **Edge cases:**
  - Structure should be stable across page refreshes.

---

### 2.x — Orders Table

#### Scenario 2.1 — Table headers are correct

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Observe the table header row.
- **Assertions:**
  - Seven column headers are visible: "Order Number", "Customer", "Story", "Transaction", "Transaction Date", "Order Status", "Action".
  - Headers are in the correct order as listed.
  - "Action" header is center-aligned; others are left-aligned.
- **Edge cases:**
  - Table headers are sticky (scroll test).

#### Scenario 2.2 — Table displays 10 rows per page

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page. API returns >= 10 items.
- **Steps:**
  1. Count the number of `<tbody>` rows in the table.
- **Assertions:**
  - Exactly 10 rows are rendered.
  - Each row contains 7 `<td>` cells.
  - Each row is separated by a bottom border.
- **Edge cases:**
  - On the last page, fewer than 10 rows may be displayed.

#### Scenario 2.3 — Table data matches API response (GET /admin/orders?page=1&limit=10)

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Intercept `GET /admin/orders?page=1&limit=10` and capture the response.
  2. For the first 3 rows, read cell values.
- **Assertions:**
  - Row N's "Order Number" matches `response.data.items[N].orderNumber`.
  - Row N's "Customer" matches `response.data.items[N].customer.customerName` (fallback to `customer.email` if customerName is null/empty).
  - Row N's "Story" matches `response.data.items[N].storyTitle` (or `—` if null/empty), rendered in italic.
  - Row N's "Transaction" matches `£(response.data.items[N].price / 100).toFixed(2)` (e.g. `2999` → `£29.99`).
  - Row N's "Transaction Date" matches the formatted `createdAt` in `DD Mon YYYY` format (e.g. `29 Jul 2026`).
  - Row N's "Order Status" displays the human-readable label for `response.data.items[N].status` (e.g. `GENERATING_FINAL` → "Generating Final").
  - Row N's action button has `aria-label` equal to `"View order ${orderNumber}"`.
  - The number of rows equals `response.data.items.length`.
- **Edge cases:**
  - If `storyTitle` is empty, display should show `—` (em dash).
  - If `customer.customerName` is empty, fallback to `customer.email`.

#### Scenario 2.4 — Table row status badge renders with correct colour and icon

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on orders page. Multiple statuses present.
- **Steps:**
  1. Observe the "Order Status" cell for each row.
- **Assertions:**
  - Each status cell contains a `<span>` badge element.
  - The badge has an inline SVG icon (e.g. clock icon for "Generating Final", check icon for "Paid").
  - The badge has a coloured border and background matching the status:
    - PENDING / GENERATING_FINAL → yellow/amber border and background.
    - PAID → green border and background.
    - SUBMITTED_TO_PRINT → teal border and background.
    - PRINTING → indigo/blue border and background.
    - SHIPPED / DELIVERED → green border and background.
    - CANCELLED / GENERATION_FAILED / REFUNDED → red border and background.
  - Badge text is the human-readable status label.
- **Edge cases:**
  - Badge text formatting: Pascal case with spaces separating words (e.g. "Submitted To Print" not "Submitted_to_print").

#### Scenario 2.5 — Action column contains eye-icon button for each row

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Observe the "Action" column for each row.
- **Assertions:**
  - Each row contains a `<button>` with `aria-label="View order <orderNumber>"`.
  - The button contains an eye icon (Lucide `eye` SVG).
  - The button has hover styles: background changes to cream, icon colour changes.
  - The button is center-aligned in the cell.
- **Edge cases:**
  - The button has no visible text — only icon.

#### Scenario 2.6 — No sorting available on table columns

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Click each table header cell.
- **Assertions:**
  - No header has `aria-sort` attribute.
  - No column sorting icon is present.
  - Clicking headers does not trigger any API request or re-order the rows.
- **Edge cases:**
  - Columns are presentation-only; sorting is not implemented.

---

### 3.x — Search

#### Scenario 3.1 — Search input renders with correct placeholder

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Locate the search input.
- **Assertions:**
  - A search input with placeholder "Search anything..." is visible.
  - A search icon (Lucide `search`) is present inside the input container.
  - The input has `type="search"`.
- **Edge cases:**
  - The input should be at full width on mobile, with flex layout on desktop.

#### Scenario 3.2 — Search is debounced and fires API request after pause

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Set up request interception for `/admin/orders`.
  2. Type "S" in the search input.
  3. After 300ms, type "T".
  4. After 300ms, type "-".
  5. After 300ms, type "8".
  6. Wait 2 seconds.
- **Assertions:**
  - Only 1 API request fires after typing stops (debounced), not one per keystroke.
  - The request URL contains `&search=ST-8`.
  - The table updates with matching results.
- **Edge cases:**
  - Fast typing should not trigger multiple requests.
  - Debounce delay is approximately 500-1000ms.

#### Scenario 3.3 — Search by order number prefix returns matching orders

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type "ST-" in the search input.
  2. Wait for API response.
- **Assertions:**
  - Results are filtered to orders whose `orderNumber` contains "ST-" (all order numbers start with "ST-").
  - The number of rows may equal the total count (since all orders match "ST-").
- **Edge cases:**
  - Search is likely a contains match, not a starts-with.

#### Scenario 3.4 — Search by customer name

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type "usman" in the search input.
  2. Wait for API response.
- **Assertions:**
  - Results are filtered to orders where customer name or email contains "usman".
  - All displayed rows have "usman" (case-insensitive) in the Customer column.
  - API request URL contains `&search=usman`.
- **Edge cases:**
  - Search is case-insensitive ("Usman" should match "usman").

#### Scenario 3.5 — Search with leading/trailing spaces

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type `"  usman  "` (with leading and trailing spaces) in the search input.
  2. Wait for API response.
- **Assertions:**
  - The API request sends the query trimmed (or the backend handles spaces).
  - Same results as searching for "usman" without spaces.
- **Edge cases:**
  - The app may trim the input client-side before sending.

#### Scenario 3.6 — Search with special characters

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type `"@#$"` in the search input.
  2. Wait for API response.
- **Assertions:**
  - An API request is sent with `&search=%40%23%24` (URL-encoded).
  - The table shows 0 results or "No orders found." empty state.
  - No console errors.
- **Edge cases:**
  - Special characters should be URL-encoded and not break the application.

#### Scenario 3.7 — Search with numeric values

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type `"123"` in the search input.
  2. Wait for API response.
- **Assertions:**
  - An API request is sent with `&search=123`.
  - Results are filtered appropriately (may return 0 results).
  - No console errors.

#### Scenario 3.8 — Clear search restores full list

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page. A search was applied.
- **Steps:**
  1. Type a search query and wait for results.
  2. Clear the search input (set value to empty string).
  3. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=1&limit=10` (no search param).
  - Table restores to the full unfiltered order list.
  - Pagination text reverts to the original total (e.g. "1-10 of 85").
- **Edge cases:**
  - Clearing via the native clear button (if `type="search"` provides an X button).

#### Scenario 3.9 — Search and status filter combination

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Select a status filter (e.g. "Printing").
  2. Type a search query (e.g. "usman") in the search input.
  3. Wait for API response.
- **Assertions:**
  - API request includes both `&status=PRINTING&search=usman`.
  - Results match both criteria (status = Printing AND customer contains "usman").
  - Pagination text reflects the combined filtered count.
- **Edge cases:**
  - Changing the filter should reset the search and vice versa — document observed behaviour.

#### Scenario 3.10 — Search persistence after pagination

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type a search query (e.g. "usman") and wait for results.
  2. Click the "Next page" pagination button.
- **Assertions:**
  - API request includes both `&page=2&limit=10&search=usman`.
  - Search input still shows the query text.
  - Table shows page 2 of the filtered results.
- **Edge cases:**
  - Search term is preserved across pagination navigations.

#### Scenario 3.11 — Search does not persist after page refresh

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page with search applied.
- **Steps:**
  1. Type a search query and wait for results.
  2. Reload the page.
  3. Wait for networkidle.
- **Assertions:**
  - Search input is empty after refresh.
  - Table shows the full unfiltered list.
- **Edge cases:**
  - Search state is not stored in localStorage or URL params.

#### Scenario 3.12 — No results state displays "No orders found."

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type a search query that matches no orders (e.g. "ZZZZNONEXISTENT12345").
  2. Wait for API response.
- **Assertions:**
  - A single table row with `colspan="7"` is rendered.
  - The row contains text "No orders found." in a `<p>` element.
  - Pagination text shows "0-0 of 0".
  - All pagination buttons (First, Previous, Next, Last) are disabled.
- **Edge cases:**
  - The "No orders found." message is centered in the table.

---

### 4.x — Status Filter

#### Scenario 4.1 — Status filter button renders correctly

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Locate the status filter button.
- **Assertions:**
  - A button with `aria-label="Statuses"` and text "Statuses" is visible.
  - The button has a chevron-down icon (Lucide `chevron-down`) on the right.
  - The button has hover styles.
  - The button has `aria-haspopup="listbox"`.
- **Edge cases:**
  - The button appears to the right of the search input.

#### Scenario 4.2 — Status filter dropdown opens with all options

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Click the "Statuses" filter button.
- **Assertions:**
  - A dropdown appears with role `listbox`.
  - 11 options are present in order: "All", "Pending", "Paid", "Generating Final", "Submitted To Print", "Printing", "Shipped", "Delivered", "Cancelled", "Generation Failed", "Refunded".
  - "All" has `aria-selected="true"` by default.
  - All other options have `aria-selected="false"`.
  - Each option is a `<li role="option">` containing a `<button>`.
- **Edge cases:**
  - The dropdown should close when clicking outside or pressing Escape.

#### Scenario 4.3 — Selecting a status filters the table

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Click the "Statuses" button to open the dropdown.
  2. Click the "Pending" option.
  3. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=1&limit=10&status=PENDING`.
  - The button text updates to show the selected status (e.g. "Pending").
  - All displayed rows have "Pending" in the Order Status column.
  - Pagination resets to page 1.
  - The dropdown closes after selection.
- **Edge cases:**
  - Status values are sent in uppercase: `PENDING`, `GENERATING_FINAL`, etc.

#### Scenario 4.4 — Selecting "All" resets the filter

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page, a status filter applied.
- **Steps:**
  1. Click the "Statuses" button.
  2. Click the "All" option.
  3. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=1&limit=10` (no status param).
  - The button text reverts to "Statuses".
  - Table shows the full unfiltered order list.
  - Pagination resets to page 1.
- **Edge cases:**
  - The "All" option clears the status parameter from the request.

#### Scenario 4.5 — Filtered data matches API response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Select a status filter (e.g. "Printing").
  2. Intercept the API response: `GET /admin/orders?page=1&limit=10&status=PRINTING`.
  3. For the first 3 rows, read cell values.
- **Assertions:**
  - Each displayed row's status matches the selected filter.
  - Row data (order number, customer, story, amount, date) matches the corresponding API response item.
  - The number of rows equals `response.data.items.length`.
- **Edge cases:**
  - If the selected status has no orders, the "No orders found." empty state should be displayed.

#### Scenario 4.6 — Filter persists after pagination

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page with a status filter applied.
- **Steps:**
  1. Select a status filter (e.g. "Printing").
  2. Click the "Next page" button.
- **Assertions:**
  - API request includes both `&page=2&limit=10&status=PRINTING`.
  - The button still shows the selected status text.
  - Table shows page 2 of the filtered results.
- **Edge cases:**
  - Filter is preserved across pagination navigations.

#### Scenario 4.7 — Filter does not persist after page refresh

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page with a status filter applied.
- **Steps:**
  1. Select a status filter.
  2. Reload the page.
  3. Wait for networkidle.
- **Assertions:**
  - Button text reverts to "Statuses".
  - Table shows the full unfiltered list.
- **Edge cases:**
  - Filter state is not stored in localStorage or URL params.

---

### 5.x — Pagination

#### Scenario 5.1 — Pagination controls are rendered

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page. Total orders > 10.
- **Steps:**
  1. Scroll to the bottom of the page.
- **Assertions:**
  - Pagination text is visible: "1-10 of 85" format (`<p>` element).
  - Four pagination buttons are visible:
    - "First page" (chevrons-left icon)
    - "Previous page" (chevron-left icon)
    - "Next page" (chevron-right icon)
    - "Last page" (chevrons-right icon)
  - On page 1: First and Previous buttons are disabled (`disabled=""` attribute, opacity 35%).
  - On page 1: Next and Last buttons are enabled.
- **Edge cases:**
  - Pagination is positioned below the table.
  - No numbered page buttons — only first/prev/next/last.

#### Scenario 5.2 — Page indicator shows correct ranges
.
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page. Total orders > 10.
- **Steps:**
  1. Observe the pagination text on page 1.
  2. Click "Next page".
  3. Observe the pagination text on page 2.
  4. Click "Last page".
  5. Observe the pagination text on the last page.
- **Assertions:**
  - Page 1: "1-10 of 85" (first item index - last item index of total).
  - Page 2: "11-20 of 85".
  - Page 3+: continues pattern.
  - Last page (page 9): "81-85 of 85".
  - `lastItemIndex = page * limit`, capped at `total`.
  - `firstItemIndex = (page - 1) * limit + 1`.
- **Edge cases:**
  - If total is 85 and limit is 10, totalPages = 9.
  - Last page has only 5 items.

#### Scenario 5.3 — Next page loads new data

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Observe first row order number on page 1.
  2. Click "Next page".
  3. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=2&limit=10`.
  - The first row on page 2 has a different order number from page 1.
  - 10 rows are displayed (unless on the last page).
  - Pagination text updates to "11-20 of 85".
  - Previous page button is now enabled.
- **Edge cases:**
  - The "Next page" button should be disabled on the last page.

#### Scenario 5.4 — Previous page returns to previous data

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page, on page 2.
- **Steps:**
  1. Click "Previous page".
  2. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=1&limit=10`.
  - The first row matches the original page 1 first row.
  - Pagination text reverts to "1-10 of 85".
  - Previous page button is disabled again.
- **Edge cases:**
  - The "Previous page" button should be disabled on page 1.

#### Scenario 5.5 — First page button navigates to page 1

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page, on page 3+.
- **Steps:**
  1. Click "First page" button.
  2. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=1&limit=10`.
  - Pagination text shows "1-10 of 85".
  - First and Previous buttons are disabled.
  - Table shows page 1 data.
- **Edge cases:**
  - Clicking "First page" while already on page 1 should not trigger a request.

#### Scenario 5.6 — Last page button navigates to the final page

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page, on page 1.
- **Steps:**
  1. Click "Last page" button.
  2. Wait for API response.
- **Assertions:**
  - API request fires: `GET /admin/orders?page=9&limit=10` (or whatever totalPages is).
  - Pagination text shows "81-85 of 85".
  - Next and Last buttons are disabled.
  - Table shows last page data (5 rows if total is 85).
- **Edge cases:**
  - Clicking "Last page" while already on the last page should not trigger a request.

#### Scenario 5.7 — Pagination button disabled states are correct

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Observe button states on page 1.
  2. Navigate to a middle page.
  3. Observe button states.
  4. Navigate to the last page.
  5. Observe button states.
- **Assertions:**
  - Page 1: First=disabled, Previous=disabled, Next=enabled, Last=enabled.
  - Middle page: all buttons enabled.
  - Last page: First=enabled, Previous=enabled, Next=disabled, Last=disabled.
  - Disabled buttons have `disabled=""` attribute and reduced opacity (opacity-35).
- **Edge cases:**
  - When totalPages = 1 (total <= 10), all buttons should be disabled.

#### Scenario 5.8 — Pagination boundaries (single page)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Apply a status filter that returns fewer than 10 results (e.g. "Paid" if only 1 order exists).
- **Assertions:**
  - Pagination text shows "1-1 of 1" (or similar range).
  - All four pagination buttons are disabled.
  - The single page of results is displayed.
- **Edge cases:**
  - When total = 0 (no results), pagination shows "0-0 of 0" and all buttons are disabled.

#### Scenario 5.9 — Pagination with search active

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type a search query that returns multiple pages.
  2. Click "Next page".
- **Assertions:**
  - API request includes `&page=2&limit=10&search=<query>`.
  - Pagination text shows the correct range for the filtered results.
  - Data is correct for the filtered set.
- **Edge cases:**
  - Search and pagination parameters compose correctly.

#### Scenario 5.10 — Pagination with status filter active

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Select a status filter that returns multiple pages.
  2. Click "Next page".
- **Assertions:**
  - API request includes `&page=2&limit=10&status=<STATUS>`.
  - Pagination text shows the correct range for the filtered results.
  - All rows match the selected status.
- **Edge cases:**
  - Status and pagination parameters compose correctly.

---

### 6.x — Order Detail Drawer

#### Scenario 6.1 — Clicking View Order opens a slide-over drawer

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Click the eye-icon button (`aria-label="View order ST-8RCA"`) for the first order.
  2. Wait for the drawer to appear.
- **Assertions:**
  - A slide-over drawer opens from the right side of the screen.
  - The drawer has a backdrop overlay (`fixed inset-0 z-80`).
  - The drawer panel has class containing `storaby-drawer-panel` and width `w-full sm:w-[80%] md:w-[55%] lg:w-[45%] xl:w-[35%]`.
  - URL does not change (remains `/admin/orders`).
  - API request fires: `GET /admin/orders/:mongoId`.
  - No console errors.
- **Edge cases:**
  - The drawer should not navigate to a new page.

#### Scenario 6.2 — Drawer header displays order number and status

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Observe the drawer header.
- **Assertions:**
  - The order number is displayed as a level-2 heading (e.g. "ST-8RCA").
  - The current status is displayed as a badge below the order number (e.g. "Generating Final").
  - A close button (X icon, `aria-label="Close"`) is present in the top-right of the header.
- **Edge cases:**
  - The status badge in the drawer matches the status badge in the table row.

#### Scenario 6.3 — Drawer sections are rendered correctly

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Observe the drawer body content.
- **Assertions:**
  - Three sections are visible:
    1. **Customer & Shipping Details** — heading "Customer & Shipping Details".
    2. **Book Details** — heading "Book Details".
    3. **Timeline** — heading "Timeline".
  - Sections are rendered as rounded cards with shadow.
  - The drawer body is scrollable (overflow-y-auto).
- **Edge cases:**
  - Sections may vary if data is incomplete.

#### Scenario 6.4 — Customer & Shipping Details section

- **Priority:** P1
- **Tags:** @smoke @critical
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Observe the "Customer & Shipping Details" section.
- **Assertions:**
  - Customer name is displayed (e.g. "Alex").
  - Customer email is displayed below the name (e.g. "usman+alex@geeksofkolachi.com").
  - Shipping address is displayed with a map-pin icon:
    - Address line 1 (e.g. "A-31 prem villas phase2 near safoorah chowrangi...").
    - City, postcode, country (e.g. "Karachi, 75330, GB").
  - A user icon is shown next to the customer details.
  - A map-pin icon is shown next to the address.
- **Edge cases:**
  - Address may be long and truncated.

#### Scenario 6.5 — Book Details section

- **Priority:** P1
- **Tags:** @smoke @critical
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Observe the "Book Details" section.
- **Assertions:**
  - "Story" label with the story title value (e.g. "The Glowing Envelope").
  - "Amount" label with the formatted price (e.g. "£29.99").
  - "Payment" label with the payment status badge (e.g. "Paid" in green badge with check icon).
  - Labels are on the left, values on the right.
- **Edge cases:**
  - Amount is in GBP (pence / 100 with 2 decimal places).

#### Scenario 6.6 — Book Details values match API response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Intercept `GET /admin/orders/:id` and capture the response.
  2. Observe the "Book Details" section.
- **Assertions:**
  - Story matches `response.data.storyTitle`.
  - Amount matches `£(response.data.price / 100).toFixed(2)`.
  - Payment status badge text matches `response.data.paymentStatus` in human-readable form (e.g. `PAID` → "Paid").
- **Edge cases:**
  - Payment status may differ from order status.

#### Scenario 6.7 — Timeline section

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Order detail drawer is open for an order with timeline data.
- **Steps:**
  1. Observe the "Timeline" section.
- **Assertions:**
  - The timeline is rendered as an ordered list (`<ol>`).
  - Timeline items are in chronological order.
  - Each item has:
    - A coloured circle indicator.
    - Status label text (e.g. "Order Placed", "Payment Confirmed", "AI Story Generated", "Sent to Print", "Printing", "Shipped", "Delivered").
    - A dashed connector line between items.
  - Completed/past items have filled primary-colour circles.
  - Future/upcoming items have grey circles.
  - The connector line is solid/coloured between completed items, dashed/grey for pending ones.
- **Edge cases:**
  - The timeline may show all possible statuses with some greyed out (incomplete).

#### Scenario 6.8 — Drawer close via close button

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Click the close button (`aria-label="Close"`) in the drawer header.
- **Assertions:**
  - The drawer and backdrop are removed/hidden.
  - The table is visible and interactive again.
  - URL remains `/admin/orders`.
- **Edge cases:**
  - Closing and re-opening the same order should re-fetch the data.

#### Scenario 6.9 — Drawer close via backdrop click

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Click the backdrop overlay area (outside the drawer panel).
- **Assertions:**
  - The drawer and backdrop are removed/hidden.
  - No API request fires on close.
- **Edge cases:**
  - Clicking inside the drawer panel should not close it.

#### Scenario 6.10 — Drawer close via Escape key

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Order detail drawer is open.
- **Steps:**
  1. Press the `Escape` key.
- **Assertions:**
  - The drawer and backdrop are removed/hidden.
  - No API request fires on close.
- **Edge cases:**
  - Other keys (Enter, Tab) should not close the drawer.

#### Scenario 6.11 — Opening different orders shows different data

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Open the drawer for the first order. Note the order number.
  2. Close the drawer.
  3. Open the drawer for the second order.
- **Assertions:**
  - The second order's drawer shows a different order number.
  - The customer details, story title, and amount are different.
  - API request fires for the second order: `GET /admin/orders/:secondMongoId`.
  - URL remains `/admin/orders`.
- **Edge cases:**
  - Each drawer open triggers a new API request.

#### Scenario 6.12 — Drawer data matches GET /admin/orders/:id

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Intercept `GET /admin/orders/:id` and capture the response.
  2. Observe all drawer fields.
- **Assertions:**
  - Order number heading matches `response.data.orderNumber`.
  - Status badge matches `response.data.status` in human-readable form.
  - Customer name matches `response.data.customer.customerName`.
  - Customer email matches `response.data.customer.email`.
  - Shipping address matches `response.data.customer.shippingAddress`.
  - Story title matches `response.data.storyTitle`.
  - Amount matches `£(response.data.price / 100).toFixed(2)`.
  - Payment status matches `response.data.paymentStatus` in human-readable form.
- **Edge cases:**
  - All displayed fields should be validated against the API response.

---

### 7.x — Browser Behaviour

#### Scenario 7.1 — Browser back navigates to dashboard

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page, previously navigated from dashboard.
- **Steps:**
  1. Click browser back button.
  2. Wait for URL to change.
- **Assertions:**
  - URL becomes `/admin/dashboard`.
  - Dashboard content is rendered.
  - "Dashboard" nav link is highlighted as active.
- **Edge cases:**
  - Navigation is SPA routing, not full page reload.

#### Scenario 7.2 — Browser forward returns to orders page

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, navigated back to dashboard from orders page.
- **Steps:**
  1. Click browser forward button.
  2. Wait for URL to change and page to load.
- **Assertions:**
  - URL becomes `/admin/orders`.
  - Orders page content is rendered.
  - "Monitor Orders" nav link is highlighted as active.
  - Table shows the full unfiltered list (filter/search state not preserved).
- **Edge cases:**
  - SPA routing restores the page to its default state.

#### Scenario 7.3 — Page refresh restores default state

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on orders page with a filter or search applied.
- **Steps:**
  1. Apply a status filter.
  2. Apply a search query.
  3. Navigate to page 2.
  4. Reload the page.
  5. Wait for networkidle.
- **Assertions:**
  - Search input is empty.
  - Status filter button shows "Statuses" (no filter applied).
  - Pagination shows page 1.
  - Table shows the full unfiltered order list.
- **Edge cases:**
  - Order list state is not persisted across refreshes.

#### Scenario 7.4 — Direct URL access loads orders page

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated session exists (navigate to dashboard first, then open new tab).
- **Steps:**
  1. Open a new tab.
  2. Navigate directly to `/admin/orders`.
  3. Wait for networkidle.
- **Assertions:**
  - Orders page loads correctly.
  - Table is populated with data.
  - Heading "Order Management" is visible.
- **Edge cases:**
  - Direct URL access should work with an existing auth session.

---

### 8.x — Loading Behaviour

#### Scenario 8.1 — Skeleton loaders appear while table data is loading

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, slow network (use Playwright route delay).
- **Steps:**
  1. Use `page.route` to delay the orders API response by 2-3 seconds.
  2. Navigate to the orders page.
  3. Observe the table during loading.
- **Assertions:**
  1. 5 skeleton rows are visible during loading.
  2. Each skeleton cell contains a `<div>` with `animate-pulse` class and a cream background (`bg-storaby-cream`).
  3. Skeleton cells have a fixed width (`w-24`) and height (`h-4`).
  4. Once data loads, skeleton rows are replaced with actual data rows.
  5. No console errors during loading transition.
- **Edge cases:**
  - Skeleton loading is specific to the orders table; search and filter should still be interactive.

#### Scenario 8.2 — Disabled controls during loading

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, slow network.
- **Steps:**
  1. Delay the orders API response.
  2. Navigate to orders page.
  3. Attempt to click pagination buttons, filter, or search during loading.
- **Assertions:**
  - Search input is interactive during loading.
  - Status filter button is interactive during loading.
  - Pagination buttons may be disabled until data loads — document observed behaviour.
- **Edge cases:**
  - The page should not freeze during loading.

---

### 9.x — Empty States

#### Scenario 9.1 — No search results

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Search for a value that does not match any order.
  2. Wait for API response.
- **Assertions:**
  - A single table row with `colspan="7"` contains "No orders found." message.
  - Pagination shows "0-0 of 0".
  - First, Previous, Next, and Last page buttons are all disabled.
- **Edge cases:**
  - The empty state message is centered and uses muted text colour (`text-storaby-gray`).

#### Scenario 9.2 — Filter returns no results

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Select a status that has no orders (e.g. "Shipped", "Delivered", "Cancelled", "Generation Failed", "Refunded").
  2. Wait for API response.
- **Assertions:**
  - Same empty state as Scenario 9.1: "No orders found." message.
  - Pagination shows "0-0 of 0".
  - All pagination buttons disabled.
  - Status filter button still shows the selected status name.
- **Edge cases:**
  - The empty state is identical regardless of whether triggered by search or filter.

#### Scenario 9.3 — No orders in database (if achievable)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page, with API returning empty items array.
- **Steps:**
  1. Use `page.route` to intercept `GET /admin/orders` and return an empty items array.
  2. Navigate/reload the orders page.
- **Assertions:**
  - Same empty state: "No orders found." message.
  - Pagination shows "0-0 of 0".
  - All pagination buttons are disabled.
- **Edge cases:**
  - This is an edge-case scenario; the app should handle an empty database gracefully.

---

### 10.x — Error Handling

#### Scenario 10.1 — API failure shows error state

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. Use `page.route` to block the `GET /admin/orders` API (return 500 or network error).
  2. Navigate to the orders page.
- **Assertions:**
  - An error message is displayed in the table area.
  - The error message clearly indicates that data failed to load.
  - No console errors are thrown (network errors are expected but should be handled).
  - Search and filter controls are still rendered.
- **Edge cases:**
  - The application handles API failure gracefully without full-page crash.

#### Scenario 10.2 — Order detail API failure shows error in drawer

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Use `page.route` to block `GET /admin/orders/:id`.
  2. Click a "View order" button.
- **Assertions:**
  - The drawer opens but may show an error state or loading state.
  - No console errors.
  - Closing and re-opening may retry the request.
- **Edge cases:**
  - The drawer should not remain in a loading state indefinitely.

---

### 11.x — Accessibility

#### Scenario 11.1 — Keyboard navigation: Tab order

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Press Tab repeatedly starting from the top of the page.
- **Assertions:**
  - Focus moves through: sidebar collapse button → sidebar nav links → header profile button → search input → status filter button → table action buttons → pagination controls.
  - All interactive elements receive visible focus.
  - The focus order is logical (left-to-right, top-to-bottom).
  - Tab does not trap focus in any element.
- **Edge cases:**
  - If the drawer is open, Tab should cycle within the drawer, not the background page.

#### Scenario 11.2 — Status filter keyboard interaction

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Tab to the status filter button and press Enter.
- **Assertions:**
  - The dropdown opens.
  - Arrow Up/Down navigates through options.
  - Enter selects the focused option and closes the dropdown.
  - Escape closes the dropdown without selecting.
- **Edge cases:**
  - The `aria-selected` attribute updates correctly on keyboard selection.

#### Scenario 11.3 — Pagination keyboard interaction

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page, on a middle page.
- **Steps:**
  1. Tab to each pagination button and press Enter.
- **Assertions:**
  - Each enabled pagination button is focusable and clickable via Enter/Space.
  - Disabled buttons are skipped in Tab order or have `aria-disabled="true"`.
- **Edge cases:**
  - Focus should remain on the pagination control after activation.

#### Scenario 11.4 — Screen reader announcements

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Use a screen reader or inspect ARIA attributes.
- **Assertions:**
  - Search input has a label (placeholder serves as accessible name).
  - Status filter button has `aria-label="Statuses"` and `aria-haspopup="listbox"`.
  - Status options have correct `role="option"` and `aria-selected`.
  - View order buttons have unique `aria-label` including the order number.
  - Pagination buttons have descriptive `aria-label` ("First page", "Previous page", "Next page", "Last page").
  - Table has proper `<thead>` and `<tbody>` structure.
  - The "No orders found." message is within the table and screen-reader accessible.
  - Drawer has a close button with `aria-label="Close"`.
- **Edge cases:**
  - The overview should identify any missing ARIA labels.

---

### 12.x — API/UI Data Consistency

#### Scenario 12.1 — All orders page API requests return 200

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, navigate to orders page fresh.
- **Steps:**
  1. Set up request interception for all orders-related APIs.
  2. Navigate to `/admin/orders`.
  3. Wait for all API calls to complete.
- **Assertions:**
  - `GET /admin/orders?page=1&limit=10` returns status 200.
  - Response body contains `status: 200` and `data` object with `items`, `total`, `page`, `limit`, `totalPages`.
  - No failed requests.
- **Edge cases:**
  - API responses should always contain the expected structure.

#### Scenario 12.2 — Orders list: every API field maps correctly to UI

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Intercept `GET /admin/orders?page=1&limit=10`.
  2. For every item in the response, verify the corresponding table row.
- **Assertions:**
  - `orderNumber` → "Order Number" cell text.
  - `customer.customerName` or `customer.email` → "Customer" cell text.
  - `storyTitle` or `—` → "Story" cell text (italic).
  - `price` → formatted as `£(price/100).toFixed(2)` → "Transaction" cell text.
  - `createdAt` → formatted as `DD Mon YYYY` → "Transaction Date" cell text.
  - `status` → human-readable label → "Order Status" badge text.
  - Row order matches API response order.
  - Action button `aria-label` = `"View order ${orderNumber}"`.
- **Edge cases:**
  - Verify at least the first 3 rows and the last row for consistency.

#### Scenario 12.3 — Status filtered list: all rows belong to selected status

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Intercept `GET /admin/orders?page=1&limit=10&status=PRINTING`.
  2. Observe all displayed rows.
- **Assertions:**
  - Every row's "Order Status" cell contains "Printing".
  - The number of rows matches `response.data.items.length`.
  - Each row's data (order number, customer, etc.) matches the API response.
- **Edge cases:**
  - Test with at least 2 different statuses that have data (e.g. "Printing", "Generating Final").

#### Scenario 12.4 — Order detail drawer: all fields match API

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Intercept `GET /admin/orders/:id`.
  2. Open the drawer for that order.
  3. Observe all drawer fields.
- **Assertions:**
  - `orderNumber` → drawer heading.
  - `status` → drawer status badge.
  - `customer.customerName` → Customer section name.
  - `customer.email` → Customer section email.
  - `customer.shippingAddress` → Customer section address.
  - `storyTitle` → Book Details "Story" value.
  - `price` → Book Details "Amount" value (formatted).
  - `paymentStatus` → Book Details "Payment" badge.
- **Edge cases:**
  - If customer has no shipping address, the section should handle it gracefully.

#### Scenario 12.5 — No console errors on any orders page interaction

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Collect all browser console messages during the following actions:
     - Page load.
     - Search.
     - Status filter.
     - Pagination navigation.
     - Open and close order detail drawer.
- **Assertions:**
  - No `console.error` messages are present.
  - No uncaught exceptions or unhandled promise rejections.
  - React render warnings (if any) are documented but not required to fail the test.
- **Edge cases:**
  - Console warnings from third-party libraries should be flagged in the report.

---

## Not Covered (and why)

- **Sorting** — Table columns are not sortable; no sorting controls exist.
- **Bulk actions** — No checkbox or multi-select functionality observed.
- **Export/Download** — No export button or CSV download observed.
- **Inline editing** — Table cells are not editable.
- **Order creation** — No "Create Order" button observed.
- **Order deletion** — No delete functionality observed.
- **Order comments/notes** — No notes or comments section observed.
- **Order printing** — No print button observed.
- **Notification/real-time updates** — No WebSocket or polling observed.
- **Responsive/mobile testing** — Only desktop viewport (1440×900) was explored. Mobile and tablet layouts may differ.
- **Accessibility audit (axe/core)** — No automated scan was run; manual observations only.
- **Performance testing / Lighthouse** — Functional testing only.
- **Cross-browser testing** — Only Chromium was explored.
- **Rate limiting** — Not observed on any endpoint.
- **Security scanning (XSS, SQLi)** — Out of scope.

## Page Object Extension Notes for Generator

The `OrdersPage` class (`src/pages/OrdersPage.js`) currently has locators for: `heading`, `searchInput`, `statusFilterButton`, `statusDropdown`, `statusOptions`, `tableRows`, `paginationText`, `nextPageButton`, `prevPageButton`, `pageButtons`.

The Generator should extend it with locators for:

- **Table headers** — `page.locator('table thead tr th')`
- **Table body** — individual row cells, status badges, action buttons
- **Action button per row** — `page.getByRole('button', { name: /view order/i })` — note: each has `aria-label="View order <orderNumber>"`
- **Status filter dropdown list** — `page.locator('[role="listbox"]')` and individual options `[role="option"]`
- **Pagination info text** — `page.locator('p.text-sm:has-text("of")')`
- **First page button** — `page.getByRole('button', { name: 'First page' })`
- **Last page button** — `page.getByRole('button', { name: 'Last page' })`
- **Skeleton rows** — `page.locator('table tbody tr:has(.animate-pulse)')`
- **Empty state row** — `page.locator('table tbody tr:has-text("No orders found.")')`
- **Order detail drawer** — `page.locator('[class*="drawer-panel"]')`
- **Drawer close button** — `page.getByRole('button', { name: 'Close' })`
- **Drawer sections** — customer details, book details, timeline
- **Drawer heading** — `page.locator('[class*="drawer-panel"] h2').first()`
- **Drawer status badge** — `page.locator('[class*="drawer-panel"] header .inline-flex.items-center.gap-\\[3\\.75px\\]')`

Create locators using the priority order defined in `AGENTS.md` (role > label > testid > text > CSS). All locators should be `readonly` class properties declared in the constructor.
