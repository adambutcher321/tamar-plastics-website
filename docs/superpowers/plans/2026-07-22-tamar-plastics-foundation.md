# Tamar Plastics Website — Foundation, Design System & Homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js project, the full brand design system, and a complete, working homepage — the platform every later page (products, areas, trade/home funnels, forms) will build on.

**Architecture:** Next.js 15 App Router + TypeScript, statically generated. Tailwind CSS v3 carries the brand tokens. Content lives in typed TypeScript data modules under `content/`, not a CMS. Pure business logic (postcode matching, counter open/closed state, JSON-LD builders, rate limiting) lives in `lib/` as tested, framework-free functions. Presentational components live in `components/`. Framer Motion is used only inside the Hero component. This plan produces one working route (`/`) plus every shared component and utility that later plans (forms, product pages, area pages, trade/home funnel pages) will import — those pages don't exist yet and are out of scope here.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS 3.4, Vitest 2 (+ @testing-library/react for the handful of components with real logic), Framer Motion (Hero only), `next/font/google` for Archivo Expanded / Inter Tight / JetBrains Mono (Next.js self-hosts these at build time — no runtime request to Google, satisfying the brief's self-hosted-fonts requirement without manual font files).

## Global Constraints

- Colours: `--tamar-orange: #F2571A`, `--tamar-black: #231F20`, `--ink-800: #35302F`, `--ink-600: #5C5654`, `--ink-400: #8E8785`, `--ink-200: #D9D4D2`, `--ink-050: #F6F4F3`, `--sky: #EDF1F4`, `--in-stock: #1F7A4C`. No other colours. No gradients.
- Contrast rule: orange-on-white / white-on-orange text is never used below 24px regular / 18.66px bold. Body copy is `--ink-800` or `--tamar-black` only — never orange.
- Ratio discipline: no page may render more than one orange-filled element per viewport height (acceptance criterion #9).
- Fonts: Archivo Expanded 700/800 for display, Inter Tight 400/500/600 for body, JetBrains Mono 400/500 for spec/product data only. No Poppins, Montserrat, Open Sans, or Bebas Neue.
- Body copy minimum 17px, line-height 1.55.
- Tap targets minimum 44px.
- `prefers-reduced-motion: reduce` must produce a fully static, fully legible page — no exceptions.
- No carousels or sliders anywhere. No parallax on more than one section. No chat widget popping on load.
- Voice: short sentences, real numbers, no "solutions" / "bespoke journey" / "we pride ourselves" language.
- Visual bar: the site must read as luxurious and professional, not as generic AI-generated output. No purple/indigo gradients, no generic rounded-everything cards with soft drop shadows, no stock "friendly SaaS" illustration style, no emoji as UI decoration, no cookie-cutter Bootstrap/Tailwind-starter look. The brand system carries this on its own — large confident Archivo Expanded display type, tight negative tracking, generous whitespace, flat colour, sparing orange — lean into scale and restraint rather than adding ornamentation.
- Every component with real branching logic (not pure JSX/markup) gets a Vitest test written first (TDD). Purely presentational components are verified via `npm run build` (TypeScript compiles, no runtime errors) plus a manual dev-server check in the final task — this project has very little UI branching logic outside the components called out below, so this is the pragmatic test boundary, not an oversight.
- Every git commit in this plan follows the repo's existing commit convention (see Task 1, Step 5, for the first commit — subsequent commits use plain `feat:` / `test:` / `chore:` prefixes, no footer required beyond what the environment's commit tooling adds automatically).
- URLs are trailing-slash throughout (`/trade/`, `/products/doors/`, matching the sitemap in the design spec). `next.config.ts` sets `trailingSlash: true` and `vitest.config.ts` defines `process.env.__NEXT_TRAILING_SLASH` to match (added mid-plan, after Task 8 surfaced that `next/link` strips trailing slashes by default and Vitest doesn't run the Next.js build step that would otherwise pick up `next.config.ts`). Every `href` written from here on — in any component or test — should include the trailing slash exactly as the sitemap specifies.

---

## File Structure

```
tamar-plastics/
├── app/
│   ├── layout.tsx              # Root layout: fonts, LocalBusiness JSON-LD, Header/Footer wrap
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   └── robots.ts                # robots.txt route (allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SpecTable.tsx
│   │   ├── FAQAccordion.tsx
│   │   └── Breadcrumbs.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── marketing/
│       ├── KeyholeMark.tsx
│       ├── CounterStatus.tsx
│       ├── Hero.tsx
│       ├── AudienceForkCard.tsx
│       ├── ProofBand.tsx
│       └── ReviewCard.tsx
├── content/
│   ├── business.ts              # NAP, hours, service-area towns, geo
│   ├── reviews.ts                # Placeholder reviews, clearly marked
│   └── content-types.ts          # Shared ProductPageContent / AreaPageContent shapes (used by later plans)
├── lib/
│   ├── postcode.ts
│   ├── counter-status.ts
│   ├── rate-limit.ts
│   └── schema.ts                 # JSON-LD builders
├── public/
│   └── llms.txt
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`, `.gitignore`, `app/globals.css`, `app/layout.tsx` (minimal placeholder, replaced in Task 19), `app/page.tsx` (minimal placeholder, replaced in Task 20)

**Interfaces:**
- Produces: a working `npm run dev`, `npm run build`, `npm run test`, `npm run lint`, `npm run typecheck` toolchain that every later task relies on.

- [ ] **Step 1: Scaffold the Next.js app**

Run:
```bash
cd "/Users/adambutcher/Desktop/Tamar Plastics Website"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --use-npm
```
When prompted about the non-empty directory (it contains `docs/` and `.git`), confirm to proceed.

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia. Framer Motion's useReducedMotion()
// (used by Hero, Task 14) calls it on every render, so without this stub
// every test that renders Hero throws "matchMedia is not a function".
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
```

- [ ] **Step 4: Add scripts to `package.json`**

Edit the `"scripts"` block to:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 5: Verify the toolchain and commit**

Run: `npm run typecheck && npm run build`
Expected: both succeed (the default `create-next-app` starter page builds cleanly).

```bash
git add -A
git commit -m "chore: scaffold Next.js project with TypeScript, Tailwind, Vitest"
```

---

### Task 2: Brand design tokens (Tailwind theme + global CSS)

> **Deviation from original plan, resolved before this task was dispatched:** Task 1's `create-next-app` run installed **Tailwind CSS v4** (the current default), not the v3 the plan originally assumed. Tailwind v4 has no `tailwind.config.ts` theme object by default — theme tokens are declared in CSS via the `@theme` at-rule in `app/globals.css`, and utility classes (`bg-tamar-orange`, `font-display`, etc.) are generated automatically from the custom property names declared there. This task's steps below use the v4 approach. `tailwind.config.ts` (currently just a `content` path array from Task 1) is left as-is — it's harmless in v4 and not required for this task.

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: Tailwind colour utilities `bg-tamar-orange`, `text-tamar-black`, `bg-ink-800` … `bg-ink-050`, `bg-sky`, `text-in-stock`, and CSS custom properties (`--color-tamar-orange` etc., Tailwind v4's own naming, plus unprefixed aliases `--tamar-orange` etc. matching the spec's exact token names) available to any component using raw CSS (needed by Hero's SVG mask work in Task 14). Produces the `font-display`, `font-body`, `font-mono` Tailwind font-family utilities. These map to next/font CSS variables named `--font-archivo-expanded`, `--font-inter-tight`, `--font-jetbrains-mono` — Task 19 must set `next/font`'s `variable` option to exactly these names (not `--font-display` etc., which would self-reference and break, since those are the Tailwind theme key names this task declares).

- [ ] **Step 1: Write global CSS with brand theme tokens**

Replace the contents of `app/globals.css` (replacing the `create-next-app` default content) with:
```css
@import "tailwindcss";

@theme {
  --color-tamar-orange: #F2571A;
  --color-tamar-black: #231F20;
  --color-ink-800: #35302F;
  --color-ink-600: #5C5654;
  --color-ink-400: #8E8785;
  --color-ink-200: #D9D4D2;
  --color-ink-050: #F6F4F3;
  --color-sky: #EDF1F4;
  --color-in-stock: #1F7A4C;

  --font-display: var(--font-archivo-expanded);
  --font-body: var(--font-inter-tight);
  --font-mono: var(--font-jetbrains-mono);

  --text-xs: 12px;
  --text-xs--line-height: 1.5;
  --text-sm: 14px;
  --text-sm--line-height: 1.5;
  --text-base: 17px;
  --text-base--line-height: 1.55;
  --text-lg: 18px;
  --text-lg--line-height: 1.55;
  --text-xl: 22px;
  --text-xl--line-height: 1.4;
  --text-2xl: 28px;
  --text-2xl--line-height: 1.3;
  --text-3xl: 40px;
  --text-3xl--line-height: 1.15;
  --text-4xl: 64px;
  --text-4xl--line-height: 1.05;
  --text-5xl: 96px;
  --text-5xl--line-height: 1;
}

/* Unprefixed aliases matching the design spec's exact CSS variable names,
   for any raw CSS that references them directly (e.g. Hero, Task 14). */
:root {
  --tamar-orange: var(--color-tamar-orange);
  --tamar-black: var(--color-tamar-black);
  --ink-800: var(--color-ink-800);
  --ink-600: var(--color-ink-600);
  --ink-400: var(--color-ink-400);
  --ink-200: var(--color-ink-200);
  --ink-050: var(--color-ink-050);
  --sky: var(--color-sky);
  --in-stock: var(--color-in-stock);
}

body {
  color: var(--color-tamar-black);
  background-color: #FFFFFF;
}

:focus-visible {
  outline: 2px solid var(--color-tamar-orange);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds with no Tailwind/PostCSS errors.

- [ ] **Step 3: Verify a token utility actually generates CSS**

Run: `npm run dev &` then in another terminal `curl -s http://localhost:3000 | grep -o "bg-tamar-orange" | head -1 || true`, then stop the dev server (`kill %1`). This is a smoke check, not a strict pass/fail gate — the real verification is Step 2's clean build plus visual confirmation in Task 21's manual check. If you'd rather skip the curl smoke check, that's fine; note it as skipped in your report.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: add brand design tokens via Tailwind v4 @theme"
```

---

### Task 3: Postcode service-area check (`lib/postcode.ts`)

**Files:**
- Create: `lib/postcode.ts`
- Test: `lib/postcode.test.ts`

**Interfaces:**
- Produces: `isInServiceArea(postcode: string): boolean` and `SERVICE_AREA_TOWNS: readonly string[]` — consumed by `PostcodeCheck` form component in the forms plan, and by `content/business.ts` (Task 6) for the `areaServed` schema field.

- [ ] **Step 1: Write the failing test**

Create `lib/postcode.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { isInServiceArea } from './postcode';

describe('isInServiceArea', () => {
  it('accepts a Saltash postcode with a space', () => {
    expect(isInServiceArea('PL12 6TW')).toBe(true);
  });

  it('accepts a Saltash postcode without a space, lowercase', () => {
    expect(isInServiceArea('pl126tw')).toBe(true);
  });

  it('accepts a central Plymouth postcode', () => {
    expect(isInServiceArea('PL4 8AA')).toBe(true);
  });

  it('rejects a postcode outside the service area', () => {
    expect(isInServiceArea('EX1 1AA')).toBe(false);
  });

  it('rejects garbage input without throwing', () => {
    expect(isInServiceArea('not a postcode')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isInServiceArea('')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/postcode.test.ts`
Expected: FAIL — `Cannot find module './postcode'`

- [ ] **Step 3: Write the implementation**

Create `lib/postcode.ts`:
```ts
// Postcode district list is best-effort from public UK postcode-district
// boundaries for the towns in the brief's service area. [CONFIRM with
// client / Royal Mail PAF before relying on this for a live "we don't
// cover you" refusal — a false negative turns away a real customer.]
const SERVICE_AREA_DISTRICTS = [
  'PL1', 'PL2', 'PL3', 'PL4', 'PL5', 'PL6', 'PL7', 'PL8', 'PL9', // Plymouth
  'PL10', // Millbrook / Rame Peninsula
  'PL11', // Torpoint
  'PL12', // Saltash, Landrake, St Germans, Trerulefoot, St Mellion
  'PL13', // Looe
  'PL14', // Liskeard
  'PL15', // Launceston
  'PL17', // Callington
  'PL19', // Tavistock
  'PL30', 'PL31', // Bodmin
] as const;

export const SERVICE_AREA_TOWNS = [
  'Saltash', 'Plymouth', 'Torpoint', 'Callington', 'Liskeard', 'Looe',
  'St Germans', 'Landrake', 'Millbrook', 'Tavistock', 'Launceston',
  'Bodmin', 'Trerulefoot', 'St Mellion',
] as const;

export function isInServiceArea(rawPostcode: string): boolean {
  const normalised = rawPostcode.trim().toUpperCase().replace(/\s+/g, '');
  if (!normalised) return false;

  const match = normalised.match(/^([A-Z]{1,2}\d{1,2})\d[A-Z]{2}$/);
  if (!match) return false;

  const district = match[1];
  return (SERVICE_AREA_DISTRICTS as readonly string[]).includes(district);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/postcode.test.ts`
Expected: PASS (6/6)

- [ ] **Step 5: Commit**

```bash
git add lib/postcode.ts lib/postcode.test.ts
git commit -m "feat: add postcode service-area check"
```

---

### Task 4: Counter open/closed status (`lib/counter-status.ts`)

**Files:**
- Create: `lib/counter-status.ts`
- Test: `lib/counter-status.test.ts`

**Interfaces:**
- Produces: `getCounterStatus(date?: Date): { isOpen: boolean; label: string }` — consumed by the `CounterStatus` display component (Task 11).

- [ ] **Step 1: Write the failing test**

Create `lib/counter-status.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { getCounterStatus } from './counter-status';

// All fixture dates are in January (GMT, no BST offset) so UTC hour == London hour.
describe('getCounterStatus', () => {
  it('is open on a weekday mid-morning', () => {
    const monday10am = new Date('2026-01-05T10:00:00Z');
    expect(getCounterStatus(monday10am)).toEqual({
      isOpen: true,
      label: 'Counter open — closes 17:00',
    });
  });

  it('is closed before opening on a weekday', () => {
    const monday7am = new Date('2026-01-05T07:00:00Z');
    expect(getCounterStatus(monday7am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 today',
    });
  });

  it('is closed after hours on a non-Friday weekday', () => {
    const monday6pm = new Date('2026-01-05T18:00:00Z');
    expect(getCounterStatus(monday6pm)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 tomorrow',
    });
  });

  it('is closed after hours on a Friday, pointing to Monday', () => {
    const friday6pm = new Date('2026-01-09T18:00:00Z');
    expect(getCounterStatus(friday6pm)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });

  it('is closed on a Saturday', () => {
    const saturday10am = new Date('2026-01-10T10:00:00Z');
    expect(getCounterStatus(saturday10am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });

  it('is closed on a Sunday', () => {
    const sunday10am = new Date('2026-01-11T10:00:00Z');
    expect(getCounterStatus(sunday10am)).toEqual({
      isOpen: false,
      label: 'Closed — opens 08:00 Monday',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/counter-status.test.ts`
Expected: FAIL — `Cannot find module './counter-status'`

- [ ] **Step 3: Write the implementation**

Create `lib/counter-status.ts`:
```ts
export interface CounterStatusResult {
  isOpen: boolean;
  label: string;
}

function getLondonParts(date: Date): { weekday: string; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === 'weekday')!.value;
  const hourStr = parts.find((p) => p.type === 'hour')!.value;
  const hour = parseInt(hourStr, 10) % 24;
  return { weekday, hour };
}

export function getCounterStatus(date: Date = new Date()): CounterStatusResult {
  const { weekday, hour } = getLondonParts(date);

  if (weekday === 'Sat' || weekday === 'Sun') {
    return { isOpen: false, label: 'Closed — opens 08:00 Monday' };
  }

  if (hour < 8) {
    return { isOpen: false, label: 'Closed — opens 08:00 today' };
  }

  if (hour < 17) {
    return { isOpen: true, label: 'Counter open — closes 17:00' };
  }

  if (weekday === 'Fri') {
    return { isOpen: false, label: 'Closed — opens 08:00 Monday' };
  }

  return { isOpen: false, label: 'Closed — opens 08:00 tomorrow' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/counter-status.test.ts`
Expected: PASS (6/6)

- [ ] **Step 5: Commit**

```bash
git add lib/counter-status.ts lib/counter-status.test.ts
git commit -m "feat: add counter open/closed status logic"
```

---

### Task 5: In-memory rate limiter (`lib/rate-limit.ts`)

**Files:**
- Create: `lib/rate-limit.ts`
- Test: `lib/rate-limit.test.ts`

**Interfaces:**
- Produces: `isRateLimited(key: string, now?: number): boolean` — consumed by the form submission server action in the forms plan.

- [ ] **Step 1: Write the failing test**

Create `lib/rate-limit.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, __resetRateLimitStore } from './rate-limit';

describe('isRateLimited', () => {
  beforeEach(() => {
    __resetRateLimitStore();
  });

  it('allows the first few requests from a key', () => {
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited('1.2.3.4', 1000)).toBe(false);
    }
  });

  it('blocks after the limit is exceeded within the window', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('1.2.3.4', 1000)).toBe(true);
  });

  it('resets once the window has passed', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('1.2.3.4', 1000 + 61_000)).toBe(false);
  });

  it('tracks separate keys independently', () => {
    for (let i = 0; i < 5; i++) {
      isRateLimited('1.2.3.4', 1000);
    }
    expect(isRateLimited('5.6.7.8', 1000)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/rate-limit.test.ts`
Expected: FAIL — `Cannot find module './rate-limit'`

- [ ] **Step 3: Write the implementation**

Create `lib/rate-limit.ts`:
```ts
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

let hits = new Map<string, number[]>();

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const existing = hits.get(key) ?? [];
  const withinWindow = existing.filter((timestamp) => now - timestamp < WINDOW_MS);
  withinWindow.push(now);
  hits.set(key, withinWindow);
  return withinWindow.length > MAX_REQUESTS_PER_WINDOW;
}

/** Test-only: clears the module-level store between test cases. */
export function __resetRateLimitStore(): void {
  hits = new Map();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/rate-limit.test.ts`
Expected: PASS (4/4)

- [ ] **Step 5: Commit**

```bash
git add lib/rate-limit.ts lib/rate-limit.test.ts
git commit -m "feat: add in-memory rate limiter for form submissions"
```

---

### Task 6: Business data + JSON-LD schema builders

**Files:**
- Create: `content/business.ts`
- Create: `lib/schema.ts`
- Test: `lib/schema.test.ts`

**Interfaces:**
- Consumes: `SERVICE_AREA_TOWNS` from `lib/postcode.ts` (Task 3).
- Produces: `BUSINESS` const object; `buildLocalBusinessSchema()`, `buildServiceSchema(params)`, `buildFaqSchema(faqs)`, `buildBreadcrumbSchema(items)` — consumed by root layout (Task 19) and every later product/area page.

- [ ] **Step 1: Write `content/business.ts`**

Create `content/business.ts`:
```ts
import { SERVICE_AREA_TOWNS } from '@/lib/postcode';

export const BUSINESS = {
  legalName: 'Tamar Plastics Ltd',
  streetAddress: 'Unit 4, Gwel Avon Business Park, Gilston Road',
  addressLocality: 'Saltash',
  addressRegion: 'Cornwall',
  postalCode: 'PL12 6TW',
  addressCountry: 'GB',
  phone: '+441752841234',
  phoneDisplay: '01752 841234',
  email: 'info@tamarplasticsltd.co.uk',
  // [CONFIRM exact site coordinates for Gwel Avon Business Park — this is
  // an approximate Saltash town-centre position, close but not surveyed.]
  geo: { latitude: 50.4079, longitude: -4.2019 },
  hours: {
    opens: '08:00',
    closes: '17:00',
    days: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    ] as const,
  },
  serviceAreaTowns: SERVICE_AREA_TOWNS,
  priceRange: '££',
  predecessor: 'Carlton Plastics',
} as const;
```

- [ ] **Step 2: Write the failing test for the schema builders**

Create `lib/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from './schema';

describe('buildLocalBusinessSchema', () => {
  it('includes correct NAP and type', () => {
    const schema = buildLocalBusinessSchema();
    expect(schema['@type']).toBe('HomeAndConstructionBusiness');
    expect(schema.name).toBe('Tamar Plastics Ltd');
    expect(schema.telephone).toBe('+441752841234');
    expect(schema.address.postalCode).toBe('PL12 6TW');
    expect(schema.areaServed).toContain('Saltash');
    expect(schema.openingHoursSpecification[0].opens).toBe('08:00');
  });
});

describe('buildServiceSchema', () => {
  it('builds a Service node with the given fields', () => {
    const schema = buildServiceSchema({
      name: 'uPVC Doors',
      description: 'Composite and uPVC doors supplied and fitted.',
      url: 'https://example.com/products/doors',
    });
    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBe('uPVC Doors');
    expect(schema.provider.name).toBe('Tamar Plastics Ltd');
  });
});

describe('buildFaqSchema', () => {
  it('maps FAQ pairs into FAQPage mainEntity', () => {
    const schema = buildFaqSchema([
      { question: 'Do you fit as well as supply?', answer: 'Yes, both.' },
    ]);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe('Do you fit as well as supply?');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Yes, both.');
  });
});

describe('buildBreadcrumbSchema', () => {
  it('maps items into an ordered ItemList', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Products', url: 'https://example.com/products' },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe('Products');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run lib/schema.test.ts`
Expected: FAIL — `Cannot find module './schema'`

- [ ] **Step 4: Write the implementation**

Create `lib/schema.ts`:
```ts
import { BUSINESS } from '@/content/business';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: BUSINESS.legalName,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: [...BUSINESS.serviceAreaTowns],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...BUSINESS.hours.days],
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    areaServed: [...BUSINESS.serviceAreaTowns],
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS.legalName,
    },
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run lib/schema.test.ts`
Expected: PASS (4/4)

- [ ] **Step 6: Commit**

```bash
git add content/business.ts lib/schema.ts lib/schema.test.ts
git commit -m "feat: add business data and JSON-LD schema builders"
```

---

### Task 7: Shared content-type contracts

**Files:**
- Create: `content/content-types.ts`

**Interfaces:**
- Produces: `SpecRow`, `Faq`, `ProductPageContent`, `AreaPageContent` types — these are the contracts the forms/content-pages plan will implement for every product and area page. No runtime logic in this task; TypeScript enforces the shape at compile time for every later content module.

- [ ] **Step 1: Write the types**

Create `content/content-types.ts`:
```ts
export interface SpecRow {
  label: string;
  value: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CrossLink {
  label: string;
  href: string;
}

/**
 * Every /products/* page must satisfy this shape — it's what makes
 * acceptance criterion "every product page has a spec table, an
 * answer-first summary, and 5+ FAQs" structural rather than a thing to
 * remember by hand.
 */
export interface ProductPageContent {
  slug: string;
  name: string;
  h1: string;
  /** ~60 words, extractable as a standalone answer by an AI search engine. */
  answerFirstSummary: string;
  specTable: SpecRow[];
  colours: string[];
  faqs: Faq[];
  crossLinks: CrossLink[];
}

export function assertValidProductPageContent(content: ProductPageContent): void {
  if (content.faqs.length < 5) {
    throw new Error(
      `${content.slug}: needs at least 5 FAQs, has ${content.faqs.length}`
    );
  }
  if (content.specTable.length === 0) {
    throw new Error(`${content.slug}: spec table is empty`);
  }
  const wordCount = content.answerFirstSummary.trim().split(/\s+/).length;
  if (wordCount < 40 || wordCount > 90) {
    throw new Error(
      `${content.slug}: answer-first summary is ${wordCount} words, expected roughly 60`
    );
  }
}

export interface AreaPageContent {
  slug: string;
  townName: string;
  h1: string;
  localContext: string;
  driveTimeFromDepot: string;
  routeDescription: string;
  faqs: Faq[];
}
```

- [ ] **Step 2: Write the failing test for the validator**

Create `content/content-types.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { assertValidProductPageContent, ProductPageContent } from './content-types';

const validContent: ProductPageContent = {
  slug: 'doors',
  name: 'Doors',
  h1: 'uPVC & Composite Doors in Cornwall',
  answerFirstSummary:
    'uPVC and composite front, back, French, patio and bi-fold doors, ' +
    'supplied over the counter in Saltash or supplied and fitted across ' +
    'Cornwall and Plymouth. Composite doors run from around £900 to £1,800 ' +
    'fitted depending on style and glazing. In stock colours collect same ' +
    'day from the trade counter; made-to-order colours and sizes take ' +
    'two to three weeks.',
  specTable: [{ label: 'Thickness', value: '48mm' }],
  colours: ['White', 'Anthracite Grey', 'Black Ash'],
  faqs: Array.from({ length: 5 }, (_, i) => ({
    question: `Question ${i}`,
    answer: `Answer ${i}`,
  })),
  crossLinks: [],
};

describe('assertValidProductPageContent', () => {
  it('accepts valid content', () => {
    expect(() => assertValidProductPageContent(validContent)).not.toThrow();
  });

  it('rejects fewer than 5 FAQs', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, faqs: validContent.faqs.slice(0, 2) })
    ).toThrow(/at least 5 FAQs/);
  });

  it('rejects an empty spec table', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, specTable: [] })
    ).toThrow(/spec table is empty/);
  });

  it('rejects a summary that is far too short', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, answerFirstSummary: 'Too short.' })
    ).toThrow(/answer-first summary/);
  });
});
```

- [ ] **Step 3: Run test to verify it fails initially, then passes**

Run: `npx vitest run content/content-types.test.ts`
Expected: since the implementation was written in Step 1, this should PASS immediately (4/4). If it fails, fix `content-types.ts` until it does.

- [ ] **Step 4: Commit**

```bash
git add content/content-types.ts content/content-types.test.ts
git commit -m "feat: add shared product/area page content contracts"
```

---

### Task 8: `Button` component

**Files:**
- Create: `components/ui/Button.tsx`
- Test: `components/ui/Button.test.tsx`

**Interfaces:**
- Produces: `<Button variant="primary" | "dark" href?, onClick?, type? >children</Button>` — the only button primitive used anywhere on the site. Deliberately does not expose any variant that would render orange text on white or white text on orange, per the brief's contrast rules.

- [ ] **Step 1: Write the failing test**

Create `components/ui/Button.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders primary variant with orange fill and near-black text classes', () => {
    render(<Button variant="primary">Book a survey</Button>);
    const button = screen.getByRole('button', { name: 'Book a survey' });
    expect(button.className).toContain('bg-tamar-orange');
    expect(button.className).toContain('text-tamar-black');
  });

  it('renders dark variant with black fill and white text classes', () => {
    render(<Button variant="dark">Call the counter</Button>);
    const button = screen.getByRole('button', { name: 'Call the counter' });
    expect(button.className).toContain('bg-tamar-black');
    expect(button.className).toContain('text-white');
  });

  it('renders as a link when href is provided', () => {
    render(<Button variant="primary" href="/trade/">Open a trade account</Button>);
    const link = screen.getByRole('link', { name: 'Open a trade account' });
    expect(link).toHaveAttribute('href', '/trade/');
  });

  it('meets the minimum 44px tap target via padding classes', () => {
    render(<Button variant="primary">Tap me</Button>);
    const button = screen.getByRole('button', { name: 'Tap me' });
    expect(button.className).toMatch(/min-h-\[44px\]/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL — `Cannot find module './Button'`

- [ ] **Step 3: Write the implementation**

Create `components/ui/Button.tsx`:
```tsx
import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'dark';

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-tamar-orange text-tamar-black hover:bg-tamar-orange/90',
  dark: 'bg-tamar-black text-white hover:bg-tamar-black/90',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center min-h-[44px] px-6 py-3 ' +
  'font-body font-semibold text-base rounded-sm transition-colors';

export function Button({ variant, children, href, type = 'button', onClick, className = '' }: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: PASS (4/4)

- [ ] **Step 5: Commit**

```bash
git add components/ui/Button.tsx components/ui/Button.test.tsx
git commit -m "feat: add Button component with contrast-safe variants"
```

---

### Task 9: `Card`, `SpecTable`, `FAQAccordion`, `Breadcrumbs` components

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `components/ui/SpecTable.tsx`
- Create: `components/ui/FAQAccordion.tsx`
- Create: `components/ui/Breadcrumbs.tsx`
- Test: `components/ui/FAQAccordion.test.tsx`

**Interfaces:**
- Consumes: `SpecRow`, `Faq` types from `content/content-types.ts` (Task 7).
- Produces: `<Card>`, `<SpecTable rows={SpecRow[]} />`, `<FAQAccordion faqs={Faq[]} />`, `<Breadcrumbs items={{name,href}[]} />` — used throughout the homepage (Task 20) and every later product/area page.

- [ ] **Step 1: Write `Card`**

Create `components/ui/Card.tsx`:
```tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-ink-200 rounded-sm p-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `SpecTable`**

Create `components/ui/SpecTable.tsx`:
```tsx
import type { SpecRow } from '@/content/content-types';

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="w-full font-mono text-sm border-collapse">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-ink-200">
            <th scope="row" className="text-left py-2 pr-4 font-medium text-ink-600 align-top w-1/3">
              {row.label}
            </th>
            <td className="py-2 text-tamar-black">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 3: Write the failing test for `FAQAccordion`**

Create `components/ui/FAQAccordion.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQAccordion } from './FAQAccordion';

const faqs = [
  { question: 'Do you fit as well as supply?', answer: 'Yes, both.' },
  { question: 'Do you deliver?', answer: 'Yes, within the service area.' },
];

describe('FAQAccordion', () => {
  it('renders every question', () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.getByText('Do you fit as well as supply?')).toBeInTheDocument();
    expect(screen.getByText('Do you deliver?')).toBeInTheDocument();
  });

  it('reveals an answer when its question is activated', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={faqs} />);
    await user.click(screen.getByRole('button', { name: 'Do you fit as well as supply?' }));
    expect(screen.getByText('Yes, both.')).toBeVisible();
  });
});
```

Install the missing test dependency:
```bash
npm install -D @testing-library/user-event
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run components/ui/FAQAccordion.test.tsx`
Expected: FAIL — `Cannot find module './FAQAccordion'`

- [ ] **Step 5: Write `FAQAccordion`**

Create `components/ui/FAQAccordion.tsx`:
```tsx
'use client';

import { useState } from 'react';
import type { Faq } from '@/content/content-types';

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink-200 border-t border-b border-ink-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="w-full min-h-[44px] flex items-center justify-between py-4 text-left font-body font-semibold text-lg"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.question}</span>
              <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <p className="pb-4 text-base text-ink-800">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run components/ui/FAQAccordion.test.tsx`
Expected: PASS (2/2)

- [ ] **Step 7: Write `Breadcrumbs`**

Create `components/ui/Breadcrumbs.tsx`:
```tsx
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-600">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-tamar-black">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-tamar-black">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 8: Verify build**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add components/ui/Card.tsx components/ui/SpecTable.tsx components/ui/FAQAccordion.tsx components/ui/FAQAccordion.test.tsx components/ui/Breadcrumbs.tsx package.json package-lock.json
git commit -m "feat: add Card, SpecTable, FAQAccordion, Breadcrumbs components"
```

---

### Task 10: `KeyholeMark` component

**Files:**
- Create: `components/marketing/KeyholeMark.tsx`

**Interfaces:**
- Produces: `<KeyholeMark className? />` — an SVG roof-triangle-with-keyhole shape, used as the FAQ/list bullet glyph, the scroll cue in Hero (Task 14), and available for a future loader. Since the real logo file doesn't exist yet, this is a same-shape approximation built to be swapped for the real asset later without changing any call site.

- [ ] **Step 1: Write the component**

Create `components/marketing/KeyholeMark.tsx`:
```tsx
interface KeyholeMarkProps {
  className?: string;
  strokeOnly?: boolean;
}

/**
 * Roof-triangle-with-keyhole approximation of the brand mark. Swap the
 * <path> data here for the real logo asset when it's available — every
 * call site only depends on this component's external API, not its
 * internals.
 */
export function KeyholeMark({ className = 'w-8 h-8', strokeOnly = false }: KeyholeMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill={strokeOnly ? 'none' : 'currentColor'}
      stroke={strokeOnly ? 'currentColor' : 'none'}
      strokeWidth={strokeOnly ? 1 : 0}
    >
      <mask id="keyhole-cut">
        <rect width="48" height="48" fill="white" />
        <circle cx="24" cy="26" r="5" fill="black" />
        <polygon points="24,29 20,40 28,40" fill="black" />
      </mask>
      <polygon points="24,4 44,26 34,26 34,40 14,40 14,26 4,26" mask="url(#keyhole-cut)" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/marketing/KeyholeMark.tsx
git commit -m "feat: add KeyholeMark brand glyph component"
```

---

### Task 11: `CounterStatus` display component

**Files:**
- Create: `components/marketing/CounterStatus.tsx`
- Test: `components/marketing/CounterStatus.test.tsx`

**Interfaces:**
- Consumes: `getCounterStatus` from `lib/counter-status.ts` (Task 4).
- Produces: `<CounterStatus />` — a client component rendering live open/closed text, used in `Header` (Task 12) and the homepage contact band (Task 20).

- [ ] **Step 1: Write the failing test**

Create `components/marketing/CounterStatus.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CounterStatus } from './CounterStatus';

describe('CounterStatus', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the open label during opening hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-05T10:00:00Z')); // Monday 10am GMT
    render(<CounterStatus />);
    expect(screen.getByText('Counter open — closes 17:00')).toBeInTheDocument();
  });

  it('shows a closed label outside opening hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-10T10:00:00Z')); // Saturday
    render(<CounterStatus />);
    expect(screen.getByText('Closed — opens 08:00 Monday')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/marketing/CounterStatus.test.tsx`
Expected: FAIL — `Cannot find module './CounterStatus'`

- [ ] **Step 3: Write the implementation**

Create `components/marketing/CounterStatus.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import { getCounterStatus, type CounterStatusResult } from '@/lib/counter-status';

export function CounterStatus() {
  const [status, setStatus] = useState<CounterStatusResult>(() => getCounterStatus());

  useEffect(() => {
    setStatus(getCounterStatus());
    const interval = setInterval(() => setStatus(getCounterStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`font-mono text-sm ${status.isOpen ? 'text-in-stock' : 'text-ink-600'}`}>
      {status.label}
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/marketing/CounterStatus.test.tsx`
Expected: PASS (2/2)

- [ ] **Step 5: Commit**

```bash
git add components/marketing/CounterStatus.tsx components/marketing/CounterStatus.test.tsx
git commit -m "feat: add live CounterStatus display component"
```

---

### Task 12: `Header` component with trade/home toggle

**Files:**
- Create: `components/layout/Header.tsx`
- Test: `components/layout/Header.test.tsx`

**Interfaces:**
- Consumes: `Button` (Task 8), `KeyholeMark` (Task 10), `CounterStatus` (Task 11), `BUSINESS` (Task 6).
- Produces: `<Header />` — used in root layout (Task 19). Persists the visitor's last-chosen audience mode (`'trade' | 'home'`) to `localStorage` under the key `tamar-audience-mode`, used only to pre-highlight the matching toggle link — the `/trade/` and `/home-improvements/` routes work standalone regardless of this state.

- [ ] **Step 1: Write the failing test**

Create `components/layout/Header.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders links to both audience funnels', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /trade/i })).toHaveAttribute('href', '/trade/');
    expect(screen.getByRole('link', { name: /home improvements/i })).toHaveAttribute(
      'href',
      '/home-improvements/'
    );
  });

  it('persists the chosen mode to localStorage when a toggle link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole('link', { name: /trade/i }));
    expect(window.localStorage.getItem('tamar-audience-mode')).toBe('trade');
  });

  it('renders the phone number as a tel: link', () => {
    render(<Header />);
    const phoneLink = screen.getByRole('link', { name: '01752 841234' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+441752841234');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/Header.test.tsx`
Expected: FAIL — `Cannot find module './Header'`

- [ ] **Step 3: Write the implementation**

Create `components/layout/Header.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';
import { CounterStatus } from '@/components/marketing/CounterStatus';
import { BUSINESS } from '@/content/business';

const AUDIENCE_MODE_KEY = 'tamar-audience-mode';

function setAudienceMode(mode: 'trade' | 'home') {
  try {
    window.localStorage.setItem(AUDIENCE_MODE_KEY, mode);
  } catch {
    // localStorage unavailable (private browsing, etc.) — non-fatal, the
    // routes work fine without this preference being remembered.
  }
}

export function Header() {
  return (
    <header className="border-b border-ink-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-tamar-black">
          <KeyholeMark className="w-8 h-8 text-tamar-orange" />
          Tamar Plastics
        </Link>

        <nav aria-label="Audience" className="flex items-center gap-2">
          <Link
            href="/trade/"
            onClick={() => setAudienceMode('trade')}
            className="min-h-[44px] flex items-center px-3 font-body font-medium text-sm text-tamar-black hover:text-tamar-orange"
          >
            Trade &amp; Supply
          </Link>
          <Link
            href="/home-improvements/"
            onClick={() => setAudienceMode('home')}
            className="min-h-[44px] flex items-center px-3 font-body font-medium text-sm text-tamar-black hover:text-tamar-orange"
          >
            Home Improvements
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <CounterStatus />
          <a
            href={`tel:${BUSINESS.phone}`}
            className="min-h-[44px] flex items-center font-mono text-sm font-medium text-tamar-black"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/layout/Header.test.tsx`
Expected: PASS (3/3)

- [ ] **Step 5: Commit**

```bash
git add components/layout/Header.tsx components/layout/Header.test.tsx
git commit -m "feat: add Header with audience-mode toggle and live counter status"
```

---

### Task 13: `Footer` component

**Files:**
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `BUSINESS` (Task 6), `KeyholeMark` (Task 10).
- Produces: `<Footer />` — used in root layout (Task 19).

- [ ] **Step 1: Write the component**

Create `components/layout/Footer.tsx`:
```tsx
import Link from 'next/link';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';
import { BUSINESS } from '@/content/business';

export function Footer() {
  return (
    <footer className="bg-tamar-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <KeyholeMark className="w-8 h-8 text-tamar-orange" />
            Tamar Plastics Ltd
          </div>
          <p className="text-sm text-ink-200">
            Formerly Carlton Plastics — same team, same number, new premises on Gwel Avon Business Park.
          </p>
        </div>

        <div>
          <h2 className="font-body font-semibold text-sm uppercase tracking-wide mb-3">Visit or call</h2>
          <address className="not-italic text-sm text-ink-200 space-y-1">
            <p>{BUSINESS.streetAddress}</p>
            <p>{BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}</p>
            <p>
              <a href={`tel:${BUSINESS.phone}`} className="font-mono hover:text-tamar-orange">
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-tamar-orange">
                {BUSINESS.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-body font-semibold text-sm uppercase tracking-wide mb-3">Find your way</h2>
          <nav className="flex flex-col gap-1 text-sm text-ink-200">
            <Link href="/trade/" className="hover:text-tamar-orange">Trade &amp; Supply Only</Link>
            <Link href="/home-improvements/" className="hover:text-tamar-orange">Home Improvements</Link>
            <Link href="/products/" className="hover:text-tamar-orange">Products</Link>
            <Link href="/repairs/" className="hover:text-tamar-orange">Repairs</Link>
            <Link href="/about/" className="hover:text-tamar-orange">About</Link>
            <Link href="/contact/" className="hover:text-tamar-orange">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 14: `Hero` component ("The Roofline Cut")

**Files:**
- Create: `components/marketing/Hero.tsx`
- Test: `components/marketing/Hero.test.tsx`

**Interfaces:**
- Consumes: `KeyholeMark` (Task 10), `framer-motion`.
- Produces: `<Hero videoSrc?: string; posterSrc: string; />` — used only on the homepage (Task 20). Accepts an optional `videoSrc`; Phase 1 calls it without one, exercising the Ken Burns still-image fallback path the brief specifies for exactly this situation.

- [ ] **Step 1: Write the failing test**

Create `components/marketing/Hero.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the H1 headline text', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /uPVC windows, doors and roofline/i,
      })
    ).toBeInTheDocument();
  });

  it('renders the eyebrow text', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(screen.getByText('SALTASH, CORNWALL · EST. AS CARLTON PLASTICS')).toBeInTheDocument();
  });

  it('does not render a <video> element when no videoSrc is given', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(document.querySelector('video')).not.toBeInTheDocument();
  });

  it('renders a <video> element when videoSrc is given', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" videoSrc="/media/hero.mp4" />);
    expect(document.querySelector('video')).toBeInTheDocument();
  });

  it('renders both audience fork links', () => {
    render(<Hero posterSrc="/placeholders/hero-roofline.svg" />);
    expect(screen.getByRole('link', { name: /buying for a job/i })).toHaveAttribute('href', '/trade/');
    expect(screen.getByRole('link', { name: /improving your home/i })).toHaveAttribute(
      'href',
      '/home-improvements/'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/marketing/Hero.test.tsx`
Expected: FAIL — `Cannot find module './Hero'`

- [ ] **Step 3: Write the implementation**

Create `components/marketing/Hero.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';

interface HeroProps {
  posterSrc: string;
  videoSrc?: string;
}

export function Hero({ posterSrc, videoSrc }: HeroProps) {
  // Framer Motion drives its animations via inline styles/JS, so a CSS
  // `motion-reduce:` class can't override them — this hook is the only
  // reliable way to gate the animation on prefers-reduced-motion.
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-tamar-black">
      {/* Background layer: video if supplied, otherwise a slow Ken Burns drift on the poster still. */}
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <motion.img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.06 }}
          transition={{ duration: shouldReduceMotion ? 0 : 20, ease: 'linear' }}
        />
      )}

      {/* Orange diagonal sweep — single reveal on load, no loop. Reduced motion renders the final state immediately. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-tamar-orange"
        initial={
          shouldReduceMotion
            ? { clipPath: 'polygon(0 0, 20% 0, 0 20%)' }
            : { clipPath: 'polygon(0 0, 0 0, 0 0)' }
        }
        animate={{ clipPath: 'polygon(0 0, 20% 0, 0 20%)' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Occluded wordmark — sits behind the fork cards, above the background. */}
      <div className="absolute inset-x-0 top-0 flex justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="font-display font-extrabold text-white/90 leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(4rem, 18vw, 16rem)' }}
        >
          TAMAR
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 flex flex-col items-start gap-6">
        <p className="font-mono text-sm text-white tracking-wide">
          SALTASH, CORNWALL · EST. AS CARLTON PLASTICS
        </p>

        <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl max-w-3xl">
          uPVC windows, doors and roofline. Supplied over the counter or fitted by us.
        </h1>

        <p className="font-body text-white/90 text-lg max-w-2xl">
          Trade counter on Gwel Avon Business Park. Free surveys across Cornwall and Plymouth.
          Same number you&apos;ve always called: 01752 841234.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 w-full max-w-2xl pt-4">
          <Link
            href="/trade/"
            className="min-h-[44px] flex flex-col justify-center bg-white text-tamar-black p-6 rounded-sm hover:bg-white/90"
          >
            <span className="font-display font-bold text-xl">Buying for a job?</span>
            <span className="font-body text-sm text-ink-600">Trade &amp; Supply Only →</span>
          </Link>
          <Link
            href="/home-improvements/"
            className="min-h-[44px] flex flex-col justify-center bg-tamar-black border border-white/20 text-white p-6 rounded-sm hover:bg-tamar-black/80"
          >
            <span className="font-display font-bold text-xl">Improving your home?</span>
            <span className="font-body text-sm text-ink-200">Supply &amp; Fit →</span>
          </Link>
        </div>
      </div>

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 inset-x-0 flex justify-center"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <KeyholeMark className="w-6 h-6 text-white" strokeOnly />
        </motion.div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/marketing/Hero.test.tsx`
Expected: PASS (5/5)

- [ ] **Step 5: Commit**

```bash
git add components/marketing/Hero.tsx components/marketing/Hero.test.tsx
git commit -m "feat: add Hero component (Roofline Cut direction)"
```

---

### Task 15: `AudienceForkCard`, `ProofBand`, `ReviewCard` components + placeholder reviews

**Files:**
- Create: `content/reviews.ts`
- Create: `components/marketing/AudienceForkCard.tsx`
- Create: `components/marketing/ProofBand.tsx`
- Create: `components/marketing/ReviewCard.tsx`

**Interfaces:**
- Produces: `PLACEHOLDER_REVIEWS` data; `<AudienceForkCard />`, `<ProofBand />`, `<ReviewCard review={Review} />` — used on the homepage (Task 20). Note: `AudienceForkCard` here is a reusable, smaller-footprint version for use lower on the page (e.g. product page cross-links in the later plan) — the hero's own large fork cards (Task 14) are hero-specific markup, not this component.

- [ ] **Step 1: Write placeholder review data**

Create `content/reviews.ts`:
```ts
export interface Review {
  author: string;
  rating: number;
  text: string;
  town: string;
}

// PLACEHOLDER — real reviews must be pulled from the Google Business
// Profile per the brief ("pull the Google reviews, don't fabricate").
// Do not use these in AggregateRating/Review JSON-LD; display-only
// placeholders until real review data is wired up.
export const PLACEHOLDER_REVIEWS: Review[] = [
  {
    author: '[CONFIRM: real reviewer name]',
    rating: 5,
    text: '[CONFIRM: real review text from Google Business Profile]',
    town: 'Saltash',
  },
  {
    author: '[CONFIRM: real reviewer name]',
    rating: 5,
    text: '[CONFIRM: real review text from Google Business Profile]',
    town: 'Plymouth',
  },
];
```

- [ ] **Step 2: Write `ReviewCard`**

Create `components/marketing/ReviewCard.tsx`:
```tsx
import type { Review } from '@/content/reviews';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white border border-ink-200 rounded-sm p-6">
      <div className="font-mono text-sm text-tamar-orange mb-2" aria-hidden="true">
        {'★'.repeat(review.rating)}
      </div>
      <blockquote className="text-base text-ink-800 mb-3">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="text-sm text-ink-600">
        {review.author} · {review.town}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 3: Write `AudienceForkCard`**

Create `components/marketing/AudienceForkCard.tsx`:
```tsx
import Link from 'next/link';

interface AudienceForkCardProps {
  title: string;
  description: string;
  href: string;
  variant: 'trade' | 'home';
}

export function AudienceForkCard({ title, description, href, variant }: AudienceForkCardProps) {
  const isTrade = variant === 'trade';
  return (
    <Link
      href={href}
      className={`min-h-[44px] block p-6 rounded-sm border transition-colors ${
        isTrade
          ? 'bg-white border-ink-200 hover:border-tamar-orange'
          : 'bg-ink-050 border-ink-200 hover:border-tamar-orange'
      }`}
    >
      <h3 className="font-display font-bold text-xl text-tamar-black mb-2">{title}</h3>
      <p className="font-body text-base text-ink-600">{description}</p>
    </Link>
  );
}
```

- [ ] **Step 4: Write `ProofBand`**

Create `components/marketing/ProofBand.tsx`:
```tsx
interface ProofBandProps {
  tradeStats: { label: string; value: string }[];
  homeownerStats: { label: string; value: string }[];
}

export function ProofBand({ tradeStats, homeownerStats }: ProofBandProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="font-mono text-sm uppercase tracking-wide text-ink-600 mb-4">Trade &amp; supply</h3>
        <dl className="space-y-3">
          {tradeStats.map((stat) => (
            <div key={stat.label} className="flex justify-between border-b border-ink-200 pb-2">
              <dt className="text-base text-ink-800">{stat.label}</dt>
              <dd className="font-mono text-base text-tamar-black">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h3 className="font-mono text-sm uppercase tracking-wide text-ink-600 mb-4">Home improvements</h3>
        <dl className="space-y-3">
          {homeownerStats.map((stat) => (
            <div key={stat.label} className="flex justify-between border-b border-ink-200 pb-2">
              <dt className="text-base text-ink-800">{stat.label}</dt>
              <dd className="font-mono text-base text-tamar-black">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add content/reviews.ts components/marketing/AudienceForkCard.tsx components/marketing/ProofBand.tsx components/marketing/ReviewCard.tsx
git commit -m "feat: add AudienceForkCard, ProofBand, ReviewCard and placeholder reviews"
```

---

### Task 16: `robots.ts` and `llms.txt`

**Files:**
- Create: `app/robots.ts`
- Create: `public/llms.txt`

**Interfaces:**
- Produces: `/robots.txt` and `/llms.txt` routes.

- [ ] **Step 1: Write `app/robots.ts`**

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
  };
}
```

- [ ] **Step 2: Write `public/llms.txt`**

Create `public/llms.txt`:
```
# Tamar Plastics Ltd

> uPVC and composite windows, doors, roofline, guttering and cladding —
> supplied over the trade counter or supplied and fitted for homeowners,
> based in Saltash, Cornwall.

Business: Tamar Plastics Ltd
Address: Unit 4, Gwel Avon Business Park, Gilston Road, Saltash, Cornwall, PL12 6TW
Phone: 01752 841234
Email: info@tamarplasticsltd.co.uk
Hours: Monday–Friday 08:00–17:00, closed Saturday and Sunday
Formerly trading as: Carlton Plastics (same phone number, same team)
Service area: Saltash, Plymouth, Torpoint, Callington, Liskeard, Looe, St Germans, Landrake, Millbrook, Tavistock, Launceston, Bodmin, Trerulefoot, St Mellion

## Pages

- [Homepage](/): Trade counter and installer overview, audience fork to trade or home-improvement funnels.
- [Trade & Supply Only](/trade/): Trade counter, stock, delivery and account information for installers and builders.
- [Home Improvements](/home-improvements/): Supply-and-fit windows, doors and roofline for homeowners.
- [Products](/products/): Full product category index — doors, windows, roofline, guttering, cladding, conservatory roofs, interior, trims & fixings.
- [Repairs](/repairs/): Sealed units, hinges, handles, locks, gutter and conservatory roof repairs.
- [Areas](/areas/): Service-area town pages with local context and project examples.
- [About](/about/): Company history, the transition from Carlton Plastics, team.
- [Contact](/contact/): Address, map, opening hours, phone.
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; `/robots.txt` and `/llms.txt` are present in the output.

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts public/llms.txt
git commit -m "feat: add robots.txt (AI crawlers allowed) and llms.txt"
```

---

### Task 17: Placeholder hero image asset

**Files:**
- Create: `public/placeholders/hero-roofline.svg`

**Interfaces:**
- Produces: a static placeholder asset referenced by the homepage (Task 20) as the Hero's `posterSrc`, sized/cropped to the eventual real-photo composition (roofline diagonal against sky) so layout doesn't shift when the real photo replaces it.

- [ ] **Step 1: Create the placeholder SVG**

Create `public/placeholders/hero-roofline.svg`:
```xml
<svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="1000" fill="#EDF1F4"/>
  <polygon points="0,650 1600,350 1600,1000 0,1000" fill="#35302F"/>
  <text x="50%" y="96%" text-anchor="middle" font-family="monospace" font-size="20" fill="#8E8785">
    PLACEHOLDER — roofline photograph, Saltash/Tamar Valley
  </text>
</svg>
```

- [ ] **Step 2: Verify the file is valid SVG**

Run: `node -e "require('fs').readFileSync('public/placeholders/hero-roofline.svg', 'utf8').includes('</svg>') || process.exit(1)"`
Expected: exits 0 (no output, no error).

- [ ] **Step 3: Commit**

```bash
git add public/placeholders/hero-roofline.svg
git commit -m "chore: add placeholder hero image asset"
```

---

### Task 18: Product category placeholder data (for homepage grid only)

**Files:**
- Create: `content/product-categories.ts`

**Interfaces:**
- Produces: `PRODUCT_CATEGORIES: { slug: string; name: string; blurb: string; href: string }[]` — the 8-item list used by the homepage product grid (Task 20). This is deliberately a lighter-weight list type than `ProductPageContent` (Task 7) — full product page content is out of scope for this plan and belongs to the forms/content-pages plan.

- [ ] **Step 1: Write the data**

Create `content/product-categories.ts`:
```ts
export interface ProductCategorySummary {
  slug: string;
  name: string;
  blurb: string;
  href: string;
}

export const PRODUCT_CATEGORIES: ProductCategorySummary[] = [
  { slug: 'doors', name: 'Doors', blurb: 'uPVC and composite, front to bi-fold.', href: '/products/doors/' },
  { slug: 'windows', name: 'Windows', blurb: 'Casement, flush sash, sash and bay.', href: '/products/windows/' },
  { slug: 'roofline', name: 'Roofline', blurb: 'Fascias, soffits, bargeboards, dry verge.', href: '/products/roofline/' },
  { slug: 'guttering', name: 'Guttering', blurb: 'uPVC, cast-iron effect and aluminium.', href: '/products/guttering/' },
  { slug: 'cladding', name: 'Cladding', blurb: 'Shiplap, open-V, woodgrain foils.', href: '/products/cladding/' },
  { slug: 'conservatory-roofs', name: 'Conservatory Roofs', blurb: 'Porch and conservatory roofs, lanterns.', href: '/products/conservatory-roofs/' },
  { slug: 'interior', name: 'Interior', blurb: 'Wall panelling, flooring, skirting.', href: '/products/interior/' },
  { slug: 'trims-fixings', name: 'Trims & Fixings', blurb: 'Trims, sealants, cleaner, ancillaries.', href: '/products/trims-fixings/' },
];
```

- [ ] **Step 2: Verify build**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/product-categories.ts
git commit -m "feat: add product category summary data for homepage grid"
```

---

### Task 19: Root layout — fonts, LocalBusiness schema, Header/Footer

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Header` (Task 12), `Footer` (Task 13), `buildLocalBusinessSchema` (Task 6).
- Produces: the root layout every route in the site renders inside.

- [ ] **Step 1: Write the root layout**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Archivo_Expanded, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildLocalBusinessSchema } from '@/lib/schema';
import './globals.css';

// Variable names here must match the ones app/globals.css's @theme block
// references (Task 2) — --font-display etc. are the Tailwind theme keys
// themselves, so next/font's output variables use distinct names to avoid
// a self-referencing CSS custom property.
const archivoExpanded = Archivo_Expanded({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-archivo-expanded',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tamar Plastics Ltd — uPVC Windows, Doors & Roofline in Saltash, Cornwall',
  description:
    'Trade counter and installer in Saltash, Cornwall. uPVC and composite windows, doors and roofline — supplied over the counter or supplied and fitted.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = buildLocalBusinessSchema();

  return (
    <html lang="en-GB">
      <body
        className={`${archivoExpanded.variable} ${interTight.variable} ${jetBrainsMono.variable} font-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire fonts, LocalBusiness schema, Header and Footer into root layout"
```

---

### Task 20: Homepage assembly

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Hero` (14), `AudienceForkCard` (15), `PRODUCT_CATEGORIES` (18), `ProofBand` (15), `ReviewCard` + `PLACEHOLDER_REVIEWS` (15), `CounterStatus` (11), `BUSINESS` (6), `Card`, `Breadcrumbs`-free (homepage has no breadcrumb).
- Produces: the `/` route — the full 8-section homepage per the brief's §7.1.

- [ ] **Step 1: Write the homepage**

Replace `app/page.tsx`:
```tsx
import { Hero } from '@/components/marketing/Hero';
import { AudienceForkCard } from '@/components/marketing/AudienceForkCard';
import { ProofBand } from '@/components/marketing/ProofBand';
import { ReviewCard } from '@/components/marketing/ReviewCard';
import { CounterStatus } from '@/components/marketing/CounterStatus';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { PLACEHOLDER_REVIEWS } from '@/content/reviews';
import { BUSINESS } from '@/content/business';

export default function HomePage() {
  return (
    <>
      <Hero posterSrc="/placeholders/hero-roofline.svg" />

      {/* Section 2: Audience fork (secondary, lower-page reinforcement of the hero's own fork) */}
      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-6 sm:grid-cols-2">
        <AudienceForkCard
          variant="trade"
          title="Buying for a job?"
          description="Open a trade account, check stock and collect from the counter in Saltash."
          href="/trade/"
        />
        <AudienceForkCard
          variant="home"
          title="Improving your home?"
          description="Book a free survey for windows, doors or roofline, supplied and fitted."
          href="/home-improvements/"
        />
      </section>

      {/* Section 3: Product grid */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-8">What we stock and fit</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={category.href}
                className="min-h-[44px] block bg-white border border-ink-200 rounded-sm p-4 hover:border-tamar-orange"
              >
                <h3 className="font-body font-semibold text-base text-tamar-black">{category.name}</h3>
                <p className="text-sm text-ink-600 mt-1">{category.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Split proof band */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <ProofBand
          tradeStats={[
            { label: 'Delivery radius', value: '25 MI FROM SALTASH' },
            { label: 'Counter hours', value: 'MON–FRI 08:00–17:00' },
            { label: 'Collection', value: 'SAME DAY, IN-STOCK LINES' },
          ]}
          homeownerStats={[
            { label: 'Established as', value: 'CARLTON PLASTICS' },
            { label: 'Free survey', value: 'ACROSS CORNWALL & PLYMOUTH' },
            { label: 'Same number', value: '01752 841234' },
          ]}
        />
      </section>

      {/* Section 5: Recent local work (placeholder — full projects gallery is Phase 2) */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-2">Recent local work</h2>
          <p className="text-base text-ink-600 mb-8">
            A full project gallery is coming soon. Ask the counter or your surveyor about work near you.
          </p>
        </div>
      </section>

      {/* Section 6: The Carlton story */}
      <section className="mx-auto max-w-7xl px-4 py-16 max-w-3xl">
        <h2 className="font-display font-bold text-2xl text-tamar-black mb-4">Same team, new name</h2>
        <p className="text-base text-ink-800">
          We traded as Carlton Plastics for years from Kingsmill Rd. We&apos;re now Tamar Plastics Ltd,
          based on Gwel Avon Business Park in Saltash — same team, same trade counter, same phone
          number: 01752 841234. If you&apos;ve bought from us before, nothing about how we work has
          changed except the address.
        </p>
      </section>

      {/* Section 7 (partial): local proof via placeholder reviews — full service-area map is Phase 2 */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-8">What people say</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLACEHOLDER_REVIEWS.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Contact band */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-tamar-black mb-2">Visit the counter</h2>
            <address className="not-italic text-base text-ink-800">
              {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
            </address>
            <div className="mt-2">
              <CounterStatus />
            </div>
          </div>
          <Button variant="primary" href="/contact/">Get directions</Button>
        </Card>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds, `/` is statically generated.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage from Hero, audience fork, product grid, proof band, reviews and contact band"
```

---

### Task 21: Full verification pass

**Files:** none (verification only)

**Interfaces:** none — this task confirms every prior task's deliverable still works together.

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: all tests across every file pass.

- [ ] **Step 2: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: succeeds; `/`, `/robots.txt` present in route output.

- [ ] **Step 4: Manual dev-server check**

Run: `npm run dev`
Open `http://localhost:3000` in a browser. Confirm:
- Hero renders with headline, eyebrow, fork cards, and the orange diagonal sweep animates once on load.
- Header shows the phone number, counter status, and trade/home toggle links.
- Clicking "Buying for a job?" navigates towards `/trade/` (the route itself doesn't exist yet — a 404 here is expected and fine, this plan doesn't build it).
- Toggling OS-level "reduce motion" and reloading removes the sweep animation and Ken Burns drift, and the page remains fully legible.
- No more than one orange-filled element is visible per screen at any scroll position.

- [ ] **Step 5: Stop the dev server, commit if any fixes were made during manual check**

If Step 4 required any fixes, commit them individually with descriptive messages before moving on. If no fixes were needed, this task requires no commit.

---

## What this plan does not build

Per the design doc (`docs/superpowers/specs/2026-07-22-tamar-plastics-phase1-design.md`), the following are covered by a follow-up plan once this one is complete and its component contracts (`Button`, `Card`, `SpecTable`, `FAQAccordion`, `Breadcrumbs`, `ProductPageContent`, `AreaPageContent`) are stable:

- Forms infrastructure (`lib/email.ts`, server action, honeypot wiring) and the three forms (quote request, trade enquiry, contact).
- `/trade/`, `/trade/account/`, `/trade/collection-delivery/`.
- `/home-improvements/`, `/home-improvements/process/`.
- `/products/`, and all 8 product category pages with real spec tables and FAQs.
- `/repairs/`.
- `/areas/`, `/areas/saltash/`, `/areas/plymouth/`.
- `/about/`, `/contact/`.
