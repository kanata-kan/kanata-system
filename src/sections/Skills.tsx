/**
 * @file Skills.tsx
 * @description Section Skills : grille 1px gap de groupes de compétences.
 * Server Component — uses CSS custom properties for theme, CSS for responsive.
 * Données importées depuis /data/skills.ts.
 */

import { getSkillGroups } from "@/data/skills";
import type { Locale } from "@/data/content/types";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SC_TEXT } from "@/tokens/typography";
import { getContent } from "@/data/content";

const COPY = {
  en: {
    capability: "Capability",
    tools: "tools",
    footer: "Core stack",
  },
  fr: {
    capability: "Capacite",
    tools: "outils",
    footer: "Socle technique",
  },
  ar: {
    capability: "مجال",
    tools: "أدوات",
    footer: "العدة الأساسية",
  },
} as const;

export function Skills({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const copy = COPY[locale];
  const skillGroups = getSkillGroups(locale);
  const isArabic = locale === "ar";

  return (
    <Section id="skills">
      <Container>
        <Stack direction="column" gap="lg" style={{ marginBottom: 36 }}>
          <Label>{content.skills.label}</Label>
          <h2 style={SC_TEXT.sectionHeading()}>{content.skills.heading}</h2>
          <p
            style={{
              ...SC_TEXT.bodySmall(),
              marginTop: 14,
              maxWidth: 520,
            }}
          >
            {content.skills.subtitle}
          </p>
        </Stack>

        <div className="sc-skills-grid">
          {skillGroups.map((g, gi) => (
            <div
              key={g.title}
              className={`rv d${gi + 1} sc-skills-card`}
              data-card
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 18,
                border: "1px solid var(--t-border)",
                background:
                  "linear-gradient(180deg, var(--t-bg2), var(--t-bg3))",
                boxShadow: "var(--t-shadow)",
                transition:
                  "background .35s ease, border-color .35s ease, transform .35s ease",
              }}
            >
              <div
                className="sc-skills-watermark"
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  letterSpacing: -0.05,
                  lineHeight: 1,
                  color: g.color,
                  opacity: 0.1,
                  pointerEvents: "none",
                }}
              >
                {String(gi + 1).padStart(2, "0")}
              </div>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      ...SC_TEXT.monoLabel(),
                      color: g.color,
                      marginBottom: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 1.5,
                        background: g.color,
                        opacity: 0.7,
                      }}
                    />
                    {copy.capability} {String(gi + 1).padStart(2, "0")}
                  </div>

                  <h3
                    className="sc-skills-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: -0.03,
                      color: "var(--t-text)",
                      margin: 0,
                    }}
                  >
                    {g.title}
                  </h3>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "7px 11px",
                    borderRadius: 999,
                    border: "1px solid var(--t-border)",
                    background: "var(--t-bg2)",
                    color: "var(--t-muted)",
                    fontFamily: "var(--font-ui)",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: isArabic ? 0 : 0.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: g.color,
                      opacity: 0.72,
                    }}
                  />
                  {g.items.length} {copy.tools}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 1,
                  marginBottom: 18,
                  background: `linear-gradient(90deg, ${g.color}, transparent)`,
                  opacity: 0.5,
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {g.items.map((item, index) => (
                  <span
                    key={item}
                    className="sc-skills-pill"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 999,
                      border: "1px solid var(--t-border)",
                      background:
                        index % 2 === 0 ? "var(--t-bg2)" : "var(--t-bg3)",
                      color: "var(--t-sub)",
                      fontFamily: "var(--font-body)",
                      fontSize: 12.5,
                      fontWeight: 500,
                      lineHeight: 1.35,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: g.color,
                        opacity: index === 0 ? 1 : 0.58,
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--t-muted)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: isArabic ? 0 : 0.45,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1.5,
                    background: g.color,
                    opacity: 0.55,
                  }}
                />
                {copy.footer}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
