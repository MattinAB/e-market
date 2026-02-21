import { prisma } from "@/lib/prisma";
import { CategoryProductGrid } from "../_components/category-product-grid";

const CATEGORY_SLUGS = ["mens", "men"];

export default async function MensPage() {
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
      title="Men"
      subtitle="T-shirts, shirts, shoes & more"
    />
  );
}
