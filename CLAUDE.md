# Tamar Plastics Ltd — Engineering & SEO Directives

## Build & Quality Verification Commands
```bash
npm run typecheck    # Typecheck TypeScript files
npm run test         # Run Vitest test suite
npm run build        # Build production static bundle
```

## Protected Files & Conventions
- **Preserve Approved Visual Design:** Do not alter established dark glassmorphic styling, brand typography, or orange accent `#F58A2E`.
- **Trailing Slash Enforcement:** All internal links, canonical tags, and sitemap entries MUST use trailing slashes (e.g. `/products/doors/`).
- **No Unconfirmed Information:** Use `[DETAIL REQUIRED]` rather than inventing information not present in `content/business.ts` or product specifications.
- **Mobile First & Accessibility:** Maintain 320px viewport compatibility, 44px minimum touch targets, and WCAG 2.2 AA accessibility.
