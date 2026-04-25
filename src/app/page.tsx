/**
 * @file page.tsx
 * @description Homepage. Overrides only title/description — all OG/Twitter
 *              structure (images, card, siteName, locale…) is inherited from layout.
 */

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent } from "@/data/content";
import { buildHomepageJsonLd, getSiteUrl, resolveLocale } from "@/lib/seo";
import { Hero } from "@/sections/Hero";
import { TechStrip } from "@/sections/TechStrip";
import { Work } from "@/sections/Work";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale((await cookies()).get("locale")?.value);
  const content = getContent(locale);
  // ✅ نفس الدالة المستخدمة في layout — مصدر واحد للـ canonical
  const siteUrl = getSiteUrl(locale);

  return {
    // ✅ absolute يكسر الـ template في layout بشكل صحيح للـ homepage
    title: {
      absolute: content.meta.title,
    },
    description: content.meta.description,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      // ✅ title + description فقط
      // type / siteName / locale / url / images كلها موروثة من layout
      title: content.meta.title,
      description: content.meta.description,
    },
    twitter: {
      // ✅ title + description فقط
      // card + images موروثتان من layout
      title: content.meta.title,
      description: content.meta.description,
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
