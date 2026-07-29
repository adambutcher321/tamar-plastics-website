import { Star } from 'lucide-react';
import type { Review } from '@/content/reviews';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white border border-ink-200 rounded-sm p-6">
      <div className="flex gap-0.5 text-tamar-orange mb-2" aria-hidden="true">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="text-base text-ink-800 mb-3">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="text-sm text-ink-600">
        {review.author} · {review.town}
      </figcaption>
    </figure>
  );
}
