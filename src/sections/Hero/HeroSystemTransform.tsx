"use client";

import { memo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";
import type { Theme } from "@/tokens/themes";
import { WindowDots } from "@/components/ui/WindowDots";

interface NodeData {
  id: string;
  label: string;
  col: number;
  row: number;
  chaos: { dx: number; dy: number; rotate: number };
}

interface LinkData {
  from: string;
  to: string;
}

const CANVAS_W = 330;
const CANVAS_H = 248;
const NODE_W = 78;
const NODE_H = 44;
const COLS = 3;
const ROWS = 2;

const SPRING = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

const NODES: NodeData[] = [
  {
    id: "inventory",
    label: "Inventory",
    col: 0,
    row: 0,
    chaos: { dx: -18, dy: 18, rotate: -9 },
  },
  {
    id: "pricing",
    label: "Pricing",
    col: 1,
    row: 0,
    chaos: { dx: 22, dy: -16, rotate: 7 },
  },
  {
    id: "orders",
    label: "Orders",
    col: 2,
    row: 0,
    chaos: { dx: -14, dy: -18, rotate: -6 },
  },
  {
    id: "reports",
    label: "Reports",
    col: 0,
    row: 1,
    chaos: { dx: 14, dy: 16, rotate: 8 },
  },
  {
    id: "automation",
    label: "Automation",
    col: 1,
    row: 1,
    chaos: { dx: -18, dy: -10, rotate: -7 },
  },
  {
    id: "dashboard",
    label: "Dashboard",
    col: 2,
    row: 1,
    chaos: { dx: 12, dy: 18, rotate: 9 },
  },
];

const SYSTEM_LINKS: LinkData[] = [
  { from: "inventory", to: "orders" },
  { from: "pricing", to: "orders" },
  { from: "orders", to: "automation" },
  { from: "orders", to: "reports" },
  { from: "automation", to: "dashboard" },
  { from: "reports", to: "dashboard" },
];

const FLOW_LINKS: LinkData[] = [
  { from: "inventory", to: "orders" },
  { from: "orders", to: "automation" },
  { from: "automation", to: "dashboard" },
];

const CHAOS_MARKS = [
  { x: 26, y: 32, w: 52, h: 1 },
  { x: 236, y: 42, w: 36, h: 1 },
  { x: 58, y: 186, w: 28, h: 1 },
  { x: 248, y: 172, w: 44, h: 1 },
];

const COPY = {
  en: {
    headerIdle: "hover preview",
    headerLive: "signal aligned",
    cue: "Hover to align",
    cueSub: "preview.organize()",
    statusIdle: "HOVER TO ALIGN",
    statusLive: "SYSTEM READY",
    aria: "Hover to align the system preview",
  },
  fr: {
    headerIdle: "apercu au survol",
    headerLive: "signal aligne",
    cue: "Survolez pour aligner",
    cueSub: "preview.organize()",
    statusIdle: "SURVOLER POUR ALIGNER",
    statusLive: "SYSTEME PRET",
    aria: "Survolez pour aligner l'aperçu du systeme",
  },
  ar: {
    headerIdle: "معاينة تفاعلية",
    headerLive: "الإشارة منتظمة",
    cue: "مرر للترتيب",
    cueSub: "preview.organize()",
    statusIdle: "مرر للترتيب",
    statusLive: "النظام جاهز",
    aria: "مرر لترتيب معاينة النظام",
  },
} as const;

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

  return {
    x: x + NODE_W / 2,
    y: y + NODE_H / 2,
  };
}

function chaosCenter(node: NodeData) {
  const center = gridCenter(node.col, node.row);

  return {
    x: center.x + node.chaos.dx,
    y: center.y + node.chaos.dy,
  };
}

function renderLinks(
  links: LinkData[],
  nodeMap: Map<string, NodeData>,
  getPoint: (node: NodeData) => { x: number; y: number },
  color: string,
  opacity: number,
  dashArray?: string,
) {
  return links.map(({ from, to }) => {
    const fromNode = nodeMap.get(from);
    const toNode = nodeMap.get(to);

    if (!fromNode || !toNode) return null;

    const start = getPoint(fromNode);
    const end = getPoint(toNode);

    return (
      <line
        key={`${from}-${to}-${color}`}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="1.35"
        strokeOpacity={opacity}
        strokeLinecap="round"
        strokeDasharray={dashArray}
      />
    );
  });
}

