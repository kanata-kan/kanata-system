/**
 * @file Skills.tsx
 * @description Section Skills : grille 1px gap de groupes de compétences.
 * Utilise useThemeContext pour les tokens et useResponsiveContext pour isMobile.
 * Données importées depuis /data/skills.ts.
 */
"use client";

import { SKILL_GROUPS } from "@/data/skills";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";

export function Skills() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();

  return (
    <Section id="skills">
      <Container>
        <Stack direction="column" gap="lg" style={{ marginBottom: 36 }}>
          <Label c={C}>03 — Tools </Label>
          <h2 style={TEXT.sectionHeading(C, isMobile)}>
            Tools I use — when they actually matter.
          </h2>
          <p
            style={{
              ...TEXT.bodySmall(C),
              marginTop: 14,
              maxWidth: 420,
            }}
          >
            Tools follow the problem — not the other way around.
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
          {SKILL_GROUPS.map((g, gi) => (
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
