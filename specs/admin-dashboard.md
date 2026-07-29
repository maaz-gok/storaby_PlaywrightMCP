# Test Plan: Storaby Admin Dashboard

**Target:** https://staging.storaby.com/admin/dashboard
**API Base:** https://api.staging.storaby.com
**Seed:** tests/seed.spec.js
**Date:** 2026-07-28

## Overview

Covers the full Admin Dashboard at `/admin/dashboard` after successful authentication: page load, sidebar navigation, admin profile menu, summary cards, revenue trend chart, orders-this-week chart, AI generation status, recent orders table, View All navigation to orders list, and comprehensive API-to-UI data validation. Explored live against staging using Playwright (Chromium headless) with network capture and DOM inspection.

## Environment

| Property | Value |
|---|---|
| Base URL | `https://staging.storaby.com` |
| API Base | `https://api.staging.storaby.com` |
| Dashboard URL | `/admin/dashboard` |
| Login URL | `/admin/login` |
| Auth storage key | `storaby-auth` (localStorage) |
| Currency | GBP (£) — values stored as pence in API, divided by 100 for display |
| Viewport explored | 1440×900 (desktop) and 375×812 (mobile) |

## Test Account

- Email: `usman+admin@geeksofkolachi.com`
- Password: `Admin@123`
- Known display name from seed: `updated admin name`

## API Endpoints (Dashboard)

| Endpoint | Method | Called On | Query Params |
|---|---|---|---|
| `/auth/login` | POST | Login submit | — |
| `/users` | GET | Dashboard load | — |
| `/admin/dashboard/summary` | GET | Dashboard load | — |
| `/admin/dashboard/revenue-trend` | GET | Dashboard load, period change | `?period=weekly` \| `?period=monthly` |
| `/admin/dashboard/orders-this-week` | GET | Dashboard load | — |
| `/admin/dashboard/ai-status` | GET | Dashboard load | — |
| `/admin/dashboard/recent-orders` | GET | Dashboard load | — |
| `/admin/orders` | GET | Orders page load | `?page=1&limit=10` |

## API Response Structures

### `GET /admin/dashboard/summary`

```json
{
  "data": {
    "totalRevenue": 172442,
    "ordersToday": 10,
    "activeCustomers": 16,
    "booksGenerated": 58
  },
  "status": 200,
  "message": "Dashboard summary retrieved successfully."
}
```

- `totalRevenue` is in **pence** (divide by 100, format as `£1,724`).
- All other fields are raw counts displayed as-is.

### `GET /admin/dashboard/revenue-trend?period=weekly`

```json
{
  "data": [
    { "period": "2026-06-09", "revenue": 0, "orders": 0 },
    { "period": "2026-06-16", "revenue": 0, "orders": 0 },
    { "period": "2026-07-28", "revenue": 23992, "orders": 8 }
  ],
  "status": 200,
  "message": "Revenue trend retrieved successfully."
}
```

- `period`: ISO date string (`YYYY-MM-DD` for weekly, `YYYY-MM` for monthly).
- `revenue`: total revenue in pence for that period.
- `orders`: total order count for that period.
- Weekly returns 8 data points (8 weeks). Monthly returns 12 data points (12 months).
- Chart x-axis labels: formatted date (e.g. `Jul 28` for weekly, month name for monthly).
- Chart y-axis: formatted revenue (e.g. `£0`, `£400`, `£800`, `£1.2k`, `£1.6k`).

### `GET /admin/dashboard/orders-this-week`

Returns **full order objects** for the current week (same structure as recent orders). The UI chart computes daily percentages client-side.

- UI chart: Sun–Sat day labels, percentage bars (0%–100%).
- Percentage per day = (orders for that day / total orders for the week) × 100.

### `GET /admin/dashboard/ai-status`

```json
{
  "data": {
    "pending": 2,
    "processing": 0,
    "failed": 37,
    "completedToday": 32
  },
  "status": 200,
  "message": "AI status retrieved successfully."
}
```

- UI labels: "Queue", "Processing", "Completed today", "Failed".
- UI displays both count (e.g. `2 stories`) and percentage (computed client-side).
- Donut chart visualizes the four values.
- Period selector shows only "Weekly" with no other options.

### `GET /admin/dashboard/recent-orders`

Returns array of 10 most recent order objects. Fields relevant to UI validation:

| API Field | UI Column | Notes |
|---|---|---|
| `orderNumber` | Order ID | e.g. `ST-I95F` |
| `customerName` or `email` | Customer | Display name shown; email used as fallback |
| `storyTitle` | Story | — |
| `price` | (hidden in dashboard, shown in orders page as "Transaction") | In pence, displayed as `£29.99` |
| `createdAt` | (hidden in dashboard) | Used in orders page as "Transaction Date" |
| `status` | Status | Rendered as a badge |

