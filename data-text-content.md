# Data Text Content — Complete Reference

> **Source file**: `src/data/content/en.ts`
> **Type definitions**: `src/data/content/types.ts`
> All text content is centralized in a single locale file. No hardcoded text exists in components.

---

## How to read this document

Each section below maps to a key in the `SiteContent` interface. The **Content Key** column shows the exact path to access the text via `content.{key}`. The **Used In** column shows which component file consumes it.

---

## 1. Meta — `content.meta`

| Content Key         | Value                                                                              | Used In              |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------- |
| `meta.title`        | `Abdelilah Wajid · Full-Stack Engineer`                                            | `app/layout.tsx`     |
| `meta.description`  | `Portfolio of Abdelilah Wajid — Full-Stack Engineer based in Marrakech, Morocco.`  | `app/layout.tsx`     |

---

## 2. Nav — `content.nav`

| Content Key          | Value                          | Used In          |
| -------------------- | ------------------------------ | ---------------- |
| `nav.logoInitial`    | `A.`                           | `NavLogo.tsx`    |
| `nav.logoName`       | `ABDELILAH`                    | `NavLogo.tsx`    |
| `nav.logoTagline`    | `UNDERSTAND · DECIDE · BUILD`  | `NavLogo.tsx`    |
| `nav.links[0]`       | `{ id: "work", n: "01", label: "Approach" }`   | `NavLinks.tsx`, `NavMobileMenu.tsx` |
| `nav.links[1]`       | `{ id: "about", n: "02", label: "Mindset" }`   | `NavLinks.tsx`, `NavMobileMenu.tsx` |
| `nav.links[2]`       | `{ id: "skills", n: "03", label: "Tools" }`    | `NavLinks.tsx`, `NavMobileMenu.tsx` |
| `nav.links[3]`       | `{ id: "contact", n: "04", label: "Contact" }` | `NavLinks.tsx`, `NavMobileMenu.tsx` |

---

## 3. Hero — `content.hero`

### Badge & Name

| Content Key              | Value                  | Used In            |
| ------------------------ | ---------------------- | ------------------ |
| `hero.badge`             | `AVAILABLE FOR WORK`   | `HeroContent.tsx`  |
| `hero.name.base`         | `Abdel`                | `HeroContent.tsx`  |
| `hero.name.highlight`    | `ilah`                 | `HeroContent.tsx`  |
| `hero.name.lastName`     | `Wajid`                | `HeroContent.tsx`  |

### Roles (rotating text)

| Content Key      | Value                                | Used In           |
| ---------------- | ------------------------------------ | ----------------- |
| `hero.roles[0]`  | `Understand before building`         | `HeroContent.tsx` |
| `hero.roles[1]`  | `Fix what slows growth`              | `HeroContent.tsx` |
| `hero.roles[2]`  | `Make decisions, not assumptions`    | `HeroContent.tsx` |
| `hero.roles[3]`  | `Clarity over speed`                 | `HeroContent.tsx` |

### Pills

| Content Key      | Value                  | Used In    |
| ---------------- | ---------------------- | ---------- |
| `hero.pills[0]`  | `Understanding first`  | `Hero.tsx` |
| `hero.pills[1]`  | `Clear decisions`      | `Hero.tsx` |
| `hero.pills[2]`  | `Real constraints`     | `Hero.tsx` |
| `hero.pills[3]`  | `Value-driven work`    | `Hero.tsx` |

### Bio, CTA & Scroll

| Content Key            | Value | Used In |
| ---------------------- | ----- | ------- |
| `hero.bio`             | `Before writing any code, I try to understand how the business actually works. If the goal is growth, I don't jump into building — I look for what's slowing things down first. Then I decide where I can truly add value.` | `HeroContent.tsx` |
| `hero.cta.primary`     | `SEE HOW I THINK ↓`         | `HeroCTA.tsx` |
| `hero.cta.secondary`   | `START A CONVERSATION`       | `HeroCTA.tsx` |
| `hero.scroll`          | `SCROLL`                     | `Hero.tsx`    |

### Avatar Card

| Content Key                    | Value                            | Used In           |
| ------------------------------ | -------------------------------- | ----------------- |
| `hero.avatar.displayName`      | `Abdelilah W.`                   | `HeroAvatar.tsx`  |
| `hero.avatar.tagline`          | `UNDERSTAND → DECIDE → BUILD`   | `HeroAvatar.tsx`  |
| `hero.avatar.locationShort`    | `Marrakech · Open to remote`     | `HeroAvatar.tsx`  |
| `hero.avatar.infoItems[0]`     | `Marrakech, Morocco`             | `HeroAvatar.tsx`  |
| `hero.avatar.infoItems[1]`     | `UTC+1 — GMT+1`                  | `HeroAvatar.tsx`  |
| `hero.avatar.infoItems[2]`     | `Open to remote`                 | `HeroAvatar.tsx`  |
| `hero.avatar.socials[0]`       | `{ href: "https://github.com/abdelilah", label: "GitHub" }`             | `HeroAvatar.tsx` |
| `hero.avatar.socials[1]`       | `{ href: "https://linkedin.com/in/abdelilahwajid", label: "LinkedIn" }` | `HeroAvatar.tsx` |
| `hero.avatar.socials[2]`       | `{ href: "https://x.com/abdelilahwajid", label: "X" }`                  | `HeroAvatar.tsx` |

