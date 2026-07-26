export interface ProductCategorySummary {
  slug: string;
  name: string;
  blurb: string;
  href: string;
  imageSrc: string;
  iconSrc: string;
  cutoutSrc: string;
  cutoutAlt: string;
}

export const PRODUCT_CATEGORIES: ProductCategorySummary[] = [
  { slug: 'doors', name: 'Doors', blurb: 'uPVC and composite, front to bi-fold.', href: '/products/doors/', imageSrc: '/images/products/doors.png', iconSrc: '/images/icons/doors.svg', cutoutSrc: '/images/cutouts/doors.webp', cutoutAlt: 'Anthracite grey composite front door with a glazed side panel' },
  { slug: 'windows', name: 'Windows', blurb: 'Casement, flush sash, sash and bay.', href: '/products/windows/', imageSrc: '/images/products/windows.png', iconSrc: '/images/icons/windows.svg', cutoutSrc: '/images/cutouts/windows.webp', cutoutAlt: 'Anthracite grey uPVC casement window, partially open' },
  { slug: 'roofline', name: 'Roofline', blurb: 'Fascias, soffits, bargeboards, dry verge.', href: '/products/roofline/', imageSrc: '/images/products/roofline.webp', iconSrc: '/images/icons/roofline.svg', cutoutSrc: '/images/cutouts/roofline.webp', cutoutAlt: 'Anthracite grey uPVC fascia, soffit and guttering corner assembly' },
  { slug: 'guttering', name: 'Guttering', blurb: 'uPVC, cast-iron effect and aluminium.', href: '/products/guttering/', imageSrc: '/images/products/guttering.webp', iconSrc: '/images/icons/guttering.svg', cutoutSrc: '/images/cutouts/guttering.webp', cutoutAlt: 'Anthracite grey uPVC guttering corner joint with downpipe' },
  { slug: 'cladding', name: 'Cladding', blurb: 'Shiplap, open-V, woodgrain foils.', href: '/products/cladding/', imageSrc: '/images/products/cladding.webp', iconSrc: '/images/icons/cladding.svg', cutoutSrc: '/images/cutouts/cladding.webp', cutoutAlt: 'Stack of anthracite woodgrain-effect uPVC shiplap cladding boards' },
  { slug: 'conservatory-roofs', name: 'Conservatory Roofs', blurb: 'Porch and conservatory roofs, lanterns.', href: '/products/conservatory-roofs/', imageSrc: '/images/products/conservatory-roofs.webp', iconSrc: '/images/icons/conservatory-roofs.svg', cutoutSrc: '/images/cutouts/conservatory-roofs.webp', cutoutAlt: 'Corner of a modern solid conservatory roof meeting a glass panel' },
  { slug: 'interior', name: 'Interior', blurb: 'Wall panelling, flooring, skirting.', href: '/products/interior/', imageSrc: '/images/products/interior.webp', iconSrc: '/images/icons/interior.svg', cutoutSrc: '/images/cutouts/interior.webp', cutoutAlt: 'Black ribbed uPVC interior wall panelling block' },
  { slug: 'trims-fixings', name: 'Trims & Fixings', blurb: 'Trims, sealants, cleaner, ancillaries.', href: '/products/trims-fixings/', imageSrc: '/images/products/trims-fixings.webp', iconSrc: '/images/icons/trims-fixings.svg', cutoutSrc: '/images/cutouts/trims-fixings.webp', cutoutAlt: 'Range of Soudal Fix ALL sealant and adhesive cartridges' },
];
