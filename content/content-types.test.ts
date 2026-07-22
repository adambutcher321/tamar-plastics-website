import { describe, it, expect } from 'vitest';
import { assertValidProductPageContent, ProductPageContent } from './content-types';

const validContent: ProductPageContent = {
  slug: 'doors',
  name: 'Doors',
  h1: 'uPVC & Composite Doors in Cornwall',
  answerFirstSummary:
    'uPVC and composite front, back, French, patio and bi-fold doors, ' +
    'supplied over the counter in Saltash or supplied and fitted across ' +
    'Cornwall and Plymouth. Composite doors run from around £900 to £1,800 ' +
    'fitted depending on style and glazing. In stock colours collect same ' +
    'day from the trade counter; made-to-order colours and sizes take ' +
    'two to three weeks.',
  specTable: [{ label: 'Thickness', value: '48mm' }],
  colours: ['White', 'Anthracite Grey', 'Black Ash'],
  faqs: Array.from({ length: 5 }, (_, i) => ({
    question: `Question ${i}`,
    answer: `Answer ${i}`,
  })),
  crossLinks: [],
};

describe('assertValidProductPageContent', () => {
  it('accepts valid content', () => {
    expect(() => assertValidProductPageContent(validContent)).not.toThrow();
  });

  it('rejects fewer than 5 FAQs', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, faqs: validContent.faqs.slice(0, 2) })
    ).toThrow(/at least 5 FAQs/);
  });

  it('rejects an empty spec table', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, specTable: [] })
    ).toThrow(/spec table is empty/);
  });

  it('rejects a summary that is far too short', () => {
    expect(() =>
      assertValidProductPageContent({ ...validContent, answerFirstSummary: 'Too short.' })
    ).toThrow(/answer-first summary/);
  });
});
