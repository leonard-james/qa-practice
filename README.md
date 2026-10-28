# QA Practice

This repo is where I practice **manual** and **automated** QA. Testing is spread across three public practice sites, each focused on a different skill:

- [Socia](https://socia.ph/) — manual and automated UI testing (homepage, forms, responsiveness)
- [Sauce Demo](https://www.saucedemo.com/) — automated UI testing using the Page Object Model (login, cart)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) — API testing with Postman (CRUD on the `/posts` resource)

All testing here is light only: viewing pages, clicking links, and trying empty/invalid form inputs. Nothing destructive is submitted.

## Tools

- Manual testing — writing test cases and bug reports by hand
- [Playwright](https://playwright.dev/) — automated browser tests, using the Page Object Model pattern
- [Postman](https://www.postman.com/) — API request testing against JSONPlaceholder

## What's inside

| Area | Description | Link |
|------|-------------|------|
| Test cases | Manual test cases for the Socia homepage (TC-001 to TC-009) | [test-cases/socia-homepage.md](test-cases/socia-homepage.md) |
| Bug reports | Findings raised against the Socia site (BUG-001, BUG-002) | [bug-reports/](bug-reports/) |
| Automated tests | Playwright specs for Socia, login, and the cart | [tests/](tests/) |
| Page objects | Page Object Model classes for the Sauce Demo site | [pages/](pages/) |
| API tests | Postman collection for JSONPlaceholder CRUD operations | [postman/](postman/) |
| Screenshots | Bug evidence captured during Socia test runs | [screenshots/](screenshots/) |
| Reports | Exported Playwright reports (e.g. PDFs) | [reports/](reports/) |

## How to run

### Playwright (UI tests)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install the Playwright browsers:

   ```bash
   npx playwright install
   ```

3. Run the automated tests:

   ```bash
   npx playwright test
   ```

4. View the HTML report:

   ```bash
   npx playwright show-report
   ```

### Postman (API tests)

The API tests live in the `postman/collections/QA Practice API-1` collection and cover GET, POST, PUT, and DELETE requests on the `/posts` resource. Open the workspace in the Postman app and run the collection against `https://jsonplaceholder.typicode.com`. Each request includes test assertions that validate the status code and response body.

## Note

These sites belong to other people and are public demo/practice sites. All testing here is for learning only and the results are not official. Be respectful: do not submit destructive actions, do not spam forms, and do not put heavy load on the sites.
