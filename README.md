# Storaby QA Automation

Playwright end-to-end test automation suite for the Storaby admin application, covering authentication, the admin dashboard, order management, and account settings. Includes manual test case documentation, bug tracking with Kanban integration, and Allure/HTML reporting published via GitHub Pages.

## Tech stack

- [Playwright Test](https://playwright.dev/) (`@playwright/test`) — test runner, assertions, browser automation
- **JavaScript only — no TypeScript.** All source, tests, and scripts are plain `.js` (ESM, `"type": "module"`). Note that `.github/copilot-instructions.md` describes the stack as TypeScript; that doc is aspirational/stale — treat the actual `.js` codebase as the source of truth and don't introduce `.ts` files without checking with the team first.
- [Playwright MCP](https://github.com/microsoft/playwright-mcp) — used by the custom agents in `.github/agents/` (planner, generator, healer) to drive a real browser (navigate, snapshot, click, type, screenshot, console/network inspection) while exploring the app and authoring/healing tests
- [Allure](https://allurereport.org/) — rich test reporting (`allure-playwright`)
- GitHub Actions — CI, sharded runs, Allure report deployed to GitHub Pages on `main`

## Project structure

```
src/
  fixtures/base.js       Custom test fixture (extends @playwright/test)
  pages/                 Page Object Model classes (BasePage + one per page)
  utils/config.js        Shared config (BASE_URL, API_BASE_URL)

tests/
  auth/                  Login, forgot password, session/route guard specs
  admin/Dashboard/       Dashboard widgets, navigation, responsiveness, console errors
  admin/Monitor-Orders/  Orders table, filters, search, pagination
  admin/Settings/        Profile settings and change-password flows
  data/                  JSON test data (users, settings)

specs/                   Markdown test plans (planner agent output)
ManualTestCases/         Manual test case docs, organized by feature (mirrors tests/)
Bugs/                    Markdown bug reports filed per feature
Resources/               Test fixtures/assets (images, files) used by specs

scripts/
  archive-reports.js     Archives previous playwright-report/allure-* dirs before a run
  log-kanban-bug.js      Reads a Bugs/*.md file and files it as a task via the Kanban API

.github/
  workflows/playwright.yml         CI: run tests, generate Allure report, deploy to Pages
  agents/                          Custom AI agents (planner, generator, healer) for Playwright work
  copilot-instructions.md          Project conventions AI agents must follow (aliased as AGENTS.md)
```

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
npx playwright install
```

### Configure environment

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `BASE_URL` | Base URL of the app under test (defaults to staging) |
| `API_BASE_URL` | Base URL of the API under test |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Admin credentials used by login/session tests |

> Note: `playwright.config.js` does not currently load `.env` automatically (the `dotenv` import is commented out) — export these variables in your shell, or uncomment the dotenv block in `playwright.config.js` if you need file-based loading.

## Running tests

```bash
npm test                 # archives old reports, then runs the full Playwright suite
npx playwright test      # run tests directly
npx playwright test tests/auth          # run a single directory/spec
npx playwright test --ui                # interactive UI mode
npx playwright show-report              # open the last HTML report
```

Tests run against Chromium only by default (see `playwright.config.js`); Firefox, WebKit, mobile, and branded-browser projects are pre-configured but commented out.

## Reports

```bash
npm run report:generate   # build Allure HTML report from allure-results/
npm run report:open       # open the generated Allure report
npm run report:serve      # serve raw allure-results directly
```

`npm test` runs `scripts/archive-reports.js` first, which moves any existing `playwright-report/`, `allure-results/`, and `allure-report/` into a timestamped folder under `reports-archive/` so each run starts clean.

In CI (`.github/workflows/playwright.yml`), tests run on every push/PR to `main`/`master`; on `main`, the generated Allure report is deployed to GitHub Pages.

## Bug tracking

Bugs found during testing are written as Markdown files under `Bugs/<feature>/` (see `Bugs/Template.md`). They can be filed automatically as Kanban tasks:

```bash
KANBAN_EMAIL=you@example.com KANBAN_PASSWORD=your-password node scripts/log-kanban-bug.js Bugs/admin-settings/change-password-current-new-password-same.md
```

This logs into the Kanban API and creates a task from the bug file's title/description. `KANBAN_EMAIL` and `KANBAN_PASSWORD` are **required** environment variables (the script throws if they're missing — no credentials are hardcoded). `KANBAN_BASE_URL` optionally overrides the API host; `KANBAN_PROJECT_ID` optionally pins a project (otherwise the first project returned by the API is used).

## Manual test cases

`ManualTestCases/` mirrors the automated `tests/` structure (Auth, Dashboard, Settings) with human-readable test case docs (`TC-x.y-*.md`) and per-feature test suites, used alongside the automated specs.

## Conventions for contributors (including AI agents)

Full conventions live in [`.github/copilot-instructions.md`](.github/copilot-instructions.md) (symlinked as `AGENTS.md`). Note: that file describes the stack as "Playwright TypeScript" — in practice the project is **all `.js`, no TypeScript**; follow the `.js` convention actually used in `src/` and `tests/` over the doc's wording. Highlights:

- Import `test`/`expect` from `src/fixtures/base.js`, never `@playwright/test` directly
- Page Objects: one class per page extending `BasePage`, locators declared `readonly` in the constructor, no `expect()` calls inside page objects
- Locator priority: `getByRole` → `getByLabel` → `getByTestId` → `getByText` → CSS/XPath (last resort, needs approval)
- Web-first assertions only; no `page.waitForTimeout`, no `waitForSelector`
- New tests mirror the app URL structure under `tests/`; test data comes from `tests/data/`, not inline
- Do not modify `playwright.config.js` or add dependencies without asking; never commit `.env` or auth state

Three custom Playwright agents live under `.github/agents/`:

- **playwright-test-planner** — explores the app, writes numbered Markdown plans to `specs/`
- **playwright-test-generator** — turns a plan scenario into a Playwright spec
- **playwright-test-healer** — diagnoses and fixes failing tests without weakening assertions
