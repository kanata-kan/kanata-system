/**
 * @file TechnicalDeepDive.tsx
 * @description Technical deep dive section for case study pages.
 * Designed for CTO-level audience: clean, structured, scannable.
 * Sub-sections: ERD, Architecture, Execution Flow, Guarantees, Code Snippets.
 */
"use client";

import { Container } from "@/components/layout/Container";
import { Label } from "@/components/ui/Label";
import { useLocale } from "@/hooks/useLocale";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
import type { Theme } from "@/tokens/themes";
import type { TechnicalDeepDive as TDD } from "@/data/content/types";
import { SNum } from "./SNum";

interface Props {
  data: TDD;
  color: string;
  C: Theme;
  isMobile: boolean;
}

/* ── Entity type → accent color mapping ── */
const TYPE_COLORS: Record<string, string> = {
  core: "#3B82F6",
  transaction: "#F59E0B",
  financial: "#10B981",
  audit: "#8B5CF6",
};

/* ══════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════ */

/* ── ERD Entity Card ── */
function EntityCard({
  name,
  desc,
  type,
  typeLabel,
  ssot,
  central,
  C,
  isMobile,
}: {
  name: string;
  desc: string;
  type: string;
  typeLabel: string;
  ssot?: string;
  central?: boolean;
  C: Theme;
  isMobile: boolean;
}) {
  const accent = TYPE_COLORS[type] || C.cyan;
  return (
    <div
      style={{
        padding: isMobile ? "14px 16px" : "16px 20px",
        borderRadius: 10,
        background: central ? `${accent}06` : C.bg2,
        borderInlineEnd: central
          ? `1.5px solid ${accent}30`
          : `1px solid ${C.line}`,
        borderBottom: central
          ? `1.5px solid ${accent}30`
          : `1px solid ${C.line}`,
        borderInlineStart: central
          ? `1.5px solid ${accent}30`
          : `1px solid ${C.line}`,
        borderTop: `3px solid ${accent}${central ? "" : "60"}`,
        transition: "all .25s",
        cursor: "default",
        boxShadow: central ? `0 0 20px ${accent}08` : "none",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderInlineEndColor = `${accent}40`;
        e.currentTarget.style.borderBottomColor = `${accent}40`;
        e.currentTarget.style.borderInlineStartColor = `${accent}40`;
        e.currentTarget.style.background = C.bg3;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderInlineEndColor = C.line;
        e.currentTarget.style.borderBottomColor = C.line;
        e.currentTarget.style.borderInlineStartColor = C.line;
        e.currentTarget.style.borderTopColor = `${accent}60`;
        e.currentTarget.style.background = C.bg2;
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 600,
            color: C.text,
            letterSpacing: 0.3,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: 1.5,
            color: accent,
            textTransform: "uppercase",
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          {typeLabel}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isMobile ? 11 : 12,
          color: C.muted,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {desc}
      </p>
      {ssot && (
        <div
          style={{
            marginTop: 10,
            padding: "4px 8px",
            borderRadius: 4,
            background: `${accent}08`,
            border: `1px dashed ${accent}30`,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: accent,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              letterSpacing: 1,
              color: accent,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {ssot}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Relationship Row ── */
function RelationshipRow({
  from,
  to,
  label,
  cardinality,
  C,
  color,
}: {
  from: string;
  to: string;
  label: string;
  cardinality: string;
  C: Theme;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <span style={{ color: C.text, fontWeight: 500, minWidth: 50 }}>
        {from}
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: `${color}80`,
          fontSize: 10,
          letterSpacing: 1,
        }}
      >
        ──
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: `${color}`,
            background: `${color}12`,
            border: `1px solid ${color}25`,
            padding: "1px 6px",
            borderRadius: 3,
            fontWeight: 600,
          }}
        >
          {cardinality}
        </span>
        ──▸
      </span>
      <span style={{ color: C.text, fontWeight: 500 }}>{to}</span>
      <span
        style={{
          color: C.faint,
          fontSize: 9,
          marginLeft: 6,
          fontStyle: "italic",
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Architecture Block ── */
function ArchBlock({
  title,
  why,
  impact,
  points,
  index,
  C,
  color,
  isMobile,
}: {
  title: string;
  why: string;
  impact: string;
  points: string[];
  index: number;
  C: Theme;
  color: string;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        padding: isMobile ? "18px 16px" : "22px 24px",
        borderRadius: 12,
        background: C.bg2,
        borderTop: `1px solid ${C.line}`,
        borderInlineEnd: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        borderInlineStart: `3px solid ${color}50`,
        transition: "all .25s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = C.bg3;
        e.currentTarget.style.borderTopColor = `${color}30`;
        e.currentTarget.style.borderInlineEndColor = `${color}30`;
        e.currentTarget.style.borderBottomColor = `${color}30`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = C.bg2;
        e.currentTarget.style.borderTopColor = C.line;
        e.currentTarget.style.borderInlineEndColor = C.line;
        e.currentTarget.style.borderBottomColor = C.line;
        e.currentTarget.style.borderInlineStartColor = `${color}50`;
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color,
            fontWeight: 600,
            opacity: 0.6,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 600,
            color: C.text,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
      </div>
      {why && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            color,
            opacity: 0.8,
            fontStyle: "italic",
            marginBottom: 4,
            paddingInlineStart: 28,
          }}
        >
          → {why}
        </div>
      )}
      {impact && (
        <div
          style={{
            fontFamily: "var(--font-mono",
            fontSize: 9,
            color: C.faint,
            letterSpacing: 0.5,
            marginBottom: 12,
            paddingInlineStart: 28,
            opacity: 0.7,
          }}
        >
          IMPACT: {impact}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {points.map((p, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: `${color}60`,
                flexShrink: 0,
                marginTop: 7,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: isMobile ? 12 : 13,
                color: C.sub,
                lineHeight: 1.6,
              }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Flow Step ── */
function FlowStep({
  step,
  desc,
  index,
  total,
  C,
  color,
  isMobile,
}: {
  step: string;
  desc: string;
  index: number;
  total: number;
  C: Theme;
  color: string;
  isMobile: boolean;
}) {
  const isLast = index === total - 1;
  return (
    <div style={{ display: "flex", gap: isMobile ? 14 : 18 }}>
      {/* Timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 28,
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `${color}15`,
            border: `2px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              color,
            }}
          >
            {index + 1}
          </span>
        </div>
        {/* Line */}
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 20,
              background: `linear-gradient(to bottom, ${color}30, ${C.line})`,
            }}
          />
        )}
      </div>
      {/* Content */}
      <div
        style={{
          paddingBottom: isLast ? 0 : isMobile ? 16 : 20,
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 600,
            color: C.text,
            marginBottom: 4,
            letterSpacing: 0.3,
          }}
        >
          {step}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 11 : 12,
            color: C.muted,
            lineHeight: 1.55,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

/* ── Guarantee Card ── */
function GuaranteeCard({
  title,
  desc,
  C,
  isMobile,
}: {
  title: string;
  desc: string;
  C: Theme;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        padding: isMobile ? "16px" : "20px 22px",
        borderRadius: 12,
        background: C.bg2,
        borderTop: `1px solid ${C.line}`,
        borderInlineEnd: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        borderInlineStart: "3px solid #10B98160",
        transition: "all .25s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = C.bg3;
        e.currentTarget.style.borderTopColor = "#10B98130";
        e.currentTarget.style.borderInlineEndColor = "#10B98130";
        e.currentTarget.style.borderBottomColor = "#10B98130";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = C.bg2;
        e.currentTarget.style.borderTopColor = C.line;
        e.currentTarget.style.borderInlineEndColor = C.line;
        e.currentTarget.style.borderBottomColor = C.line;
        e.currentTarget.style.borderInlineStartColor = "#10B98160";
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "#10B98115",
            border: "1px solid #10B98130",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          <span style={{ color: "#10B981", fontSize: 11, fontWeight: 700 }}>
            ✓
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 600,
              color: C.text,
              marginBottom: 4,
              letterSpacing: 0.3,
            }}
          >
            {title}
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: isMobile ? 11 : 12,
              color: C.muted,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Code Snippet Block ── */
function CodeBlock({
  label,
  lines,
  C,
  isMobile,
}: {
  label: string;
  lines: string[];
  C: Theme;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "clip",
        border: `1px solid ${C.line}`,
        background: C.bg2,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "8px 14px",
          background: C.bg3,
          borderBottom: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {[1, 2, 3].map((d) => (
          <div
            key={d}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: d === 1 ? "#FF5F57" : d === 2 ? "#FEBC2E" : "#28C840",
              opacity: 0.5,
            }}
          />
        ))}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: C.faint,
            marginLeft: 6,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      </div>
      {/* Code lines */}
      <div
        style={{
          padding: isMobile ? "12px 14px" : "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowX: "auto",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: C.faint,
                opacity: 0.4,
                userSelect: "none",
                minWidth: 16,
                textAlign: "right",
              }}
            >
              {i + 1}
            </span>
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? 10 : 11,
                color: C.sub,
                lineHeight: 1.8,
                whiteSpace: "pre",
              }}
            >
              {line}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION HEADER HELPER
   ══════════════════════════════════════════ */
function SubHeader({
  num,
  label,
  color,
  C,
  isMobile,
  heading,
}: {
  num: string;
  label: string;
  color: string;
  C: Theme;
  isMobile: boolean;
  heading: string;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <SNum n={num} color={color} />
        <Label c={C}>{label}</Label>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: isMobile ? 20 : 26,
          color: C.text,
          letterSpacing: -0.8,
          lineHeight: 1.2,
          marginBottom: isMobile ? 20 : 28,
        }}
      >
        {heading}
      </h3>
    </>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export function TechnicalDeepDive({ data, color, C, isMobile }: Props) {
  const { locale } = useLocale();
  const copy = getCaseStudyCopy(locale);

  return (
    <section
      id="technical-deep-dive"
      style={{
        paddingTop: isMobile ? 48 : 72,
        paddingBottom: isMobile ? 48 : 72,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}06, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <Container>
        {/* ── Section Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <SNum n="06" color={color} />
          <Label c={C}>{copy.technical.label}</Label>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: isMobile ? 26 : 38,
            color: C.text,
            letterSpacing: -1.5,
            lineHeight: 1.15,
            marginBottom: 8,
            maxWidth: 600,
          }}
        >
          {data.sectionTitle}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: C.faint,
            marginBottom: isMobile ? 36 : 52,
            maxWidth: 500,
          }}
        >
          {data.sectionSubtitle}
        </p>

        {/* ═══ 1. ERD ═══ */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SubHeader
            num="6.1"
            label={copy.technical.dataModel}
            color={color}
            C={C}
            isMobile={isMobile}
            heading={data.erdTitle}
          />

          {/* Entity grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(220px, 1fr))",
              gap: isMobile ? 10 : 12,
              marginBottom: isMobile ? 20 : 28,
            }}
          >
            {data.entities.map((e) => (
              <EntityCard
                key={e.name}
                name={e.name}
                desc={e.desc}
                type={e.type}
                typeLabel={
                  copy.technical.types[
                    e.type as keyof typeof copy.technical.types
                  ] ?? e.type
                }
                ssot={e.ssot}
                central={e.central}
                C={C}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Relationships */}
          <div
            style={{
              padding: isMobile ? "14px 16px" : "18px 24px",
              borderRadius: 10,
              background: C.bg2,
              border: `1px solid ${C.line}`,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: 2,
                color: C.faint,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {copy.technical.relationships}
            </div>
            {data.relationships.map((r, i) => (
              <RelationshipRow
                key={i}
                from={r.from}
                to={r.to}
                label={r.label}
                cardinality={r.cardinality}
                C={C}
                color={color}
              />
            ))}
          </div>
        </div>

        {/* ═══ 2. Architecture ═══ */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SubHeader
            num="6.2"
            label={copy.technical.architecture}
            color={color}
            C={C}
            isMobile={isMobile}
            heading={data.archTitle}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {data.archBlocks.map((block, i) => (
              <ArchBlock
                key={i}
                title={block.title}
                why={block.why}
                impact={block.impact}
                points={block.points}
                index={i}
                C={C}
                color={color}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* ═══ 3. Execution Flow ═══ */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SubHeader
            num="6.3"
            label={copy.technical.executionFlow}
            color={color}
            C={C}
            isMobile={isMobile}
            heading={data.flowTitle}
          />
          <div
            style={{
              padding: isMobile ? "18px 16px" : "24px 28px",
              borderRadius: 12,
              background: C.bg2,
              border: `1px solid ${C.line}`,
            }}
          >
            {data.flowSteps.map((s, i) => (
              <FlowStep
                key={i}
                step={s.step}
                desc={s.desc}
                index={i}
                total={data.flowSteps.length}
                C={C}
                color={color}
                isMobile={isMobile}
              />
            ))}
          </div>
          {/* Transaction note */}
          <div
            style={{
              marginTop: 14,
              padding: isMobile ? "10px 14px" : "12px 18px",
              borderRadius: 8,
              background: `${color}06`,
              border: `1px dashed ${color}25`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color,
                fontWeight: 700,
                letterSpacing: 1,
                flexShrink: 0,
              }}
            >
              {copy.technical.note}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                color: C.muted,
                lineHeight: 1.5,
              }}
            >
              {data.flowNote}
            </span>
          </div>
        </div>

        {/* ═══ 4. System Guarantees ═══ */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SubHeader
            num="6.4"
            label={copy.technical.guarantees}
            color="#10B981"
            C={C}
            isMobile={isMobile}
            heading={data.guaranteesTitle}
          />
          {(["data", "financial", "transaction"] as const).map((cat) => {
            const items = data.guarantees.filter((g) => g.category === cat);
            if (items.length === 0) return null;
            const catLabel =
              cat === "data"
                ? copy.technical.dataIntegrity
                : cat === "financial"
                  ? copy.technical.financialAccuracy
                  : copy.technical.transactionSafety;
            const catColor =
              cat === "data"
                ? "#3B82F6"
                : cat === "financial"
                  ? "#F59E0B"
                  : "#10B981";
            return (
              <div key={cat} style={{ marginBottom: isMobile ? 14 : 18 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    letterSpacing: 2,
                    color: catColor,
                    textTransform: "uppercase",
                    marginBottom: 8,
                    paddingLeft: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 2,
                      background: catColor,
                      borderRadius: 1,
                      opacity: 0.6,
                    }}
                  />
                  {catLabel}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? 10 : 14,
                  }}
                >
                  {items.map((g, i) => (
                    <GuaranteeCard
                      key={i}
                      title={g.title}
                      desc={g.desc}
                      C={C}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ 5. Code Snippets ═══ */}
        <div>
          <SubHeader
            num="6.5"
            label={copy.technical.dataFlow}
            color={color}
            C={C}
            isMobile={isMobile}
            heading={data.codeTitle}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: isMobile ? 12 : 14,
            }}
          >
            {data.codeSnippets.map((s, i) => (
              <CodeBlock
                key={i}
                label={s.label}
                lines={s.lines}
                C={C}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* ═══ 6. Trade-offs ═══ */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <SubHeader
            num="6.6"
            label={copy.technical.tradeoffs}
            color={color}
            C={C}
            isMobile={isMobile}
            heading={data.tradeoffsTitle}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 10 : 12,
            }}
          >
            {data.tradeoffs.map((t, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "14px 16px" : "16px 22px",
                  borderRadius: 10,
                  background: C.bg2,
                  border: `1px solid ${C.line}`,
                  transition: "all .25s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = C.bg3;
                  e.currentTarget.style.borderColor = `${color}25`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = C.bg2;
                  e.currentTarget.style.borderColor = C.line;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#10B981",
                      background: "#10B98112",
                      border: "1px solid #10B98125",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {t.chose}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: C.faint,
                      opacity: 0.5,
                    }}
                  >
                    {copy.technical.over}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: C.muted,
                      background: `${C.line}`,
                      padding: "2px 8px",
                      borderRadius: 4,
                      textDecoration: "line-through",
                      opacity: 0.6,
                    }}
                  >
                    {t.over}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: isMobile ? 11 : 12,
                    color: C.sub,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {t.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 7. System Principles ═══ */}
        <div
          style={{
            marginTop: isMobile ? 40 : 56,
            padding: isMobile ? "20px 18px" : "28px 32px",
            borderRadius: 14,
            background: C.bg2,
            borderTop: `1px solid ${C.line}`,
            borderInlineEnd: `1px solid ${C.line}`,
            borderBottom: `1px solid ${C.line}`,
            borderInlineStart: `3px solid ${color}`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: 2,
              color,
              textTransform: "uppercase",
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: `${color}15`,
                border: `1px solid ${color}30`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
                color,
              }}
            >
              ≡
            </span>
            {data.principlesTitle}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {data.principles.map((p, i) => {
              const [title, ...rest] = p.split(" \u2014 ");
              const detail = rest.join(" \u2014 ");
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color,
                      fontWeight: 700,
                      marginTop: 2,
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ lineHeight: 1.55 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: isMobile ? 11 : 12,
                        fontWeight: 600,
                        color: C.text,
                      }}
                    >
                      {title}
                    </span>
                    {detail && (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: isMobile ? 11 : 12,
                          color: C.muted,
                        }}
                      >
                        {" \u2014 "}
                        {detail}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
