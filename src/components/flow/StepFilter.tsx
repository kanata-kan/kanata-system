/**
 * @file StepFilter.tsx
 * @description Step 6 — Filter message. Intentional friction point.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { FlowContent } from "@/data/content/types";

interface Props {
  onNext: () => void;
  onBack?: () => void;
  flow: FlowContent;
  isRtl: boolean;
}

export function StepFilter({ onNext, onBack, flow, isRtl }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const dir = isRtl ? "rtl" : "ltr";
  const c = flow.filter;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: isMobile ? 32 : 44,
        minHeight: "50vh",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 20 : 26,
            lineHeight: 1.8,
            color: C.text,
            fontWeight: 500,
            direction: dir,
          }}
        >
          {c.headline}
        </p>
        <div
          style={{
            width: 40,
            height: 1,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
            margin: "24px auto",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 15 : 17,
            color: C.muted,
            lineHeight: 1.7,
            direction: dir,
          }}
        >
          {c.subtext}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: isRtl ? 0 : 1,
              padding: "12px 28px",
              borderRadius: 8,
              background: "transparent",
              color: C.muted,
              border: `1px solid ${C.line}`,
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.border2;
              e.currentTarget.style.color = C.sub;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = C.line;
              e.currentTarget.style.color = C.muted;
            }}
          >
            {flow.nav.back}
          </button>
        )}
        <button
          onClick={onNext}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: isRtl ? 0 : 1.5,
            padding: "14px 48px",
            borderRadius: 8,
            background: C.cyan,
            color: C.bg,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${C.cyan}40`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {c.cta}
        </button>
      </div>
    </div>
  );
}
