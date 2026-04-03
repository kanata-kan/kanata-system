/**
 * @file useResponsive.ts
 * @description Hook responsive centralisé utilisant les tokens BREAKPOINTS.
 * Fournit isMobile, isTablet, isDesktop et la largeur brute.
 * Séparé du thème — la responsivité n'a rien à voir avec les couleurs.
 * À utiliser UNE SEULE FOIS dans layout.tsx via ResponsiveContext.Provider.
 */
"use client";

import { useState, useEffect, useContext, createContext } from "react";
import { BREAKPOINTS } from "@/tokens/breakpoints";

export interface ResponsiveContextValue {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const ResponsiveContext = createContext<ResponsiveContextValue | null>(
  null,
);

export function useResponsiveContext(): ResponsiveContextValue {
  const ctx = useContext(ResponsiveContext);
  if (!ctx)
    throw new Error(
      "useResponsiveContext must be used within ResponsiveProvider",
    );
  return ctx;
}

/** SSR-safe default — always desktop so server & client first render match. */
const SSR_WIDTH = 1024;

export function useResponsive(): ResponsiveContextValue {
  const [width, setWidth] = useState(SSR_WIDTH);

  useEffect(() => {
    // Sync to real width after hydration
    setWidth(window.innerWidth);

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 16);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    width,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
  };
}
