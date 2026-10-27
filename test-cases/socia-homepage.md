# Socia Homepage — Manual Test Cases

## Header

| Field | Value |
|-------|-------|
| Tested by | Kiro (automated via Playwright) |
| Date | 2026-10-27 |
| Browser | Chromium (Desktop Chrome, Playwright 1.64.1) |
| Device | Desktop |
| Site | https://socia.ph/ |

## Test cases

| ID | Title | Steps | Expected Result | Actual Result | Status |
|----|-------|-------|-----------------|---------------|--------|
| TC-001 | Homepage loads | 1. Open https://socia.ph/ | Page loads without errors and content is visible | Page loaded with no JS console errors. `<body>` is visible. | ✅ Pass |
| TC-002 | Page title is correct | 1. Open the site<br>2. Check the browser tab | Tab shows "Socia \| Custom Business Systems & Automation" | Tab shows **"Welcome to Socia"** — does not match the expected title. | ❌ Fail → BUG-001 |
| TC-003 | Navigation links work | 1. Click each link in the nav bar | Each link goes to the correct page or section | All 6 nav links returned HTTP 200: Services, Projects, Blogs, Careers, Contact Sales (WhatsApp), Get Started. | ✅ Pass |
| TC-004 | Logo returns to homepage | 1. Go to any other page<br>2. Click the logo | User is taken back to the homepage | Clicking the header logo navigated back to https://socia.ph/. | ✅ Pass |
| TC-005 | Contact/CTA button works | 1. Click the main call-to-action button | It opens the contact form or the expected page | "Contact Sales" CTA opens WhatsApp (`api.whatsapp.com`). "Get Started" CTA opens the `/get-started` booking page. Both are functional. | ✅ Pass |
| TC-006 | Contact form rejects empty submission | 1. Open https://socia.ph/get-started<br>2. Leave all 4 fields blank<br>3. Click **Next** | Error messages show for required fields, and nothing is sent | Browser validation triggered on all 4 fields: "Please fill out this field." Nothing was submitted. | ✅ Pass |
| TC-007 | Email field validation | 1. Open https://socia.ph/get-started<br>2. Enter "abc" in the email field<br>3. Click **Next** | Error message about invalid email format | Browser validation triggered: "Please include an '@' in the email address. 'abc' is missing an '@'." | ✅ Pass |
| TC-008 | Responsive layout on mobile | 1. Press F12<br>2. Click the phone icon<br>3. Set width to 375px | No horizontal scrolling, text readable, menu works | `scrollWidth` (375px) ≤ `innerWidth` (375px) at 375×667 viewport — no horizontal overflow. | ✅ Pass |
| TC-009 | Images load | 1. Scroll through the whole page | No broken images or missing icons | 160 broken images found across the partner logos carousel (`/images/partnersSVG/` and `/images/partnerColored/`). All other images loaded correctly. | ❌ Fail → BUG-002 |

## Notes

- TC-006 and TC-007 were tested on `/get-started` because "Contact Sales" opens WhatsApp (no on-site form). The `/get-started` page contains the primary on-site form.
- TC-009: Broken images are all in the partners carousel and appear to be missing server-side assets. The same images repeat across multiple carousel slides, so the root count of unique broken URLs is 20 (see BUG-002).
- These results were captured by automated Playwright probes. Re-run manual verification if the site is updated.
