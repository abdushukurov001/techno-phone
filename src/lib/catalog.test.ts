import { describe, expect, it } from 'vitest';
import { applyCatalog, parseCatalogSearch, selectCatalogBrand, productImages, getStaticProductImages, getRealProductImages, type Product } from './catalog';

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

describe('Product real photos and static fallbacks', () => {
  it('matches iPhone 15 Pro to real photo URL and provides static backup', () => {
    const p = { brand: 'Apple', model: 'iPhone 15 Pro', category: 'phones' } as Product;
    const imgs = productImages(p);
    expect(imgs[0]).toContain('images.unsplash.com');
    expect(imgs[0]).toContain('photo-1695822958645-b2b058159215');
    const staticImgs = getStaticProductImages(p);
    expect(staticImgs[0]).toBe('/products/iphone-15-pro.svg');
  });

  it('matches Samsung Galaxy S24 Ultra to real photo URL', () => {
    const p = { brand: 'Samsung', model: 'Galaxy S24 Ultra', category: 'phones' } as Product;
    const imgs = productImages(p);
    expect(imgs[0]).toContain('images.unsplash.com');
    expect(imgs[0]).toContain('photo-1610945265064-0e34e5519bbf');
    const staticImgs = getStaticProductImages(p);
    expect(staticImgs[0]).toBe('/products/samsung-s24-ultra.svg');
  });

  it('matches Huawei P40 Pro to real photo URL', () => {
    const p = { brand: 'Huawei', model: 'P40 Pro', category: 'phones' } as Product;
    const imgs = productImages(p);
    expect(imgs[0]).toContain('images.unsplash.com');
    expect(imgs[0]).toContain('photo-1565849904461-04a58ad377e0');
    const staticImgs = getStaticProductImages(p);
    expect(staticImgs[0]).toBe('/products/huawei-p40-pro.svg');
  });

  it('filters out broken /__l5e/ preview URLs and falls back to real photo link', () => {
    const p = {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      category: 'phones',
      images: ['/__l5e/assets-v1/95149d7c-fb8d-4be6-9872-e14d15e44fed/iphone-15-pro.jpg'],
    } as Product;
    const imgs = productImages(p);
    expect(imgs[0]).toContain('images.unsplash.com');
  });

  it('preserves valid custom external images', () => {
    const p = {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      category: 'phones',
      images: ['https://images.custom.com/photo-custom.jpg'],
    } as Product;
    const imgs = productImages(p);
    expect(imgs[0]).toBe('https://images.custom.com/photo-custom.jpg');
  });
});
