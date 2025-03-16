import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  timeout: 5000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'results.xml' }]
  ],  
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, // Set default viewport size
    baseURL: 'https://www.saucedemo.com/', // Base URL for all tests
    screenshot: { mode: 'only-on-failure'},
  },
  projects: [
    {
      name: 'Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
