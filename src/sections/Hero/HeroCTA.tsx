/**
 * @file HeroCTA.tsx
 * @description Hero CTAs: SEE HOW I THINK ↓ and START A CONVERSATION buttons.
 * No internal state. Purely presentational.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/data/content";

export function HeroCTA() {
  const { C } = useThemeContext();
  const { locale } = useLocale();
  const content = getContent(locale);

  return (
    <div
      className="rv d6"
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() =>
          document
            .getElementById("work")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 2,
          padding: "0 32px",
          height: 48,
          borderRadius: 8,
          background: C.cyan,
          color: C.bg,
          fontWeight: 600,
          transition: "all .2s",
          cursor: "pointer",
          border: "none",
          boxShadow: `0 4px 14px ${C.cyan}25`,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 28px ${C.cyan}50`;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 14px ${C.cyan}25`;
          e.currentTarget.style.transform = "none";
        }}
      >
        {content.hero.cta.primary}
      </button>
      <button
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 2,
          padding: "0 32px",
          height: 48,
          borderRadius: 8,
          background: C.bg2,
          color: C.sub,
          border: `1px solid ${C.border2}`,
          transition: "all .2s",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = C.cyan;
          e.currentTarget.style.color = C.cyan;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = C.border2;
          e.currentTarget.style.color = C.sub;
          e.currentTarget.style.transform = "none";
        }}
      >
        {content.hero.cta.secondary}
      </button>
    </div>
  );
}
