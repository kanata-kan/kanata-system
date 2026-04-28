/**
 * @file HeroSystemTransform.tsx
 * @description Premium interactive chaos → system visualization for the Hero section.
 * Demonstrates the Product Engineer's core value: turning messy operations
 * into structured, reliable systems.
 *
 * Animations powered by Framer Motion:
 *   - Spring physics for node & connection movement
 *   - Data-flow dots traveling along organized connections
 *   - Pulsing glow rings on organized nodes
 *   - Floating particles in chaos state
 *   - Blueprint scan line in organized state
 *   - Animated status label with AnimatePresence
 *
 * Trigger: hover (desktop) / tap (touch).
 * Architecture: inline styles, theme tokens, reusable sub-components.
 */
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "@/hooks/useTheme";
import type { Theme } from "@/tokens/themes";
import { WindowDots } from "@/components/ui/WindowDots";

/* ══════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════ */

interface NodeData {
  id: string;
  label: string;
  col: number;
  row: number;
  /** Deterministic chaos offsets (no Math.random → SSR-safe) */
  chaos: { dx: number; dy: number; rotate: number };
}

interface ConnectionData {
  from: string;
  to: string;
}

/* ══════════════════════════════════════════════
   DATA — real operational modules & data-flow
   ══════════════════════════════════════════════ */

const NODES: NodeData[] = [
  {
    id: "inventory",
    label: "Inventory",
    col: 0,
    row: 0,
    chaos: { dx: -12, dy: 20, rotate: -10 },
  },
  {
    id: "pricing",
    label: "Pricing",
    col: 1,
    row: 0,
    chaos: { dx: 25, dy: -22, rotate: 8 },
  },
  {
    id: "orders",
    label: "Orders",
    col: 2,
    row: 0,
    chaos: { dx: -18, dy: -18, rotate: -6 },
  },
  {
    id: "reports",
    label: "Reports",
    col: 0,
    row: 1,
    chaos: { dx: 18, dy: 15, rotate: 10 },
  },
  {
    id: "automation",
    label: "Automation",
    col: 1,
    row: 1,
    chaos: { dx: -22, dy: -10, rotate: -8 },
  },
  {
    id: "dashboard",
    label: "Dashboard",
    col: 2,
    row: 1,
    chaos: { dx: 12, dy: 20, rotate: 12 },
  },
];

const CONNECTIONS: ConnectionData[] = [
  { from: "inventory", to: "orders" },
  { from: "pricing", to: "orders" },
  { from: "orders", to: "reports" },
  { from: "orders", to: "automation" },
  { from: "reports", to: "dashboard" },
  { from: "automation", to: "dashboard" },
];

/** Deterministic floating particles for the chaos state */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: ((i * 47 + 15) % 310) + 10,
  y: ((i * 41 + 25) % 220) + 10,
  size: 1.5 + (i % 3),
}));

/* ══════════════════════════════════════════════
   LAYOUT CONSTANTS
   ══════════════════════════════════════════════ */

const CANVAS_W = 330;
const CANVAS_H = 240;
const NODE_W = 78;
const NODE_H = 44;
const COLS = 3;
const ROWS = 2;

/** Spring config — slight overshoot for satisfying snap-into-place feel */
const SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 18,
  mass: 1,
};

/* ══════════════════════════════════════════════
   POSITION HELPERS
   ══════════════════════════════════════════════ */

/** Top-left position of a node in the organized grid */
function gridPos(col: number, row: number) {
  const cellW = CANVAS_W / COLS;
  const cellH = CANVAS_H / ROWS;
  return {
    x: col * cellW + (cellW - NODE_W) / 2,
    y: row * cellH + (cellH - NODE_H) / 2,
  };
}

/** Center position of a grid cell (for connection endpoints) */
function gridCenter(col: number, row: number) {
  const cellW = CANVAS_W / COLS;
  const cellH = CANVAS_H / ROWS;
  return {
    cx: col * cellW + cellW / 2,
    cy: row * cellH + cellH / 2,
  };
}

/* ══════════════════════════════════════════════
   REUSABLE COMPONENT: SystemNode
   Spring-animated card with glow ring & floating effect.
   Outer: position + rotation (spring).
   Middle: gentle floating oscillation in chaos.
   Inner: visual card + glow ring.
   ══════════════════════════════════════════════ */

