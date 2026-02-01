"use client";
import { Button } from "@/components/ui/button";
import { PiSignOut } from "react-icons/pi";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const isMobile = useIsMobile();
  const router = useRouter();

  async function logout() {
    const { data } = await authClient.signOut();
    if (data?.success) {
      // navigate to auth page and refresh server components so session updates
      router.push("/auth");
      router.refresh();
    }
  }

  return (
    <Button
      className="items-center hover:bg-slate-100 hover:text-black hover:scale-[1.1] transition-all duration-300 ease-in-out"
      onClick={logout}
    >
      SignOut
      <PiSignOut size={isMobile ? 18 : 26} />
    </Button>
  );
}
