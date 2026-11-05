# Quantios QA Assessment

Automated UI and API tests for https://qainterview.netlify.app

## Repository contents

| Path | Description |
|------|-------------|
| `playwright/tests/qa-assessment.spec.ts` | Playwright UI test: successful login |
| `playwright/playwright.config.ts` | Playwright configuration |
| `QA Assessment.postman_collection.json` | Postman collection for the Watchlist API |

## 1. UI test (Playwright)

**Scenario:** a user logs in successfully and lands on the dashboard.

Checks:
- URL changes to the dashboard page
- Greeting shows the logged-in username
- Logout button is visible
- "Stock Market Dashboard" heading is visible

**Prerequisites:** Node.js 18 or later

**Run:**
```bash
cd playwright
npm install
npx playwright install
npx playwright test --headed
```

To view the HTML report afterwards:
```bash
npx playwright show-report
```

> On Windows PowerShell, if `npx` is blocked by the execution policy, use `npx.cmd` instead.

## 2. API tests (Postman)

Base URL: `https://qainterview.netlify.app/.netlify/functions`

| Request | Method and endpoint | Expected |
|---------|---------------------|----------|
| GET 200 | `GET /watchlist_get?username=Steven` | 200, array of watchlist items |
| GET 404 | `GET /watchlist_get?username=slimkm` | 404, user not found |
| POST 201 | `POST /watchlist_post` with a valid body | 201, added to watchlist |
| POST 400 | `POST /watchlist_post` with a required field missing | 400, missing required fields |
| POST 404 | `POST /watchlist_post` with an unknown username | 404, user not found |

**Run:**
1. Open Postman and click **Import**, then select `QA Assessment.postman_collection.json`.
2. Right-click the **QA Assessment** folder and choose **Run folder**.
3. Each request has post-response tests (status code, response time, body checks), and the results show as pass or fail in the Runner.
