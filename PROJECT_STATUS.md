# Portfolio Abdelilah Wajid — Project Status

> **Last updated**: April 2026
> **Status**: **Functional** — `npm run dev` works, `next build` succeeds, `tsc --noEmit` passes with zero errors.

---

## 1. Overview

Single-page portfolio for **Abdelilah Wajid**, Full-Stack Engineer based in Marrakech, Morocco.
The site supports **dark/light mode** with smooth transitions, scroll-reveal animations, responsive layout (mobile < 768px), and a marquee tech strip.

---

## 2. Tech Stack

| Tool         | Version | Role                          |
| ------------ | ------- | ----------------------------- |
| Next.js      | 16.1.6  | Framework (App Router)        |
| React        | 19.2.3  | UI library                    |
| TypeScript   | ^5      | Type safety                   |
| Tailwind CSS | ^4      | Utility classes (minimal use) |

> **Zero external UI libraries**. No Framer Motion, no shadcn/ui, no icon packs.
> All icons are inline SVG or emoji. All animations are pure CSS + `IntersectionObserver`.

---

## 3. Architecture

The project follows a strict **Separation of Concerns** pattern:

```
Data → Tokens → Components → Sections → Page
```

### Layer Breakdown

| Layer        | Folder                   | Purpose                                      |
| ------------ | ------------------------ | -------------------------------------------- |
| **Data**     | `src/data/`              | Static content arrays and typed interfaces   |
| **Tokens**   | `src/tokens/`            | DARK & LIGHT theme objects (all colors)      |
| **Hooks**    | `src/hooks/`             | Shared logic (theme, responsive, scroll)     |
| **UI**       | `src/components/ui/`     | Atomic visual components (Label, Tag, etc.)  |
| **Layout**   | `src/components/layout/` | App-level components (Nav, Footer, Toggle)   |
| **Sections** | `src/sections/`          | Full page sections (Hero, Work, About, etc.) |
| **App**      | `src/app/`               | Next.js routing (layout + page)              |

### Key Rules

- **No logic in `page.tsx`** — only section imports and `<main>` wrapper.
- **No hardcoded colors** — every color comes from the `Theme` object.
- **Constants outside components** — arrays like `PROJECTS`, `SKILLS`, `NAV_LINKS` live in `/data`.
- **No new npm packages** without explicit approval.
- **JSDoc comment** on every file.
- **No `any`**, no `as unknown`.
- **Gradient text** uses `.grad-text` CSS class only (no inline `WebkitBackgroundClip`).

---

## 4. File Inventory (25 source files)

### `src/app/` — Next.js App Router

| File          | Lines | Description                                                                                                                                                                                                                                              |
| ------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout.tsx`  | 75    | Root layout. Loads 3 Google Fonts, initializes `useTheme`, `useResponsive`, `useScrollReveal`. Wraps everything in `ThemeContext.Provider` + `ResponsiveContext.Provider`. Renders `<Nav>` and `<Footer>`.                                               |
| `page.tsx`    | 27    | Home page. Only assembles 6 sections in order. Zero logic, zero state.                                                                                                                                                                                   |
| `globals.css` | 163   | Global styles: CSS variables, `.grad-text`, scroll-reveal classes (`.rv`, `.rv-l`, `.rv-r`, `.rv-s`), stagger delays (`.d1`–`.d7`), `@keyframes` (marquee, fadeUp, glow, spin), `.hover-cyan` utility, smooth scroll, custom scrollbar, selection color. |
| `favicon.ico` | —     | Default Next.js favicon.                                                                                                                                                                                                                                 |

### `src/tokens/` — Design Tokens

| File             | Lines | Description                                                                                                                                                                                                                                                                                                   |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themes.ts`      | 103   | Exports `Theme` interface (32 properties) + `DARK` and `LIGHT` objects + `resolveColor()` utility. Covers: backgrounds (bg, bg2, bg3, card), text hierarchy (text, sub, muted, faint), accent colors (cyan, green, amber, purple), borders (border, border2, line), effects (gridLine, glow1, glow2, shadow). |
| `typography.ts`  | 105   | Centralized text style presets (`TEXT.sectionHeading`, `TEXT.body`, `TEXT.monoLabel`, `TEXT.metricValue`, etc.). Eliminates ~45 repeated font-family/size/spacing declarations.                                                                                                                               |
| `spacing.ts`     | 27    | Two-layer spacing system: `SPACE` scale for component gaps, `SECTION_SPACING` for vertical rhythm, `CONTAINER_PADDING` for horizontal padding.                                                                                                                                                                |
| `breakpoints.ts` | 19    | Single source of truth for responsive breakpoints (sm, md, lg, xl, 2xl).                                                                                                                                                                                                                                      |

