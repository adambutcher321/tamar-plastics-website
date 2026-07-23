import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { ALL_PRODUCTS } from '@/content/products';
import '@/design/home.css';

export const metadata: Metadata = {
  title: 'Products Index — uPVC Windows, Doors & Roofline | Tamar Plastics Ltd',
  description:
    'Full product category range supplied over the trade counter in Saltash or fully fitted across Cornwall and Plymouth. Doors, windows, roofline, guttering, cladding, conservatory roofs, interior, and fixings.',
};

export default function ProductIndexPage() {
  return (
    <div className="home">
      <ScrollFx />
      <Grain />
      <Nav />

      <main>
        {/* Category Index Hero */}
        <section className="section scrim">
          <div className="ghost">PRODUCTS</div>
          <div className="section-inner" style={{ paddingTop: '40px' }}>
            <p className="eyebrow">SALTASH, CORNWALL · TRADE COUNTER &amp; INSTALLATION</p>
            <h1 className="h2" style={{ maxWidth: '18ch', marginBottom: '24px' }}>
              uPVC Windows, Doors &amp; Building Plastics
            </h1>
            <p className="hero-para" style={{ maxWidth: '42ch', marginBottom: '32px' }}>
              High-performance lead-free uPVC and composite building products engineered for Southwest coastal endurance. Supplied over the counter in Saltash or expertly fitted across Plymouth and Cornwall.
            </p>
            <div className="hero-ctas">
              <Link href="/trade/account/" className="btn">
                Trade &amp; Supply Only →
              </Link>
              <Link href="/home-improvements/" className="btn btn--ghost">
                Homeowner Supply &amp; Fit →
              </Link>
            </div>
          </div>
        </section>

        {/* 8 Product Categories Grid */}
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <p className="eyebrow">CATALOGUE</p>
                <h2 className="h2">Select a Product Category</h2>
              </div>
              <p className="hero-para" style={{ textAlign: 'right' }}>
                8 Core Categories · In Stock at Saltash or Custom Made
              </p>
            </div>

            <div className="products-grid">
              {PRODUCT_CATEGORIES.map((category) => {
                const fullContent = ALL_PRODUCTS[category.slug];
                return (
                  <Link key={category.slug} href={category.href} className="product-card">
                    <div className="product-card-icon-badge">
                      <img src={category.iconSrc} alt="" className="product-card-icon" />
                    </div>
                    <h3 className="h3">{category.name}</h3>
                    <p style={{ marginBottom: '16px' }}>{category.blurb}</p>
                    {fullContent?.badgeHighlights && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                        {fullContent.badgeHighlights.slice(0, 2).map((badge) => (
                          <span key={badge} className="ghost-pill" style={{ height: '26px', fontSize: '11px', padding: '0 10px' }}>
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Audience Split Banner */}
        <section className="section scrim">
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--gap)' }}>
              <div className="product-card" style={{ padding: '36px' }}>
                <p className="eyebrow" style={{ color: 'var(--edge)' }}>FOR TRADE BUYERS &amp; BUILDERS</p>
                <h3 className="h2" style={{ fontSize: '28px', marginBottom: '16px' }}>Visiting the Trade Counter?</h3>
                <p className="hero-para" style={{ marginBottom: '24px', maxWidth: '100%' }}>
                  Counter open Monday–Friday 08:00–17:00 at Unit 4, Gwel Avon Business Park, Gilston Road, Saltash (PL12 6TW). Same-day stock collection for standard lines.
                </p>
                <Link href="/trade/collection-delivery/" className="btn">
                  Counter Hours &amp; Delivery Radius →
                </Link>
              </div>

              <div className="product-card" style={{ padding: '36px' }}>
                <p className="eyebrow" style={{ color: 'var(--in-stock)' }}>FOR HOMEOWNERS &amp; RENOVATORS</p>
                <h3 className="h2" style={{ fontSize: '28px', marginBottom: '16px' }}>Need Fitting Services?</h3>
                <p className="hero-para" style={{ marginBottom: '24px', maxWidth: '100%' }}>
                  We provide free site surveys across Saltash, Plymouth, Torpoint, Tavistock, Liskeard, and Cornwall. FENSA-backed installations with a 10-year guarantee.
                </p>
                <Link href="/home-improvements/process/" className="btn btn--ghost">
                  5-Step Survey &amp; Fit Process →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
