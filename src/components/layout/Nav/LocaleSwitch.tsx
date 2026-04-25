/**
 * @file LocaleSwitch.tsx
 * @description Language switcher component for Nav.
 * Navigates to the equivalent page in the new locale via URL.
 */

"use client";

import { useLocale } from "@/hooks/useLocale";
import type { Theme } from "@/tokens/themes";
import { LOCALES } from "@/lib/i18n";

interface Props {
  C: Theme;
}

const LOCALE_LABELS: Record<string, string> = { en: "EN", fr: "FR", ar: "عر" };

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
      {LOCALES.map((l, i) => {
        const active = locale === l;
        const isLast = i === LOCALES.length - 1;
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
              fontFamily:
                l === "ar"
                  ? "var(--font-arabic, var(--font-body))"
                  : "var(--font-mono)",
              fontSize: l === "ar" ? 13 : 11,
              fontWeight: active ? 600 : 400,
              letterSpacing: l === "ar" ? 0 : 1,
              color: active ? C.cyan : C.faint,
              background: active ? `${C.cyan}12` : "transparent",
              cursor: "pointer",
              border: "none",
              borderInlineEnd: isLast ? "none" : `1px solid ${C.line}`,
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
