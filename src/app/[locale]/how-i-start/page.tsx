/**
 * @file [locale]/how-i-start/page.tsx
 * @description Intake flow page. Locale from URL segment.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
import { isValidLocale, getAlternates } from "@/lib/i18n";
import { HowIStartClient } from "./HowIStartClient";

interface Props {
  params: Promise<{ locale: string }>;
}

const PAGE_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "How I Start",
    description:
      "A guided intake flow to clarify your problem, constraints, and the fastest way to start a focused collaboration.",
  },
  fr: {
    title: "Comment Je Démarre",
    description:
      "Un flow guidé pour clarifier un besoin, comprendre les contraintes, et démarrer une collaboration de manière claire.",
  },
  ar: {
    title: "كيف كنبدأ الخدمة",
    description:
      "مسار موجه باش نفهم الحاجة والقيود ونبداو التعاون بشكل واضح.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const locale = raw as Locale;

  const content = getContent(locale);
  const siteUrl = content.meta.siteUrl.replace(/\/$/, "");
  const { title, description } = PAGE_COPY[locale];
  const alt = getAlternates("how-i-start", siteUrl);

  return {
    title,
    description,
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    openGraph: {
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
      url: `${siteUrl}/${locale}/how-i-start`,
      images: [
        {
          url: "/opengraph-image",
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
      images: ["/twitter-image"],
    },
  };
}

export default async function HowIStartPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();

  return <HowIStartClient />;
}
