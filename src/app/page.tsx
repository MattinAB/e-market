import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Truck, Shield, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_165/0.15),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            New season arrivals
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Style for every
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              moment
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Discover curated fashion for men, women, and kids. Quality pieces
            delivered to your door.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/Dashboard/mens">
                Shop Now
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/Dashboard/kids">Browse Kids</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Find your perfect fit across our curated collections
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Link
              href="/Dashboard/mens"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">Men</span>
              <p className="mt-2 text-sm text-muted-foreground">
                T-shirts, shirts, sneakers & more
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                Shop mens
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
            <Link
              href="/Dashboard/womans"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">Women</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Dresses, tops, accessories
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                Shop womens
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
            <Link
              href="/Dashboard/kids"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 transition-all duration-300 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
            >
              <span className="text-lg font-semibold text-foreground">Kids</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Comfortable & playful styles
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2">
                Shop kids
                <ArrowRight className="size-4 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Truck className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Free shipping</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                On orders over $50
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Shield className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Secure payment</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                100% secure checkout
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <ArrowRight className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Easy returns</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                30-day return policy
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="rounded-xl bg-primary/10 p-3">
                <Headphones className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                24/7 customer help
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
