export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const translations = {
  en: {
    nav: { men: "Men", women: "Women", kids: "Kids", signIn: "Sign in", signOut: "Sign out", admin: "Admin", cart: "Cart", search: "Search products..." },
    home: { hero: "Style for every", moment: "moment", subtitle: "Discover curated fashion for men, women, and kids. Quality pieces delivered to your door.", shopNow: "Shop Now", browseKids: "Browse Kids" },
    footer: { shop: "Shop", help: "Help", company: "Company", followUs: "Follow us" },
  },
  ar: {
    nav: { men: "رجال", women: "نساء", kids: "أطفال", signIn: "تسجيل الدخول", signOut: "تسجيل الخروج", admin: "إدارة", cart: "السلة", search: "البحث عن المنتجات..." },
    home: { hero: "أسلوب لكل", moment: "لحظة", subtitle: "اكتشف أزياء مختارة للرجال والنساء والأطفال. قطع عالية الجودة تُوصَل إلى بابك.", shopNow: "تسوق الآن", browseKids: "تصفح الأطفال" },
    footer: { shop: "تسوق", help: "مساعدة", company: "الشركة", followUs: "تابعنا" },
  },
} as const;

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}
