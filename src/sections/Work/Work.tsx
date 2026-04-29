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
  const hasMultipleProjects = PROJECTS.length > 1;
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

        {hasMultipleProjects && (
          <div
            role="tablist"
            aria-label="Projects"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              marginBottom: 24,
              background: C.bg2,
              borderRadius: 10,
              padding: 3,
              border: `1px solid ${C.border}`,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
              transition: "background .35s",
            }}
          >
            {PROJECTS.map((pr, i) => {
              const isActive = active === i;
              return (
                <button
                  key={pr.n}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: isMobile ? "10px 14px" : "10px 18px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                    background: isActive
                      ? `linear-gradient(135deg, ${pr.color}14, ${pr.color}08)`
                      : "transparent",
                    border: isActive
                      ? `1px solid ${pr.color}30`
                      : "1px solid transparent",
                    boxShadow: isActive ? `0 2px 8px ${pr.color}15` : "none",
                    transition: "all .25s cubic-bezier(.4,0,.2,1)",
                    flexShrink: 0,
                    cursor: "pointer",
                    position: "relative" as const,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: isActive ? pr.color : C.faint,
                      letterSpacing: 1,
                      transition: "color .2s",
                    }}
                  >
                    {pr.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: isActive ? C.text : C.muted,
                      fontWeight: isActive ? 600 : 400,
                      transition: "color .2s, font-weight .2s",
                    }}
                  >
                    {pr.name}
                  </span>
                  {isActive && (
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: pr.color,
                        flexShrink: 0,
                        boxShadow: `0 0 6px ${pr.color}60`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <WorkFeaturedCard C={C} p={p} isMobile={isMobile} />

        {hasMultipleProjects && (
          <WorkSmallCards
            C={C}
            isMobile={isMobile}
            active={active}
            onSelect={setActive}
          />
        )}
      </Container>
    </Section>
  );
}
