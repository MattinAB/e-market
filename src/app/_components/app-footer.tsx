"use client";

import Link from "next/link";
import { Facebook, Twitter } from "lucide-react";
import { useTranslations } from "@/lib/locale-provider";

export default function AppFooter() {
  const t = useTranslations().footer;
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t.shop}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/Dashboard/mens" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.men}
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/womans" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.women}
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/kids" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.kids}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t.help}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/cart" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.cart}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t.company}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.careers}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.press}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t.followUs}
            </h3>
            <div className="mt-4 flex gap-3">
              <Link
                href="/"
                className="rounded-lg border p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </Link>
              <Link
                href="/"
                className="rounded-lg border p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} E‑Market. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
