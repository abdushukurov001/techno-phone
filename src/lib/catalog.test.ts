import { describe, expect, it } from 'vitest';
import { applyCatalog, selectCatalogBrand, type Product } from './catalog';

describe('Brand selection', () => {
  it('replaces previous brands with Samsung instead of mixing phones', () => {
    const search = selectCatalogBrand({ cat: 'phones', brand: 'Samsung,Honor,Xiaomi,Huawei,Google,Apple' }, 'Samsung');
    expect(search.brand).toBe('Samsung');
    const products = ['Samsung', 'Honor', 'Huawei', 'Apple'].map((brand, index) => ({
      id: String(index), brand, model: 'Phone', category: 'phones', color: '',
      price: 200, specs: {}, is_sold: false, is_new: false, condition_score: 9,
      created_at: '2026-10-30T00:00:00Z',
    } as Product));
    expect(applyCatalog(products, search).map(p => p.brand)).toEqual(['Samsung']);
  });
  it('switches from Samsung to Honor while preserving other filters', () => {
    expect(selectCatalogBrand({ cat: 'phones', brand: 'Samsung', min: 200 }, 'Honor'))
      .toEqual({ cat: 'phones', brand: 'Honor', min: 200 });
  });
  it('clears the single selected brand when clicked again', () => {
    expect(selectCatalogBrand({ cat: 'phones', brand: 'Huawei' }, 'Huawei').brand).toBeUndefined();
  });
});