import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "./_components/product-detail-client";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      images: true,
    },
  });
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
