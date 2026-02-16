"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "../_components/product-card";

type WomansCategory = "All" | "Dresses" | "Tops" | "Shoes";

type WomansProduct = {
  id: number;
  title: string;
  price: number;
  category: Exclude<WomansCategory, "All">;
  imageUrl: string;
};

const womansCategories: WomansCategory[] = ["All", "Dresses", "Tops", "Shoes"];

const womansProducts: WomansProduct[] = [
  { id: 1, title: "Floral Summer Dress", price: 49.99, category: "Dresses", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
  { id: 2, title: "Evening Wrap Dress", price: 69.99, category: "Dresses", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
  { id: 3, title: "Classic White Blouse", price: 39.99, category: "Tops", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
  { id: 4, title: "Relaxed Fit Tee", price: 24.99, category: "Tops", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
  { id: 5, title: "Strappy Sandals", price: 54.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
  { id: 6, title: "Everyday Sneakers", price: 49.99, category: "Shoes", imageUrl: "https://fastly.picsum.photos/id/1003/3008/2008.jpg?hmac=EuD-s7HUIISXHAvZya4A1LfcBQ1LZljDqvL1rb2Xk2Y" },
];

export default function WomansPage() {
  const [activeCategory, setActiveCategory] = useState<WomansCategory>("All");

  const filteredProducts =
    activeCategory === "All"
      ? womansProducts
      : womansProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Women</h1>
        <p className="text-muted-foreground">
          Dresses, tops, shoes & more
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {womansCategories.map((category) => (
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