### `GET /admin/orders?page=1&limit=10`

```json
{
  "data": {
    "items": [...],
    "total": 63,
    "page": 1,
    "limit": 10,
    "totalPages": 7
  },
  "status": 200,
  "message": "Orders retrieved successfully"
}
```

- Paginated list with `items`, `total`, `page`, `limit`, `totalPages`.

## Discovered Order Statuses

| API Value | UI Label | Observed |
|---|---|---|
| `PENDING` | Pending | Yes |
| `GENERATING_FINAL` | Generating Final | Yes |
| `SUBMITTED_TO_PRINT` | Submitted To Print | Yes |
| `PRINTING` | Printing | Yes |
| `PAID` | Paid | Not observed on dashboard |
| `SHIPPED` | Shipped | Not observed on dashboard |
| `DELIVERED` | Delivered | Not observed on dashboard |
| `CANCELLED` | Cancelled | Not observed on dashboard |
| `GENERATION_FAILED` | Generation Failed | Not observed on dashboard |
| `REFUNDED` | Refunded | Not observed on dashboard |

## Page Objects Available

| Class | File |
|---|---|
| `LoginPage` | `src/pages/LoginPage.js` |
| `DashboardPage` | `src/pages/DashboardPage.js` |
| `SettingsPage` | `src/pages/SettingsPage.js` |

The `DashboardPage` currently only has a `welcomeHeading` locator. The Generator should extend it for this plan's scenarios.

---

## Preconditions

- Staging environment reachable at `https://staging.storaby.com`.
- API reachable at `https://api.staging.storaby.com`.
- Known-good admin account: `usman+admin@geeksofkolachi.com` / `Admin@123`.
- Browser storage cleared before authentication (fresh `storaby-auth` state).
- No rate-limiting observed on the auth endpoint.

---

## Scenarios

### 1.x — Authentication & Dashboard Load

#### Scenario 1.1 — Dashboard loads with authenticated session

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Fresh browser context, logged out.
- **Steps:**
  1. Navigate to `/admin/login`.
  2. Log in with valid credentials.
  3. Wait for navigation to `/admin/dashboard`.
  4. Wait for `networkidle`.
- **Assertions:**
  - Final URL is `/admin/dashboard`.
  - Page title contains "Storaby".
  - Welcome heading with text `Welcome updated!` is visible (uses admin name from auth state).
  - Sidebar is visible with links: Dashboard, Monitor Orders, Templates.
  - Header/profile section is visible in the top-right corner.
  - Summary cards section is visible with 4 cards.
  - Charts section is visible (revenue trend + orders this week).
  - AI Generation Status section is visible.
  - Recent Orders table is visible.
  - Toast message "Signed in successfully." is displayed (role="status").
  - All 5 dashboard API requests fire successfully (summary, revenue-trend, orders-this-week, ai-status, recent-orders).
  - No console errors.
- **Edge cases:**
  - Page should not redirect back to login.
  - Dashboard must render after SPA routing, not full-page reload.

#### Scenario 1.2 — Unauthenticated user is redirected to login

- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Clean browser context, no localStorage session.
- **Steps:**
  1. Navigate directly to `/admin/dashboard`.
- **Assertions:**
  - Final URL is `/admin/admin/login`.
  - Dashboard content is not rendered.
- **Edge cases:**
  - Also test `/admin/orders`, `/admin/templates`, `/admin/settings` for the same guard behavior.

#### Scenario 1.3 — Dashboard page structure renders correctly

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Observe the full page structure.
- **Assertions:**
  - Left sidebar contains the app logo/brand, navigation links (Dashboard, Monitor Orders, Templates), and a collapse button.
  - Main content area contains: welcome heading, summary cards grid (4 cards), revenue trend chart section, orders-this-week chart section, AI generation status section, recent orders table.
  - Header contains: profile avatar, admin name, admin email, and a dropdown/menu indicator.
- **Edge cases:**
  - Structure should be stable across page refreshes.

---

### 2.x — Sidebar & Navigation

#### Scenario 2.1 — Sidebar navigation links are visible and clickable

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the sidebar navigation.
- **Assertions:**
  - Navigation link "Dashboard" is present with `href="/admin/dashboard"`.
  - Navigation link "Monitor Orders" is present with `href="/admin/orders"`.
  - Navigation link "Templates" is present with `href="/admin/templates"`.
  - Dashboard link is highlighted as active (`aria-current="page"` or active class).
  - Each link is visible and clickable.
- **Edge cases:**
  - Settings page and Support Tickets are NOT in the sidebar — they are accessed from the profile dropdown.

