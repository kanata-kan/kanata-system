/**
 * @file Skills.tsx
 * @description Section Skills : grille 1px gap de groupes de compétences.
 * Utilise useThemeContext pour les tokens et useResponsiveContext pour isMobile.
 * Données importées depuis /data/skills.ts.
 */
"use client";

import { getSkillGroups } from "@/data/skills";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";
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

export function Skills() {
  const { C } = useThemeContext();
  const { locale } = useLocale();
  const content = getContent(locale);
  const { isMobile } = useResponsiveContext();
  const copy = COPY[locale];
  const skillGroups = getSkillGroups(locale);
  const isArabic = locale === "ar";

  return (
    <Section id="skills">
      <Container>
        <Stack direction="column" gap="lg" style={{ marginBottom: 36 }}>
          <Label c={C}>{content.skills.label}</Label>
          <h2 style={TEXT.sectionHeading(C, isMobile)}>
            {content.skills.heading}
          </h2>
          <p
            style={{
              ...TEXT.bodySmall(C),
              marginTop: 14,
              maxWidth: 520,
            }}
          >
            {content.skills.subtitle}
          </p>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: isMobile ? 14 : 18,
          }}
        >
          {skillGroups.map((g, gi) => (
            <div
              key={g.title}
              className={`rv d${gi + 1}`}
              data-card
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 18,
                border: `1px solid ${C.border}`,
                background: `linear-gradient(180deg, ${C.bg2}, ${C.bg3})`,
                padding: isMobile ? "20px 18px" : "24px 22px",
                minHeight: isMobile ? undefined : 220,
                boxShadow: C.shadow,
                transition:
                  "background .35s ease, border-color .35s ease, transform .35s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  insetInlineEnd: isMobile ? -6 : -10,
                  top: isMobile ? -8 : -10,
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? 56 : 72,
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
                      ...TEXT.monoLabel(C),
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
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isMobile ? 24 : 28,
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: -0.03,
                      color: C.text,
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
                    border: `1px solid ${C.border}`,
                    background: C.bg2,
                    color: C.muted,
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
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: isMobile ? "8px 10px" : "9px 12px",
                      borderRadius: 999,
                      border: `1px solid ${C.border}`,
                      background: index % 2 === 0 ? C.bg2 : C.bg3,
                      color: C.sub,
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
                  color: C.muted,
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
