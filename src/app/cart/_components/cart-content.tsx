"use client";

import { useCart } from "@/lib/cart-context";
import { useTranslations } from "@/lib/locale-provider";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Trash2 } from "lucide-react";

export function CartContent() {
  const { items, totalItems, totalAmount, setQuantity, removeItem } = useCart();
  const t = useTranslations().cart;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border bg-card p-12 text-center shadow-sm">
        <div className="rounded-full bg-primary/10 p-4">
          <ShoppingBag className="size-12 text-primary" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">{t.empty}</h2>
        <p className="mt-2 max-w-sm text-muted-foreground">{t.emptySub}</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/Dashboard/mens">{t.browseProducts}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="divide-y rounded-lg border bg-card">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized={item.imageUrl.startsWith("http")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) setQuantity(item.productId, v);
                }}
                className="w-16"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.productId)}
                aria-label={t.remove}
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>{t.totalItems.replace("{count}", String(totalItems))}</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link href="/checkout">{t.proceedToCheckout}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/Dashboard/mens">{t.continueShopping}</Link>
        </Button>
      </div>
    </div>
  );
}
