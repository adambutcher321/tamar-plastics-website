export interface ProductCategorySummary {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  imageSrc: string;
}

export const PRODUCT_CATEGORIES: ProductCategorySummary[] = [
  { slug: 'doors', name: 'Doors', blurb: 'uPVC and composite, front to bi-fold.', href: '/products/doors/', imageSrc: '/images/products/doors.webp' },
  { slug: 'windows', name: 'Windows', blurb: 'Casement, flush sash, sash and bay.', href: '/products/windows/', imageSrc: '/images/products/windows.webp' },
  { slug: 'roofline', name: 'Roofline', blurb: 'Fascias, soffits, bargeboards, dry verge.', href: '/products/roofline/', imageSrc: '/images/products/roofline.webp' },
  { slug: 'guttering', name: 'Guttering', blurb: 'uPVC, cast-iron effect and aluminium.', href: '/products/guttering/', imageSrc: '/images/products/guttering.webp' },
  { slug: 'cladding', name: 'Cladding', blurb: 'Shiplap, open-V, woodgrain foils.', href: '/products/cladding/', imageSrc: '/images/products/cladding.webp' },
  { slug: 'conservatory-roofs', name: 'Conservatory Roofs', blurb: 'Porch and conservatory roofs, lanterns.', href: '/products/conservatory-roofs/', imageSrc: '/images/products/conservatory-roofs.webp' },
  { slug: 'interior', name: 'Interior', blurb: 'Wall panelling, flooring, skirting.', href: '/products/interior/', imageSrc: '/images/products/interior.webp' },
  { slug: 'trims-fixings', name: 'Trims & Fixings', blurb: 'Trims, sealants, cleaner, ancillaries.', href: '/products/trims-fixings/', imageSrc: '/images/products/trims-fixings.webp' },
];
