export interface Review {
  author: string;
  rating: number;
  text: string;
  town: string;
}

// PLACEHOLDER — real reviews must be pulled from the Google Business
// Profile per the brief ("pull the Google reviews, don't fabricate").
// Do not use these in AggregateRating/Review JSON-LD; display-only
// placeholders until real review data is wired up.
export const PLACEHOLDER_REVIEWS: Review[] = [
  {
    author: '[CONFIRM: real reviewer name]',
    rating: 5,
    text: '[CONFIRM: real review text from Google Business Profile]',
    town: 'Saltash',
  },
  {
    author: '[CONFIRM: real reviewer name]',
    rating: 5,
    text: '[CONFIRM: real review text from Google Business Profile]',
    town: 'Plymouth',
  },
];
