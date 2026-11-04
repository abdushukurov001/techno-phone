import { CATEGORIES, type Product } from './catalog';

export function createDemoProducts(): Product[] {
  const examples = [
    ['Apple', 'iPhone 13', 420], ['Lenovo', 'ThinkPad T14', 550],
    ['Apple', 'iPad 9', 250], ['Apple', 'Watch Series 8', 180],
    ['Apple', 'AirPods Pro 2', 120], ['Apple', 'Daisy chexol', 12],
  ] as const;
  return CATEGORIES.map((category, i) => {
    const [brand, model, price] = examples[i] ?? examples[0];
    return {
      id: `demo-${category.id}`, slug: `demo-${category.id}`, category: category.id,
      brand, model, price, color: '', condition_score: 9, condition_label: 'Yaxshi',
      has_box: true, images: [], notes: '', description: 'Namuna mahsulot',
      specs: category.id === 'accessories' ? { accessory_type: 'case', compatibility: 'iPhone 13 Pro' } : {},
      is_new: true, is_sold: false, is_hidden: false,
      created_at: '', updated_at: '',
    };
  });
}

export function upsertDemoProduct(products: Product[], product: Product): Product[] {
  return products.some(p => p.id === product.id)
    ? products.map(p => p.id === product.id ? product : p)
    : [product, ...products];
}