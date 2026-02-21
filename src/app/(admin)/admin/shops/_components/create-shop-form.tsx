"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createShop } from "../_actions/shop-api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CreateShopFormProps = {
  users?: { id: string; email: string; name: string | null }[];
};

export function CreateShopForm({ users = [] }: CreateShopFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [userId, setUserId] = useState(users[0]?.id ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Shop name is required");
      return;
    }
    if (!userId) {
      toast.error("Please select an owner");
      return;
    }
    setLoading(true);
    try {
      await createShop({
        name: name.trim(),
        slug: slug.trim() || name.trim().toLowerCase().replace(/\s+/g, "-"),
        userId,
      });
      toast.success("Shop created");
      setName("");
      setSlug("");
      setUserId(users[0]?.id ?? "");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create shop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <Field className="min-w-[180px]">
        <FieldLabel htmlFor="shop-name">Name</FieldLabel>
        <Input
          id="shop-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
          }}
          placeholder="My Store"
        />
      </Field>
      <Field className="min-w-[180px]">
        <FieldLabel htmlFor="shop-slug">Slug</FieldLabel>
        <Input
          id="shop-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="my-store"
        />
      </Field>
      <Field className="min-w-[200px]">
        <FieldLabel htmlFor="shop-owner">Owner</FieldLabel>
        <select
          id="shop-owner"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email} ({u.email})
            </option>
          ))}
        </select>
      </Field>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating…" : "Create shop"}
      </Button>
    </form>
  );
}
