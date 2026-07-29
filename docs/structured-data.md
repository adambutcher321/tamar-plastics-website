# Tamar Plastics — Structured Data Inventory & Schema Verification

## JSON-LD Schema Architecture

### 1. `LocalBusiness` & `Store` Schema
Implemented via `buildServiceSchema` in [lib/schema.ts](file:///Users/adambutcher/Desktop/Tamar%20Plastics%20Website/lib/schema.ts).

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": "https://tamarplasticsltd.co.uk/#organization",
  "name": "Tamar Plastics Ltd",
  "legalName": "Tamar Plastics Ltd",
  "url": "https://tamarplasticsltd.co.uk/",
  "logo": "https://tamarplasticsltd.co.uk/images/logo.png",
  "image": "https://tamarplasticsltd.co.uk/images/og-tamar.webp",
  "description": "Premier supplier and installer of uPVC windows, composite doors, roofline, guttering, cladding, and interior wall panelling in Saltash, Cornwall.",
  "telephone": "+441752841234",
  "email": "info@tamarplasticsltd.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Unit 4, Gwel Avon Business Park, Gilston Road",
    "addressLocality": "Saltash",
    "addressRegion": "Cornwall",
    "postalCode": "PL12 6TW",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.417611,
    "longitude": -4.231385
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "££"
}
```

### 2. `BreadcrumbList` Schema
Every product, booking, contact, and policy page includes a valid `BreadcrumbList` schema representing hierarchy.

### 3. `FAQPage` Schema
Every product page renders structured `FAQPage` schema dynamically generated from `product.faqs`.

---

## Rich Results Testing Verification
* Schema JSON-LD parsing verified via unit tests in `lib/schema.test.ts` (4 passing tests).
* Verified zero syntax errors or invalid nesting.
