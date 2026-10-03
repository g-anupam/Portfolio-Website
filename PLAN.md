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
- [x] 3. First deploy to Vercel

## Phase 1 — Design system

- [x] 4. Colour tokens for light and dark as CSS variables
- [x] 5. Fonts (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono) via `next/font`
- [x] 6. Theme toggle: follows system, remembers choice, no flash on load
- [x] 7. Shared primitives: container, section header, mono label, arrow link

## Phase 2 — Page shell

- [x] 8. Header and nav, including mobile
- [x] 9. Footer

## Phase 3 — Content model

- [x] 10. Typed data file for projects, links and site info

## Phase 4 — Static sections

- [x] 11. Hero: name, about slot, links, photo slot
- [x] 12. At-a-glance strip
- [x] 13. QuickByte lead block with the live-app button
- [x] 14. Project rows (NaturalShell, KafFlow, psh)
- [x] 15. Contact section

## Phase 5 — LeetCode

- [x] 16. Server-side fetch from LeetCode GraphQL, typed, cached, with a committed fallback snapshot
- [x] 17. Stats row
- [x] 18. Heatmap: labels, legend, tooltips, both themes
- [x] 19. Mobile behaviour and "last updated" line

## Phase 6 — Assets and copy

- [x] 20a. QuickByte screenshot, KafFlow and psh diagrams
- [x] 20b. Photo and résumé PDF (`photo` and `resume` in `src/content/profile.ts`)
- [x] 21. About text, tagline, at-a-glance facts, DSA intro line, photo caption

## Phase 7 — Polish and launch

- [x] 22. Open Graph image, favicon, sitemap, accessibility and performance pass
- [x] 23. Custom domain: www.anupamg.in (anupamg.in redirects to it)

## Phase 8 — Additions

- [x] 24. Experience and volunteering sections
- [x] 25. Contact form that emails messages through Resend (needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel)
- [x] 26. Recently solved LeetCode problems
- [x] 27. In-site résumé page at /resume (renders public/resume.pdf with react-pdf)
