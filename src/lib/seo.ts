import { getContent } from "@/data/content";
import type { Locale, ProjectContent } from "@/data/content";
import {
  DEFAULT_LOCALE,
  resolveLocale as _resolveLocale,
  getMetadataLocale,
} from "@/lib/i18n";

// Re-export from centralized i18n for backward compatibility
export const resolveLocale = _resolveLocale;
export { getMetadataLocale };

export function getSiteUrl(locale: Locale = DEFAULT_LOCALE) {
  return getContent(locale).meta.siteUrl.replace(/\/$/, "");
}

/** Build an absolute URL. Now includes /{locale}/ prefix for SEO. */
export function absoluteUrl(path = "/", locale: Locale = DEFAULT_LOCALE) {
  const baseUrl = getSiteUrl(locale);
  const clean =
    path === "/" || !path ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}/${locale}${clean}`;
}

function getSocialLinks(locale: Locale = DEFAULT_LOCALE) {
  const content = getContent(locale);

  return Array.from(
    new Set([
      ...content.hero.avatar.socials.map((social) => social.href),
      ...content.contact.socials.map((social) => social.href),
    ]),
  );
}

export function buildWebsiteJsonLd(locale: Locale = DEFAULT_LOCALE) {
  const content = getContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.meta.ogSiteName,
    url: getSiteUrl(locale),
    description: content.meta.description,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: content.meta.author,
    },
    publisher: {
      "@type": "Organization",
      name: content.meta.ogSiteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico", locale),
        width: 32,
        height: 32,
      },
    },
  };
}

export function buildPersonJsonLd(locale: Locale = DEFAULT_LOCALE) {
  const content = getContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.meta.author,
    url: getSiteUrl(locale),
    image: absoluteUrl("/Abdelilah-Wajid.png", locale),
    jobTitle: "Product Engineer",
    description: content.meta.description,
    email: content.contact.email,
    sameAs: getSocialLinks(locale),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
    homeLocation: {
      "@type": "Place",
      name: "Marrakech, Morocco",
    },
    knowsAbout: [
      "Product engineering",
      "Operational systems",
      "Next.js",
      "React",
      "TypeScript",
      "System architecture",
      "Inventory systems",
      "Reporting systems",
      "Internal tools",
    ],
  };
}

export function buildHomepageJsonLd(locale: Locale = DEFAULT_LOCALE) {
  const content = getContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.meta.title,
    url: getSiteUrl(locale),
    description: content.meta.description,
    inLanguage: locale,
    about: {
      "@type": "Person",
      name: content.meta.author,
      jobTitle: "Product Engineer",
    },
    isPartOf: {
      "@type": "WebSite",
      name: content.meta.ogSiteName,
      url: getSiteUrl(locale),
    },
  };
}

export function buildCaseStudyJsonLd(
  project: ProjectContent,
  locale: Locale = DEFAULT_LOCALE,
) {
  const content = getContent(locale);
  const firstScreenshot = project.caseStudy?.screenshots[0]?.src;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.caseStudy?.headline ?? project.name,
    alternativeHeadline: project.name,
    description: project.caseStudy?.subtitle ?? project.desc,
    mainEntityOfPage: absoluteUrl(`/work/${project.slug}`, locale),
    url: absoluteUrl(`/work/${project.slug}`, locale),
    inLanguage: locale,
    articleSection: project.type,
    keywords: [...(project.caseStudy?.tags ?? []), ...project.highlights].join(
      ", ",
    ),
    author: {
      "@type": "Person",
      name: content.meta.author,
      url: getSiteUrl(locale),
    },
    publisher: {
      "@type": "Person",
      name: content.meta.author,
      url: getSiteUrl(locale),
    },
    isPartOf: {
      "@type": "WebSite",
      name: content.meta.ogSiteName,
      url: getSiteUrl(locale),
    },
    about: [project.type, ...(project.caseStudy?.tags ?? [])],
    image: firstScreenshot ? [absoluteUrl(firstScreenshot, locale)] : undefined,
  };
}
