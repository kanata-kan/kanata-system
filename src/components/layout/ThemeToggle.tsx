/**
 * @file ThemeToggle.tsx
 * @description Pill switch avec track/thumb, emoji 🌙/☀️ et label dark/light.
 * Reçoit dark, onToggle et c via props — aucun accès au contexte global.
 */

import type { Theme } from "@/tokens/themes";

interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
  c: Theme;
}

export function ThemeToggle({ dark, onToggle, c }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px 5px 6px",
        borderRadius: 40,
        background: c.bg3,
        border: `1px solid ${c.border}`,
        transition: "all .3s",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Track */}
      <div
        style={{
          width: 36,
          height: 20,
          borderRadius: 12,
          background: dark ? "rgba(56,189,248,0.2)" : "rgba(251,188,5,0.2)",
          border: `1px solid ${dark ? c.cyan + "40" : "rgba(251,188,5,0.5)"}`,
          position: "relative",
          transition: "all .3s",
          flexShrink: 0,
        }}
      >
        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            top: 2,
            left: dark ? 18 : 2,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: dark ? c.cyan : "#FBBF24",
            boxShadow: dark
              ? `0 0 8px ${c.cyan}80`
              : "0 0 8px rgba(251,188,5,0.8)",
            transition: "left .3s cubic-bezier(.4,0,.2,1), background .3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
          }}
        >
          {dark ? "🌙" : "☀️"}
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 1.5,
          color: c.muted,
          textTransform: "uppercase",
        }}
      >
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
