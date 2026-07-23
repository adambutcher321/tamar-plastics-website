import { Reveal } from './Reveal';
import { PLACEHOLDER_GOOGLE_REVIEWS } from '@/content/placeholder-google-reviews';

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v9.1h11.9c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.5-9.5 6.5-16.7z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.3-3 .7-4.3v-5.7H4.5C3 16.9 2.2 20.3 2.2 24s.8 7.1 2.3 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

function Stars() {
  return (
    <span aria-hidden="true" style={{ color: '#FBBC05', letterSpacing: '1px' }}>
      ★★★★★
    </span>
  );
}

export function GoogleReviews() {
  // Duplicated once so the marquee can loop seamlessly (translate -50%).
  const track = [...PLACEHOLDER_GOOGLE_REVIEWS, ...PLACEHOLDER_GOOGLE_REVIEWS];

  return (
    <section className="section section--tight-top scrim" aria-labelledby="reviews-heading">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <Reveal>
              <p className="eyebrow">What Saltash says</p>
              <h2 className="h2" id="reviews-heading">
                Google reviews
              </h2>
            </Reveal>
          </div>
          <Reveal delayMs={70}>
            <div className="reviews-summary">
              <GoogleG />
              <span className="reviews-summary-score">5.0</span>
              <Stars />
              {/* PLACEHOLDER count — real figure comes from the Google Business Profile */}
              <span className="reviews-summary-count">10 reviews</span>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delayMs={70}>
        <div className="reviews-marquee">
          <div className="reviews-track">
            {track.map((review, index) => (
              <figure className="review-card" key={`${review.author}-${index}`}>
                <div className="review-card-head">
                  <GoogleG />
                  <Stars />
                </div>
                <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption>
                  {review.author} · {review.town}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
