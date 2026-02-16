"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProductCard from "../_components/product-card";

type MensCategory = "All" | "T-Shirts" | "Shirts" | "Shoes";

type MensProduct = {
  id: number;
  title: string;
  price: number;
  category: Exclude<MensCategory, "All">;
  imageUrl: string;
};

const mensCategories: MensCategory[] = ["All", "T-Shirts", "Shirts", "Shoes"];

const mensProducts: MensProduct[] = [
  { id: 1, title: "Basic Cotton Tee", price: 24.99, category: "T-Shirts", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
  { id: 2, title: "Oversized Street Tee", price: 29.99, category: "T-Shirts", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
  { id: 3, title: "Slim Fit Oxford Shirt", price: 39.99, category: "Shirts", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
  { id: 4, title: "Linen Casual Shirt", price: 42.99, category: "Shirts", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
  { id: 5, title: "Leather Sneakers", price: 59.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
  { id: 6, title: "Casual Loafers", price: 54.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/1/3008/2008.jpg?hmac=0-5IuA4lYqCAdk1lN8k4yxjO-pDuwWQEPZdwzL9eU6k" },
];

export default function MensPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [activeCategory, setActiveCategory] = useState<MensCategory>("All");

  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === "All"
        ? mensProducts
        : mensProducts.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Men</h1>
        <p className="text-muted-foreground">
          T-shirts, shirts, shoes & more
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {mensCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No products match your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
