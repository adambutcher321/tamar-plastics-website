# Tamar Plastics Ltd — Design Direction (as built)

**How to use this file:** this is the companion to the full build brief (`docs/superpowers/specs/2026-07-22-tamar-plastics-phase1-design.md`). That document specifies what the site must do; this one records what the design actually *is*, as built, and why — so anyone picking this up (a developer, a future session, a designer) can continue consistently without re-deriving these calls from scratch. Where this document is silent, the original brief still governs.

---

## 0. THE PROMPT (status)

The original brief's positioning holds: a rebuild, not a refresh, forking trade buyers from homeowners before either wades through the other's content. Phase 1 — the design system, the hero, and the homepage — is built and reviewed. What follows documents the concrete decisions made while building it, several of which resolved ambiguity or corrected assumptions the original brief couldn't have anticipated (a font that doesn't exist under the name given, a tool that renders differently than assumed).

---

## 1. BRAND SYSTEM — AS IMPLEMENTED

### 1.1 Colour

Implemented exactly as specified, via Tailwind CSS v4's CSS-first `@theme` directive in `app/globals.css` (the project scaffolded on Tailwind v4, not the v3 the original brief's tooling assumed — v4 has no `tailwind.config.ts` theme object; tokens are `@theme` custom properties and Tailwind auto-generates the utility classes from them). All nine tokens (`--tamar-orange`, `--tamar-black`, `--ink-800` through `--ink-050`, `--sky`, `--in-stock`) are present at their exact hex values, with both the Tailwind-prefixed form (`--color-tamar-orange`) and an unprefixed alias (`--tamar-orange`) for raw CSS use.

Contrast discipline is enforced **structurally**, not just documented: the shared `Button` component exposes exactly two variants — `primary` (orange fill, near-black label) and `dark` (black fill, white label). There is no prop path that renders orange text on white or white text on orange. The one-orange-fill-per-viewport rule is respected by construction: the hero's diagonal sweep is the hero's only fill, and no other section introduces a second one in the same screen.

### 1.2 Typography

Inter Tight and JetBrains Mono are implemented exactly as specified — both are real Google Fonts families with the exact weights called for (400/500/600 and 400/500 respectively).

**Archivo Expanded is not a real Google Fonts family.** Google Fonts has `Archivo`, `Archivo Black`, and `Archivo Narrow` — no "Expanded" cut. `Archivo` is a variable font with a width axis (`wdth`, range 62–125, default 100); the expanded look the brief wants is that axis pushed toward its maximum, not a separate family. The implementation loads `Archivo` as a variable font with the `wdth` axis enabled, and `app/globals.css` adds `.font-display { font-stretch: 125%; }` — the standard CSS property that maps directly to a variable font's width axis in evergreen browsers. Visually this produces the same wide, confident display type the brief describes; it just isn't the file the brief named.

Type scale (12/14/16/18/22/28/40/64/96, clamp for the hero) and the 17px/1.55 body minimum are implemented as specified.

### 1.3 Logo & mark

The real logo file doesn't exist yet. `KeyholeMark` is a same-shape SVG approximation (roof triangle, keyhole cut via an SVG `<mask>`) built so the real asset is a one-file swap later — every call site depends only on the component's external API, not its internals. It's currently used as the FAQ/bullet glyph and the hero's breathing scroll cue, per the brief.

### 1.4 Voice

Unchanged from the brief — short sentences, real numbers, no "solutions"/"bespoke journey" language. Applied throughout the homepage copy as written.

---

## 2. THE HERO — AS BUILT

"The Roofline Cut" was chosen over "Stock Ticker" (client steer, confirmed during brainstorming) — it serves both audiences equally, which the brief itself recommends.

### 2.1 Photography

There is no commissioned photograph of a real Saltash/Tamar Valley property yet. Rather than ship a flat placeholder shape (which read as unfinished and was the direct cause of the first round of "this looks awful" feedback), the hero background is **AI-generated** via the Higgsfield CLI (`soul_location` model), as an explicit stand-in for real photography — not a permanent decision. This should be swapped for genuine commissioned photography of an actual local property when that's available; the `Hero` component's `posterSrc` prop is a one-line change.

