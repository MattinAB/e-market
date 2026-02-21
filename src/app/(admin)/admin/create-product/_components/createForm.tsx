"use client";

import { useRef, useState } from "react";
import SuccessAlert from "./successAlert";
import { productCreateInputSchema } from "@/lib/validations/product";
import { createProduct } from "../_actions/product-api";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  shopId: z.string().min(1, "Shop is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }),
  stock: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Stock must be a valid integer",
  }),
  sku: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 3 && val.length <= 20 && /^[A-Z0-9-]+$/.test(val) && val.includes("-")),
      "SKU must be 3–20 chars, uppercase/dash (e.g. TYPE-COLOR-SIZE)",
    ),
  image: z.string().min(1, "Image URLs are required"),
  categorie: z.string().min(1, "Categories are required"),
  genre: z.string().min(1, "Genres are required"),
});

type FormValues = z.infer<typeof formSchema>;

type CreateFormProps = {
  shops: { id: string; name: string; slug: string }[];
};

export default function CreateForm({ shops }: CreateFormProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      shopId: shops[0]?.id ?? "",
      name: "",
      description: "",
      price: "",
      stock: "",
      sku: "",
      image: "",
      categorie: "",
      genre: "",
    },
  });

  async function handleSubmit(data: FormValues) {
    const urls = data.image.split(",").map((url) => url.trim()).filter(Boolean);
    if (urls.length === 0) {
      toast.error("At least one image URL is required.");
      return;
    }
    const input = {
      shopId: data.shopId,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      images: urls,
      ...(data.sku?.trim() && { sku: data.sku.trim() }),
      categories: data.categorie
        .split(",")
        .map((c) => ({ name: c.trim() }))
        .filter((c) => c.name),
      genres: data.genre
        .split(",")
        .map((g) => ({ name: g.trim() }))
        .filter((g) => g.name),
    };

    try {
      const result = await createProduct(input);
      if (result) {
        toast.success("Product created successfully!");
        form.reset();
      }
    } catch {
      toast.error(
        "Failed to create product. Please check your input and try again.",
      );
      return;
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-[10vh]">
      <h1 className="font-sans font-bold text-2xl text-gray-800">
        Create Product
      </h1>
      <div className="flex  m-2 min-w-3xl justify-center shadow-2xl py-2.5">
        <form
          className="flex flex-col gap-4 w-full max-w-md px-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Controller
            name="shopId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Shop
                </FieldLabel>
                <select
                  {...field}
                  id={field.name}
                  className="border-black border-2 p-1 w-full rounded"
                  aria-invalid={fieldState.invalid}
                >
                  <option value="">Select shop</option>
                  {shops.map((shop) => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Product Name
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                  type="text"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Description
                </FieldLabel>
                <textarea
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Price
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1 max-w-1/4"
                  id={field.name}
                  name={field.name}
                  type="text"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Stock
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1 max-w-1/4"
                  id={field.name}
                  name={field.name}
                  type="text"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="sku"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Sku
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                  placeholder="TYPE-COLOR-SIZE"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    const cleaned = e.target.value
                      .toUpperCase()
                      .replace(/\s+/g, "-") // Turn spaces into dashes
                      .replace(/[^A-Z0-9-]/g, ""); // Remove any special characters except dashes
                    field.onChange(cleaned);
                  }}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  ImageUrl
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="http://"
                  type="url"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="categorie"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Mens, Womens, Accessories, etc."
                  type="text"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="genre"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="mr-2 font-mono font-medium"
                  htmlFor={field.name}
                >
                  Genre
                </FieldLabel>
                <Input
                  {...field}
                  className="border-black border-2 p-1"
                  id={field.name}
                  name={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Streetwear, Formal, Casual, etc."
                  type="text"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <button
            className="bg-black text-white p-2 font-bold mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
