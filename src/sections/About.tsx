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
import { content } from "@/data/content";

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
            <Label c={C}>{content.about.label}</Label>

            <h2
              className="rv-l d1"
              style={{
                ...TEXT.sectionHeading(C, isMobile),
                marginBottom: 22,
                lineHeight: 1.1,
              }}
            >
              {content.about.headingLine1}
              <br />
              {content.about.headingLine2}
            </h2>

            {content.about.paragraphs.map((t, i) => (
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
              {content.about.tags.map((tag) => (
                <Tag key={tag.text} color={resolveColor(C, tag.colorKey)}>
                  {tag.text}
                </Tag>
              ))}
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
                  {content.about.codeFilename}
                </span>
              </div>

              <div style={{ padding: "16px 18px" }}>
                {content.about.codeRows.map((row, i) => (
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

                    {row.map((token, j) => (
                      <span
                        key={j}
                        style={{ color: resolveColor(C, token.colorKey) }}
                      >
                        {token.text}
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
