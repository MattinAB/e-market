import { cookies } from "next/headers";
import { type Locale, defaultLocale, locales } from "./i18n";

export const LOCALE_COOKIE = "locale";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale;
  }
  return defaultLocale;
}
