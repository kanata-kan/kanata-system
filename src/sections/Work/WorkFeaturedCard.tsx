/**
 * @file WorkFeaturedCard.tsx
 * @description Carte projet principale avec browser bar, description,
 * tech stack, highlights, et UI preview schématique.
 */

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
      {/* Browser bar */}
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
            ● {p.status}
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

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        }}
      >
        {/* Left info */}
        <div
          style={{
            padding: isMobile ? 22 : 36,
            borderRight: isMobile ? "none" : `1px solid ${C.line}`,
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
            &ldquo;{p.longDesc}&rdquo;
          </p>

          {/* Tech Stack */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                ...TEXT.monoLabel(C),
                marginBottom: 10,
              }}
            >
              Tech Stack
            </div>
            <Stack direction="row" gap="xs" wrap>
              {p.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "4px 10px",
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
            </Stack>
          </div>

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
            onMouseOver={(e) => {
              e.currentTarget.style.background = p.color + "25";
              e.currentTarget.style.boxShadow = `0 4px 16px ${p.color}30`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = p.color + "10";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            VIEW PROJECT <span style={{ fontSize: 14 }}>↗</span>
          </button>
        </div>

        {/* Right — highlights + UI preview (desktop only) */}
        {!isMobile && (
          <div
            style={{
              padding: 36,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  ...TEXT.monoLabel(C),
                  marginBottom: 14,
                }}
              >
                Key Highlights
              </div>
              {p.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: p.color + "18",
                      border: `1px solid ${p.color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: p.color, fontSize: 11 }}>✓</span>
                  </div>
                  <span
                    style={{
                      ...TEXT.bodySmall(C),
                      color: C.sub,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* UI preview schematic */}
            <div
              style={{
                flex: 1,
                background: C.bg3,
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                minHeight: 160,
                transition: "background .35s",
              }}
            >
              <div
                style={{
                  height: 30,
                  background: C.card,
                  borderBottom: `1px solid ${C.line}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  gap: 6,
                  transition: "background .35s",
                }}
              >
                <WindowDots />
                <div
                  style={{
                    flex: 1,
                    height: 12,
                    background: C.bg3,
                    borderRadius: 4,
                    marginLeft: 8,
                    maxWidth: 100,
                    transition: "background .35s",
                  }}
                />
              </div>
              <div
                style={{
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                <div
                  style={{
                    height: 8,
                    background: p.color + "28",
                    borderRadius: 4,
                    width: "65%",
                  }}
                />
                <div
                  style={{
                    height: 6,
                    background: C.bg2,
                    borderRadius: 4,
                    width: "85%",
                    transition: "background .35s",
                  }}
                />
                <div
                  style={{
                    height: 6,
                    background: C.bg2,
                    borderRadius: 4,
                    width: "55%",
                    transition: "background .35s",
                  }}
                />
                <div
                  style={{
                    height: 32,
                    background: p.color + "14",
                    border: `1px solid ${p.color}25`,
                    borderRadius: 8,
                    marginTop: 6,
                  }}
                />
                <div style={{ display: "flex", gap: 7 }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: 22,
                        flex: 1,
                        background: C.bg2,
                        borderRadius: 4,
                        border: `1px solid ${C.line}`,
                        transition: "background .35s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
