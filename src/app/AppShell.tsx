"use client";

import { useTheme, ThemeContext } from "@/hooks/useTheme";
import { useResponsive, ResponsiveContext } from "@/hooks/useResponsive";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LocaleProvider } from "@/hooks/useLocale";
import type { Locale } from "@/data/content/types";
import { Nav } from "@/components/layout/Nav";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { IntroSplash } from "@/components/ui/IntroSplash";
import dynamic from "next/dynamic";
const PWAInstallPromptDynamic = dynamic(
  () =>
    import("@/components/pwa/PWAInstallPrompt").then((m) => m.PWAInstallPrompt),
  { ssr: false },
);

interface AppShellProps {
  children: React.ReactNode;
  initialLocale: Locale;
  initialDark: boolean;
  initialViewportWidth: number;
  initialIntroSeen: boolean;
}

export function AppShell({
  children,
  initialLocale,
  initialDark,
  initialViewportWidth,
  initialIntroSeen,
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
              background: "var(--t-bg)",
              color: "var(--t-text)",
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
            <PWAInstallPromptDynamic />
            <ScrollToTop />
            <IntroSplash initialSeen={initialIntroSeen} />
          </div>
        </ResponsiveContext.Provider>
      </ThemeContext.Provider>
    </LocaleProvider>
  );
}
