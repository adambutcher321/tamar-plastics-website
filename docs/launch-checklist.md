# Tamar Plastics — Production Launch Checklist

## Pre-Launch Protocol

- [x] **Git Feature Branch:** `feature/mobile-performance-seo` verified clean.
- [x] **TypeScript Compilation:** `npm run typecheck` completes with 0 errors.
- [x] **Automated Unit Testing:** `npm run test` passes 10/10 test suites (41 tests).
- [x] **Mobile Responsiveness:** Tested 320px – 1440px with 0px horizontal overflow.
- [x] **Trailing Slash Canonical Enforcer:** `trailingSlash: true` configured in `next.config.ts`.
- [x] **XML Sitemap:** Verified at `app/sitemap.ts` (`https://tamarplasticsltd.co.uk/sitemap.xml`).
- [x] **Robots.txt:** Verified at `app/robots.ts`.
- [x] **Custom 404 Page:** Implemented at `app/not-found.tsx` returning HTTP 404 with navigation links.
- [x] **WCAG 2.2 Level AA Accessibility:** Tap targets ≥ 44px, screen-reader landmarks, ARIA expansion states.
- [x] **Structured Data:** Valid JSON-LD schemas (`LocalBusiness`, `Store`, `FAQPage`, `BreadcrumbList`).
- [x] **No Hardware / Credentials Exposure:** Node Environment variables guarded in `.env.example`.
