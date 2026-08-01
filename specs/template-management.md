# Test Plan: Template Management

**Target:** https://staging.storaby.com/admin/templates
**API Base:** https://api.staging.storaby.com
**Seed:** tests/seed.spec.js
**Date:** 2026-07-31

## Overview

Covers the full Template Listing (admin) page at `/admin/templates` after successful authentication: page structure, template card grid, search, Age Group / Storefront section / Visibility filters, visibility toggle (show/hide), template delete workflow, pagination, loading skeletons, empty states, error handling, accessibility, and comprehensive backend-to-UI data validation against `GET /story-templates/admin/all?page=1&limit=9`. Explored live against staging with Playwright (Chromium headless) using network capture and ARIA snapshots.

## Environment

| Property | Value |
|---|---|
| Base URL | `https://staging.storaby.com` |
| API Base | `https://api.staging.storaby.com` |
| Templates URL | `/admin/templates` |
| Login URL | `/admin/login` |
| Auth storage key | `storaby-auth` (localStorage) |
| Page size (limit) | 9 templates per page |
| Viewport explored | 1440×900 (desktop), 375×812 (mobile spot-check) |

## Test Account

- Email: `usman+admin@geeksofkolachi.com`
- Password: `Admin@123`
- Display name: `Updated Admin Name`

## API Endpoints (Template Listing)

| Endpoint | Method | Called On | Query Params |
|---|---|---|---|
| `/auth/login` | POST | Login submit | — |
| `/users` | GET | App load | — |
| `/story-templates/admin/all` | GET | Page load | `?page=1&limit=9` |
| `/story-templates/admin/all` | GET | Search | `?page=1&limit=9&search=<query>` |
| `/story-templates/admin/all` | GET | Age Group filter | `?page=1&limit=9&ageVersion=A_2_4` (or `B_4_8`) |
| `/story-templates/admin/all` | GET | Storefront filter | `?page=1&limit=9&shelfCategory=adventure_imagination` (or `life_big_moments`) |
| `/story-templates/admin/all` | GET | Visibility filter | `?page=1&limit=9&isActive=true` (or `false`) |
| `/story-templates/admin/all` | GET | Pagination | `?page=<N>&limit=9` |
| `/story-templates/:id/visibility` | PATCH | Show/Hide confirm | Body `{"isActive":true|false}` |
| `/story-templates/:id` | DELETE | Delete confirm | — |

### `GET /story-templates/admin/all?page=1&limit=9` — response shape

```json
{
  "data": {
    "items": [
      {
        "_id": "6a68677973695fdc247b4ba5",
        "name": "Gift Card Suprise",
        "genre": "Gift Celebration",
        "ageVersion": "B_4_8",
        "coverImageUrl": "https://s3.eu-west-2.amazonaws.com/...signed-url...",
        "coverPrompt": "...",
        "promptText": "...",
        "styleGuide": "...",
        "ageBandLabel": "Ages 4–8",
        "personalQuestions": [ { "key": "...", "label": "...", "placeholder": "...", "maxLength": 80, "required": true } ],
        "isActive": true,
        "sortOrder": 35,
        "shelfCategory": "adventure_imagination",
        "createdAt": "2026-07-28T08:25:29.102Z",
        "updatedAt": "2026-07-31T13:18:29.850Z"
      }
    ],
    "total": 26,
    "page": 1,
    "limit": 9,
    "totalPages": 3
  },
  "status": 200,
  "message": "Templates retrieved successfully"
}
```

### `DELETE /story-templates/:id` — success response

```json
{ "data": null, "status": 200, "message": "Story template deleted successfully." }
```

## API Response Fields vs UI (Template Card)

| API Field | UI Element | Formatting / Mapping |
|---|---|---|
| `_id` | (implicit) | Used in URL of visibility PATCH and DELETE |
| `name` | Card title | `<label>` with `line-clamp-2`, `font-semibold` |
| `name` | Cover image `alt` | `img alt="<name>"`, `aspect-square`, `object-cover` |
| `coverImageUrl` | Cover image `src` | S3 pre-signed URL (1h expiry). Compare only the path prefix, not the full signed URL |
| `ageVersion` | Age tag | `A_2_4` → "Age 2-4", `B_4_8` → "Age 4-8". UI derives from `ageVersion`, NOT `ageBandLabel` |
| `shelfCategory` | Storefront tag | `adventure_imagination` → "Adventure & Imagination", `life_big_moments` → "Life's Big Moments" |
| `isActive` | Visibility badge + toggle label | `true` → badge "Visible" (white/green, dot `#059669`) + toggle "Hide `<name>`"; `false` → badge "Hidden" (`bg-storaby-secondary`/white, amber dot) + toggle "Show `<name>`" |
| — | Edit action | Card `<article role="button" aria-label="Edit <name>">` + button `aria-label="Edit <name>"` (out of scope for scenarios) |
| — | Delete action | Button `aria-label="Delete <name>"` |
| — | `total` | Pagination text `1-9 of <total>` |

### Data-state note (observed on 2026-07-31, after one real delete)

Total = 26 templates across 3 pages (9 / 9 / 8). Age split ≈ 14 "Ages 2–4" + 12 "Ages 4–8" (derived from `ageVersion`). Categories ≈ 14 "Adventure & Imagination" + 12 "Life's Big Moments". Exactly 1 hidden template ("Music Band", age 2-4). **These counts change if staging data changes — never hardcode them; assert against the backend response at runtime.**

### Known data inconsistency

One item ("Around the World in One Day", `ageVersion: "A_2_4"`) has `ageBandLabel: "Ages 4–8"` while the UI renders "Age 2-4". The UI uses `ageVersion`. Document as a backend bug; UI assertion should use `ageVersion`.

## Page Objects Available

| Class | File |
|---|---|
| `LoginPage` | `src/pages/LoginPage.js` |
| `DashboardPage` | `src/pages/DashboardPage.js` |
| `OrdersPage` | `src/pages/OrdersPage.js` |

A `TemplatesPage` (`src/pages/TemplatesPage.js`, extending `BasePage`) does NOT exist yet. The Generator must create it and extend it for this plan's scenarios. See **Generator Notes**.

---

## Preconditions

