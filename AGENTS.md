<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Typecheck (includes Next typegen): `pnpm typecheck`
- Format check: `pnpm format:check` (fix with `pnpm format`)
- Production build: `pnpm build`
- Full gate: `pnpm check` (lint + typecheck + build)

## Project conventions

- Next.js 16 App Router with Turbopack; `params`/`searchParams` are async (must be awaited).
- The `proxy.ts` file (Next 16 rename of `middleware`) handles next-intl locale routing.
- Strict TypeScript; Server Components by default, `'use client'` islands only where needed.
- Animation ownership is split: GSAP/ScrollTrigger (scroll, pinned, cinematic) vs Motion (enter/exit, UI micro-interactions); never both on the same effect. Lenis is the scroll engine.
- 3D (Three.js/R3F/Drei) is always lazy, capability-gated, and paired with a static fallback.
- Content is version-controlled frontmatter validated by Zod in `content/projects/`; the UI reads only through `lib/content.ts`.
- Design tokens (colors, fonts, easing, durations) live centrally in `app/globals.css` under `@theme` — do not hardcode values in components.