#### Scenario 2.2 — Navigate to Monitor Orders and back to Dashboard

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click "Monitor Orders" in the sidebar.
  2. Wait for URL to become `/admin/orders`.
  3. Observe the orders page.
  4. Click "Dashboard" in the sidebar.
  5. Wait for URL to become `/admin/dashboard`.
- **Assertions:**
  - After step 1: URL is `/admin/orders`, page heading is "Order Management".
  - Monitor Orders nav item is highlighted as active.
  - Dashboard nav item is not active.
  - After step 4: URL is `/admin/dashboard`, Dashboard nav item is highlighted as active.
- **Edge cases:**
  - Navigation is client-side SPA routing (no full page reload).

#### Scenario 2.3 — Navigate to Templates and back to Dashboard

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click "Templates" in the sidebar.
  2. Wait for URL to become `/admin/templates`.
  3. Observe the templates page.
  4. Click "Dashboard" to return.
- **Assertions:**
  - URL is `/admin/templates`.
  - Page heading is "Template Management".
  - Templates nav item is highlighted as active.
  - Template cards/grid is rendered with filters (Age Group, Storefront section, Visibility), search, "New template" button, and pagination.
  - Returns to dashboard correctly.

#### Scenario 2.4 — Sidebar collapse/expand behavior

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard (desktop viewport 1440×900).
- **Steps:**
  1. Click the sidebar collapse button (aria-label "Collapse sidebar").
- **Assertions:**
  - Sidebar width reduces (observed: 88px collapsed).
  - Navigation text labels may become hidden (icons remain).
  - A corresponding expand/hamburger button becomes available.
  - Clicking the expand button restores the sidebar to full width.
- **Edge cases:**
  - Collapse state should persist or reset — document observed behavior.

#### Scenario 2.5 — Mobile hamburger menu (sidebar overlay)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated on dashboard, viewport set to 375×812 (mobile).
- **Steps:**
  1. Observe the sidebar.
  2. Click the "Open menu" hamburger button in the header.
- **Assertions:**
  - Sidebar appears as an overlay (or slides in from left) with a dark backdrop overlay.
  - Navigation links are visible and clickable.
  - Clicking a navigation link or the overlay closes the menu.
- **Edge cases:**
  - Sidebar should not overlap the header on mobile.

---

### 3.x — Admin Profile

#### Scenario 3.1 — Profile button displays admin name and email

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the profile button in the header (top-right).
- **Assertions:**
  - The profile section displays the admin avatar image.
  - The admin display name is visible (e.g. "updated admin name").
  - The admin email is visible (e.g. "usman+admin@geeksofkolachi.com").
  - The avatar `alt` attribute matches the admin name.
- **Edge cases:**
  - If no avatar is uploaded, a fallback initial should be shown.

#### Scenario 3.2 — Profile dropdown opens with Settings and Sign out

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the profile button (the area displaying name/email/avatar).
  2. Observe the dropdown menu.
- **Assertions:**
  - A dropdown menu appears with `role="menu"`.
  - Menu contains "Settings" option.
  - Menu contains "Sign out" option.
  - Admin name and email are displayed at the top of the dropdown.
- **Edge cases:**
  - Clicking outside the dropdown or pressing Escape should close it.

#### Scenario 3.3 — Click Settings navigates to settings page

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the profile button to open the dropdown.
  2. Click "Settings" in the dropdown.
- **Assertions:**
  - URL changes to `/admin/settings`.
  - Settings page heading "Profile Settings" is visible.
  - Both "Profile Settings" and "Change Password" tabs are present.
- **Edge cases:**
  - Navigation should be SPA routing.

#### Scenario 3.4 — Sign out clears session and redirects to login (if safely testable)

- **Priority:** P1
- **Tags:** @critical @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the profile button to open the dropdown.
  2. Click "Sign out".
  3. Wait for navigation.
- **Assertions:**
  - URL becomes `/admin/login`.
  - `localStorage['storaby-auth']` is null or removed.
  - Navigating to `/admin/dashboard` redirects back to login.
- **Edge cases:**
  - Sign out should not throw console errors.
  - If sign out triggers a confirmation dialog, document and handle it.

---

### 4.x — Dashboard Summary Cards

#### Scenario 4.1 — All four summary cards are displayed

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard, all API calls complete.
- **Steps:**
  1. Observe the summary cards section at the top of the dashboard.
- **Assertions:**
  - Four cards are displayed in a grid layout.
  - Card titles (as `<label>` elements) are: "Total Revenue", "Orders Today", "Active Customers", "Books Generated".
  - Each card displays a formatted value.
  - Each card displays an icon (TrendingUp, ShoppingCart, Users, BookOpen).
  - Cards do not overlap and are properly spaced.
