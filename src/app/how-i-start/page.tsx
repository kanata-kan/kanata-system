import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/data/content";
import { resolveLocale } from "@/lib/seo";
import { HowIStartClient } from "./HowIStartClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale((await cookies()).get("locale")?.value);
  const content = getContent(locale);
  const title =
    locale === "fr"
      ? "Comment Je Demarre"
      : locale === "ar"
        ? "كيف كنبدأ الخدمة"
        : "How I Start";
  const description =
    locale === "fr"
      ? "Un flow guide pour clarifier un besoin, comprendre les contraintes, et demarrer une collaboration de maniere claire."
      : locale === "ar"
        ? "مسار موجه باش نفهم الحاجة والقيود ونبداو التعاون بشكل واضح."
        : "A guided intake flow to clarify your problem, constraints, and the fastest way to start a focused collaboration.";

  return {
    title,
    description,
    alternates: {
      canonical: "/how-i-start",
    },
    openGraph: {
      title: `${title} | ${content.meta.ogSiteName}`,
      description,
      url: "/how-i-start",
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

export default function HowIStartPage() {
  return <HowIStartClient />;
}
