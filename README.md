# 🧪 Playwright UI Tests – saucedemo.com

This project contains end-to-end UI tests using Playwright to automate and validate the core functionalities of [saucedemo.com](https://www.saucedemo.com/), a demo e-commerce site.

## 📌 Features Tested

- ✅ User Login (valid and invalid credentials)
- ✅ Add Items to Cart
- ✅ Remove Items from Cart
- ✅ Basic Navigation (e.g., logout, shopping cart, product page)
- ✅ Items Sorting
- ✅ Screenshots captured after failed tests

## 🧰 Tech Stack

- **Test Framework:** Playwright
- **Language:** TypeScript
- **Test Runner:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Reports:** HTML Test Report

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/playwright-ui-tests.git
cd playwright-ui-tests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Tests

```bash
npx playwright test
```

### 4. View HTML Report

```bash
npx playwright show-report
```

## 📸 Screenshots

Each test automatically captures a screenshot at the end of execution (Failure only). Screenshots are stored in the `/test-results` directory.

---

## 🐞 Bug Report

The test is intentionally failing due to a faulty test case (TC-009) that has been implemented. The bug report is available in the root directory.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/33407e0b-5b42-4e5d-a778-f5b5f55c4820" />

<img width="300" alt="image" src="https://github.com/user-attachments/assets/df20cdfb-03e7-4fbf-9d5e-0813fd06796b" />

