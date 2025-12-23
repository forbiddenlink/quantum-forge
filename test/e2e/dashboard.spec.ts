import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Add authentication setup when auth is implemented
    await page.goto('/dashboard');
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

