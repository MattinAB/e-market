"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function ProductCard() {
  const isMobile = useIsMobile();
  return (
    <div className="flex  flex-col h-full w-full max-w-md shadow-xl bg-white rounded-xl overflow-hidden">
      {/* Image container with explicit height so Next/Image `fill` has a non-zero parent */}
      <div className="relative  aspect-square  w-full">
        <Image
          src={
            "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4"
          }
          alt="kondra"
          fill
        />
      </div>

      <div className="flex flex-col grow p-4">
        <h3 className="text-lg font-semibold text-gray-800">Product Title</h3>
        <p className="text-sm text-gray-500">$19.99</p>
      </div>
      <div
        className={`${isMobile ? "flex gap-1 py-1 max-w-9/12 mx-auto " : "flex justify-end gap-2 p-2"}`}
      >
        <Button>Add Cart</Button>
        <Button>Buy</Button>
      </div>
    </div>
  );
}
