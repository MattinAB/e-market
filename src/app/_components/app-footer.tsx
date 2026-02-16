"use client";

import Link from "next/link";
import { Facebook, Twitter } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/Dashboard/mens"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/Dashboard/womans"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/Dashboard/kids"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Help
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/cart"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Follow us
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
            © {new Date().getFullYear()} E‑Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