---

## 4. About — `content.about`

### Section Header

| Content Key            | Value                      | Used In      |
| ---------------------- | -------------------------- | ------------ |
| `about.label`          | `02 — Mindset`             | `About.tsx`  |
| `about.headingLine1`   | `I work from reality,`     | `About.tsx`  |
| `about.headingLine2`   | `not assumptions.`         | `About.tsx`  |

### Bio Paragraphs

| Content Key            | Value | Used In |
| ---------------------- | ----- | ------- |
| `about.paragraphs[0]`  | `I don't start from features or tools. I start by understanding how the business actually works — and where things break.` | `About.tsx` |
| `about.paragraphs[1]`  | `Most of the time, the problem isn't missing code. It's unclear decisions, hidden complexity, or things slowing the system down.` | `About.tsx` |
| `about.paragraphs[2]`  | `My role is to bring clarity first — then decide what's worth building, what should be fixed, and what should be left untouched.` | `About.tsx` |

### Tags

| Content Key        | Value                                    | Used In     |
| ------------------ | ---------------------------------------- | ----------- |
| `about.tags[0]`    | `{ text: "Clarity first", colorKey: "cyan" }`       | `About.tsx` |
| `about.tags[1]`    | `{ text: "No blind execution", colorKey: "amber" }` | `About.tsx` |
| `about.tags[2]`    | `{ text: "Value over noise", colorKey: "purple" }`   | `About.tsx` |

### Code Card

| Content Key           | Value        | Used In     |
| --------------------- | ------------ | ----------- |
| `about.codeFilename`  | `about.ts`   | `About.tsx` |
| `about.codeRows`      | 7 rows of colored tokens (see `en.ts` lines 89–119) | `About.tsx` |

---

## 5. Work — `content.work`

| Content Key       | Value                        | Used In    |
| ----------------- | ---------------------------- | ---------- |
| `work.label`      | `01 — Approach`              | `Work.tsx` |
| `work.heading`    | `Projects that shipped.`     | `Work.tsx` |
| `work.subtitle`   | `4 projects · 2023–2024`     | `Work.tsx` |

---

## 6. Projects — `content.projects`

4 projects, each with these fields:

| Field         | Type       | Example (project 0)                                                     | Used In |
| ------------- | ---------- | ----------------------------------------------------------------------- | ------- |
| `n`           | `string`   | `"01"`                                                                   | `WorkFeaturedCard.tsx`, `WorkSmallCards.tsx` |
| `year`        | `string`   | `"2024"`                                                                 | `WorkFeaturedCard.tsx` |
| `name`        | `string`   | `"SaaSify"`                                                              | `Work.tsx`, `WorkFeaturedCard.tsx`, `WorkSmallCards.tsx` |
| `type`        | `string`   | `"SaaS Product"`                                                         | `WorkFeaturedCard.tsx` |
| `color`       | `string`   | `"#38BDF8"`                                                              | `Work.tsx`, `WorkFeaturedCard.tsx`, `WorkSmallCards.tsx` |
| `status`      | `string`   | `"Live"`                                                                 | `WorkFeaturedCard.tsx` |
| `statusColor` | `string`   | `"#3FB950"`                                                              | `WorkFeaturedCard.tsx` |
| `link`        | `string`   | `"saasify.dev"`                                                          | `WorkFeaturedCard.tsx` |
| `desc`        | `string`   | `"The real challenge wasn't building features — it was handling complexity across multiple tenants."` | `WorkFeaturedCard.tsx` |
| `longDesc`    | `string`   | `"I focused on structuring the system early to avoid future rewrites and scaling issues."` | `WorkFeaturedCard.tsx` |
| `stack`       | `string[]` | `["Next.js 14", "Prisma", "Stripe", "PostgreSQL", "Resend", "Tailwind"]` | `WorkFeaturedCard.tsx` |
| `highlights`  | `string[]` | 4 highlight strings                                                      | `WorkFeaturedCard.tsx` |

### All Projects

| #  | Name          | Type               | Status | Year |
| -- | ------------- | ------------------ | ------ | ---- |
| 01 | SaaSify       | SaaS Product       | Live   | 2024 |
| 02 | DevMetrics    | Internal Tool      | Beta   | 2024 |
| 03 | openapi-gen   | Open Source CLI     | OSS    | 2023 |
| 04 | MoroccoMap    | Data Visualization | Live   | 2023 |

---

## 7. Skills — `content.skills`

