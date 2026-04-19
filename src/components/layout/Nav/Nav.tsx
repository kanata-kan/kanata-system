"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Theme } from "@/tokens/themes";
import { ThemeToggle } from "../ThemeToggle";
import { LocaleSwitch } from "./LocaleSwitch";
import { NavLogo } from "./NavLogo";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";

interface NavProps {
  C: Theme;
  dark: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Nav({ C, dark, onToggle, isMobile }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 48);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const go = useCallback(
    (id: string) => {
      setOpen(false);

      const scrollTo = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (pathname === "/") {
        setTimeout(scrollTo, open ? 250 : 0);
      } else {
        router.push(`/#${id}`);
      }
    },
    [pathname, router, open],
  );

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,

          // ✅ FIX: بدل hardcode
          height: "var(--navbar-height)",

          padding: isMobile ? "0 16px" : "0 48px",
          background: scrolled ? `${C.bg}F5` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          transition: "background .4s,border-color .4s",
        }}
      >
        <NavLogo C={C} isMobile={isMobile} onNavigate={go} />

        {!isMobile && <NavLinks C={C} onNavigate={go} />}

        {/* Right side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <LocaleSwitch C={C} />
          <ThemeToggle dark={dark} onToggle={onToggle} c={C} />

          {!isMobile && (
            <button
              onClick={() => go("contact")}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: 2,
                padding: "9px 20px",
                borderRadius: 6,
                border: `1px solid ${C.cyan}60`,
                color: C.cyan,
                background: `${C.cyan}10`,
                transition: "all .2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = C.cyan;
                e.currentTarget.style.color = C.bg;
                e.currentTarget.style.boxShadow = `0 0 20px ${C.cyan}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = `${C.cyan}10`;
                e.currentTarget.style.color = C.cyan;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Contact
            </button>
          )}

          {isMobile && (
            <button
              onClick={() => setOpen((o) => !o)}
              style={{
                width: 44,
                height: 44,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                border: `1px solid ${open ? C.border2 : C.border}`,
                borderRadius: 8,
                transition: "border-color .2s",
                cursor: "pointer",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    height: "1.5px",
                    borderRadius: 2,
                    background: C.cyan,
                    width: i === 1 ? (open ? 0 : 14) : 18,
                    transform: open
                      ? i === 0
                        ? "translateY(6.5px) rotate(45deg)"
                        : i === 2
                          ? "translateY(-6.5px) rotate(-45deg)"
                          : "none"
                      : "none",
                    opacity: i === 1 && open ? 0 : 1,
                    transition: "all .25s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </header>

      {isMobile && <NavMobileMenu C={C} open={open} onNavigate={go} />}
    </>
  );
}