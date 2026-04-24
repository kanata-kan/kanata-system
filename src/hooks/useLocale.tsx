/**
 * @file useLocale.ts
 * @description Locale context and hook for React components.
 * Follows clean architecture: useLocale() returns ONLY locale.
 * Content is retrieved via getContent(locale) function.
 */

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/data/content/types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const LOCALE_STORAGE_KEY = "locale";

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function resolveLocale(value: string | null | undefined, fallback: Locale): Locale {
  return value === "en" || value === "fr" || value === "ar" ? value : fallback;
}

function getLocaleSnapshot(initialLocale: Locale): Locale {
  if (typeof window === "undefined") {
    return initialLocale;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "en" || stored === "fr" || stored === "ar") {
    return stored;
  }

  return resolveLocale(getCookie(LOCALE_STORAGE_KEY), initialLocale);
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
    window.removeEventListener("locale-change", handleChange as EventListener);
  };
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const locale = useSyncExternalStore<Locale>(
    subscribe,
    () => getLocaleSnapshot(initialLocale),
    () => initialLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.cookie = `${LOCALE_STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; samesite=lax`;
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
