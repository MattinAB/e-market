"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { productCreateInputSchema } from "@/lib/validations/product";

/** Generate a URL-safe slug from a name (e.g. "Street Wear" -> "street-wear"). */
function toSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function createProduct(input: unknown) {
  const validationResult = productCreateInputSchema.safeParse(input);
  if (!validationResult.success) {
    throw new Error(
      `Validation failed: ${validationResult.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ")}`,
    );
  }

  const data = validationResult.data;

  // Normalize categories: slug from name when omitted
  const categories = data.categories.map((c) => ({
    name: c.name.trim(),
    slug: c.slug?.trim() || toSlug(c.name),
  }));

  // Normalize genres: slug from name when omitted (genres require a category for create)
  const genres = data.genres.map((g) => ({
    name: g.name.trim(),
    slug: g.slug?.trim() || toSlug(g.name),
  }));

  if (genres.length > 0 && categories.length === 0) {
    throw new Error(
      "At least one category is required when adding genres (each genre belongs to a category).",
    );
  }

  // Product slug: ensure it's set (e.g. from product name)
  const productSlug = data.slug?.trim() || toSlug(data.name);
  if (!productSlug) {
    throw new Error("Product slug could not be derived from name.");
  }

  const existingProduct = await prisma.product.findUnique({
    where: { slug: productSlug },
    select: { id: true },
  });
  if (existingProduct) {
    throw new Error(`A product with the slug "${productSlug}" already exists.`);
  }

  const firstCategorySlug = categories[0]?.slug;

  const productData: Prisma.ProductCreateInput = {
    shop: { connect: { id: data.shopId } },
    name: data.name,
    slug: productSlug,
    description: data.description,
    price: new Prisma.Decimal(data.price),
    stock: data.stock,
    images: data.images,
    isActive: data.isActive,
    ...(data.sku?.trim() && { sku: data.sku.trim() }),
    ...(categories.length > 0 && {
      categories: {
        connectOrCreate: categories.map((c) => ({
          where: { slug: c.slug },
          create: { name: c.name, slug: c.slug },
        })),
      },
    }),
    ...(genres.length > 0 &&
      firstCategorySlug && {
        genres: {
          connectOrCreate: genres.map((g) => ({
            where: { slug: g.slug },
            create: {
              name: g.name,
              slug: g.slug,
              category: { connect: { slug: firstCategorySlug } },
            },
          })),
        },
      }),
  };

  const product = await prisma.product.create({
    data: productData,
    select: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
    },
  });

  return product;
}
