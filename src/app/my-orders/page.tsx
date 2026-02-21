import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLocale } from "@/lib/locale-server";
import { translations } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default async function MyOrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/auth?callbackUrl=/my-orders");
  }
  const locale = await getLocale();
  const t = translations[locale].myOrders;

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      items: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  });

  const statusVariant = (status: string) => {
    switch (status) {
      case "DELIVERED":
      case "SHIPPED":
        return "default";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.myOrders}</h1>
      <p className="mb-6 text-muted-foreground">
        {t.trackOrders}
      </p>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="size-12 text-muted-foreground/50" />
            <p className="mt-4 font-medium text-muted-foreground">
              {t.noOrders}
            </p>
            <Link
              href="/Dashboard/mens"
              className="mt-4 font-medium text-primary hover:underline"
            >
              {t.browseProducts}
            </Link>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <Card>
                <CardContent className="flex flex-row items-center justify-between pt-6">
                  <div>
                    <p className="font-mono font-medium">
                      {t.order} {order.id.slice(0, 8)}…
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                      {order.items.length} {t.items} · $
                      {Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(order.status)}>
                      {order.status}
                    </Badge>
                    <Link
                      href={`/my-orders/${order.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {t.view}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
