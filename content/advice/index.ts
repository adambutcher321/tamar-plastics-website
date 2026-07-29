export interface AdviceArticle {
  slug: string;
  title: string;
  excerpt: string;
  // This content should be written by someone with genuine product knowledge,
  // or generated using answers from the interview-questions.md
  bodyContent?: string;
}

export const ADVICE_ARTICLES: AdviceArticle[] = [
  {
    slug: 'how-to-measure-fascias',
    title: 'How to Measure for Replacement Fascias and Soffits',
    excerpt: 'A step-by-step guide to accurately measuring your roofline for full replacement 18mm fascias.'
  },
  {
    slug: 'choosing-guttering',
    title: 'Choosing Guttering Profiles and Capacities',
    excerpt: 'Understand the difference between Half-Round, Square Line, and Deepflow guttering for your property.'
  },
  {
    slug: 'composite-vs-upvc-doors',
    title: 'Composite vs. uPVC Entrance Doors: Which is Best?',
    excerpt: 'Weighing up security, thermal efficiency, cost, and aesthetics when choosing a new front door.'
  },
  {
    slug: 'cladding-coastal-properties',
    title: 'Selecting Exterior Cladding for Coastal Properties',
    excerpt: 'Why cellular uPVC cladding is the ideal low-maintenance solution for homes exposed to salt and wind.'
  },
  {
    slug: 'acrylic-vs-polycarbonate',
    title: 'Choosing Between Acrylic and Polycarbonate Sheet',
    excerpt: 'Understanding the strengths and use-cases for our cut-to-size plastic sheeting.'
  }
];
