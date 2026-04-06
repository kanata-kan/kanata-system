/**
 * @file StepGoal.tsx
 * @description Step 2 — Goal selection. User picks their primary project goal.
 * Required field with inline validation.
 */
"use client";

import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { StepProps } from "./types";

const GOALS = [
  "نزيد المبيعات",
  "نحسن تجربة المستخدم",
  "نبني presence ديالي",
  "مازال ما واضحش",
] as const;

export function StepGoal({ onNext, onBack, formData, setField }: StepProps) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [error, setError] = useState("");

  const handleSelect = (goal: string) => {
    setField("goal", goal);
    setError("");
  };

  const handleNext = () => {
    if (!formData.goal) {
      setError("اختار الهدف باش نكملو");
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
          شنو الهدف الحقيقي من هاد المشروع؟
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.faint,
            letterSpacing: 1.5,
          }}
        >
          STEP 2 / 7
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {GOALS.map((goal) => {
          const selected = formData.goal === goal;
          return (
            <button
              key={goal}
              onClick={() => handleSelect(goal)}
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                border: `1px solid ${selected ? C.cyan : C.line}`,
                background: selected ? `${C.cyan}12` : C.bg2,
                color: selected ? C.cyan : C.sub,
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? 15 : 16,
                textAlign: "right",
                direction: "rtl",
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
              {goal}
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
            direction: "rtl",
          }}
        >
          {error}
        </p>
      )}

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
