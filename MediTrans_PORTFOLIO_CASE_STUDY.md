# MediTrans — Medical Transport & Home Care Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/NextAuth-4-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vitest-146_tests-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
</p>

---

## Overview

**MediTrans** is a production-grade SaaS platform built for managing medical transport services (ambulance, nursing, medical visits) and home care operations. It handles the full business lifecycle — from client onboarding and patient management to service scheduling, dynamic pricing, invoice generation with PDF export, payment tracking, and real-time analytics.

Built with a modular, enterprise-grade architecture across **10 development phases**, featuring **128+ source files**, **146 automated tests**, **26 commits**, and **full technical documentation**.

---

## Key Features

### Business Operations
- **Client & Patient Management** — Full CRUD with search, filtering, and relationship tracking
- **Service Scheduling** — Create services with urgency levels, staff types, distance-based routing
- **Dynamic Pricing Engine** — Rule-based pricing with modifiers (night, weekend, holiday), distance rates, and manual overrides
- **Invoice Generation** — Automatic invoicing from completed services with professional PDF export
- **Payment Tracking** — Multi-method payment recording (cash, card, transfer, cheque) with auto-reconciliation

### Technical Capabilities
- **Role-Based Access Control (RBAC)** — Admin (full access) & Assistant (read + limited create)
- **Real-time Dashboard** — KPIs, revenue metrics, Recharts visualizations, recent activity feed
- **Audit Trail** — Automatic logging of critical operations (create, delete, cancel)
- **Session Hardening** — JWT with isActive re-validation, 8h maxAge, middleware protection
- **Input Validation** — Zod schemas on every server action
- **PDF Engine** — Professional invoice PDFs with @react-pdf/renderer (11 modular components)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components, Server Actions) |
| **Language** | TypeScript 5 (strict mode) |
| **Database** | PostgreSQL 16 + Prisma ORM 5 |
| **Authentication** | NextAuth.js 4 (Credentials + JWT) |
| **Styling** | TailwindCSS 3.4 + Custom Design System |
| **Charts** | Recharts 3 (lazy-loaded, SSR-disabled) |
| **PDF** | @react-pdf/renderer 4 |
| **Validation** | Zod 4 |
| **Testing** | Vitest 4 + @vitest/coverage-v8 |
| **Icons** | Lucide React |

---

## Architecture

```
src/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── api/                      # API routes (auth, PDF)
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── clients/              # Client CRUD pages
│   │   ├── patients/             # Patient CRUD pages
│   │   ├── services/             # Service management
│   │   ├── invoices/             # Invoice management + PDF
│   │   ├── payments/             # Payment recording
│   │   └── admin/pricing/        # Pricing administration (4 tabs)
│   └── login/                    # Authentication page
│
├── modules/                      # Business logic (modular DDD-style)
│   ├── clients/                  # schema → service → repository → actions
│   ├── patients/
│   ├── services/
│   ├── invoices/                 # includes PDF engine (11 components)
│   ├── payments/
│   ├── pricing/                  # engine + admin + snapshot
│   ├── users/
│   └── dashboard/
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Design System (Button, Card, Table, Modal, Badge...)
│   ├── forms/                    # FormField
│   ├── layout/                   # Sidebar, Header, DashboardLayout
│   └── providers/                # AuthProvider
│
├── lib/                          # Shared utilities
│   ├── auth.ts                   # NextAuth configuration
│   ├── session.ts                # requireSession() + requireAdmin()
│   ├── audit.ts                  # Audit trail logger
│   ├── db.ts                     # Prisma client singleton
│   └── utils.ts                  # formatCurrency, formatDate, cn()
│
└── types/                        # Type augmentations
```

### Design Patterns
- **Modular DDD**: Each module follows `schema → types → repository → service → actions`
- **Server Actions**: All mutations via Next.js server actions (no API routes for CRUD)
- **Layered Security**: Middleware → requireSession → requireAdmin → Zod validation → audit
- **Optimistic UI**: Selective Prisma selects + parallel queries + dynamic imports

---

## Development Phases

| Phase | Description | Status |
|:---:|---|:---:|
| **00** | Database schema, Prisma models, pricing engine, business rules | ✅ |
| **02** | Custom Design System — tokens, 10+ components, layout system | ✅ |
| **03** | Clients & Patients — full CRUD with search & filtering | ✅ |
| **04** | Test Suite — 146 tests across pricing, invoices, payments, hardening | ✅ |
| **05** | Services — scheduling, pricing preview, night auto-detection | ✅ |
| **06** | Invoices & PDF — professional invoice engine with PDF export | ✅ |
| **07** | Payments — recording, deletion, auto status reconciliation | ✅ |
| **08** | Admin Pricing — 4-tab UI for rules, modifiers, distance rates, config | ✅ |
| **09** | Auth & Dashboard — NextAuth + KPIs + Recharts analytics | ✅ |
| **09.5** | Security Hardening — RBAC, audit trail, session hardening, performance | ✅ |

---

