"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { getContent } from "@/data/content";

export function HeroCTA() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const content = getContent(locale);

  const base = {
    fontFamily: "var(--font-mono)",
    letterSpacing: isMobile ? 1.2 : 2,
    borderRadius: 8,
    cursor: "pointer",
    transition: "all .2s",
    border: "none",
    // mobile: full-width + taller touch target
    ...(isMobile && {
      width: "100%",
      justifyContent: "center",
    }),
  } as React.CSSProperties;

  return (
    <div
      className="rv d6"
      style={{
        display: "flex",
        gap: isMobile ? 12 : 12,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "flex-start",
      }}
    >
      {/* Primary — See work */}
      <button
        onClick={() =>
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          ...base,
          fontSize: isMobile ? 12 : 11,
          padding: isMobile ? "0 24px" : "0 32px",
          height: isMobile ? 52 : 48,
          background: C.cyan,
          color: C.bg,
          fontWeight: 700,
          boxShadow: `0 4px 14px ${C.cyan}25`,
          display: "flex",
          alignItems: "center",
          gap: 8,
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {/* Secondary — Contact */}
      <button
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          ...base,
          fontSize: isMobile ? 12 : 11,
          padding: isMobile ? "0 24px" : "0 32px",
          height: isMobile ? 52 : 48,
          background: C.bg2,
          color: C.sub,
          border: `1px solid ${C.border2}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {content.hero.cta.secondary}
      </button>

      {/* CV download */}
      <a
        href={
          locale === "ar"
            ? "/Abdelilah_Wajid_CV_AR.pdf"
            : locale === "fr"
              ? "/Abdelilah_Wajid_CV_FR.pdf"
              : "/Abdelilah_Wajid_CV_EN.pdf"
        }
        download
        style={{
          ...base,
          fontSize: isMobile ? 12 : 11,
          padding: isMobile ? "0 24px" : "0 28px",
          height: isMobile ? 52 : 48,
          background: "transparent",
          color: C.muted,
          border: `1px dashed ${C.border2}`,
          display: "flex",
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {locale === "ar"
          ? "تحميل CV"
          : locale === "fr"
            ? "TÉLÉCHARGER CV"
            : "DOWNLOAD CV"}
      </a>
    </div>
  );
}
