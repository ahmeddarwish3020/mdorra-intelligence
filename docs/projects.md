# MDORRA — Project Content Guide

The portfolio is powered by markdown files with YAML frontmatter, parsed at
build time by `content/projects/schema.ts` (Zod). No database, no CMS, and no
component edits are required to add, edit, or remove a project. Files are the
single source of truth, version-controlled like the rest of the site.

## Workflow

1. Copy `content/projects/_template.md` to
   `content/projects/<slug>.md` (e.g. `content/projects/villa-heliopolis.md`).
2. Replace the title, slug and every placeholder with **real project data**.
3. Drop images in `public/media/projects/<slug>/` and reference them with
   absolute paths, e.g. `/media/projects/helio/hero.jpg`.
4. Keep `status: draft` while you write, and run `pnpm build` (or
   `pnpm dev`) — drafts are validated but never published. This is your
   safety net while authoring.
5. Fill only the fields that apply. Everything optional is skipped if
   omitted — sections render only when content exists.
6. When the project is real, verified and ready, set `status: published`.
7. Run `pnpm build`. Done — it appears everywhere automatically.

The project automatically appears in:

- Homepage **Selected Work** (first three published projects)
- Homepage **Before / After** (first published project with a `beforeAfter`)
- The **/work** index (`ProjectIndex`)
- Its own **case study page** (`/work/<slug>`, statically generated)
- **sitemap.xml**

## Rules

- **Real content only.** Never invent projects, clients, locations, years,
  awards, budgets, statistics, or testimonials — this is a real portfolio
  presented to real potential clients.
- **`status: draft` keeps a project unpublished** while still validated.
  Always draft while writing.
- **Files prefixed `_` are ignored** by the loader (templates, notes).
- **Do not put documentation in `content/projects/`** — any `.md` file there
  is parsed as a project. Authoring guides live in `docs/`.
- **`scope` / `size` / `clientType`** are shown in the case-study metadata
  block; keep them factual and concise.

## Frontmatter reference

| Field            | Required | Notes                                                                                                                                   |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`           | ✅       | Lowercase, hyphens `(^[a-z0-9]+(?:-[a-z0-9]+)*$)`                                                                                       |
| `title`          | ✅       | Project name                                                                                                                            |
| `disciplines`    | ✅       | Array from: Architecture, Interior Design, Spatial Design, 3D Visualization, Technical Design, Design Presentation, Fit-Out & Execution |
| `status`         | —        | `draft` (default) or `published`                                                                                                        |
| `type`           | —        | Architecture / Interior Design / Fit-Out & Execution (shown as the case-study eyebrow)                                                  |
| `year`           | —        | Integer (1900–2100); shown in metadata/cards                                                                                            |
| `location`       | —        | City, Country; shown in metadata/cards                                                                                                  |
| `client`         | —        | Only if the client can be named; omit otherwise                                                                                         |
| `clientType`     | —        | E.g. "Private residence", "Developer", "Commercial"; shown in metadata                                                                  |
| `scope`          | —        | One-line description of the commission, e.g. "Full architecture and interior design of a private villa"                                 |
| `size`           | —        | Project scale or area, e.g. "≈ 650 m²"; shown in metadata                                                                               |
| `summary`        | —        | Statement block — what / challenge / MDORRA's role                                                                                      |
| `overview`       | —        | Longer project overview                                                                                                                 |
| `designApproach` | —        | Design thinking behind the project                                                                                                      |
| `hero`           | —        | `{ media }` — large leading image, shown 16/9 with priority                                                                             |
| `cover`          | —        | Used by cards / the next-project transition                                                                                             |
| `gallery`        | —        | Array of media; editorial rhythm; **own proportions preserved** when `width`/`height` are present                                       |
| `beforeAfter`    | —        | `{ before: media, after: media }` — renders a dedicated section                                                                         |
| `process`        | —        | Array of `{ title, description? }` stages                                                                                               |
| `services`       | —        | Array of strings                                                                                                                        |
| `credits`        | —        | Array of `{ role, name }` or plain strings                                                                                              |
| `drawings`       | —        | Technical drawings (media with optional `index`/`caption`)                                                                              |
| `materials`      | —        | Array of `{ name, description? }`                                                                                                       |
| `related`        | —        | Array of slugs (reserved; not yet used by the UI)                                                                                       |
| `seo`            | —        | Optional `{ title?, description?, keywords?, ogImage? }` overrides                                                                      |

A `media` object is `{ src, alt, width?, height? }`. **Always provide
`width`/`height` for gallery images** — the gallery then uses the image's true
proportions (no cropping) and reserves space (no layout shift).

## Case study page structure

Hero (type eyebrow, title, metadata, 16/9 prioritized image)
→ Statement (summary / overview / approach)
→ Gallery (editorial rhythm, full-bleed lead then offset pairs)
→ Drawings / Materials (when present)
→ Before / After (when present)
→ Process (when present)
→ Credits (when present)
→ Next project (or "View all work" when only one project exists)

Sections render **only when the content exists** — nothing empty is shown.

## Worked example (illustrative)

Below is a complete file for a **fictional** project. It exists only to show
how the fields fit together — **never publish it or anything derived from it**
(there is no real "Villa Heliopolis" client, site, year or photography).
To author a real project, copy `_template.md` and fill in real data.

```markdown
---
title: Villa Heliopolis
slug: villa-heliopolis
type: Interior Design
year: 2025
location: Heliopolis, Cairo
client: Private family
clientType: Private residence
scope: Full interior design and fit-out of a four-storey family villa.
size: ≈ 650 m²
summary: A family villa reconceived as a calmer, more considered sequence of
  rooms — every interior decision resolved down to the joinery detail.
