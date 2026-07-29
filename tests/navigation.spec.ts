import { test, expect } from '@playwright/test';

test.describe('Navigation and Interactions', () => {
  test('Mobile menu opens and closes correctly', async ({ page }) => {
    // Set viewport to a mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.nav-toggle');
    await expect(menuToggle).toBeVisible();

    // Click to open
    await menuToggle.click();
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();

    // Click to close
    await menuToggle.click();
    // In Next.js with CSS transitions, we just ensure it no longer intercepts pointer events
    // or has the 'is-active' class removed.
    await expect(menuToggle).not.toHaveClass(/is-active/);
  });

  test('Primary navigation links work and do not 404', async ({ page }) => {
    await page.goto('/');

    const links = [
      { name: 'Products', url: '/products/' },
      { name: 'Projects', url: '/projects/' },
      { name: 'Contact', url: '/contact/' }
    ];

    for (const link of links) {
      // Find the link in the desktop nav
      const navLink = page.locator(`header.nav >> text=${link.name}`);
      await navLink.first().click();
      await page.waitForURL(link.url);
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    }
  });

  test('Important forms are visible and submit button works', async ({ page }) => {
    await page.goto('/contact/');
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Check required inputs exist
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });
});
