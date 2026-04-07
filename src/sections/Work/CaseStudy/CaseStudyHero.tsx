/**
 * @file CaseStudyHero.tsx
 * @description Hero section for the case study page.
 */
"use client";

import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/layout/Container";
import type { Theme } from "@/tokens/themes";
import type { ProjectContent } from "@/data/content";

interface CaseStudyHeroProps {
  project: ProjectContent & {
    caseStudy: NonNullable<ProjectContent["caseStudy"]>;
  };
  C: Theme;
  isMobile: boolean;
}

export function CaseStudyHero({ project, C, isMobile }: CaseStudyHeroProps) {
  const cs = project.caseStudy;
  const color = project.color;

  return (
    <section
      style={{
        paddingTop: isMobile ? 90 : 120,
        paddingBottom: isMobile ? 40 : 56,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: "-10%",
          width: isMobile ? 300 : 600,
          height: isMobile ? 300 : 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}12, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.glow2}, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <Container>
        {/* Back */}
        <Link
          href="/#work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: 2,
            color: C.faint,
            textDecoration: "none",
            marginBottom: isMobile ? 32 : 48,
            transition: "color .2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = color)}
          onMouseOut={(e) => (e.currentTarget.style.color = C.faint)}
        >
          ← BACK
        </Link>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              color,
            }}
          >
            {project.n}
          </span>
          <div style={{ width: 1, height: 14, background: C.line }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: 1,
              color: C.muted,
            }}
          >
            {project.type}
          </span>
          <div style={{ width: 1, height: 14, background: C.line }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: C.muted,
            }}
          >
            {project.year}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: 1.5,
              color: project.statusColor,
              background: `${project.statusColor}12`,
              border: `1px solid ${project.statusColor}25`,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            ● {project.status}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: isMobile ? 30 : 52,
            letterSpacing: -2,
            color: C.text,
            lineHeight: 1.1,
            maxWidth: 750,
            marginBottom: 18,
          }}
        >
          {cs.headline}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? 14 : 17,
            color: C.sub,
            lineHeight: 1.7,
            maxWidth: 620,
            marginBottom: 28,
            fontWeight: 300,
          }}
        >
          {cs.subtitle}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          {cs.tags.map((tag) => (
            <Tag key={tag} color={color}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Stats + Stack — side by side on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
            gap: isMobile ? 16 : 24,
            padding: isMobile ? 16 : 24,
            borderRadius: 14,
            border: `1px solid ${C.line}`,
            background: C.bg2,
            transition: "background .35s",
          }}
        >
          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? 20 : 28,
              flexWrap: "wrap",
              alignItems: "center",
              paddingRight: isMobile ? 0 : 24,
              borderRight: isMobile ? "none" : `1px solid ${C.line}`,
              paddingBottom: isMobile ? 12 : 0,
              borderBottom: isMobile ? `1px solid ${C.line}` : "none",
            }}
          >
            {[
              { v: cs.problem.length, l: "Problems" },
              { v: cs.decisions.length, l: "Decisions" },
              { v: cs.results.length, l: "Results" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center", minWidth: 50 }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: isMobile ? 22 : 28,
                    fontStyle: "italic",
                    color,
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    letterSpacing: 2,
                    color: C.faint,
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Object.entries(project.stack).map(([group, items]) => (
              <div
                key={group}
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    letterSpacing: 1.5,
                    color,
                    textTransform: "uppercase",
                    minWidth: 52,
                    opacity: 0.7,
                  }}
                >
                  {group}
                </span>
                {items.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 4,
                      border: `1px solid ${C.line}`,
                      color: C.muted,
                      background: C.bg3,
                      transition: "background .35s",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
