# MDORRA — Website

A premium portfolio and showcase website for MDORRA, a design studio for architecture and interiors (design developed with construction in mind), built as an interactive editorial experience.

Current state: full public site — homepage (hero, studio statement, services, selected work, before/after, process, FAQ, contact), work index and statically generated case-study pages, services/studio/contact pages, premium empty states, and a launch-ready SEO/performance/accessibility foundation. Real portfolio content and the production domain/contact details are still to be supplied.

## Purpose

Present the studio's work beautifully, establish credibility, and move potential clients to contact the studio externally — via WhatsApp, phone, email, or social media. The site intentionally ships **no backend**: no database, no admin panel, no file uploads, no form-submission storage, no email infrastructure. Every page is static and deployable anywhere.

## Stack

- Next.js 16 (App Router, Turbopack, static/SSG output)
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- GSAP + ScrollTrigger, Motion, Lenis
- Three.js + React Three Fiber + Drei
- next-intl (English-first, Arabic/RTL-ready)
- Content layer: frontmatter Markdown + Zod (build-time, version-controlled)

## Commands

```bash
pnpm dev          # development server
pnpm build        # production build
pnpm start        # run the production build
pnpm lint         # ESLint
pnpm typecheck    # Next typegen + tsc --noEmit
pnpm format       # Prettier (write)
pnpm format:check # Prettier (check)
pnpm check        # lint + typecheck + build
```

## Architecture

```
app/[locale]/        root layout (fonts, i18n, a11y shell) + public routes
app/globals.css      global styles + design tokens (@theme)
app/robots.ts        robots.txt (emitted only when a domain is configured)
app/sitemap.ts       sitemap (emitted only when a domain is configured)
app/manifest.ts      web app manifest
app/icon.svg         brand mark source (browser favicon)
app/icon.png         ico fallback / apple-touch-icon (generated)
components/
  global/            site shell: header, nav, footer, menu, scroll provider
  layout/            layout primitives: Container, Section, IndexRow
  typography/        Eyebrow, Meta
  sections/          page sections (hero, services, selected work, …)
  project/           work-index + case-study building blocks
  motion/            animated reveals (Motion)
  three/             R3F scene layer (lazy, capability-gated, desktop-only)
  media/             before/after, gallery, drawing, project image
content/projects/    frontmatter projects + Zod schema (the only content source)
docs/projects.md     authoring guide + content workflow
i18n/                next-intl routing/request/navigation config
lib/                 fonts, site config, metadata, content API, animation foundation
hooks/               shared React hooks
messages/en.json     translation catalog
proxy.ts             next-intl locale routing
public/               assets (icons, og, media/placeholders)
scripts/             icon regeneration script (node scripts/generate-icons.mjs)
```

## Brand assets

The MDORRA mark lives as a single source of truth at `app/icon.svg` (a geometric
monogram: two structural legs, a centre V, and one accent datum line). Run
`node scripts/generate-icons.mjs` to regenerate `app/icon.png`,
`app/apple-icon.png`, the PWA icons under `public/icons/`, and the default social
image `public/og/og-default.png`. The social image is only linked from metadata
once a production domain is configured.

## Content

Project content lives in `content/projects/*.md` as validated frontmatter (see `content/projects/schema.ts`), read only through `lib/content.ts`. Adding a project is a version-controlled file change — no database, no CMS, no component edits. The full workflow is documented in `docs/projects.md`. Until real commissions are documented, the portfolio renders intentional curated empty states, and a clearly-marked placeholder project ships in the repo solely as an authoring reference — it stays `status: draft` and is never published.

## Contact

Contact channels (email, phone, WhatsApp, social links) are configured centrally in `lib/site.ts` and rendered only when a value is set — no placeholder contact details are exposed. The contact page is channel-first: a primary WhatsApp CTA (when configured), secondary email/phone/social links, and a short "what to include in your first message" guide. Everything opens in the visitor's own apps — nothing is stored or transmitted by the site.

## Motion boundaries

- **GSAP + ScrollTrigger** owns scroll choreography — the hero's scroll-reactive 3D scene and scroll-linked reveals.
- **Motion** owns component enter/exit, menu/modal transitions, and micro-interactions.
- **Lenis** provides smooth scrolling on fine-pointer devices; it integrates with GSAP's ticker and is skipped entirely under `prefers-reduced-motion` or on touch/coarse pointers.
- No single effect is implemented with more than one library, and nothing is animated that doesn't reveal the work.

## 3D strategy

3D is a progressive enhancement, desktop-only. `components/three/CanvasScene` lazily loads the R3F canvas only when WebGL2 is available and the user has not requested reduced motion; the hero gates it to ≥1024px via a media query (no off-screen WebGL on mobile) and ships a static fallback plate instead. Nothing renders 3D on the initial page load.

## i18n

English is the only live locale. The routing, layout, metadata, sitemap, and typography are Arabic/RTL-ready: adding `ar` to `i18n/routing.ts`, its translation catalog, and its direction mapping is the only work needed.

## Deployment

The site needs no server-side runtime beyond Next's image optimizer. Configure
the production domain in `lib/site.ts` (`url`), then deploy to any Node host
(Vercel, Netlify) — all pages are statically generated at build time. The
locale middleware (in `proxy.ts`) is required for URL routing, so deploy to a
host that runs Next's middleware (Vercel, Netlify, or `next start`); it is not
a bare static-file export. No environment variables are required.
