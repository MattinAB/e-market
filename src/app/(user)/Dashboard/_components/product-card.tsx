"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

type ProductCardProps = {
  title: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  const isMobile = useIsMobile();

  const handleAddToCart = () => {
    toast.success(`Added "${title}" to cart`);
  };

  const handleBuyNow = () => {
    toast.info("Checkout coming soon");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-square w-full overflow-hidden bg-muted/50">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-semibold text-foreground">{title}</h3>
        <p className="text-lg font-bold text-primary">
          ${price.toFixed(2)}
        </p>

        <div
          className={`mt-auto flex gap-2 ${
            isMobile
              ? "flex-col"
              : "flex-row"
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
