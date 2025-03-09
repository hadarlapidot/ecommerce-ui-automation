import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, // Set default viewport size
    baseURL: 'https://www.saucedemo.com/', // Base URL for all tests
    screenshot: 'only-on-failure', // Take screenshots only on failure
  },
  projects: [
    {
      name: 'Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
