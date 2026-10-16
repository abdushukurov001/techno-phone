import type { Database } from "@/integrations/supabase/types";
import phoneImg from "@/assets/ph-phone.jpg";
import laptopImg from "@/assets/ph-laptop.jpg";
import tabletImg from "@/assets/ph-tablet.jpg";
import watchImg from "@/assets/ph-watch.jpg";
import earbudsImg from "@/assets/ph-earbuds.jpg";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type CategoryId = "phones" | "laptops" | "tablets" | "watches" | "headphones";

export type Specs = {
  storage?: number;
  ram?: number;
  battery?: number;
  processor?: string;
  ssd?: number;
  screen?: number;
  gpu?: "Integrated" | "Discrete" | string;
  battery_health?: string;
  keyboard?: string;
  charger?: boolean;
};

export const CATEGORIES: { id: CategoryId; uz: string; ru: string; emoji: string }[] = [
  { id: "phones", uz: "Telefonlar", ru: "Телефоны", emoji: "📱" },
  { id: "laptops", uz: "Noutbuklar", ru: "Ноутбуки", emoji: "💻" },
  { id: "tablets", uz: "Planshetlar", ru: "Планшеты", emoji: "📱" },
  { id: "watches", uz: "Soatlar", ru: "Часы", emoji: "⌚" },
  { id: "headphones", uz: "Quloqchinlar", ru: "Наушники", emoji: "🎧" },
];

const SMALL = ["Apple", "Samsung", "Xiaomi", "Huawei", "Honor", "Boshqa"];
export const BRANDS: Record<CategoryId, string[]> = {
  phones: ["Apple", "Samsung", "Honor", "Xiaomi", "Huawei", "Google", "Realme", "Infinix", "Tecno", "Boshqa"],
  laptops: ["Apple", "Lenovo", "HP", "Asus", "Acer", "Dell", "MSI", "Honor", "Huawei", "Xiaomi", "Boshqa"],
  tablets: ["Apple", "Samsung", "Xiaomi", "Honor", "Huawei", "Lenovo"],
  watches: SMALL,
  headphones: SMALL,
};
export const ALL_BRANDS = Array.from(new Set(Object.values(BRANDS).flat()));

export const BRAND_LABEL: Record<string, string> = { Google: "Google Pixel" };

export const PROCESSORS = [
  "Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9",
  "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9",
  "Apple M1", "Apple M2", "Apple M3", "Apple M4",
];

const PLACEHOLDER: Record<string, string> = {
  phones: phoneImg, laptops: laptopImg, tablets: tabletImg, watches: watchImg, headphones: earbudsImg,
};

