"use client";

import { getTechStrip } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";

function containsArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

/* ── Minimal tech-themed SVG icons (10×10, currentColor) ── */
const ICONS: React.ReactNode[] = [
  /* code brackets */
  <svg key="i0" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M3.5 2L1 5l2.5 3M6.5 2L9 5l-2.5 3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  /* bolt */
  <svg key="i1" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M6 1L3 5.5h2.5L4.5 9 8 4.5H5.5L6 1z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>,
  /* diamond */
  <svg key="i2" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M5 1l4 4-4 4-4-4z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>,
  /* dot grid */
  <svg key="i3" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <circle cx="3" cy="3" r="1" />
    <circle cx="7" cy="3" r="1" />
    <circle cx="3" cy="7" r="1" />
    <circle cx="7" cy="7" r="1" />
  </svg>,
  /* hexagon */
  <svg key="i4" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M5 1l3.5 2v4L5 9 1.5 7V3z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>,
];

export function TechStrip() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const techStrip = getTechStrip(locale);
  const isArabic = locale === "ar";

  // Use 4 copies to guarantee the strip fills wide viewports
  // even for shorter Arabic text (less padding + no letter-spacing).
  // translateX(-25%) scrolls exactly one copy → seamless loop.
  const COPIES = 4;
  const items = Array.from({ length: COPIES }, () => techStrip).flat();

  return (
    <div
      style={{
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "13px 0",
        overflow: "hidden",
        background: C.bg2,
        transition: "background .35s",
        position: "relative",
      }}
    >
      {/* Gradient fade — left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: 48,
          background: `linear-gradient(to right, ${C.bg2}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Gradient fade — right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: 48,
          background: `linear-gradient(to left, ${C.bg2}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Container variant="wide">
        <div
          dir="ltr"
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              width: "max-content",
              minWidth: "100%",
              animation: "techStripMarquee 30s linear infinite",
              willChange: "transform",
            }}
          >
            {items.map((text, index) => {
              const hasArabic = containsArabic(text);
              const icon = ICONS[index % ICONS.length];

              return (
                <span
                  key={`${text}-${index}`}
                  dir={isArabic && hasArabic ? "rtl" : "ltr"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    flex: "0 0 auto",
                    fontFamily:
                      isArabic && hasArabic
                        ? "var(--font-arabic)"
                        : "var(--font-mono)",
                    fontSize: hasArabic ? 11 : 10,
                    fontWeight: hasArabic ? 600 : 500,
                    letterSpacing: hasArabic ? 0 : 2.5,
                    color: index % 4 === 0 ? C.cyan : C.muted,
                    padding: isArabic ? "0 22px" : "0 28px",
                    textTransform: hasArabic ? "none" : "uppercase",
                    borderInlineEnd: `1px solid ${C.line}`,
                    whiteSpace: "nowrap",
                    transition: "color .35s",
                    unicodeBidi: "isolate",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      flexShrink: 0,
                      color: C.cyan,
                      opacity: 0.45,
                    }}
                  >
                    {icon}
                  </span>
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
