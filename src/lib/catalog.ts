import type { Database } from "@/integrations/supabase/types";
import phoneImg from "@/assets/ph-phone.jpg";
import laptopImg from "@/assets/ph-laptop.jpg";
import tabletImg from "@/assets/ph-tablet.jpg";
import watchImg from "@/assets/ph-watch.jpg";
import earbudsImg from "@/assets/ph-earbuds.jpg";
import accessoryImg from "@/assets/accessories/case-daisy.jpg.asset.json";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type CategoryId = "phones" | "laptops" | "tablets" | "watches" | "headphones" | "accessories";

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
  accessory_type?: string;
  compatibility?: string;
  connector?: string;
  power?: number;
};

export const CATEGORIES: { id: CategoryId; uz: string; ru: string; emoji: string }[] = [
  { id: "phones", uz: "Telefonlar", ru: "Телефоны", emoji: "📱" },
  { id: "laptops", uz: "Noutbuklar", ru: "Ноутбуки", emoji: "💻" },
  { id: "tablets", uz: "Planshetlar", ru: "Планшеты", emoji: "📱" },
  { id: "watches", uz: "Soatlar", ru: "Часы", emoji: "⌚" },
  { id: "headphones", uz: "Quloqchinlar", ru: "Наушники", emoji: "🎧" },
  { id: "accessories", uz: "Aksessuarlar", ru: "Аксессуары", emoji: "🔌" },
];

export const ACCESSORY_TYPES = [
  { id: 'case', uz: 'Chexollar', ru: 'Чехлы' },
  { id: 'protection', uz: 'Himoya oynalari', ru: 'Защитные стёкла' },
  { id: 'cable', uz: 'Kabellar', ru: 'Кабели' },
  { id: 'charger', uz: 'Zaryadlovchilar', ru: 'Зарядные устройства' },
  { id: 'stand', uz: 'Noutbuk stendlari', ru: 'Подставки для ноутбука' },
  { id: 'sticker', uz: 'Nakleykalar', ru: 'Наклейки' },
] as const;

const SMALL = ["Apple", "Samsung", "Xiaomi", "Huawei", "Honor", "Boshqa"];
export const BRANDS: Record<CategoryId, string[]> = {
  phones: ["Apple", "Samsung", "Honor", "Xiaomi", "Huawei", "Google", "Realme", "Infinix", "Tecno", "Boshqa"],
  laptops: ["Apple", "Lenovo", "HP", "Asus", "Acer", "Dell", "MSI", "Honor", "Huawei", "Xiaomi", "Boshqa"],
  tablets: ["Apple", "Samsung", "Xiaomi", "Honor", "Huawei", "Lenovo"],
  watches: SMALL,
  headphones: SMALL,
  accessories: ["Apple", "Samsung", "Xiaomi", "Huawei", "Honor", "Boshqa"],
};
export const ALL_BRANDS = Array.from(new Set(Object.values(BRANDS).flat()));

export const BRAND_LABEL: Record<string, string> = { Google: "Google Pixel" };

export const PROCESSORS = [
  "Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9",
  "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9",
  "Apple M1", "Apple M2", "Apple M3", "Apple M4",
];

const PLACEHOLDER: Record<string, string> = {
  phones: '/products/phone-generic.svg',
  laptops: '/products/laptop-generic.svg',
  tablets: '/products/tablet-generic.svg',
  watches: '/products/watch-generic.svg',
  headphones: '/products/earbuds-generic.svg',
  accessories: '/products/case-generic.svg',
};

