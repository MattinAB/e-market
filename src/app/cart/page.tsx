import { CartContent } from "./_components/cart-content";
import { getLocale } from "@/lib/locale-server";
import { translations } from "@/lib/i18n";

export default async function CartPage() {
  const locale = await getLocale();
  const t = translations[locale].cart;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.yourCart}</h1>
      <CartContent />
    </div>
  );
}
