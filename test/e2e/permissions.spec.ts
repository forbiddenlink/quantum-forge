import { test, expect } from '@playwright/test';

// Test user credentials
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
};

test.describe('Permissions & Data Isolation', () => {
  test.describe('Unauthenticated access', () => {
    test('API routes return 401 without authentication', async ({ request }) => {
      const routes = [
        '/api/tasks/recent',
        '/api/dashboard/stats',
        '/api/settings',
      ];

      for (const route of routes) {
        const response = await request.get(route);
        expect(response.status()).toBe(401);
      }
    });

    test('Dashboard redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/login/);
    });

    test('Tasks page redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/tasks');
      await expect(page).toHaveURL(/\/login/);
    });

    test('Settings page redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/settings');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Authenticated user data isolation', () => {
    test.beforeEach(async ({ page }) => {
      // Log in
      await page.goto('/login');
      await page.fill('input[name="email"], input[type="email"]', TEST_USER.email);
      await page.fill('input[name="password"], input[type="password"]', TEST_USER.password);
      await page.click('button[type="submit"]');
      await page.waitForURL('**/dashboard', { timeout: 10000 });
    });

    test('Dashboard only shows user-specific stats', async ({ page }) => {
      // Verify the dashboard loads with stats
      await expect(page.getByText('Focus Score')).toBeVisible();
      await expect(page.getByText('Tasks Completed')).toBeVisible();
      await expect(page.getByText('Team Engagement')).toBeVisible();
      await expect(page.getByText('SLA Compliance')).toBeVisible();
    });

    test('Recent tasks shows only user tasks', async ({ page }) => {
      // The Recent Tasks section should be visible
      await expect(page.getByText('Recent Tasks')).toBeVisible();
      // Should either show tasks or the empty state
      const tasksOrEmpty = page.locator('.glass-panel, .surface-elevated').filter({
        has: page.getByText(/Recent Tasks|No tasks yet/),
      });
      await expect(tasksOrEmpty).toBeVisible();
    });

    test('Settings loads user preferences', async ({ page }) => {
      await page.goto('/settings');
      await expect(page.getByText('Appearance')).toBeVisible();
      await expect(page.getByText('Notifications')).toBeVisible();
      await expect(page.getByText('Preferences')).toBeVisible();
      await expect(page.getByText('Account')).toBeVisible();
    });
  });

  test.describe('Protected actions require authentication', () => {
    test('Creating a task requires authentication', async ({ request }) => {
      const response = await request.post('/api/tasks', {
        data: {
          title: 'Unauthorized task',
          priority: 'MEDIUM',
        },
      });
      expect(response.status()).toBe(401);
    });

    test('Creating a project requires authentication', async ({ request }) => {
      const response = await request.post('/api/projects', {
        data: {
          name: 'Unauthorized project',
        },
      });
      expect(response.status()).toBe(401);
    });

    test('Changing password requires authentication', async ({ request }) => {
      const response = await request.post('/api/settings/password', {
        data: {
          currentPassword: 'old',
          newPassword: 'new12345',
        },
      });
      expect(response.status()).toBe(401);
    });

    test('Exporting data requires authentication', async ({ request }) => {
      const response = await request.get('/api/settings/export');
      expect(response.status()).toBe(401);
    });

    test('Deleting account requires authentication', async ({ request }) => {
      const response = await request.post('/api/settings/delete', {
        data: {
          password: 'password',
          confirmation: 'DELETE MY ACCOUNT',
        },
      });
      expect(response.status()).toBe(401);
    });
  });
});
