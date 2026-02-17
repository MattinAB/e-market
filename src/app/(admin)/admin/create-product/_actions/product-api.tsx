"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { productCreateInputSchema } from "@/lib/validations/product";

export async function createProduct(input: unknown) {
  // Validate input with Zod
  const validationResult = productCreateInputSchema.safeParse(input);
  if (!validationResult.success) {
    throw new Error(
      `Validation failed: ${validationResult.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ")}`,
    );
  }

  const data = validationResult.data;

  // Check if a product with this slug already exists
  if (data.slug) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });
    if (existingProduct) {
      throw new Error(`A product with the slug"${data.slug}" already exists.`);
    }
  }

  // Check which genres exist in the database (genres require categoryId, so they must exist)
  const genreSlugs = data.genres.map((g) => g.slug);
  const existingGenres =
    genreSlugs.length > 0
      ? await prisma.genre.findMany({
          where: { slug: { in: genreSlugs } },
          select: { slug: true },
        })
      : [];

  // Build Prisma create input
  const productData: Prisma.ProductCreateInput = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: new Prisma.Decimal(data.price),
    stock: data.stock,
    images: data.images,
    isActive: data.isActive,
    ...(data.sku && { sku: data.sku }),
    ...(data.categories.length > 0 && {
      categories: {
        connectOrCreate: data.categories.map((c) => ({
          where: { slug: c.slug },
          create: { name: c.name, slug: c.slug },
        })),
      },
    }),
    ...(existingGenres.length > 0 && {
      genres: {
        connect: existingGenres.map((g) => ({ slug: g.slug })),
      },
    }),
  };

  // Create product
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
