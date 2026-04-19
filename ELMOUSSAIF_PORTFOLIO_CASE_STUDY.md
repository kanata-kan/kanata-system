# ELMOUSSAIF — Personal Brand & Transport Platform

> A full-stack multilingual web platform for a private transport operator in Marrakech, Morocco.  
> Built from discovery to deployment as a solo full-stack engineer.

---

## At a Glance

| Detail       | Value                                                |
| ------------ | ---------------------------------------------------- |
| **Role**     | Solo Full-Stack Engineer & Technical Lead            |
| **Timeline** | Feb 2026 — Present                                   |
| **Client**   | Abdelghafour Elmoussaif — Private Transport Operator |
| **Type**     | Freelance / Personal Brand Infrastructure            |
| **Status**   | MVP Complete — In Production                         |

---

## The Challenge

The client operated a successful private transport service in Marrakech (airport transfers, VIP trips, day tours) but had **zero digital presence**. All bookings came through scattered WhatsApp messages and word-of-mouth. Key problems:

- **No credibility tool** — potential B2B partners (riads, villas, hotels) had no way to evaluate the service professionally.
- **No content ownership** — photos, pricing, and service descriptions were scattered across messaging apps.
- **Multilingual market** — clients and partners operate in English, French, Spanish, and Arabic.
- **No admin capability** — the client needed to manage content independently with zero technical knowledge.

**Goal:** Build a professional digital identity that converts B2B partners, consolidates all brand assets, and is fully manageable by a non-technical operator.

---

## Tech Stack

### Core

| Layer          | Technology                                 |
| -------------- | ------------------------------------------ |
| **Framework**  | Next.js 16 (App Router)                    |
| **Language**   | TypeScript (strict mode)                   |
| **UI**         | React 19, TailwindCSS v4                   |
| **Database**   | MongoDB Atlas + Mongoose 9                 |
| **Auth**       | Custom JWT + bcrypt (single-admin)         |
| **Media**      | Cloudinary (CDN, transforms, optimization) |
| **Email**      | Resend API                                 |
| **Validation** | Zod v4                                     |
| **Animation**  | Framer Motion                              |
| **Hosting**    | Vercel                                     |

### Notable Libraries

- `sharp` — Server-side image processing
- `@dnd-kit` — Drag-and-drop image reordering in admin
- `react-international-phone` — Formatted phone input
- `server-only` — Strict server/client boundary enforcement

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   VERCEL                         │
│  ┌───────────────────────────────────────────┐   │
│  │           Next.js App Router              │   │
│  │                                           │   │
│  │  ┌─────────────┐   ┌──────────────────┐   │   │
│  │  │  Public Site │   │  Admin Dashboard │   │   │
│  │  │  (SSR/SSG)  │   │  (Server Actions)│   │   │
│  │  │  4 locales  │   │  JWT Protected   │   │   │
│  │  └──────┬──────┘   └────────┬─────────┘   │   │
│  │         │                   │             │   │
│  │  ┌──────┴───────────────────┴─────────┐   │   │
│  │  │          Shared /lib Layer          │   │   │
│  │  │  db · auth · i18n · validators     │   │   │
│  │  │  seo · email · cloudinary · theme  │   │   │
│  │  └──────────────────┬─────────────────┘   │   │
│  └─────────────────────┼─────────────────────┘   │
│                        │                         │
└────────────────────────┼─────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
   ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼─────┐
   │ MongoDB     │ │Cloudinary│ │  Resend   │
   │ Atlas       │ │  (CDN)   │ │  (Email)  │
   └─────────────┘ └──────────┘ └───────────┘
```

### Key Architectural Decisions

- **Server Components by default** — Client components only where interactivity demands it (forms, animations, drag-and-drop).
- **Server Actions for mutations** — All admin CRUD via Next.js Server Actions, no REST API needed.
- **Singleton DB connection** — Prevents connection pool exhaustion in serverless.
- **Design token system** — HSL-based CSS custom properties with light/dark and luxury theme variants.
- **Strict separation of concerns** — No database logic in components; all data access through dedicated server-only modules.

---

## Features

### Public Website (4 Locales: EN / FR / ES / AR)

- **Locale-aware routing** — `/en/`, `/fr/`, `/es/`, `/ar/` with automatic SEO metadata per locale
- **RTL support** — Full right-to-left layout for Arabic with dedicated font (Noto Sans Arabic)
- **Dynamic service pages** — Each service has its own SEO-optimized route with structured data (JSON-LD)
- **Fleet showcase** — Vehicle cards with image galleries, specs, and passenger capacity
- **Tour catalog** — Day trip listings with image galleries and multilingual descriptions
- **Contact system** — Form with email delivery (Resend) + WhatsApp integration + phone widget
- **SEO infrastructure** — Dynamic sitemap, robots.txt, OpenGraph images, JSON-LD (Organization + LocalBusiness)
- **Performance** — Cloudinary image optimization, Server Components, lazy-loaded galleries
- **Animated UI** — Scroll-reveal animations, smooth transitions via Framer Motion

### Admin Dashboard

- **Secure login** — JWT session with bcrypt password hashing
- **Fleet management** — Full CRUD with multilingual fields (EN/FR/ES/AR), image upload to Cloudinary, drag-and-drop reordering
- **Tour management** — Create/edit tours with multi-image galleries and localized content
- **Homepage editor** — Edit hero section, partner logos, stats, CTA blocks
- **About page editor** — Update biography and brand story
- **Service page editor** — Manage each service page content independently
- **Settings panel** — Brand info, contact details, social links, SEO defaults
- **Contact inbox** — View and manage contact form submissions with read/unread status
- **Real-time stats** — Dashboard with vehicle count, tour count, unread messages

### Design System

- **Custom typography stack** — Cormorant Garamond (display), Barlow Condensed (labels), Barlow (body), Plus Jakarta Sans (headings), Noto Sans Arabic
- **Gold & ink palette** — `#EDD06E` / `#C9A84C` / `#8A6520` accent tones with deep ink backgrounds
- **Theme variants** — Light, dark, luxury-dark, luxury-light modes via CSS custom properties
- **Component library** — Custom form fields, image gallery with lightbox, scroll reveal, social widget, flag icons