### `src/data/` — Static Content

| File          | Lines | Exports                                                                                                                              |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `nav.ts`      | 18    | `NavLink` interface, `NAV_LINKS` array (4 items: Work, About, Skills, Contact)                                                       |
| `projects.ts` | 101   | `Project` interface (12 fields), `PROJECTS` array (4 projects: SaaSify, DevMetrics, openapi-gen, MoroccoMap)                         |
| `skills.ts`   | 51    | `SkillGroup` interface, `SKILL_GROUPS` array (4 groups × 6 items), `TECH_STRIP` array (14 technologies for marquee)                  |
| `stats.ts`    | 23    | `Metric` interface, `METRICS` array (4 items), `HERO_METRICS` subset (3 items). Single source for stats used in HeroStats and About. |

### `src/hooks/` — Custom Hooks

| File                 | Lines | Description                                                                                                                                                                                |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useTheme.ts`        | 65    | Manages dark/light state, localStorage persistence (`portfolio-theme`), CSS variable injection. Exports `ThemeContext`, `useThemeContext()`, `useTheme()`. Context: `{ dark, toggle, C }`. |
| `useResponsive.ts`   | 68    | Responsive context using `BREAKPOINTS` tokens. Exports `ResponsiveContext`, `useResponsiveContext()`, `useResponsive()`. Context: `{ width, isMobile, isTablet, isDesktop }`.              |
| `useScrollReveal.ts` | 44    | Single `IntersectionObserver` for `.rv/.rv-l/.rv-r/.rv-s` classes. Adds `.in` class on intersection. Threshold 8%, rootMargin `-30px`. Called once in `layout.tsx`.                        |

### `src/components/ui/` — Atomic UI

| File             | Lines | Description                                                                                                                                                            |
| ---------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Avatar.tsx`     | 110   | Inline SVG avatar with conic gradient ring, detailed face (hair, eyes, eyebrows, nose, mouth, beard shadow, shirt), and green "online" status dot with glow animation. |
| `Label.tsx`      | 35    | Section label: horizontal cyan line + monospace uppercase text (e.g., "01 — Work").                                                                                    |
| `Tag.tsx`        | 34    | Colored pill/badge for tags, statuses, technologies. Wrapped in `React.memo`.                                                                                          |
| `WindowDots.tsx` | 24    | Three macOS-style traffic light dots. Wrapped in `React.memo`.                                                                                                         |

### `src/components/layout/` — Layout Components

