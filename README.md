# QA Practice

Automated UI tests for [saucedemo.com](https://www.saucedemo.com) written with Playwright and TypeScript, plus manual test cases and bug reports I wrote while learning QA.

## What's inside
- `tests/` has Playwright tests for login (TC-001 to TC-003) and cart (TC-006, TC-012)
- `pages/` has Page Object Model classes (`LoginPage`, `CartPage`)
- `postman/` has a Postman collection (GET, POST, PUT, DELETE) for the JSONPlaceholder API, with test scripts for status codes and response data

## How to run
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install`
3. Run the tests: `npx playwright test`
4. Open the report: `npx playwright show-report`

## Running the API tests
Open Postman, import the collection from `postman/collections`, then right-click it and choose **Run collection**.