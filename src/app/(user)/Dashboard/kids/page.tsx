"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "../_components/product-card";

type KidsCategory = "All" | "Clothing" | "Shoes" | "Toys";

type KidsProduct = {
  id: number;
  title: string;
  price: number;
  category: Exclude<KidsCategory, "All">;
  imageUrl: string;
};

const kidsCategories: KidsCategory[] = ["All", "Clothing", "Shoes", "Toys"];

const kidsProducts: KidsProduct[] = [
  { id: 1, title: "Kids Graphic T-Shirt", price: 19.99, category: "Clothing", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
  { id: 2, title: "Soft Denim Jacket", price: 34.99, category: "Clothing", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
  { id: 3, title: "Running Sneakers", price: 44.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
  { id: 4, title: "Everyday Canvas Shoes", price: 29.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
  { id: 5, title: "Building Blocks Set", price: 24.99, category: "Toys", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
  { id: 6, title: "Plush Teddy Bear", price: 14.99, category: "Toys", imageUrl: "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4" },
];

export default function KidsPage() {
  const [activeCategory, setActiveCategory] = useState<KidsCategory>("All");

  const filteredProducts =
    activeCategory === "All"
      ? kidsProducts
      : kidsProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kids</h1>
        <p className="text-muted-foreground">
          Clothing, shoes, toys & more
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {kidsCategories.map((category) => (
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
    </div>
  );
}