| File              | Lines | Description                                                                                                                                                                               |
| ----------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ThemeToggle.tsx` | 83    | Pill switch with animated track/thumb, emoji (🌙/☀️), "Dark"/"Light" label.                                                                                                               |
| `Nav/`            | ~220  | **Decomposed** into `Nav.tsx` (orchestrator), `NavLogo.tsx`, `NavLinks.tsx`, `NavMobileMenu.tsx`, `index.ts`. Fixed header with scroll detection, desktop nav, mobile fullscreen overlay. |
| `Footer.tsx`      | 54    | Minimal footer: "© 2026 Abdelilah Wajid" left, tagline right.                                                                                                                             |
| `Container.tsx`   | 53    | Centralized container with breakpoint-aware max-widths. Uses `useResponsiveContext`.                                                                                                      |
| `Section.tsx`     | 49    | Section primitive: auto-handles padding, borderBottom, transition, bg variant.                                                                                                            |
| `Stack.tsx`       | 46    | Flex layout primitive with gap, direction, alignment, wrapping.                                                                                                                           |

### `src/sections/` — Page Sections

| File            | Lines | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Hero.tsx`      | 194   | Full-viewport hero. Green "AVAILABLE FOR WORK" pill badge. Name with gradient (`Abdelilah` grad-text) + clamp typography. Rotating role text (4 roles, 2.8s interval) with blinking cursor. Bio paragraph. Tech pills row. 2 CTAs (VIEW WORK ↓ / GET IN TOUCH) with hover effects. Stats bar (4+ Years / 12+ Shipped / 20+ Clients) with separator lines. Desktop: avatar card (name, role, location, timezone, social buttons). Mobile: compact avatar row. Scroll indicator bottom-right. Two glow orbs + grid background. |
| `TechStrip.tsx` | 54    | Horizontal marquee of 14 technologies × 2 (for seamless loop). `bg2` background, top/bottom borders, alternating cyan/muted colors, ✦ decorators every 6th item, separator `borderRight` on each item. 30s infinite animation.                                                                                                                                                                                                                                                                                               |
| `Work.tsx`      | 145   | Tabbed project showcase. Pill tabs bar (4 projects) with active state (colored dot + border). Featured card: browser bar (WindowDots + URL + status badge + year), two-column grid (left: type, name, desc, longDesc in quotes, tech stack pills, "VIEW PROJECT ↗" button; right desktop-only: checkmark highlights + nested UI schematic preview). 3 small cards for other projects with hover effects.                                                                                                                     |
| `About.tsx`     | 98    | `bg2` background section. Left: section label, italic serif heading, 3 bio paragraphs, 3 tags (Remote-friendly, Freelance open, Startup-ready). Right: 2×2 metrics grid with 1px gap (4+ Years / 12+ Shipped / 20+ Clients / 3 Countries, each with its accent color) + syntax-highlighted code card ("about.ts" with colored tokens: cyan for keywords, amber for strings, green for arrays).                                                                                                                               |
| `Skills.tsx`    | 42    | 4-column grid (2 on mobile) with 1px gap lines. 4 groups: Frontend (cyan), Backend (green), DevOps (amber), Tooling (purple). Each group: colored line + uppercase title, then items list with small colored dots.                                                                                                                                                                                                                                                                                                           |
| `Contact.tsx`   | 145   | `bg2` background with glow orb. Left-aligned content. Large italic heading ("Let's build something real." with grad-text). Description paragraph. Full-width email button with "COPY" badge (switches to "COPIED ✓" for 2.2s). Social links row (GitHub, LinkedIn, Twitter/X) as text buttons with ↗ arrows.                                                                                                                                                                                                                 |

---

## 5. Theme System

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

## 6. Scroll Reveal System

- Classes: `.rv` (fade up), `.rv-l` (slide left), `.rv-r` (slide right), `.rv-s` (scale in).
- Stagger: `.d1` to `.d7` (80ms to 560ms delay).
- Trigger: single `IntersectionObserver` at 8% threshold, `-30px` rootMargin.
- On intersect: `.in` class added → CSS transition fires (0.75s cubic-bezier).
- One-way: once revealed, stays revealed.

---

## 7. Fonts

| Font             | Variable       | Usage               |
| ---------------- | -------------- | ------------------- |
| Playfair Display | `--font-serif` | Headings, names     |
| JetBrains Mono   | `--font-mono`  | Labels, code, pills |
| Inter            | `--font-sans`  | Body text, bio      |