- Staging environment reachable at `https://staging.storaby.com`.
- API reachable at `https://api.staging.storaby.com`.
- Known-good admin account: `usman+admin@geeksofkolachi.com` / `Admin@123`.
- Browser storage cleared before authentication (fresh `storaby-auth` state).
- At least 10 templates exist so pagination is testable (observed: 26).
- At least one hidden template exists to test the "Show" flow (observed: "Music Band" age 2-4).
- `page.route` interception is used wherever a destructive confirm is tested (delete) or failure is simulated, so real data is never mutated by accident.
- Tests that toggle visibility MUST restore the original state (toggle back) before ending.

---

## Scenarios

### 1.x — Page Load & Structure

#### Scenario 1.1 — Templates page loads with authenticated session

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Fresh browser context, logged out.
- **Steps:**
  1. Navigate to `/admin/login` and log in with valid credentials.
  2. Wait for redirect to `/admin/dashboard`.
  3. Click "Templates" in the sidebar.
  4. Wait for URL to become `/admin/templates`.
- **Assertions:**
  - Final URL is `/admin/templates`.
  - Heading "Template Management" is visible (h1; "Management" is italic and primary-coloured).
  - Sidebar visible with links Dashboard, Monitor Orders, Templates; "Templates" link has `aria-current="page"`.
  - Header/profile area in the top-right shows admin name and email.
  - Search input, three filter buttons (Age Group, Storefront section, Visibility), "New template" button, template grid, and pagination controls are all present in `main`.
  - The grid eventually renders cards and pagination text `1-9 of <total>`.
- **Edge cases:** Page should not redirect back to login; heading is hidden on mobile widths (`hidden md:block`).

#### Scenario 1.2 — Unauthenticated user is redirected to login

- **Priority:** P0
- **Tags:** @critical @regression
- **Preconditions:** Clean browser context, no localStorage session.
- **Steps:**
  1. Navigate directly to `/admin/templates`.
- **Assertions:**
  - Final URL is `/admin/login`.
  - Templates content is not rendered.
- **Edge cases:** Same guard applies to all `/admin/*` routes.

#### Scenario 1.3 — Templates page structure renders correctly

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page after successful load.
- **Steps:**
  1. Observe the full page structure.
- **Assertions:**
  - Left sidebar contains app logo, navigation links, and a "Collapse sidebar" button.
  - Main content contains, in order: search input → filter row (Age Group, Storefront section, Visibility, New template) → template grid → pagination.
  - Each filter button has `aria-haspopup="listbox"`, `aria-expanded`, and a chevron-down icon.
  - "New template" button is primary-styled; clicking it opens a right-side drawer dialog "Create template" (Escape closes it). **Do not create a template — the drawer is out of scope.**
  - Pagination row has `aria-label` buttons "First page", "Previous page", "Next page", "Last page".
- **Edge cases:** Structure is stable across refresh; filter `aria-controls` values are random per render (`_r_0_` etc.) and must not be relied on.

### 2.x — Template Grid & Card Data

#### Scenario 2.1 — Grid renders one card per API item, 9 per page

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Intercept `GET /story-templates/admin/all?page=1&limit=9` and capture the response.
  2. Count rendered cards (`main article`).
- **Assertions:**
  - Number of rendered cards equals `response.data.items.length` (9 on full pages).
  - `response.data.limit === 9` and `response.data.totalPages === Math.ceil(total/9)`.
  - Pagination text equals `"1-9 of <total>"`.
- **Edge cases:** Last page may render fewer than 9 cards (observed 8 on page 3 after one delete).

#### Scenario 2.2 — Every card field matches the backend response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Intercept `GET /story-templates/admin/all?page=1&limit=9` and capture `data.items`.
  2. For each rendered card, read title, cover `alt`, cover `src` prefix, age tag, category tag, badge, and action `aria-labels`.
- **Assertions:**
  - Card N's title text equals `items[N].name`.
  - Card N's `img[alt]` equals `items[N].name`.
  - Card N's image `src` starts with the `coverImageUrl` path up to the `?` query (S3 pre-signed query is time-dependent).
  - Card N's age tag equals the mapped `ageVersion` (`A_2_4`→"Age 2-4", `B_4_8`→"Age 4-8").
  - Card N's storefront tag equals the mapped `shelfCategory` (`adventure_imagination`→"Adventure & Imagination", `life_big_moments`→"Life's Big Moments").
  - Card N's badge text equals `isActive ? "Visible" : "Hidden"`.
  - Card N's action buttons have `aria-label` = `Edit <name>`, `Hide|Show <name>`, `Delete <name>`.
  - The order of cards matches the order of `data.items`.
- **Edge cases:** If `coverImageUrl` is empty the image still renders with `alt`; title uses `line-clamp-2` so long names are clamped, never truncated mid-DOM.

#### Scenario 2.3 — Visibility badge styling distinguishes Visible vs Hidden

- **Priority:** P1
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on templates page. Use "Music Band" age 2-4 (hidden) for the Hidden case.
- **Steps:**
  1. Inspect the badge element on a visible card and on the hidden card.
- **Assertions:**
  - Visible badge: white background, green text, small green dot, positioned top-left over the image.
  - Hidden badge: dark (`bg-storaby-secondary`) background, white text, amber dot.
  - Both badges contain a dot indicator with `aria-hidden="true"`.
- **Edge cases:** Badge sits on a gradient overlay so text stays readable on light covers.

#### Scenario 2.4 — Duplicate template names render as separate cards

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Read the first 9 card titles from the API response.
  2. Find a name that appears more than once (e.g. "Chocolate Factory" with different `ageVersion`).
- **Assertions:**
  - Each API item renders its own card even when names collide.
  - Duplicate-name cards are distinguishable by their age tag and by their `_id`-driven action buttons (scoped locators must target the card, not the name).
  - `getByRole('button', { name: 'Delete <name>' })` may match multiple elements; tests must scope to `article.filter({ hasText: 'Age X-Y' })`.
- **Edge cases:** Never use a bare name for a unique locator; combine name + age tag (validate the pair against the backend item).

#### Scenario 2.5 — Long template names clamp to two lines

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Inspect the longest available title from the API (e.g. "Around the World in One Day", "Generator Rex Friend or Foe").
- **Assertions:**
  - The title `label` has `-webkit-line-clamp: 2` applied.
  - The full text is present in the DOM (assert via `toContainText`, not innerText equality).
  - The card does not overflow its grid column.
