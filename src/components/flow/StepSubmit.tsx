/**
 * @file StepSubmit.tsx
 * @description Step 7 — Final submit. Shows a summary of all collected data
 * and handles form submission. Displays confirmation on success.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { FormData } from "./types";

interface Props {
  formData: FormData;
  onBack?: () => void;
}

const LABELS: Record<keyof FormData, string> = {
  goal: "الهدف",
  problem: "المشكل",
  attempts: "المحاولات السابقة",
  timing: "التوقيت",
};

export function StepSubmit({ formData, onBack }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("── Client Qualification Data ──");
    console.log(JSON.stringify(formData, null, 2));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 28,
          minHeight: "50vh",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `${C.green}18`,
            border: `2px solid ${C.green}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          ✓
        </div>

        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: isMobile ? 20 : 26,
            color: C.text,
            fontWeight: 500,
            lineHeight: 1.6,
            direction: "rtl",
            maxWidth: 440,
          }}
        >
          تم استلام الطلب.
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 14 : 16,
            color: C.muted,
            lineHeight: 1.6,
            direction: "rtl",
          }}
        >
          غادي نراجعو ونتواصل معك.
        </p>

        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 1.5,
            color: C.muted,
            marginTop: 20,
            textDecoration: "none",
            transition: "color .2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = C.cyan;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = C.muted;
          }}
        >
          ← الرجوع للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  const entries = (Object.keys(LABELS) as (keyof FormData)[]).filter(
    (key) => formData[key] && formData[key]!.trim() !== "",
  );

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
          ملخص الطلب ديالك
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.faint,
            letterSpacing: 1.5,
          }}
        >
          STEP 7 / 7
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: isMobile ? 16 : 24,
          borderRadius: 12,
          background: C.bg2,
          border: `1px solid ${C.line}`,
        }}
      >
        {entries.map((key) => (
          <div key={key}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: C.faint,
                letterSpacing: 1,
                marginBottom: 6,
                direction: "rtl",
              }}
            >
              {LABELS[key]}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: C.sub,
                lineHeight: 1.6,
                direction: "rtl",
                borderRight: `2px solid ${C.cyan}40`,
                paddingRight: 12,
              }}
            >
              {formData[key]}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{ display: "flex", gap: 12, justifyContent: "space-between" }}
      >
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
          onClick={handleSubmit}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            letterSpacing: 1.5,
            padding: "14px 40px",
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
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${C.cyan}40`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          إرسال الطلب ←
        </button>
      </div>
    </div>
  );
}
