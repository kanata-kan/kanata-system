import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { getSiteUrl } from "@/lib/seo";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/data/content/types";

/**
 * Build hreflang alternates map for a given path.
 * Path is everything after /{locale} (e.g. "" for homepage, "/work/meditrans").
 */
function alternates(path: string) {
  const base = getSiteUrl(DEFAULT_LOCALE);
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";
  return {
    languages: Object.fromEntries(
      LOCALES.map((l: Locale) => [l, `${base}/${l}${suffix}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = getSiteUrl(DEFAULT_LOCALE);
  const caseStudies = getProjects("en").filter((p) => p.caseStudy);

  const entries: MetadataRoute.Sitemap = [];

  // Homepage per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
      alternates: alternates(""),
    });
  }

  // How-I-Start per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${base}/${locale}/how-i-start`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates("how-i-start"),
    });
  }

  // Case studies per locale
  for (const project of caseStudies) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${base}/${locale}/work/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: alternates(`work/${project.slug}`),
      });
    }
  }

  return entries;
}
