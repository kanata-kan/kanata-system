"use client";

import { memo, useState, useCallback } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
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

// Edges as [fromCol, fromRow, toCol, toRow]
const EDGES: [number, number, number, number][] = [
  [0, 0, 1, 0],
  [1, 0, 2, 0],
  [0, 0, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [1, 1, 2, 1],
];

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

// ─── ScanBeam ─────────────────────────────────────────────────────────────────

/** One-shot downward sweep that fires when the widget becomes "organized". */
const ScanBeam = memo(function ScanBeam({
  scanKey,
  C,
}: {
  scanKey: number;
  C: Theme;
}) {
  return (
    <m.div
      key={scanKey}
      initial={{ top: "5%", opacity: 1 }}
      animate={{ top: "100%", opacity: [1, 1, 0] }}
      transition={{ duration: 0.55, ease: "easeIn" }}
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        height: 3,
        borderRadius: 999,
        background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.purple}aa, ${C.cyan}, transparent)`,
        boxShadow: `0 0 16px 4px ${C.cyan}80`,
        pointerEvents: "none",
        zIndex: 10,
        willChange: "top, opacity",
      }}
    />
  );
});

// ─── Connection Lines (path-length draw) ─────────────────────────────────────

interface EdgeLineProps {
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
}: EdgeLineProps) {
  const a = gridCenter(fromCol, fromRow);
  const b = gridCenter(toCol, toRow);
  const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;

  return (
    <m.path
      d={d}
      stroke={C.cyan}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: organized ? 1 : 0,
        opacity: organized ? 0.65 : 0,
      }}
      transition={{
        pathLength: { duration: 0.45, delay: index * 0.07, ease: "easeOut" },
        opacity: { duration: 0.2, delay: index * 0.07 },
      }}
      style={{ willChange: "stroke-dashoffset, opacity" }}
    />
  );
});

// ─── SystemNode ───────────────────────────────────────────────────────────────

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
        stiffness: 220,
        damping: 22,
        delay: index * 0.07,
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
      {/* Pulse ring – appears once nodes are settled */}
      {organized && (
        <m.div
          key={`ring-${node.id}`}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{
            duration: 1.1,
            delay: index * 0.07 + 0.3,
            ease: "easeOut",
            repeat: 0,
          }}
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 14,
            border: `1px solid ${C.cyan}`,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Card body */}
      <m.div
        initial={false}
        animate={{
          borderColor: organized ? C.border2 : C.border,
          backgroundColor: organized ? C.bg3 : C.card,
          boxShadow: organized
            ? `0 0 0 1px ${C.cyan}18, 0 0 22px ${C.cyan}22`
            : "none",
        }}
        transition={{ duration: 0.35, delay: index * 0.07 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          border: "1px solid",
          position: "relative",
          overflow: "hidden",
          willChange: "border-color, background-color, box-shadow",
        }}
      >
        {/* Top accent bar */}
        <m.div
          initial={false}
          animate={{
            scaleX: organized ? 1 : 0.25,
            opacity: organized ? 1 : 0.15,
          }}
          transition={{ duration: 0.4, delay: index * 0.07 + 0.1 }}
          style={{
            position: "absolute",
            insetInline: 12,
            top: 8,
            height: 2,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
            transformOrigin: "left center",
            willChange: "transform, opacity",
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

        {/* Shimmer overlay on organize */}
        {organized && (
          <m.div
            key={`shimmer-${node.id}`}
            initial={{ x: "-100%", opacity: 0.45 }}
            animate={{ x: "200%", opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: index * 0.07 + 0.15,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent 30%, ${C.cyan}50 50%, transparent 70%)`,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />
        )}
      </m.div>
    </m.div>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

export const HeroSystemTransform = memo(function HeroSystemTransform() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const [hovered, setHovered] = useState(false);
  const [locked, setLocked] = useState(false);
  // scanKey increments each time we transition to "organized" to retrigger the beam
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
      <div className="rv d4" style={{ width: "100%" }}>
        <div style={{ position: "relative" }}>
          {/* Ambient glow backdrop */}
          <m.div
            initial={false}
            animate={{ opacity: organized ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: 28,
              background: `radial-gradient(circle at 30% 30%, ${C.cyan}18, transparent 50%), radial-gradient(circle at 78% 70%, ${C.purple}12, transparent 45%)`,
              filter: "blur(22px)",
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />

          <div
            style={{
              position: "relative",
              borderRadius: 18,
              padding: 1,
              background: `linear-gradient(145deg, ${C.border2}, ${C.line}, ${C.border})`,
            }}
          >
            <div
              style={{
                borderRadius: 17,
                overflow: "hidden",
                background: C.bg2,
                boxShadow: C.shadow,
              }}
            >
              {/* Title bar */}
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
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: organized ? C.green : C.amber,
                      transition: "background-color 0.3s ease",
                    }}
                  />
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

              {/* Interactive canvas */}
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
                  padding: "20px 18px 90px",
                  background: "transparent",
                  textAlign: "inherit",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                {/* Grid background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                    pointerEvents: "none",
                    opacity: organized ? 0.9 : 0.4,
                    transition: "opacity 0.4s ease",
                  }}
                />

                {/* Inner card background */}
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

                {/* Scan beam – positioned over canvas, clips to button */}
                {organized && <ScanBeam scanKey={scanKey} C={C} />}

                {/* Node canvas */}
                <div
                  style={{
                    position: "relative",
                    width: CANVAS_W,
                    height: CANVAS_H,
                    marginInline: "auto",
                  }}
                >
                  {/* Connection lines */}
                  <svg
                    viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                      overflow: "visible",
                    }}
                  >
                    {EDGES.map(([fc, fr, tc, tr], i) => (
                      <EdgeLine
                        key={`${fc}${fr}-${tc}${tr}`}
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

                {/* "Hover to transform" cue */}
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
                  <div
                    style={{
                      width: 1,
                      height: 28,
                      background: `linear-gradient(180deg, transparent, ${C.cyan}, transparent)`,
                      opacity: 0.6,
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
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.cyan,
                        flexShrink: 0,
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

                {/* "System ready" badge */}
                {organized && (
                  <m.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 24,
                      transform: "translateX(-50%)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: `1px solid ${C.border2}`,
                      background: `linear-gradient(180deg, ${C.bg3}, ${C.bg2})`,
                      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
                      pointerEvents: "none",
                      zIndex: 6,
                      willChange: "transform, opacity",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.green,
                        flexShrink: 0,
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

              {/* Status bar */}
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
                  }}
                >
                  {organized ? copy.statusLive : copy.statusIdle}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    opacity: organized ? 0.8 : 0.4,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {["Data → Structure", "Manual → Auto", "Chaos → Order"].map(
                    (item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 8,
                          color: C.muted,
                          letterSpacing: 0.45,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
});
