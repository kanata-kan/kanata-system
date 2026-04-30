"use client";

import { memo, useState, useCallback, useEffect, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  steps,
} from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";
import type { Theme } from "@/tokens/themes";
import { WindowDots } from "@/components/ui/WindowDots";

// ─── Data ────────────────────────────────────────────────────────────────────

interface NodeData {
  id: string;
  label: string;
  col: number;
  row: number;
  chaos: { x: number; y: number; rotate: number };
}

const CANVAS_W = 320;
const CANVAS_H = 220;
const NODE_W = 85;
const NODE_H = 46;
const COLS = 3;
const ROWS = 2;

const NODES: NodeData[] = [
  {
    id: "data",
    label: "Raw Data",
    col: 0,
    row: 0,
    chaos: { x: -25, y: 20, rotate: -8 },
  },
  {
    id: "process",
    label: "Process",
    col: 1,
    row: 0,
    chaos: { x: 30, y: -15, rotate: 6 },
  },
  {
    id: "errors",
    label: "Errors",
    col: 2,
    row: 0,
    chaos: { x: -20, y: -25, rotate: -5 },
  },
  {
    id: "structure",
    label: "Structure",
    col: 0,
    row: 1,
    chaos: { x: 18, y: 22, rotate: 7 },
  },
  {
    id: "automation",
    label: "Automation",
    col: 1,
    row: 1,
    chaos: { x: -22, y: -12, rotate: -6 },
  },
  {
    id: "system",
    label: "System",
    col: 2,
    row: 1,
    chaos: { x: 15, y: 20, rotate: 8 },
  },
];

const EDGES: [number, number, number, number][] = [
  [0, 0, 1, 0],
  [1, 0, 2, 0],
  [0, 0, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [1, 1, 2, 1],
];

// Particle seed positions (chaos offsets) – deterministic
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  // pseudo-random but stable
  cx: ((i * 73 + 41) % 280) + 20,
  cy: ((i * 47 + 19) % 180) + 20,
  // aligned grid target (evenly distributed)
  gx: (i % 8) * 38 + 14,
  gy: Math.floor(i / 8) * 90 + 55,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  delay: i * 0.04,
}));

const COPY = {
  en: {
    headerIdle: "chaos mode",
    headerLive: "system ready",
    cue: "Hover to transform",
    cueSub: "chaos → system",
    statusIdle: "CHAOS",
    statusLive: "ORGANIZED",
    aria: "Hover to transform chaos into system",
    message: "I turn chaos into reliable systems",
    metricA: "nodes",
    metricB: "edges",
    metricC: "uptime",
  },
  fr: {
    headerIdle: "mode chaos",
    headerLive: "systeme pret",
    cue: "Survolez pour transformer",
    cueSub: "chaos → systeme",
    statusIdle: "CHAOS",
    statusLive: "ORGANISE",
    aria: "Survolez pour transformer le chaos en systeme",
    message: "Je transforme le chaos en systemes fiables",
    metricA: "nœuds",
    metricB: "arêtes",
    metricC: "activité",
  },
  ar: {
    headerIdle: "وضع فوضى",
    headerLive: "النظام جاهز",
    cue: "مرر للتحويل",
    cueSub: "فوضى → نظام",
    statusIdle: "فوضى",
    statusLive: "منظم",
    aria: "مرر لتحويل الفوضى إلى نظام",
    message: "أحول الفوضى إلى أنظمة موثوقة",
    metricA: "عقد",
    metricB: "حواف",
    metricC: "وقت التشغيل",
  },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gridPos(col: number, row: number) {
  const cellW = CANVAS_W / COLS;
  const cellH = CANVAS_H / ROWS;
  return {
    x: col * cellW + (cellW - NODE_W) / 2,
    y: row * cellH + (cellH - NODE_H) / 2,
  };
}

function gridCenter(col: number, row: number) {
  const { x, y } = gridPos(col, row);
  return { x: x + NODE_W / 2, y: y + NODE_H / 2 };
}

function edgeToPath(fc: number, fr: number, tc: number, tr: number) {
  const a = gridCenter(fc, fr);
  const b = gridCenter(tc, tr);
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

// ─── NoiseFilter ──────────────────────────────────────────────────────────────

/** SVG filter definition for film-grain texture – rendered once, reused. */
const NoiseFilter = memo(function NoiseFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
        <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
});

// ─── ParticleField ────────────────────────────────────────────────────────────

/** Floating ambient particles that snap to grid when organized. */
const ParticleField = memo(function ParticleField({
  organized,
  C,
}: {
  organized: boolean;
  C: Theme;
}) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 1,
      }}
    >
      {PARTICLES.map((p) => (
        <m.circle
          key={p.id}
          r={p.size}
          fill={p.id % 4 === 0 ? C.purple : C.cyan}
          initial={false}
          animate={{
            cx: organized ? p.gx : p.cx,
            cy: organized ? p.gy : p.cy,
            opacity: organized ? 0.55 : 0.2,
            scale: organized ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 20,
            delay: p.delay,
          }}
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </svg>
  );
});