- **Edge cases:** A title longer than any current template should still clamp; the tag row wraps (`flex-wrap`).

#### Scenario 2.6 — Broken cover image does not break the card

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Intercept the image request for the first card's cover and return a 404 (or abort it).
  2. Observe the card.
- **Assertions:**
  - The card still renders title, tags, badge, and action buttons.
  - The image container keeps its `aspect-square` placeholder (`bg-storaby-cream`) instead of collapsing.
  - The `img` still has the correct `alt`.
- **Edge cases:** No image → layout must not shift; no console errors beyond the expected network 404.

#### Scenario 2.7 — Responsive grid layout

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. At 1440×900 verify column count.
  2. Set viewport to 768px and to 375px, reload, verify column count and sidebar.
- **Assertions:**
  - Desktop (`lg`): 3 columns (`lg:grid-cols-3`), 9 cards visible.
  - Tablet (`sm`): 2 columns (`sm:grid-cols-2`).
  - Mobile: 1 column (`grid-cols-1`); sidebar is hidden/collapsed (hamburger pattern, no `navigation` region visible).
  - Card min-width keeps covers square and text readable at all sizes.
- **Edge cases:** Filter row wraps on mobile (`flex-wrap`); heading hides on small screens.

### 3.x — Search

#### Scenario 3.1 — Search input renders with correct placeholder

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Locate the search input.
- **Assertions:**
  - A single `input[type="search"]` with placeholder "Search templates..." is visible.
  - It has no `aria-label`/`label`; the placeholder is its accessible name (`getByPlaceholder`).
  - A search icon is present in the input container.
- **Edge cases:** Input value clears when the search is cleared.

#### Scenario 3.2 — Search is debounced and fires a single API request

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Intercept `GET /story-templates/admin/all`.
  2. Type "m", then "mu", then "mus" quickly (no pause between keystrokes).
  3. Wait ~1.5s for the debounce to settle.
- **Assertions:**
  - Exactly one request fires with `&search=mus`.
  - No request fires per keystroke.
  - Results update to match "mus" (e.g. "Music Band" ×2).
- **Edge cases:** Debounce is ~1s; rapid typing must not issue intermediate requests.

#### Scenario 3.3 — Partial and case-insensitive search

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search for "choc".
  2. Clear, then search for "CHOCOLATE".
- **Assertions:**
  - Both return the same set of cards (e.g. "Chocolate Factory" ×2).
  - Card count equals `response.data.total` for the search; card titles match `response.data.items[].name`.
- **Edge cases:** Search is a case-insensitive substring match on the server.

#### Scenario 3.4 — Search trims leading/trailing spaces

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search for `"  chocolate  "` (spaces on both sides).
- **Assertions:**
  - The request URL contains `&search=chocolate` (no spaces).
  - Results match the untrimmed query.
- **Edge cases:** The app trims client-side before sending.

#### Scenario 3.5 — Search with an exact full name

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search for a full template name from the API (e.g. "Chocolate Factory").
- **Assertions:**
  - Request contains `&search=Chocolate+Factory`.
  - All cards match that name; count equals the number of API items with that name.
- **Edge cases:** Multiple items share the same name; every matching item is shown.

#### Scenario 3.6 — Search matches name, genre, and prompt text

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search "cartoon" (matches `genre`), "adventure" (matches `genre`), and "magical" (matches `coverPrompt`/`promptText`).
- **Assertions:**
  - Results are consistent with the backend response for the same `search` param — assert against `response.data.total` and item names.
  - The search field scope includes at least `name`, `genre`, and prompt text (do not assume it is name-only).
- **Edge cases:** Search semantics are server-side; the plan deliberately does not hardcode which fields.

#### Scenario 3.7 — Search with numbers returns empty state

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search "123".
- **Assertions:**
  - Request contains `&search=123`.
  - Empty state "No templates found." is shown; pagination shows "0-0 of 0".
  - All four pagination buttons are disabled.
- **Edge cases:** No crash.

#### Scenario 3.8 — Search with special characters is URL-encoded

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search `"@#$"`.
- **Assertions:**
  - Request contains the URL-encoded query (e.g. `%40%23$`).
  - Empty state is shown; no console errors.
- **Edge cases:** Special characters must not break rendering or cause an exception.

#### Scenario 3.9 — Clearing the search restores the full list

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page; a search is applied.
- **Steps:**
  1. Search for something that filters the list.
  2. Clear the input (fill with `''`).
- **Assertions:**
  - Request fires without the `search` param: `?page=1&limit=9`.
  - Full unfiltered list returns; pagination reverts to `1-9 of <total>`.
- **Edge cases:** Clearing works both by deleting text and by native search-clear if present.

#### Scenario 3.10 — No-result search shows the "No templates found." empty state

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Search for a value that matches nothing (e.g. "zzzznonexistent12345").
- **Assertions:**
  - A `<section>` with rounded styling contains `<p>No templates found.</p>` in muted gray.
  - Pagination shows "0-0 of 0"; all pagination buttons disabled.
  - Filter buttons and search remain interactive.
- **Edge cases:** Empty state is identical whether triggered by search or filters.

#### Scenario 3.11 — A new search resets pagination to page 1

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Navigate to page 3.
  2. Type a search query.
- **Assertions:**
  - Request is `?page=1&limit=9&search=<query>` (page resets to 1).
  - Results show page 1 of the filtered set.
- **Edge cases:** Any filter change also resets page to 1.

#### Scenario 3.12 — Search persists across pagination

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Apply a search (or a filter such as Ages 2–4, 14 results) that spans multiple pages.
  2. Click "Next page".
- **Assertions:**
  - Request includes both `page=2` and the active `search`/filter params.
  - The input still shows the query; results are page 2 of the filtered set.
- **Edge cases:** Param order in the URL is `page=<N>&limit=9&search=...&ageVersion=...&shelfCategory=...&isActive=...`.

### 4.x — Age Group Filter

