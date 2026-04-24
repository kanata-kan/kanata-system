import type { Metadata } from "next";
import { cookies } from "next/headers";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/data/content";
import { buildHomepageJsonLd, resolveLocale } from "@/lib/seo";
import { Hero } from "@/sections/Hero";
import { TechStrip } from "@/sections/TechStrip";
import { Work } from "@/sections/Work";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale((await cookies()).get("locale")?.value);
  const content = getContent(locale);

  return {
    title: "Portfolio",
    description: content.meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: "/",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/twitter-image"],
    },
  };
}

export default async function Home() {
  const locale = resolveLocale((await cookies()).get("locale")?.value);

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
