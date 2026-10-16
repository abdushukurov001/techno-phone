export const MARKUP = { 3: 0.16, 6: 0.3, 12: 0.49 } as const;
export type Term = keyof typeof MARKUP;
export const TERMS: Term[] = [3, 6, 12];

export type InstallmentResult =
  | { mode: "cash"; price: number; down: number; total: number }
  | { mode: "installment"; price: number; down: number; months: Term; total: number; monthly: number };

const round2 = (x: number) => Math.round(x * 100) / 100;
// Round up to the next cent, tolerant of float noise (e.g. 16820.000000000004).
export const ceilToCent = (x: number) => Math.ceil(Number((x * 100).toFixed(6))) / 100;

export function calcInstallment(price: number, months: Term, downInput: number): InstallmentResult {
  const safe = Number.isFinite(downInput) ? downInput : 0;
  const down = Math.min(Math.max(safe, 0), price);
  if (down >= price) return { mode: "cash", price, down, total: price };
  const remaining = price - down;
  const total = round2(down + remaining * (1 + MARKUP[months]));
  const monthly = ceilToCent((total - down) / months);
  return { mode: "installment", price, down, months, total, monthly };
}

/** Up to 2 decimals, trailing zeros trimmed (472.6, 504.6, 440). */
export const formatTotal = (x: number) => String(round2(x));
/** Always 2 decimals (168.20). */
export const formatMonthly = (x: number) => x.toFixed(2);
