/**
 * @file [locale]/work/[slug]/page.tsx
 * @description Case study page. Locale from URL segment.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
import { buildCaseStudyJsonLd } from "@/lib/seo";
import { LOCALES, isValidLocale, getAlternates } from "@/lib/i18n";
import { CaseStudyPage } from "@/sections/Work/CaseStudyPage";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  // Generate all locale × slug combinations
  return LOCALES.flatMap((locale) =>
    getProjects(locale)
      .filter((p) => p.caseStudy)
      .map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) return {};
  const locale = raw as Locale;

  const copy = getCaseStudyCopy(locale);
  const content = getContent(locale);
  const siteUrl = content.meta.siteUrl.replace(/\/$/, "");

  const project =
    getProjectBySlug(slug, locale) ?? getProjectBySlug(slug, "en");

  if (!project || !project.caseStudy) {
    return {
      metadataBase: new URL(siteUrl),
      title: copy.meta.fallbackTitle,
      robots: { index: false, follow: false },
    };
  }

  const title = copy.meta.title(project.name);
  const description = copy.meta.description({
    name: project.name,
    subtitle: project.caseStudy.subtitle,
    desc: project.desc,
  });
  const alt = getAlternates(`work/${slug}`, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [...project.caseStudy.tags, project.type, ...project.highlights],
    authors: [{ name: content.meta.author }],
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    openGraph: {
      type: "article",
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
      url: `${siteUrl}/${locale}/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
    },
  };
}

export default async function WorkCaseStudy({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;

  const project =
    getProjectBySlug(slug, locale) ?? getProjectBySlug(slug, "en");

  if (!project || !project.caseStudy) {
    notFound();
  }

  const projectWithStudy = project as typeof project & {
    caseStudy: NonNullable<typeof project.caseStudy>;
  };

  return (
    <>
      <JsonLd data={buildCaseStudyJsonLd(projectWithStudy, locale)} />
      <CaseStudyPage project={projectWithStudy} />
    </>
  );
}
