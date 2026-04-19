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
      <a
        href="/Abdelilah_Wajid_CV.pdf"
        download
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 2,
          padding: "0 28px",
          height: 48,
          borderRadius: 8,
          background: "transparent",
          color: C.muted,
          border: `1px dashed ${C.border2}`,
          transition: "all .2s",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = C.green;
          e.currentTarget.style.color = C.green;
          e.currentTarget.style.borderStyle = "solid";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = C.border2;
          e.currentTarget.style.color = C.muted;
          e.currentTarget.style.borderStyle = "dashed";
          e.currentTarget.style.transform = "none";
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {locale === "fr" ? "TÉLÉCHARGER CV" : "DOWNLOAD CV"}
      </a>
    </div>
  );
}
