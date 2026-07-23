export interface PlaceholderReview {
  author: string;
  town: string;
  text: string;
}

// PLACEHOLDER — fabricated for visual/layout purposes only, at the client's
// explicit request, to demo the reviews section before real Google data is
// wired up. Never feed this into Review/AggregateRating JSON-LD — that
// requires genuine pulled review data (see brief §8.3, "pull the Google
// reviews, don't fabricate").
export const PLACEHOLDER_GOOGLE_REVIEWS: PlaceholderReview[] = [
  { author: 'Dave H.', town: 'Saltash', text: 'New composite front door fitted in under a day. Really pleased with the finish.' },
  { author: 'Mark T.', town: 'Plymouth', text: 'Called in for fascia boards — had them in stock and cut to size while I waited.' },
  { author: 'Sue P.', town: 'Torpoint', text: 'Windows fitted across the whole house. Tidy job, cleaned up after themselves.' },
  { author: 'Alan R.', town: 'Callington', text: 'Same phone number as Carlton Plastics so I knew exactly who I was dealing with.' },
  { author: 'Julie M.', town: 'Liskeard', text: 'Conservatory roof replaced — no more leaks, and it is warmer in there now.' },
  { author: 'Chris B.', town: 'Plymouth', text: 'Trade counter always has what I need. In and out in five minutes.' },
  { author: 'Karen W.', town: 'Looe', text: 'Guttering replaced after storm damage. Quoted fair, fitted fast.' },
  { author: 'Steve L.', town: 'Millbrook', text: 'Good range of roofline colours. Anthracite grey looks great against the render.' },
  { author: 'Emma D.', town: 'Tavistock', text: 'Booked a survey, had a fixed price within the week. No pressure at all.' },
  { author: 'Nigel F.', town: 'Launceston', text: 'Been using them for years as Carlton, now Tamar. Same reliable service.' },
];
