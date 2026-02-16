import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default async function CartPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center rounded-2xl border bg-card p-12 text-center shadow-sm">
        <div className="rounded-full bg-primary/10 p-4">
          <ShoppingBag className="size-12 text-primary" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Add items to your cart as you browse. When you&apos;re ready, we&apos;ll
          have checkout waiting.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/Dashboard/mens">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