- **Edge cases:**
  - Card layout adapts at different viewports (1 column on mobile, 2 on tablet, 4 on desktop).

#### Scenario 4.2 — Total Revenue displays correct formatted value

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/summary` via API.
  2. Read the `totalRevenue` field from the response.
  3. Observe the "Total Revenue" card value in the UI.
- **Assertions:**
  - UI displays `totalRevenue / 100` formatted as British pounds with `£` prefix and comma separators.
  - Example: `totalRevenue: 172442` → UI shows `£1,724`.
  - The formatted value matches: `£` + (totalRevenue / 100).toLocaleString(`en-GB`, {minimumFractionDigits: 0, maximumFractionDigits: 0}).
- **Edge cases:**
  - Zero revenue should display `£0`.
  - Large values should be formatted with commas (e.g. `£12,345`).

#### Scenario 4.3 — Orders Today displays correct value

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/summary`.
  2. Read `ordersToday`.
  3. Observe the "Orders Today" card value.
- **Assertions:**
  - UI value matches `String(ordersToday)`.
  - Example: `ordersToday: 10` → UI shows `10`.

#### Scenario 4.4 — Active Customers displays correct value

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/summary`.
  2. Read `activeCustomers`.
  3. Observe the "Active Customers" card value.
- **Assertions:**
  - UI value matches `String(activeCustomers)`.

#### Scenario 4.5 — Books Generated displays correct value

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/summary`.
  2. Read `booksGenerated`.
  3. Observe the "Books Generated" card value.
- **Assertions:**
  - UI value matches `String(booksGenerated)`.

#### Scenario 4.6 — Summary cards are not clickable

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Attempt to click each summary card.
- **Assertions:**
  - Cards do not contain links or click handlers.
  - No navigation occurs on click.
- **Edge cases:**
  - Cards are purely informational display components.

---

### 5.x — Revenue Trend

#### Scenario 5.1 — Revenue Trend section renders with correct title and period selector

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the Revenue Trend section.
- **Assertions:**
  - Section title is "Weekly Revenue Trend" (when period is weekly).
  - A period selector button with the currently selected period label ("Weekly" by default) is visible in the section header.
  - Clicking the period button opens a dropdown with "Weekly" and "Monthly" options.
  - A chart (Recharts SVG) is rendered in the section body.
- **Edge cases:**
  - Period selector is a custom dropdown, not a native `<select>`.

#### Scenario 5.2 — Revenue chart displays correct x-axis labels (weekly)

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard, revenue data exists.
- **Steps:**
  1. Call `GET /admin/dashboard/revenue-trend?period=weekly`.
  2. Read the `data` array.
  3. Observe the chart's x-axis labels.
- **Assertions:**
  - The number of x-axis labels matches the number of data points in the API response.
  - Each label is a formatted date derived from `data[i].period` (ISO date `YYYY-MM-DD` → `Mon D` format, e.g. `2026-07-28` → `Jul 28`).
  - Labels are in chronological order.
- **Edge cases:**
  - If response has 8 items, chart should show 8 x-axis labels.

#### Scenario 5.3 — Revenue chart displays correct y-axis values

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard, revenue data exists.
- **Steps:**
  1. Observe the chart's y-axis.
- **Assertions:**
  - Y-axis shows formatted revenue values using abbreviated notation: `£0`, `£400`, `£800`, `£1.2k`, `£1.6k`.
  - Tick interval is appropriate for the data range.

