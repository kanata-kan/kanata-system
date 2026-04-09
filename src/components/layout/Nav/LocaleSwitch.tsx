/**
 * @file LocaleSwitch.tsx
 * @description Language switcher component for Nav (EN/FR).
 * Matches ThemeToggle style and behavior.
 */

"use client";

import { useLocale } from "@/hooks/useLocale";
import type { Theme } from "@/tokens/themes";

interface Props {
  C: Theme;
}

export function LocaleSwitch({ C }: Props) {
  const { locale, setLocale } = useLocale();

  const toggle = () => {
    setLocale(locale === "en" ? "fr" : "en");
  };

  return (
    <button
      aria-label={`Switch language. Current: ${locale === "en" ? "English" : "Français"}`}
      onClick={toggle}
      style={{
        padding: "6px 12px",
        borderRadius: 8,
        border: `1px solid ${C.line}`,
        background: C.bg2,
        color: C.text,
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        letterSpacing: 1,
        transition: "all .25s",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = C.bg3;
        e.currentTarget.style.borderColor = C.cyan;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = C.bg2;
        e.currentTarget.style.borderColor = C.line;
      }}
    >
      <span style={{ opacity: 0.6 }}>EN</span>
      <div
        style={{
          width: 20,
          height: 2,
          background: locale === "en" ? C.cyan : C.faint,
          borderRadius: 1,
          transition: "all .25s",
        }}
      />
      <span style={{ opacity: locale === "fr" ? 1 : 0.6 }}>FR</span>
    </button>
  );
}
