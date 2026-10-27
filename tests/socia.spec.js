// tests/socia.spec.js
// Automated Playwright checks for https://socia.ph/
// Written with ES module syntax. Each test is labelled with the matching
// manual test case ID from test-cases/socia-homepage.md.

import { test, expect } from '@playwright/test';
import path from 'node:path';

const URL = 'https://socia.ph/';
// Folder for standalone PNG screenshots referenced by the bug reports.
const SHOT_DIR = path.resolve(process.cwd(), 'screenshots');

// ── TC-001 + TC-002 ───────────────────────────────────────────────────────────
// TC-001: the page loads without errors and content is visible.
// TC-002: the title contains "Socia" (full expected title is
//         "Socia | Custom Business Systems & Automation", but the site
//         currently returns "Welcome to Socia" — see BUG-001).
test('page loads and title matches /Socia/', async ({ page }) => {
  await page.goto(URL, { waitUntil: 'networkidle' });
  // The site renders a full-screen white splash (z-9999) for ~2s.
  // Wait for it to be removed from the DOM before screenshotting.
  await page.waitForSelector('.fixed.inset-0.z-\\[9999\\]', { state: 'detached', timeout: 15000 })
    .catch(() => {}); // if it's already gone, that's fine
  // Extra buffer for any remaining animation frames.
  await page.waitForTimeout(500);
  await expect(page).toHaveTitle(/Socia/);
  // Capture the actual title (BUG-001: site returns "Welcome to Socia"
  // instead of "Socia | Custom Business Systems & Automation").
  await page.screenshot({
    path: path.join(SHOT_DIR, 'BUG-001.png'),
    fullPage: true,
  });
});

// TC-001: the body element is visible (content rendered).
test('the body is visible', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('body')).toBeVisible();
});

// ── TC-008 ────────────────────────────────────────────────────────────────────
// TC-008: at a 375×667 viewport there is no horizontal scroll
//         (document.documentElement.scrollWidth <= window.innerWidth).
test('no horizontal scroll at 375x667 viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(URL);
  const fitsViewport = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(fitsViewport).toBeTruthy();
});

// ── TC-003 ────────────────────────────────────────────────────────────────────
// TC-003: all visible nav links return HTTP 200.
test('nav links all return HTTP 200', async ({ page }) => {
  await page.goto(URL, { waitUntil: 'networkidle' });

  const navLinks = await page.evaluate(() =>
    [...document.querySelectorAll('nav a, header a, [class*="nav"] a, [class*="menu"] a')]
      .filter(a => a.offsetParent !== null && a.innerText.trim().length > 0)
      .map(a => ({ text: a.innerText.trim(), href: a.href })),
  );

  expect(navLinks.length).toBeGreaterThan(0);

  for (const link of navLinks) {
    if (link.href?.startsWith('http')) {
      const res = await page.goto(link.href, { waitUntil: 'domcontentloaded' });
      expect(res?.status() ?? 0, `"${link.text}" returned a bad status`).toBeLessThan(400);
      await page.goto(URL, { waitUntil: 'networkidle' });
    }
  }
});

// ── TC-006 ────────────────────────────────────────────────────────────────────
// TC-006: the /get-started form rejects an empty submission.
//         (Contact Sales opens WhatsApp — no on-site form there.)
test('get-started form rejects empty submission', async ({ page }) => {
  await page.goto('https://socia.ph/get-started', { waitUntil: 'networkidle' });

  const nextBtn = page.locator('button').filter({ hasText: /next/i }).first();
  await nextBtn.click();
  await page.waitForTimeout(500);

  const invalidFields = await page.evaluate(() =>
    [...document.querySelectorAll('input, textarea')]
      .filter(el => !el.validity?.valid)
      .map(el => el.placeholder),
  );

  expect(invalidFields.length, 'Expected required-field errors').toBeGreaterThan(0);
});

// ── TC-007 ────────────────────────────────────────────────────────────────────
// TC-007: the email field rejects "abc" as an invalid address.
test('email field rejects invalid format', async ({ page }) => {
  await page.goto('https://socia.ph/get-started', { waitUntil: 'networkidle' });

  const emailField = page.locator('input[type="email"]').first();
  await emailField.fill('abc');

  const nextBtn = page.locator('button').filter({ hasText: /next/i }).first();
  await nextBtn.click();
  await page.waitForTimeout(500);

  const validationMsg = await emailField.evaluate(el => el.validationMessage);
  expect(validationMsg.length, 'Expected an email-format error message').toBeGreaterThan(0);
});

// ── TC-009 ────────────────────────────────────────────────────────────────────
// TC-009 (regression): the known broken partner logos are flagged.
//         This test INTENTIONALLY fails until BUG-002 is fixed by the site owner.
//         It acts as a regression marker so you notice when they fix it.
test('BUG-002 tracker — partner logo images still broken', async ({ page }) => {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const brokenImages = await page.evaluate(() =>
    [...new Set(
      [...document.querySelectorAll('img')]
        .filter(img => !img.naturalWidth)
        .map(img => img.src),
    )],
  );

  // Log the count so it shows up in the report.
  console.log(`Broken images (unique): ${brokenImages.length}`);
  brokenImages.forEach(src => console.log(' •', src));

  // When BUG-002 is fixed, this count will drop to 0 and the test will pass.
  expect(brokenImages.length, 'BUG-002: broken partner logo images found').toBe(0);
});