// ─── TripleScanBeam ──────────────────────────────────────────────────────────

/** Three sweep beams at staggered speeds for a premium scanner feel. */
const TripleScanBeam = memo(function TripleScanBeam({
  scanKey,
  C,
}: {
  scanKey: number;
  C: Theme;
}) {
  const beams = [
    { delay: 0, height: 3, opacity: 1, duration: 0.55 },
    { delay: 0.08, height: 1, opacity: 0.5, duration: 0.62 },
    { delay: 0.16, height: 1, opacity: 0.3, duration: 0.7 },
  ];

  return (
    <>
      {beams.map((beam, i) => (
        <m.div
          key={`${scanKey}-${i}`}
          initial={{ top: "5%", opacity: beam.opacity }}
          animate={{ top: "100%", opacity: [beam.opacity, beam.opacity, 0] }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            height: beam.height,
            borderRadius: 999,
            background:
              i === 0
                ? `linear-gradient(90deg, transparent, ${C.cyan}, ${C.purple}aa, ${C.cyan}, transparent)`
                : `linear-gradient(90deg, transparent, ${C.cyan}60, transparent)`,
            boxShadow: i === 0 ? `0 0 18px 5px ${C.cyan}70` : "none",
            pointerEvents: "none",
            zIndex: 10,
            willChange: "top, opacity",
          }}
        />
      ))}
    </>
  );
});

// ─── EdgeLine + FlowDot ───────────────────────────────────────────────────────

interface EdgeProps {
  fromCol: number;
  fromRow: number;
  toCol: number;
  toRow: number;
  organized: boolean;
  index: number;
  C: Theme;
}

const EdgeLine = memo(function EdgeLine({
  fromCol,
  fromRow,
  toCol,
  toRow,
  organized,
  index,
  C,
}: EdgeProps) {
  const d = edgeToPath(fromCol, fromRow, toCol, toRow);
  return (
    <>
      {/* Glow trail */}
      <m.path
        d={d}
        stroke={C.cyan}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#edge-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: organized ? 1 : 0,
          opacity: organized ? 0.18 : 0,
        }}
        transition={{
          pathLength: { duration: 0.45, delay: index * 0.07, ease: "easeOut" },
          opacity: { duration: 0.2, delay: index * 0.07 },
        }}
        style={{ willChange: "stroke-dashoffset, opacity" }}
      />
      {/* Sharp line */}
      <m.path
        d={d}
        stroke={C.cyan}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: organized ? 1 : 0,
          opacity: organized ? 0.7 : 0,
        }}
        transition={{
          pathLength: { duration: 0.4, delay: index * 0.07, ease: "easeOut" },
          opacity: { duration: 0.15, delay: index * 0.07 },
        }}
        style={{ willChange: "stroke-dashoffset, opacity" }}
      />
    </>
  );
});

