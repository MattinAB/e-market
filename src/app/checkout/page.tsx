import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CheckoutClient } from "./_components/checkout-client";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/auth?callbackUrl=/checkout");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Checkout</h1>
      <CheckoutClient />
    </div>
  );
}
