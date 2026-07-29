import type { CrossLink } from '../content-types';

export interface CaseStudy {
  slug: string;
  projectTitle: string;
  location: string;
  propertyType: string;
  customerRequirement: string;
  productsSupplied: string[];
  challenge: string;
  solution: string;
  finishedResult: string;
  photographs: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  relatedLinks: CrossLink[];
}

export const CASE_STUDY_TEMPLATE: CaseStudy = {
  slug: 'example-project-saltash',
  projectTitle: 'Complete Window & Door Replacement in Saltash',
  location: 'Saltash, Cornwall',
  propertyType: 'Detached 1980s Property',
  customerRequirement: 'The customer needed to replace draughty timber windows and an old UPVC front door to improve energy efficiency and security.',
  productsSupplied: [
    'A-Rated Flush Sash UPVC Windows (Anthracite Grey)',
    'Composite Front Door (PAS 24 Security Certified)'
  ],
  challenge: 'Removing the original timber frames without damaging the surrounding interior plasterwork, and ensuring the new windows met modern building regulations for ventilation.',
  solution: 'We installed custom-measured flush sash windows with integrated trickle vents, and a high-security composite door, completing the entire installation in under 3 days.',
  finishedResult: 'The property now boasts a modern, sleek exterior with significantly improved thermal retention and zero draughts.',
  photographs: [
    {
      src: '/images/projects/example-project-after.webp',
      alt: 'Newly installed anthracite grey flush sash windows on a detached property in Saltash',
      caption: 'The completed installation featuring A-Rated Flush Sash Windows.'
    }
  ],
  relatedLinks: [
    { label: 'View Flush Sash Windows', href: '/products/windows/' },
    { label: 'View Composite Doors', href: '/products/doors/' }
  ]
};