/** Animated data-packet dot flowing along an edge. */
const FlowDot = memo(function FlowDot({
  fromCol,
  fromRow,
  toCol,
  toRow,
  organized,
  index,
  C,
}: EdgeProps) {
  const a = gridCenter(fromCol, fromRow);
  const b = gridCenter(toCol, toRow);

  return (
    <m.circle
      r={2.5}
      fill={index % 2 === 0 ? C.cyan : C.purple}
      initial={false}
      animate={
        organized
          ? {
              cx: [a.x, b.x, a.x],
              cy: [a.y, b.y, a.y],
              opacity: [0, 1, 1, 0],
            }
          : { opacity: 0, cx: a.x, cy: a.y }
      }
      transition={
        organized
          ? {
              duration: 1.6,
              delay: index * 0.22 + 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.8,
            }
          : { duration: 0.15 }
      }
      style={{ willChange: "transform, opacity" }}
    />
  );
});

// ─── SystemNode ───────────────────────────────────────────────────────────────

const NODE_STATUS_COLORS = [
  "#22d3ee",
  "#a78bfa",
  "#34d399",
  "#f59e0b",
  "#f87171",
  "#818cf8",
];

const SystemNode = memo(function SystemNode({
  node,
  organized,
  C,
  index,
}: {
  node: NodeData;
  organized: boolean;
  C: Theme;
  index: number;
}) {
  const base = gridPos(node.col, node.row);
  const statusColor = NODE_STATUS_COLORS[index % NODE_STATUS_COLORS.length];

  return (
    <m.div
      initial={false}
      animate={{
        x: organized ? base.x : base.x + node.chaos.x,
        y: organized ? base.y : base.y + node.chaos.y,
        scale: organized ? 1 : 0.95,
        rotate: organized ? 0 : node.chaos.rotate,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 24,
        delay: index * 0.06,
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: NODE_W,
        height: NODE_H,
        zIndex: 3,
        willChange: "transform",
      }}
    >
      {/* Pulse ring */}
      {organized && (
        <m.div
          key={`ring-${node.id}-${index}`}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{
            duration: 1.2,
            delay: index * 0.06 + 0.25,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 14,
            border: `1px solid ${statusColor}`,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Outer glow */}
      <m.div
        initial={false}
        animate={{
          opacity: organized ? 1 : 0,
          boxShadow: organized
            ? `0 0 28px 4px ${statusColor}28, 0 0 8px 2px ${statusColor}18`
            : "none",
        }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 12,
          pointerEvents: "none",
          willChange: "opacity, box-shadow",
        }}
      />

      {/* Card body */}
      <m.div
        initial={false}
        animate={{
          borderColor: organized ? C.border2 : C.border,
          backgroundColor: organized ? C.bg3 : C.card,
        }}
        transition={{ duration: 0.35, delay: index * 0.06 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          border: "1px solid",
          position: "relative",
          overflow: "hidden",
          willChange: "border-color, background-color",
        }}
      >
        {/* Corner ticks – top-left */}
        <m.div
          initial={false}
          animate={{ opacity: organized ? 1 : 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.2 }}
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            pointerEvents: "none",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M0 7 L0 0 L7 0"
              stroke={statusColor}
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>
        </m.div>

        {/* Corner ticks – bottom-right */}
        <m.div
          initial={false}
          animate={{ opacity: organized ? 1 : 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.25 }}
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            pointerEvents: "none",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M8 1 L8 8 L1 8"
              stroke={statusColor}
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>
        </m.div>

        {/* Top accent bar */}
        <m.div
          initial={false}
          animate={{
            scaleX: organized ? 1 : 0.25,
            opacity: organized ? 1 : 0.15,
          }}
          transition={{ duration: 0.4, delay: index * 0.06 + 0.1 }}
          style={{
            position: "absolute",
            insetInline: 12,
            top: 8,
            height: 2,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${statusColor}, ${C.purple})`,
            transformOrigin: "left center",
            willChange: "transform, opacity",
          }}
        />

        {/* Status dot */}
        <m.div
          initial={false}
          animate={{
            opacity: organized ? 1 : 0,
            backgroundColor: organized ? statusColor : "transparent",
          }}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.3 }}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 4,
            height: 4,
            borderRadius: "50%",
            willChange: "opacity, background-color",
          }}
        />

        {/* Label */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 4,
          }}
        >
          <m.span
            initial={false}
            animate={{ color: organized ? C.text : C.muted }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 0.45,
              userSelect: "none",
              willChange: "color",
            }}
          >
            {node.label}
          </m.span>
        </div>

        {/* Shimmer */}
        {organized && (
          <m.div
            key={`shimmer-${node.id}`}
            initial={{ x: "-100%", opacity: 0.5 }}
            animate={{ x: "200%", opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.06 + 0.12,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent 25%, ${statusColor}45 50%, transparent 75%)`,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />
        )}
      </m.div>
    </m.div>
  );
});

