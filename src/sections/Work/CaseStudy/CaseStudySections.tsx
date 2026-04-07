/**
 * @file CaseStudySections.tsx
 * @description Content sections: Problem, Impact, Decisions, Architecture, Results.
 * Each section includes its inline screenshot when available.
 */
"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Label } from "@/components/ui/Label";
import { TEXT } from "@/tokens/typography";
import type { Theme } from "@/tokens/themes";
import type { ProjectContent } from "@/data/content";
import { SNum } from "./SNum";
import { ContentCard } from "./ContentCard";
import { Screenshot } from "./Screenshot";

interface SectionsProps {
  project: ProjectContent & {
    caseStudy: NonNullable<ProjectContent["caseStudy"]>;
  };
  C: Theme;
  isMobile: boolean;
}

function SectionHeader({
  num,
  numColor,
  label,
  heading,
  sub,
  C,
  isMobile,
}: {
  num: string;
  numColor: string;
  label: string;
  heading: string;
  sub: string;
  C: Theme;
  isMobile: boolean;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <SNum n={num} color={numColor} />
        <Label c={C}>{label}</Label>
      </div>
      <h2
        style={{
          ...TEXT.sectionHeading(C, isMobile),
          marginBottom: 8,
          maxWidth: 600,
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: C.faint,
          marginBottom: isMobile ? 24 : 32,
        }}
      >
        {sub}
      </p>
    </>
  );
}

export function CaseStudySections({ project, C, isMobile }: SectionsProps) {
  const cs = project.caseStudy;
  const color = project.color;

  return (
    <>
      {/* ── PROBLEM ── */}
      <Section id="problem">
        <Container>
          <SectionHeader
            num="01"
            numColor={color}
            label="THE PROBLEM"
            heading="What was actually broken"
            sub={`${cs.problem.length} pain points identified before writing a single line of code`}
            C={C}
            isMobile={isMobile}
          />
          <ContentCard
            items={cs.problem}
            color={color}
            C={C}
            isMobile={isMobile}
          />
          {cs.screenshots[0] && (
            <div style={{ marginTop: isMobile ? 24 : 36 }}>
              <Screenshot
                screenshot={cs.screenshots[0]}
                color={color}
                C={C}
                isMobile={isMobile}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* ── IMPACT ── */}
      {cs.impact && cs.impact.length > 0 && (
        <>
          <div style={{ height: 1, background: C.line }} />
          <Section id="impact">
            <Container>
              <SectionHeader
                num="02"
                numColor="#E5484D"
                label="BUSINESS IMPACT"
                heading="What this was costing the business"
                sub="Real cost — not hypothetical risk"
                C={C}
                isMobile={isMobile}
              />
              <ContentCard
                items={cs.impact}
                color="#E5484D"
                C={C}
                variant="danger"
                isMobile={isMobile}
              />
              {cs.screenshots[1] && (
                <div style={{ marginTop: isMobile ? 24 : 36 }}>
                  <Screenshot
                    screenshot={cs.screenshots[1]}
                    color={color}
                    C={C}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </Container>
          </Section>
        </>
      )}

      {/* ── DECISIONS ── */}
      <div style={{ height: 1, background: C.line }} />
      <Section id="decisions">
        <Container>
          <SectionHeader
            num="03"
            numColor={color}
            label="STRUCTURAL DECISIONS"
            heading="Why these choices — not others"
            sub={`${cs.decisions.length} deliberate trade-offs`}
            C={C}
            isMobile={isMobile}
          />
          <ContentCard
            items={cs.decisions}
            color={color}
            C={C}
            isMobile={isMobile}
          />
          {cs.screenshots[2] && (
            <div style={{ marginTop: isMobile ? 24 : 36 }}>
              <Screenshot
                screenshot={cs.screenshots[2]}
                color={color}
                C={C}
                isMobile={isMobile}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* ── ARCHITECTURE ── */}
      <div style={{ height: 1, background: C.line }} />
      <Section id="architecture">
        <Container>
          <SectionHeader
            num="04"
            numColor={color}
            label="ARCHITECTURE"
            heading="How the system is structured"
            sub="The blueprint that holds everything together"
            C={C}
            isMobile={isMobile}
          />
          <ContentCard
            items={cs.architecture}
            color={color}
            C={C}
            isMobile={isMobile}
          />
          {cs.screenshots[3] && (
            <div style={{ marginTop: isMobile ? 24 : 36 }}>
              <Screenshot
                screenshot={cs.screenshots[3]}
                color={color}
                C={C}
                isMobile={isMobile}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* ── RESULTS ── */}
      <div style={{ height: 1, background: C.line }} />
      <section
        id="results"
        style={{
          paddingTop: isMobile ? 48 : 72,
          paddingBottom: isMobile ? 48 : 72,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}08, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
        <Container>
          <SectionHeader
            num="05"
            numColor="#3FB950"
            label="RESULTS"
            heading="What changed after shipping"
            sub={`${cs.results.length} measurable improvements`}
            C={C}
            isMobile={isMobile}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {cs.results.map((result, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "16px" : "20px 22px",
                  borderRadius: 12,
                  background: C.bg2,
                  borderTop: `1px solid ${C.line}`,
                  borderRight: `1px solid ${C.line}`,
                  borderBottom: `1px solid ${C.line}`,
                  borderLeft: `3px solid #3FB95060`,
                  transition: "all .25s",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = C.bg3;
                  e.currentTarget.style.borderTopColor = `#3FB95030`;
                  e.currentTarget.style.borderRightColor = `#3FB95030`;
                  e.currentTarget.style.borderBottomColor = `#3FB95030`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = C.bg2;
                  e.currentTarget.style.borderTopColor = C.line;
                  e.currentTarget.style.borderRightColor = C.line;
                  e.currentTarget.style.borderBottomColor = C.line;
                  e.currentTarget.style.borderLeftColor = `#3FB95060`;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: "#3FB95015",
                      border: "1px solid #3FB95030",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        color: "#3FB950",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: isMobile ? 13 : 14,
                      color: C.text,
                      lineHeight: 1.6,
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {result}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {cs.screenshots[4] && (
            <div style={{ marginTop: isMobile ? 24 : 36 }}>
              <Screenshot
                screenshot={cs.screenshots[4]}
                color={color}
                C={C}
                isMobile={isMobile}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
