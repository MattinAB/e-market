"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";

function toNum(value: { toNumber?: () => number } | number): number {
  if (typeof value === "number") return value;
  return value?.toNumber?.() ?? Number(value);
}

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: { toNumber?: () => number } | number;
  images: string[];
};

export function ProductDetailClient({ product }: { product: Product }) {
  const cart = useCart();
  const price = toNum(product.price);
  const imageUrl = product.images[0] ?? "/placeholder.svg";

  const handleAddToCart = () => {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price,
      imageUrl,
    });
    toast.success(`Added "${product.name}" to cart`);
  };

  const handleBuyNow = () => {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price,
      imageUrl,
      quantity: 1,
    });
    window.location.href = "/checkout";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/Dashboard/mens" className="text-sm text-muted-foreground hover:underline">
        ← Back to shop
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
            unoptimized={imageUrl.startsWith("http")}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary">
            ${price.toFixed(2)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-8 flex gap-3">
            <Button onClick={handleAddToCart} variant="outline" className="gap-2">
              <ShoppingCart className="size-4" />
              Add to cart
            </Button>
            <Button onClick={handleBuyNow} className="gap-2">
              <Zap className="size-4" />
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
