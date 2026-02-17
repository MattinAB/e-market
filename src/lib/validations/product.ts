import { z } from "zod";

export const productCreateInputSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only",
    ),
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
        slug: z.string().min(1, "Category slug is required"),
      }),
    )
    .default([]),
  genres: z
    .array(
      z.object({
        slug: z.string().min(1, "Genre slug is required"),
      }),
    )
    .default([]),
});

export type ProductCreateInput = z.infer<typeof productCreateInputSchema>;
