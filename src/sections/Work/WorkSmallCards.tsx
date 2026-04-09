/**
 * @file WorkSmallCards.tsx
 * @description Grille de petites cartes projet (les 3 projets non-actifs).
 * Reçoit le thème, la liste de projets, l'index actif et le setter.
 */

import type { Theme } from "@/tokens/themes";
import { getProjects } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { Stack } from "@/components/layout/Stack";

interface WorkSmallCardsProps {
  C: Theme;
  isMobile: boolean;
  active: number;
  onSelect: (index: number) => void;
}

export function WorkSmallCards({
  active,
  C,
  isMobile,
  onSelect,
}: WorkSmallCardsProps) {
  const { locale } = useLocale();
  const PROJECTS = getProjects(locale);
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      gap="xs"
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
      }}
    >
      {PROJECTS.filter((_, i) => i !== active).map((pr) => (
        <button
          key={pr.n}
          onClick={() => onSelect(PROJECTS.indexOf(pr))}
          className={`rv d${Math.min(PROJECTS.indexOf(pr) + 1, 6)}`}
          style={{
            background: C.bg2,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 18,
            textAlign: "left",
            transition: "all .2s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = pr.color + "50";
            e.currentTarget.style.background = C.bg3;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = C.border;
            e.currentTarget.style.background = C.bg2;
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: C.faint,
                letterSpacing: 2,
              }}
            >
              {pr.n}
            </span>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: pr.statusColor,
                opacity: 0.8,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17,
              fontStyle: "italic",
              color: C.text,
              letterSpacing: -0.5,
              marginBottom: 4,
            }}
          >
            {pr.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: C.muted,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {pr.type}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {Object.values(pr.stack)
              .flat()
              .slice(0, 3)
              .map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 3,
                    border: `1px solid ${C.line}`,
                    color: C.faint,
                  }}
                >
                  {t}
                </span>
              ))}
          </div>
        </button>
      ))}
    </Stack>
  );
}