export function getStaticProductImages(p: { brand?: string; model?: string; slug?: string; category?: string }): string[] {
  const brand = (p.brand ?? '').toLowerCase();
  const model = (p.model ?? '').toLowerCase();
  const slug = (p.slug ?? '').toLowerCase();
  const key = `${brand} ${model} ${slug}`;

  // Phones
  if (key.includes('iphone 15 pro') || key.includes('15 pro') || key.includes('iphone-15-pro')) {
    return ['/products/iphone-15-pro.svg', '/products/iphone-15-pro-back.svg'];
  }
  if (key.includes('iphone 13') || key.includes('iphone-13')) {
    return ['/products/iphone-13.svg', '/products/iphone-13-back.svg'];
  }
  if (key.includes('s24 ultra') || key.includes('s24-ultra')) {
    return ['/products/samsung-s24-ultra.svg', '/products/samsung-s24-ultra-back.svg'];
  }
  if (key.includes('s23')) {
    return ['/products/samsung-s23.svg', '/products/samsung-s23-back.svg'];
  }
  if (key.includes('s22 ultra') || key.includes('s22-ultra')) {
    return ['/products/samsung-s22-ultra.svg', '/products/samsung-s22-ultra-back.svg'];
  }
  if (key.includes('a54')) {
    return ['/products/samsung-a54.svg', '/products/samsung-a54-back.svg'];
  }
  if (key.includes('a34')) {
    return ['/products/samsung-a34.svg', '/products/samsung-a34-back.svg'];
  }
  if (key.includes('p40 pro') || key.includes('p40')) {
    return ['/products/huawei-p40-pro.svg', '/products/huawei-p40-pro-back.svg'];
  }
  if (key.includes('p30 pro') || key.includes('p30')) {
    return ['/products/huawei-p30-pro.svg', '/products/huawei-p30-pro-back.svg'];
  }
  if (key.includes('nova 11') || key.includes('nova')) {
    return ['/products/huawei-nova-11.svg'];
  }
  if (key.includes('magic 6 pro') || key.includes('magic6')) {
    return ['/products/honor-magic6-pro.svg', '/products/honor-magic6-pro-back.svg'];
  }
  if (key.includes('honor 90')) {
    return ['/products/honor-90.svg'];
  }
  if (key.includes('x9b') || key.includes('x9')) {
    return ['/products/honor-x9b.svg'];
  }
  if (key.includes('13t')) {
    return ['/products/xiaomi-13t.svg', '/products/xiaomi-13t-back.svg'];
  }
  if (key.includes('note 13') || key.includes('redmi')) {
    return ['/products/redmi-note-13-pro.svg'];
  }
  if (key.includes('pixel') || key.includes('google')) {
    return ['/products/google-pixel-8.svg', '/products/google-pixel-8-back.svg'];
  }

  // Laptops
  if (key.includes('macbook air') || (key.includes('macbook') && key.includes('air'))) {
    return ['/products/macbook-air-m1.svg'];
  }
  if (key.includes('macbook pro') || (key.includes('macbook') && key.includes('pro'))) {
    return ['/products/macbook-pro-14.svg'];
  }
  if (key.includes('thinkpad') || key.includes('t14')) {
    return ['/products/lenovo-thinkpad-t14.svg'];
  }
  if (key.includes('pavilion')) {
    return ['/products/hp-pavilion-15.svg'];
  }
  if (key.includes('vivobook')) {
    return ['/products/asus-vivobook-15.svg'];
  }
  if (key.includes('magicbook')) {
    return ['/products/honor-magicbook-14.svg'];
  }
  if (key.includes('matebook')) {
    return ['/products/huawei-matebook-xpro.svg'];
  }

  // Tablets
  if (key.includes('ipad mini')) {
    return ['/products/ipad-mini.svg'];
  }
  if (key.includes('ipad')) {
    return ['/products/ipad-9.svg'];
  }
  if (key.includes('tab s9')) {
    return ['/products/galaxy-tab-s9.svg'];
  }
  if (key.includes('tab s8')) {
    return ['/products/tab-s8plus.svg'];
  }
  if (key.includes('tab m10') || (key.includes('lenovo') && p.category === 'tablets')) {
    return ['/products/lenovo-tab-m10.svg'];
  }
  if (key.includes('pad 6') || (key.includes('xiaomi') && p.category === 'tablets')) {
    return ['/products/xiaomi-pad-6.svg'];
  }

  // Watches
  if (key.includes('watch') && (key.includes('apple') || key.includes('s8') || key.includes('series'))) {
    return ['/products/apple-watch-s8.svg'];
  }
  if (key.includes('galaxy watch') || (key.includes('samsung') && p.category === 'watches')) {
    return ['/products/galaxy-watch-6.svg'];
  }
  if (key.includes('gt 4') || (key.includes('huawei') && p.category === 'watches')) {
    return ['/products/huawei-watch-gt4.svg'];
  }

  // Headphones
  if (key.includes('airpods max')) {
    return ['/products/airpods-max.svg'];
  }
  if (key.includes('airpods')) {
    return ['/products/airpods-pro-2.svg'];
  }
  if (key.includes('buds') || (key.includes('samsung') && p.category === 'headphones')) {
    return ['/products/galaxy-buds-2-pro.svg'];
  }
  if (key.includes('freebuds') || (key.includes('huawei') && p.category === 'headphones')) {
    return ['/products/huawei-freebuds-5i.svg'];
  }

  // Accessories
  if (key.includes('daisy')) return ['/products/case-daisy.svg'];
  if (key.includes('heart')) return ['/products/case-hearts.svg'];
  if (key.includes('smile')) return ['/products/case-smile.svg'];
  if (key.includes('wave')) return ['/products/case-waves.svg'];
  if (key.includes('lightning')) return ['/products/cable-lightning.svg'];
  if (key.includes('purple')) return ['/products/cable-purple.svg'];
  if (key.includes('usb-a')) return ['/products/cable-usba.svg'];
  if (key.includes('cable') || key.includes('kabel') || key.includes('type-c') || key.includes('usb-c')) {
    return ['/products/cable-usbc.svg'];
  }
  if (key.includes('20w')) return ['/products/charger-20w.svg'];
  if (key.includes('65w') || key.includes('gan')) return ['/products/charger-65w.svg'];
  if (key.includes('dual') || key.includes('charger') || key.includes('quvvat')) return ['/products/charger-dual.svg'];
  if (key.includes('glass') || key.includes('oyna') || key.includes('shisha') || key.includes('himoya')) {
    return ['/products/screen-glass.svg'];
  }
  if (key.includes('stend') || key.includes('stand')) {
    return key.includes('qora') || key.includes('black') ? ['/products/stand-black.svg'] : ['/products/stand-silver.svg'];
  }
  if (key.includes('tropical') || key.includes('skin')) return ['/products/skin-tropical.svg'];
  if (key.includes('stiker') || key.includes('sticker')) return ['/products/stickers.svg'];

  // Brand fallbacks for phones
  if (p.category === 'phones') {
    if (brand.includes('apple')) return ['/products/iphone-15-pro.svg', '/products/iphone-15-pro-back.svg'];
    if (brand.includes('samsung')) return ['/products/samsung-s24-ultra.svg', '/products/samsung-s24-ultra-back.svg'];
    if (brand.includes('huawei')) return ['/products/huawei-p40-pro.svg', '/products/huawei-p40-pro-back.svg'];
    if (brand.includes('honor')) return ['/products/honor-magic6-pro.svg', '/products/honor-magic6-pro-back.svg'];
    if (brand.includes('xiaomi')) return ['/products/xiaomi-13t.svg', '/products/xiaomi-13t-back.svg'];
    if (brand.includes('google')) return ['/products/google-pixel-8.svg', '/products/google-pixel-8-back.svg'];
  }

  // Category-based fallback
  const cat = p.category;
  if (cat === 'laptops') return ['/products/laptop-generic.svg'];
  if (cat === 'tablets') return ['/products/tablet-generic.svg'];
  if (cat === 'watches') return ['/products/watch-generic.svg'];
  if (cat === 'headphones') return ['/products/earbuds-generic.svg'];
  if (cat === 'accessories') return ['/products/case-generic.svg'];
  return ['/products/phone-generic.svg'];
}

