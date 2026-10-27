// playwright.config.js
// Playwright configuration for the Socia (https://socia.ph/) practice tests.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Folder that contains your test files.
  testDir: './tests',
  // Take a screenshot for every test.
  screenshot: 'on',
  // Record a video, but only keep it when a test fails.
  video: 'retain-on-failure',
  // Record a trace (step-by-step replay), but only keep it when a test fails.
  trace: 'retain-on-failure',
  // Build an HTML report, but do not open it automatically.
  reporter: [['html', { open: 'never' }]],
  // Run tests in Chromium (desktop Chrome) by default.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
