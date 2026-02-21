"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "@/lib/locale-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { createOrder } from "@/app/actions/order";
import { toast } from "sonner";
import { Banknote, CreditCard, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

type Step = "shipping" | "payment" | "card";

export function CheckoutClient() {
  const router = useRouter();
  const t = useTranslations().checkout;
  const { items, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingPhone: "",
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground">{t.cartEmpty}</p>
        <Button asChild className="mt-4">
          <Link href="/Dashboard/mens">{t.browseProducts}</Link>
        </Button>
      </div>
    );
  }

  const validateShipping = () => {
    const err: Record<string, string> = {};
    if (!shipping.shippingName.trim()) err.shippingName = t.nameRequired;
    if (!shipping.shippingAddress.trim()) err.shippingAddress = t.addressRequired;
    if (!shipping.shippingPhone.trim()) err.shippingPhone = t.phoneRequired;
    setShippingErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextFromShipping = () => {
    if (!validateShipping()) return;
    setStep("payment");
  };

  const handleNextFromPayment = () => {
    if (paymentMethod === "card") {
      setStep("card");
    } else {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    if (step === "shipping" || (step === "payment" && paymentMethod === "card")) return;
    if (step === "shipping" && !validateShipping()) return;
    if (step === "payment" && paymentMethod === "cash" && !validateShipping()) return;

    setLoading(true);
    try {
      const { orderId } = await createOrder(
        items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
        paymentMethod,
        {
          shippingName: shipping.shippingName.trim(),
          shippingAddress: shipping.shippingAddress.trim(),
          shippingPhone: shipping.shippingPhone.trim(),
        },
      );
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/my-orders?created=${orderId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardSubmit = () => {
    if (!cardInfo.cardNumber.trim() || !cardInfo.expiry.trim() || !cardInfo.cvv.trim() || !cardInfo.nameOnCard.trim()) {
      toast.error(t.fillCardFields);
      return;
    }
    handlePlaceOrder();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <h2 className="font-semibold">{t.orderSummary}</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {items.map((i) => (
            <li key={i.productId}>
              {i.name} × {i.quantity} — ${(i.price * i.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold">{t.total}: ${totalAmount.toFixed(2)}</p>
      </div>

      {/* Step 1: Shipping */}
      {step === "shipping" && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <h2 className="font-semibold">{t.shippingContact}</h2>
          <p className="text-sm text-muted-foreground">{t.shippingSub}</p>
          <Field>
            <FieldLabel htmlFor="shippingName">{t.fullName}</FieldLabel>
            <Input
              id="shippingName"
              value={shipping.shippingName}
              onChange={(e) => setShipping((s) => ({ ...s, shippingName: e.target.value }))}
              placeholder={t.placeholders.name}
            />
            {shippingErrors.shippingName && <FieldError errors={[{ message: shippingErrors.shippingName }]} />}
          </Field>
          <Field>
            <FieldLabel htmlFor="shippingAddress">{t.address}</FieldLabel>
            <Input
              id="shippingAddress"
              value={shipping.shippingAddress}
              onChange={(e) => setShipping((s) => ({ ...s, shippingAddress: e.target.value }))}
              placeholder={t.placeholders.address}
            />
            {shippingErrors.shippingAddress && <FieldError errors={[{ message: shippingErrors.shippingAddress }]} />}
          </Field>
          <Field>
            <FieldLabel htmlFor="shippingPhone">{t.phoneNumber}</FieldLabel>
            <Input
              id="shippingPhone"
              type="tel"
              value={shipping.shippingPhone}
              onChange={(e) => setShipping((s) => ({ ...s, shippingPhone: e.target.value }))}
              placeholder={t.placeholders.phone}
            />
            {shippingErrors.shippingPhone && <FieldError errors={[{ message: shippingErrors.shippingPhone }]} />}
          </Field>
          <Button onClick={handleNextFromShipping} className="w-full gap-2">
            {t.continueToPayment} <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Payment method */}
      {step === "payment" && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setStep("shipping")} className="gap-2 -ml-2">
            <ArrowLeft className="size-4" /> {t.editShipping}
          </Button>
          <h2 className="font-semibold">{t.paymentMethod}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${
                paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <Banknote className="size-6 text-primary" />
              <div>
                <p className="font-medium">{t.cashDelivery}</p>
                <p className="text-sm text-muted-foreground">{t.cashSub}</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${
                paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <CreditCard className="size-6 text-primary" />
              <div>
                <p className="font-medium">{t.cardPayment}</p>
                <p className="text-sm text-muted-foreground">{t.cardSub}</p>
              </div>
            </button>
          </div>
          {paymentMethod === "cash" ? (
            <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> {t.placingOrder}</> : `${t.placeOrder} — $${totalAmount.toFixed(2)}`}
            </Button>
          ) : (
            <Button size="lg" className="w-full" onClick={handleNextFromPayment}>
              {t.continueToCardDetails} <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      )}

      {/* Step 3: Card details */}
      {step === "card" && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setStep("payment")} className="gap-2 -ml-2">
            <ArrowLeft className="size-4" /> {t.backToPayment}
          </Button>
          <h2 className="font-semibold">{t.cardDetails}</h2>
          <p className="text-sm text-muted-foreground">{t.cardDetailsSub}</p>
          <Field>
            <FieldLabel htmlFor="cardNumber">{t.cardNumber}</FieldLabel>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo((c) => ({ ...c, cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16) }))}
              maxLength={19}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="expiry">{t.expiry}</FieldLabel>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={(e) => setCardInfo((c) => ({ ...c, expiry: e.target.value }))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="cvv">{t.cvv}</FieldLabel>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                maxLength={4}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="nameOnCard">{t.nameOnCard}</FieldLabel>
            <Input
              id="nameOnCard"
              placeholder={t.placeholders.name}
              value={cardInfo.nameOnCard}
              onChange={(e) => setCardInfo((c) => ({ ...c, nameOnCard: e.target.value }))}
            />
          </Field>
          <Button size="lg" className="w-full" onClick={handleCardSubmit} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> {t.processing}</> : `${t.payAmount} $${totalAmount.toFixed(2)}`}
          </Button>
        </div>
      )}

      <Button asChild variant="outline" className="w-full">
        <Link href="/cart">{t.backToCart}</Link>
      </Button>
    </div>
  );
}
