"use server";

import { prisma } from "@/lib/prisma";

export async function createShop(input: {
  name: string;
  slug: string;
  userId: string;
}) {
  const slug = input.slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  if (!slug) {
    throw new Error("Invalid slug");
  }
  const existing = await prisma.shop.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (existing) {
    throw new Error(`A shop with slug "${slug}" already exists.`);
  }
  const owner = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { role: true },
  });
  const makeMerchant =
    owner?.role === "USER" || owner?.role === "MERCHANT"
      ? prisma.user.update({
          where: { id: input.userId },
          data: { role: "MERCHANT" as const },
        })
      : Promise.resolve(null);

  await prisma.$transaction([
    prisma.shop.create({
      data: {
        name: input.name.trim(),
        slug,
        userId: input.userId,
      },
    }),
    makeMerchant,
  ]);
}
