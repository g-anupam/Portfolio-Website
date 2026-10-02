# Build plan

One commit per numbered step. Each commit leaves the site building and deployable.

Stack: Next.js (App Router) + TypeScript, Tailwind v4, pnpm, deployed on Vercel.

## Layout of the code

- `src/app/` — routes, root layout, global CSS
- `src/components/` — shared UI primitives and the page shell
- `src/sections/` — one component per home page section
- `src/content/` — typed content data (projects, links, copy)
- `src/lib/` — site config and data fetching (LeetCode)
- `public/` — photo, screenshots, diagrams, résumé

## Phase 0 — Architecture

- [x] 1. Scaffold Next.js + TypeScript + Tailwind, ESLint and Prettier
- [x] 2. Folder structure, base layout, page metadata, this plan
- [ ] 3. First deploy to Vercel

## Phase 1 — Design system

- [x] 4. Colour tokens for light and dark as CSS variables
- [x] 5. Fonts (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono) via `next/font`
- [x] 6. Theme toggle: follows system, remembers choice, no flash on load
- [x] 7. Shared primitives: container, section header, mono label, arrow link

## Phase 2 — Page shell

- [x] 8. Header and nav, including mobile (the Résumé link is added in step 20, with the PDF)
- [x] 9. Footer

## Phase 3 — Content model

- [ ] 10. Typed data file for projects, links and site info

## Phase 4 — Static sections

- [ ] 11. Hero: name, about slot, links, photo slot
- [ ] 12. At-a-glance strip
- [ ] 13. QuickByte lead block with the live-app button
- [ ] 14. Project rows (NaturalShell, KafFlow, psh)
- [ ] 15. Contact section

## Phase 5 — LeetCode

- [ ] 16. Server-side fetch from LeetCode GraphQL, typed, cached, with a committed fallback snapshot
- [ ] 17. Stats row
- [ ] 18. Heatmap: labels, legend, tooltips, both themes
- [ ] 19. Mobile behaviour and "last updated" line

## Phase 6 — Assets and copy

- [ ] 20. Photo, QuickByte screenshot, KafFlow and psh diagrams, résumé PDF
- [ ] 21. About text, at-a-glance facts, DSA intro line, email

## Phase 7 — Polish and launch

- [ ] 22. Open Graph image, favicon, sitemap, accessibility and performance pass
- [ ] 23. Custom domain (optional)
