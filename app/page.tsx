import Link from 'next/link';
import { Hero } from '@/components/marketing/Hero';
import { AudienceForkCard } from '@/components/marketing/AudienceForkCard';
import { ProofBand } from '@/components/marketing/ProofBand';
import { ReviewCard } from '@/components/marketing/ReviewCard';
import { CounterStatus } from '@/components/marketing/CounterStatus';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { PLACEHOLDER_REVIEWS } from '@/content/reviews';
import { BUSINESS } from '@/content/business';

export default function HomePage() {
  return (
    <>
      <Hero posterSrc="/placeholders/hero-roofline.svg" />

      {/* Section 2: Audience fork (secondary, lower-page reinforcement of the hero's own fork) */}
      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-6 sm:grid-cols-2">
        <AudienceForkCard
          variant="trade"
          title="Buying for a job?"
          description="Open a trade account, check stock and collect from the counter in Saltash."
          href="/trade/"
        />
        <AudienceForkCard
          variant="home"
          title="Improving your home?"
          description="Book a free survey for windows, doors or roofline, supplied and fitted."
          href="/home-improvements/"
        />
      </section>

      {/* Section 3: Product grid */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-8">What we stock and fit</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="min-h-[44px] block bg-white border border-ink-200 rounded-sm p-4 hover:border-tamar-orange"
              >
                <h3 className="font-body font-semibold text-base text-tamar-black">{category.name}</h3>
                <p className="text-sm text-ink-600 mt-1">{category.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Split proof band */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <ProofBand
          tradeStats={[
            { label: 'Delivery radius', value: '25 MI FROM SALTASH' },
            { label: 'Counter hours', value: 'MON–FRI 08:00–17:00' },
            { label: 'Collection', value: 'SAME DAY, IN-STOCK LINES' },
          ]}
          homeownerStats={[
            { label: 'Established as', value: 'CARLTON PLASTICS' },
            { label: 'Free survey', value: 'ACROSS CORNWALL & PLYMOUTH' },
            { label: 'Same number', value: '01752 841234' },
          ]}
        />
      </section>

      {/* Section 5: Recent local work (placeholder — full projects gallery is Phase 2) */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-2">Recent local work</h2>
          <p className="text-base text-ink-600 mb-8">
            A full project gallery is coming soon. Ask the counter or your surveyor about work near you.
          </p>
        </div>
      </section>

      {/* Section 6: The Carlton story */}
      <section className="mx-auto px-4 py-16 max-w-3xl">
        <h2 className="font-display font-bold text-2xl text-tamar-black mb-4">Same team, new name</h2>
        <p className="text-base text-ink-800">
          We traded as Carlton Plastics for years from Kingsmill Rd. We&apos;re now Tamar Plastics Ltd,
          based on Gwel Avon Business Park in Saltash — same team, same trade counter, same phone
          number: 01752 841234. If you&apos;ve bought from us before, nothing about how we work has
          changed except the address.
        </p>
      </section>

      {/* Section 7 (partial): local proof via placeholder reviews — full service-area map is Phase 2 */}
      <section className="bg-ink-050 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display font-bold text-2xl text-tamar-black mb-8">What people say</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PLACEHOLDER_REVIEWS.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Contact band */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-tamar-black mb-2">Visit the counter</h2>
            <address className="not-italic text-base text-ink-800">
              {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
            </address>
            <div className="mt-2">
              <CounterStatus />
            </div>
          </div>
          <Button variant="primary" href="/contact/">Get directions</Button>
        </Card>
      </section>
    </>
  );
}
