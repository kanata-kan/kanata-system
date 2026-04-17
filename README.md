# kanata-system

Case-study-driven portfolio for Abdelilah Wajid.

This project is not a generic personal site. It is built as a product-engineering showcase focused on:

- operational systems
- clear architecture
- believable case studies
- fast recruiter scanning

## Positioning

The portfolio represents three things at once:

1. Personal portfolio
2. Case-study platform
3. Engineering showcase

The goal is to make technical thinking visible, not just to display finished screens.

## Current focus

The current featured project is:

- `Electro Abidin eSystem`

It is presented as a structured case study with:

- problem
- solution
- key engineering decisions
- impact

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

The UI is custom-built. Content is centralized in `src/data/content/`.

## Content model

The site currently supports:

- English: `src/data/content/en.ts`
- French: `src/data/content/fr.ts`

Both locales share the same typed structure from `src/data/content/types.ts`.

## Technical status

Verified on April 17, 2026:

- `npm run lint` passes
- `npx tsc --noEmit` passes
- `npm run build` passes

## Key implementation notes

- `src/app/layout.tsx` is now a server layout using Next metadata.
- `src/app/AppShell.tsx` owns the client-side theme, responsive, locale, and navigation shell.
- Remote Google font fetching was removed from the build path in favor of stable font stacks defined in `src/app/globals.css`.
- Contact links are real anchors instead of placeholder buttons.
- Project presentation on the homepage is structured for recruiter scanning.

## Run locally

```bash
npm install
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

## Repo structure

```text
src/
  app/        Next.js routes, metadata, shell
  components/ Layout, UI, and flow components
  data/       Typed content wrappers
  hooks/      Theme, locale, responsive, scroll logic
  sections/   Homepage and case-study sections
  tokens/     Design tokens
```

## Notes

- The portfolio intentionally favors one stronger case study over multiple weak demo projects.
- Metrics and claims were reduced to defensible statements.
- Documentation in this repository is aligned to the current codebase and copy.