overview: The villa had good bones and dated interiors. The brief was to
  rebuild the experience of the home — light, movement and materials —
  without altering its structure.
designApproach: The design starts from how the family actually lives: shared
  mornings, quiet evenings, children growing up in the space. Each room is
  planned around its real use.
disciplines:
  - Interior Design
  - 3D Visualization
  - Fit-Out & Execution
hero:
  media:
    src: /media/projects/villa-heliopolis/hero.jpg
    alt: Villa Heliopolis — living room
    width: 2400
    height: 1500
cover:
  src: /media/projects/villa-heliopolis/cover.jpg
  alt: Villa Heliopolis — exterior at dusk
gallery:
  - src: /media/projects/villa-heliopolis/gallery-01.jpg
    alt: Villa Heliopolis — ground floor living
    width: 1600
    height: 1200
  - src: /media/projects/villa-heliopolis/gallery-02.jpg
    alt: Villa Heliopolis — kitchen detail
    width: 1200
    height: 1600
beforeAfter:
  before:
    src: /media/projects/villa-heliopolis/before.jpg
    alt: Villa Heliopolis — living room before
  after:
    src: /media/projects/villa-heliopolis/after.jpg
    alt: Villa Heliopolis — living room after
process:
  - title: Brief
    description: Two weeks of interviews with the family to map how the villa is used.
  - title: Direction
  - title: Design
  - title: Development
  - title: Delivery
services:
  - Interior Design
  - Space Planning
  - Fit-Out & Execution
credits:
  - role: Interior Design
    name: MDORRA
  - role: Photography
    name: A Real Photographer
status: draft
---
```

Why this file is safe: it lives in **this document**, not in
`content/projects/`, and even if it were copied there its `status: draft`
would keep it unpublished until explicitly released.

## Authoring workflow with `pnpm dev`

The fastest way to author is with the dev server running, using a draft:

1. Copy `_template.md` → `content/projects/<slug>.md`, keep `status: draft`.
2. Fill fields and add images. Each save revalidates through Zod.
3. Preview via `pnpm dev` — drafts are validated but never listed.
4. When happy, set `status: published` and rebuild for production.