#### Scenario 4.1 — Age Group dropdown lists all options

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Click the "Age Group" filter button.
- **Assertions:**
  - A listbox opens with exactly three options: "All" (selected by default), "Ages 2–4", "Ages 4–8" (note: en dash "–" U+2013).
  - The selected option has `aria-selected="true"`.
  - Dropdown closes on selecting an option and on clicking outside.
- **Edge cases:** Options text uses an en dash — copy it exactly.

#### Scenario 4.2 — Selecting an age group filters the grid

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Open "Age Group" and select "Ages 2–4".
  2. Capture the response.
- **Assertions:**
  - Request is `?page=1&limit=9&ageVersion=A_2_4`.
  - Button text updates to "Ages 2–4".
  - Every rendered card shows age tag "Age 2-4"; card count equals `response.data.items.length`.
  - Pagination shows the filtered total.
- **Edge cases:** Repeat for "Ages 4–8" → `ageVersion=B_4_8`.

#### Scenario 4.3 — Age Group results match the backend response

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page, age filter applied.
- **Steps:**
  1. Intercept the filtered response for `ageVersion=A_2_4`.
  2. For the first 3 cards, compare with `response.data.items`.
- **Assertions:**
  - Each card title/age/category matches the corresponding API item.
  - Card order matches `response.data.items` order.
- **Edge cases:** Verify at least the first 3 and the last item on the page.

#### Scenario 4.4 — "All" resets the Age Group filter

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, age filter applied.
- **Steps:**
  1. Open "Age Group" and select "All".
- **Assertions:**
  - Request has no `ageVersion` param: `?page=1&limit=9`.
  - Button text reverts to "Age Group".
  - Full list returns; pagination reverts.
- **Edge cases:** Reset also clears the page number to 1.

#### Scenario 4.5 — Age Group filter combines with search

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Ages 2–4".
  2. Type a search query.
- **Assertions:**
  - Request includes both `search=<q>&ageVersion=A_2_4`.
  - Results satisfy both criteria; count matches backend.
- **Edge cases:** Changing either control keeps the other active.

#### Scenario 4.6 — Age Group filter resets after page refresh

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, age filter applied.
- **Steps:**
  1. Apply "Ages 2–4", then reload.
- **Assertions:**
  - Button text reverts to "Age Group"; grid shows the full unfiltered list.
- **Edge cases:** Filter state is not persisted to localStorage or URL.

### 5.x — Storefront Section Filter

#### Scenario 5.1 — Storefront section dropdown lists all options

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Click the "Storefront section" filter button.
- **Assertions:**
  - Options: "All" (selected), "Life's Big Moments", "Adventure & Imagination".
- **Edge cases:** Option text contains an apostrophe ("Life's").

#### Scenario 5.2 — Selecting a storefront section filters the grid

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Adventure & Imagination".
  2. Select "Life's Big Moments".
- **Assertions:**
  - "Adventure & Imagination" → `?shelfCategory=adventure_imagination`; button text updates.
  - "Life's Big Moments" → `?shelfCategory=life_big_moments`; button text updates.
  - Every card shows the matching storefront tag; counts equal the filtered backend response.
- **Edge cases:** Both categories must be covered.

#### Scenario 5.3 — "All" resets the Storefront filter

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, storefront filter applied.
- **Steps:**
  1. Select "All".
- **Assertions:**
  - No `shelfCategory` param in the request; button text reverts to "Storefront section".
- **Edge cases:** Reset returns to the full list on page 1.

#### Scenario 5.4 — Storefront filter combines with Age Group and search

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Ages 4–8" + "Life's Big Moments" + search "birthday".
- **Assertions:**
  - Request: `?page=1&limit=9&search=birthday&ageVersion=B_4_8&shelfCategory=life_big_moments` (plus any `isActive`).
  - Exactly the matching cards render (e.g. "My Special Birthday" age 4-8); count equals backend total.
- **Edge cases:** Composed params all appear in the URL.

### 6.x — Visibility Filter

#### Scenario 6.1 — Visibility dropdown lists all options

- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Click the "Visibility" filter button.
- **Assertions:**
  - Options: "All" (selected), "Visible", "Hidden".
- **Edge cases:** "All" is the default.

#### Scenario 6.2 — Filtering by "Visible" returns active templates

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Visible".
- **Assertions:**
  - Request: `?isActive=true`; button text updates to "Visible".
  - Every card shows the "Visible" badge; count equals backend `isActive=true` total (26).
- **Edge cases:** Compare total to `response.data.total`.

#### Scenario 6.3 — Filtering by "Hidden" returns inactive templates

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Hidden".
- **Assertions:**
  - Request: `?isActive=false`; button text updates to "Hidden".
  - Every card shows the "Hidden" badge and a "Show <name>" toggle.
  - Count equals backend `isActive=false` total (1 on staging: "Music Band" age 2-4).
- **Edge cases:** If zero hidden templates exist on staging, the empty state renders; assert against backend total.

#### Scenario 6.4 — "All" resets the Visibility filter

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, visibility filter applied.
- **Steps:**
  1. Select "All".
- **Assertions:**
  - No `isActive` param; button text reverts to "Visibility".
- **Edge cases:** Reset returns full list.

#### Scenario 6.5 — Combined Hidden + Age Group produces an empty state

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Select "Hidden" and "Ages 4–8" (no hidden template is in that band on staging).
- **Assertions:**
  - Request includes `isActive=false&ageVersion=B_4_8`.
  - "No templates found." empty state; "0-0 of 0"; pagination disabled.
- **Edge cases:** Empty state identical to search empty state.

### 7.x — Visibility Toggle (Show / Hide)

**WARNING:** Toggling modifies real data. Tests MUST restore the original state before finishing (toggle back), or the assertion set must be run against a disposable template.

#### Scenario 7.1 — "Show" flow makes a hidden template visible

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page, on the page containing the hidden template (filter "Hidden" for a stable target, e.g. "Music Band" age 2-4).
- **Steps:**
  1. Click "Show <name>" on the hidden card.
- **Assertions:**
  - A dialog opens with `aria-label="Make visible?"`, heading "Make visible?", and body text "Guests will be able to select this template again in the story wizard."
  - Dialog buttons: "No, Cancel" and "Yes, Show".
  - Clicking "No, Cancel" closes the dialog with NO network request and no badge change.
- **Edge cases:** Do not confirm yet — cancel path first.