function SystemNode({
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
  const grid = gridPos(node.col, node.row);
  const delay = index * 0.06;

  return (
    /* Position + rotation layer (spring physics) */
    <motion.div
      animate={{
        x: organized ? grid.x : grid.x + node.chaos.dx,
        y: organized ? grid.y : grid.y + node.chaos.dy,
        rotate: organized ? 0 : node.chaos.rotate,
        scale: organized ? 1 : 0.96,
      }}
      transition={{ ...SPRING, delay }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: NODE_W,
        height: NODE_H,
        zIndex: 2,
      }}
    >
      {/* Floating oscillation layer — gentle drift in chaos, stops when organized */}
      <motion.div
        animate={
          organized ? { x: 0, y: 0 } : { x: [0, 3, -2, 0], y: [0, -3, 2, 0] }
        }
        transition={
          organized
            ? { duration: 0.3 }
            : {
                duration: 3.5 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* Glow ring — pulses when organized */}
        <motion.div
          animate={{
            opacity: organized ? [0.15, 0.4, 0.15] : 0,
            scale: organized ? [1, 1.1, 1] : 0.9,
          }}
          transition={{
            duration: 2.5,
            repeat: organized ? Infinity : 0,
            ease: "easeInOut",
            delay: organized ? index * 0.15 : 0,
          }}
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: 11,
            border: `1px solid ${C.cyan}`,
            pointerEvents: "none",
          }}
        />

        {/* Card body */}
        <motion.div
          animate={{
            backgroundColor: organized ? C.bg3 : C.card,
            borderColor: organized ? C.border2 : C.border,
            boxShadow: organized
              ? `0 0 24px -6px ${C.cyan}30`
              : "0 0 0 0 transparent",
          }}
          transition={{ duration: 0.5, delay }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            border: "1px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.span
            animate={{ color: organized ? C.text : C.muted }}
            transition={{ duration: 0.5, delay }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: 0.5,
              userSelect: "none",
            }}
          >
            {node.label}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   REUSABLE COMPONENT: SystemConnection
   Spring-animated SVG line + data-flow dot.
   Endpoints follow node chaos offsets so lines
   move in sync with nodes.
   ══════════════════════════════════════════════ */

function SystemConnection({
  from,
  to,
  organized,
  C,
  index,
}: {
  from: NodeData;
  to: NodeData;
  organized: boolean;
  C: Theme;
  index: number;
}) {
  const fc = gridCenter(from.col, from.row);
  const tc = gridCenter(to.col, to.row);

  /* Initial chaos positions — used as `initial` to prevent "undefined" warnings */
  const chaosX1 = fc.cx + from.chaos.dx;
  const chaosY1 = fc.cy + from.chaos.dy;
  const chaosX2 = tc.cx + to.chaos.dx;
  const chaosY2 = tc.cy + to.chaos.dy;

  const x1 = organized ? fc.cx : chaosX1;
  const y1 = organized ? fc.cy : chaosY1;
  const x2 = organized ? tc.cx : chaosX2;
  const y2 = organized ? tc.cy : chaosY2;

  return (
    <>
      {/* Connection line — spring-animated endpoints */}
      <motion.line
        initial={{
          x1: chaosX1,
          y1: chaosY1,
          x2: chaosX2,
          y2: chaosY2,
          stroke: C.muted,
          strokeWidth: 0.8,
          strokeOpacity: 0.1,
        }}
        animate={{
          x1,
          y1,
          x2,
          y2,
          stroke: organized ? C.cyan : C.muted,
          strokeWidth: organized ? 1.5 : 0.8,
          strokeOpacity: organized ? 0.45 : 0.1,
        }}
        strokeLinecap="round"
        transition={{ ...SPRING, delay: index * 0.05 }}
      />

      {/* Data-flow dot — travels along connection when organized */}
      <motion.circle
        r={2.5}
        fill={C.cyan}
        initial={{ cx: chaosX1, cy: chaosY1, opacity: 0 }}
        animate={
          organized
            ? {
                cx: [fc.cx, tc.cx],
                cy: [fc.cy, tc.cy],
                opacity: [0, 0.8, 0.8, 0],
              }
            : { cx: chaosX1, cy: chaosY1, opacity: 0 }
        }
        transition={
          organized
            ? {
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1 + index * 0.35,
              }
            : { duration: 0.3 }
        }
      />
    </>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════ */

export function HeroSystemTransform() {
  const { C } = useThemeContext();
  const [organized, setOrganized] = useState(false);

  /** Quick lookup: node id → node data */
  const nodeMap = useMemo(() => {
    const m = new Map<string, NodeData>();
    NODES.forEach((n) => m.set(n.id, n));
    return m;
  }, []);

  return (
    <div
      className="rv d4"
      style={{ width: "100%", animation: "fadeUp .5s ease .4s both" }}
    >
      {/* Gradient border — vivid animated cyan/purple gradient */}
      <motion.div
        animate={{
          background: organized
            ? `linear-gradient(145deg, ${C.cyan}60, ${C.border2}, ${C.purple}40, ${C.border})`
            : `linear-gradient(145deg, ${C.border}, transparent 60%, ${C.border})`,
        }}
        transition={{ duration: 0.8 }}
        style={{ borderRadius: 16, padding: 1, position: "relative" }}
      >
        {/* Outer glow — visible when organized */}
        <motion.div
          animate={{
            opacity: organized ? 1 : 0,
            boxShadow: organized
              ? `0 0 40px -8px ${C.cyan}30, 0 0 80px -16px ${C.purple}20`
              : "0 0 0 0 transparent",
          }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{
            backgroundColor: C.bg2,
            boxShadow: organized
              ? `${C.shadow}, 0 0 60px -8px ${C.cyan}12, inset 0 1px 0 0 ${C.cyan}08`
              : `${C.shadow}, 0 0 60px -12px rgba(59,130,246,0.08)`,
          }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: 15,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* ── Title bar (IDE window chrome) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderBottom: `1px solid ${C.line}`,
              background: C.bg3,
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
              system-map.ts
            </span>

            {/* Online indicator — appears when system is organized */}
            <AnimatePresence>
              {organized && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginInlineStart: "auto",
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.green,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: C.green,
                      letterSpacing: 0.5,
                    }}
                  >
                    online
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ── Interactive canvas — hover to organize ── */}
          <div
            onMouseEnter={() => setOrganized(true)}
            onMouseLeave={() => setOrganized(false)}
            onClick={() => setOrganized((p) => !p)}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              padding: "16px 0",
              cursor: "pointer",
            }}
          >
            {/* Blueprint grid background */}
            <motion.div
              animate={{ opacity: organized ? 1 : 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: [
                  `linear-gradient(${C.gridLine} 1px, transparent 1px)`,
                  `linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                ].join(", "),
                backgroundSize: "28px 28px",
                pointerEvents: "none",
              }}
            />

            {/* Scan line — system initialization sweep */}
            <AnimatePresence>
              {organized && (
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, CANVAS_H + 32], opacity: [0, 0.5, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${C.cyan}25, transparent)`,
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Chaos particles — floating noise dots */}
            <AnimatePresence>
              {!organized &&
                PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{
                      x: [p.x, p.x + 18, p.x - 10, p.x],
                      y: [p.y, p.y - 12, p.y + 8, p.y],
                      opacity: [0.08, 0.22, 0.08],
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{
                      duration: 4 + p.id * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: p.size,
                      height: p.size,
                      borderRadius: "50%",
                      background: C.muted,
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />
                ))}
            </AnimatePresence>

            {/* Fixed-size canvas: nodes + connections */}
            <div
              style={{
                position: "relative",
                width: CANVAS_W,
                height: CANVAS_H,
              }}
            >
              {/* SVG connections layer */}
              <svg
                viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                {CONNECTIONS.map(({ from, to }, i) => (
                  <SystemConnection
                    key={`${from}-${to}`}
                    from={nodeMap.get(from)!}
                    to={nodeMap.get(to)!}
                    organized={organized}
                    C={C}
                    index={i}
                  />
                ))}
              </svg>

              {/* Nodes layer */}
              {NODES.map((node, i) => (
                <SystemNode
                  key={node.id}
                  node={node}
                  organized={organized}
                  C={C}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ── Status bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderTop: `1px solid ${C.line}`,
              minHeight: 36,
            }}
          >
            {/* Animated state label — slides vertically on toggle */}
            <div
              style={{ position: "relative", height: 14, overflow: "hidden" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={organized ? "system" : "chaos"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: 1.5,
                    fontWeight: 600,
                    color: organized ? C.cyan : C.faint,
                    userSelect: "none",
                    display: "block",
                  }}
                >
                  {organized ? "→ SYSTEM" : "CHAOS →"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Micro-copy — slides up and fades in when organized */}
            <motion.div
              animate={{
                opacity: organized ? 0.7 : 0,
                y: organized ? 0 : 4,
              }}
              transition={{
                duration: 0.5,
                delay: organized ? 0.3 : 0,
              }}
              style={{ display: "flex", gap: 12 }}
            >
              {["Manual → Auto", "Errors → Safe", "Blind → Clear"].map(
                (text) => (
                  <span
                    key={text}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color: C.muted,
                      letterSpacing: 0.5,
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {text}
                  </span>
                ),
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
