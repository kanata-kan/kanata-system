/**
 * @file layout.tsx
 * @description Root server layout. Owns metadata and mounts the client app shell.
 */

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getContent } from "@/data/content";
import type { Locale } from "@/data/content";
import { AppShell } from "./AppShell";
import "./globals.css";

const siteContent = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.meta.siteUrl),
  title: "Product Engineer Portfolio — Real Systems in Production",
  description:
    "Real-world systems I designed and built — from operational chaos to structured, scalable platforms. Includes production projects, case studies, and technical breakdowns (inventory, pricing, reporting, internal tools).",
  authors: [{ name: siteContent.meta.author }],
  keywords: siteContent.meta.keywords,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteContent.meta.siteUrl,
  },
  openGraph: {
    type: siteContent.meta.ogType === "website" ? "website" : "website",
    title: "Product Engineer Portfolio — Real Systems in Production",
    description:
      "Real-world systems I designed and built — from operational chaos to structured, scalable platforms. Includes production projects, case studies, and technical breakdowns (inventory, pricing, reporting, internal tools).",
    siteName: siteContent.meta.ogSiteName,
    url: siteContent.meta.siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Product Engineer Portfolio — Real Systems in Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Engineer Portfolio — Real Systems in Production",
    description:
      "Real-world systems I designed and built — from operational chaos to structured, scalable platforms. Includes production projects, case studies, and technical breakdowns (inventory, pricing, reporting, internal tools).",
    creator: siteContent.meta.twitterHandle,
    site: siteContent.meta.twitterHandle,
    images: ["/twitter-image"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale: Locale =
    localeCookie === "fr" || localeCookie === "ar" || localeCookie === "en"
      ? localeCookie
      : "en";
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

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
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
