import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserWithRole } from "@/lib/get-user-with-role";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { CreateShopForm } from "./_components/create-shop-form";

export default async function AdminShopsPage() {
  const user = await getUserWithRole();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  if (!user || !isAdmin) {
    redirect("/admin");
  }

  const [shops, users] = await Promise.all([
    prisma.shop.findMany({
      orderBy: { name: "asc" },
      include: {
        user: { select: { id: true, email: true, name: true } },
        _count: { select: { products: true } },
      },
    }),
    prisma.user.findMany({
      orderBy: { email: "asc" },
      select: { id: true, email: true, name: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Store className="size-7 text-primary" />
          Shops
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage shops (merchants). Each shop has its own products and orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create shop</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add a new shop and assign an owner. The owner can be set as
            MERCHANT to view their products and orders.
          </p>
        </CardHeader>
        <CardContent>
          <CreateShopForm users={users} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All shops</CardTitle>
          <p className="text-sm text-muted-foreground">
            {shops.length} shop{shops.length !== 1 ? "s" : ""} found
          </p>
        </CardHeader>
        <CardContent>
          {shops.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
              <Store className="size-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium text-muted-foreground">
                No shops yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create a shop above. The migration may have created a &quot;Default
                Shop&quot; if you had users.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Products</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shops.map((shop) => (
                    <TableRow key={shop.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {shop.slug}
                      </TableCell>
                      <TableCell className="text-sm">
                        {shop.user?.name ?? "—"}
                        <span className="block text-muted-foreground">
                          {shop.user?.email}
                        </span>
                      </TableCell>
                      <TableCell>{shop._count.products}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
