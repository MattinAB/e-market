"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Shirt, ShoppingBag } from "lucide-react";
import { SidebarFilters } from "./sidebar-filters";

type AppSidebarProps = {
  children: React.ReactNode;
};

export function AppSidebar({ children }: AppSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/Dashboard/mens", label: "Men", icon: Shirt },
    { href: "/Dashboard/womans", label: "Women", icon: Shirt },
    { href: "/Dashboard/kids", label: "Kids", icon: ShoppingBag },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50 bg-sidebar/80 backdrop-blur-sm">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold text-sidebar-foreground">
              Shop
            </SidebarGroupLabel>
            <SidebarSeparator className="bg-border/50" />
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {links.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      className="gap-2"
                    >
                      <Link href={href}>
                        <Icon className="size-4" />
                        {label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFilters />
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">
            E‑Market
          </span>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
