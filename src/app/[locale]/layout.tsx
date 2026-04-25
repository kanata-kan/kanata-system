/**
 * @file [locale]/layout.tsx
 * @description Per-locale root layout. Owns <html lang dir>, metadata with
 * hreflang alternates, structured data, fonts, and the client AppShell.
 * Locale comes from the URL segment — no cookie parsing needed.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { Outfit, Inter } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import {
  LOCALES,
  isValidLocale,
  getDir,
  getMetadataLocale,
  getAlternates,
} from "@/lib/i18n";
import { AppShell } from "../AppShell";
import "../globals.css";

/* ── Fonts ── */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

/* ── Static params — tell Next.js which locales to pre-render ── */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* ── Metadata ── */
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;

  const content = getContent(locale);
  const siteUrl = content.meta.siteUrl.replace(/\/$/, "");
  const alt = getAlternates("", siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    applicationName: content.meta.ogSiteName,
    title: {
      default: content.meta.title,
      template: `%s | ${content.meta.ogSiteName}`,
    },
    description: content.meta.description,
    authors: [{ name: content.meta.author, url: siteUrl }],
    keywords: content.meta.keywords,
    category: "technology",
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      title: content.meta.title,
      description: content.meta.description,
      siteName: content.meta.ogSiteName,
      url: `${siteUrl}/${locale}`,
      locale: getMetadataLocale(locale),
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
      ...(content.meta.twitterHandle
        ? {
            creator: content.meta.twitterHandle,
            site: content.meta.twitterHandle,
          }
        : {}),
      images: ["/twitter-image"],
    },
  };
}

/* ── Layout Component ── */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dir = getDir(locale);

  // Theme + viewport hints (same logic as before)
  const cookieStore = await cookies();
  const headerStore = await headers();
  const themeCookie = cookieStore.get("portfolio-theme")?.value;
  const initialDark = themeCookie !== "light";
  const viewportWidthHint = Number(headerStore.get("viewport-width") ?? "");
  const mobileHint = headerStore.get("sec-ch-ua-mobile");
  const userAgent = headerStore.get("user-agent") ?? "";
  const isLikelyMobile =
    mobileHint === "?1" ||
    /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(userAgent);
  const initialViewportWidth =
    Number.isFinite(viewportWidthHint) && viewportWidthHint > 0
      ? viewportWidthHint
      : isLikelyMobile
        ? 390
        : 1280;

  const structuredData = [
    buildWebsiteJsonLd(locale),
    buildPersonJsonLd(locale),
  ];

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable} ${notoArabic.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={structuredData} />
        <AppShell
          initialLocale={locale}
          initialDark={initialDark}
          initialViewportWidth={initialViewportWidth}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
