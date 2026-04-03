/**
 * @file About.tsx
 * @description About section — mindset-driven content (problem → clarity → decision).
 */
"use client";

import { useThemeContext } from "@/hooks/useTheme";
import { resolveColor } from "@/tokens/themes";
import { METRICS } from "@/data/stats";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { WindowDots } from "@/components/ui/WindowDots";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";

const BIO_PARAGRAPHS = [
  "I don’t start from features or tools. I start by understanding how the business actually works — and where things break.",

  "Most of the time, the problem isn’t missing code. It’s unclear decisions, hidden complexity, or things slowing the system down.",

  "My role is to bring clarity first — then decide what’s worth building, what should be fixed, and what should be left untouched.",
];

const CODE_ROWS: [string, string][][] = [
  [
    ["const ", "cyan"],
    ["dev", "text"],
    [" = {", "muted"],
  ],
  [
    ["  mindset: ", "muted"],
    ['"understand-first"', "amber"],
    [",", "muted"],
  ],
  [
    ["  focus: ", "muted"],
    ['"clarity-over-speed"', "amber"],
    [",", "muted"],
  ],
  [
    ["  approach: ", "muted"],
    ['"fix-what-slows"', "green"],
    [",", "muted"],
  ],
  [
    ["  decisions: ", "muted"],
    ["true", "cyan"],
    [",", "muted"],
  ],
  [
    ["  hire: ", "muted"],
    ['"only-if-it-makes-sense"', "amber"],
  ],
  [["}", "muted"]],
];

export function About() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <Section id="about" bg="alt">
      <Container>
        <Stack
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "xl" : "3xl"}
        >
          {/* Left */}
          <div className="rv-l">
            <Label c={C}>02 — Mindset</Label>

            <h2
              className="rv-l d1"
              style={{
                ...TEXT.sectionHeading(C, isMobile),
                marginBottom: 22,
                lineHeight: 1.1,
              }}
            >
              I work from reality,
              <br />
              not assumptions.
            </h2>

            {BIO_PARAGRAPHS.map((t, i) => (
              <p
                key={i}
                style={{
                  ...TEXT.body(C),
                  lineHeight: 1.9,
                  marginBottom: 13,
                }}
              >
                {t}
              </p>
            ))}

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              <Tag color={C.cyan}>Clarity first</Tag>
              <Tag color={C.amber}>No blind execution</Tag>
              <Tag color={C.purple}>Value over noise</Tag>
            </div>
          </div>

          {/* Right */}
          <div
            className="rv-r"
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {/* Metrics grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: C.line,
                borderRadius: 10,
                overflow: "hidden",
                border: `1px solid ${C.border}`,
              }}
            >
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: "20px 18px",
                    background: C.bg3,
                    borderRight: `1px solid ${C.border}`,
                    borderBottom: `1px solid ${C.border}`,
                    transition: "background .35s",
                  }}
                >
                  <div
                    style={{
                      ...TEXT.metricValue(resolveColor(C, m.colorKey)),
                      marginBottom: 5,
                    }}
                  >
                    {m.value}
                  </div>
                  <div style={TEXT.metricLabel(C)}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Code card */}
            <div
              style={{
                background: C.bg3,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "background .35s",
              }}
            >
              <div
                style={{
                  background: C.card,
                  padding: "10px 14px",
                  borderBottom: `1px solid ${C.line}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <WindowDots />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: C.muted,
                    marginLeft: 4,
                  }}
                >
                  about.ts
                </span>
              </div>

              <div style={{ padding: "16px 18px" }}>
                {CODE_ROWS.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      lineHeight: 2,
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        color: C.faint,
                        marginRight: 12,
                        fontSize: 9,
                        minWidth: 14,
                        userSelect: "none",
                        opacity: 0.4,
                      }}
                    >
                      {i + 1}
                    </span>

                    {row.map(([txt, colorKey], j) => (
                      <span
                        key={j}
                        style={{ color: resolveColor(C, colorKey) }}
                      >
                        {txt}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
