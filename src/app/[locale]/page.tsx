/**
 * @file [locale]/page.tsx
 * @description Homepage. Locale comes from the URL segment.
 * Overrides only title/description — OG/Twitter inherited from layout.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
import { buildHomepageJsonLd } from "@/lib/seo";
import { isValidLocale, getAlternates } from "@/lib/i18n";
import { Hero } from "@/sections/Hero";
import { TechStrip } from "@/sections/TechStrip";
import { Work } from "@/sections/Work";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const locale = raw as Locale;

  const content = getContent(locale);
  const siteUrl = content.meta.siteUrl.replace(/\/$/, "");
  const alt = getAlternates("", siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: content.meta.title },
    description: content.meta.description,
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
    },
    twitter: {
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <main id="main-content">
      <JsonLd data={buildHomepageJsonLd(locale)} />
      <Hero />
      <TechStrip />
      <Work />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
