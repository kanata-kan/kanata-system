/**
 * @file CaseStudyPage.tsx
 * @description Orchestrator that composes the guided case study flow.
 */
"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { ProjectContent } from "@/data/content";
import { CaseStudyHero } from "./CaseStudy/CaseStudyHero";
import { CaseStudySections } from "./CaseStudy/CaseStudySections";
import { CaseStudyCTA } from "./CaseStudy/CaseStudyCTA";
import { TechnicalDeepDive } from "./CaseStudy/TechnicalDeepDive";

interface Props {
  project: ProjectContent & {
    caseStudy: NonNullable<ProjectContent["caseStudy"]>;
  };
}

export function CaseStudyPage({ project }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ReadingProgress color={project.color} />
      <CaseStudyHero project={project} C={C} isMobile={isMobile} />
      <div style={{ height: 1, background: C.line }} />
      <CaseStudySections project={project} C={C} isMobile={isMobile} />
      <CaseStudyCTA
        cta={project.caseStudy.cta}
        color={project.color}
        currentSlug={project.slug}
        C={C}
        isMobile={isMobile}
      />
      {project.caseStudy.technicalDeepDive && (
        <>
          <div style={{ height: 1, background: C.line }} />
          <section
            style={{
              paddingTop: isMobile ? 40 : 56,
              paddingBottom: isMobile ? 40 : 56,
            }}
          >
            <Container>
              <div
                style={{
                  maxWidth: 620,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: 2,
                    color: C.faint,
                    textTransform: "uppercase",
                  }}
                >
                  Technical Deep Dive
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: isMobile ? 14 : 15,
                    color: C.sub,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Detailed architecture, guarantees, and code paths stay
                  available for engineers without overwhelming the main story.
                </p>
                <button
                  type="button"
                  aria-expanded={showTechnicalDetails}
                  onClick={() =>
                    setShowTechnicalDetails((current) => !current)
                  }
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: 1.4,
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: `1px solid ${project.color}35`,
                    color: project.color,
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = `${project.color}10`;
                    e.currentTarget.style.borderColor = `${project.color}55`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = `${project.color}35`;
                  }}
                >
                  {showTechnicalDetails
                    ? "Hide Technical Details"
                    : "View Technical Details"}
                </button>
              </div>
            </Container>
          </section>
          {showTechnicalDetails && (
            <>
              <div style={{ height: 1, background: C.line }} />
              <TechnicalDeepDive
                data={project.caseStudy.technicalDeepDive}
                color={project.color}
                C={C}
                isMobile={isMobile}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