#### Scenario 7.2 — Confirming "Show" updates visibility

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on the "Make visible?" dialog for a hidden template.
- **Steps:**
  1. Click "Yes, Show".
- **Assertions:**
  - `PATCH /story-templates/{id}/visibility` is sent with body `{"isActive":true}` (200).
  - A `GET /story-templates/admin/all?page=...` refresh follows.
  - Toast `role="status"` appears with text "Template is now visible."
  - The card badge changes to "Visible"; the toggle button becomes "Hide <name>".
  - **Restore:** click "Hide <name>", confirm "Yes, Hide", and assert "Template hidden from guests." so the template returns to Hidden.
- **Edge cases:** After refresh the visibility state persists (matches backend `isActive`).

#### Scenario 7.3 — "Hide" flow makes a visible template hidden

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page, on a visible card.
- **Steps:**
  1. Click "Hide <name>" on a visible card.
- **Assertions:**
  - Dialog opens with `aria-label="Hide from guests?"`, heading "Hide from guests?", body "The template stays in admin but will no longer appear in the guest theme picker."
  - Buttons: "No, Cancel" and "Yes, Hide".
  - Confirm "Yes, Hide" → `PATCH .../visibility` body `{"isActive":false}` → toast "Template hidden from guests." → badge "Hidden", toggle becomes "Show <name>".
  - **Restore:** toggle back to visible before ending.
- **Edge cases:** Only one age version is affected (deleting/hiding is per row/age-version).

#### Scenario 7.4 — Dialog close paths: cancel, backdrop, Escape

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, on a visibility or delete dialog.
- **Steps:**
  1. Open the "Hide from guests?" dialog.
  2. Click "No, Cancel" — assert closed, no request.
  3. Reopen, then click the backdrop at the screen edge (e.g. `page.mouse.click(15, 15)`) — assert closed, no request.
  4. Reopen, then press `Escape` — assert the dialog **stays open** (Escape is NOT wired for this dialog).
  5. Close via "No, Cancel".
- **Assertions:**
  - Cancel and backdrop close cleanly with no data change.
  - Escape does not close (documented behaviour; assert the dialog remains open).
- **Edge cases:** Clicking the center of the backdrop actually hits the dialog panel (backdrop button covers the full screen `inset-0`), so tests must click at the edge.

### 8.x — Delete Template

**WARNING:** Delete is irreversible in the admin panel. Real deletion must only target test-created or explicitly approved templates. The Generator should use `page.route` interception of `DELETE /story-templates/:id` for the UI-flow assertions below so no real data is removed, plus one optional real delete against an approved disposable template (see Generator Notes).

#### Scenario 8.1 — Delete button opens a confirmation dialog

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Click "Delete <name>" on any card.
- **Assertions:**
  - Dialog opens with `aria-label="Delete this template?"`.
  - Heading "Delete this template?"; body "This removes this age version from the catalogue. This action cannot be undone from the admin panel."
  - Buttons "No, Cancel" and "Yes, Delete".
  - Dialog panel is centered, max-width ~440px, modal backdrop present.
- **Edge cases:** Duplicate names — scope the delete button to the correct card (`article.filter({ hasText: ageTag })`).

#### Scenario 8.2 — Cancel delete keeps the template

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, delete dialog open.
- **Steps:**
  1. Click "No, Cancel".
- **Assertions:**
  - Dialog closes; NO `DELETE` request fires.
  - Card is still present; pagination unchanged.
- **Edge cases:** Cancelling from the visibility dialog must not delete anything either.

#### Scenario 8.3 — Backdrop click closes the delete dialog without deleting

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated, delete dialog open.
- **Steps:**
  1. Click the backdrop at the screen edge (e.g. `page.mouse.click(15, 15)`).
- **Assertions:**
  - Dialog closes; no `DELETE` request; card remains.
- **Edge cases:** Escape does NOT close the delete dialog (verified); use cancel or backdrop.

#### Scenario 8.4 — Confirm delete removes the template (route-intercepted)

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page. `page.route` intercepts `DELETE /story-templates/**` and fulfils `200 {"data":null,"status":200,"message":"Story template deleted successfully."}`.
- **Steps:**
  1. Open the delete dialog for a card whose `_id` comes from the intercepted list response.
  2. Click "Yes, Delete".
- **Assertions:**
  - `DELETE /story-templates/{_id}` is requested.
  - A `GET /story-templates/admin/all?page=<current>&limit=9` refresh fires.
  - Toast `role="status"` shows "Template deleted."
  - The deleted card is removed from the grid; the grid re-renders the remaining items.
  - Pagination total decreases by exactly 1.
  - `_id` is no longer present in the refreshed list response.
- **Edge cases:** After delete, subsequent items shift up; verify the next item's card moved into the deleted slot.

#### Scenario 8.5 — Deletion persists after reload

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** A delete was confirmed (or simulated against the real API on an approved template).
- **Steps:**
  1. Reload the templates page.
- **Assertions:**
  - The deleted template does not reappear; the total on reload matches the post-delete total.
- **Edge cases:** If using route interception, the "persistence" assertion is only meaningful for a real delete; mark accordingly.

#### Scenario 8.6 — Delete failure shows an error toast and keeps the template

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated. `page.route` intercepts `DELETE /story-templates/**` and fulfils `500 {"status":500,"message":"Delete failed"}`.
- **Steps:**
  1. Confirm a delete.
- **Assertions:**
  - Toast `role="status"` shows "Delete failed".
  - The dialog remains open; the card is still present; pagination unchanged.
  - No uncaught page errors.
- **Edge cases:** Retrying after failure should re-send the DELETE.

#### Scenario 8.7 — Deleting the last template on a filtered view shows the empty state

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated. Apply the "Hidden" filter (1 result) and intercept the DELETE to fulfil success (or delete the sole hidden template if approved).
- **Steps:**
  1. Confirm the delete of the only card in the filtered view.
- **Assertions:**
  - The card disappears; "No templates found." empty state renders.
  - Pagination shows "0-0 of 0"; all pagination buttons disabled.
- **Edge cases:** The same empty state appears after deleting the last template overall.

### 9.x — Pagination

#### Scenario 9.1 — Pagination controls render with correct disabled states

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated; backend total > 9.
- **Steps:**
  1. Observe the pagination bar on page 1.
