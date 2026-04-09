/**
 * @file Work.tsx
 * @description Section Work — orchestrateur.
 * Gère l'état actif (onglet sélectionné) et délègue le rendu
 * aux sous-composants WorkFeaturedCard et WorkSmallCards.
 */
"use client";

import { useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import { useResponsiveContext } from "@/hooks/useResponsive";
import { useLocale } from "@/hooks/useLocale";
import { getProjects } from "@/data/projects";
import { Label } from "@/components/ui/Label";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { TEXT } from "@/tokens/typography";
import { getContent } from "@/data/content";
import { WorkFeaturedCard } from "./WorkFeaturedCard";
import { WorkSmallCards } from "./WorkSmallCards";

export function Work() {
  const { C } = useThemeContext();
  const { isMobile } = useResponsiveContext();
  const { locale } = useLocale();
  const content = getContent(locale);
  const PROJECTS = getProjects(locale);
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <Section id="work">
      <Container>
        {/* Header */}
        <Stack
          direction="row"
          justify="space-between"
          align="flex-end"
          wrap
          gap="md"
          style={{ marginBottom: 36 }}
        >
          <div>
            <Label c={C}>{content.work.label}</Label>
            <h2 style={TEXT.sectionHeading(C, isMobile)}>
              {content.work.heading}
            </h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: C.muted,
            }}
          >
            {content.work.subtitle}
          </span>
        </Stack>

        {/* Tabs */}
        <Stack
          direction="row"
          gap="xs"
          style={{
            marginBottom: 24,
            background: C.bg2,
            borderRadius: 10,
            padding: 4,
            border: `1px solid ${C.border}`,
            overflowX: "auto",
            transition: "background .35s",
          }}
        >
          {PROJECTS.map((pr, i) => (
            <button
              key={pr.n}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: isMobile ? "9px 12px" : "10px 18px",
                borderRadius: 7,
                whiteSpace: "nowrap",
                background: active === i ? C.bg3 : "transparent",
                border:
                  active === i
                    ? `1px solid ${pr.color}35`
                    : "1px solid transparent",
                transition: "all .2s",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: active === i ? pr.color : C.faint,
                  letterSpacing: 1,
                }}
              >
                {pr.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: active === i ? C.text : C.muted,
                  fontWeight: active === i ? 500 : 300,
                }}
              >
                {pr.name}
              </span>
              {active === i && (
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: pr.color,
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          ))}
        </Stack>

        <WorkFeaturedCard C={C} p={p} isMobile={isMobile} />

        <WorkSmallCards
          C={C}
          isMobile={isMobile}
          active={active}
          onSelect={setActive}
        />
      </Container>
    </Section>
  );
}
