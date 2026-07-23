import type { ProductPageContent } from '@/content/content-types';
import { assertValidProductPageContent } from '@/content/content-types';

import { DOORS_CONTENT } from './doors';
import { WINDOWS_CONTENT } from './windows';
import { ROOFLINE_CONTENT } from './roofline';
import { GUTTERING_CONTENT } from './guttering';
import { CLADDING_CONTENT } from './cladding';
import { CONSERVATORY_ROOFS_CONTENT } from './conservatory-roofs';
import { INTERIOR_CONTENT } from './interior';
import { TRIMS_FIXINGS_CONTENT } from './trims-fixings';

export const ALL_PRODUCTS: Record<string, ProductPageContent> = {
  doors: DOORS_CONTENT,
  windows: WINDOWS_CONTENT,
  roofline: ROOFLINE_CONTENT,
  guttering: GUTTERING_CONTENT,
  cladding: CLADDING_CONTENT,
  'conservatory-roofs': CONSERVATORY_ROOFS_CONTENT,
  interior: INTERIOR_CONTENT,
  'trims-fixings': TRIMS_FIXINGS_CONTENT,
};

// Structural validation pass on module load
Object.values(ALL_PRODUCTS).forEach((product) => {
  assertValidProductPageContent(product);
});

export function getProductBySlug(slug: string): ProductPageContent | undefined {
  return ALL_PRODUCTS[slug];
}

export function getAllProducts(): ProductPageContent[] {
  return Object.values(ALL_PRODUCTS);
}
