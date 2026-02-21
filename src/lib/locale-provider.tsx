"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./i18n";
import type { Translations } from "./i18n";
import { translations } from "./i18n";

const LocaleContext = createContext<{ locale: Locale; t: Translations } | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = translations[locale];
  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslations(): Translations {
  const ctx = useContext(LocaleContext);
  if (!ctx) return translations.en;
  return ctx.t;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  return ctx?.locale ?? "en";
}
