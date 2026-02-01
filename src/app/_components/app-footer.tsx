"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export default function AppFooter() {
  const isMobile = useIsMobile();
  return (
    <div
      className={`${isMobile ? "flex justify-between p-4 items-center w-full bg-neutral-200/80 shadow-[2px_2px_10px_rgba(0,0,0,0.3)]" : "flex justify-around p-4 items-center w-full bg-neutral-200/80 shadow-[2px_2px_10px_rgba(0,0,0,0.3)]"}`}
    >
      <div className="flex flex-col">
        <Link href="/Dashboard/mens">Mens</Link>
        <Link href="/Dashboard/Womans">Woman</Link>
        <Link href="/Dashboard/kids">Kids</Link>
      </div>
      <div className="flex flex-col">
        <Link href="/Dashboard/mens">Cart</Link>
        <Link href="/Dashboard/Womans">FaceBook</Link>
        <Link href="/Dashboard/kids">X</Link>
      </div>
      <div className="flex flex-col">
        <Link href="/Dashboard/mens">About Us</Link>
        <Link href="/Dashboard/Womans">Work with Us</Link>
        <Link href="/Dashboard/kids">Companies </Link>
      </div>
    </div>
  );
}
