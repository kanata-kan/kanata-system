/**
 * @file WorkFeaturedCard.tsx
 * @description Featured project card with stronger recruiter-facing structure.
 */

import Link from "next/link";
import type { Theme } from "@/tokens/themes";
import type { Project } from "@/data/projects";
import { WindowDots } from "@/components/ui/WindowDots";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";

interface WorkFeaturedCardProps {
  C: Theme;
  p: Project;
  isMobile: boolean;
}

export function WorkFeaturedCard({ C, p, isMobile }: WorkFeaturedCardProps) {
  const snapshotSections = p.caseStudy
    ? [
        {
          title: "Problem",
          items: p.caseStudy.problem.slice(0, 2),
          accent: "#E5484D",
        },
        {
          title: "Solution",
          items: [p.longDesc, p.caseStudy.architecture[0]].filter(Boolean),
          accent: p.color,
        },
        {
          title: "Key Decisions",
          items: p.caseStudy.decisions.slice(0, 2),
          accent: C.cyan,
        },
        {
          title: "Impact",
          items: p.caseStudy.results.slice(0, 2),
          accent: p.statusColor,
        },
      ]
    : [];

  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${p.color}30`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: `0 0 40px ${p.color}06`,
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
            padding: isMobile ? 22 : 36,
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
              fontWeight: 300,
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
              Tech Stack
            </div>
            <Stack direction="column" gap="sm">
              {Object.entries(p.stack).map(([group, items]) => (
                <div
                  key={group}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: 1,
                      color: p.color,
                      textTransform: "uppercase",
                      minWidth: 52,
                      flexShrink: 0,
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
                        padding: "3px 9px",
                        borderRadius: 4,
                        border: `1px solid ${C.line}`,
                        color: C.muted,
                        background: C.bg,
                        transition: "background .35s",
                      }}
                    >
                      {t}
                    </span>
                  ))}
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
                Project Snapshot
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 10,
                }}
              >
                {snapshotSections.map((section) => (
                  <div
                    key={section.title}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: C.bg,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: 1.5,
                        color: section.accent,
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      {section.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {section.items.map((item) => (
                        <span
                          key={`${section.title}-${item}`}
                          style={{
                            ...TEXT.bodySmall(C),
                            color: C.sub,
                            display: "block",
                          }}
                        >
                          {item}
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
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 2,
                  padding: "12px 28px",
                  borderRadius: 8,
                  border: `1px solid ${p.color}60`,
                  color: p.color,
                  background: p.color + "12",
                  transition: "all .25s",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = p.color + "28";
                  e.currentTarget.style.boxShadow = `0 6px 24px ${p.color}35`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = p.color + "12";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                VIEW CASE STUDY <span style={{ fontSize: 15 }}>→</span>
              </Link>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: 1,
                  color: C.faint,
                }}
              >
                Structured around problem, solution, decisions, and impact
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
                padding: "10px 20px",
                borderRadius: 6,
                border: `1px solid ${p.color}50`,
                color: p.color,
                background: p.color + "10",
                transition: "all .2s",
                cursor: "pointer",
              }}
            >
              VIEW PROJECT <span style={{ fontSize: 14 }}>↗</span>
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
              Recruiter Snapshot
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
                Why This Project Matters
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
