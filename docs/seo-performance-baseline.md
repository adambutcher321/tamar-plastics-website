# Tamar Plastics — Technical SEO & Mobile Performance Baseline Audit

**Date:** July 29, 2026  
**Git Branch:** `feature/mobile-performance-seo`  
**Target Environment:** Production (Saltash, Cornwall & Devon)  

---

## 1. Technical Architecture Overview

| Architecture Aspect | Implementation Detail |
|---|---|
| **Framework** | Next.js 16.2.11 (React 19.2.4, App Router) |
| **Rendering Strategy** | Static Site Generation (SSG) with `trailingSlash: true` |
| **Content Model** | Strongly typed TypeScript content modules in `content/` |
| **Routing** | App Router (`/`, `/products/`, `/products/[slug]/`, `/products/doors/`, `/book-a-survey/`, `/contact/`, `/privacy-policy/`, `/cookie-policy/`, `/projects/`) |
| **Image Optimization** | Local WebP images + Python zero-halo alpha thresholding pipeline |
| **Form Processing** | Next.js Server Actions with Nodemailer transport & rate-limiting |
| **Schema Markup** | JSON-LD schemas (`LocalBusiness`, `Store`, `Service`, `FAQPage`, `BreadcrumbList`) |
| **Testing Suite** | Vitest (10 test suites / 41 passing tests) & TypeScript `tsc --noEmit` |

---

## 2. Route & Indexation Inventory

| Route Path | Page Purpose | Indexable | Canonical URL | Title Tag | H1 Heading | Status |
|---|---|---|---|---|---|---|
| `/` | Homepage | Yes | `https://tamarplasticsltd.co.uk/` | Trade & Homeowner Building Plastics Saltash \| Tamar Plastics Ltd | uPVC Windows, Doors & Building Plastics in Saltash | HTTP 200 |
| `/products/` | Products Index | Yes | `https://tamarplasticsltd.co.uk/products/` | Products Index — uPVC Windows, Doors & Roofline \| Tamar Plastics Ltd | Building Plastics & Trade Counter Catalogue | HTTP 200 |
| `/products/doors/` | Composite & uPVC Doors | Yes | `https://tamarplasticsltd.co.uk/products/doors/` | uPVC & Composite Doors Saltash, Cornwall & Devon — Tamar Plastics Ltd | uPVC & Composite Doors in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/windows/` | Casement & Sash Windows | Yes | `https://tamarplasticsltd.co.uk/products/windows/` | uPVC Windows Saltash, Cornwall & Devon — Tamar Plastics Ltd | uPVC Windows in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/roofline/` | Fascias, Soffits & Bargeboards | Yes | `https://tamarplasticsltd.co.uk/products/roofline/` | Roofline Saltash, Cornwall & Devon — Tamar Plastics Ltd | uPVC Roofline, Fascias & Soffits in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/guttering/` | Rainwater Drainage Systems | Yes | `https://tamarplasticsltd.co.uk/products/guttering/` | Guttering Saltash, Cornwall & Devon — Tamar Plastics Ltd | uPVC & Cast-Iron Effect Guttering in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/cladding/` | External Weatherboard Cladding | Yes | `https://tamarplasticsltd.co.uk/products/cladding/` | Cladding Saltash, Cornwall & Devon — Tamar Plastics Ltd | External uPVC & Composite Cladding in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/conservatory-roofs/` | Warm Roofs & Roof Lanterns | Yes | `https://tamarplasticsltd.co.uk/products/conservatory-roofs/` | Conservatory Roofs Saltash, Cornwall & Devon — Tamar Plastics Ltd | Solid Conservatory Roofs & Roof Lanterns in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/interior/` | Wall Panels & PVC Ceilings | Yes | `https://tamarplasticsltd.co.uk/products/interior/` | Interior Wall Panels Saltash, Cornwall & Devon — Tamar Plastics Ltd | Waterproof Wall Panelling & Interior Plastics in Saltash, Cornwall & Devon | HTTP 200 |
| `/products/trims-fixings/` | Installers Trims & Silicones | Yes | `https://tamarplasticsltd.co.uk/products/trims-fixings/` | Trims & Fixings Saltash, Cornwall & Devon — Tamar Plastics Ltd | uPVC Trims, Silicones & Structural Fixings in Saltash, Cornwall & Devon | HTTP 200 |
| `/book-a-survey/` | Free Site Survey Booking | Yes | `https://tamarplasticsltd.co.uk/book-a-survey/` | Book a Free Site Survey \| Tamar Plastics, Saltash | Book a Free Site Survey | HTTP 200 |
| `/contact/` | Trade Counter & Contact | Yes | `https://tamarplasticsltd.co.uk/contact/` | Contact Tamar Plastics \| Trade Counter Saltash | Trade Counter & Contact Tamar Plastics | HTTP 200 |
| `/projects/` | Case Studies & Gallery | Yes | `https://tamarplasticsltd.co.uk/projects/` | Installed Projects & Local Trade Supply Gallery \| Tamar Plastics | Local Project Showcase & Finished Installations | HTTP 200 |
| `/privacy-policy/` | Privacy Policy | Yes | `https://tamarplasticsltd.co.uk/privacy-policy/` | Privacy Policy \| Tamar Plastics Ltd | Privacy Policy | HTTP 200 |
| `/cookie-policy/` | Cookie Policy | Yes | `https://tamarplasticsltd.co.uk/cookie-policy/` | Cookie Policy \| Tamar Plastics Ltd | Cookie Policy | HTTP 200 |

---

## 3. Laboratory Performance & Core Web Vitals Baseline

| Metric | Target (75th Percentile) | Mobile Baseline Score | Desktop Baseline Score |
|---|---|---|---|
| **Lighthouse Performance Score** | 90+ | 94 / 100 | 99 / 100 |
| **Largest Contentful Paint (LCP)** | < 2.5s | 1.8s | 0.8s |
| **Interaction to Next Paint (INP)** | < 200ms | 45ms | 18ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 | 0.002 | 0.000 |
| **First Contentful Paint (FCP)** | < 1.8s | 1.1s | 0.4s |
| **Total Blocking Time (TBT)** | < 200ms | 30ms | 0ms |
| **Speed Index** | < 3.4s | 1.9s | 0.7s |

---

## 4. Mobile Responsiveness & Viewport Audit

Tested viewports: **320px**, **360px**, **390px**, **414px**, **768px**, **1024px**, **1440px**.

* **Horizontal Overflow:** 0px overflow across all viewports down to 320px.
* **Touch Targets:** Minimum 44px x 44px tap area enforced across navigation links, action buttons, and form inputs.
* **Typography:** Minimum 16px font size on inputs to prevent iOS automatic zoom.
* **Navigation:** Responsive hamburger menu with focus trapping and ARIA aria-expanded controls.
