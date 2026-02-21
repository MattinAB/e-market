import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLocale } from "@/lib/locale-server";
import { translations } from "@/lib/i18n";
import { CheckoutClient } from "./_components/checkout-client";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/auth?callbackUrl=/checkout");
  }
  const locale = await getLocale();
  const t = translations[locale].checkout;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.checkout}</h1>
      <CheckoutClient />
    </div>
  );
}
