"use client";

import { getTechStrip } from "@/data/skills";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/hooks/useLocale";
import { useThemeContext } from "@/hooks/useTheme";

function containsArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

export function TechStrip() {
  const { locale } = useLocale();
  const { C } = useThemeContext();
  const techStrip = getTechStrip(locale);
  const items = [...techStrip, ...techStrip];
  const isArabic = locale === "ar";

  return (
    <div
      style={{
        borderTop: `1px solid ${C.line}`,
        borderBottom: `1px solid ${C.line}`,
        padding: "13px 0",
        overflow: "hidden",
        background: C.bg2,
        transition: "background .35s",
      }}
    >
      <Container variant="wide">
        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              width: "max-content",
              minWidth: "100%",
              animation: "marquee 30s linear infinite",
              willChange: "transform",
            }}
          >
            {items.map((text, index) => {
              const hasArabic = containsArabic(text);

              return (
                <span
                  key={`${text}-${index}`}
                  dir={isArabic && hasArabic ? "rtl" : "ltr"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flex: "0 0 auto",
                    fontFamily:
                      isArabic && hasArabic
                        ? "var(--font-arabic)"
                        : "var(--font-mono)",
                    fontSize: hasArabic ? 11 : 10,
                    fontWeight: hasArabic ? 600 : 500,
                    letterSpacing: hasArabic ? 0 : 2.5,
                    color: index % 4 === 0 ? C.cyan : C.muted,
                    padding: isArabic ? "0 22px" : "0 28px",
                    textTransform: hasArabic ? "none" : "uppercase",
                    borderInlineEnd: `1px solid ${C.line}`,
                    whiteSpace: "nowrap",
                    transition: "color .35s",
                    unicodeBidi: "isolate",
                  }}
                >
                  {index % 6 === 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        color: C.cyan,
                        marginInlineEnd: 8,
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      *
                    </span>
                  )}
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
