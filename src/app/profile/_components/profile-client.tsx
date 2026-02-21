"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignoutButton from "@/app/_components/signout-button";
import { Package, ShoppingBag } from "lucide-react";

export function ProfileClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link href="/my-orders">
            <Package className="size-4" />
            My orders
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start gap-2">
          <Link href="/cart">
            <ShoppingBag className="size-4" />
            Cart
          </Link>
        </Button>
        <div className="pt-2 border-t">
          <SignoutButton label="Sign out" />
        </div>
      </CardContent>
    </Card>
  );
}
