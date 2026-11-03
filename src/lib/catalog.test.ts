import { describe, expect, it } from 'vitest';
import { applyCatalog, parseCatalogSearch, selectCatalogBrand, type Product } from './catalog';

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

describe('Accessories catalog', () => {
  const products = [
    { id: 'case', category: 'accessories', brand: 'Apple', model: 'Daisy chexol', specs: { accessory_type: 'case', compatibility: 'iPhone 13 Pro' } },
    { id: 'cable', category: 'accessories', brand: 'Boshqa', model: 'Kabel', specs: { accessory_type: 'cable', compatibility: 'USB-C qurilmalar' } },
    { id: 'stand', category: 'accessories', brand: 'Boshqa', model: 'Stend', specs: { accessory_type: 'stand', compatibility: '13–17 inch noutbuklar' } },
    { id: 'phone', category: 'phones', brand: 'Apple', model: 'iPhone 13 Pro', specs: {} },
  ].map(p => ({ ...p, color: '', price: 15, is_sold: false, is_new: false, condition_score: 10, created_at: '2026-11-03T00:00:00Z' } as Product));

  it('accepts accessories category and excludes phones', () => {
    const search = parseCatalogSearch({ cat: 'accessories' });
    expect(search.cat).toBe('accessories');
    expect(applyCatalog(products, search).map(p => p.id)).toEqual(['case', 'cable', 'stand']);
  });
  it('shows only the requested accessory type', () => {
    expect(applyCatalog(products, { cat: 'accessories', accessory: 'cable' }).map(p => p.id)).toEqual(['cable']);
  });
  it('filters accessories by compatible device', () => {
    expect(applyCatalog(products, { cat: 'accessories', compatible: 'iPhone 13 Pro' }).map(p => p.id)).toEqual(['case']);
  });
  it('finds cases through their compatible phone model', () => {
    expect(applyCatalog(products, { cat: 'accessories', q: 'iPhone 13 Pro' }).map(p => p.id)).toEqual(['case']);
  });
});

describe('Default catalog order', () => {
  const products = [
    { id: 'case', category: 'accessories', brand: 'Apple', model: 'Chexol', is_new: true, created_at: '2026-11-03T00:00:00Z' },
    { id: 'laptop', category: 'laptops', brand: 'Lenovo', model: 'ThinkPad', is_new: true, created_at: '2026-11-02T00:00:00Z' },
    { id: 'phone', category: 'phones', brand: 'Samsung', model: 'Galaxy A54', is_new: false, created_at: '2026-11-01T00:00:00Z' },
  ].map(p => ({ ...p, color: '', price: 100, specs: {}, is_sold: false, condition_score: 9 } as Product));

  it('shows phones first in the mixed "Barchasi" view, not the newest accessories', () => {
    expect(applyCatalog(products, {})[0]!.id).toBe('phone');
  });
  it('keeps newest-first order inside a single category', () => {
    expect(applyCatalog(products, { cat: 'accessories' })[0]!.id).toBe('case');
  });
});