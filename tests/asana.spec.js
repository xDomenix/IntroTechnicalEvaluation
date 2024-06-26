const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('https://app.asana.com/-/login');

    // Input email
    await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
    // Click the continue button (if exists)
    await page.click('button:has-text("Continue")');

    // Input password
    await page.fill('input[type="password"]', 'Password123');
    // Submit the form
    await page.click('button:has-text("Log in")');

    // Wait for navigation to complete after login
    await page.waitForNavigation();
  });

  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      await test.step('Navigate to the project page', async () => {
        const navItems = data.leftNav.split(', ');
        for (const item of navItems) {
          await page.click(`text=${item}`);
        }
      });

      await test.step('Verify the card is within the right column', async () => {
        // Ensure the column is expanded and visible
        await page.click(`text=${data.column}`);
        // Check if the card is present in the specified column
        const cardLocator = page.locator(`text=${data.card_title}`);
        await expect(cardLocator).toBeVisible();
      });
    });
  });
});