All loaded via `next/font/google` with `display: "swap"`.

---

## 8. Responsive Strategy

- **Breakpoints**: defined in `src/tokens/breakpoints.ts` (sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536).
- **Hook**: `useResponsive()` provides `{ isMobile, isTablet, isDesktop }` — extensible beyond binary.
- **Method**: conditional rendering and inline style values based on responsive context.
- **Nav**: full desktop nav (links + Hire Me) vs. hamburger + fullscreen overlay.
- **Hero**: grid 2-col vs. 1-col; avatar card vs. compact row; stats hidden on mobile.
- **Work**: 2-col featured card vs. 1-col; highlights/preview hidden on mobile.
- **Skills**: 4-col grid vs. 2-col.
- **Padding**: `48px` desktop vs. `20px` mobile.

---

## 9. Animations

| Animation | CSS `@keyframes`              | Duration     | Usage                  |
| --------- | ----------------------------- | ------------ | ---------------------- |
| `marquee` | translateX(0→-50%)            | 30s infinite | TechStrip scrolling    |
| `fadeUp`  | opacity 0→1 + translateY 22→0 | 0.5s         | Hero elements entrance |
| `glow`    | box-shadow pulse              | 2s infinite  | Green "available" dots |

---

## 10. Known Issues / Notes

- The project uses `"use client"` on `layout.tsx`, meaning the entire app is client-rendered. This is intentional for the theme/scroll-reveal hooks that need `window` and `document`.
- No i18n configured. Content is in **English** with French JSDoc comments.
- No `<meta>` OG tags yet (only basic title + description).
- Social links in Contact section are placeholder buttons (no real `href`).
- Email in Contact is `abdelilah@email.com` — placeholder.

---

## 11. Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript type check (currently: 0 errors)
```

---

## 12. File Tree

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css              (163 lines)
│   ├── layout.tsx               (75 lines)
│   └── page.tsx                 (27 lines)
├── components/
│   ├── layout/
│   │   ├── Container.tsx        (53 lines)
│   │   ├── Footer.tsx           (54 lines)
│   │   ├── Nav/
│   │   │   ├── index.ts
│   │   │   ├── Nav.tsx          (154 lines)
│   │   │   ├── NavLogo.tsx      (78 lines)
│   │   │   ├── NavLinks.tsx     (39 lines)
│   │   │   └── NavMobileMenu.tsx(149 lines)
│   │   ├── Section.tsx          (49 lines)
│   │   ├── Stack.tsx            (46 lines)
│   │   └── ThemeToggle.tsx      (83 lines)
│   └── ui/
│       ├── Avatar.tsx           (110 lines)
│       ├── Label.tsx            (35 lines)
│       ├── Tag.tsx              (34 lines)
│       └── WindowDots.tsx       (24 lines)
├── data/
│   ├── nav.ts                   (18 lines)
│   ├── projects.ts              (136 lines)
│   ├── skills.ts                (61 lines)
│   └── stats.ts                 (23 lines)
├── hooks/
│   ├── useResponsive.ts         (68 lines)
│   ├── useScrollReveal.ts       (44 lines)
│   └── useTheme.ts              (65 lines)
├── sections/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Hero/
│   │   ├── index.ts
│   │   ├── HeroContent.tsx
│   │   ├── HeroAvatar.tsx
│   │   ├── HeroCTA.tsx
│   │   └── HeroStats.tsx
│   ├── Skills.tsx
│   ├── TechStrip.tsx
│   └── Work/
│       ├── index.ts
│       ├── Work.tsx
│       ├── WorkFeaturedCard.tsx
│       └── WorkSmallCards.tsx
└── tokens/
    ├── breakpoints.ts           (19 lines)
    ├── spacing.ts               (27 lines)
    ├── themes.ts                (103 lines)
    └── typography.ts            (105 lines)
```

**Total**: ~35 source files
