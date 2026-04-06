# kanata-system — Project Status

> **Last updated**: April 3, 2026
> **Status**: **Functional** — `npm run dev` works, `next build` succeeds, `tsc --noEmit` passes with zero errors.
> **Repository**: [github.com/kanata-kan/kanata-system](https://github.com/kanata-kan/kanata-system)

---

## 1. Overview

Single-page portfolio for **Abdelilah Wajid**, Full-Stack Engineer based in Marrakech, Morocco.
The site supports **dark/light mode** with smooth transitions, scroll-reveal animations, responsive layout (mobile < 768px), a marquee tech strip, and a **centralized i18n-ready content system**.

---

## 2. Tech Stack

| Tool         | Version | Role                          |
| ------------ | ------- | ----------------------------- |
| Next.js      | 16.1.6  | Framework (App Router)        |
| React        | 19.2.3  | UI library                    |
| TypeScript   | ^5      | Type safety                   |
| Tailwind CSS | ^4      | Utility classes (minimal use) |

> **Zero external UI libraries**. No Framer Motion, no shadcn/ui, no icon packs.
> All icons are inline SVG. All animations are pure CSS + `IntersectionObserver`.

---

## 3. Architecture

The project follows a strict **Separation of Concerns** pattern:

```
Content → Data → Tokens → Components → Sections → Page
```

### Layer Breakdown

| Layer        | Folder                   | Purpose                                                  |
| ------------ | ------------------------ | -------------------------------------------------------- |
| **Content**  | `src/data/content/`      | i18n-ready locale files — single source of all text      |
| **Data**     | `src/data/`              | Thin wrappers re-exporting from content + typed interfaces |
| **Tokens**   | `src/tokens/`            | DARK & LIGHT theme objects (all colors)                  |
| **Hooks**    | `src/hooks/`             | Shared logic (theme, responsive, scroll)                 |
| **UI**       | `src/components/ui/`     | Atomic visual components (Label, Tag, Avatar, etc.)      |
| **Layout**   | `src/components/layout/` | App-level components (Nav, Footer, Toggle)               |
| **Sections** | `src/sections/`          | Full page sections (Hero, Work, About, etc.)             |
| **App**      | `src/app/`               | Next.js routing (layout + page)                          |

### Key Rules

- **No logic in `page.tsx`** — only section imports and `<main>` wrapper.
- **No hardcoded colors** — every color comes from the `Theme` object.
- **No hardcoded text** — all content comes from `src/data/content/`.
- **Constants outside components** — arrays like `PROJECTS`, `SKILLS`, `NAV_LINKS` live in `/data`.
- **No new npm packages** without explicit approval.
- **JSDoc comment** on every file.
- **No `any`**, no `as unknown`.
- **Gradient text** uses `.grad-text` CSS class only (no inline `WebkitBackgroundClip`).

---

## 4. Content System (i18n-ready)

All text content is centralized in `src/data/content/`:

| File       | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| `types.ts` | TypeScript interfaces for all content (`SiteContent`, etc.)    |
| `en.ts`    | English locale — all site text (309 lines)                     |
| `index.ts` | Locale resolver — exports `content` for active language        |

### How to add a new language

1. Duplicate `en.ts` → e.g. `fr.ts` or `ar.ts`
2. Translate all string values
3. Register in `index.ts`: `import { fr } from "./fr"; const locales = { en, fr };`
4. Change `DEFAULT_LOCALE` to `"fr"`

### Data wrapper files

| File          | Re-exports from content                       |
| ------------- | --------------------------------------------- |
| `nav.ts`      | `NAV_LINKS` → `content.nav.links`             |
| `projects.ts` | `PROJECTS` → `content.projects`               |
| `skills.ts`   | `SKILL_GROUPS`, `TECH_STRIP` → from content   |
| `stats.ts`    | `METRICS`, `HERO_METRICS` → from content      |

---

## 5. File Inventory (~45 source files)

### `src/app/` — Next.js App Router

| File          | Lines | Description                                                                                   |
| ------------- | ----- | --------------------------------------------------------------------------------------------- |
| `layout.tsx`  | 71    | Root layout. Loads 3 Google Fonts, initializes theme/responsive/scroll-reveal. Uses `content` for meta. |
| `page.tsx`    | 24    | Home page. Only assembles 6 sections in order. Zero logic, zero state.                        |
| `globals.css` | 151   | Global styles: `.grad-text`, scroll-reveal classes, `@keyframes`, custom scrollbar.           |
| `favicon.ico` | —     | Default Next.js favicon.                                                                      |

### `src/tokens/` — Design Tokens

| File             | Lines | Description                                                                       |
| ---------------- | ----- | --------------------------------------------------------------------------------- |
| `themes.ts`      | 86    | `Theme` interface + `DARK`/`LIGHT` objects + `resolveColor()` utility.            |
| `typography.ts`  | 95    | Centralized text style presets (`TEXT.sectionHeading`, `TEXT.body`, etc.).         |
| `spacing.ts`     | 22    | `SPACE` scale, `SECTION_SPACING`, `CONTAINER_PADDING`.                            |
| `breakpoints.ts` | 15    | Responsive breakpoints (sm, md, lg, xl, 2xl).                                     |

### `src/data/content/` — Centralized Content

| File       | Lines | Description                                                  |
| ---------- | ----- | ------------------------------------------------------------ |
| `types.ts` | 143   | All content interfaces (`SiteContent`, `ProjectContent`, etc.) |
| `en.ts`    | 295   | English locale — complete site text content                   |
| `index.ts` | 37    | Locale resolver, exports `content` + all types                |

### `src/data/` — Data Wrappers

| File          | Lines | Re-exports                                      |
| ------------- | ----- | ----------------------------------------------- |
| `nav.ts`      | 7     | `NAV_LINKS` from content                        |
| `projects.ts` | 7     | `PROJECTS` from content                         |
| `skills.ts`   | 8     | `SKILL_GROUPS`, `TECH_STRIP` from content       |
| `stats.ts`    | 8     | `METRICS`, `HERO_METRICS` from content          |

### `src/hooks/` — Custom Hooks

| File                 | Lines | Description                                          |
| -------------------- | ----- | ---------------------------------------------------- |
| `useTheme.ts`        | 63    | Dark/light state, localStorage, CSS variable injection. |
| `useResponsive.ts`   | 54    | Responsive context using `BREAKPOINTS` tokens.       |
| `useScrollReveal.ts` | 37    | `IntersectionObserver` for scroll-reveal animations. |

### `src/components/ui/` — Atomic UI

| File             | Lines | Description                                                           |
| ---------------- | ----- | --------------------------------------------------------------------- |
| `Avatar.tsx`     | 77    | Real profile photo with conic gradient ring + green "online" status dot. |
| `Label.tsx`      | 31    | Section label: cyan line + monospace uppercase text.                  |
| `Tag.tsx`        | 30    | Colored pill/badge. `React.memo`.                                     |
| `WindowDots.tsx` | 20    | macOS-style traffic light dots. `React.memo`.                         |

### `src/components/layout/` — Layout Components

| File              | Lines | Description                                                           |
| ----------------- | ----- | --------------------------------------------------------------------- |
| `ThemeToggle.tsx` | 79    | Pill switch with animated track/thumb.                                |
| `Nav/`            | ~409  | `Nav.tsx`, `NavLogo.tsx`, `NavLinks.tsx`, `NavMobileMenu.tsx`, `index.ts`. All text from content. |
| `Footer.tsx`      | 51    | Minimal footer. All text from content.                                |
| `Container.tsx`   | 46    | Centralized container with breakpoint-aware max-widths.               |
| `Section.tsx`     | 44    | Section primitive: padding, borderBottom, transition, bg variant.     |
| `Stack.tsx`       | 42    | Flex layout primitive with gap, direction, alignment.                 |

### `src/sections/` — Page Sections

| File              | Lines | Description                                                                           |
| ----------------- | ----- | ------------------------------------------------------------------------------------- |
| `Hero.tsx`        | 164   | Full-viewport hero with glow orbs, grid background, pills, scroll indicator.          |
| `Hero/`           | ~659  | `HeroContent.tsx` (154), `HeroAvatar.tsx` (367), `HeroCTA.tsx` (83), `HeroStats.tsx` (47), `index.ts` (8). All text from content. |
| `TechStrip.tsx`   | 61    | Horizontal marquee of mindset phrases.                                                |
| `Work/`           | ~617  | `Work.tsx` (132), `WorkFeaturedCard.tsx` (355), `WorkSmallCards.tsx` (125). Tabbed project showcase. All text from content. |
| `About.tsx`       | 183   | Mindset section with bio, tags, metrics grid, code card. All text from content.       |
| `Skills.tsx`      | 112   | 4-column skill groups grid. All text from content.                                    |
| `Contact.tsx`     | 179   | Contact section with email copy, socials. All text from content.                      |

### `public/` — Static Assets

| File                    | Description                |
| ----------------------- | -------------------------- |
| `Abdelilah-Wajid .png` | Profile photo for avatar   |

---

## 6. Theme System

### How It Works

1. `useTheme()` in `layout.tsx` creates `{ dark, toggle, C }`.
2. `useResponsive()` provides `{ width, isMobile, isTablet, isDesktop }` using `BREAKPOINTS` tokens.
3. Theme and responsive are **separate contexts** (separation of concerns).
4. Components call `useThemeContext()` for `{ C, dark, toggle }` and `useResponsiveContext()` for `{ isMobile, ... }`.
5. `C` is the current `Theme` object (DARK or LIGHT) — all colors resolved.
6. CSS variables (`--cyan`, `--purple`, `--green`, `--amber`) are set on `:root` for `.grad-text` and scrollbar.
7. `resolveColor(C, key)` utility maps string keys ("cyan", "green", etc.) to theme hex values.

### Theme Persistence

- Saved to `localStorage` under key `portfolio-theme` ("dark" | "light").
- On first visit, falls back to `prefers-color-scheme: dark` media query.
- Default: dark mode.

---

## 7. Scroll Reveal System

- Classes: `.rv` (fade up), `.rv-l` (slide left), `.rv-r` (slide right), `.rv-s` (scale in).
- Stagger: `.d1` to `.d7` (80ms to 560ms delay).
- Trigger: single `IntersectionObserver` at 8% threshold, `-30px` rootMargin.
- On intersect: `.in` class added → CSS transition fires (0.75s cubic-bezier).
- One-way: once revealed, stays revealed.

---

## 8. Fonts

| Font             | Variable       | Usage               |
| ---------------- | -------------- | ------------------- |
| Playfair Display | `--font-serif` | Headings, names     |
| JetBrains Mono   | `--font-mono`  | Labels, code, pills |
| Inter            | `--font-sans`  | Body text, bio      |

All loaded via `next/font/google` with `display: "swap"`.

---

## 9. Responsive Strategy

- **Breakpoints**: defined in `src/tokens/breakpoints.ts` (sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536).
- **Hook**: `useResponsive()` provides `{ isMobile, isTablet, isDesktop }` — extensible beyond binary.
- **Method**: conditional rendering and inline style values based on responsive context.
- **Nav**: full desktop nav (links + Hire Me) vs. hamburger + fullscreen overlay.
- **Hero**: grid 2-col vs. 1-col; avatar card vs. compact row; stats hidden on mobile.
- **Work**: 2-col featured card vs. 1-col; highlights/preview hidden on mobile.
- **Skills**: 4-col grid vs. 2-col.
- **Padding**: `48px` desktop vs. `20px` mobile.

---

## 10. Animations

| Animation | CSS `@keyframes`              | Duration     | Usage                  |
| --------- | ----------------------------- | ------------ | ---------------------- |
| `marquee` | translateX(0→-50%)            | 30s infinite | TechStrip scrolling    |
| `fadeUp`  | opacity 0→1 + translateY 22→0 | 0.5s         | Hero elements entrance |
| `glow`    | box-shadow pulse              | 2s infinite  | Green "available" dots |

---

## 11. Known Issues / Notes

- The project uses `"use client"` on `layout.tsx`, meaning the entire app is client-rendered. This is intentional for the theme/scroll-reveal hooks that need `window` and `document`.
- Content system supports i18n — currently **English only**. Add new locale files to expand.
- No `<meta>` OG tags yet (only basic title + description from content system).
- Social links in Contact section are placeholder buttons (no real `href`).
- Email in Contact is `abdelilah@email.com` — placeholder.
- Avatar uses real profile photo (`public/Abdelilah-Wajid .png`).

---

## 12. Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript type check (currently: 0 errors)
```

---

## 13. File Tree

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css              (151 lines)
│   ├── layout.tsx               (71 lines)
│   └── page.tsx                 (24 lines)
├── components/
│   ├── layout/
│   │   ├── Container.tsx        (46 lines)
│   │   ├── Footer.tsx           (51 lines)
│   │   ├── Nav/
│   │   │   ├── index.ts         (5 lines)
│   │   │   ├── Nav.tsx          (144 lines)
│   │   │   ├── NavLogo.tsx      (75 lines)
│   │   │   ├── NavLinks.tsx     (35 lines)
│   │   │   └── NavMobileMenu.tsx(150 lines)
│   │   ├── Section.tsx          (44 lines)
│   │   ├── Stack.tsx            (42 lines)
│   │   └── ThemeToggle.tsx      (79 lines)
│   └── ui/
│       ├── Avatar.tsx           (77 lines)
│       ├── Label.tsx            (31 lines)
│       ├── Tag.tsx              (30 lines)
│       └── WindowDots.tsx       (20 lines)
├── data/
│   ├── content/
│   │   ├── types.ts             (143 lines)
│   │   ├── en.ts                (295 lines)
│   │   └── index.ts             (37 lines)
│   ├── nav.ts                   (7 lines)
│   ├── projects.ts              (7 lines)
│   ├── skills.ts                (8 lines)
│   └── stats.ts                 (8 lines)
├── hooks/
│   ├── useResponsive.ts         (54 lines)
│   ├── useScrollReveal.ts       (37 lines)
│   └── useTheme.ts              (63 lines)
├── sections/
│   ├── About.tsx                (183 lines)
│   ├── Contact.tsx              (179 lines)
│   ├── Hero.tsx                 (164 lines)
│   ├── Hero/
│   │   ├── index.ts             (8 lines)
│   │   ├── HeroContent.tsx      (154 lines)
│   │   ├── HeroAvatar.tsx       (367 lines)
│   │   ├── HeroCTA.tsx          (83 lines)
│   │   └── HeroStats.tsx        (47 lines)
│   ├── Skills.tsx               (112 lines)
│   ├── TechStrip.tsx            (61 lines)
│   └── Work/
│       ├── index.ts             (5 lines)
│       ├── Work.tsx             (132 lines)
│       ├── WorkFeaturedCard.tsx  (355 lines)
│       └── WorkSmallCards.tsx    (125 lines)
└── tokens/
    ├── breakpoints.ts           (15 lines)
    ├── spacing.ts               (22 lines)
    ├── themes.ts                (86 lines)
    └── typography.ts            (95 lines)
public/
└── Abdelilah-Wajid .png
```

**Total**: ~45 source files
