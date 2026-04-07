/**
 * @file work/[slug]/page.tsx
 * @description Dynamic route for project case studies.
 * Fetches project by slug, renders CaseStudyPage section.
 * Returns notFound() if project or case study doesn't exist.
 */
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { CaseStudyPage } from "@/sections/Work/CaseStudyPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function WorkCaseStudy({ params }: Props) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const projectWithStudy = project as typeof project & {
    caseStudy: NonNullable<typeof project.caseStudy>;
  };

  return <CaseStudyPage project={projectWithStudy} />;
}
