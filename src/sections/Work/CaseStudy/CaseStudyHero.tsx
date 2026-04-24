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

        {/* Direct links */}
        {(project.liveUrl || project.repoUrl) && (
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  padding: "6px 16px",
                  borderRadius: 6,
                  border: `1px solid ${color}40`,
                  color,
                  background: `${color}08`,
                  textDecoration: "none",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = `${color}18`;
                  e.currentTarget.style.borderColor = `${color}70`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = `${color}08`;
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.transform = "none";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                LIVE SITE ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  padding: "6px 16px",
                  borderRadius: 6,
                  border: `1px solid ${C.border2}`,
                  color: C.muted,
                  background: C.bg2,
                  textDecoration: "none",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = C.sub;
                  e.currentTarget.style.color = C.text;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = C.border2;
                  e.currentTarget.style.color = C.muted;
                  e.currentTarget.style.transform = "none";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                SOURCE CODE ↗
              </a>
            )}
          </div>
        )}

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
              paddingInlineEnd: isMobile ? 0 : 24,
              borderInlineEnd: isMobile ? "none" : `1px solid ${C.line}`,
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
