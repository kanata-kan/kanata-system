/**
 * @file CaseStudyCTA.tsx
 * @description Closing CTA section for the case study page.
 */
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getProjects } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { getCaseStudyCopy } from "@/lib/caseStudyCopy";
import type { Theme } from "@/tokens/themes";

interface CaseStudyCTAProps {
  cta: string;
  color: string;
  currentSlug: string;
  C: Theme;
  isMobile: boolean;
}

export function CaseStudyCTA({
  cta,
  color,
  currentSlug,
  C,
  isMobile,
}: CaseStudyCTAProps) {
  const { locale } = useLocale();
  const copy = getCaseStudyCopy(locale);
  const localeProjects = getProjects(locale).filter(
    (project) => project.caseStudy,
  );
  const sourceProjects = localeProjects.some(
    (project) => project.slug === currentSlug,
  )
    ? localeProjects
    : getProjects("en").filter((project) => project.caseStudy);
  const currentIndex = sourceProjects.findIndex(
    (project) => project.slug === currentSlug,
  );
  const nextProject =
    currentIndex >= 0
      ? sourceProjects[(currentIndex + 1) % sourceProjects.length]
      : undefined;
  const nextProjectLink =
    nextProject && nextProject.slug !== currentSlug ? nextProject : undefined;

  return (
    <section
      style={{
        paddingTop: isMobile ? 56 : 80,
        paddingBottom: isMobile ? 56 : 80,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}10, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <Container>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 3,
            color: C.faint,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {copy.cta.eyebrow}
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: isMobile ? 22 : 32,
            color: C.text,
            letterSpacing: -1,
            lineHeight: 1.35,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}
        >
          {cta}
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {nextProjectLink && (
            <Link
              href={`/${locale}/work/${nextProjectLink.slug}`}
              prefetch={false}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 1.4,
                padding: "11px 24px",
                borderRadius: 8,
                background: color,
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all .25s",
                maxWidth: isMobile ? "100%" : 280,
                lineHeight: 1.5,
                textAlign: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 28px ${color}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {copy.cta.nextProject(nextProjectLink.name)}
            </Link>
          )}
          <Link
            href={`/${locale}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 2,
              padding: "11px 24px",
              borderRadius: 8,
              border: `1px solid ${C.line}`,
              color: C.muted,
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.border2;
              e.currentTarget.style.color = C.sub;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = C.line;
              e.currentTarget.style.color = C.muted;
            }}
          >
            {copy.cta.backHome}
          </Link>
          <Link
            href={`/${locale}/how-i-start`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 2,
              padding: "11px 24px",
              borderRadius: 8,
              border: `1px solid ${C.cyan}50`,
              color: C.cyan,
              background: `${C.cyan}08`,
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = C.cyan;
              e.currentTarget.style.color = C.bg;
              e.currentTarget.style.borderColor = C.cyan;
              e.currentTarget.style.boxShadow = `0 4px 16px ${C.cyan}30`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = `${C.cyan}08`;
              e.currentTarget.style.color = C.cyan;
              e.currentTarget.style.borderColor = `${C.cyan}50`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {copy.cta.startConversation}
          </Link>
        </div>
      </Container>
    </section>
  );
}