#### Scenario 5.4 — Revenue chart data points reflect API response values

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/revenue-trend?period=weekly`.
  2. For each data point in the API response, observe the corresponding chart bar/line height.
- **Assertions:**
  - Each data point's visual height/position corresponds to `data[i].revenue / 100` in pounds.
  - Zero-revenue periods display a flat line / zero-height bar.

#### Scenario 5.5 — Switch period from Weekly to Monthly

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the period selector button (shows "Weekly").
  2. Click the "Monthly" option from the dropdown.
  3. Wait for the network request to complete.
- **Assertions:**
  - A new API request fires: `GET /admin/dashboard/revenue-trend?period=monthly`.
  - Section title updates to "Monthly Revenue Trend".
  - Period selector button now shows "Monthly".
  - Chart re-renders with monthly data (12 data points for 12 months).
  - X-axis labels show month names (e.g. "January", "February") derived from `YYYY-MM` periods.
- **Edge cases:**
  - Switching back to "Weekly" should re-request weekly data and restore the original title.

#### Scenario 5.6 — Revenue chart tooltip on hover (if available)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard, revenue chart visible.
- **Steps:**
  1. Hover over a data point or bar in the revenue chart.
- **Assertions:**
  - A tooltip appears showing the period label and the revenue value.
  - Tooltip content matches the corresponding API data point.
  - Tooltip values are formatted in the same currency format.

#### Scenario 5.7 — No duplicate or unnecessary API requests when changing period

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Set up request interception for `/admin/dashboard/revenue-trend`.
  2. Switch period to Monthly.
  3. Switch period back to Weekly.
- **Assertions:**
  - Exactly 2 requests fire (one for monthly, one for weekly).
  - No duplicate requests for the same period.
  - No stale data displayed (UI updates after each request).

---

### 6.x — Orders This Week Chart

#### Scenario 6.1 — Orders This Week section renders with correct title

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the "Order this week" section (positioned beside/under the revenue trend chart).
- **Assertions:**
  - Section title is "Order this week".
  - A bar chart is rendered with 7 bars (one per day, Sunday–Saturday).
  - Y-axis shows percentage values: 0%, 20%, 40%, 60%, 80%, 100%.
  - X-axis shows day labels: Sun, Mon, Tue, Wed, Thu, Fri, Sat.
- **Edge cases:**
  - Chart uses percentages, not raw counts.

#### Scenario 6.2 — Orders This Week bar heights reflect API data

- **Priority:** P1
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/orders-this-week`.
  2. Compute the expected per-day percentage: count orders per day based on `createdAt` date, then `dayCount / totalOrders * 100`.
  3. Observe the chart bars.
- **Assertions:**
  - Each bar's height (percentage) matches the client-side computed percentage from the API data.
  - Days with zero orders show a flat/minimal bar (0%).
  - The sum of all percentages should be `~100%` (rounded).
- **Edge cases:**
  - If all orders fall on a single day, that day's bar is 100% and all others are 0%.

#### Scenario 6.3 — Orders This Week tooltip on hover

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Hover over a bar in the Orders This Week chart.
- **Assertions:**
  - A tooltip appears showing the day name and the percentage value.
  - Tooltip shows correct data for the hovered day.

---

### 7.x — AI Generation Status

#### Scenario 7.1 — AI Generation Status section renders with correct elements

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the "AI Generation Status" section.
- **Assertions:**
  - Section title is "AI Generation Status".
  - A period selector showing "Weekly" is present (no other options available).
  - Four status items are displayed: "Queue", "Processing", "Completed today", "Failed".
  - Each status item shows a numeric count (e.g. "2 stories", "0 stories", "32 stories", "37 stories").
  - Each status item shows a percentage (e.g. "2.8%", "0%", "45.1%", "52.1%").
  - A donut (pie) chart visualizes the four values with matching colors.
  - A legend with color indicators is visible.

#### Scenario 7.2 — AI Status counts match API response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/ai-status`.
  2. Read `pending`, `processing`, `failed`, `completedToday`.
  3. Observe the UI values.
- **Assertions:**
  - "Queue" count matches `pending`.
  - "Processing" count matches `processing`.
  - "Completed today" count matches `completedToday`.
  - "Failed" count matches `failed`.

#### Scenario 7.3 — AI Status percentages are calculated correctly

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/ai-status`.
  2. Compute: `total = pending + processing + completedToday + failed`.
  3. Compute expected percentages: `pendingPct = (pending / total * 100)`, etc.
  4. Observe the UI percentages.
- **Assertions:**
  - Each displayed percentage matches the expected value (within rounding tolerance, e.g. ±0.1%).
  - The sum of all displayed percentages equals 100% (within rounding tolerance).
- **Edge cases:**
  - If all values are zero, all percentages should be 0% (handle division by zero gracefully).

#### Scenario 7.4 — AI Status donut chart visualizes ratios correctly

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Observe the donut chart.
- **Assertions:**
  - Four segments are rendered.
  - Segment sizes visually correspond to the displayed percentages.
  - Each segment's color matches the corresponding legend item.

#### Scenario 7.5 — AI Status period selector has only Weekly option

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the period selector button in the AI Status section header.
- **Assertions:**
  - The dropdown contains only one option: "Weekly".
  - Selecting "Weekly" does not trigger a new API request (data is already loaded).
- **Edge cases:**
  - The period selector may be non-interactive (disabled/display-only). Document observed behavior.

---

### 8.x — Recent Orders

#### Scenario 8.1 — Recent Orders table renders with correct headers

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Locate the "Recent Orders" section.
- **Assertions:**
  - Section title is "Recent Orders".
  - A "View All" button is visible in the section header.
  - Table headers are: "Order ID", "Customer", "Story", "Status", "Action".
  - The table displays up to 10 rows.
  - Each row has a visible action button (aria-label "Order actions").
- **Edge cases:**
  - "Order ID" may be labeled "Order Number" — use the exact discovered label.

#### Scenario 8.2 — Recent Orders data matches API response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/recent-orders`.
  2. For each order in the API response, observe the corresponding table row.
