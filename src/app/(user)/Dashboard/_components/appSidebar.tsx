"use client";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const isMObile = useIsMobile();

  return (
    <div
      className={
        isMObile
          ? "hidden"
          : "sticky top-(--nav-height,0px) h-screen w-1/3 sm:max-w-1/6 overflow-y-auto bg-fuchsia-100/70"
      }
    >
      <div>Sidebar content</div>
      <div>Sidebar content</div>
      <div>Sidebar content</div>
    </div>
  );
}
