import { CartContent } from "./_components/cart-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Your cart</h1>
      <CartContent
        empty={
          <div className="flex flex-col items-center rounded-2xl border bg-card p-12 text-center shadow-sm">
            <div className="rounded-full bg-primary/10 p-4">
              <ShoppingBag className="size-12 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Add items from the shop. When you&apos;re ready, proceed to
              checkout.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/Dashboard/mens">Browse products</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
