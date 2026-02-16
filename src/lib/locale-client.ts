import { type Locale, defaultLocale, locales } from "./i18n";

export const LOCALE_COOKIE = "locale";

export function setLocaleCookie(locale: Locale) {
  if (typeof document !== "undefined") {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000`;
  }
}

export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(new RegExp(`(^| )${LOCALE_COOKIE}=([^;]+)`));
  const value = match?.[2];
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale;
  }
  return defaultLocale;
}
