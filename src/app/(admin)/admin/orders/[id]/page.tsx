import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserWithRole } from "@/lib/get-user-with-role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { OrderReceipt } from "./_components/order-receipt";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserWithRole();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isMerchant = user?.role === "MERCHANT";
  if (!user || (!isAdmin && !isMerchant)) {
    redirect("/");
  }

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, email: true, name: true } },
      items: {
        include: {
          product: {
            select: { id: true, name: true, slug: true, sku: true, shopId: true },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  if (isMerchant && !isAdmin) {
    const merchantShops = await prisma.shop.findMany({
      where: { userId: user.id },
      select: { id: true },
    });
    const shopIds = new Set(merchantShops.map((s) => s.id));
    const orderHasMerchantProduct = order.items.some((i) =>
      shopIds.has(i.product.shopId),
    );
    if (!orderHasMerchantProduct) {
      notFound();
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/orders"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to orders
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Order {order.id.slice(0, 8)}…
          </h1>
        </div>
      </div>

      <OrderReceipt order={order} />
    </div>
  );
}
