import { redirect } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default async function AdminOrdersPage() {
  const user = await getUserWithRole();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Package className="size-7 text-primary" />
          Orders
        </h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all marketplace orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            {orders.length} order{orders.length !== 1 ? "s" : ""} found
          </p>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
              <Package className="size-12 text-muted-foreground/50" />
              <p className="mt-4 font-medium text-muted-foreground">
                No orders yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Orders will appear here when customers checkout.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {order.id.slice(0, 8)}…
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {order.userId.slice(0, 8)}…
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${Number(order.total).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
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
