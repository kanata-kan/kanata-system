"use client";

import { useState, useEffect } from "react";
import { useThemeContext } from "@/hooks/useTheme";

// ─── Change this key whenever you update the design ───────────
const SPLASH_KEY = "aw-intro-v2";

// ─── Timings (ms) ─────────────────────────────────────────────
const T = {
  strokeStart: 250,
  strokeDur: 700,
  glowBloom: 700,
  nameFade: 900,
  subtitleFade: 1150,
  exitStart: 2400,
  exitDur: 380,
  total: 2950,
};

// ─── Theme palettes for splash ─────────────────────────────────
const PALETTE = {
  dark: {
    bg: "#060910",
    dots: "#334155",
    name: "#e2e8f0",
    subtitle: "#475569",
    bracket: "#22d3ee30",
    accent1: "#22d3ee",
    accent2: "#a855f7",
    glow: "radial-gradient(circle, #22d3ee12 0%, #a855f708 45%, transparent 70%)",
    scan: "linear-gradient(90deg, transparent, #22d3ee60, #a855f760, transparent)",
    divider:
      "linear-gradient(90deg, transparent, #22d3ee50, #a855f750, transparent)",
  },
  light: {
    bg: "#f8fafc",
    dots: "#cbd5e1",
    name: "#0f172a",
    subtitle: "#64748b",
    bracket: "#0e749040",
    accent1: "#0e7490",
    accent2: "#7c3aed",
    glow: "radial-gradient(circle, #0e749012 0%, #7c3aed08 45%, transparent 70%)",
    scan: "linear-gradient(90deg, transparent, #0e749060, #7c3aed60, transparent)",
    divider:
      "linear-gradient(90deg, transparent, #0e749050, #7c3aed50, transparent)",
  },
} as const;

