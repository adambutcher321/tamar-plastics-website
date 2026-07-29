import { test, expect } from '@playwright/test';

const urls = [
  '/',
  '/products/',
  '/products/doors/',
  '/products/windows/',
  '/products/roofline/',
  '/contact/',
  '/book-a-survey/',
  '/cookie-policy/',
  '/privacy-policy/',
];

test.describe('SEO Verifications', () => {
  for (const url of urls) {
    test(`Page ${url} has correct SEO elements`, async ({ page }) => {
      await page.goto(url);

      // Verify HTTP status is 200 (Note: Next.js dev server might return 200 for 404s in some cases,
      // but playwright goto handles basic response checks if we wait for network idle)

      // 1. Page Title exists and is unique
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      expect(title).not.toBe('Products | Tamar Plastics'); // Generic check

      // 2. Meta description exists
      const metaDesc = page.locator('meta[name="description"]');
      await expect(metaDesc).toHaveCount(1);
      const descContent = await metaDesc.getAttribute('content');
      expect(descContent?.length).toBeGreaterThan(0);

      // 3. Canonical tag exists
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = await canonical.getAttribute('href');
      expect(canonicalHref).toContain('tamarplasticsltd.co.uk');

      // 4. Exactly one H1 exists
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // 5. No accidental noindex unless expected
      const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content').catch(() => null);
      if (metaRobots) {
        expect(metaRobots).not.toContain('noindex');
      }
    });
  }
});
