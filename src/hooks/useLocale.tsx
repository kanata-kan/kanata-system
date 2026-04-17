/**
 * @file useLocale.ts
 * @description Locale context and hook for React components.
 * Follows clean architecture: useLocale() returns ONLY locale.
 * Content is retrieved via getContent(locale) function.
 */

"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import type { Locale } from "@/data/content/types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LOCALE_STORAGE_KEY = "locale";

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "en" || stored === "fr" ? stored : "en";
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener("locale-change", handleChange as EventListener);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(
      "locale-change",
      handleChange as EventListener,
    );
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribe,
    getLocaleSnapshot,
    () => "en",
  );

  const setLocale = (newLocale: Locale) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    window.dispatchEvent(new Event("locale-change"));
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
