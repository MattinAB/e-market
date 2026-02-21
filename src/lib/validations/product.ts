import { z } from "zod";

export const productCreateInputSchema = z.object({
  shopId: z.string().min(1, "Shop is required"),
  name: z.string().min(1, "Product name is required").max(255),
  slug: z
    .string()
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    )
    .optional(), // derived from name on server if omitted
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required"),
  sku: z.string().optional(),
  isActive: z.boolean().default(true),
  categories: z
    .array(
      z.object({
        name: z.string().min(1, "Category name is required"),
        slug: z.string().min(1).optional(), // derived from name on server if omitted
      }),
    )
    .default([]),
  genres: z
    .array(
      z.object({
        name: z.string().min(1, "Genre name is required"),
        slug: z.string().min(1).optional(), // derived from name on server if omitted
      }),
    )
    .default([]),
});

export type ProductCreateInput = z.infer<typeof productCreateInputSchema>;
