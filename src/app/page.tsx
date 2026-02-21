import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Truck, Shield, Headphones } from "lucide-react";
import { getLocale } from "@/lib/locale-server";
import { translations } from "@/lib/i18n";

export default async function Home() {
  const locale = await getLocale();
  const t = translations[locale].home;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_165/0.15),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            {t.newArrivals}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.hero}
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.moment}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/Dashboard/mens">
                {t.shopNow}
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/Dashboard/kids">{t.browseKids}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t.shopByCategory}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            {t.shopByCategorySub}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Link
              href="/Dashboard/mens"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">{t.men}</span>
              <p className="mt-2 text-sm text-muted-foreground">{t.menSub}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                {t.shopMens}
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
            <Link
              href="/Dashboard/womans"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">{t.women}</span>
              <p className="mt-2 text-sm text-muted-foreground">{t.womenSub}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                {t.shopWomens}
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
            <Link
              href="/Dashboard/kids"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">{t.kids}</span>
              <p className="mt-2 text-sm text-muted-foreground">{t.kidsSub}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                {t.shopKids}
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Truck className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{t.freeShipping}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.freeShippingSub}</p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{t.securePayment}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.securePaymentSub}</p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <ArrowRight className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{t.easyReturns}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.easyReturnsSub}</p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Headphones className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{t.support}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.supportSub}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
