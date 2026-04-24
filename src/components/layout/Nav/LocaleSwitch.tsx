/**
 * @file LocaleSwitch.tsx
 * @description Language switcher component for Nav (EN/FR).
 * Matches ThemeToggle style and behavior.
 */

"use client";

import { useLocale } from "@/hooks/useLocale";
import type { Theme } from "@/tokens/themes";

interface Props {
  C: Theme;
}

const LOCALES = ["en", "fr", "ar"] as const;
const LOCALE_LABELS: Record<string, string> = { en: "EN", fr: "FR", ar: "AR" };

export function LocaleSwitch({ C }: Props) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="radiogroup"
      aria-label="Language switcher"
      style={{
        display: "flex",
        borderRadius: 8,
        border: `1px solid ${C.line}`,
        background: C.bg2,
        overflow: "hidden",
        transition: "all .25s",
      }}
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={l}
            onClick={() => setLocale(l)}
            style={{
              padding: "5px 10px",
              fontFamily: l === "ar" ? "var(--font-sans)" : "var(--font-mono)",
              fontSize: l === "ar" ? 13 : 11,
              fontWeight: active ? 600 : 400,
              letterSpacing: l === "ar" ? 0 : 1,
              color: active ? C.cyan : C.faint,
              background: active ? `${C.cyan}12` : "transparent",
              cursor: "pointer",
              border: "none",
              borderRight: l !== "ar" ? `1px solid ${C.line}` : "none",
              transition: "all .2s",
              lineHeight: 1,
            }}
          >
            {LOCALE_LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
