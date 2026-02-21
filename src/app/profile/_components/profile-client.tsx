"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/lib/locale-provider";
import SignoutButton from "@/app/_components/signout-button";
import { Package, ShoppingBag } from "lucide-react";

export function ProfileClient() {
  const t = useTranslations().profile;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t.settings}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link href="/my-orders">
            <Package className="size-4" />
            {t.myOrders}
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link href="/cart">
            <ShoppingBag className="size-4" />
            {t.cart}
          </Link>
        </Button>
        <div className="pt-2 border-t">
          <SignoutButton label={t.signOut} />
        </div>
      </CardContent>
    </Card>
  );
}
