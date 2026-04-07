/**
 * @file CaseStudyPage.tsx
 * @description Orchestrator — composes modular case study sections.
 * All sub-components live in ./CaseStudy/ directory.
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import type { ProjectContent } from "@/data/content";
import { CaseStudyHero } from "./CaseStudy/CaseStudyHero";
import { CaseStudySections } from "./CaseStudy/CaseStudySections";
import { CaseStudyCTA } from "./CaseStudy/CaseStudyCTA";
import { TechnicalDeepDive } from "./CaseStudy/TechnicalDeepDive";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

interface Props {
  project: ProjectContent & {
    caseStudy: NonNullable<ProjectContent["caseStudy"]>;
  };
}

export function CaseStudyPage({ project }: Props) {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <div style={{ minHeight: "100vh" }}>
      <ReadingProgress color={project.color} />
      <CaseStudyHero project={project} C={C} isMobile={isMobile} />
      <div style={{ height: 1, background: C.line }} />
      <CaseStudySections project={project} C={C} isMobile={isMobile} />
      {project.caseStudy.technicalDeepDive && (
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
      <div style={{ height: 1, background: C.line }} />
      <CaseStudyCTA
        cta={project.caseStudy.cta}
        color={project.color}
        C={C}
        isMobile={isMobile}
      />
    </div>
  );
}
