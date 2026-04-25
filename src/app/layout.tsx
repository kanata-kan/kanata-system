/**
 * @file layout.tsx
 * @description Thin root layout — passes through to [locale]/layout.tsx.
 * All HTML structure, metadata, fonts, and providers live in the locale layout.
 * This file exists only because Next.js requires app/layout.tsx when
 * special route files (robots.ts, sitemap.ts, opengraph-image.tsx) sit here.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
