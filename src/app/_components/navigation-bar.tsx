import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignoutButton from "./signout-button";
import { CiShoppingCart } from "react-icons/ci";
import NavHeightSync from "./nav-height-sync";
import { SearchBar } from "./search-bar";
import { LayoutDashboard, User } from "lucide-react";
import { getUserWithRole } from "@/lib/get-user-with-role";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getLocale } from "@/lib/locale-server";
import { translations } from "@/lib/i18n";

export default async function NavigationBar() {
  const [user, locale] = await Promise.all([getUserWithRole(), getLocale()]);
  const session = !!user;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const t = translations[locale];

  return (
    <header
      data-site-nav
      className="sticky top-0 z-50 w-full glass border-b shadow-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-90"
        >
          <span className="text-xl tracking-tight">E‑Market</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <Link href="/Dashboard/mens">{t.nav.men}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <Link href="/Dashboard/womans">{t.nav.women}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <Link href="/Dashboard/kids">{t.nav.kids}</Link>
          </Button>
        </nav>

        {/* Search */}
        <div className="hidden flex-1 max-w-md lg:flex lg:max-w-sm lg:justify-center">
          <Suspense
            fallback={
              <div className="h-9 w-full rounded-md border bg-muted/50" />
            }
          >
            <SearchBar placeholder={t.nav.search} />
          </Suspense>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart" title={t.nav.viewCart}>
              <CiShoppingCart className="size-5" />
            </Link>
          </Button>

          {!session ? (
            <Button asChild>
              <Link href="/auth" className="inline-flex items-center gap-2">
                <User className="size-4" />
                {t.nav.signIn}
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="sm">
                <Link href="/my-orders">{t.nav.myOrders}</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/profile">{t.nav.profile}</Link>
              </Button>
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2"
                  >
                    <LayoutDashboard className="size-4" />
                    {t.nav.admin}
                  </Link>
                </Button>
              )}
              <SignoutButton label={t.nav.signOut} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t px-4 py-2 lg:hidden">
        <Suspense
          fallback={
            <div className="h-9 w-full rounded-md border bg-muted/50" />
          }
        >
          <SearchBar placeholder={t.nav.search} />
        </Suspense>
      </div>

      <NavHeightSync />
    </header>
  );
}
