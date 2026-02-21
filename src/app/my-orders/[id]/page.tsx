import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function toNum(value: unknown): number {
  if (typeof value === "number") return value;
  if (value != null && typeof (value as { toNumber?: () => number }).toNumber === "function") {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
}

export default async function MyOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/auth?callbackUrl=/my-orders");
  }

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: {
        include: {
          product: { select: { name: true, sku: true } },
        },
      },
      payments: true,
    },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link href="/my-orders" className="text-sm text-muted-foreground hover:underline">
        ← Back to my orders
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Order {order.id.slice(0, 8)}…</h1>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Status</CardTitle>
          <Badge variant={order.status === "CANCELLED" ? "destructive" : "secondary"}>
            {order.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {(order.shippingName ?? order.shippingAddress ?? order.shippingPhone) && (
            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm">{order.shippingName ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{order.shippingAddress ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{order.shippingPhone ?? "—"}</p>
            </div>
          )}

          <div>
            <h3 className="font-medium">Items</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name}
                  {item.product.sku && (
                    <span className="text-muted-foreground"> ({item.product.sku})</span>
                  )}{" "}
                  × {item.quantity} — $
                  {(toNum(item.price) * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg font-semibold">
            Total: ${toNum(order.total).toFixed(2)}
          </p>

          {order.payments.length > 0 && (
            <div>
              <h3 className="font-medium">Payment</h3>
              <p className="text-sm text-muted-foreground">
                {order.payments[0].method} · {order.payments[0].status}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
