"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

type OrderReceiptProps = {
  order: {
    id: string;
    status: string;
    total: unknown;
    createdAt: Date;
    shippingName?: string | null;
    shippingAddress?: string | null;
    shippingPhone?: string | null;
    user: { email: string; name: string | null } | null;
    items: Array<{
      id: string;
      quantity: number;
      price: unknown;
      product: { name: string; sku: string | null };
    }>;
  };
};

function toNum(value: unknown): number {
  if (typeof value === "number") return value;
  if (value != null && typeof (value as { toNumber?: () => number }).toNumber === "function") {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
}

export function OrderReceipt({ order }: OrderReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="mb-4 flex justify-end print:hidden">
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="mr-2 size-4" />
          Print receipt
        </Button>
      </div>

      <Card id="receipt" className="print:shadow-none">
        <CardHeader className="space-y-1 border-b print:pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">E‑Market — Order Receipt</CardTitle>
            <Badge variant="secondary" className="print:border print:bg-muted">
              {order.status}
            </Badge>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            Order ID: {order.id}
          </p>
          <p className="text-sm text-muted-foreground">
            Date:{" "}
            {new Date(order.createdAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="mb-1 text-sm font-medium text-muted-foreground">
              Customer
            </h3>
            <p className="font-medium">
              {order.user?.name ?? "—"} ({order.user?.email ?? "—"})
            </p>
          </div>

          {(order.shippingName ?? order.shippingAddress ?? order.shippingPhone) && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Shipping
              </h3>
              <p className="font-medium">{order.shippingName ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{order.shippingAddress ?? "—"}</p>
              <p className="text-sm text-muted-foreground">{order.shippingPhone ?? "—"}</p>
            </div>
          )}

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Items
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-2">Product</th>
                  <th className="pb-2 pr-2 text-right">Qty</th>
                  <th className="pb-2 pr-2 text-right">Unit price</th>
                  <th className="pb-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => {
                  const unit = toNum(item.price);
                  const subtotal = unit * item.quantity;
                  return (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 pr-2">
                        <span className="font-medium">{item.product.name}</span>
                        {item.product.sku && (
                          <span className="ml-2 font-mono text-muted-foreground">
                            {item.product.sku}
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-2 text-right">{item.quantity}</td>
                      <td className="py-2 pr-2 text-right">
                        ${unit.toFixed(2)}
                      </td>
                      <td className="py-2 text-right">
                        ${subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t pt-4">
            <p className="text-lg font-semibold">
              Total: ${toNum(order.total).toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

    </>
  );
}
