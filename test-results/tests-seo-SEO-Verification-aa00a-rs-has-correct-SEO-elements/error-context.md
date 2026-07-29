# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/seo.spec.ts >> SEO Verifications >> Page /products/doors/ has correct SEO elements
- Location: tests/seo.spec.ts:17:9

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/products/doors/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const urls = [
  4  |   '/',
  5  |   '/products/',
  6  |   '/products/doors/',
  7  |   '/products/windows/',
  8  |   '/products/roofline/',
  9  |   '/contact/',
  10 |   '/book-a-survey/',
  11 |   '/cookie-policy/',
  12 |   '/privacy-policy/',
  13 | ];
  14 | 
  15 | test.describe('SEO Verifications', () => {
  16 |   for (const url of urls) {
  17 |     test(`Page ${url} has correct SEO elements`, async ({ page }) => {
> 18 |       await page.goto(url);
     |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  19 | 
  20 |       // Verify HTTP status is 200 (Note: Next.js dev server might return 200 for 404s in some cases,
  21 |       // but playwright goto handles basic response checks if we wait for network idle)
  22 | 
  23 |       // 1. Page Title exists and is unique
  24 |       const title = await page.title();
  25 |       expect(title.length).toBeGreaterThan(0);
  26 |       expect(title).not.toBe('Products | Tamar Plastics'); // Generic check
  27 | 
  28 |       // 2. Meta description exists
  29 |       const metaDesc = page.locator('meta[name="description"]');
  30 |       await expect(metaDesc).toHaveCount(1);
  31 |       const descContent = await metaDesc.getAttribute('content');
  32 |       expect(descContent?.length).toBeGreaterThan(0);
  33 | 
  34 |       // 3. Canonical tag exists
  35 |       const canonical = page.locator('link[rel="canonical"]');
  36 |       await expect(canonical).toHaveCount(1);
  37 |       const canonicalHref = await canonical.getAttribute('href');
  38 |       expect(canonicalHref).toContain('tamarplasticsltd.co.uk');
  39 | 
  40 |       // 4. Exactly one H1 exists
  41 |       const h1Count = await page.locator('h1').count();
  42 |       expect(h1Count).toBe(1);
  43 | 
  44 |       // 5. No accidental noindex unless expected
  45 |       const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content').catch(() => null);
  46 |       if (metaRobots) {
  47 |         expect(metaRobots).not.toContain('noindex');
  48 |       }
  49 |     });
  50 |   }
  51 | });
  52 | 
```