- **Assertions:**
  - "Order ID" column displays `orderNumber` (e.g. `ST-I95F`).
  - "Customer" column displays `customerName` (fallback to `email` if customerName is null/empty).
  - "Story" column displays `storyTitle` (italicized, fallback to `—` if null).
  - "Status" column displays a styled badge matching the `status` field. Badge color/text:
    - `PENDING` → "Pending" (likely gray/yellow)
    - `GENERATING_FINAL` → "Generating Final" (likely blue)
    - `SUBMITTED_TO_PRINT` → "Submitted To Print" (likely teal)
    - `PRINTING` → "Printing" (likely indigo)
    - Delivered/Shipped → green variants
    - Failed/Cancelled → red variants
  - The number of displayed rows matches the number of items in the API response (up to 10).
  - Row order matches the API response order (most recent first).
- **Edge cases:**
  - If `storyTitle` is empty, display should show `—`.
  - If `customerName` is empty, display falls back to `email`.

#### Scenario 8.3 — Recent Orders action button is present for each row

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Observe the "Action" column for each row.
- **Assertions:**
  - Each row contains an eye-icon button with `aria-label="Order actions"`.
  - Clicking the button opens an order detail overlay/drawer (need to confirm behavior).
  - The overlay can be closed by clicking outside or pressing Escape.
- **Edge cases:**
  - If clicking the action button navigates to a detail page instead of an overlay, document the destination URL.

#### Scenario 8.4 — "View All" navigates to orders management page

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Click the "View All" button in the Recent Orders section header.
  2. Wait for URL to change.
- **Assertions:**
  - URL becomes `/admin/orders`.
  - Page heading is "Order Management".
  - "Monitor Orders" sidebar item is highlighted as active.
  - The orders page shows a full table with additional columns: "Transaction", "Transaction Date".
  - The orders page has a search input (placeholder "Search anything...").
  - The orders page has a "Statuses" filter dropdown.
  - The orders page has pagination showing e.g. "1-10 of 63".
  - Row-level action buttons ("Order actions") are also present.
- **Edge cases:**
  - The "View All" button should not open a new tab.

#### Scenario 8.5 — Orders page status filter

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page (`/admin/orders`).
- **Steps:**
  1. Click the "Statuses" filter button.
- **Assertions:**
  - A dropdown opens with all order status options: Pending, Paid, Generating Final, Submitted To Print, Printing, Shipped, Delivered, Cancelled, Generation Failed, Refunded.
  - Selecting a status filters the table and triggers a new API request (`GET /admin/orders?page=1&limit=10&status=<STATUS>`).
  - The table updates to show only matching orders.
- **Edge cases:**
  - Selecting "All" or clearing the filter restores the full list.

#### Scenario 8.6 — Orders page search

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page.
- **Steps:**
  1. Type a search query in the search input (placeholder "Search anything...").
- **Assertions:**
  - Typing triggers a new API request with `search` param: `GET /admin/orders?page=1&limit=10&search=<query>`.
  - The table updates to show matching results.
- **Edge cases:**
  - Search should debounce and not fire on every keystroke.

#### Scenario 8.7 — Orders page pagination

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on orders page with enough orders for pagination (> 10).
- **Steps:**
  1. Observe the pagination controls at the bottom of the page.
- **Assertions:**
  - Pagination shows current page and total pages (e.g. "1-10 of 63").
  - Next/previous buttons or page numbers are clickable.
  - Clicking page 2 triggers: `GET /admin/orders?page=2&limit=10`.
  - The table updates to show the next page of results.
- **Edge cases:**
  - On the last page, the "Next" button should be disabled.
  - On the first page, the "Previous" button should be disabled.

---

### 9.x — API/UI Data Consistency

#### Scenario 9.1 — All dashboard API requests return 200

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, navigate to dashboard fresh.
- **Steps:**
  1. Set up request interception for all 5 dashboard APIs.
  2. Navigate to `/admin/dashboard`.
  3. Wait for all API calls to complete.
- **Assertions:**
  - `GET /admin/dashboard/summary` returns status 200.
  - `GET /admin/dashboard/revenue-trend?period=weekly` returns status 200.
  - `GET /admin/dashboard/orders-this-week` returns status 200.
  - `GET /admin/dashboard/ai-status` returns status 200.
  - `GET /admin/dashboard/recent-orders` returns status 200.
  - `GET /users` returns status 200.
  - All responses contain a `status: 200` field in the JSON body.
- **Edge cases:**
  - Any failed request should not break the entire page (graceful degradation — see error states).

#### Scenario 9.2 — Revenue Trend weekly data: API values match chart content

