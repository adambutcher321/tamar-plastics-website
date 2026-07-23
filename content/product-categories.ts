export interface ProductCategorySummary {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  imageSrc: string;
  iconSrc: string;
}

export const PRODUCT_CATEGORIES: ProductCategorySummary[] = [
  { slug: 'doors', name: 'Doors', blurb: 'uPVC and composite, front to bi-fold.', href: '/products/doors/', imageSrc: '/images/products/doors.webp', iconSrc: '/images/icons/doors.svg' },
  { slug: 'windows', name: 'Windows', blurb: 'Casement, flush sash, sash and bay.', href: '/products/windows/', imageSrc: '/images/products/windows.webp', iconSrc: '/images/icons/windows.svg' },
  { slug: 'roofline', name: 'Roofline', blurb: 'Fascias, soffits, bargeboards, dry verge.', href: '/products/roofline/', imageSrc: '/images/products/roofline.webp', iconSrc: '/images/icons/roofline.svg' },
  { slug: 'guttering', name: 'Guttering', blurb: 'uPVC, cast-iron effect and aluminium.', href: '/products/guttering/', imageSrc: '/images/products/guttering.webp', iconSrc: '/images/icons/guttering.svg' },
  { slug: 'cladding', name: 'Cladding', blurb: 'Shiplap, open-V, woodgrain foils.', href: '/products/cladding/', imageSrc: '/images/products/cladding.webp', iconSrc: '/images/icons/cladding.svg' },
  { slug: 'conservatory-roofs', name: 'Conservatory Roofs', blurb: 'Porch and conservatory roofs, lanterns.', href: '/products/conservatory-roofs/', imageSrc: '/images/products/conservatory-roofs.webp', iconSrc: '/images/icons/conservatory-roofs.svg' },
  { slug: 'interior', name: 'Interior', blurb: 'Wall panelling, flooring, skirting.', href: '/products/interior/', imageSrc: '/images/products/interior.webp', iconSrc: '/images/icons/interior.svg' },
  { slug: 'trims-fixings', name: 'Trims & Fixings', blurb: 'Trims, sealants, cleaner, ancillaries.', href: '/products/trims-fixings/', imageSrc: '/images/products/trims-fixings.webp', iconSrc: '/images/icons/trims-fixings.svg' },
];
