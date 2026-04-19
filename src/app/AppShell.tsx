"use client";

import { useTheme, ThemeContext } from "@/hooks/useTheme";
import { useResponsive, ResponsiveContext } from "@/hooks/useResponsive";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LocaleProvider } from "@/hooks/useLocale";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { dark, toggle, C } = useTheme();
  const responsive = useResponsive();
  useScrollReveal();

  return (
    <LocaleProvider>
      <ThemeContext.Provider value={{ dark, toggle, C }}>
        <ResponsiveContext.Provider value={responsive}>
          <div
            style={{
              minHeight: "100vh",
              background: C.bg,
              color: C.text,
              transition: "background .35s, color .35s",
paddingTop: 64,
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