- **Priority:** P1
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/revenue-trend?period=weekly`.
  2. Read the `data` array.
  3. Capture the chart's rendered data points (via SVG elements or Recharts internal state).
- **Assertions:**
  - The number of chart data points equals `data.length`.
  - Each data point's revenue value matches `data[i].revenue / 100`.
  - Each data point's period label matches the formatted `data[i].period`.
- **Validation method:**
  - Use Recharts custom attributes (e.g. `data-testid` or inspect SVG `text` elements for x-axis labels) — if not available, compare count and visible text content.

#### Scenario 9.3 — Revenue Trend monthly data: API values match chart content

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Switch period to Monthly.
  2. Call `GET /admin/dashboard/revenue-trend?period=monthly`.
  3. Compare API response with chart.
- **Assertions:**
  - Chart shows 12 data points (one per month).
  - Revenue values match `data[i].revenue / 100`.
  - Period labels are month names derived from `YYYY-MM` format.
- **Edge cases:**
  - Month name order should be chronological (Jan–Dec).

#### Scenario 9.4 — Orders This Week: computed percentages vs UI chart

- **Priority:** P1
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/orders-this-week`.
  2. Group orders by day of week (using `createdAt` date).
  3. Compute per-day percentages.
  4. Capture the chart's bar heights/percentages.
- **Assertions:**
  - Each bar's percentage matches the computed value (±1% rounding tolerance).
  - Sunday's bar corresponds to orders with Sunday's date, etc.
- **Edge cases:**
  - If API returns 0 orders, all bars should be 0% (empty state).

#### Scenario 9.5 — Recent Orders: API fields map to UI columns

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Call `GET /admin/dashboard/recent-orders`.
  2. For the first 3 orders in the response, read the table rows.
- **Assertions:**
  - Row 1: Order ID = `data[0].orderNumber`, Customer = `data[0].customerName`, Story = `data[0].storyTitle`.
  - Row 2 (if exists): matches `data[1]`.
  - Status badge text uses the human-readable label for `data[i].status` (e.g. `GENERATING_FINAL` → "Generating Final").
  - Row order is identical to API response order.
  - Action button `aria-label` contains the order number.

#### Scenario 9.6 — Total Revenue consistency between summary card and revenue trend

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Read "Total Revenue" from the summary card.
  2. Sum all `revenue` values from the weekly revenue trend API.
  3. Compare.
- **Assertions:**
  - The total revenue summary card value equals the sum of weekly revenue trend values (both in pence, divided by 100).
- **Edge cases:**
  - If revenue trend only covers partial data, the match may not be exact — note this as an assumption.

---

### 10.x — Loading, Empty & Error States

#### Scenario 10.1 — Skeleton loading states appear during data fetch

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, first visit or clear cache. Slow network simulation may be needed.
- **Steps:**
  1. Navigate to dashboard with network throttling (e.g. `Slow 3G`).
  2. Observe the initial render before APIs complete.
- **Assertions:**
  - Summary cards show animated pulse placeholders (class contains `animate-pulse`) instead of values while loading.
  - Charts show loading skeletons or placeholders.
  - "No recent orders." empty message is shown while loading.
- **Note:** Loading states are too fast on fast connections to observe reliably. Use Playwright's `page.route` to delay API responses if testing loading states.

#### Scenario 10.2 — Empty state: No orders-this-week data

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Use `page.route` to intercept `orders-this-week` and return empty array `{ "data": [], "status": 200 }`.
  2. Navigate/reload dashboard.
- **Assertions:**
  - The Orders This Week chart shows empty/zeroed bars.
  - No error message is displayed — the chart handles empty data gracefully.
- **Edge cases:**
  - This is an edge-case scenario; daily data will fluctuate.

#### Scenario 10.3 — Empty state: No revenue data

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Use `page.route` to intercept `revenue-trend` and return empty array.
  2. Navigate/reload dashboard.
- **Assertions:**
  - Revenue chart shows empty/zeroed state.
  - No visual error is displayed.

#### Scenario 10.4 — Empty state: No AI generation records

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Use `page.route` to intercept `ai-status` and return `{ "data": { "pending": 0, "processing": 0, "failed": 0, "completedToday": 0 }, "status": 200 }`.
  2. Navigate/reload dashboard.
- **Assertions:**
  - AI status shows all counts as 0.
  - All percentages show 0%.
  - Donut chart may show an empty circle or equal segments.
- **Edge cases:**
  - Division by zero should not cause console errors.

#### Scenario 10.5 — Empty state: No recent orders

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Use `page.route` to intercept `recent-orders` and return empty array.
  2. Navigate/reload dashboard.
