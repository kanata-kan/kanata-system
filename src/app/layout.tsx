/**
 * @file layout.tsx
 * @description Root server layout. Owns metadata and mounts the client app shell.
 */

import type { Metadata } from "next";
import { getContent } from "@/data/content";
import { AppShell } from "./AppShell";
import "./globals.css";

const siteContent = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.meta.siteUrl),
  title: siteContent.meta.title,
  description: siteContent.meta.description,
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
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    siteName: siteContent.meta.ogSiteName,
    url: siteContent.meta.siteUrl,
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
    creator: siteContent.meta.twitterHandle,
    site: siteContent.meta.twitterHandle,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
