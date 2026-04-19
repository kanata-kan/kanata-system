# Abdelilah Wajid — CV Pipeline

Deterministic HTML → PDF export using headless Chromium (Puppeteer).  
No Ctrl+P. No browser inconsistencies. Pixel-perfect A4 every time.

---

## Project Structure

```
Wajid-Abdelilah/
├── cv-abdelilah-wajid.html   ← CV source (edit content here)
├── generate-pdf.js           ← PDF render pipeline
├── package.json
├── css/
│   ├── base.css              ← All shared component styles
│   ├── screen.css            ← Browser preview styles (bg, shadow)
│   ├── pdf.css               ← PDF rendering overrides (injected by Puppeteer)
│   └── print.css             ← Optional Ctrl+P fallback
├── output/
│   └── abdelilah-wajid-cv.pdf ← Generated PDF (auto-created)
└── README.md
```

---

## How to Generate the PDF

### 1. Install dependencies (first time only)

```bash
npm install
```

> This downloads Puppeteer and a bundled Chromium (~170 MB). One-time setup.

### 2. Generate the PDF

```bash
npm run build:cv
```

The PDF is saved to `output/abdelilah-wajid-cv.pdf`.

---

## How to Edit Content Safely

**Only edit `cv-abdelilah-wajid.html`.**  
All visual styles live in the `css/` folder — do not touch those unless changing the design.

### Safe content edits (inside the HTML):

| What to change    | Where in the HTML                                   |
| ----------------- | --------------------------------------------------- |
| Name, job title   | `.avatar-block h1`, `.main-header h2`, `.title-tag` |
| Contact details   | `.contact-list` items                               |
| Profile paragraph | `.profile-text`                                     |
| Job experience    | `.exp-list` → each `.exp-item`                      |
| Education         | `.edu-list` → each `.edu-item`                      |
| Skills tags       | `.tags` → each `.tag` span                          |
| Language levels   | `.lang-bar-fill` `style="width: XX%"`               |
| Interests         | `.interest-list` items                              |
| Key Strengths     | `.strengths-list` items                             |
| Profile photo     | `src="..."` on the `<img class="avatar">` tag       |

### Rules to avoid layout breaks:

- Keep all content within the existing HTML structure.
- Do not add new sections without checking they still fit one A4 page.
- Do not change class names.
- Do not add inline `style` attributes (use `css/base.css` instead).
- After any edit, re-run `npm run build:cv` and inspect `output/adam-cv.pdf`.

---

## CSS Architecture

| File             | Purpose                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `css/base.css`   | Core layout + components. Shared by all render contexts.                   |
| `css/screen.css` | Browser-only overrides (grey bg, box-shadow).                              |
| `css/pdf.css`    | Injected by Puppeteer. Removes shadows, forces bg colours, fixes overflow. |
| `css/print.css`  | Ctrl+P fallback. Less reliable than Puppeteer — use for emergencies only.  |

---

## PDF Settings

| Setting          | Value                       |
| ---------------- | --------------------------- |
| Format           | A4 (210mm × 297mm)          |
| Background       | Printed (colours preserved) |
| Margins          | 0                           |
| Scale            | 1                           |
| Page size source | CSS `@page` rule            |
| Font wait        | `document.fonts.ready`      |
| Network wait     | `networkidle0`              |

---

## Requirements

- Node.js ≥ 16
- Internet connection on first run (Google Fonts + Puppeteer download)
- Subsequent runs: offline-safe if Puppeteer cache is warm
