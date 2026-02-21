"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type CheckoutItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type ShippingInfo = {
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
};

export async function createOrder(
  items: CheckoutItem[],
  paymentMethod: "cash" | "card",
  shipping: ShippingInfo,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("You must be signed in to place an order.");
  }
  if (!items.length) {
    throw new Error("Cart is empty.");
  }
  if (!shipping.shippingName?.trim() || !shipping.shippingAddress?.trim() || !shipping.shippingPhone?.trim()) {
    throw new Error("Shipping name, address, and phone are required.");
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
    select: { id: true, price: true, stock: true },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  const orderItems: { productId: string; quantity: number; price: number }[] = [];
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found.`);
    const price = Number(product.price);
    const qty = Math.min(item.quantity, product.stock);
    if (qty < 1) throw new Error(`Product ${item.productId} is out of stock.`);
    orderItems.push({ productId: product.id, quantity: qty, price });
    total += price * qty;
  }

  const order = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: session.user.id,
        total: new Prisma.Decimal(total),
        status: "PENDING",
        shippingName: shipping.shippingName.trim(),
        shippingAddress: shipping.shippingAddress.trim(),
        shippingPhone: shipping.shippingPhone.trim(),
        items: {
          create: orderItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: new Prisma.Decimal(i.price),
          })),
        },
      },
      select: { id: true },
    });

    await tx.payment.create({
      data: {
        orderId: order.id,
        amount: new Prisma.Decimal(total),
        method: paymentMethod === "cash" ? "cash" : "card",
        status: paymentMethod === "cash" ? "completed" : "pending",
        transactionId:
          paymentMethod === "card"
            ? `card_${Date.now()}_${Math.random().toString(36).slice(2)}`
            : null,
      },
    });

    for (const i of orderItems) {
      await tx.product.update({
        where: { id: i.productId },
        data: { stock: { decrement: i.quantity } },
      });
    }

    return order;
  });

  return { orderId: order.id };
}