**Hard-won lessons generating it**, worth keeping in mind for any future regeneration:
- The model will invent illegible signage, glowing neon text, or logos inside window reflections unless the prompt explicitly excludes them ("no text, no signage, no neon, no logos, no lettering, no numbers, no symbols"). One generation had to be discarded for exactly this.
- The model will occasionally place a human silhouette in an interior unless explicitly told the property is empty and unoccupied. Another generation was discarded for this.
- A composition with a large plain/flat wall segment (nothing visually happening between the roofline and the windows) reads as dead space once real layout is on top of it — prompt for detail and light distributed across the *whole* frame, not concentrated in one band.
- Always inspect the raw generated image directly before wiring it in. Trusting a description of what was generated, without looking, is how the first version (with a small flat placeholder) went unnoticed as inadequate for as long as it did.

### 2.2 Wordmark treatment

The brief calls for the "TAMAR" wordmark to be masked *behind* a roofline silhouette so the roof edge physically occludes the lower third of the letterforms — a pixel-precise mask keyed to one specific photograph. That was simplified for Phase 1: the wordmark is pinned to a compact band near the top of the hero (`clamp(3rem, 11vw, 9rem)`, was briefed at up to 16rem), and the headline/sub-copy/CTA cards are anchored to the *bottom* of the frame in their own block. The two never occupy the same vertical space, so they can't collide regardless of viewport width or copy length or which photo is behind them.

This is a legibility-first simplification, not the brief's literal effect. **Open item:** if true photographic occlusion (letters visually passing behind the roof edge) is wanted later, it needs a hand-cut alpha mask matched to whatever the final hero photograph actually is — fragile across photo changes, and only worth the effort once the real commissioned photo is locked in.

### 2.3 Motion

Built as specified: Ken Burns drift on the still (20s, 1.06× scale), a single orange diagonal sweep reveal on load (700ms, no loop), and the keyhole scroll cue breathing on a 4s loop (the one permitted infinite animation).

**Hard-won lesson:** Framer Motion animates via inline styles/JS, so a CSS `motion-reduce:` class cannot stop it — that combination will silently fail `prefers-reduced-motion` while looking correct in code review. The only reliable gate is Framer Motion's own `useReducedMotion()` hook, branching every animated value explicitly (durations to 0, initial/animate states collapsed to their final values, the infinite-loop element not rendered at all). This is now the pattern for all three animated hero elements.

---

## 3. LAYOUT PRINCIPLES (learned, not in the original brief)

- **Never let two large text elements share a vertical band on a photo background.** Anchor competing text to opposite edges of the container (top/bottom), not stacked in the same zone with only opacity or z-order separating them. This was the single biggest defect in the first pass — the wordmark and the H1 rendered directly on top of each other.
- **Don't repeat an identical CTA/section immediately after itself.** The homepage originally had the audience-fork cards in the hero, then the *same* two cards again in the very next section with near-identical copy. It reads as templated repetition, not deliberate reinforcement, when the two instances are back to back. Removed for Phase 1 — the hero's own fork is sufficient; if a second reinforcement point is wanted, put it further down the page (e.g. near the contact band) with materially different framing, not the same two headlines again.
- **Placeholder data still needs unique React keys.** Two placeholder reviews sharing the literal string `"[CONFIRM: real reviewer name]"` as both the display text *and* the list key caused a real console error (`Encountered two children with the same key`), not just a copy problem. Placeholder convention (`[CONFIRM: ...]`) is fine for *display* text; it must not double as a unique identifier anywhere in code.

---

## 4. WHAT NOT TO DO — ADDITIONS TO THE BRIEF'S §9

On top of the original brief's list (no stock photography, no carousels, no orange gradients, etc.):

- No AI-generated photography wired into a page without first inspecting the raw output for hallucinated text, logos, or people.
- No large decorative text placed over a photo without checking it against the *actual* headline/body copy at real viewport widths — a layout that looks fine in isolated component code can still collide once real content is dropped in.
- No duplicate homepage sections repeating the same CTA copy back to back.

---

## 5. STATUS

Phase 1 foundation — design tokens, all shared UI components, the Hero, Header/Footer, and full homepage assembly — is implemented, reviewed (task-level and whole-branch), and running locally. Hero photography is a generated stand-in, flagged for replacement with real commissioned photography. Forms, the door configurator, and the product/area/trade/home content pages are not yet started — they're a separate plan, to begin once this session resumes.