// ─── AnimatedMetric ───────────────────────────────────────────────────────────

/** Counts up from 0 to `value` when `run` becomes true. */
const AnimatedMetric = memo(function AnimatedMetric({
  value,
  label,
  organized,
  C,
  delay = 0,
}: {
  value: string;
  label: string;
  organized: boolean;
  C: Theme;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const start = useRef<number | null>(null);
  const numericEnd = parseInt(value, 10);
  const isNumeric = !isNaN(numericEnd);
  const duration = 600;

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    if (!organized) {
      if (frame.current) cancelAnimationFrame(frame.current);
      ref.current.textContent = "0";
      return;
    }
    const timeout = setTimeout(() => {
      start.current = null;
      const animate = (ts: number) => {
        if (!start.current) start.current = ts;
        const progress = Math.min((ts - start.current) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (ref.current)
          ref.current.textContent = String(Math.round(eased * numericEnd));
        if (progress < 1) frame.current = requestAnimationFrame(animate);
      };
      frame.current = requestAnimationFrame(animate);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [organized, numericEnd, isNumeric, delay]);

  return (
    <m.div
      initial={false}
      animate={{ opacity: organized ? 1 : 0.3 }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: organized ? C.cyan : C.faint,
          letterSpacing: 0.5,
        }}
      >
        {isNumeric ? <span ref={ref}>0</span> : value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 7.5,
          color: C.muted,
          letterSpacing: 0.8,
        }}
      >
        {label.toUpperCase()}
      </span>
    </m.div>
  );
});

// ─── BlinkCursor ──────────────────────────────────────────────────────────────

const BlinkCursor = memo(function BlinkCursor({ C }: { C: Theme }) {
  return (
    <m.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: steps(1) }}
      style={{
        display: "inline-block",
        width: 6,
        height: 11,
        backgroundColor: C.cyan,
        borderRadius: 1,
        marginLeft: 2,
        verticalAlign: "middle",
      }}
    />
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

export const HeroSystemTransform = memo(function HeroSystemTransform() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const shouldReduce = useReducedMotion();

  const [hovered, setHovered] = useState(false);
  const [locked, setLocked] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  const organized = hovered || locked;
  const copy = COPY[locale];
  const isArabic = locale === "ar";
  const labelFont = isArabic ? "var(--font-arabic)" : "var(--font-mono)";

  const handleEnter = useCallback(() => {
    setHovered(true);
    setScanKey((k) => k + 1);
  }, []);
  const handleLeave = useCallback(() => setHovered(false), []);
  const handleClick = useCallback(() => {
    setLocked((prev) => {
      const next = !prev;
      if (next) setScanKey((k) => k + 1);
      return next;
    });
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <NoiseFilter />

      <div className="rv d4" style={{ width: "100%" }}>
        <div style={{ position: "relative" }}>
          {/* ── Layered ambient backdrop ── */}
          <m.div
            initial={false}
            animate={{ opacity: organized ? 1 : 0.35 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: -24,
              borderRadius: 32,
              background: [
                `radial-gradient(ellipse at 25% 25%, ${C.cyan}22, transparent 55%)`,
                `radial-gradient(ellipse at 80% 75%, ${C.purple}18, transparent 50%)`,
                `radial-gradient(ellipse at 60% 10%, ${C.cyan}10, transparent 40%)`,
              ].join(", "),
              filter: "blur(28px)",
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />

          {/* ── Outer gradient border ── */}
          <m.div
            initial={false}
            animate={{
              background: organized
                ? `linear-gradient(145deg, ${C.cyan}44, ${C.purple}33, ${C.border}, ${C.border2})`
                : `linear-gradient(145deg, ${C.border2}, ${C.line}, ${C.border})`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: "relative",
              borderRadius: 18,
              padding: 1,
              maxWidth: 468,
              margin: "0 auto",
              willChange: "background",
            }}
          >
            <div
              style={{
                borderRadius: 17,
                background: C.bg2,
                boxShadow: C.shadow,
              }}
            >
              {/* ── Title bar ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderBottom: `1px solid ${C.line}`,
                  background: `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`,
                }}
              >
                <WindowDots />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: C.muted,
                    letterSpacing: 0.5,
                  }}
                >
                  system-transform.ts
                </span>

                {/* Organized: blinking cursor in title */}
                {organized && <BlinkCursor C={C} />}

                <div
                  style={{
                    marginInlineStart: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    opacity: organized ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {/* Animated status indicator */}
                  {organized ? (
                    <m.div
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C.green,
                        willChange: "transform, opacity",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C.amber,
                        display: "block",
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: labelFont,
                      fontSize: 9,
                      color: organized ? C.green : C.amber,
                      letterSpacing: isArabic ? 0 : 0.5,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {organized ? copy.headerLive : copy.headerIdle}
                  </span>
                </div>
              </div>

              {/* ── Interactive canvas ── */}
              <button
                type="button"
                aria-pressed={locked}
                aria-label={copy.aria}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onFocus={handleEnter}
                onBlur={handleLeave}
                onClick={handleClick}
                style={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  border: "none",
                  padding: "20px 18px 70px",
                  background: "transparent",
                  textAlign: "inherit",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                {/* Grid background – dot-style */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: [
                      `linear-gradient(${C.gridLine} 1px, transparent 1px)`,
                      `linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                    ].join(", "),
                    backgroundSize: "28px 28px",
                    pointerEvents: "none",
                    opacity: organized ? 0.9 : 0.4,
                    transition: "opacity 0.4s ease",
                  }}
                />

                {/* Grain overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 17,
                    opacity: 0.035,
                    pointerEvents: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "120px 120px",
                    zIndex: 20,
                  }}
                />

                {/* Inner card */}
                <div
                  style={{
                    position: "absolute",
                    inset: "16px 16px 70px",
                    borderRadius: 22,
                    border: `1px solid ${organized ? C.border2 : C.border}`,
                    background: `radial-gradient(circle at 18% 18%, ${C.cyan}12, transparent 34%), linear-gradient(180deg, ${C.bg2}, ${C.bg3})`,
                    pointerEvents: "none",
                    transition: "border-color 0.3s ease",
                  }}
                />

                {/* Scan beam */}
                {organized && !shouldReduce && (
                  <TripleScanBeam scanKey={scanKey} C={C} />
                )}

                {/* Node canvas */}
                <div
                  style={{
                    position: "relative",
                    width: CANVAS_W,
                    height: CANVAS_H,
                    marginInline: "auto",
                  }}
                >
                  <svg
                    viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                      overflow: "visible",
                      zIndex: 2,
                    }}
                  >
                    {/* Particle field */}
                    {!shouldReduce && (
                      <ParticleField organized={organized} C={C} />
                    )}

                    {/* Edges */}
                    {EDGES.map(([fc, fr, tc, tr], i) => (
                      <EdgeLine
                        key={`e-${fc}${fr}-${tc}${tr}`}
                        fromCol={fc}
                        fromRow={fr}
                        toCol={tc}
                        toRow={tr}
                        organized={organized}
                        index={i}
                        C={C}
                      />
                    ))}

                    {/* Flow dots */}
                    {!shouldReduce &&
                      EDGES.map(([fc, fr, tc, tr], i) => (
                        <FlowDot
                          key={`fd-${fc}${fr}-${tc}${tr}`}
                          fromCol={fc}
                          fromRow={fr}
                          toCol={tc}
                          toRow={tr}
                          organized={organized}
                          index={i}
                          C={C}
                        />
                      ))}
                  </svg>

                  {/* Nodes */}
                  {NODES.map((node, index) => (
                    <SystemNode
                      key={node.id}
                      node={node}
                      organized={organized}
                      C={C}
                      index={index}
                    />
                  ))}
                </div>

                {/* Hover cue */}
                <m.div
                  initial={false}
                  animate={{
                    opacity: organized ? 0 : 1,
                    y: organized ? 10 : 0,
                    scale: organized ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 24,
                    transform: "translateX(-50%)",
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    pointerEvents: "none",
                    zIndex: 6,
                    willChange: "transform, opacity",
                  }}
                >
                  <m.div
                    animate={{ scaleY: [1, 0.6, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: 1,
                      height: 28,
                      background: `linear-gradient(180deg, transparent, ${C.cyan}, transparent)`,
                      willChange: "transform, opacity",
                    }}
                  />
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: `1px solid ${C.border2}`,
                      background: `linear-gradient(180deg, ${C.bg2}, ${C.bg3})`,
                      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
                    }}
                  >
                    <m.span
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.cyan,
                        flexShrink: 0,
                        display: "block",
                        willChange: "transform, opacity",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: labelFont,
                        fontSize: isArabic ? 11 : 9.5,
                        fontWeight: 700,
                        letterSpacing: isArabic ? 0 : 0.45,
                        color: C.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {copy.cue}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        color: C.cyan,
                        letterSpacing: 0.45,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {copy.cueSub}
                    </span>
                  </div>
                </m.div>

                {/* System ready badge */}
                {organized && (
                  <m.div
                    initial={{ opacity: 0, scale: 0.88, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.3,
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 24,
                      transform: "translateX(-50%)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 16px",
                      borderRadius: 999,
                      border: `1px solid ${C.border2}`,
                      background: `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`,
                      boxShadow: `0 10px 32px rgba(15,23,42,0.12), 0 0 0 1px ${C.cyan}20`,
                      pointerEvents: "none",
                      zIndex: 6,
                      willChange: "transform, opacity",
                    }}
                  >
                    <m.span
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.green,
                        flexShrink: 0,
                        display: "block",
                        willChange: "transform, opacity",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: labelFont,
                        fontSize: isArabic ? 11 : 9.5,
                        fontWeight: 700,
                        letterSpacing: isArabic ? 0 : 0.45,
                        color: C.text,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {copy.message}
                    </span>
                  </m.div>
                )}
              </button>

              {/* ── Status bar ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  padding: "12px 18px 14px",
                  borderTop: `1px solid ${C.line}`,
                  minHeight: 48,
                  background: `linear-gradient(180deg, ${C.bg2}, ${C.bg3})`,
                }}
              >
                <span
                  style={{
                    fontFamily: labelFont,
                    fontSize: 10,
                    letterSpacing: isArabic ? 0 : 1,
                    color: organized ? C.cyan : C.faint,
                    transition: "color 0.3s ease",
                    userSelect: "none",
                    fontWeight: 700,
                  }}
                >
                  {organized ? copy.statusLive : copy.statusIdle}
                </span>

                {/* Animated metrics */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <AnimatedMetric
                    value="6"
                    label={copy.metricA}
                    organized={organized}
                    C={C}
                    delay={0.4}
                  />
                  <AnimatedMetric
                    value="6"
                    label={copy.metricB}
                    organized={organized}
                    C={C}
                    delay={0.55}
                  />
                  <AnimatedMetric
                    value="100%"
                    label={copy.metricC}
                    organized={organized}
                    C={C}
                    delay={0.7}
                  />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
});
