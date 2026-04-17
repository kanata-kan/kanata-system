/**
 * @file useResponsive.ts
 * @description Hook responsive centralisé utilisant les tokens BREAKPOINTS.
 * Fournit isMobile, isTablet, isDesktop et la largeur brute.
 * Séparé du thème — la responsivité n'a rien à voir avec les couleurs.
 * À utiliser UNE SEULE FOIS dans layout.tsx via ResponsiveContext.Provider.
 */
"use client";

import { useContext, createContext, useSyncExternalStore } from "react";
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

function getWidthSnapshot() {
  return typeof window === "undefined" ? SSR_WIDTH : window.innerWidth;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  let timeoutId: ReturnType<typeof setTimeout>;

  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(onStoreChange, 16);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(timeoutId);
  };
}

export function useResponsive(): ResponsiveContextValue {
  const width = useSyncExternalStore(
    subscribe,
    getWidthSnapshot,
    () => SSR_WIDTH,
  );

  return {
    width,
    isMobile: width < BREAKPOINTS.md,
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
  };
}
