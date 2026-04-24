/**
 * @file useTheme.ts
 * @description Gère l'état dark/light avec persistance localStorage.
 * Met à jour les CSS variables sur documentElement à chaque changement.
 * Exporte ThemeContext et useThemeContext pour éviter le prop drilling.
 * À utiliser UNE SEULE FOIS dans layout.tsx via ThemeProvider.
 */
"use client";

import {
  useSyncExternalStore,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { DARK, LIGHT, type Theme } from "@/tokens/themes";

const CSS_VARS: (keyof Theme)[] = ["cyan", "purple", "green", "amber"];
const THEME_STORAGE_KEY = "portfolio-theme";

function applyToDom(theme: Theme) {
  const root = document.documentElement;
  CSS_VARS.forEach((key) =>
    root.style.setProperty(`--${key}`, theme[key] as string),
  );
  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;
}

export interface ThemeContextValue {
  dark: boolean;
  toggle: () => void;
  C: Theme;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}

/* ── External store helpers for localStorage-backed theme ── */

const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function getSnapshot(initialDark: boolean): boolean {
  if (typeof window === "undefined") {
    return initialDark;
  }

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    return saved === "dark";
  }

  const cookieTheme = getCookie(THEME_STORAGE_KEY);
  if (cookieTheme === "dark" || cookieTheme === "light") {
    return cookieTheme === "dark";
  }

  return initialDark;
}

function writeTheme(dark: boolean): void {
  const nextTheme = dark ? "dark" : "light";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  document.cookie = `${THEME_STORAGE_KEY}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
  listeners.forEach((cb) => cb());
}

export function useTheme(initialDark = true) {
  const dark = useSyncExternalStore(
    subscribe,
    () => getSnapshot(initialDark),
    () => initialDark,
  );

  useEffect(() => {
    applyToDom(dark ? DARK : LIGHT);
  }, [dark]);

  const toggle = useCallback(() => writeTheme(!dark), [dark]);

  return { dark, toggle, C: dark ? DARK : LIGHT };
}