| Content Key        | Value                                                  | Used In      |
| ------------------ | ------------------------------------------------------ | ------------ |
| `skills.label`     | `03 — Tools`                                           | `Skills.tsx` |
| `skills.heading`   | `Tools I use — when they actually matter.`             | `Skills.tsx` |
| `skills.subtitle`  | `Tools follow the problem — not the other way around.` | `Skills.tsx` |

---

## 8. Skill Groups — `content.skillGroups`

| Group     | Color     | Items                                                         | Used In      |
| --------- | --------- | ------------------------------------------------------------- | ------------ |
| Frontend  | `#38BDF8` | React / Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML / CSS | `Skills.tsx` |
| Backend   | `#3FB950` | Node.js / Express, PostgreSQL, Prisma ORM, REST APIs          | `Skills.tsx` |
| DevOps    | `#F0883E` | Docker, Vercel, AWS, Linux                                    | `Skills.tsx` |
| Tooling   | `#A78BFA` | Git / GitHub, Postman, Figma, Notion                          | `Skills.tsx` |

---

## 9. Stats — `content.stats`

| Content Key   | Value   | Label        | Color Key | Used In                    |
| ------------- | ------- | ------------ | --------- | -------------------------- |
| `stats[0]`    | `4+`    | `Years exp.` | `cyan`    | `About.tsx`, `HeroStats.tsx` |
| `stats[1]`    | `12+`   | `Shipped`    | `purple`  | `About.tsx`, `HeroStats.tsx` |
| `stats[2]`    | `20+`   | `Clients`    | `amber`   | `About.tsx`, `HeroStats.tsx` |
| `stats[3]`    | `3`     | `Countries`  | `green`   | `About.tsx`                  |

> `HeroStats.tsx` uses `HERO_METRICS` = first 3 stats only.

---

## 10. Tech Strip — `content.techStrip`

| Index | Value                  | Used In         |
| ----- | ---------------------- | --------------- |
| 0     | `Understanding first`  | `TechStrip.tsx` |
| 1     | `Clear decisions`      | `TechStrip.tsx` |
| 2     | `Real constraints`     | `TechStrip.tsx` |
| 3     | `Value over features`  | `TechStrip.tsx` |
| 4     | `Fixing bottlenecks`   | `TechStrip.tsx` |
| 5     | `Business awareness`   | `TechStrip.tsx` |
| 6     | `Thinking in flows`    | `TechStrip.tsx` |
| 7     | `Reducing complexity`  | `TechStrip.tsx` |
| 8     | `Focus on outcomes`    | `TechStrip.tsx` |
| 9     | `Clarity in systems`   | `TechStrip.tsx` |

---

## 11. Contact — `content.contact`

| Content Key                  | Value                                                                                              | Used In        |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `contact.label`              | `04 — Contact`                                                                                     | `Contact.tsx`  |
| `contact.headingLine1`       | `Start with clarity,`                                                                              | `Contact.tsx`  |
| `contact.headingHighlight`   | `then we decide.`                                                                                  | `Contact.tsx`  |
| `contact.paragraphLine1`     | `If you're dealing with something unclear, slow, or hard to scale — we can start by understanding it properly.` | `Contact.tsx` |
| `contact.paragraphLine2`     | `If I can help, I'll tell you how. If not, I'll say it early.`                                    | `Contact.tsx`  |
| `contact.email`              | `abdelilah@email.com`                                                                              | `Contact.tsx`  |
| `contact.copyLabel`          | `COPY`                                                                                             | `Contact.tsx`  |
| `contact.copiedLabel`        | `COPIED ✓`                                                                                         | `Contact.tsx`  |
| `contact.socials[0]`         | `GitHub`                                                                                           | `Contact.tsx`  |
| `contact.socials[1]`         | `LinkedIn`                                                                                         | `Contact.tsx`  |
| `contact.socials[2]`         | `Twitter / X`                                                                                      | `Contact.tsx`  |

---

## 12. Footer — `content.footer`

| Content Key        | Value                                | Used In      |
| ------------------ | ------------------------------------ | ------------ |
| `footer.copyright` | `© 2026`                             | `Footer.tsx` |
| `footer.author`    | `Abdelilah Wajid`                    | `Footer.tsx` |
| `footer.tagline`   | `Built with clarity · not complexity` | `Footer.tsx` |

---

## Summary

| Section    | Total text entries | Source key           |
| ---------- | ------------------ | -------------------- |
| Meta       | 2                  | `content.meta`       |
| Nav        | 7                  | `content.nav`        |
| Hero       | 20                 | `content.hero`       |
| About      | 11 + code rows     | `content.about`      |
| Work       | 3                  | `content.work`       |
| Projects   | 4 × 12 fields      | `content.projects`   |
| Skills     | 3                  | `content.skills`     |
| Skill Groups | 4 groups         | `content.skillGroups`|
| Stats      | 4                  | `content.stats`      |
| Tech Strip | 10                 | `content.techStrip`  |
| Contact    | 11                 | `content.contact`    |
| Footer     | 3                  | `content.footer`     |

**All text is in one file**: `src/data/content/en.ts`
**Zero hardcoded text** in any component or section file.
