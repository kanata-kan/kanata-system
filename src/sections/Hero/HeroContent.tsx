/**
 * @file HeroContent.tsx
 * @description Hero left side: available badge, name with gradient, rotating role with cursor blink,
 * bio, tech pills, and CTAs. Manages its own cursor and role rotation state.
 */
"use client";

import { useState, useEffect } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { HeroCTA } from "./HeroCTA";

const ROLES = [
  "Understand before building",
  "Fix what slows growth",
  "Make decisions, not assumptions",
  "Clarity over speed",
];

export const PILLS = [
  "Understanding first",
  "Clear decisions",
  "Real constraints",
  "Value-driven work",
];

export function HeroContent() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [cur, setCur] = useState(true);
  const [ri, setRi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRi((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Available badge */}
      <div
        className="rv d1"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 32,
          background: `${C.green}15`,
          border: `1px solid ${C.green}35`,
          borderRadius: 40,
          padding: "6px 16px",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: C.green,
            display: "inline-block",
            animation: "glow 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: C.green,
            letterSpacing: 1.5,
          }}
        >
          AVAILABLE FOR WORK
        </span>
      </div>

      {/* Name */}
      <h1
        className="rv d2"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: isMobile
            ? "clamp(48px,12vw,70px)"
            : "clamp(68px,7.5vw,105px)",
          fontWeight: 700,
          lineHeight: 0.93,
          letterSpacing: "-.03em",
          color: C.text,
          marginBottom: 20,
          paddingRight: 8,
        }}
      >
        Abdel
        <span
          className="grad-text"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            paddingRight: 6,
          }}
        >
          ilah
        </span>
        <br />
        Wajid<span style={{ color: C.cyan }}>.</span>
      </h1>

      {/* Rotating role */}
      <div
        className="rv d3"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 24,
            height: 1.5,
            background: `linear-gradient(90deg,${C.cyan},${C.purple})`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 11 : 13,
            color: C.sub,
            letterSpacing: 1,
          }}
        >
          {ROLES[ri]}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              background: C.cyan,
              verticalAlign: "middle",
              marginLeft: 4,
              borderRadius: 1,
              opacity: cur ? 1 : 0,
              transition: "opacity .1s",
            }}
          />
        </span>
      </div>

      {/* Bio */}
      <p
        className="rv d4"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? 14 : 15,
          color: C.muted,
          lineHeight: 1.75,
          maxWidth: 460,
          marginBottom: 32,
          fontWeight: 300,
        }}
      >
        Before writing any code, I try to understand how the business actually
        works. If the goal is growth, I don&apos;t jump into building — I look
        for what&apos;s slowing things down first. Then I decide where I can
        truly add value.
      </p>

      <HeroCTA />
    </div>
  );
}
