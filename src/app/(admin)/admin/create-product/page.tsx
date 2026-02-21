import CreateForm from "./_components/createForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserWithRole } from "@/lib/get-user-with-role";
import { prisma } from "@/lib/prisma";

export default async function CreateProductPage() {
  const user = await getUserWithRole();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  if (!isAdmin) {
    redirect("/admin");
  }

  const shops = await prisma.shop.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  if (shops.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-lg font-semibold">No shops yet</h2>
        <p className="text-sm text-muted-foreground">
          Create at least one shop in the admin dashboard before adding
          products. Each product belongs to a shop (merchant).
        </p>
        <Link
          href="/admin/shops"
          className="inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go to Shops
        </Link>
      </div>
    );
  }

  return <CreateForm shops={shops} />;
}