export function getRealProductImages(p: { brand?: string; model?: string; slug?: string; category?: string }): string[] {
  const brand = (p.brand ?? '').toLowerCase();
  const model = (p.model ?? '').toLowerCase();
  const slug = (p.slug ?? '').toLowerCase();
  const key = `${brand} ${model} ${slug}`;

  // Apple iPhone 15 Pro (Natural Titanium photography)
  if (key.includes('15 pro') || key.includes('iphone-15-pro')) {
    return [
      'https://images.unsplash.com/photo-1695822958645-b2b058159215?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1697630725330-d4f458260399?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Apple iPhone 13 (Real photography)
  if (key.includes('iphone 13') || key.includes('iphone-13')) {
    return [
      'https://images.unsplash.com/photo-1636777489428-8a3da9f821c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1648905704296-4dfef2280350?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Samsung Galaxy S24 Ultra (Real photography)
  if (key.includes('s24 ultra') || key.includes('s24-ultra') || key.includes('s24')) {
    return [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Samsung Galaxy S23 & S22 Ultra
  if (key.includes('s23') || key.includes('s22')) {
    return [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Samsung Galaxy A54 & A34
  if (key.includes('a54') || key.includes('a34')) {
    return [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Huawei P40 Pro & P30 Pro
  if (key.includes('p40') || key.includes('p30')) {
    return [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Huawei Nova 11
  if (key.includes('nova')) {
    return [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Honor Magic 6 Pro & Honor 90 / X9b
  if (key.includes('magic 6') || key.includes('magic6') || key.includes('honor 90') || key.includes('x9b') || key.includes('honor')) {
    return [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Xiaomi 13T & Redmi Note 13 Pro
  if (key.includes('13t') || key.includes('redmi') || key.includes('xiaomi')) {
    return [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Google Pixel 8
  if (key.includes('pixel') || key.includes('google')) {
    return [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ];
  }

  // MacBook Air M1
  if (key.includes('macbook air') || (key.includes('macbook') && key.includes('air'))) {
    return [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // MacBook Pro 14
  if (key.includes('macbook pro') || (key.includes('macbook') && key.includes('pro'))) {
    return [
      'https://images.unsplash.com/photo-1575024357670-2b5164f470c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Lenovo ThinkPad T14
  if (key.includes('thinkpad') || key.includes('t14') || key.includes('lenovo')) {
    return [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // HP Pavilion 15
  if (key.includes('pavilion') || key.includes('hp')) {
    return [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    ];
  }
  // Asus Vivobook & Honor MagicBook & Huawei MateBook
  if (key.includes('vivobook') || key.includes('magicbook') || key.includes('matebook') || p.category === 'laptops') {
    return [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    ];
  }

  // Tablets: iPad & Galaxy Tab
  if (key.includes('ipad')) {
    return [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (p.category === 'tablets') {
    return [
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    ];
  }

  // Watches: Apple Watch & Smartwatch
  if (key.includes('apple') || key.includes('s8') || key.includes('series')) {
    return [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (p.category === 'watches') {
    return [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    ];
  }

  // Headphones: AirPods Pro 2 & AirPods Max & Buds
  if (key.includes('airpods max') || (key.includes('max') && p.category === 'headphones')) {
    return [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (key.includes('airpods')) {
    return [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (p.category === 'headphones') {
    return [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    ];
  }

  // Accessories: Chexollar, Kabellar, Adapterlar, Stendlar
  if (key.includes('daisy') || key.includes('heart') || key.includes('chexol') || key.includes('case')) {
    return [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (key.includes('cable') || key.includes('kabel') || key.includes('lightning') || key.includes('usb')) {
    return [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (key.includes('charger') || key.includes('zaryad') || key.includes('adapter') || key.includes('gan')) {
    return [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (key.includes('stend') || key.includes('stand')) {
    return [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    ];
  }
  if (key.includes('glass') || key.includes('oyna') || key.includes('himoya') || key.includes('stiker') || key.includes('sticker') || p.category === 'accessories') {
    return [
      'https://images.unsplash.com/photo-1589384267710-7a25bf15b945?auto=format&fit=crop&w=800&q=80',
    ];
  }

  return [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  ];
}

export const categoryOf = (id: string) => CATEGORIES.find((c) => c.id === id);
export const specsOf = (p: Product) => (p.specs ?? {}) as Specs;
export const productTitle = (p: Product) => `${p.brand} ${p.model}`;
export const productImages = (p: Product): string[] => {
  const valid = (p.images ?? []).filter(
    (img) => Boolean(img) && typeof img === 'string' && !img.startsWith('/__l5e/')
  );
  if (valid.length > 0) return valid;
  return getRealProductImages(p);
};
export const fmtStorage = (gb?: number) => (gb ? (gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`) : "");
export const fmtPrice = (n: number) => `$${Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export function keySpecs(p: Product): string {
  const s = specsOf(p);
  if (p.category === "laptops") return [s.processor, s.ram && `${s.ram} GB RAM`, s.ssd && `${fmtStorage(s.ssd)} SSD`].filter(Boolean).join(", ");
  if (p.category === "phones" || p.category === "tablets") return fmtStorage(s.storage);
  if (p.category === "accessories") return [s.compatibility, s.connector, s.power && `${s.power} W`].filter(Boolean).join(', ');
  return "";
}

export function cardSpecs(p: Product): string[] {
  const s = specsOf(p);
  if (p.category === "accessories") return [s.compatibility, s.connector, s.power && `${s.power} W`, p.color].filter(Boolean) as string[];
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
  accessory?: string;
  compatible?: string;
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
    cat: oneOf(s["cat"], CATEGORIES.map(c => c.id)),
    brand: str(s["brand"]),
    price: oneOf(s["price"], ["lt200", "200-400", "400-700", "gt700"] as const),
    min: num(s["min"]),
    max: num(s["max"]),
    cond: oneOf(num(s["cond"]), [9, 7, 5] as const),
    box: oneOf(s["box"], ["yes", "no"] as const),
    color: str(s["color"]),
    storage: num(s["storage"]),
    battery: oneOf(num(s["battery"]), [100, 90, 80] as const),
    ram: num(s["ram"]),
    ssd: num(s["ssd"]),
    cpu: str(s["cpu"]),
    screen: oneOf(str(s["screen"]), ["13", "14", "15-16", "17"] as const),
    gpu: oneOf(s["gpu"], ["Integrated", "Discrete"] as const),
    sort: oneOf(s["sort"], ["rec", "cheap", "exp", "new"] as const),
    accessory: oneOf(s["accessory"], ACCESSORY_TYPES.map(a => a.id)),
    compatible: str(s["compatible"]),
  };
}

export const FILTER_KEYS = ["brand", "price", "min", "max", "cond", "box", "color", "storage", "battery", "ram", "ssd", "cpu", "screen", "gpu", "accessory", "compatible"] as const;
export const activeFilterCount = (s: CatalogSearch) => FILTER_KEYS.filter((k) => s[k] != null && !(k === "max" && s.min != null)).length;

export function selectCatalogBrand(search: CatalogSearch, brand: string): CatalogSearch {
  return { ...search, brand: search.brand === brand ? undefined : brand };
}

const PRICE_RANGES = { lt200: [0, 200], "200-400": [200, 400], "400-700": [400, 700], gt700: [700, Infinity] } as const;

export function applyCatalog(products: Product[], s: CatalogSearch): Product[] {
  const q = s.q?.trim().toLowerCase();
  const brands = s.brand?.split(",").filter(Boolean);
  let list = products.filter((p) => {
    const sp = specsOf(p);
    const price = Number(p.price);
    if (s.cat && p.category !== s.cat) return false;
    if (q && !`${p.brand} ${p.model} ${p.color} ${sp.compatibility ?? ''} ${sp.connector ?? ''}`.toLowerCase().includes(q)) return false;
    if (s.accessory && sp.accessory_type !== s.accessory) return false;
    if (s.compatible && sp.compatibility !== s.compatible) return false;
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
  const catRank = (p: Product) => (p.category === "phones" ? 0 : p.category === "accessories" ? 2 : 1);
  list = [...list].sort((a, b) => {
    if (a.is_sold !== b.is_sold) return a.is_sold ? 1 : -1;
    if (sort === "cheap") return Number(a.price) - Number(b.price);
    if (sort === "exp") return Number(b.price) - Number(a.price);
    if (sort === "new") return b.created_at.localeCompare(a.created_at);
    if (!s.cat && catRank(a) !== catRank(b)) return catRank(a) - catRank(b);
    if (a.is_new !== b.is_new) return a.is_new ? -1 : 1;
    return b.condition_score - a.condition_score || b.created_at.localeCompare(a.created_at);
  });
  return list;
}
