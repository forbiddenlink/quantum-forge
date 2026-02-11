import { test, expect } from '@playwright/test';

// Test user credentials (should match seed data)
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
};

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Fill in credentials and submit
    await page.fill('input[name="email"], input[type="email"]', TEST_USER.email);
    await page.fill('input[name="password"], input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
  });

  test('should display dashboard page', async ({ page }) => {
    await expect(page).toHaveTitle(/Quantum Forge/);
    await expect(page.getByRole('heading', { name: /Good morning/i })).toBeVisible();
  });

  test('should display KPI cards', async ({ page }) => {
    await expect(page.getByText('Focus Score')).toBeVisible();
    await expect(page.getByText('Tasks Completed')).toBeVisible();
    await expect(page.getByText('Team Engagement')).toBeVisible();
    await expect(page.getByText('SLA Compliance')).toBeVisible();
  });

  test('should display quick actions', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Create Task/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Project/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Post Update/i })).toBeVisible();
  });

  test('should open command bar with Cmd+K', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await expect(page.getByPlaceholder(/Type a command/i)).toBeVisible();
  });

  test('should navigate to tasks page', async ({ page }) => {
    await page.getByRole('link', { name: /Tasks/i }).click();
    await expect(page).toHaveURL(/\/tasks/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: /Good morning/i })).toBeVisible();
  });
});

