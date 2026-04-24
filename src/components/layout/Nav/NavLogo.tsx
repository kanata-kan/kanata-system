/**
 * @file NavLogo.tsx
 * @description Brand logo component using the new AWLogo identity.
 * Uses the unified brand system with gradient mark and wordmark.
 */

import type { Theme } from "@/tokens/themes";
import { useLocale } from "@/hooks/useLocale";
import { AWLogo } from "@/components/brand";

interface NavLogoProps {
  C: Theme;
  isMobile: boolean;
  onNavigate: (id: string) => void;
}

export function NavLogo({ C, isMobile, onNavigate }: NavLogoProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <button
      type="button"
      onClick={() => onNavigate("top")}
      aria-label="Go to top of page"
      className="nav-logo-button"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: isArabic ? "row-reverse" : "row",
        gap: 12,
        flexShrink: 0,
        cursor: "pointer",
        border: "none",
        background: "transparent",
        padding: 0,
      }}
    >
      <AWLogo
        size={isMobile ? "xs" : "sm"}
        variant={isMobile ? "mark-only" : "horizontal"}
        forceTheme={C.bg === "#0e1117" ? "dark" : "light"}
        dir={isArabic ? "rtl" : "ltr"}
      />
    </button>
  );
}