---

## Data Models

```
Settings ─── Brand info, contact, social links, SEO defaults
HomePage ─── Hero, partners, stats, CTA sections
AboutPage ── Biography, story content
ServicePage ─ Per-service landing page content (×4)
Fleet ─────── Vehicle entries (name, specs, images, localized descriptions)
Tour ──────── Day trip entries (title, images, localized content)
ContactMessage ─ Form submissions with status tracking
Admin ─────── Single admin user (email + hashed password)
```

All content models support **4-language localized fields** (EN/FR/ES/AR) stored as nested objects in MongoDB.

---

## i18n Architecture

```
lib/
├── i18n/
│   ├── locales.ts          # Locale config & types
│   ├── get-dictionary.ts   # Server-side dictionary loader
│   ├── get-dictionary-client.ts  # Client-side dictionary
│   └── localize.ts         # Content field resolver
├── content/
│   ├── en/  (9 content files)
│   ├── fr/  (9 content files)
│   ├── es/  (9 content files)
│   └── ar/  (9 content files)
└── seo/
    ├── metadata.ts         # Per-locale meta builder
    └── json-ld.ts          # Structured data generators
```

- **Static dictionary** for UI strings (navigation, buttons, labels)
- **Database content** for dynamic pages (fleet, tours, services)
- **Culturally adapted** — not literal translations; each locale has contextually appropriate phrasing
- **SEO per locale** — Unique meta titles, descriptions, and OpenGraph locale tags

---

## Security

- **HTTP security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
- **JWT authentication** — Secure token-based admin sessions
- **bcrypt hashing** — Password storage with salt rounds
- **Input validation** — Zod schemas on all form submissions (client + server)
- **Protected routes** — Admin middleware checks JWT before rendering
- **Environment isolation** — All secrets in `.env.local`, never exposed to client bundle
- **Server-only modules** — Enforced via `server-only` package to prevent accidental client imports

---

## Project Engineering

This project was built with a **constitution-driven** approach — a formal document (`PROJECT_CONSTITUTION.md`) governing all technical decisions:

- **Single Source of Truth** — All data lives in MongoDB; UI reads from one source only
- **Clean Code** — Descriptive names, single-responsibility functions, no magic numbers
- **Modularity** — Small, focused files; feature-based organization
- **18 documentation files** — From discovery report to deployment plan, architecture decisions logged formally

### Documentation Suite

```
docs/
├── 00_Project_Overview.md
├── 01_Discovery_Report.md
├── 02_System_Architecture.md
├── 03_Database_Design.md
├── 04_API_Design.md
├── 05_Routing_Structure.md
├── 06_UI_UX_Structure.md
├── 07_Content_Strategy.md
├── 08_Admin_Dashboard_Spec.md
├── 09_Deployment_Plan.md
├── 10_Architecture_Decision_Log.md
├── 11_Implementation_Guide.md
├── 12_Execution_Plan.md
├── 13_THEME_SYSTEM.md
├── 14_PROJECT_STATUS_REPORT.md
├── 15_TECHNICAL_AUDIT_REPORT.md
├── MULTILINGUAL_SEO_ARCHITECTURE_PLAN.md
└── PROJECT_ROADMAP_V2.md
```

---

## Results & Impact

- **0 → 1 digital presence** — Client went from zero online visibility to a professional multilingual platform
- **4-language reach** — Covers the full Marrakech tourism market (EN/FR/ES/AR)
- **Self-service admin** — Client manages all content independently without developer intervention
- **B2B credibility** — Partners (riads, villas, hotels) can now evaluate services through a professional interface
- **SEO-ready** — Structured data, per-locale metadata, semantic HTML, optimized assets

---

## What I Learned

- **i18n is architecture, not an afterthought** — Adding Arabic (RTL) after EN/FR/ES taught me that internationalization should shape routing, component design, and content strategy from day one.
- **Constitution-driven development works** — Having a formal principles document prevented scope creep and maintained code quality across months of solo development.
- **Server Actions simplify full-stack** — Next.js App Router + Server Actions eliminated the need for a separate API layer while keeping security boundaries clean.
- **Design tokens pay dividends** — A well-structured CSS custom property system made adding theme variants (luxury-dark, luxury-light) trivial.

---

## Screenshots

> _Add screenshots here: homepage hero, fleet page, admin dashboard, mobile view, Arabic RTL layout_

<!--
![Homepage Hero](./screenshots/hero.png)
![Fleet Page](./screenshots/fleet.png)
![Admin Dashboard](./screenshots/admin.png)
![Mobile View](./screenshots/mobile.png)
![Arabic RTL](./screenshots/arabic.png)
-->

---

## Links

| Resource        | URL                          |
| --------------- | ---------------------------- |
| **Live Site**   | _[Add production URL]_       |
| **Source Code** | _[Add GitHub URL if public]_ |

---

<sub>Case study written April 2026. Project is actively maintained and evolving.</sub>
