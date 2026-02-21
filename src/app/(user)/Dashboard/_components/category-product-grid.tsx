"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/locale-provider";
import ProductCard from "./product-card";

type ProductFromDb = {
  id: string;
  name: string;
  slug: string;
  price: { toNumber?: () => number } | number;
  images: string[];
  categories: { slug: string; name: string }[];
};

type CategoryProductGridProps = {
  products: ProductFromDb[];
  title: string;
  subtitle: string;
};

export function CategoryProductGrid({
  products,
  title,
  subtitle,
}: CategoryProductGridProps) {
  const t = useTranslations().category;
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const allLabel = t.all;
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  const toNum = (value: { toNumber?: () => number } | number): number =>
    typeof value === "number" ? value : value?.toNumber?.() ?? Number(value);

  const categoryLabels = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      p.categories.forEach((c) => set.add(c.name)),
    );
    return Array.from(set).sort();
  }, [products]);

  const filterLabels = ["All", ...categoryLabels];

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") {
      const slug = activeCategory.toLowerCase().replace(/\s+/g, "-");
      list = list.filter((p) =>
        p.categories.some(
          (c) =>
            c.slug === slug ||
            c.name.toLowerCase() === activeCategory.toLowerCase(),
        ),
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categories.some(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.slug.includes(q),
          ),
      );
    }
    const minP = minPriceParam != null ? parseFloat(minPriceParam) : null;
    const maxP = maxPriceParam != null ? parseFloat(maxPriceParam) : null;
    if (minP != null && !isNaN(minP)) {
      list = list.filter((p) => toNum(p.price) >= minP);
    }
    if (maxP != null && !isNaN(maxP)) {
      list = list.filter((p) => toNum(p.price) <= maxP);
    }
    const sorted = [...list];
    if (sort === "price_asc") {
      sorted.sort((a, b) => toNum(a.price) - toNum(b.price));
    } else if (sort === "price_desc") {
      sorted.sort((a, b) => toNum(b.price) - toNum(a.price));
    } else if (sort === "newest") {
      sorted.sort(() => 0);
    }
    return sorted;
  }, [products, activeCategory, query, sort, minPriceParam, maxPriceParam]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {filterLabels.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {filterLabels.map((label) => (
            <Button
              key={label}
              variant={activeCategory === label ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(label)}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          {products.length === 0
            ? "No products in this category yet. Check back later or browse other sections."
            : "No products match your search."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              slug={product.slug}
              title={product.name}
              price={product.price}
              imageUrl={product.images[0] ?? "/placeholder.svg"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
