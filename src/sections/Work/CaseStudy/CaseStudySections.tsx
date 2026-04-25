/**
 * @file CaseStudySections.tsx
 * @description Guided case study flow organized by context, solution,
 * system, and results with progressive disclosure per section.
 */
"use client";

import { useState } from "react";
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

const DEFAULT_VISIBLE_ITEMS = 4;

type ExpandableSectionKey =
  | "problem"
  | "impact"
  | "decisions"
  | "architecture"
  | "results";

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
          maxWidth: 640,
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
          maxWidth: 620,
        }}
      >
        {sub}
      </p>
    </>
  );
}

function ToggleButton({
  expanded,
  onToggle,
  color,
}: {
  expanded: boolean;
  onToggle: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        alignSelf: "flex-start",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 1.2,
        color,
        background: "transparent",
        border: `1px solid ${color}35`,
        borderRadius: 999,
        padding: "8px 14px",
        cursor: "pointer",
        transition: "all .2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.borderColor = `${color}60`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = `${color}35`;
      }}
    >
      {expanded ? "Show less" : "Show more"}
    </button>
  );
}

function BlockIntro({
  id,
  label,
  heading,
  sub,
  C,
  isMobile,
}: {
  id: string;
  label: string;
  heading: string;
  sub: string;
  C: Theme;
  isMobile: boolean;
}) {
  return (
    <div id={id}>
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
        {label}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: isMobile ? 22 : 26,
          lineHeight: 1.15,
          letterSpacing: -1,
          color: C.text,
          marginBottom: 8,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: C.faint,
          lineHeight: 1.6,
          marginBottom: 18,
          maxWidth: 560,
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export function CaseStudySections({ project, C, isMobile }: SectionsProps) {
  const cs = project.caseStudy;
  const color = project.color;
  const [expandedSections, setExpandedSections] = useState<
    Record<ExpandableSectionKey, boolean>
  >({
    problem: false,
    impact: false,
    decisions: false,
    architecture: false,
    results: false,
  });

  const toggleSection = (key: ExpandableSectionKey) => {
    setExpandedSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const getVisibleItems = (items: string[], expanded: boolean) =>
    expanded ? items : items.slice(0, DEFAULT_VISIBLE_ITEMS);

  const visibleProblem = getVisibleItems(cs.problem, expandedSections.problem);
  const visibleImpact = getVisibleItems(cs.impact, expandedSections.impact);
  const visibleDecisions = getVisibleItems(
    cs.decisions,
    expandedSections.decisions,
  );
  const visibleArchitecture = getVisibleItems(
    cs.architecture,
    expandedSections.architecture,
  );
  const visibleResults = getVisibleItems(cs.results, expandedSections.results);
  const contextCount = cs.problem.length + cs.impact.length;

  return (
    <>
      <Section id="context">
        <Container>
          <SectionHeader
            num="01"
            numColor={color}
            label="CONTEXT"
            heading="Start with the situation before the implementation"
            sub={`${contextCount} signals frame the real scope before the solution appears`}
            C={C}
            isMobile={isMobile}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 32 : 40,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <BlockIntro
                id="problem"
                label="Problem"
                heading="What needed to change"
                sub={`${cs.problem.length} friction points identified before moving into execution`}
                C={C}
                isMobile={isMobile}
              />
              <ContentCard
                items={visibleProblem}
                color={color}
                C={C}
                isMobile={isMobile}
              />
              {cs.problem.length > DEFAULT_VISIBLE_ITEMS && (
                <ToggleButton
                  expanded={expandedSections.problem}
                  onToggle={() => toggleSection("problem")}
                  color={color}
                />
              )}
              {cs.screenshots[0] && (
                <div style={{ marginTop: isMobile ? 4 : 8 }}>
                  <Screenshot
                    screenshot={cs.screenshots[0]}
                    color={color}
                    C={C}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>

            {cs.impact.length > 0 && (
              <>
                <div style={{ height: 1, background: C.line }} />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <BlockIntro
                    id="impact"
                    label="Impact"
                    heading="Why it mattered to the business"
                    sub={`${cs.impact.length} business consequences made the problem impossible to ignore`}
                    C={C}
                    isMobile={isMobile}
                  />
                  <ContentCard
                    items={visibleImpact}
                    color="#E5484D"
                    C={C}
                    variant="danger"
                    isMobile={isMobile}
                  />
                  {cs.impact.length > DEFAULT_VISIBLE_ITEMS && (
                    <ToggleButton
                      expanded={expandedSections.impact}
                      onToggle={() => toggleSection("impact")}
                      color="#E5484D"
                    />
                  )}
                  {cs.screenshots[1] && (
                    <div style={{ marginTop: isMobile ? 4 : 8 }}>
                      <Screenshot
                        screenshot={cs.screenshots[1]}
                        color={color}
                        C={C}
                        isMobile={isMobile}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Container>
      </Section>

      <Section id="solution">
        <Container>
          <SectionHeader
            num="02"
            numColor={color}
            label="SOLUTION"
            heading="Move from diagnosis into deliberate decisions"
            sub={`${cs.decisions.length} trade-offs explain how the solution took shape`}
            C={C}
            isMobile={isMobile}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <BlockIntro
              id="decisions"
              label="Decisions"
              heading="Why these choices held up"
              sub="A focused view of the structural decisions that shaped the final system."
              C={C}
              isMobile={isMobile}
            />
            <ContentCard
              items={visibleDecisions}
              color={color}
              C={C}
              isMobile={isMobile}
            />
            {cs.decisions.length > DEFAULT_VISIBLE_ITEMS && (
              <ToggleButton
                expanded={expandedSections.decisions}
                onToggle={() => toggleSection("decisions")}
                color={color}
              />
            )}
            {cs.screenshots[2] && (
              <div style={{ marginTop: isMobile ? 4 : 8 }}>
                <Screenshot
                  screenshot={cs.screenshots[2]}
                  color={color}
                  C={C}
                  isMobile={isMobile}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section id="system">
        <Container>
          <SectionHeader
            num="03"
            numColor={color}
            label="SYSTEM"
            heading="Keep the architecture readable at a glance"
            sub="A shorter systems view up front, with deeper engineering details available later."
            C={C}
            isMobile={isMobile}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <BlockIntro
              id="architecture"
              label="Architecture"
              heading="How the core pieces fit together"
              sub={`${cs.architecture.length} structural patterns describe the blueprint without dropping into full technical depth`}
              C={C}
              isMobile={isMobile}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  !isMobile && cs.screenshots[3]
                    ? "minmax(0, 1.1fr) minmax(280px, 0.9fr)"
                    : "1fr",
                gap: isMobile ? 18 : 24,
                alignItems: "start",
              }}
            >
              <ContentCard
                items={visibleArchitecture}
                color={color}
                C={C}
                isMobile={isMobile}
              />
              {cs.screenshots[3] && (
                <div>
                  <Screenshot
                    screenshot={cs.screenshots[3]}
                    color={color}
                    C={C}
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>
            {cs.architecture.length > DEFAULT_VISIBLE_ITEMS && (
              <ToggleButton
                expanded={expandedSections.architecture}
                onToggle={() => toggleSection("architecture")}
                color={color}
              />
            )}
          </div>
        </Container>
      </Section>

      <section
        id="results"
        style={{
          paddingTop: isMobile ? 48 : 72,
          paddingBottom: isMobile ? 48 : 72,
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${C.line}`,
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
            num="04"
            numColor="#3FB950"
            label="RESULTS"
            heading="What changed after shipping"
            sub={`${cs.results.length} measurable improvements surface the outcome without forcing a deep read`}
            C={C}
            isMobile={isMobile}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <BlockIntro
              id="results-summary"
              label="Results"
              heading="What improved after launch"
              sub="A concise outcome layer first, with the full set available on demand."
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
              {visibleResults.map((result) => (
                <div
                  key={result}
                  style={{
                    padding: isMobile ? "16px" : "20px 22px",
                    borderRadius: 12,
                    background: C.bg2,
                    borderTop: `1px solid ${C.line}`,
                    borderInlineEnd: `1px solid ${C.line}`,
                    borderBottom: `1px solid ${C.line}`,
                    borderInlineStart: "3px solid #3FB95060",
                    transition: "all .25s",
                    position: "relative",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = C.bg3;
                    e.currentTarget.style.borderTopColor = "#3FB95030";
                    e.currentTarget.style.borderInlineEndColor = "#3FB95030";
                    e.currentTarget.style.borderBottomColor = "#3FB95030";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = C.bg2;
                    e.currentTarget.style.borderTopColor = C.line;
                    e.currentTarget.style.borderInlineEndColor = C.line;
                    e.currentTarget.style.borderBottomColor = C.line;
                    e.currentTarget.style.borderInlineStartColor = "#3FB95060";
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
                        +
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
            {cs.results.length > DEFAULT_VISIBLE_ITEMS && (
              <ToggleButton
                expanded={expandedSections.results}
                onToggle={() => toggleSection("results")}
                color="#3FB950"
              />
            )}
            {cs.screenshots[4] && (
              <div style={{ marginTop: isMobile ? 4 : 8 }}>
                <Screenshot
                  screenshot={cs.screenshots[4]}
                  color={color}
                  C={C}
                  isMobile={isMobile}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
