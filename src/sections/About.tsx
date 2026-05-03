/**
 * @file About.tsx
 * @description About section — mindset-driven content (problem → clarity → decision).
 * Server Component — uses CSS custom properties for theme, CSS for responsive.
 */

import type { Locale } from "@/data/content/types";
import { getHeroMetrics } from "@/data/stats";
import { resolveColorVar } from "@/tokens/themes";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { WindowDots } from "@/components/ui/WindowDots";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SC_TEXT } from "@/tokens/typography";
import { getContent } from "@/data/content";

export function About({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <Section id="about" bg="alt">
      <Container>
        <div className="sc-about-layout">
          {/* Left */}
          <div className="rv-l">
            <Label>{content.about.label}</Label>

            <h2
              className="rv-l d1"
              style={{
                ...SC_TEXT.sectionHeading(),
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
                  ...SC_TEXT.body(),
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
                <Tag key={tag.text} color={resolveColorVar(tag.colorKey)}>
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
                background: "var(--t-line)",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--t-border)",
              }}
            >
              {getHeroMetrics(locale).map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: "20px 18px",
                    background: "var(--t-bg3)",
                    borderRight: "1px solid var(--t-border)",
                    borderBottom: "1px solid var(--t-border)",
                    transition: "background .35s",
                  }}
                >
                  <div
                    style={{
                      ...SC_TEXT.metricValue(resolveColorVar(m.colorKey)),
                      marginBottom: 5,
                    }}
                  >
                    {m.value}
                  </div>
                  <div style={SC_TEXT.metricLabel()}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Code card */}
            <div
              style={{
                background: "var(--t-bg3)",
                border: "1px solid var(--t-border)",
                borderRadius: 10,
                overflow: "hidden",
                transition: "background .35s",
              }}
            >
              <div
                style={{
                  background: "var(--t-card)",
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--t-line)",
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
                    color: "var(--t-muted)",
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
                        color: "var(--t-faint)",
                        marginInlineEnd: 12,
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
                        style={{ color: resolveColorVar(token.colorKey) }}
                      >
                        {token.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
