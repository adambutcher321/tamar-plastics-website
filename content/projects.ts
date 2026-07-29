export interface Project {
  id: string;
  town: string;
  tag: string;
  description: string;
  src: string;
  alt: string;
}

/**
 * Featured project installations across Saltash, Plymouth, and Cornwall.
 * Used by the homepage cinematic carousel and the full /projects/ gallery.
 */
export const PROJECTS: Project[] = [
  {
    id: 'saltash-entrance',
    town: 'Saltash',
    tag: 'Window & Door Package',
    description: 'A-Rated uPVC casement windows and solid timber-core composite entrance door.',
    src: '/images/projects/upvc-window-composite-door-saltash.webp',
    alt: 'Modern residential uPVC window and composite entrance door installation in Saltash',
  },
  {
    id: 'plymouth-flush-sash',
    town: 'Plymouth',
    tag: 'Heritage Flush Sash',
    description: 'Architectural flush sash uPVC windows in Anthracite Grey with multi-point locking.',
    src: '/images/projects/heritage-flush-sash-upvc-windows-plymouth.webp',
    alt: 'Anthracite Grey heritage flush sash uPVC windows installed in Plymouth',
  },
  {
    id: 'tavistock-roofline',
    town: 'Tavistock',
    tag: 'Roofline & Fascias',
    description: '18mm structural uPVC fascia, ventilated soffit, and high-capacity Deepflow guttering.',
    src: '/images/projects/upvc-fascia-soffit-guttering-tavistock.webp',
    alt: 'Full uPVC roofline fascia soffit and guttering replacement in Tavistock',
  },
  {
    id: 'torpoint-composite-door',
    town: 'Torpoint',
    tag: 'Composite Entrance Door',
    description: 'PAS 24 security composite front door with Ultion 3-star diamond anti-snap cylinder.',
    src: '/images/projects/high-security-composite-door-torpoint.webp',
    alt: 'High-security composite front door installed in Torpoint',
  },
  {
    id: 'liskeard-warm-roof',
    town: 'Liskeard',
    tag: 'Solid Warm Roof Conversion',
    description: 'Lightweight solid replacement roof with 0.15 W/m²K thermal insulation and roof lantern.',
    src: '/images/projects/solid-warm-conservatory-roof-liskeard.webp',
    alt: 'Solid warm conservatory roof conversion with glass lantern in Liskeard',
  },
  {
    id: 'saltash-composite-cladding',
    town: 'Saltash',
    tag: 'Exterior Weatherboard',
    description: 'Class A fire-rated composite weatherboard cladding in Slate Grey with concealed trims.',
    src: '/images/projects/composite-weatherboard-cladding-saltash.webp',
    alt: 'Composite weatherboard exterior cladding installation in Saltash',
  },
  {
    id: 'plymouth-sliding-sash',
    town: 'Plymouth',
    tag: 'Vertical Sliding Sash',
    description: 'Period-style vertical sliding sash uPVC windows with decorative astragal glazing bars.',
    src: '/images/projects/vertical-sliding-sash-upvc-windows-plymouth.webp',
    alt: 'Period-style vertical sliding sash uPVC windows fitted in Plymouth',
  },
  {
    id: 'callington-bifold-doors',
    town: 'Callington',
    tag: 'Bi-Fold Patio Doors',
    description: 'Thermally broken aluminium bi-fold doors creating a wide seamless opening to patio.',
    src: '/images/projects/aluminium-bifold-doors-callington.webp',
    alt: 'Aluminium bi-fold door installation in Callington',
  },
  {
    id: 'looe-cast-iron-rainwater',
    town: 'Looe',
    tag: 'Cast-Iron Rainwater & Roofline',
    description: 'Coastal marine-grade roofline with authentic Cast-Iron effect rainwater system.',
    src: '/images/projects/cast-iron-effect-guttering-roofline-looe.webp',
    alt: 'Cast-Iron effect rainwater guttering and uPVC roofline in Looe',
  },
  {
    id: 'bodmin-bay-windows',
    town: 'Bodmin',
    tag: 'uPVC Bay Windows',
    description: 'Energy A-Rated uPVC bay window transformation with load-bearing structural jack poles.',
    src: '/images/projects/upvc-bay-windows-bodmin.webp',
    alt: 'Energy efficient uPVC bay window installation in Bodmin',
  },
  {
    id: 'saltash-shower-panelling',
    town: 'Saltash',
    tag: 'Waterproof Wall Panels',
    description: '100% waterproof tongue-and-groove shower enclosure wall panelling in Italian Marble.',
    src: '/images/projects/waterproof-bathroom-wall-panels-saltash.webp',
    alt: 'Waterproof bathroom wall panelling in Saltash',
  },
];
