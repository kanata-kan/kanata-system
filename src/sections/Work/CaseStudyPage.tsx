/**
 * @file CaseStudyPage.tsx
 * @description Orchestrator that composes the guided case study flow.
 */
"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { getProjectBySlug } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
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
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const copy = getCaseStudyCopy(locale);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const localizedProject =
    getProjectBySlug(project.slug, locale) ?? getProjectBySlug(project.slug, "en");
  const activeProject =
    localizedProject && localizedProject.caseStudy
      ? (localizedProject as typeof project)
      : project;

  return (
    <div style={{ minHeight: "100vh" }}>
      <ReadingProgress color={activeProject.color} />
      <CaseStudyHero project={activeProject} C={C} isMobile={isMobile} />
      <div style={{ height: 1, background: C.line }} />
      <CaseStudySections project={activeProject} C={C} isMobile={isMobile} />
      <CaseStudyCTA
        cta={activeProject.caseStudy.cta}
        color={activeProject.color}
        currentSlug={activeProject.slug}
        C={C}
        isMobile={isMobile}
      />
      {activeProject.caseStudy.technicalDeepDive && (
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
                  {copy.page.technicalEyebrow}
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
                  {copy.page.technicalBody}
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
                    border: `1px solid ${activeProject.color}35`,
                    color: activeProject.color,
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = `${activeProject.color}10`;
                    e.currentTarget.style.borderColor = `${activeProject.color}55`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = `${activeProject.color}35`;
                  }}
                >
                  {showTechnicalDetails
                    ? copy.page.hideTechnical
                    : copy.page.viewTechnical}
                </button>
              </div>
            </Container>
          </section>
          {showTechnicalDetails && (
            <>
              <div style={{ height: 1, background: C.line }} />
              <TechnicalDeepDive
                data={activeProject.caseStudy.technicalDeepDive}
                color={activeProject.color}
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
