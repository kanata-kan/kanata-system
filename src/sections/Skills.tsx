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

export function Skills() {
  const { C } = useThemeContext();
  const { locale } = useLocale();
  const content = getContent(locale);
  const { isMobile } = useResponsiveContext();

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
              maxWidth: 420,
            }}
          >
            {content.skills.subtitle}
          </p>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
            gap: 1,
            background: C.line,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {getSkillGroups(locale).map((g, gi) => (
            <div
              key={g.title}
              className={`rv d${gi + 1}`}
              style={{
                background: C.bg2,
                padding: isMobile ? "20px 16px" : "26px 22px",
                transition: "background .35s",
              }}
            >
              <div
                style={{
                  ...TEXT.monoLabel(C),
                  color: g.color,
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 1.5,
                    background: g.color,
                    opacity: 0.6,
                  }}
                />
                {g.title}
              </div>
              {g.items.map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: C.sub,
                    fontWeight: 300,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 9,
                  }}
                >
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: g.color,
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
