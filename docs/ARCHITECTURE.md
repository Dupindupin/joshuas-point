# Joshua's Point — Architecture

This document is the technical orientation guide for Joshua's Point. Read it together with
[`project-rules.md`](./project-rules.md), the [`design-system`](./design-system/) documentation,
and the [`joshuas-point-book`](./joshuas-point-book/) before making product changes.

## System overview

Joshua's Point is one repository containing two applications:

1. A **Next.js website** in `web/`.
2. A **Sanity Studio** at the repository root.

They have separate `package.json` and `package-lock.json` files because they are installed, run,
and deployed independently. The website does not currently query Sanity; that integration will be
added deliberately when the content model is ready.

## Repository layout

```text
joshuas-point/
├── docs/
│   ├── ARCHITECTURE.md          # This guide
│   ├── design-system/           # Brand and interface rules
│   ├── joshuas-point-book/      # Vision and brand foundation
│   └── project-rules.md         # Rules for all contributors
├── schemaTypes/                 # Sanity document and object schemas
├── static/                      # Static files served by Sanity Studio
├── sanity.config.ts             # Studio, dataset, plugins, and schema registration
├── sanity.cli.ts                # Sanity CLI configuration
├── package.json                 # Sanity Studio dependencies and commands
├── package-lock.json            # Sanity Studio dependency lockfile
└── web/
    ├── public/                  # Website static assets
    ├── src/
    │   ├── app/                 # Next.js App Router routes and layouts
    │   ├── components/          # Reusable UI, sections, and internal-tool components
    │   └── styles/              # Shared design foundations such as fonts
    ├── next.config.ts           # Next.js configuration
    ├── package.json             # Website dependencies and commands
    └── package-lock.json        # Website dependency lockfile
```

## Next.js website

The website uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, and the App Router. The
application lives entirely under `web/`; `web/next.config.ts` declares that directory as the
explicit Turbopack root so Next.js does not infer the parent Sanity application from its lockfile.

### Routes

| Route             | Purpose                                                   | Visibility          |
| ----------------- | --------------------------------------------------------- | ------------------- |
| `/`               | Public website; currently the approved Homepage Hero only | Public              |
| `/design-system`  | Living component and visual reference                     | Internal, `noindex` |
| `/typography-lab` | Typography decision record and comparison specimens       | Internal, `noindex` |

Route files follow App Router conventions under `web/src/app/`. Shared UI belongs outside route
folders unless it is specific to a single route. Components are React Server Components by
default. Add `"use client"` only when browser state, effects, or event handling genuinely requires
it.

The homepage Hero is photography-ready but currently uses an abstract placeholder. A future image
can be passed through its typed `image` property and will be rendered with `next/image`.

## Sanity Studio

Sanity Studio is the root application. Its configuration is defined by `sanity.config.ts` and
`sanity.cli.ts`; schema types are registered through `schemaTypes/index.ts`.

The schema registry is currently empty and the website has no Sanity client or query layer. Before
connecting the website, define and review the content model, environment variables, preview
workflow, cache policy, and publication-driven revalidation strategy.

Keep Studio code and dependencies at the repository root. Keep public website code and
dependencies inside `web/`.

## Design System

The written Design System lives in `docs/design-system/`. The rendered internal reference is
available at `/design-system` and is implemented at `web/src/app/design-system/`.

Foundational tokens are declared in `web/src/app/globals.css` and exposed to Tailwind through its
CSS-first theme configuration. They cover:

- Morning and Evening atmosphere roles
- Brand colors
- Spacing
- Display and body typography
- Motion easing reserved for future use

Do not invent new visual tokens or component variants directly in feature code. Design, document,
and review additions before making them part of the reusable system.

## Typography System

The official pairing is:

- **Display:** Newsreader
- **Body:** Manrope

Both fonts are configured once in `web/src/styles/fonts.ts` with `next/font`. The shared CSS
variables are `--font-jp-display` and `--font-jp-body`; Tailwind exposes them as `font-display` and
`font-body`.

Do not initialize the brand fonts again inside pages or components. Internal comparison fonts may
remain local to the Typography Lab, but the approved Newsreader and Manrope instances must come
from the shared configuration.

## Reusable component philosophy

Components are organized by responsibility:

```text
web/src/components/
├── ui/               # Small reusable controls and surfaces
├── home/             # Homepage sections
├── design-system/    # Internal Design System presentation
└── typography-lab/   # Internal Typography Lab presentation
```

Follow these rules:

- Prefer semantic HTML and native browser behavior.
- Keep Server Components as the default.
- Use links for navigation and buttons for actions.
- Keep component APIs typed and content-driven.
- Accept image data through explicit typed properties, including meaningful alternative text.
- Compose small primitives into sections instead of duplicating styles.
- Keep accessibility, responsive behavior, and focus states in the component contract.
- Avoid dependencies for behavior that React, Next.js, CSS, or the platform already provides.
- Do not couple reusable presentation components directly to Sanity documents. Map CMS data into
  stable component properties at the route or data boundary.

## Development workflow

Before implementation:

1. Read the project rules and relevant design documentation.
2. Confirm that the feature is documented in the Design System.
3. Inspect existing components before creating another abstraction.
4. Keep the task small and avoid unrelated cleanup.

For website changes, work from `web/`:

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

For Studio changes, work from the repository root:

```bash
npm run dev
npm run build
```

Run the checks relevant to the area changed. For shared foundations or route work, run the website
lint, type check, and production build before review.

## Git workflow

The primary branch is `main`. No automated branch policy is currently encoded in this repository,
so use the following safe default:

1. Start from an up-to-date, clean working tree.
2. Use a short-lived branch for nontrivial work.
3. Keep each commit focused on one reviewable outcome.
4. Inspect `git status` and `git diff` before committing.
5. Run the relevant validation commands.
6. Use a descriptive commit message that states the completed outcome.
7. Review changes before merging or pushing to `main`.

Never commit `.env*`, `.next/`, `node_modules/`, Sanity runtime output, local editor state, or build
artifacts. Do not rewrite or discard another contributor's uncommitted work.

## Localhost workflow

Install each application from its own directory:

```bash
# Repository root — Sanity Studio
npm install

# Website
cd web
npm install
```

Run the applications in separate terminal sessions:

```bash
# Terminal 1 — repository root
npm run dev

# Terminal 2 — web/
npm run dev
```

Default local addresses:

- Website: `http://localhost:3000`
- Design System: `http://localhost:3000/design-system`
- Typography Lab: `http://localhost:3000/typography-lab`
- Sanity Studio: `http://localhost:3333` unless the CLI selects another available port

Do not run `npm install` only at the repository root and assume the website is installed. The two
lockfiles are intentional and should remain synchronized with their respective package manifests.