function pulsePoint(link: LinkData, index: number, organized: boolean) {
  const fromNode = NODE_MAP.get(link.from);
  const toNode = NODE_MAP.get(link.to);

  if (!fromNode || !toNode) return null;

  const from = gridCenter(fromNode.col, fromNode.row);
  const to = gridCenter(toNode.col, toNode.row);

  return (
    <m.span
      key={`${link.from}-${link.to}`}
      aria-hidden="true"
      animate={
        organized
          ? {
              opacity: [0, 0.88, 0.88, 0],
              x: [from.x - 5, to.x - 5],
              y: [from.y - 5, to.y - 5],
              scale: [0.9, 1, 0.9],
            }
          : {
              opacity: 0,
              x: from.x - 5,
              y: from.y - 5,
              scale: 0.85,
            }
      }
      transition={
        organized
          ? {
              duration: 2,
              delay: 0.4 + index * 0.35,
              ease: "linear",
              repeat: Infinity,
            }
          : { duration: 0.2 }
      }
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "currentColor",
        color: "inherit",
        willChange: "transform, opacity",
        boxShadow: "0 0 16px currentColor",
        zIndex: 4,
      }}
    />
  );
}

const NODE_MAP = new Map<string, NodeData>(
  NODES.map((node) => [node.id, node] as const),
);

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
      animate={{
        x: organized ? base.x : base.x + node.chaos.dx,
        y: organized ? base.y : base.y + node.chaos.dy,
        rotate: organized ? 0 : node.chaos.rotate,
        scale: organized ? 1 : 0.97,
      }}
      transition={{ ...SPRING, delay: index * 0.04 }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: NODE_W,
        height: NODE_H,
        willChange: "transform",
        zIndex: 3,
      }}
    >
      <m.div
        animate={{
          borderColor: organized ? C.border2 : C.border,
          backgroundColor: organized ? C.bg3 : C.card,
          opacity: organized ? 1 : 0.95,
        }}
        transition={{ duration: 0.28 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          border: "1px solid",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <m.div
          animate={{ opacity: organized ? 1 : 0.2, scaleX: organized ? 1 : 0.45 }}
          transition={{ duration: 0.28 }}
          style={{
            position: "absolute",
            insetInline: 10,
            top: 8,
            height: 2,
            transformOrigin: "left center",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
          }}
        />
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
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: 0.45,
              color: organized ? C.text : C.muted,
              userSelect: "none",
            }}
          >
            {node.label}
          </span>
        </div>
      </m.div>
    </m.div>
  );
});

