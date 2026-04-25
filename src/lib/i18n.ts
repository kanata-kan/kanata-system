/**
 * @file i18n.ts
 * @description Single source of truth for internationalization config.
 * Every locale constant, validator, and helper lives here.
 * Import from "@/lib/i18n" — never hardcode locale lists elsewhere.
 */

import type { Locale } from "@/data/content/types";

/* ── Constants ── */
export const LOCALES: readonly Locale[] = ["en", "fr", "ar"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: readonly Locale[] = ["ar"] as const;

/* ── Validators ── */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

export function resolveLocale(value?: string | null): Locale {
  return isValidLocale(value) ? value : DEFAULT_LOCALE;
}

/* ── Direction ── */
export function isRtl(locale: Locale): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

export function getDir(locale: Locale): "rtl" | "ltr" {
  return isRtl(locale) ? "rtl" : "ltr";
}

/* ── Metadata helpers ── */
export function getMetadataLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: "en_US",
    fr: "fr_FR",
    ar: "ar_MA",
  };
  return map[locale];
}

/**
 * Build hreflang alternate links for SEO.
 * `path` is everything AFTER the locale segment (e.g. "" for homepage, "work/meditrans").
 */
export function getAlternates(path: string, siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";

  return {
    canonical: `${base}/${DEFAULT_LOCALE}${suffix}`,
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${base}/${l}${suffix}`]),
    ) as Record<Locale, string>,
  };
}

/**
 * Build an absolute URL for a given locale.
 * Usage: absoluteLocalizedUrl("en", "/work/meditrans", "https://example.com")
 */
export function absoluteLocalizedUrl(
  locale: Locale,
  path: string = "",
  siteUrl: string,
): string {
  const base = siteUrl.replace(/\/$/, "");
  const suffix = path && path !== "/" ? `/${path.replace(/^\//, "")}` : "";
  return `${base}/${locale}${suffix}`;
}

/** Strip the locale prefix from a pathname: "/en/work/x" → "/work/x" */
export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(?:en|fr|ar)(\/.*)?$/);
  return match ? match[1] || "/" : pathname;
}

/** Replace the locale segment in a pathname: ("/en/work/x", "ar") → "/ar/work/x" */
export function switchLocaleInPath(pathname: string, newLocale: Locale): string {
  const rest = stripLocalePrefix(pathname);
  return `/${newLocale}${rest === "/" ? "" : rest}`;
}
