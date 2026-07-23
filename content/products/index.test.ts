import { describe, it, expect } from 'vitest';
import { ALL_PRODUCTS, getAllProducts, getProductBySlug } from './index';
import { assertValidProductPageContent } from '@/content/content-types';

describe('Product Content Modules', () => {
  it('contains exactly 8 product categories', () => {
    const products = getAllProducts();
    expect(products).toHaveLength(8);
  });

  it('validates every product page content against structural rules', () => {
    const products = getAllProducts();
    products.forEach((product) => {
      expect(() => assertValidProductPageContent(product)).not.toThrow();
      expect(product.faqs.length).toBeGreaterThanOrEqual(5);
      expect(product.specTable.length).toBeGreaterThan(0);
      expect(product.colours.length).toBeGreaterThan(0);
    });
  });

  it('retrieves products by slug', () => {
    expect(getProductBySlug('doors')?.name).toBe('Doors');
    expect(getProductBySlug('windows')?.name).toBe('Windows');
    expect(getProductBySlug('roofline')?.name).toBe('Roofline');
    expect(getProductBySlug('non-existent')).toBeUndefined();
  });
});
