/**
 * @file layout.tsx
 * @description Root server layout. Owns metadata and mounts the client app shell.
 */

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getContent } from "@/data/content";
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
  const locale = cookieStore.get("locale")?.value || "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
