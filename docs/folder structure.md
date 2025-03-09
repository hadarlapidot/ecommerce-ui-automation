|-- docs/
| |-- test-plan.md # The test plan document
| |-- test-cases.xlsx # Excel file with test cases
|
|-- tests/
| |-- login.test.ts # Tests for login functionality (TypeScript)
| |-- home.test.ts # Tests for homepage functionality (TypeScript)
| |-- checkout.test.ts # Tests for checkout functionality (TypeScript)
|
|-- pages/
| |-- LoginPage.ts # Page object for login page (TypeScript)
| |-- HomePage.ts # Page object for homepage (TypeScript)
| |-- CheckoutPage.ts # Page object for checkout page (TypeScript)
|
|-- utils/
| |-- helpers.ts # Helper functions (e.g., for data generation) (TypeScript)
|
|-- config/
| |-- playwright.config.ts # Playwright configuration (browser settings, baseURL, etc.)
|
|-- reports/
| |-- allure-results/ # Allure reports folder (if using Allure)
|
|-- node_modules/ # Playwright and other dependencies
|-- package.json # Project dependencies and scripts
|-- tsconfig.json # TypeScript configuration