export const HeroSystemTransform = memo(function HeroSystemTransform() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const [hovered, setHovered] = useState(false);
  const [locked, setLocked] = useState(false);
  const organized = hovered || locked;
  const copy = COPY[locale];
  const isArabic = locale === "ar";
  const labelFont = isArabic ? "var(--font-arabic)" : "var(--font-mono)";
  const labelSpacing = isArabic ? 0 : 0.5;
  const statusSpacing = isArabic ? 0 : 1.3;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="rv d4" style={{ width: "100%" }}>
        <div style={{ position: "relative" }}>
          <m.div
            animate={{ opacity: organized ? 0.95 : 0.3 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: 28,
              background: `radial-gradient(circle at 30% 30%, ${C.cyan}18, transparent 52%), radial-gradient(circle at 78% 70%, ${C.purple}12, transparent 45%)`,
              filter: "blur(26px)",
              pointerEvents: "none",
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
                  system-map.ts
                </span>

                <div
                  style={{
                    marginInlineStart: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    opacity: organized ? 1 : 0.78,
                    transform: `translateY(${organized ? 0 : 1}px)`,
                    transition: "opacity .24s ease, transform .24s ease",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: organized ? C.green : C.amber,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: labelFont,
                      fontSize: 9,
                      color: organized ? C.green : C.amber,
                      letterSpacing: labelSpacing,
                    }}
                  >
                    {organized ? copy.headerLive : copy.headerIdle}
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-pressed={locked}
                aria-label={copy.aria}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                onClick={() => setLocked((current) => !current)}
                style={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  border: "none",
                  padding: "18px 18px 86px",
                  background: "transparent",
                  textAlign: "inherit",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                <m.div
                  animate={{ opacity: organized ? 0.9 : 0.42 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${C.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                    pointerEvents: "none",
                  }}
                />

                <m.div
                  animate={{ opacity: organized ? 1 : 0.92 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    inset: "16px 16px 64px",
                    borderRadius: 22,
                    border: `1px solid ${organized ? C.border2 : C.border}`,
                    background: `radial-gradient(circle at 18% 18%, ${C.cyan}16, transparent 34%), linear-gradient(180deg, ${C.bg2}, ${C.bg3})`,
                    pointerEvents: "none",
                  }}
                />

                <m.div
                  animate={{ opacity: organized ? 0 : 0.65 }}
                  transition={{ duration: 0.24 }}
                  style={{
                    position: "absolute",
                    inset: "28px 20px 92px",
                    pointerEvents: "none",
                  }}
                >
                  {CHAOS_MARKS.map((mark, index) => (
                    <span
                      key={index}
                      style={{
                        position: "absolute",
                        left: mark.x,
                        top: mark.y,
                        width: mark.w,
                        height: mark.h,
                        background: C.faint,
                        opacity: 0.65,
                      }}
                    />
                  ))}
                </m.div>

                <div
                  style={{
                    position: "relative",
                    width: CANVAS_W,
                    height: CANVAS_H,
                    marginInline: "auto",
                    color: C.cyan,
                    contain: "layout paint",
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
                    }}
                  >
                    <m.g
                      animate={{ opacity: organized ? 0 : 1 }}
                      transition={{ duration: 0.22 }}
                    >
                      {renderLinks(
                        SYSTEM_LINKS,
                        NODE_MAP,
                        chaosCenter,
                        C.muted,
                        0.18,
                        "4 7",
                      )}
                    </m.g>

                    <m.g
                      animate={{ opacity: organized ? 1 : 0 }}
                      transition={{ duration: 0.28, delay: organized ? 0.08 : 0 }}
                    >
                      {renderLinks(
                        SYSTEM_LINKS,
                        NODE_MAP,
                        (node) => gridCenter(node.col, node.row),
                        C.cyan,
                        0.5,
                      )}
                    </m.g>
                  </svg>

                  {FLOW_LINKS.map((link, index) =>
                    pulsePoint(link, index, organized),
                  )}

                  {NODES.map((node, index) => (
                    <SystemNode
                      key={node.id}
                      node={node}
                      organized={organized}
                      C={C}
                      index={index}
                    />
                  ))}

                  <m.div
                    aria-hidden="true"
                    animate={
                      organized
                        ? { opacity: [0, 0.8, 0], y: [0, CANVAS_H - 12] }
                        : { opacity: 0, y: 0 }
                    }
                    transition={
                      organized
                        ? {
                            duration: 2.2,
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: 0.7,
                          }
                        : { duration: 0.18 }
                    }
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 1,
                      background: `linear-gradient(90deg, transparent, ${C.cyan}30, transparent)`,
                      pointerEvents: "none",
                      zIndex: 5,
                    }}
                  />
                </div>

                <m.div
                  aria-hidden="true"
                  animate={
                    organized
                      ? { opacity: 0, y: 10, scale: 0.96 }
                      : {
                          opacity: [0.84, 1, 0.84],
                          y: [0, -4, 0],
                          scale: [0.985, 1, 0.985],
                        }
                  }
                  transition={
                    organized
                      ? { duration: 0.2, ease: "easeOut" }
                      : {
                          duration: 2.8,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }
                  }
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
                  }}
                >
                  <m.div
                    animate={
                      organized
                        ? { opacity: 0, scaleY: 0.7 }
                        : { opacity: [0.18, 0.42, 0.18], scaleY: [0.84, 1, 0.84] }
                    }
                    transition={
                      organized
                        ? { duration: 0.16 }
                        : {
                            duration: 2.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }
                    }
                    style={{
                      width: 1,
                      height: 28,
                      transformOrigin: "center bottom",
                      background: `linear-gradient(180deg, transparent, ${C.cyan}, transparent)`,
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
              </button>

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
                    letterSpacing: statusSpacing,
                    color: organized ? C.cyan : C.faint,
                    transition: "color .22s ease",
                    userSelect: "none",
                  }}
                >
                  {organized ? copy.statusLive : copy.statusIdle}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    opacity: organized ? 0.72 : 0.36,
                    transition: "opacity .22s ease",
                  }}
                >
                  {["Manual -> Auto", "Errors -> Safe", "Blind -> Clear"].map(
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
