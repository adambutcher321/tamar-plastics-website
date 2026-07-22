# Tamar Plastics Ltd — Website, Phase 1 Design

**Date:** 2026-07-22
**Status:** Approved by client, ready for implementation planning
**Source brief:** full build brief supplied by client (Tamar Plastics Ltd website rebuild), scoped down to Phase 1 per this document.

## 1. Scope decision

The source brief describes a 3-phase build (homepage/core pages → door configurator/projects/guides → trade portal/stock bar). This document specs **Phase 1 only**: a coherent, shippable first slice. Phase 2 and Phase 3 will each get their own brainstorm/spec/plan cycle later.

The project directory is empty — this is a from-scratch build, no existing codebase.

## 2. Key decisions from clarification

| Decision | Choice | Why |
|---|---|---|
| Brand assets (logo, photography) | Placeholders for Phase 1 | Real assets not yet available. Layout/components built so real assets are a drop-in swap later. |
| CMS | None for Phase 1 | Phase 1 pages are static; CMS-dependent pages (projects, guides) are Phase 2. Content lives in typed TS data modules now. |
| Hosting | Vercel | Native Next.js hosting. Not connecting a live account as part of this build. |
| Hero direction | "The Roofline Cut" (primary direction, brief §5) | Serves both audiences equally; brief's own recommendation. |
| Hero media | Video-ready component, ships with Ken Burns still fallback | No real video footage yet; brief explicitly specifies this fallback for exactly this situation. |
| Trade/homeowner fork mechanism | Route-prefixed pages (`/trade/…`, `/home-improvements/…`), `localStorage` only remembers toggle state | SEO-friendly (both funnels independently crawlable/indexable), matches brief's explicit URL structure. Rejected: single-route client-side switch (not independently indexable) and geo/referrer auto-detection (fragile, brief calls for an explicit visitor choice). |
| Form submissions | Wired to a real email service (Resend) → info@tamarplasticsltd.co.uk | Needs `RESEND_API_KEY` from client; integration degrades gracefully (still shows correct success UI, logs server-side) if key is absent. |
| Analytics / consent banner | Deferred | No live domain or analytics account yet; brief's own Phase 1 launch list doesn't include this either. |
| Legacy 301 redirects (carlton-plastics.co.uk) | Deferred | Nothing live to migrate yet. Revisit at actual launch. |
| AI crawler access (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) | Allowed in robots.txt | Matches the brief's AEO/GEO strategy (§8.3) — the point of that section is winning AI-answer citations; blocking these bots would undercut it. |
| Review data | Display component built now, seeded with 2-3 clearly-marked placeholder reviews; `/reviews/` page and `AggregateRating`/`Review` schema deferred until real Google review data is available | Brief explicitly says "pull the Google reviews, don't fabricate" (§8.3) — fabricated review schema carries real reputational/legal weight, more than other placeholder content. |
| Visual tone | "Bold and modern" (client steer) | Lean harder into Archivo Expanded scale/tracking and confident whitespace; ratio discipline (70% white/neutral, 25% black, 5% orange) stays — "bold" means scale and contrast, not more orange. |
| Supplier/manufacturer logos (Deceuninck, Durasid, Liniar, Cortizo, FloPlast, Cascade Shower Panels) | Deferred to Phase 2, on `/trade/brands/` | Client supplied reference logos and asked for a carousel. **Conflict flagged**: brief §9 explicitly prohibits carousels/sliders anywhere. Recommend a static logo grid or non-interactive marquee (like the "Stock Ticker" hero alternative's marquee) instead when this is built — decide deliberately in the Phase 2 cycle, not by default. |

## 3. Architecture & stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS, built for Vercel deployment.
- Static generation for every Phase 1 page. No CMS, no database.
- Content lives in typed TypeScript data modules (e.g. `content/products/doors.ts`, `content/areas/saltash.ts`), not MDX — keeps product/area pages structurally uniform via a shared type, hand-editable, and sets up a clean migration path to Sanity/Payload in Phase 2 (data shapes carry over).
- Framer Motion scoped to the hero and scroll-reveal utility only — not used elsewhere, per brief's explicit instruction.
- Route groups: `app/trade/…`, `app/home-improvements/…` (audience-specific funnels); `app/products/…`, `app/repairs`, `app/contact`, `app/about`, `app/areas/…` (shared/neutral).
- Local component library under `components/` — no external UI kit — so the brand contrast rules (§2.1 of source brief) are enforced at the component level, not just documented.
- `lib/content-types.ts` defines the shape every product/area page must satisfy (spec table, FAQs, answer-first summary, etc.) so acceptance criterion "every product page has a spec table, answer-first summary, 5+ FAQs" is structurally guaranteed, not just remembered.

## 4. Sitemap — Phase 1

```
/                                  Homepage (full 8-section build per brief §7.1)
/trade/                            Trade & supply-only landing
/trade/account/                    Open a trade account (form)
/trade/collection-delivery/        Counter hours, delivery radius, cut-off times
/home-improvements/                Homeowner landing (supply & fit)
/home-improvements/process/        Survey → quote → manufacture → fit → aftercare
/products/                         Category index
/products/doors/
/products/windows/
/products/roofline/
/products/guttering/
/products/cladding/
/products/conservatory-roofs/
/products/interior/
/products/trims-fixings/
/repairs/
/areas/                            Index
/areas/saltash/
/areas/plymouth/
/about/
/contact/
```

Each `/products/*` page follows the brief's §7.2 spec: H1 (product + "Cornwall"), 60-word answer-first summary, placeholder product photography, mono spec table, colour swatches, supply-only vs supply-and-fit CTA split, cross-links, 5-8 real FAQs with `FAQPage` schema, related-guides slot (empty until Phase 2 guides exist).

Each `/areas/*` page follows §7.3: real local building context (coastal exposure, conservation-area constraints, wind-driven rain), drive time/route from Gwel Avon, delivery/collection specifics, one review from that area, project slot (empty/placeholder until Phase 2 projects gallery exists). Only Saltash and Plymouth built for Phase 1; remaining towns deferred (brief's own instruction: don't create a town page unless there's 400 genuinely different words to say about it — writing the other towns properly is Phase 2 work).

Explicitly **not** built in Phase 1: `/trade/brands/`, product sub-variant pages (e.g. `/products/doors/composite/`), `/door-designer/`, `/projects/`, `/guides/`, `/reviews/` (full page), finance page, remaining area pages.

## 5. Design system

- Tailwind theme extension carrying the exact tokens from brief §2.1: `--tamar-orange #F2571A`, `--tamar-black #231F20`, warm `ink-*` scale (`800/600/400/200/050`), `--sky`, `--in-stock`. No invented colours, no gradients.
- Fonts: Archivo Expanded (700/800, display), Inter Tight (400/500/600, body), JetBrains Mono (400/500, spec/product data) — self-hosted via `next/font`, Latin subset, `font-display: swap`.
- Visual tone steer ("bold and modern"): larger display sizes, tighter negative tracking, confident whitespace around display type — scale and contrast increase, not orange usage. The 70% white/neutral, 25% black, 5% orange ratio discipline from §2.1 still applies; "one orange element per viewport" (acceptance criterion #9) is unaffected.
- Contrast rules enforced structurally: `<Button>` only exposes orange-fill/near-black-text and black-fill/white-text variants — the AA-failing combinations (orange text on white, white text on orange) aren't exposed as props, so they can't be used by accident.
- Keyhole mark: SVG approximation (roof triangle, keyhole cut via `<mask>`) since the real logo file isn't available yet — used as scroll cue, bullet glyph, loader. Structured so the real logo file is a one-file swap later, not a rebuild.
- Core shared components: `Button`, `Card`, `SpecTable` (mono), `FAQAccordion`, `AudienceForkCard`, `ProofBand`, `CounterStatus` (live open/closed, computed against `Europe/London`), `Header` (with trade/home toggle), `Footer`, `Breadcrumbs`.
- Type scale per brief (12/14/16/18/22/28/40/64/96, hero clamp), 17px/1.55 minimum body, 44px minimum tap targets (brief §8.4).

## 6. Hero & motion — "The Roofline Cut"

- `<Hero>` accepts either `videoSrc` or falls back to `posterImage` + Ken Burns drift (20s, 1.06× scale) when no video is supplied. Phase 1 ships the fallback path only, but the component is video-ready for a later drop-in.
- Placeholder poster: a clearly labelled placeholder graphic ("PLACEHOLDER — roofline photograph"), sized/cropped to the real target composition so layout is correct the moment a real photo replaces it.
- `TAMAR` wordmark, Archivo Expanded, `clamp(4rem, 18vw, 16rem)`, -0.03em tracking, occluded in its lower third by a masked roofline-silhouette SVG layer (matches the placeholder's roofline angle) — built as an SVG mask, not a CSS blend, so it survives image compression later.
- Single orange diagonal sweep (18-22°, matching roofline angle), clip-path reveal, 700ms on load, no loop.
- Audience fork (source brief §3) rendered as two large cards overlaid directly on the hero — not a separate section below it.
- Eyebrow (mono): `SALTASH, CORNWALL · EST. AS CARLTON PLASTICS`. H1 and sub-copy per brief §5 verbatim text.
- Keyhole scroll cue: 1px stroke SVG, 4s breathing opacity loop — the one permitted infinite loop on the site.
- `prefers-reduced-motion: reduce`: no Ken Burns drift, sweep renders in final state (no animation), no breathing cue — fully static, fully legible, per acceptance criterion #7.

## 7. Trade/homeowner fork

- Real, statically-generated routes: `/trade/*` and `/home-improvements/*`, each with their own content, CTAs and proof per brief §3's comparison table (price framing, proof type, primary/secondary CTA).
- Product pages (`/products/*`) stay neutral/shared, linking out to both funnels via the supply-only vs supply-and-fit CTA split (§7.2).
- Header toggle switches between the two prefixes. `localStorage` persists the visitor's last-chosen mode purely to pre-highlight the correct toggle state on return visits — it is not the mechanism that makes the fork work; the routes work standalone and are independently indexable.

## 8. Conversion mechanics & forms (Phase 1 subset)

Per the brief's ranked list (§6), Phase 1 builds: click-to-call (#4), quote request with photo upload (#3, homeowner side), trade enquiry form, live counter status (#6). Door designer (#1) and gated PDF (#5) are Phase 2/3 per the brief's own launch sequence.

- **Click-to-call**: sticky `tel:01752841234` bar on mobile (<768px).
- **Quote request form** (homeowner): name, phone/email, postcode as the 3 required fields before submit; optional photo (mobile camera capture enabled) and free-text description as progressive disclosure.
- **Trade enquiry form** (`/trade/account/`): business name, contact details, what they buy — same 3-field-first discipline.
- **Contact form** on `/contact/`.
- **Live counter status**: client-side, computed against `Europe/London`, shown in header and homepage contact band.
- **Postcode validation**: inline "Yes — we cover PL12" style confirmation, checked client-side against a static prefix list built from the service-area towns in brief §1 — no external API needed.
- **Email delivery**: Resend via a Next.js server action, sends formatted submissions to info@tamarplasticsltd.co.uk. Requires `RESEND_API_KEY` env var from the client. If unset, submission still completes and shows the correct success UI, and logs server-side — the site isn't broken by the key's absence, but real delivery won't happen until it's supplied.
- Honeypot field + basic in-memory per-IP rate limiting. No CAPTCHA, per brief.

## 9. SEO / AEO — Phase 1

- `LocalBusiness` JSON-LD (NAP, geo-coordinates, `openingHoursSpecification`, `areaServed` = service-area towns from brief §1, `priceRange`, `sameAs`) on every page via root layout.
- `Service` schema per product category page.
- `FAQPage` schema on every page with real FAQs.
- `BreadcrumbList` sitewide.
- `AggregateRating`/`Review` schema: built but left unpopulated/omitted from page output until real Google review data is available (see §2 decision table) — not seeded with placeholder/fabricated review data.
- `/llms.txt` at root, listing Phase 1 pages with one-line descriptions and canonical NAP.
- `robots.txt`: explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- Answer-first summaries (60 words) on every product page, written to extraction-friendly structure (brief §7.2/§7.4).
- Legacy 301 redirect map and GA4/consent banner: deferred (see §2 decision table).

## 10. Content approach

Real authored copy for every Phase 1 page, following the brief's voice rules (§2.4: short sentences, real numbers, no "solutions"/"bespoke journey" language) and answer-first structure. Factual specifics that can't be known without client input (exact stock lines, guarantee lengths, BBA/BSI approvals, brands stocked, specific review quotes) are marked inline as `[CONFIRM: ...]` rather than invented — the brief is explicit about not fabricating claims, and this preserves that discipline through implementation rather than only stating it as a principle.

## 11. Acceptance criteria applicable to Phase 1

From the source brief's §10, the following apply to this phase:

1. A trade buyer can find stock status and a route to a trade price in two clicks from the homepage.
3. Lighthouse mobile ≥95 on homepage and a product page (configurator excluded — not built this phase).
5. `LocalBusiness` schema validates and NAP matches Google Business Profile character for character.
6. Fully operable by keyboard; axe zero critical issues.
7. `prefers-reduced-motion: reduce` produces a fully static, fully legible site.
8. Every product category page has a specification table, an answer-first summary, and at least 5 real FAQs.
9. No page uses more than one orange element per viewport height.
10. A stranger landing on the homepage understands within 5 seconds that this is a Saltash trade counter *and* an installer, and knows which door to walk through.

Not applicable this phase: #2 (door design completion — configurator is Phase 2), #4 (legacy URL redirects — deferred).

## 12. Explicitly deferred / out of scope for Phase 1

- Door designer/configurator
- Projects gallery
- Guides hub
- Full `/reviews/` page
- `/trade/brands/` (supplier logos — see §2 conflict note on carousel vs. brief §9's no-carousel rule)
- Remaining area pages beyond Saltash/Plymouth
- Finance page
- CMS integration (Sanity/Payload)
- GA4 / consent banner
- Legacy 301 redirect map
- Trade account portal, stock/price enquiry bar, measure-up guide PDF
