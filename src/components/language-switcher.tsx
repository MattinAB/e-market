"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { type Locale, locales, localeNames } from "@/lib/i18n";
import { getLocaleFromCookie, setLocaleCookie } from "@/lib/locale-client";

export function LanguageSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");

  useEffect(() => {
    setCurrentLocale(getLocaleFromCookie());
  }, []);

  function handleLocaleChange(locale: Locale) {
    setLocaleCookie(locale);
    setCurrentLocale(locale);
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9">
          <Languages className="size-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
