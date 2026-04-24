/**
 * @file layout.tsx
 * @description Root server layout. Owns metadata and mounts the client app shell.
 */

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  getMetadataLocale,
  getSiteUrl,
  resolveLocale,
} from "@/lib/seo";
import { AppShell } from "./AppShell";
import "./globals.css";
import { Outfit } from "next/font/google";
import { Inter } from "next/font/google";

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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("locale")?.value);
  const siteContent = getContent(locale);
  const siteUrl = getSiteUrl(locale);

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteContent.meta.ogSiteName,
    title: {
      default: siteContent.meta.title,
      template: `%s | ${siteContent.meta.ogSiteName}`,
    },
    description: siteContent.meta.description,
    authors: [{ name: siteContent.meta.author, url: siteUrl }],
    keywords: siteContent.meta.keywords,
    category: "technology",
    alternates: {
      canonical: siteUrl,
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
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      title: siteContent.meta.title,
      description: siteContent.meta.description,
      siteName: siteContent.meta.ogSiteName,
      url: siteUrl,
      locale: getMetadataLocale(locale),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteContent.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteContent.meta.title,
      description: siteContent.meta.description,
      ...(siteContent.meta.twitterHandle
        ? {
            creator: siteContent.meta.twitterHandle,
            site: siteContent.meta.twitterHandle,
          }
        : {}),
      images: ["/twitter-image"],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale: Locale = resolveLocale(cookieStore.get("locale")?.value);
  const dir = locale === "ar" ? "rtl" : "ltr";
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
      className={`${outfit.variable} ${inter.variable}`}
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
