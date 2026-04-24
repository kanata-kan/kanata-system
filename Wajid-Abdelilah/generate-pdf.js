/**
 * generate-pdf.js
 * ───────────────────────────────────────────────────────────
 * Production HTML → PDF pipeline using Puppeteer (headless Chromium).
 * Guarantees pixel-perfect, deterministic A4 output regardless of OS.
 *
 * Usage:
 *   node generate-pdf.js
 *   node generate-pdf.js cv-ats.html
 *   npm run build:cv
 * ───────────────────────────────────────────────────────────
 */

"use strict";

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

/* ── Config ──────────────────────────────────────────────── */
const DEFAULT_HTML_FILE = "cv-abdelilah-wajid.html";
const requestedHtmlFile = process.argv[2] || DEFAULT_HTML_FILE;
const HTML_FILE = path.resolve(__dirname, requestedHtmlFile);
const PDF_CSS = path.resolve(__dirname, "css", "pdf.css");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const isAr = requestedHtmlFile.includes("-ar");
const isFr = requestedHtmlFile.includes("-fr");
const langSuffix = isAr ? "_AR" : isFr ? "_FR" : "";
const OUTPUT_PDF = path.join(OUTPUT_DIR, `Abdelilah_Wajid_CV${langSuffix}.pdf`);

/* ── Helpers ─────────────────────────────────────────────── */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toFileUrl(filePath) {
  return pathToFileURL(filePath).href;
}

/* ── Main pipeline ───────────────────────────────────────── */
async function generatePDF() {
  /* 1 ─ Validate source files */
  if (!fs.existsSync(HTML_FILE)) {
    throw new Error(`HTML source not found: ${HTML_FILE}`);
  }
  if (!fs.existsSync(PDF_CSS)) {
    throw new Error(`pdf.css not found: ${PDF_CSS}`);
  }

  ensureDir(OUTPUT_DIR);

  console.log("🚀  Launching headless Chromium…");
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security" /* allow local file:// cross-origin assets */,
      "--allow-file-access-from-files",
    ],
  });

  try {
    const page = await browser.newPage();

    /* 2 ─ Set viewport matching A4 at 96 dpi (794 × 1123 px) */
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });

    /* 3 ─ Load the HTML via file:// URL (preserves relative asset paths) */
    const fileUrl = toFileUrl(HTML_FILE);
    console.log(`📄  Loading: ${fileUrl}`);

    await page.goto(fileUrl, {
      waitUntil: [
        "load",
        "networkidle0",
      ] /* 'load' covers local images; networkidle0 covers Google Fonts */,
      timeout: 30_000,
    });

    /* Confirm avatar image is fully decoded (critical for local file:// assets) */
    await page.evaluate(async () => {
      const avatar = document.querySelector(".header-photo");
      if (avatar && !avatar.complete) {
        await new Promise((resolve, reject) => {
          avatar.onload = resolve;
          avatar.onerror = reject;
        });
      }
      if (avatar && typeof avatar.decode === "function") {
        await avatar.decode();
      }
    });

    /* 4 ─ Inject pdf.css AFTER the page has loaded
           (overrides screen styles without touching the HTML) */
    const pdfCssContent = fs.readFileSync(PDF_CSS, "utf8");
    await page.addStyleTag({ content: pdfCssContent });

    /* 5 ─ Wait for Web Fonts API to confirm all fonts are ready */
    await page.evaluate(() => document.fonts.ready);

    /* 6 ─ Extra settle time for any late-loading assets */
    await new Promise((resolve) => setTimeout(resolve, 300));

    /* 7 ─ Generate PDF with strict A4 settings */
    console.log("🖨️   Rendering PDF…");
    await page.pdf({
      path: OUTPUT_PDF,
      format: "A4",
      width: "210mm",
      height: "297mm",
      printBackground: true /* renders all bg colors / images */,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      scale: 1,
      preferCSSPageSize: true /* honours @page { size: A4; } */,
    });

    const sizeKB = Math.round(fs.statSync(OUTPUT_PDF).size / 1024);
    console.log(`✅  PDF saved → ${OUTPUT_PDF}  (${sizeKB} KB)`);

    /* 8 ─ Copy to public folder */
    ensureDir(PUBLIC_DIR);
    const publicPdf = path.join(PUBLIC_DIR, `Abdelilah_Wajid_CV${langSuffix}.pdf`);
    fs.copyFileSync(OUTPUT_PDF, publicPdf);
    console.log(`📂  Copied → ${publicPdf}`);

    /* 9 ─ Also save _EN copy when generating the main (English) CV */
    if (!isAr && !isFr) {
      const enPdf = path.join(PUBLIC_DIR, "Abdelilah_Wajid_CV_EN.pdf");
      fs.copyFileSync(OUTPUT_PDF, enPdf);
      console.log(`📂  Copied → ${enPdf}`);
    }
  } finally {
    await browser.close();
  }
}

/* ── Entry point ─────────────────────────────────────────── */
generatePDF().catch((err) => {
  console.error("\n❌  PDF generation failed:");
  console.error(err.message);
  process.exit(1);
});
