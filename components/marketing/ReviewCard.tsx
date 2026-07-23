import type { Review } from '@/content/reviews';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white border border-ink-200 rounded-sm p-6">
      <div className="font-mono text-sm text-tamar-orange mb-2" aria-hidden="true">
        {'★'.repeat(review.rating)}
      </div>
      <blockquote className="text-base text-ink-800 mb-3">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="text-sm text-ink-600">
        {review.author} · {review.town}
      </figcaption>
    </figure>
  );
}