- **Assertions:**
  - Text `<first>-<last> of <total>` (e.g. "1-9 of 26").
  - Buttons with `aria-label`: "First page", "Previous page", "Next page", "Last page".
  - On page 1: First and Previous are disabled (`disabled` + `opacity-35`); Next and Last enabled.
- **Edge cases:** Disabled buttons are not focusable targets for clicks.

#### Scenario 9.2 — Page indicator ranges are correct

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated; total > 18 (observed 26 → 3 pages).
- **Steps:**
  1. Record range on page 1, click Next, record page 2, click Last, record final page.
- **Assertions:**
  - Page 1: "1-9 of 26"; Page 2: "10-18 of 26"; Last (page 3): "19-26 of 26".
  - Formula: `first = (page-1)*9 + 1`, `last = min(page*9, total)`.
- **Edge cases:** Last page shows 8 items when total = 26.

#### Scenario 9.3 — Next/Previous load different data

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Record the first card title on page 1. Click "Next page".
- **Assertions:**
  - Request `?page=2&limit=9`; first card differs from page 1.
  - Previous becomes enabled; pagination "10-18 of 26".
  - Card count equals `response.data.items.length`.
- **Edge cases:** Next is disabled on the last page.

#### Scenario 9.4 — First/Last page buttons navigate to boundaries

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. Click "Last page" from page 1 → assert `?page=3&limit=9`, "19-26 of 26", Next/Last disabled.
  2. Click "First page" → assert `?page=1&limit=9`, "1-9 of 26", First/Previous disabled.
- **Assertions:**
  - Boundary navigation works and disabled states flip correctly.
- **Edge cases:** Clicking First while on page 1 should not fire a request (verify).

#### Scenario 9.5 — Pagination composes with search and filters

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated; a filter yields ≥ 10 results (e.g. "Ages 2–4").
- **Steps:**
  1. Apply the filter, click "Next page".
  2. Then add a search and click "Next page".
- **Assertions:**
  - URL contains `page=2&limit=9&ageVersion=A_2_4` and `page=2&limit=9&search=<q>&ageVersion=A_2_4` respectively.
  - All rows respect the active filters; the filtered total is consistent.
- **Edge cases:** Search/filter state persists across pagination; new search/filter resets to page 1.

#### Scenario 9.6 — Single-page and no-result pagination boundaries

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. Apply the "Hidden" filter (1 result) → assert "1-1 of 1", all buttons disabled.
  2. Apply a no-result search → assert "0-0 of 0", all buttons disabled.
- **Assertions:**
  - Disabled states are correct when `totalPages <= 1` and when `total === 0`.
- **Edge cases:** totalPages derived from `ceil(total/9)`.

### 10.x — Loading & Empty States

#### Scenario 10.1 — Skeleton cards render while the grid loads

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated. Delay `GET /story-templates/admin/all` by ~3s via `page.route`.
- **Steps:**
  1. Navigate to `/admin/templates`.
  2. Observe the grid during the delay.
- **Assertions:**
  - 9 skeleton placeholders render, each `animate-pulse` with a cream `aspect-square` block, a `h-4 w-2/3` bar, and a `h-6 w-24` pill.
  - No `article` cards and no images during load.
  - Pagination text placeholder shows "0-0 of 0" during load.
  - Once resolved, skeletons are replaced by real cards.
- **Edge cases:** Skeletons mirror the responsive grid columns.

#### Scenario 10.2 — Loading behaviour during search/filter changes

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated; slow network or delayed route.
- **Steps:**
  1. Delay the API route, then type a search / change a filter.
- **Assertions:**
  - The grid shows skeletons (or keeps prior cards) until the response lands — document the observed behaviour and assert it stays consistent.
  - Search input and filter buttons remain interactive during loading.
- **Edge cases:** No full-page freeze during loading.

#### Scenario 10.3 — Empty state markup for no results

- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Trigger a no-result search or filter.
- **Assertions:**
  - A `<section>` with `rounded-[20px] bg-white px-6 py-12 text-center` contains `<p>` "No templates found." in muted gray.
  - Pagination "0-0 of 0"; all pagination buttons disabled.
- **Edge cases:** Message text is exactly "No templates found." with a full stop.

#### Scenario 10.4 — API failure behaviour (observed: no error UI)

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated. `page.route` fulfils `GET /story-templates/admin/all` with 500.
- **Steps:**
  1. Navigate to `/admin/templates`.
- **Assertions:**
  - Observed: the grid stays in the skeleton state indefinitely; no error message or retry UI is shown; pagination shows "0-0 of 0".
  - Document this as a known UX gap (no error state). Assert the exact observed behaviour so a future fix is caught.
  - Filter/search controls still render.
- **Edge cases:** A 500 on the initial list has no dedicated error state; a 500 on delete does show "Delete failed" (Scenario 8.6).

#### Scenario 10.5 — Cover images load with correct dimensions

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Wait for all card images to load.
- **Assertions:**
  - Each `img` has `alt` equal to the template name and `aspect-square` intrinsic ratio.
  - `img.complete` is true for all covers; no image throws a console error.
- **Edge cases:** Signed S3 URLs expire (~1h); a fresh load regenerates them, so tests must not compare the full URL, only the path prefix.

### 11.x — Accessibility & Keyboard

#### Scenario 11.1 — Logical tab order

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Tab from the top of the page.
- **Assertions:**
  - Focus moves: sidebar collapse → nav links → profile button → search input → Age Group → Storefront section → Visibility → New template → first card (article `role="button"`, `tabindex="0"`) → its Edit/Hide/Delete buttons → next card → pagination buttons.
  - All interactive elements show visible focus.
- **Edge cases:** Card articles are focusable (`role="button"`, `tabindex="0"`).

#### Scenario 11.2 — Filter dropdown keyboard interaction

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Tab to the "Age Group" button and press Enter/Space.
  2. Use Arrow keys and Enter to select.
- **Assertions:**
  - Dropdown opens; options are `role="option"` with `aria-selected`.
  - Enter selects the focused option and closes the dropdown.
  - Escape closes the dropdown without selecting (note: Escape closes the *listbox*, unlike the confirm dialogs).
