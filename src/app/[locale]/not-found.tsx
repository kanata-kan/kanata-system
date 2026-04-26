/**
 * @file [locale]/not-found.tsx
 * @description Locale-aware 404 page — wrapped by the locale layout (Nav + Footer included).
 */
"use client";

import Link from "next/link";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";

const COPY = {
  en: {
    code: "404",
    eyebrow: "PAGE NOT FOUND",
    heading: "You've gone off the map.",
    sub: "The page you're looking for doesn't exist or has been moved.",
    home: "Back to Homepage",
    intake: "How I Start",
  },
  fr: {
    code: "404",
    eyebrow: "PAGE INTROUVABLE",
    heading: "Vous avez quitté la carte.",
    sub: "La page que vous cherchez n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
    intake: "Comment Je Démarre",
  },
  ar: {
    code: "404",
    eyebrow: "الصفحة غير موجودة",
    heading: "وصلت لمكان ما كاينش.",
    sub: "الصفحة اللي كتقلب عليها ما كاينتش أو تنقلت لمكان آخر.",
    home: "الرجوع للرئيسية",
    intake: "كيف نبدأ",
  },
} as const;

export default function NotFound() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <main
      dir={dir}
      style={{
        minHeight: "calc(100dvh - var(--navbar-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "40px 24px" : "80px 48px",
        textAlign: "center",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${C.faint}55 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.cyan}10, ${C.purple}06, transparent 68%)`,
          pointerEvents: "none",
        }}
      />

      {/* AW Mark */}
      <div style={{ marginBottom: 32, opacity: 0.9 }}>
        <svg
          width={isMobile ? 36 : 44}
          height={isMobile ? 36 : 44}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="nf-mark-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={C.cyan} />
              <stop offset="100%" stopColor={C.purple} />
            </linearGradient>
          </defs>
          <path
            d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16"
            fill="none"
            stroke="url(#nf-mark-g)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5,53 L42,53"
            fill="none"
            stroke="url(#nf-mark-g)"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 404 numeral */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isMobile ? "clamp(88px,22vw,120px)" : "clamp(120px,14vw,180px)",
          fontWeight: 800,
          fontStyle: "italic",
          lineHeight: 1,
          background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: -4,
          marginBottom: 8,
          userSelect: "none",
        }}
      >
        {c.code}
      </div>

      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: isRtl ? 0 : 3,
          color: C.faint,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        {c.eyebrow}
      </p>

      {/* Divider */}
      <div
        style={{
          width: 48,
          height: 1,
          background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
          margin: "0 auto 28px",
        }}
      />

      {/* Heading */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isMobile ? 22 : 30,
          fontStyle: "italic",
          color: C.text,
          letterSpacing: isRtl ? 0 : -0.5,
          lineHeight: 1.3,
          marginBottom: 16,
          maxWidth: 480,
        }}
      >
        {c.heading}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: isMobile ? 14 : 16,
          color: C.muted,
          lineHeight: 1.7,
          maxWidth: 400,
          marginBottom: 48,
        }}
      >
        {c.sub}
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: isRtl ? 0 : 1.5,
            padding: "12px 28px",
            borderRadius: 8,
            border: `1px solid ${C.line}`,
            color: C.muted,
            background: "transparent",
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
          {c.home}
        </Link>

        <Link
          href={`/${locale}/how-i-start`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: isRtl ? 0 : 1.5,
            padding: "12px 28px",
            borderRadius: 8,
            border: `1px solid ${C.cyan}50`,
            color: C.cyan,
            background: `${C.cyan}08`,
            textDecoration: "none",
            transition: "all .2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = C.cyan;
            e.currentTarget.style.color = C.bg;
            e.currentTarget.style.borderColor = C.cyan;
            e.currentTarget.style.boxShadow = `0 4px 20px ${C.cyan}35`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = `${C.cyan}08`;
            e.currentTarget.style.color = C.cyan;
            e.currentTarget.style.borderColor = `${C.cyan}50`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {c.intake}
        </Link>
      </div>

      {/* Corner bracket — bottom right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          width: 24,
          height: 24,
          borderBottom: `1px solid ${C.cyan}30`,
          borderRight: `1px solid ${C.cyan}30`,
        }}
      />
      {/* Corner bracket — top left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          width: 24,
          height: 24,
          borderTop: `1px solid ${C.cyan}30`,
          borderLeft: `1px solid ${C.cyan}30`,
        }}
      />
    </main>
  );
}
