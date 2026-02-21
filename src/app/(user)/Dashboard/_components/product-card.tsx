"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "@/lib/locale-provider";

type ProductCardProps = {
  /** When provided, card uses real cart and links to product detail */
  productId?: string;
  slug?: string;
  title: string;
  price: number;
  imageUrl: string;
};

function toNum(value: { toNumber?: () => number } | number): number {
  if (typeof value === "number") return value;
  return value?.toNumber?.() ?? Number(value);
}

export default function ProductCard({
  productId,
  slug,
  title,
  price,
  imageUrl,
}: ProductCardProps) {
  const isMobile = useIsMobile();
  const cart = useCart();
  const numericPrice = toNum(price);

  const handleAddToCart = () => {
    if (productId != null && slug != null) {
      cart.addItem({
        productId,
        name: title,
        price: numericPrice,
        imageUrl: imageUrl || "/placeholder.svg",
      });
      toast.success(`Added "${title}" to cart`);
    } else {
      toast.info("Product not available for cart.");
    }
  };

  const handleBuyNow = () => {
    if (productId != null && slug != null) {
      cart.addItem({
        productId,
        name: title,
        price: numericPrice,
        imageUrl: imageUrl || "/placeholder.svg",
        quantity: 1,
      });
      window.location.href = "/checkout";
    } else {
      toast.info("Checkout coming soon");
    }
  };

  const detailHref = slug ? `/product/${slug}` : "#";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <Link
        href={detailHref}
        className="relative aspect-square w-full overflow-hidden bg-muted/50"
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized={imageUrl?.startsWith("http")}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={detailHref}>
          <h3 className="line-clamp-2 font-semibold text-foreground hover:underline">
            {title}
          </h3>
        </Link>
        <p className="text-lg font-bold text-primary">
          ${numericPrice.toFixed(2)}
        </p>
        <div
          className={`mt-auto flex gap-2 ${
            isMobile ? "flex-col" : "flex-row"
          }`}
        >
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4" />
            Add to cart
          </Button>
          <Button size="sm" className="flex-1 gap-2" onClick={handleBuyNow}>
            <Zap className="size-4" />
            Buy now
          </Button>
        </div>
      </div>
    </article>
  );
}
