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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 800,
        background: C.bg,
        display: "flex",
        flexDirection: "column",

        // ✅ FIX هنا
        padding: "var(--navbar-height) 28px 48px",

        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity .28s",
      }}
    >
      {/* Glow decoration */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.glow1},transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {getNavLinks(locale).map((l, i) => (
          <button
            key={l.id}
            onClick={() => onNavigate(l.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 0",
              borderBottom: `1px solid ${C.line}`,
              textAlign: "left",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(12px)",
              transition: `opacity .35s ease ${i * 0.07}s, transform .35s ease ${i * 0.07}s`,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: C.cyan,
                  letterSpacing: 1,
                  opacity: 0.7,
                }}
              >
                {l.n}
              </span>

              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 38,
                  fontStyle: "italic",
                  color: C.text,
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {l.label}
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: C.muted,
                opacity: 0.5,
              }}
            >
              →
            </span>
          </button>
        ))}
      </nav>

      {/* Footer section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: open ? 1 : 0,
          transition: "opacity .35s ease .28s",
        }}
      >
        <button
          onClick={() => onNavigate("contact")}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 3,
            height: 52,
            borderRadius: 8,
            background: C.cyan,
            color: C.bg,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {locale === "ar"
            ? "تواصل معي →"
            : locale === "fr"
              ? "CONTACTEZ-MOI →"
              : "HIRE ME →"}
        </button>

        <div style={{ display: "flex", gap: 28, justifyContent: "center" }}>
          {["GitHub", "LinkedIn", "Email"].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: C.muted,
                letterSpacing: 2,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}