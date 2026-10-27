# QA Practice

This repo is where I practice **manual** and **automated** QA. The practice site is [https://socia.ph/](https://socia.ph/). Testing here is light only: viewing pages, clicking links, and trying empty/invalid form inputs. Nothing destructive is submitted.

## Tools

- Manual testing — writing test cases and bug reports by hand
- [Playwright](https://playwright.dev/) — automated browser tests

## What's inside

| Area | Description | Link |
|------|-------------|------|
| Test cases | Manual test cases for the Socia homepage | [test-cases/socia-homepage.md](test-cases/socia-homepage.md) |
| Bug reports | Bug report templates and findings | [bug-reports/](bug-reports/) |
| Automated tests | Playwright tests for the Socia site | [tests/](tests/) |
| Reports | Exported Playwright reports (e.g. PDFs) | [reports/](reports/) |

## How to run

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

## Note

The site [https://socia.ph/](https://socia.ph/) belongs to someone else. All testing here is for learning only and the results are not official. Be respectful: do not submit destructive actions, do not spam forms, and do not put heavy load on the site.
