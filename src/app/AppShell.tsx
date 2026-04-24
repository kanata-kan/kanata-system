"use client";

import { useTheme, ThemeContext } from "@/hooks/useTheme";
import { useResponsive, ResponsiveContext } from "@/hooks/useResponsive";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LocaleProvider } from "@/hooks/useLocale";
import type { Locale } from "@/data/content/types";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

interface AppShellProps {
  children: React.ReactNode;
  initialLocale: Locale;
  initialDark: boolean;
  initialViewportWidth: number;
}

export function AppShell({
  children,
  initialLocale,
  initialDark,
  initialViewportWidth,
}: AppShellProps) {
  const { dark, toggle, C } = useTheme(initialDark);
  const responsive = useResponsive(initialViewportWidth);

  useScrollReveal();

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeContext.Provider value={{ dark, toggle, C }}>
        <ResponsiveContext.Provider value={responsive}>
          <div
            style={{
              minHeight: "100vh",
              width: "100%",
              background: C.bg,
              color: C.text,
              overflowX: "hidden",
              transition: "background .35s, color .35s",

              // ✅ FIX: بدل hardcode
              paddingTop: "var(--navbar-height)",
            }}
          >
            <Nav
              C={C}
              dark={dark}
              onToggle={toggle}
              isMobile={responsive.isMobile}
            />

            {children}

            <Footer C={C} isMobile={responsive.isMobile} />
            <ScrollToTop C={C} />
          </div>
        </ResponsiveContext.Provider>
      </ThemeContext.Provider>
    </LocaleProvider>
  );
}
