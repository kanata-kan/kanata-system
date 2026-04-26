/**
 * @file StepTiming.tsx
 * @description Step 5 — Timing selection. Required selection field.
 */
"use client";

import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { StepProps } from "./types";

export function StepTiming({
  onNext,
  onBack,
  formData,
  setField,
  flow,
  isRtl,
}: StepProps) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [error, setError] = useState("");
  const dir = isRtl ? "rtl" : "ltr";
  const c = flow.timing;

  const handleSelect = (timing: string) => {
    setField("timing", timing);
    setError("");
  };

  const handleNext = () => {
    if (!formData.timing) {
      setError(c.error);
      return;
    }
    onNext();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 28 : 36,
        maxWidth: 520,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 20 : 26,
            color: C.text,
            fontWeight: 500,
            lineHeight: 1.5,
            direction: dir,
            marginBottom: 8,
          }}
        >
          {c.question}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.faint,
            letterSpacing: 1.5,
          }}
        >
          {flow.nav.stepOf(5, 7)}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {c.options.map((timing) => {
          const selected = formData.timing === timing;
          return (
            <button
              key={timing}
              onClick={() => handleSelect(timing)}
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                border: `1px solid ${selected ? C.cyan : C.line}`,
                background: selected ? `${C.cyan}12` : C.bg2,
                color: selected ? C.cyan : C.sub,
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? 15 : 16,
                textAlign: isRtl ? "right" : "left",
                direction: dir,
                cursor: "pointer",
                transition: "all .2s",
                outline: "none",
              }}
              onMouseOver={(e) => {
                if (!selected) {
                  e.currentTarget.style.borderColor = C.border2;
                  e.currentTarget.style.background = C.bg3;
                }
              }}
              onMouseOut={(e) => {
                if (!selected) {
                  e.currentTarget.style.borderColor = C.line;
                  e.currentTarget.style.background = C.bg2;
                }
              }}
            >
              {timing}
            </button>
          );
        })}
      </div>

      {error && (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: C.amber,
            direction: dir,
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{ display: "flex", gap: 12, justifyContent: "space-between" }}
      >
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
          onClick={handleNext}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: isRtl ? 0 : 1,
            padding: "12px 36px",
            borderRadius: 8,
            background: C.cyan,
            color: C.bg,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all .2s",
            marginInlineStart: "auto",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {flow.nav.next}
        </button>
      </div>
    </div>
  );
}