export const categoryOf = (id: string) => CATEGORIES.find((c) => c.id === id);
export const specsOf = (p: Product) => (p.specs ?? {}) as Specs;
export const productTitle = (p: Product) => `${p.brand} ${p.model}`;
export const productImages = (p: Product) => (p.images?.length ? p.images : [PLACEHOLDER[p.category] ?? phoneImg]);
export const fmtStorage = (gb?: number) => (gb ? (gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`) : "");
export const fmtPrice = (n: number) => `$${Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export function keySpecs(p: Product): string {
  const s = specsOf(p);
  if (p.category === "laptops") return [s.processor, s.ram && `${s.ram} GB RAM`, s.ssd && `${fmtStorage(s.ssd)} SSD`].filter(Boolean).join(", ");
  if (p.category === "phones" || p.category === "tablets") return fmtStorage(s.storage);
  return "";
}

export function cardSpecs(p: Product): string[] {
  const s = specsOf(p);
  if (p.category === "laptops") return [s.processor, s.ram && `${s.ram}/${fmtStorage(s.ssd)}`, s.screen && `${s.screen}"`].filter(Boolean) as string[];
  return [fmtStorage(s.storage), s.battery != null && `🔋 ${s.battery}%`, p.color].filter(Boolean) as string[];
}

// ---------- Catalog search params ----------
export type CatalogSearch = { [K in keyof CatalogSearchBase]?: CatalogSearchBase[K] | undefined };
type CatalogSearchBase = {
  q?: string;
  cat?: CategoryId;
  brand?: string; // comma list
  price?: "lt200" | "200-400" | "400-700" | "gt700";
  min?: number;
  max?: number;
  cond?: 9 | 7 | 5;
  box?: "yes" | "no";
  color?: string;
  storage?: number;
  battery?: 100 | 90 | 80;
  ram?: number;
  ssd?: number;
  cpu?: string;
  screen?: "13" | "14" | "15-16" | "17";
  gpu?: "Integrated" | "Discrete";
  sort?: "rec" | "cheap" | "exp" | "new";
};

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && v !== "" && v != null ? n : undefined;
};
const str = (v: unknown) => (typeof v === "string" && v ? v : typeof v === "number" ? String(v) : undefined);
const oneOf = <T extends string | number>(v: unknown, list: readonly T[]) => (list as readonly unknown[]).includes(v) ? (v as T) : undefined;

export function parseCatalogSearch(s: Record<string, unknown>): CatalogSearch {
  return {
    q: str(s["q"]),
    cat: oneOf(s.cat, ["phones", "laptops", "tablets", "watches", "headphones"] as const),
    brand: str(s["brand"]),
    price: oneOf(s.price, ["lt200", "200-400", "400-700", "gt700"] as const),
    min: num(s["min"]),
    max: num(s["max"]),
    cond: oneOf(num(s["cond"]), [9, 7, 5] as const),
    box: oneOf(s.box, ["yes", "no"] as const),
    color: str(s["color"]),
    storage: num(s["storage"]),
    battery: oneOf(num(s["battery"]), [100, 90, 80] as const),
    ram: num(s["ram"]),
    ssd: num(s["ssd"]),
    cpu: str(s["cpu"]),
    screen: oneOf(str(s["screen"]), ["13", "14", "15-16", "17"] as const),
    gpu: oneOf(s.gpu, ["Integrated", "Discrete"] as const),
    sort: oneOf(s.sort, ["rec", "cheap", "exp", "new"] as const),
  };
}

export const FILTER_KEYS = ["brand", "price", "min", "max", "cond", "box", "color", "storage", "battery", "ram", "ssd", "cpu", "screen", "gpu"] as const;
export const activeFilterCount = (s: CatalogSearch) => FILTER_KEYS.filter((k) => s[k] != null && !(k === "max" && s.min != null)).length;

const PRICE_RANGES = { lt200: [0, 200], "200-400": [200, 400], "400-700": [400, 700], gt700: [700, Infinity] } as const;

export function applyCatalog(products: Product[], s: CatalogSearch): Product[] {
  const q = s.q?.trim().toLowerCase();
  const brands = s.brand?.split(",").filter(Boolean);
  let list = products.filter((p) => {
    const sp = specsOf(p);
    const price = Number(p.price);
    if (s.cat && p.category !== s.cat) return false;
    if (q && !`${p.brand} ${p.model} ${p.color}`.toLowerCase().includes(q)) return false;
    if (brands?.length && !brands.includes(p.brand)) return false;
    if (s.price) {
      const [a, b] = PRICE_RANGES[s.price];
      if (price < a || price > b) return false;
    }
    if (s.min != null && price < s.min) return false;
    if (s.max != null && price > s.max) return false;
    if (s.cond && p.condition_score < s.cond) return false;
    if (s.box && p.has_box !== (s.box === "yes")) return false;
    if (s.color && p.color.toLowerCase() !== s.color.toLowerCase()) return false;
    if (s.storage && sp.storage !== s.storage) return false;
    if (s.battery) {
      const b = sp.battery ?? parseInt(sp.battery_health ?? "", 10);
      if (!Number.isFinite(b) || b < s.battery) return false;
    }
    if (s.ram && sp.ram !== s.ram) return false;
    if (s.ssd && sp.ssd !== s.ssd) return false;
    if (s.cpu && sp.processor !== s.cpu) return false;
    if (s.gpu && sp.gpu !== s.gpu) return false;
    if (s.screen) {
      const sc = sp.screen ?? 0;
      const ok = s.screen === "13" ? sc < 13.9 : s.screen === "14" ? sc >= 13.9 && sc < 14.9 : s.screen === "15-16" ? sc >= 14.9 && sc < 16.9 : sc >= 16.9;
      if (!ok) return false;
    }
    return true;
  });
  const sort = s.sort ?? "rec";
  list = [...list].sort((a, b) => {
    if (a.is_sold !== b.is_sold) return a.is_sold ? 1 : -1;
    if (sort === "cheap") return Number(a.price) - Number(b.price);
    if (sort === "exp") return Number(b.price) - Number(a.price);
    if (sort === "new") return b.created_at.localeCompare(a.created_at);
    if (a.is_new !== b.is_new) return a.is_new ? -1 : 1;
    return b.condition_score - a.condition_score || b.created_at.localeCompare(a.created_at);
  });
  return list;
}