## Dashboard Preview

### Analytics Dashboard
- **5 KPI Cards**: Clients, Patients, Services, Invoices, Payments
- **4 Revenue Metrics**: Total Invoiced, Total Collected, Collection Rate, Today's Revenue
- **3 Charts**: Monthly Revenue (BarChart), Services by Type (PieChart), Payments by Method (PieChart)
- **3 Activity Feeds**: Recent Services, Recent Invoices, Recent Payments

### Pricing Engine
- Rule-based pricing with catalog codes, urgency levels, staff types
- Modifier system: Night (+%), Weekend (+MAD), Holiday
- Distance-based rates by zone (Urban, Rural, Inter-city)
- Real-time price preview before service creation

### Invoice PDF
- Professional layout with company branding
- Itemized service lines with pricing breakdown
- Status badge (Paid, Partial, Unpaid, Cancelled)
- Auto-generated invoice numbers

---

## Security Architecture

```
Request Flow:
┌─────────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────┐
│  Middleware  │───▶│requireSession│───▶│ requireAdmin   │───▶│  Zod     │
│  /dashboard  │    │  (id, role)  │    │  (mutations)   │    │  Schema  │
└─────────────┘    └──────────────┘    └───────────────┘    └──────────┘
                                                                 │
                                                                 ▼
                                                          ┌──────────┐
                                                          │ auditLog │
                                                          └──────────┘
```

| Feature | Implementation |
|---|---|
| **Authentication** | NextAuth.js + bcrypt password hashing |
| **Authorization** | RBAC (admin/assistant) on every server action |
| **Session** | JWT, 8h maxAge, isActive re-validation on refresh |
| **Input Validation** | Zod schemas on all mutations |
| **Audit Trail** | userId, role, action, entity, entityId, timestamp |
| **Error Handling** | Safe error messages — no raw stack traces |

---

## Testing

```
Tests:       146 passing
Test Files:  9 files
Coverage:    Pricing Engine 100%
Framework:   Vitest 4
```

| Suite | Tests | Description |
|---|:---:|---|
| Pricing Engine | 40+ | Rule matching, modifiers, distance, edge cases |
| Pricing Snapshot | 20+ | Immutable snapshot creation & retrieval |
| Pricing Hardening | 30+ | Concurrency, stress, security edge cases |
| Pricing Utils | 15+ | Utility functions, formatting, calculations |
| Invoices | 20+ | Creation, line items, status transitions |
| Payments | 15+ | Recording, deletion, auto-reconciliation |

---

## Performance Optimizations

| Optimization | Impact |
|---|---|
| Dynamic import (Recharts) | Dashboard bundle: **123 kB → 4.91 kB** (-96%) |
| Selective Prisma selects | Reduced over-fetching on all queries |
| Promise.all parallel queries | Dashboard loads 15 queries concurrently |
| Server-side aggregation | Charts data computed on server, not client |

---

## Quick Start

```bash
# Clone
git clone https://github.com/<your-org>/meditrans-core.git
cd meditrans-core

# Install
npm install

# Configure
cp .env.example .env
# Set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Database
npm run db:migrate
npm run db:seed

# Run
npm run dev          # → http://localhost:3000

# Test
npm test             # 146 tests
npm run test:coverage

# Documentation
npm run docs         # → http://localhost:3333
```

---

## Project Stats

| Metric | Value |
|---|---|
| **Source Files** | 128+ |
| **Modules** | 8 business modules |
| **Database Tables** | 11 |
| **Server Actions** | 30+ |
| **UI Components** | 10+ reusable (Design System) |
| **Dashboard Pages** | 18 routes |
| **Test Cases** | 146 |
| **Test Files** | 9 |
| **Commits** | 26 |
| **Development Phases** | 10 |
| **Doc Pages** | 17 (SPA documentation site) |

---

## Documentation

Full interactive documentation site built as a zero-dependency SPA:
- Hash-based routing with deep linking
- Full-text search across all pages
- Auto-generated table of contents
- Copy code blocks
- Previous/Next navigation
- RTL (Arabic) support

**Run locally:** `npm run docs` → `http://localhost:3333`

---

## What I Learned

- Building a **production-grade SaaS** from scratch with Next.js 14 App Router
- Implementing a **dynamic pricing engine** with complex rule matching and modifiers
- Designing a **modular architecture** (DDD-style) that scales across 8 business modules
- Creating a **custom Design System** with consistent tokens and reusable components
- Building a **professional PDF engine** with @react-pdf/renderer
- Implementing **RBAC + Audit Trail** for enterprise-level security
- Writing **146 automated tests** including hardening (concurrency, stress, security)
- Optimizing **bundle size by 96%** with dynamic imports and selective queries
- Creating **interactive documentation** as a standalone SPA

---

<p align="center">
  <strong>Built with precision. Engineered for production.</strong><br>
  <sub>Next.js 14 · TypeScript · Prisma · PostgreSQL · TailwindCSS · NextAuth · Recharts · Vitest</sub>
</p>
