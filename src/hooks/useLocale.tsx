/**
 * @file useLocale.tsx
 * @description URL-based locale context for React components.
 *
 * Architecture:
 * - Locale is determined by the URL segment (/en, /fr, /ar).
 * - The server layout passes `initialLocale` from params.
 * - `setLocale()` navigates to the equivalent page in the new locale.
 * - No localStorage, no cookies, no custom events — the URL is the truth.
 */

"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/data/content/types";
import { switchLocaleInPath } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === initialLocale) return;
      const newPath = switchLocaleInPath(pathname, newLocale);
      router.push(newPath);
    },
    [initialLocale, pathname, router],
  );

  return (
    <LocaleContext.Provider value={{ locale: initialLocale, setLocale }}>
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
