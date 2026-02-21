-- Add MERCHANT to Role enum
ALTER TYPE "Role" ADD VALUE 'MERCHANT';

-- CreateTable
CREATE TABLE "shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "shop_slug_key" ON "shop"("slug");
CREATE INDEX "shop_userId_idx" ON "shop"("userId");

-- Add shopId to Product (nullable first for existing rows)
ALTER TABLE "Product" ADD COLUMN "shopId" TEXT;

-- Create default shop and assign existing products (when at least one user exists)
DO $$
DECLARE
  first_user_id TEXT;
  default_shop_id TEXT;
BEGIN
  SELECT "id" INTO first_user_id FROM "user" LIMIT 1;
  IF first_user_id IS NOT NULL THEN
    default_shop_id := gen_random_uuid()::text;
    INSERT INTO "shop" ("id", "name", "slug", "userId", "createdAt", "updatedAt")
    VALUES (default_shop_id, 'Default Shop', 'default-shop', first_user_id, NOW(), NOW());
    UPDATE "Product" SET "shopId" = default_shop_id WHERE "shopId" IS NULL;
  END IF;
END $$;

-- Make shopId NOT NULL (requires at least one user in DB when products exist)
ALTER TABLE "Product" ALTER COLUMN "shopId" SET NOT NULL;

CREATE INDEX "Product_shopId_idx" ON "Product"("shopId");

ALTER TABLE "shop" ADD CONSTRAINT "shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
