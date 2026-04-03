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
      className={`${playfair.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <head>
        <title>Abdelilah Wajid · Full-Stack Engineer</title>
        <meta
          name="description"
          content="Portfolio of Abdelilah Wajid — Full-Stack Engineer based in Marrakech, Morocco."
        />
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
          </ResponsiveContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
