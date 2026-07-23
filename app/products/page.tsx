import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { ALL_PRODUCTS } from '@/content/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';

export const metadata: Metadata = {
  title: 'Products Index — uPVC Windows, Doors & Roofline | Tamar Plastics Ltd',
  description:
    'Full product category range supplied over the trade counter in Saltash or fully fitted across Cornwall and Plymouth. Doors, windows, roofline, guttering, cladding, conservatory roofs, interior, and fixings.',
};

export default function ProductIndexPage() {
  return (
    <>
      {/* Breadcrumb Header */}
      <div className="bg-tamar-black text-white py-4 border-b border-ink-800">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products/' },
            ]}
          />
        </div>
      </div>

      {/* Index Hero */}
      <section className="bg-tamar-black text-white pt-12 pb-20 border-b border-ink-800">
        <div className="mx-auto max-w-7xl px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink-800 border border-ink-600 rounded-sm font-mono text-xs text-tamar-orange uppercase tracking-wider">
            <KeyholeMark className="w-4 h-4 text-tamar-orange" />
            <span>Complete Product Range</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl leading-tight">
            uPVC Windows, Doors, Roofline &amp; Building Plastics
          </h1>

          <p className="font-body text-lg sm:text-xl text-ink-200 max-w-3xl leading-relaxed">
            Trade counter supply in Saltash or professional supply-and-fit installations across Cornwall &amp; Plymouth. High-performance lead-free uPVC and composite building products engineered for Southwest weather endurance.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" href="/trade/">
              Trade Counter &amp; Accounts
            </Button>
            <Button variant="dark" href="/home-improvements/">
              Homeowner Supply &amp; Fit
            </Button>
          </div>
        </div>
      </section>

      {/* 8 Category High-End Grid */}
      <section className="py-20 bg-ink-050 text-tamar-black">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-600 block mb-1">
                Category Catalogue
              </span>
              <h2 className="font-display font-bold text-3xl text-tamar-black">
                Select a Product Category
              </h2>
            </div>
            <p className="font-mono text-sm text-ink-600">
              8 Core Categories · All In Stock or Custom Made
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((category) => {
              const fullContent = ALL_PRODUCTS[category.slug];
              return (
                <Link
                  key={category.slug}
                  href={category.href}
                  className="group block bg-white border border-ink-200 rounded-sm overflow-hidden hover:border-tamar-orange hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-tamar-black">
                      <img
                        src={category.imageSrc}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute top-3 left-3 bg-tamar-black/80 backdrop-blur-md p-2 rounded-sm border border-ink-600">
                        <img src={category.iconSrc} alt="" className="w-6 h-6 invert" />
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-display font-bold text-xl text-tamar-black group-hover:text-tamar-orange transition-colors">
                        {category.name}
                      </h3>
                      <p className="font-body text-sm text-ink-800 leading-relaxed">
                        {category.blurb}
                      </p>

                      {fullContent?.badgeHighlights && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {fullContent.badgeHighlights.slice(0, 2).map((badge) => (
                            <span
                              key={badge}
                              className="font-mono text-[11px] bg-ink-050 text-ink-600 border border-ink-200 px-2 py-0.5 rounded-sm"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-ink-050 flex items-center justify-between font-mono text-xs text-tamar-orange font-bold">
                    <span>View Specifications</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual Audience Banner */}
      <section className="py-16 bg-tamar-black text-white border-t border-ink-800">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-ink-800 border border-ink-600 p-8 rounded-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-tamar-orange">
              Trade &amp; Commercial
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              Visiting the Trade Counter in Saltash?
            </h3>
            <p className="font-body text-sm text-ink-200">
              Counter open Monday–Friday 08:00–17:00 at Unit 4, Gwel Avon Business Park, Gilston Road, Saltash (PL12 6TW). Same-day stock collection for standard lines.
            </p>
            <div className="pt-2">
              <Button variant="primary" href="/trade/collection-delivery/">
                Counter Hours &amp; Delivery Radius
              </Button>
            </div>
          </div>

          <div className="bg-ink-800 border border-ink-600 p-8 rounded-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-in-stock">
              Homeowner Installation
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              Need Windows or Doors Fitted?
            </h3>
            <p className="font-body text-sm text-ink-200">
              We provide free site surveys across Saltash, Plymouth, Torpoint, Tavistock, Liskeard, and Cornwall. FENSA-backed installations with a 10-year guarantee.
            </p>
            <div className="pt-2">
              <Button variant="primary" href="/home-improvements/process/">
                Our 5-Step Installation Process
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