- **Assertions:**
  - The Recent Orders table shows "No recent orders." empty message.
  - No table rows are rendered.

#### Scenario 10.6 — API failure: Error message displayed in dashboard

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. Use `page.route` to block one of the dashboard APIs (e.g. return 500 for `summary`).
  2. Navigate/reload dashboard.
- **Assertions:**
  - An inline error message is displayed in the dashboard content area: "Some dashboard data failed to load. Check that the API is running and you are signed in as an admin."
  - The rest of the page (other sections) still renders.
  - The specific section whose API failed may show a broken/empty state.
- **Edge cases:**
  - The application handles individual API failures gracefully without full-page crash.

---

### 11.x — Responsive Behavior

#### Scenario 11.1 — Desktop layout (1440×900)

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, viewport 1440×900.
- **Steps:**
  1. Observe the dashboard layout.
- **Assertions:**
  - Sidebar is visible and expanded.
  - Summary cards are in a 4-column grid.
  - Revenue Trend and Orders This Week are side-by-side in a 2-column grid.
  - AI Generation Status and Recent Orders are side-by-side.
  - All content fits without horizontal scrolling.
  - Each section is within its designated column.

#### Scenario 11.2 — Tablet layout (768×1024)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, viewport 768×1024.
- **Steps:**
  1. Observe the dashboard layout.
- **Assertions:**
  - Summary cards wrap to 2 columns.
  - Revenue Trend and Orders This Week stack vertically.
  - AI Generation Status and Recent Orders stack vertically.
  - Sidebar may be collapsed by default or still visible.

#### Scenario 11.3 — Mobile layout (375×812)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, viewport 375×812.
- **Steps:**
  1. Observe the dashboard layout.
- **Assertions:**
  - Sidebar is hidden by default (accessible via hamburger "Open menu" button).
  - Summary cards are in a single column.
  - All sections stack vertically.
  - Revenue chart and orders chart are full width.
  - Recent Orders table may have horizontal scroll or truncated columns.
  - Profile button in header may be simplified (avatar only or icon).
  - "Open menu" hamburger button is visible in the header.
  - Tapping "Open menu" shows the sidebar as an overlay with a backdrop.

---

### 12.x — Error Boundaries & Console

#### Scenario 12.1 — No console errors on dashboard load

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on dashboard after full load.
- **Steps:**
  1. Collect all browser console messages (logs, warnings, errors) during dashboard load.
- **Assertions:**
  - No console errors (`console.error`) are present.
  - No uncaught exceptions or unhandled promise rejections.
  - React render warnings (if any) are documented but not required to fail the test.
- **Edge cases:**
  - Console warnings from third-party libraries (e.g. Recharts) should be flagged in the report but not fail the test.

#### Scenario 12.2 — No console errors on period switch

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Switch revenue period from Weekly to Monthly.
  2. Collect console messages.
- **Assertions:**
  - No console errors during period switch.
  - Chart re-renders without requesting stale data or causing React state warnings.

#### Scenario 12.3 — No console errors on navigation

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on dashboard.
- **Steps:**
  1. Navigate to orders page, then templates, then back to dashboard.
  2. Collect console messages during all navigations.
- **Assertions:**
  - No console errors on any SPA route transition.

---

## Not Covered (and why)

- **Forgot password / reset flow** — covered in the login spec plan.
- **Profile image upload** — covered in the settings spec plan.
- **Change password flow** — covered in the settings spec plan.
- **Template management CRUD** — out of scope for dashboard plan.
- **Support tickets page** — no sidebar link was found; not explored.
- **Order detail page/overlay** — action button behavior was noted but not fully explored; document observed behavior during Generator implementation.
- **Rate limiting** — not observed on any endpoint.
- **Performance testing / Lighthouse** — functional testing only.
- **Accessibility audit (axe/core)** — no automated scan was run; manual observations only.
- **Security scanning (XSS, SQLi)** — out of scope.
- **Cross-browser testing** — only Chromium was explored. Other browsers (Firefox, Safari) should be verified.
- **CI/CD integration** — not relevant to functional test plan.

## Page Object Extension Notes for Generator

The `DashboardPage` class (`src/pages/DashboardPage.js`) currently only has:
- `welcomeHeading` — `page.getByRole('heading', { name: /^Welcome / })`

The Generator should extend it with locators for:
- Sidebar navigation links
- Profile button and dropdown
- Summary cards (individual card title + value locators)
- Revenue trend section (chart, period selector)
- Orders this week section (chart)
- AI generation status section (counts, percentages, donut chart)
- Recent Orders table (rows, cells, action buttons)
- Toast/status messages

Create locators using the priority order defined in `AGENTS.md` (role > label > testid > text > CSS). All locators should be `readonly` class properties declared in the constructor.
