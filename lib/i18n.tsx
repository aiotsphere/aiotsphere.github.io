"use client";

import en from "@/messages/en.json";
import th from "@/messages/th.json";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "th" | "en";
type Messages = typeof th;

const dictionaries: Record<Locale, Messages> = { th, en };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readPath(messages: Messages, path: string) {
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object" && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");

  useEffect(() => {
    const saved = window.localStorage.getItem("aiot-locale");
    if (saved === "th" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const setLocale = (nextLocale: Locale) => {
      setLocaleState(nextLocale);
      window.localStorage.setItem("aiot-locale", nextLocale);
      document.documentElement.lang = nextLocale;
    };

    return {
      locale,
      setLocale,
      t: (path: string) => {
        const translated = readPath(dictionaries[locale], path);
        const fallback = readPath(dictionaries.th, path);
        return typeof translated === "string" ? translated : typeof fallback === "string" ? fallback : path;
      }
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
