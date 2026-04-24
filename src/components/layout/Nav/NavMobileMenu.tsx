import type { Theme } from "@/tokens/themes";
import { getNavLinks } from "@/data/nav";
import { useLocale } from "@/hooks/useLocale";

interface NavMobileMenuProps {
  C: Theme;
  open: boolean;
  onNavigate: (id: string) => void;
}

export function NavMobileMenu({ C, open, onNavigate }: NavMobileMenuProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 800,
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        padding: "var(--navbar-height) 20px 40px",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        opacity: 1,
        pointerEvents: "all",
        transition: "opacity .28s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: isArabic ? "auto" : "-10%",
          left: isArabic ? "-10%" : "auto",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.glow1},transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          minWidth: 0,
        }}
      >
        {getNavLinks(locale).map((link, i) => (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              width: "100%",
              padding: "18px 0",
              borderBottom: `1px solid ${C.line}`,
              textAlign: "start",
              opacity: 1,
              transform: "none",
              transition: `opacity .35s ease ${i * 0.07}s, transform .35s ease ${i * 0.07}s`,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                minWidth: 0,
                flex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: C.cyan,
                  letterSpacing: isArabic ? 0 : 1,
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              >
                {link.n}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isArabic ? 30 : 38,
                  fontStyle: "italic",
                  color: C.text,
                  letterSpacing: isArabic ? 0 : -1,
                  lineHeight: 1.1,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {link.label}
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: C.muted,
                opacity: 0.5,
                flexShrink: 0,
              }}
            >
              {isArabic ? "\u2190" : "\u2192"}
            </span>
          </button>
        ))}
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: 1,
          transition: "opacity .35s ease .28s",
        }}
      >
        <button
          type="button"
          onClick={() => onNavigate("contact")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: isArabic ? 0 : 3,
            height: 52,
            borderRadius: 8,
            background: C.cyan,
            color: C.bg,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {locale === "ar"
            ? "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u064a \u2190"
            : locale === "fr"
              ? "CONTACTEZ-MOI \u2192"
              : "HIRE ME \u2192"}
        </button>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["GitHub", "LinkedIn", "Email"].map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: C.muted,
                letterSpacing: 2,
                overflowWrap: "anywhere",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
