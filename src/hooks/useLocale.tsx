/**
 * @file useLocale.ts
 * @description Locale context and hook for React components.
 * Follows clean architecture: useLocale() returns ONLY locale.
 * Content is retrieved via getContent(locale) function.
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "@/data/content/types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("locale");
    return (stored === "en" || stored === "fr") ? stored : "en";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
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
