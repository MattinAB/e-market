"use client";

import { useRef, useState } from "react";
import SuccessAlert from "./successAlert";
import { productCreateInputSchema } from "@/lib/validations/product";
import { createProduct } from "../_actions/product-api";

export default function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<string[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormErrors(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Parse comma-separated category names and slugs
      const categoryNames = String(formData.get("categoryName") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const categorySlugs = String(formData.get("categorySlug") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Parse comma-separated genre names and slugs
      const genreNames = String(formData.get("genresName") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const genreSlugs = String(formData.get("genreSlug") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Combine names and slugs into objects
      const categories = categoryNames.map((name, index) => ({
        name,
        slug: categorySlugs[index] || name.toLowerCase().replace(/\s+/g, "-"),
      }));
      const genres = genreNames.map((name, index) => ({
        name,
        slug: genreSlugs[index] || name.toLowerCase().replace(/\s+/g, "-"),
      }));

      const productData = {
        name: String(formData.get("name") ?? ""),
        slug: String(formData.get("slug") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: String(formData.get("price") ?? "0"),
        stock: String(formData.get("stock") ?? "0"),
        sku: String(formData.get("sku") ?? ""),
        images: String(formData.get("images") ?? ""),
        categories,
        genres,
        isActive: formData.get("isActive") === "on",
      };

      // Validate with Zod on client side first
      const validationResult = productCreateInputSchema.safeParse(productData);
      if (!validationResult.success) {
        setFormErrors(
          validationResult.error.issues.map(
            (issue) => `${issue.path.join(".")}: ${issue.message}`,
          ),
        );
        return;
      }

      const res = await createProduct(validationResult.data);
      if (res.id) {
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        formRef.current?.reset();
        setIsSuccess(true);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create product";
      setFormErrors([errorMessage]);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex flex-col items-center min-h-screen pt-[10vh]">
      {isSuccess && <SuccessAlert title="Product created successfully." />}
      <h1 className="font-sans font-bold text-2xl text-gray-800">
        Create Product
      </h1>
      <div className="flex  m-2 min-w-3xl justify-center shadow-2xl py-2.5">
        <form
          ref={formRef}
          className="flex flex-col gap-4 w-full max-w-md px-4"
          onSubmit={handleSubmit}
        >
          {formErrors && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded">
              <strong className="block font-medium">Validation errors:</strong>
              <ul className="list-disc pl-5">
                {formErrors.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="name">
              Product Name
            </label>
            <input
              className="border-black border-2 p-1"
              id="name"
              name="name"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="slug">
              Slug
            </label>
            <input
              className="border-black border-2 p-1"
              id="slug"
              name="slug"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="border-black border-2 p-1"
              id="description"
              name="description"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="price">
              Price
            </label>
            <input
              className="border-black border-2 p-1"
              id="price"
              name="price"
              type="number"
              step="0.01"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              className="border-black border-2 p-1"
              id="stock"
              name="stock"
              type="number"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="sku">
              SKU
            </label>
            <input
              className="border-black border-2 p-1"
              id="sku"
              name="sku"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="images">
              Image URLs (comma separated)
            </label>
            <input
              className="border-black border-2 p-1"
              id="images"
              name="images"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mr-2 font-mono font-medium"
              htmlFor="categoryName"
            >
              Categories-name (comma separated)
            </label>
            <input
              className="border-black border-2 p-1"
              id="categoryName"
              name="categoryName"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mr-2 font-mono font-medium"
              htmlFor="categorySlug"
            >
              Categories-Slug (comma separated)
            </label>
            <input
              className="border-black border-2 p-1"
              id="categorySlug"
              name="categorySlug"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="genresName">
              Genres-name (comma separated)
            </label>
            <input
              className="border-black border-2 p-1"
              id="genresName"
              name="genresName"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 font-mono font-medium" htmlFor="genreSlug">
              Genres-slug (comma separated)
            </label>
            <input
              className="border-black border-2 p-1"
              id="genreSlug"
              name="genreSlug"
              type="text"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <input
              className="border-black border-2 p-1"
              id="isActive"
              name="isActive"
              type="checkbox"
            />
            <label className="font-mono font-medium" htmlFor="isActive">
              Is Active
            </label>
          </div>

          <button
            className="bg-black text-white p-2 font-bold mt-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
