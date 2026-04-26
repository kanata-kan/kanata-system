/**
 * @file StepSubmit.tsx
 * @description Step 7 — Final submit. Shows a summary of all collected data
 * and sends it via WhatsApp. Displays confirmation on success.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import type { FormData } from "./types";

interface Props {
  formData: FormData;
  onBack?: () => void;
}

const WHATSAPP_PHONE = "212652064823";

const LABELS: Record<keyof FormData, string> = {
  goal: "الهدف",
  problem: "المشكل",
  attempts: "المحاولات السابقة",
  timing: "التوقيت",
};

function buildWhatsAppMessage(formData: FormData): string {
  const lines: string[] = [
    "مرحبا عبدالإله 👋",
    "عمرت الاستمارة ديال الموقع وهادي هي المعلومات:",
    "",
  ];

  if (formData.goal) {
    lines.push(`🎯 *الهدف:* ${formData.goal}`);
  }
  if (formData.problem) {
    lines.push(`⚠️ *المشكل:* ${formData.problem}`);
  }
  if (formData.attempts?.trim()) {
    lines.push(`🔄 *المحاولات السابقة:* ${formData.attempts}`);
  }
  if (formData.timing) {
    lines.push(`⏰ *التوقيت:* ${formData.timing}`);
  }

  lines.push("");
  lines.push("متشوق نتناقش معك 🤝");

  return lines.join("\n");
}

export function StepSubmit({ formData, onBack }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const message = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: `${C.green}14`,
            border: `2px solid ${C.green}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke={C.green}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 20 : 26,
            color: C.text,
            fontWeight: 500,
            lineHeight: 1.6,
            direction: "rtl",
            maxWidth: 440,
          }}
        >
          تم إرسال الطلب عبر WhatsApp
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 14 : 16,
            color: C.muted,
            lineHeight: 1.7,
            direction: "rtl",
            maxWidth: 380,
          }}
        >
          غادي نراجع الطلب ديالك ونرد عليك في أقرب وقت.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 1.5,
              padding: "10px 24px",
              borderRadius: 8,
              border: `1px solid ${C.line}`,
              color: C.muted,
              textDecoration: "none",
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
            ← الرجوع للصفحة الرئيسية
          </Link>
        </div>
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
            fontFamily: "var(--font-display)",
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
                borderInlineStart: `2px solid ${C.cyan}40`,
                paddingInlineStart: 12,
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
            background: "#25D366",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all .2s",
            marginInlineStart: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(37,211,102,0.35)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          إرسال عبر WhatsApp
        </button>
      </div>
    </div>
  );
}
