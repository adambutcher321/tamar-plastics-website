export interface ProductCategorySummary {
  slug: string;
  name: string;
  blurb: string;
  href: string;
}

export const PRODUCT_CATEGORIES: ProductCategorySummary[] = [
  { slug: 'doors', name: 'Doors', blurb: 'uPVC and composite, front to bi-fold.', href: '/products/doors/' },
  { slug: 'windows', name: 'Windows', blurb: 'Casement, flush sash, sash and bay.', href: '/products/windows/' },
  { slug: 'roofline', name: 'Roofline', blurb: 'Fascias, soffits, bargeboards, dry verge.', href: '/products/roofline/' },
  { slug: 'guttering', name: 'Guttering', blurb: 'uPVC, cast-iron effect and aluminium.', href: '/products/guttering/' },
  { slug: 'cladding', name: 'Cladding', blurb: 'Shiplap, open-V, woodgrain foils.', href: '/products/cladding/' },
  { slug: 'conservatory-roofs', name: 'Conservatory Roofs', blurb: 'Porch and conservatory roofs, lanterns.', href: '/products/conservatory-roofs/' },
  { slug: 'interior', name: 'Interior', blurb: 'Wall panelling, flooring, skirting.', href: '/products/interior/' },
  { slug: 'trims-fixings', name: 'Trims & Fixings', blurb: 'Trims, sealants, cleaner, ancillaries.', href: '/products/trims-fixings/' },
];
