/**
 * @file WorkFeaturedCard.tsx
 * @description Featured project card with stronger recruiter-facing structure.
 */

import Link from "next/link";
import type { Theme } from "@/tokens/themes";
import type { Project } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { WindowDots } from "@/components/ui/WindowDots";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";

interface WorkFeaturedCardProps {
  C: Theme;
  p: Project;
  isMobile: boolean;
}

export function WorkFeaturedCard({ C, p, isMobile }: WorkFeaturedCardProps) {
  const { locale } = useLocale();
  const copy =
    locale === "ar"
      ? {
          problem: "المشكلة",
          solution: "الحل",
          decisions: "القرارات",
          impact: "الأثر",
          techStack: "التقنيات",
          projectSnapshot: "لمحة عن المشروع",
          recruiterSnapshot: "خلاصة سريعة",
          whyItMatters: "لماذا هذا المشروع مهم",
          viewCaseStudy: "عرض دراسة الحالة",
          structureNote: "منظم حول المشكلة والحل والقرارات والأثر",
          viewProject: "عرض المشروع",
        }
      : locale === "fr"
        ? {
            problem: "Probleme",
            solution: "Solution",
            decisions: "Decisions",
            impact: "Impact",
            techStack: "Tech Stack",
            projectSnapshot: "Apercu Projet",
            recruiterSnapshot: "Apercu Rapide",
            whyItMatters: "Pourquoi Ce Projet Compte",
            viewCaseStudy: "Voir l'etude de cas",
            structureNote:
              "Structure autour du probleme, de la solution, des decisions et de l'impact",
            viewProject: "Voir le projet",
          }
        : {
            problem: "Problem",
            solution: "Solution",
            decisions: "Key Decisions",
            impact: "Impact",
            techStack: "Tech Stack",
            projectSnapshot: "Project Snapshot",
            recruiterSnapshot: "Recruiter Snapshot",
            whyItMatters: "Why This Project Matters",
            viewCaseStudy: "View Case Study",
            structureNote:
              "Structured around problem, solution, decisions, and impact",
            viewProject: "View Project",
          };

  const snapshotSections = p.caseStudy
    ? [
        {
          title: copy.problem,
          items: p.caseStudy.problem.slice(0, 2),
          accent: "#E5484D",
        },
        {
          title: copy.solution,
          items: [p.longDesc, p.caseStudy.architecture[0]].filter(Boolean),
          accent: p.color,
        },
        {
          title: copy.decisions,
          items: p.caseStudy.decisions.slice(0, 2),
          accent: C.cyan,
        },
        {
          title: copy.impact,
          items: p.caseStudy.results.slice(0, 2),
          accent: p.statusColor,
        },
      ]
    : [];

  return (
    <div
      style={{
        background: isMobile ? `${C.bg}ee` : C.bg2,
        border: isMobile ? `2px solid ${p.color}40` : `1px solid ${p.color}30`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: isMobile
          ? `0 4px 24px ${p.color}12`
          : `0 0 40px ${p.color}06`,
        transition: "border-color .3s,background .35s",
        marginBottom: 14,
      }}
    >
      <Stack
        direction="row"
        justify="space-between"
        align="center"
        wrap
        gap="md"
        style={{
          padding: isMobile ? "14px 18px" : "18px 28px",
          background: C.bg3,
          borderBottom: `1px solid ${C.line}`,
          transition: "background .35s",
        }}
      >
        <Stack direction="row" align="center" gap="lg">
          <WindowDots />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: C.muted,
              letterSpacing: 0.5,
            }}
          >
            {p.link}
          </span>
        </Stack>
        <Stack direction="row" align="center" gap="md">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: 2,
              color: p.statusColor,
              background: p.statusColor + "15",
              border: `1px solid ${p.statusColor}30`,
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            • {p.status}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: C.faint,
              letterSpacing: 1,
            }}
          >
            {p.year}
          </span>
        </Stack>
      </Stack>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        }}
      >
        <div
          style={{
            padding: isMobile ? 26 : 36,
            borderInlineEnd: isMobile ? "none" : `1px solid ${C.line}`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: p.color,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            {p.type}
          </span>
          <h3
            style={{
              ...TEXT.projectTitle(C, isMobile),
              marginBottom: 14,
            }}
          >
            {p.name}
          </h3>
          <p
            style={{
              ...TEXT.body(C),
              color: C.sub,
              marginBottom: 12,
            }}
          >
            {p.desc}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: C.muted,
              lineHeight: 1.75,
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: 24,
            }}
          >
            “{p.longDesc}”
          </p>

          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                ...TEXT.monoLabel(C),
                marginBottom: 12,
              }}
            >
              {copy.techStack}
            </div>
            <Stack direction="column" gap="sm">
              {Object.entries(p.stack).map(([group, items]) => (
                <div
                  key={group}
                  style={{
                    padding: isMobile ? "12px 14px" : "10px 0",
                    borderRadius: isMobile ? 8 : 0,
                    background: isMobile ? C.bg2 : "transparent",
                    border: isMobile ? `1px solid ${C.line}` : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: 1,
                      color: p.color,
                      textTransform: "uppercase",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: isMobile ? 8 : 4,
                    }}
                  >
                    {group}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                    }}
                  >
                    {items.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: isMobile ? 10 : 9,
                          padding: "4px 8px",
                          borderRadius: 4,
                          border: `1px solid ${C.line}`,
                          color: C.text,
                          background: C.bg,
                          transition: "background .35s",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Stack>
          </div>

          {isMobile && snapshotSections.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  ...TEXT.monoLabel(C),
                  marginBottom: 12,
                }}
              >
                {copy.projectSnapshot}
              </div>
              {/* Snapshot sections — compact cards with strong visual hierarchy */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 8,
                }}
              >
                {snapshotSections.map((section, idx) => (
                  <div
                    key={section.title}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      background: C.bg2,
                      border: `1px solid ${section.accent}50`,
                      borderLeft: `3px solid ${section.accent}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          background: section.accent,
                          color: "#fff",
                          fontSize: 10,
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: 1.5,
                          color: section.accent,
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {section.title}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {section.items.map((item) => (
                        <span
                          key={`${section.title}-${item}`}
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: C.text,
                            display: "block",
                          }}
                        >
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {p.caseStudy ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "flex-start",
              }}
            >
              <Link
                href={`/work/${p.slug}`}
                prefetch={false}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 2,
                  padding: isMobile ? "14px 24px" : "12px 28px",
                  borderRadius: 8,
                  border: `1px solid ${p.color}60`,
                  color: p.color,
                  background: `linear-gradient(135deg, ${p.color}12, ${p.color}08)`,
                  transition: "all .25s",
                  textDecoration: "none",
                  fontWeight: 600,
                  width: isMobile ? "100%" : "auto",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${p.color}28, ${p.color}18)`;
                  e.currentTarget.style.boxShadow = `0 6px 24px ${p.color}35`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${p.color}12, ${p.color}08)`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {copy.viewCaseStudy.toUpperCase()}{" "}
                <span style={{ fontSize: 15 }}>→</span>
              </Link>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: 1,
                  color: C.faint,
                  textAlign: isMobile ? "center" : undefined,
                }}
              >
                {copy.structureNote}
              </span>
            </div>
          ) : (
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 2,
                padding: isMobile ? "14px 24px" : "10px 20px",
                borderRadius: 6,
                border: `1px solid ${p.color}50`,
                color: p.color,
                background: p.color + "10",
                transition: "all .2s",
                cursor: "pointer",
                width: isMobile ? "100%" : "auto",
                justifyContent: "center",
              }}
            >
              {copy.viewProject.toUpperCase()}{" "}
              <span style={{ fontSize: 14 }}>↗</span>
            </button>
          )}
        </div>

        {!isMobile && (
          <div
            style={{
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                ...TEXT.monoLabel(C),
                marginBottom: 2,
              }}
            >
              {copy.recruiterSnapshot}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
              }}
            >
              {snapshotSections.map((section) => (
                <div
                  key={section.title}
                  style={{
                    padding: "16px 18px",
                    borderRadius: 12,
                    background: C.bg3,
                    border: `1px solid ${C.border}`,
                    transition: "background .35s",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: 1.5,
                      color: section.accent,
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {section.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {section.items.map((item) => (
                      <div
                        key={`${section.title}-${item}`}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: section.accent,
                            marginTop: 8,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            ...TEXT.bodySmall(C),
                            color: C.sub,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "16px 18px",
                borderRadius: 12,
                background: p.color + "10",
                border: `1px solid ${p.color}25`,
              }}
            >
              <div
                style={{
                  ...TEXT.monoLabel(C),
                  color: p.color,
                  marginBottom: 10,
                }}
              >
                {copy.whyItMatters}
              </div>
              <p
                style={{
                  ...TEXT.bodySmall(C),
                  color: C.sub,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {p.caseStudy ? p.caseStudy.cta : p.longDesc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
