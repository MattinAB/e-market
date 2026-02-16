"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type SignoutButtonProps = {
  label?: string;
};

export default function SignoutButton({ label = "Sign out" }: SignoutButtonProps) {
  const router = useRouter();

  async function logout() {
    const { data } = await authClient.signOut();
    if (data?.success) {
      router.push("/auth");
      router.refresh();
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={logout}
      className="gap-2"
    >
      <LogOut className="size-4" />
      {label}
    </Button>
  );
}