// ─── AW geometric mark with stroke-draw animation ─────────────
function AWMarkAnimated({
  playing,
  isDark,
}: {
  playing: boolean;
  isDark: boolean;
}) {
  const gId = isDark ? "aw-intro-g-d" : "aw-intro-g-l";
  const bloomId = isDark ? "aw-bloom-d" : "aw-bloom-l";
  const glowId = isDark ? "aw-glow-d" : "aw-glow-l";
  const p = isDark ? PALETTE.dark : PALETTE.light;

  return (
    <svg
      width={148}
      height={148}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.accent1} />
          <stop offset="100%" stopColor={p.accent2} />
        </linearGradient>

        {/* Bloom behind main strokes */}
        <filter id={bloomId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={isDark ? 8 : 6} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values={
              isDark
                ? "0 0 0 0 0.13  0 0 0 0 0.83  0 0 0 0 0.93  0 0 0 0.6 0"
                : "0 0 0 0 0.05  0 0 0 0 0.45  0 0 0 0 0.56  0 0 0 0.35 0"
            }
            result="color"
          />
          <feMerge>
            <feMergeNode in="color" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Softer glow for crossbar */}
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation={isDark ? 4 : 3} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* AW ligature — A right-leg === W left-stroke */}
      <path
        d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16"
        fill="none"
        stroke={`url(#${gId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${bloomId})`}
        style={{
          strokeDasharray: 430,
          strokeDashoffset: playing ? 0 : 430,
          transition: playing
            ? `stroke-dashoffset ${T.strokeDur}ms cubic-bezier(0.4,0,0.2,1) ${T.strokeStart}ms`
            : "none",
        }}
      />

      {/* A crossbar — draws 420ms after main path starts */}
      <path
        d="M17.5,53 L42,53"
        fill="none"
        stroke={`url(#${gId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        filter={`url(#${glowId})`}
        style={{
          strokeDasharray: 26,
          strokeDashoffset: playing ? 0 : 26,
          transition: playing
            ? `stroke-dashoffset 280ms cubic-bezier(0.4,0,0.2,1) ${T.strokeStart + 420}ms`
            : "none",
        }}
      />
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────
export function IntroSplash() {
  const { dark } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [exiting, setExiting] = useState(false);

  const p = dark ? PALETTE.dark : PALETTE.light;

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(SPLASH_KEY))
      return;

    const t1 = setTimeout(() => {
      setVisible(true);
      setPlaying(true);
    }, 30);

    const t2 = setTimeout(() => setExiting(true), T.exitStart);

    const t3 = setTimeout(() => {
      setVisible(false);
      localStorage.setItem(SPLASH_KEY, "1");
    }, T.total);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      dir="ltr"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: p.bg,
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: exiting ? `opacity ${T.exitDur}ms ease` : "none",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* ── Dot grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: playing ? (dark ? 0.18 : 0.25) : 0,
          transition: "opacity 300ms ease 100ms",
        }}
      >
        <svg style={{ width: "100%", height: "100%" }}>
          <defs>
            <pattern
              id="splash-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill={p.dots} />
            </pattern>
            <radialGradient id="splash-dot-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="75%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="splash-dot-mask">
              <rect width="100%" height="100%" fill="url(#splash-dot-fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#splash-dots)"
            mask="url(#splash-dot-mask)"
          />
        </svg>
      </div>

      {/* ── Radial glow ── */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: p.glow,
          opacity: playing ? 1 : 0,
          transform: playing ? "scale(1)" : "scale(0.4)",
          transition: `opacity 800ms ease ${T.glowBloom}ms, transform 1000ms cubic-bezier(0.2,0,0,1) ${T.glowBloom}ms`,
        }}
      />

      {/* ── Scan line ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          top: "50%",
          background: p.scan,
          transform: playing ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: playing
            ? `transform 600ms cubic-bezier(0.4,0,0.2,1) ${T.strokeStart + 600}ms`
            : "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Mark */}
        <div
          style={{
            opacity: playing ? 1 : 0,
            transform: playing ? "scale(1)" : "scale(0.7)",
            transition: `opacity 300ms ease ${T.strokeStart - 50}ms, transform 600ms cubic-bezier(0.2,0,0,1) ${T.strokeStart - 50}ms`,
          }}
        >
          <AWMarkAnimated playing={playing} isDark={dark} />
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            marginTop: 28,
            background: p.divider,
            width: playing ? 140 : 0,
            transition: `width 500ms cubic-bezier(0.4,0,0.2,1) ${T.nameFade - 100}ms`,
          }}
        />

        {/* Name */}
        <div
          style={{
            marginTop: 20,
            fontSize: 13,
            fontWeight: 600,
            color: p.name,
            textTransform: "uppercase",
            letterSpacing: playing ? "0.28em" : "0.05em",
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
            opacity: playing ? 1 : 0,
            transition: `opacity 500ms ease ${T.nameFade}ms, letter-spacing 700ms cubic-bezier(0.2,0,0,1) ${T.nameFade}ms`,
            whiteSpace: "nowrap",
          }}
        >
          Abdelilah Wajid
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 8,
            fontSize: 9.5,
            fontWeight: 500,
            color: p.subtitle,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            fontFamily: "var(--font-sans, system-ui, sans-serif)",
            opacity: playing ? 1 : 0,
            transition: `opacity 600ms ease ${T.subtitleFade}ms`,
            whiteSpace: "nowrap",
          }}
        >
          Product Engineer
        </div>
      </div>

      {/* ── Corner brackets ── */}
      {(
        [
          ["top", "left"],
          ["top", "right"],
          ["bottom", "left"],
          ["bottom", "right"],
        ] as const
      ).map(([v, h], i) => (
        <div
          key={`${v}${h}`}
          style={{
            position: "absolute",
            [v]: 28,
            [h]: 28,
            width: 20,
            height: 20,
            borderTop: v === "top" ? `1px solid ${p.bracket}` : "none",
            borderBottom: v === "bottom" ? `1px solid ${p.bracket}` : "none",
            borderLeft: h === "left" ? `1px solid ${p.bracket}` : "none",
            borderRight: h === "right" ? `1px solid ${p.bracket}` : "none",
            opacity: playing ? 1 : 0,
            transition: `opacity 400ms ease ${300 + i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}
