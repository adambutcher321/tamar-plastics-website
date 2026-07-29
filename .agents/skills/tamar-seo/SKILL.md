---
name: tamar-seo
description: Best practices and engineering rules for Tamar Plastics website performance, technical SEO, mobile responsiveness, and structured data validation.
---

# Tamar Plastics SEO & Performance Skill

When modifying or adding pages to the Tamar Plastics website:

1. **Audit Before Editing:** Check existing routes, components, and `content/` schemas.
2. **Preserve Visual Design & Brand:** Keep dark glassmorphic styling, HSL colors, and `#F58A2E` orange accent intact.
3. **Strict Trailing Slash Rules:** Ensure all canonical URLs, internal links, and sitemap entries end with a trailing slash (`/`).
4. **Structured Data:** Use verified JSON-LD schema functions from `lib/schema.ts`.
5. **Mobile Responsiveness:** Ensure 0px horizontal overflow down to 320px viewport width and touch targets ≥ 44px.
6. **No AI Doorway Pages:** Do not create spam doorway pages or keyword-stuffed meta tags.
7. **Verification:** Run `npm run typecheck` and `npm run test` before committing changes.
