/**
 * @file HeroCTA.tsx
 * @description Hero CTAs: SEE HOW I THINK ↓ and START A CONVERSATION buttons.
 * No internal state. Purely presentational.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";

export function HeroCTA() {
  const { C } = useThemeContext();

  return (
    <div
      className="rv d6"
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() =>
          document
            .getElementById("work")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 2,
          padding: "0 28px",
          height: 46,
          borderRadius: 6,
          background: C.cyan,
          color: C.bg,
          fontWeight: 500,
          transition: "all .2s",
          cursor: "pointer",
          border: "none",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 24px ${C.cyan}45`;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }}
      >
        SEE HOW I THINK ↓
      </button>
      <button
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 2,
          padding: "0 28px",
          height: 46,
          borderRadius: 6,
          background: "transparent",
          color: C.sub,
          border: `1px solid ${C.line}`,
          transition: "all .2s",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = C.border2;
          e.currentTarget.style.color = C.cyan;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = C.line;
          e.currentTarget.style.color = C.sub;
        }}
      >
        START A CONVERSATION
      </button>
    </div>
  );
}
