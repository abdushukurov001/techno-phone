import { TELEGRAM_USERNAME } from "./config";
import { categoryOf, keySpecs, productTitle, type Product } from "./catalog";
import { formatMonthly, type InstallmentResult } from "./installment";

export const telegramLink = (message: string) =>
  `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;

const nameLine = (p: Product) => {
  const emoji = categoryOf(p.category)?.emoji ?? "📱";
  return `${emoji} ${[productTitle(p), keySpecs(p), p.color].filter(Boolean).join(" — ")}`;
};

export function buildOrderMessage(p: Product, url: string, calc: InstallmentResult | null): string {
  if (!calc || calc.mode === "cash") {
    return [
      "Assalomu alaykum! Quyidagi mahsulotni naqd olmoqchiman:",
      "",
      nameLine(p),
      `💰 Narxi: $${Number(p.price)}`,
      `🔗 ${url}`,
    ].join("\n");
  }
  return [
    "Assalomu alaykum! Quyidagi mahsulotni nasiyaga olmoqchiman:",
    "",
    nameLine(p),
    `💰 Narxi: $${Number(p.price)}`,
    `💵 Boshlang'ich to'lov: ${calc.down > 0 ? "$" + calc.down : "yo'q"}`,
    `📅 Muddat: ${calc.months} oy`,
    `🧾 Oylik to'lov: $${formatMonthly(calc.monthly)}`,
    `🔗 ${url}`,
  ].join("\n");
}

export const buildQuestionMessage = (p: Product, url: string) =>
  `Assalomu alaykum! Savolim bor:\n\n${nameLine(p)}\n🔗 ${url}`;
