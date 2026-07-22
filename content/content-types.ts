export interface SpecRow {
  label: string;
  value: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CrossLink {
  label: string;
  href: string;
}

/**
 * Every /products/* page must satisfy this shape — it's what makes
 * acceptance criterion "every product page has a spec table, an
 * answer-first summary, and 5+ FAQs" structural rather than a thing to
 * remember by hand.
 */
export interface ProductPageContent {
  slug: string;
  name: string;
  h1: string;
  /** ~60 words, extractable as a standalone answer by an AI search engine. */
  answerFirstSummary: string;
  specTable: SpecRow[];
  colours: string[];
  faqs: Faq[];
  crossLinks: CrossLink[];
}

export function assertValidProductPageContent(content: ProductPageContent): void {
  if (content.faqs.length < 5) {
    throw new Error(
      `${content.slug}: needs at least 5 FAQs, has ${content.faqs.length}`
    );
  }
  if (content.specTable.length === 0) {
    throw new Error(`${content.slug}: spec table is empty`);
  }
  const wordCount = content.answerFirstSummary.trim().split(/\s+/).length;
  if (wordCount < 40 || wordCount > 90) {
    throw new Error(
      `${content.slug}: answer-first summary is ${wordCount} words, expected roughly 60`
    );
  }
}

export interface AreaPageContent {
  slug: string;
  townName: string;
  h1: string;
  localContext: string;
  driveTimeFromDepot: string;
  routeDescription: string;
  faqs: Faq[];
}
