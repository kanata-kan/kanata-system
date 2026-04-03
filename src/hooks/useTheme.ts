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

function getSnapshot(): boolean {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot(): boolean {
  return true;
}

function writeTheme(dark: boolean): void {
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  listeners.forEach((cb) => cb());
}

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyToDom(dark ? DARK : LIGHT);
  }, [dark]);

  const toggle = useCallback(() => writeTheme(!getSnapshot()), []);

  return { dark, toggle, C: dark ? DARK : LIGHT };
}
