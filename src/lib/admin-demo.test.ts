import { describe, expect, it } from 'vitest';
import { createDemoProducts, upsertDemoProduct } from './admin-demo';

describe('Isolated admin demo', () => {
  it('updates the demo without changing its original seed', () => {
    const seed = createDemoProducts();
    const phone = seed[0];
    if (!phone) throw new Error('Missing demo phone');
    const edited = upsertDemoProduct(seed, { ...phone, price: 123 });
    expect(edited[0]?.price).toBe(123);
    expect(seed[0]?.price).toBe(420);
    expect(createDemoProducts()[0]?.price).toBe(420);
  });
});