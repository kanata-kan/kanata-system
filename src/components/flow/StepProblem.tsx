/**
 * @file StepProblem.tsx
 * @description Step 3 — Problem description. User describes where they feel
 * the problem is. Required textarea field.
 */
"use client";

import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { StepProps } from "./types";

export function StepProblem({ onNext, onBack, formData, setField }: StepProps) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.problem.trim()) {
      setError("هاد السؤال ضروري باش نفهم الوضعية");
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
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? 20 : 26,
            color: C.text,
            fontWeight: 500,
            lineHeight: 1.5,
            direction: "rtl",
            marginBottom: 8,
          }}
        >
          فين كتحس كاين المشكل دابا؟
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.faint,
            letterSpacing: 1.5,
          }}
        >
          STEP 3 / 7
        </p>
      </div>

      <div>
        <textarea
          value={formData.problem}
          onChange={(e) => {
            setField("problem", e.target.value);
            if (error) setError("");
          }}
          placeholder="وصف المشكل اللي كتواجه..."
          rows={5}
          style={{
            width: "100%",
            padding: "16px 18px",
            borderRadius: 10,
            border: `1px solid ${error ? C.amber : C.line}`,
            background: C.bg2,
            color: C.text,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.7,
            direction: "rtl",
            resize: "vertical",
            outline: "none",
            transition: "border-color .2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = C.border2;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? C.amber : C.line;
          }}
        />
        {error && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: C.amber,
              direction: "rtl",
              marginTop: 10,
            }}
          >
            {error}
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: 1,
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
            ← رجوع
          </button>
        )}
        <button
          onClick={handleNext}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: 1,
            padding: "12px 36px",
            borderRadius: 8,
            background: C.cyan,
            color: C.bg,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all .2s",
            marginLeft: "auto",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          التالي →
        </button>
      </div>
    </div>
  );
}
