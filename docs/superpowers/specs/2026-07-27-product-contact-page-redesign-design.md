# Product & contact page redesign — design

**Date:** 2026-07-27
**Status:** Approved — targeted fixes + polish scope, no new imagery (CSS/layout only)

## Context

A ui-ux-pro-max review of `app/products/[slug]/page.tsx`, `components/products/*`, and
`app/contact/*` flagged several patterns that read as generic/"AI slop" rather than
the luxurious/professional bar this brand is held to (see memory `feedback-visual-quality`):
emoji used as UI icons, plain-text badges standing in for accreditation marks, a
generic floating-glow hero treatment, an off-brand accent colour, and a contact page
with no location/trust signals next to the form.

Scope was explicitly narrowed with the user to **targeted fixes within the current
layout** (not a structural redesign) and **CSS/layout only** (Higgsfield credits are
near-empty, so no new generated imagery).

## Fixes

### 0. Brand orange correction (site-wide)
The logo file (`public/tamar-logo.svg`) uses `#F58A2E`; every accent colour on the
site (`--edge` in `design/tokens.css`, `--color-tamar-orange` in `app/globals.css`,
and hardcoded `#f4791f` / `rgba(244,121,31,…)` occurrences across `product-detail.css`,
`home.css`, `survey.css`, `legal.css`, `cookie-banner.css`, and inline styles in
`page.tsx`) currently uses `#F4791F`. Correct every occurrence to the real brand
value, including recomputing `--edge-deep` and `--edge-glow` proportionally.

### 1. Icon system
Add `lucide-react`. Replace:
- Emoji key-feature icons in `ProductSpecsSection.tsx`'s `getTechHighlightInfo()`
  (🔒⚡🛡️🌧️☀️🛠️💧🎨🚿💎 etc.) with matching Lucide icons in the brand orange.
- `📷` in `SurveyForm.tsx`'s photo upload prompt → `Camera`.
- `✓` success marks in `ContactForm.tsx` / `SurveyForm.tsx` → `Check`.
- `✕` close glyph in `ProjectLightbox.tsx` → `X`.
- `★★★★★` text stars in `GoogleReviews.tsx` / `ReviewCard.tsx` → filled `Star` icon row.

### 2. Product hero image treatment
`ProductHero.tsx`: remove the pulsing radial-glow blob and continuous rotate/float
loop. Replace with a single grounded contact-shadow ellipse beneath the product and
a one-time entrance settle (no infinite loop).

### 3. Certification badges
`pd-spec-badge` in `product-detail.css`: replace the plain orange dot with a small
relevant Lucide icon (`ShieldCheck` / `Award` / `BadgeCheck`) per badge — no
fabricated third-party logos (no rights to reproduce PAS24/BBA marks).

### 4. Colour/foil swatches
Extend `getColourStyle()` in `lib/colours.ts`: solid RAL colours get a soft radial
highlight (injection-molded plastic look); existing gradient-based woodgrain/foil
finishes get a subtle diagonal grain texture layered on top. CSS-only.

### 5. Conversion cards
`page.tsx`'s Trade vs Survey cards: Survey (primary homeowner CTA) gets a
filled/tinted treatment matching `pd-btn--primary`; Trade stays outline/secondary.
Add a small Lucide icon to each card header.

### 6. Inline style cleanup
Migrate repeated `style={{...}}` blocks in `page.tsx` (badge bar, features grid,
colour section wrapper, dual cards, cross-links bar, breadcrumb) into classes in
`product-detail.css`, done alongside the fixes above.

### 7. Contact page — map
Embed a Google Maps iframe (no API key required) using `BUSINESS.geo`
(50.4079, -4.2019), CSS-filtered dark (`invert` + `hue-rotate`) to match the theme,
framed like the form panel.

### 8. Contact page — trust signal
Compact strip near the form pulling from the existing `PLACEHOLDER_GOOGLE_REVIEWS`
data (already used on the homepage — no new/fabricated content): 2-3 short quotes +
the 5.0/★★★★★ summary.

### 9. Contact page — form card polish
`.contact-form-wrap` gets a thin brand-orange top edge (2-3px gradient).

## Out of scope
Structural layout changes, new/regenerated imagery, third-party accreditation logos,
homepage changes beyond the already-completed hero video fix.
