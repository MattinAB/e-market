import { prisma } from "@/lib/prisma";
import { CategoryProductGrid } from "../_components/category-product-grid";

const CATEGORY_SLUGS = ["kids", "children"];

export default async function KidsPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      categories: {
        some: {
          slug: { in: CATEGORY_SLUGS },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      images: true,
      categories: { select: { slug: true, name: true } },
    },
  });

  return (
    <CategoryProductGrid
      products={products}
      title="Kids"
      subtitle="Clothing, shoes, toys & more"
    />
  );
}
