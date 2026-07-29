# Product page structural layout redesign — design

**Date:** 2026-07-27
**Status:** Approved — prototype on the shared template, reviewed via the Doors page

## Context

Follow-up to the earlier targeted-fixes pass (icons, colours, brand orange, etc. —
see `2026-07-27-product-contact-page-redesign-design.md`). After that pass shipped,
the user reported the product pages still feel "disjointed and not that appealing"
and shared a reference (an editorial case-study portfolio layout: numbered 01/02/03
sections, large full-bleed dark photography, minimal left-aligned text panels, thin
dividers, small icon-labelled tags). They want the layout itself — not just
component-level polish — taken to the next level.

ui-ux-pro-max research confirmed two matching patterns: **Editorial Grid/Magazine**
(asymmetric grid, large impactful imagery, generous whitespace, thin dividers over
boxed cards) and **Trust & Authority + Conversion** (hero/credibility → proof/certs →
solution → clear CTA) — the latter is the right *content* skeleton for a trade page,
the former is the *visual language* to wrap around it.

Constraint: no new imagery generation (Higgsfield credits empty) — must work with the
existing transparent product cutout PNGs, composed much larger/more deliberately
rather than replaced.

Since `app/products/[slug]/page.tsx` is one shared dynamic-route template for all 8
categories, there's no technical way to build "just one page" — the redesign is
implemented once and reviewed via the Doors page before being considered final.

## Diagnosis of current clutter

Not too much content — monotony. Every section (badge bar, specs, features,
swatches, CTAs) repeats the same "eyebrow + headline + boxed content" pattern
back-to-back with near-identical spacing, and four-to-five different chip/card
visual treatments compete (ghost-pill badges, spec-badge pills, highlights box,
feature-dot list, bordered CTA cards). The hero image is small, cropped tight, and
floats awkwardly rather than reading as a deliberate shot.

## Redesign

### 1. Hero — full-height split
Left column keeps eyebrow/headline/paragraph/CTAs/stats. Right side becomes a
genuine full-bleed studio panel: full hero-section height, image bleeds to the
viewport edge, soft radial gradient backdrop, grounded contact-shadow (already
built in the prior pass) scaled up. Makes the image intentionally large instead of
accidentally oversized/cropped.

### 2. Numbered section markers
Each major zone (Specifications, Features, Finishes, Get Started, FAQ) gets a large
thin numeral (01, 02, 03…) plus label as its header device, replacing the repeated
"eyebrow + headline" block. Gives real wayfinding and visual rhythm instead of
monotony, and reduces the section-header component to one consistent pattern
sitewide on this template.

### 3. Reduce box/chip clutter
- Fold the standalone "Highlights Badge Bar" strip into the numbered Specifications
  section (one fewer full-width seam).
- Unify badge pills, feature markers, and CTA cards toward one hairline-divider
  visual system rather than four different boxed treatments.

### 4. Whitespace/rhythm
Increase spacing between numbered sections; let text-heavy (specs) and
image/visual-heavy (finishes) sections alternate in visual weight instead of
uniform stacking.

### Unchanged
Dual CTA cards' outline-vs-filled differentiation (from the prior pass), FAQ
2-column layout, cross-links bar, colour swatch gloss/grain treatment, all icon
work, brand orange token.

## Verification
Build/typecheck/tests clean, then screenshot the Doors page (real browser or
headless with `--force-prefers-reduced-motion` to avoid the known Framer Motion/rAF
headless artifact) for the user to review before treating this as final across all
8 product pages.
