"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Package, CreditCard, ArrowLeft, PlusCircle, Store } from "lucide-react";

type AdminSidebarProps = {
  children: React.ReactNode;
  role?: string;
  canCreateProduct?: boolean;
};

export function AdminSidebar({
  children,
  role,
  canCreateProduct = true,
}: AdminSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50 bg-sidebar/80 backdrop-blur-sm">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold text-sidebar-foreground">
              Admin
            </SidebarGroupLabel>
            <SidebarSeparator className="bg-border/50" />
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-2">
                    <Link href="/admin/orders">
                      <Package className="size-4" />
                      Orders
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {canCreateProduct && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="gap-2">
                        <Link href="/admin/create-product">
                          <PlusCircle className="size-4" />
                          Create Product
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="gap-2">
                        <Link href="/admin/shops">
                          <Store className="size-4" />
                          Shops
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-2">
                    <Link href="/admin/payments">
                      <CreditCard className="size-4" />
                      Payments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-2">
                    <Link href="/">
                      <ArrowLeft className="size-4" />
                      Back to shop
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">
            E‑Market Admin
          </span>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