- **Edge cases:** `aria-expanded` toggles correctly.

#### Scenario 11.3 — Dialog keyboard behaviour

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** A confirm dialog is open (visibility or delete).
- **Steps:**
  1. Press Tab within the dialog.
- **Assertions:**
  - Focus is trapped inside the dialog (backdrop button → cancel → confirm).
  - Enter activates the focused button.
  - Escape does NOT close the dialog (verified behaviour) — document, do not assert close.
- **Edge cases:** Background page is inert while the dialog is open (`aria-modal="true"`).

#### Scenario 11.4 — Screen-reader names on key elements

- **Priority:** P2
- **Tags:** @regression
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Inspect ARIA attributes.
- **Assertions:**
  - Search input's accessible name comes from the placeholder "Search templates...".
  - Filter buttons have `aria-haspopup="listbox"` and accessible names "Age Group" / "Storefront section" / "Visibility".
  - Cards expose `aria-label="Edit <name>"`.
  - Toggle/delete buttons expose `Hide|Show <name>` and `Delete <name>`.
  - Pagination buttons expose "First page", "Previous page", "Next page", "Last page".
  - Toasts expose `role="status" aria-live="polite"`.
- **Edge cases:** Note any missing labels (e.g. search input relies on placeholder).

### 12.x — Backend / UI Consistency

#### Scenario 12.1 — All list requests return 200 with the expected envelope

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated.
- **Steps:**
  1. Capture every `/story-templates/admin/all` response while loading, searching, filtering, and paginating.
- **Assertions:**
  - Every response is 200 and contains `data.items`, `data.total`, `data.page`, `data.limit`, `data.totalPages`.
  - `data.limit === 9`.
- **Edge cases:** No failed requests during normal flow.

#### Scenario 12.2 — Card count and page size match the backend

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Intercept the page-1 response.
- **Assertions:**
  - Rendered card count === `data.items.length`.
  - Pagination `<last> of <total>` matches `data.total`; page count matches `data.totalPages`.
- **Edge cases:** Check on pages 1, 2 and the last page.

#### Scenario 12.3 — Search and filter results match backend filtered responses

- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. For each of: search "chocolate", `ageVersion=A_2_4`, `shelfCategory=life_big_moments`, `isActive=false`, compare UI cards with the captured response.
- **Assertions:**
  - The set of rendered titles equals `data.items[].name` in order.
  - Card count equals `data.items.length`.
- **Edge cases:** Do this for at least one search, one filter, and one combined query.

#### Scenario 12.4 — Visibility state after toggle matches the backend

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated; a show/hide toggle was performed and restored.
- **Steps:**
  1. Compare badge/toggle on the affected card with `isActive` in the refreshed list response.
- **Assertions:**
  - `isActive=true` ↔ badge "Visible" + "Hide <name>" button.
  - `isActive=false` ↔ badge "Hidden" + "Show <name>" button.
- **Edge cases:** Restore state at test teardown.

#### Scenario 12.5 — No console errors on any listing interaction

- **Priority:** P1
- **Tags:** @smoke
- **Preconditions:** Authenticated, on templates page.
- **Steps:**
  1. Collect console messages across: load, search, each filter, pagination, open/cancel dialogs.
- **Assertions:**
  - No `console.error` and no uncaught exceptions (the single expected 500-resource message is only in the deliberately broken error scenario).
- **Edge cases:** Network 404s for a deliberately broken image are expected and may be filtered.

#### Scenario 12.6 — Browser back/forward and refresh

- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Authenticated; navigated from the dashboard.
- **Steps:**
  1. Apply a search + filter, go to page 2, then reload.
  2. Click browser back (→ dashboard) then forward (→ templates).
- **Assertions:**
  - After reload: search empty, filter labels back to defaults ("Age Group", "Storefront section", "Visibility"), page 1 shown, full list returned.
  - Back → `/admin/dashboard`; forward → `/admin/templates` with the default (unfiltered) state.
- **Edge cases:** Listing state is not persisted in localStorage or URL params.

---

## Not Covered (and why)

- **New Template (Create Template drawer)** — explicitly excluded. Only its trigger button is documented (opens the "Create template" drawer, Escape closes it).
- **Edit Template** — explicitly excluded. The card and its Edit button are documented as the entry points, but no navigation to the edit page is tested.
- **Template publishing / variable mapping** — out of scope.
- **API-only tests** — the backend is used ONLY as an assertion oracle for UI values; no standalone API scenarios.
- **Sorting** — no sort controls exist on the listing.
- **Bulk actions** — no multi-select/checkbox functionality exists.
- **Deleting real, production-like templates** — the single real delete performed during exploration ("Gift Card Suprise", a likely test template, authorised by the user) permanently removed it. Automated suites must not delete production data; see Generator Notes.
- **Responsive behaviour beyond grid columns** — only 1440×900 and a 375×812 spot-check were explored.
- **axe-core automated audit** — manual ARIA observations only.
- **Cross-browser** — Chromium only (Firefox/WebKit not explored).
- **Performance/Lighthouse** — functional testing only.

## Known Risks

- **No error/empty state for initial-load API failure** — when `GET /story-templates/admin/all` fails (500), the grid stays in the skeleton state indefinitely with pagination "0-0 of 0". Tests asserting graceful error handling will fail until the app fixes this. Assert the observed behaviour so the fix is caught.
- **Escape does not close confirm dialogs** — visibility and delete dialogs ignore `Escape`. Tests must use "No, Cancel" or a backdrop edge click. If the app later adds Escape handling, these assertions will break (intended signal).
- **Duplicate template names** — multiple items share a name (differ by `ageVersion`). Bare `getByRole('button', { name })` locators are ambiguous; scope to `article.filter({ hasText: '<age tag>' })`.
- **En dash in age options** — Age Group options use "Ages 2–4" (U+2013), not a hyphen. Copy exactly or match with a regex.
- **S3 cover URLs expire (~1h)** — pre-signed URLs contain `X-Amz-Expires=3600`; never assert the full URL. Compare only the path prefix.
- **Age data inconsistency** — one template's `ageBandLabel` contradicts its `ageVersion`; the UI follows `ageVersion`. A future backend fix could change rendered tags and break assertions (intended signal).
- **Real-data drift** — totals (26), hidden count (1), and category counts change as staging data changes. Never hardcode; always compare against the runtime backend response.
- **Visibility toggles mutate real data** — tests must restore the original state or run against a disposable template to avoid leaving templates hidden/visible.

