# Content Map

> Source of truth:
> - `src/data/content/en.ts`
> - `src/data/content/fr.ts`
> - `src/data/content/types.ts`

This document replaces the old outdated reference that mentioned legacy projects and obsolete metrics.

## 1. Site identity

The portfolio is positioned as:

- personal portfolio
- case-study platform
- engineering showcase

Primary identity in the English locale:

- `meta.title`: `Abdelilah Wajid · Product Engineer`
- hero badge: `OPEN TO WORK`
- work section label: `01 — Case Studies`

## 2. Homepage sections

The homepage content is organized into:

1. Hero
2. Work / Case Studies
3. About
4. Skills
5. Contact

All copy is locale-driven and typed.

## 3. Current project inventory

There is currently one featured homepage project:

### `Electro Abidin eSystem`

- Year: `2025`
- Type: `Retail Management System`
- Status: `Private deployment`
- Route: `/work/electro-abidin`

Homepage structure for this project is now built around:

- Problem
- Solution
- Key Decisions
- Impact

## 4. Credibility rules now reflected in content

The current content system avoids:

- placeholder email addresses
- fake vanity metrics
- outdated project names
- generic "shipped products" claims without context

Instead, it emphasizes:

- operational systems
- typed content
- case-study-driven storytelling
- defensible engineering decisions

## 5. Current stats content

The metrics exposed through `content.stats` are now:

1. `2` - `Supported locales`
2. `Typed` - `Content architecture`
3. `FIFO` - `Inventory cost logic`
4. `Private` - `Deployment model`

These replace the older unverifiable metrics.

## 6. Contact content

Current contact content includes:

- email: `kanata10@gmail.com`
- GitHub link
- LinkedIn link

Contact links are structured as real objects with `href` and `label`.

## 7. Locale support

Supported locales:

- `en`
- `fr`

Resolver:

- `src/data/content/index.ts`

## 8. Notes for future updates

If a new project is added, it should meet the same standard:

- clear problem
- credible solution
- explicit engineering decisions
- believable impact

Do not add demo-style filler projects just to increase count.
