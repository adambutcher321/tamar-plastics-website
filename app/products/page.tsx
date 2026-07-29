import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { ALL_PRODUCTS } from '@/content/products';
import { BUSINESS } from '@/content/business';
import '@/design/home.css';

export const metadata: Metadata = {
  title: 'Products Index — uPVC Windows, Doors & Roofline | Tamar Plastics Ltd',
  description:
    'Complete trade & retail catalogue of uPVC windows, composite doors, roofline, guttering, cladding, conservatory roofs, wall panels, & fixings in Saltash.',
  alternates: {
    canonical: '/products/',
  },
};

export default function ProductIndexPage() {
  return (
    <div className="home">
      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main>
        {/* Category Index Hero */}
        <section className="section scrim">
          <div className="ghost">PRODUCTS</div>
          <div className="section-inner" style={{ paddingTop: '40px' }}>
            <div className="products-hero-grid">
              {/* Left Column: Heading & CTAs */}
              <div className="products-hero-left">
                <p className="eyebrow">SALTASH, CORNWALL · TRADE COUNTER &amp; INSTALLATION</p>
                <h1 className="h2" style={{ maxWidth: '18ch', marginBottom: '24px' }}>
                  uPVC Windows, Doors &amp; Building Plastics
                </h1>
                <p className="hero-para" style={{ maxWidth: '44ch', marginBottom: '32px', textAlign: 'left' }}>
                  High-performance lead-free uPVC and composite building products engineered for Southwest coastal endurance. Supplied over the counter in Saltash or expertly fitted across Cornwall and Devon.
                </p>
                <div className="hero-ctas">
                  <Link href="/contact/" className="btn">
                    Contact Us →
                  </Link>
                  <Link href="/book-a-survey/" className="btn btn--ghost">
                    Book a Free Home Survey →
                  </Link>
                </div>
              </div>

              {/* Right Column: Classy Product Showcase & Hub Card */}
              <div className="products-hero-card">
                <div className="products-hero-card-header">
                  <span className="products-hero-card-badge">
                    <Sparkles size={13} className="products-badge-icon" />
                    SALTASH TRADE &amp; FITTING HUB
                  </span>
                  <span className="products-hero-card-status">
                    <span className="products-status-dot" />
                    Counter Open 08:00–17:00
                  </span>
                </div>

                {/* Real Product Cutouts Showcase Row */}
                <div className="products-hero-showcase">
                  <div className="products-showcase-item">
                    <img src="/images/cutouts/doors.webp" alt="Composite Door" className="products-showcase-img" />
                    <span>Doors</span>
                  </div>
                  <div className="products-showcase-item">
                    <img src="/images/cutouts/windows.webp" alt="uPVC Window" className="products-showcase-img" />
                    <span>Windows</span>
                  </div>
                  <div className="products-showcase-item">
                    <img src="/images/cutouts/cladding.webp" alt="Cladding Board" className="products-showcase-img" />
                    <span>Cladding</span>
                  </div>
                  <div className="products-showcase-item">
                    <img src="/images/cutouts/roofline.webp" alt="Roofline Corner" className="products-showcase-img" />
                    <span>Roofline</span>
                  </div>
                </div>

                {/* Key Trade & Service Highlights */}
                <div className="products-hero-card-list">
                  <div className="products-hero-card-row">
                    <MapPin size={16} className="products-card-icon" />
                    <div>
                      <strong>Trade Counter &amp; Pickup</strong>
                      <span>Unit 4, Gwel Avon Business Park, Saltash (PL12 6TW)</span>
                    </div>
                  </div>
                  <div className="products-hero-card-row">
                    <Ruler size={16} className="products-card-icon" />
                    <div>
                      <strong>Free Site Surveys &amp; Measuring</strong>
                      <span>Accurate millimetre visits across Cornwall &amp; Devon</span>
                    </div>
                  </div>
                  <div className="products-hero-card-row">
                    <ShieldCheck size={16} className="products-card-icon" />
                    <div>
                      <strong>10-Year Guarantee</strong>
                      <span>Coastal endurance lead-free uPVC &amp; composite systems</span>
                    </div>
                  </div>
                </div>

                <div className="products-hero-card-footer">
                  <a href={`tel:${BUSINESS.phone}`} className="products-hero-phone-link">
                    <Phone size={14} />
                    <span>Direct Counter Hotline: <strong>{BUSINESS.phoneDisplay}</strong></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Product Categories Grid */}
        <section className="section section--tight-bottom">
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
                  <Link key={category.slug} href={category.href} className="product-card" data-slug={category.slug}>
                    <div className="product-card-icon-badge">
                      <img
                        src={category.cutoutSrc}
                        alt={category.cutoutAlt}
                        className="product-card-cutout"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="h3">{category.name}</h3>
                    <p style={{ marginBottom: '16px' }}>{category.blurb}</p>
                    {fullContent && fullContent.badgeHighlights && (
                      <div className="pd-badges-container">
                        {fullContent.badgeHighlights.slice(0, 2).map((badge: string) => (
                          <span key={badge} className="pd-spec-badge">
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
        <section className="section scrim section--tight-top">
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--gap)' }}>
              <div className="product-card" style={{ padding: '36px' }}>
                <p className="eyebrow" style={{ color: 'var(--edge)' }}>FOR TRADE BUYERS &amp; BUILDERS</p>
                <h3 className="h2" style={{ fontSize: '28px', marginBottom: '16px' }}>Visiting the Trade Counter?</h3>
                <p className="hero-para" style={{ marginBottom: '24px', maxWidth: '100%', textAlign: 'left' }}>
                  Counter open Monday–Friday 08:00–17:00 at Unit 4, Gwel Avon Business Park, Gilston Road, Saltash (PL12 6TW). Same-day stock collection for standard lines.
                </p>
                <Link href="/contact/" className="btn">
                  Contact Trade Counter →
                </Link>
              </div>

              <div className="product-card" style={{ padding: '36px' }}>
                <p className="eyebrow" style={{ color: 'var(--in-stock)' }}>FOR HOMEOWNERS &amp; RENOVATORS</p>
                <h3 className="h2" style={{ fontSize: '28px', marginBottom: '16px' }}>Need Fitting Services?</h3>
                <p className="hero-para" style={{ marginBottom: '24px', maxWidth: '100%', textAlign: 'left' }}>
                  We provide free site surveys across Saltash, Plymouth, Torpoint, Tavistock, Liskeard, and Cornwall. FENSA-backed installations with a 10-year guarantee.
                </p>
                <Link href="/book-a-survey/" className="btn btn--ghost">
                  Book a Free Home Survey →
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