## Locator Notes

No `data-test-id` attributes exist on this page, and AGENTS.md forbids CSS/XPath without approval, so use `getByRole` first, `getByPlaceholder` for the search box, then `getByText` for genuinely static text. AGENTS.md locator priority wins over any prompt-level ordering.

| Element | Preferred Locator |
|---|---|
| Search input | `page.getByPlaceholder('Search templates...')` |
| Filter buttons | `page.getByRole('button', { name: 'Age Group' })` / `'Storefront section'` / `'Visibility'` |
| Filter option (listbox) | `page.getByRole('option', { name: 'Ages 2–4' })` — en dash; or `page.getByRole('listbox').getByRole('option', { name })` |
| New template | `page.getByRole('button', { name: 'New template' })` (opens drawer; do not create) |
| Card | `page.locator('main article')` (or `page.getByRole('button', { name: /^Edit / })`) |
| Scoped card by age | `page.locator('article').filter({ hasText: 'Age 2-4' })` — combine with name text if needed |
| Card title | `card.locator('label')` |
| Age / category tags | assert via `card` inner text, or locate the two gradient pill spans |
| Edit (out of scope) | `card.getByRole('button', { name: /^Edit / })` |
| Visibility toggle | `card.getByRole('button', { name: /^(Hide|Show) / })` |
| Delete | `card.getByRole('button', { name: /^Delete / })` |
| Pagination text | `page.locator('main').getByText(/\d+-\d+ of \d+/)` |
| Pagination buttons | `getByRole('button', { name: 'First page' | 'Previous page' | 'Next page' | 'Last page' })` |
| Confirm dialogs | `getByRole('dialog', { name: 'Delete this template?' })` / `'Make visible?'` / `'Hide from guests?'`; buttons `'No, Cancel'`, `'Yes, Delete'`, `'Yes, Show'`, `'Yes, Hide'` |
| Backdrop close | `getByRole('button', { name: 'Close dialog backdrop' })` — covers the full screen; to click it, click at a screen edge (`page.mouse.click(15, 15)`), because the panel is centered on top |
| Toast | `getByRole('status')` (react-hot-toast, class `go3958317564`, `aria-live="polite"`) |
| Empty state | `getByText('No templates found.', { exact: true })` |
| Skeleton | `page.locator('main .animate-pulse')` |

**Important locator pitfalls**
- `getByRole('button', { name: 'Edit <name>' })` matches BOTH the card article and the inner Edit button when names repeat across age versions. Always scope to a card.
- Filter `aria-controls` ids are random per render — never use them.
- The search input has no label; `getByPlaceholder` is the accessible-name route.

## Backend Mapping

| Backend value | Frontend rendering rule | Validate against |
|---|---|---|
| `data.items[].name` | Card `<label>` title + `img[alt]` | `GET /story-templates/admin/all` |
| `data.items[].coverImageUrl` | `img[src]` (compare path prefix only) | Same |
| `data.items[].ageVersion` | "Age 2-4" / "Age 4-8" pill | Same (`ageBandLabel` is NOT used by UI) |
| `data.items[].shelfCategory` | "Adventure & Imagination" / "Life's Big Moments" pill | Same |
| `data.items[].isActive` | "Visible"/"Hidden" badge; "Hide"/"Show" toggle label | Same + refresh after toggle |
| `data.items[].genre`, `coverPrompt`, `promptText` | Searchable text (server-side search scope) | `?search=<q>` results vs response |
| `data.total` | Pagination `X-Y of <total>` | Same |
| `data.totalPages` | Pagination button disabled states | Same |
| `data.limit` | Cards per page (9) | Same |
| `data.items` (count) | Rendered card count | Same |
| `DELETE /story-templates/:id` | Card removal, toast "Template deleted.", total −1 | Intercept response; real delete only on approved templates |
| `PATCH /story-templates/:id/visibility` | Badge/toggle swap, toast "Template is now visible." / "Template hidden from guests." | Intercept request body `{"isActive":...}` |

## Generator Notes

- **Create `src/pages/TemplatesPage.js`** extending `BasePage`, mirroring `OrdersPage` conventions (readonly locators in constructor, methods return `Promise<void>` or the next page object, no `expect()` inside).
- Add locators for: heading, search input, the three filter buttons + their `listbox`/`option`s, `New template` button, `cards` (`main article`), per-card title/age/category/badge/action buttons, pagination text + 4 buttons, dialogs, toasts, skeleton, empty state.
- **Import `test` from `src/fixtures/base.js`** (never `@playwright/test`), use `test.describe` per feature area, one logical assertion group per test, `test.step` for flows with 3+ actions.
- Load credentials from `tests/data/users.json` (admin block exists); don't inline or commit secrets.
- Tag tests `@smoke`, `@regression`, `@critical`; only web-first assertions; no `waitForTimeout`/`waitForSelector`.
- **Delete strategy (critical):** Do NOT delete real staging templates in the suite. For scenarios 8.4–8.7 use `page.route` to intercept `DELETE /story-templates/**` and fulfil a success/error payload, then assert the UI flow. If a real end-to-end delete is required, run it only against a disposable template created by that test run and clean up accordingly — creation of templates is out of scope, so default to route interception.
- **Visibility toggle strategy:** toggling mutates data. Prefer running show/hide scenarios against the single known hidden template ("Music Band", age 2-4) and always restore the original state (toggle back) in the same test; alternatively route-intercept the PATCH and assert UI only.
- **Age filter option text uses an en dash** ("Ages 2–4"); build option names from backend constants if possible rather than hardcoding the dash.
- Backend comparisons should be done by intercepting `/story-templates/admin/all` responses (response payload), not by calling the API separately — this keeps the suite UI-first per AGENTS.md and the prompt.
- Card titles/tags/badges: read expected values from the intercepted response's `data.items` at runtime; never hardcode names, categories, ids, counts, or image URLs.
- Emulate the confirmation dialogs exactly: open via toggle/delete button, cancel path asserts no request, confirm path asserts the expected request + toast + card change.
