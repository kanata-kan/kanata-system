import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/data/content";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { buildCaseStudyJsonLd, resolveLocale } from "@/lib/seo";
import { CaseStudyPage } from "@/sections/Work/CaseStudyPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects("en")
    .filter((project) => project.caseStudy)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await cookies()).get("locale")?.value);
  const { slug } = await params;
  const content = getContent(locale);
  const siteUrl = content.meta.siteUrl;

  const project =
    getProjectBySlug(slug, locale) ?? getProjectBySlug(slug, "en");

  if (!project || !project.caseStudy) {
    return {
      title: "Case Study",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `How I Built ${project.name} — A Real System Case Study`;

  const description = `Case study: ${project.name}. ${
    project.caseStudy.subtitle || project.desc
  }. Built to solve real operational problems.`;

  const firstScreenshot = project.caseStudy.screenshots[0]?.src;

  return {
    title,
    description,
    keywords: [...project.caseStudy.tags, project.type, ...project.highlights],
    authors: [{ name: content.meta.author }],

    alternates: {
      canonical: `${siteUrl}/work/${project.slug}`,
    },

    openGraph: {
      type: "article",
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
      url: `${siteUrl}/work/${project.slug}`,
      images: [
        {
          url: firstScreenshot || "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
      images: [firstScreenshot || "/twitter-image"],
    },
  };
}

export default async function WorkCaseStudy({ params }: Props) {
  const locale = resolveLocale((await cookies()).get("locale")?.value);
  const { slug } = await params;

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
