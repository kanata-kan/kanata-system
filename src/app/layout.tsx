/**
 * @file layout.tsx
 * @description Root layout : applique les fonts, initialise le thème
 * et le contexte responsive. Monte useScrollReveal une seule fois.
 * C'est le seul endroit où useTheme, useResponsive et useScrollReveal sont appelés.
 */
"use client";

import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";
import { useTheme, ThemeContext } from "@/hooks/useTheme";
import { useResponsive, ResponsiveContext } from "@/hooks/useResponsive";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Nav } from "@/components/layout/Nav/index";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { content } from "@/data/content";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dark, toggle, C } = useTheme();
  const responsive = useResponsive();
  useScrollReveal();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <head>
        {/* ── Basic SEO ── */}
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta name="author" content={content.meta.author} />
        <meta name="keywords" content={content.meta.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={content.meta.siteUrl} />

        {/* ── Favicon ── */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />

        {/* ── Open Graph (Facebook / WhatsApp / LinkedIn) ── */}
        <meta property="og:type" content={content.meta.ogType} />
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:description" content={content.meta.description} />
        <meta property="og:site_name" content={content.meta.ogSiteName} />
        <meta property="og:url" content={content.meta.siteUrl} />
        <meta
          property="og:image"
          content={`${content.meta.siteUrl}/opengraph-image`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={content.meta.title} />
        <meta property="og:locale" content="en_US" />

        {/* ── Twitter Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.meta.title} />
        <meta name="twitter:description" content={content.meta.description} />
        <meta name="twitter:site" content={content.meta.twitterHandle} />
        <meta name="twitter:creator" content={content.meta.twitterHandle} />
        <meta
          name="twitter:image"
          content={`${content.meta.siteUrl}/twitter-image`}
        />
        <meta name="twitter:image:alt" content={content.meta.title} />

        {/* ── Theme / Mobile ── */}
        <meta name="theme-color" content="#0D1117" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          background: C.bg,
          color: C.text,
          transition: "background .35s, color .35s",
        }}
      >
        <ThemeContext.Provider value={{ dark, toggle, C }}>
          <ResponsiveContext.Provider value={responsive}>
            <Nav
              C={C}
              dark={dark}
              onToggle={toggle}
              isMobile={responsive.isMobile}
            />
            {children}
            <Footer C={C} isMobile={responsive.isMobile} />
            <ScrollToTop C={C} />
          </ResponsiveContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
