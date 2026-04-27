/**
 * @file StepIntro.tsx
 * @description Step 1 — Mindset intro. Sets the tone for the qualification flow.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { FlowContent } from "@/data/content/types";

interface Props {
  onNext: () => void;
  flow: FlowContent;
  isRtl: boolean;
}

export function StepIntro({ onNext, flow, isRtl }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const dir = isRtl ? "rtl" : "ltr";
  const c = flow.intro;

  const parts = c.headline.split("\n");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: isMobile ? 36 : 48,
        minHeight: "65vh",
      }}
    >
      {/* Top badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: 40,
          background: `${C.cyan}10`,
          border: `1px solid ${C.cyan}20`,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.cyan,
            animation: "glow 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.cyan,
            letterSpacing: isRtl ? 0 : 1.5,
            fontWeight: 500,
          }}
        >
          HOW I START
        </span>
      </div>

      <div style={{ maxWidth: 580 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 24 : 32,
            lineHeight: 1.6,
            color: C.text,
            fontWeight: 500,
            direction: dir,
            letterSpacing: -0.3,
          }}
        >
          {parts[0]}
          {parts[1] && (
            <>
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                {parts[1]}
              </span>
            </>
          )}
        </p>

        <div
          style={{
            width: 48,
            height: 1.5,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
            margin: isMobile ? "24px auto" : "32px auto",
            borderRadius: 1,
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 15 : 17,
            color: C.muted,
            lineHeight: 1.7,
            direction: dir,
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          {c.subtext}
        </p>
      </div>

      <button
        onClick={onNext}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          letterSpacing: isRtl ? 0 : 1.5,
          padding: "14px 52px",
          borderRadius: 10,
          background: `linear-gradient(135deg, ${C.cyan}, ${C.cyan}DD)`,
          color: C.bg,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          transition: "all .25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: `0 4px 16px ${C.cyan}25`,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 12px 32px ${C.cyan}35`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 16px ${C.cyan}25`;
        }}
      >
        {c.cta}
      </button>
    </div>
  );
}
