import { prisma } from "@/lib/prisma";
import { CategoryProductGrid } from "../_components/category-product-grid";

const CATEGORY_SLUGS = ["womans", "women", "womens"];

export default async function WomansPage() {
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
      title="Women"
      subtitle="Dresses, tops, shoes & more"
    />
  );
}
