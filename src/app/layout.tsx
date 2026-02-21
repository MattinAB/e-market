import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import NavigationBar from "./_components/navigation-bar";
import { Toaster } from "@/components/ui/sonner";
import AppFooter from "./_components/app-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { LocaleProvider } from "@/lib/locale-provider";
import { getLocale } from "@/lib/locale-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E‑Market | Fashion for Every Moment",
  description: "Discover curated fashion for men, women, and kids. Quality pieces delivered to your door.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider locale={locale}>
            <CartProvider>
              <NavigationBar />
              {children}
              <Toaster richColors position="top-center" closeButton={true} />
              <AppFooter />
            </CartProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
