/**
 * @file StepIntro.tsx
 * @description Step 1 — Mindset intro. Sets the tone for the qualification flow.
 * Displays a strong message in Darija about understanding before execution.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";

interface Props {
  onNext: () => void;
}

export function StepIntro({ onNext }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: isMobile ? 32 : 44,
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 22 : 28,
            lineHeight: 1.7,
            color: C.text,
            fontWeight: 500,
            direction: "rtl",
          }}
        >
          أغلب الناس كيجيو بطلب واضح…
          <br />
          ولكن غالبًا هاد الطلب{" "}
          <span style={{ color: C.cyan, fontStyle: "italic" }}>
            ماشي هو المشكل الحقيقي.
          </span>
        </p>

        <div
          style={{
            width: 40,
            height: 1,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
            margin: "28px auto",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 15 : 17,
            color: C.muted,
            lineHeight: 1.6,
            direction: "rtl",
          }}
        >
          كنبدأ بالفهم قبل التنفيذ.
        </p>
      </div>

      <button
        onClick={onNext}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          letterSpacing: 1.5,
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
        نبدا ←
      </button>
    </div>
  );
}
