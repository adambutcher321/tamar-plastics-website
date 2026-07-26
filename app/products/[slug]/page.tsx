import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { ALL_PRODUCTS, getProductBySlug } from '@/content/products';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { ProductHero, type ProductHeroStat } from '@/components/products/ProductHero';
import { ProductSpecsSection } from '@/components/products/ProductSpecsSection';
import { ProductFAQSection } from '@/components/products/ProductFAQSection';
import { getColourStyle } from '@/lib/colours';
import '@/design/home.css';
import './product-detail.css';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(ALL_PRODUCTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return {};

  return {
    title: `${product.name} Saltash, Cornwall & Devon — Tamar Plastics Ltd`,
    description: product.answerFirstSummary,
  };
}

/** Pulls the leading number out of a guarantee string (e.g. "10-Year
 * Manufacturer Guarantee" -> 10) so the hero stat is real content, not a
 * separately-maintained duplicate number that could drift out of sync. */
function guaranteeYears(guarantee?: string): string {
  const match = guarantee?.match(/(\d+)/);
  return match ? match[1] : '10';
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    notFound();
  }

  const categoryMeta = PRODUCT_CATEGORIES.find((c) => c.slug === product.slug);
  const heroImage = categoryMeta?.cutoutSrc || product.heroImage || categoryMeta?.imageSrc || '/images/products/doors.webp';

  const baseUrl = 'https://tamarplasticsltd.co.uk';
  const serviceSchema = buildServiceSchema({
    name: product.name,
    description: product.answerFirstSummary,
    url: `${baseUrl}/products/${product.slug}/`,
  });

  const faqSchema = buildFaqSchema(product.faqs);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Products', url: `${baseUrl}/products/` },
    { name: product.name, url: `${baseUrl}/products/${product.slug}/` },
  ]);

  const stats: ProductHeroStat[] = [
    { value: `${guaranteeYears(product.guarantee)}+`, label: 'Year Guarantee' },
    { value: String(product.colours.length), label: 'Colour Finishes' },
    { value: String(product.specTable.length), label: 'Key Specifications' },
  ];

  return (
    <div className="home pd-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main>
        {/* Breadcrumb Trail */}
        <div style={{ padding: '16px var(--gutter) 0', position: 'relative', zIndex: 2 }}>
          <div className="section-inner" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
            <Link href="/" className="ghost-pill" style={{ height: '28px', padding: '0 12px' }}>Home</Link>
            <span style={{ color: '#9C9EA8' }}>/</span>
            <Link href="/products/" className="ghost-pill" style={{ height: '28px', padding: '0 12px' }}>Products</Link>
            <span style={{ color: '#9C9EA8' }}>/</span>
            <span style={{ color: '#ffffff', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="section">
          <div className="section-inner" style={{ paddingTop: '20px' }}>
            <ProductHero
              eyebrow="Saltash, Cornwall & Devon"
              headline={product.h1}
              paragraph={product.tagline || product.answerFirstSummary}
              heroImage={heroImage}
              heroAlt={categoryMeta?.cutoutAlt || product.name}
              stats={stats}
            />
          </div>
        </section>

        {/* Highlights Badge Bar */}
        {product.badgeHighlights && product.badgeHighlights.length > 0 && (
          <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px var(--gutter)' }}>
            <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {product.badgeHighlights.map((badge) => (
                <div key={badge} className="ghost-pill" style={{ height: '38px', width: '100%', justifyContent: 'center', fontSize: '12px', color: '#ffffff' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F4791F' }} />
                  {badge}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Specifications — two column: statement headline + row list */}
        <section className="section">
          <div className="section-inner">
            <ProductSpecsSection headline={`${product.name} Specifications`} rows={product.specTable} />
            {product.guarantee && (
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#9C9EA8' }}>Warranty Protection:</span>
                <span style={{ color: '#F4791F', fontWeight: 600 }}>{product.guarantee}</span>
              </div>
            )}
          </div>
        </section>

        {/* Key Features */}
        {product.features && product.features.length > 0 && (
          <section className="section">
            <div className="section-inner">
              <p className="pd-eyebrow">Engineering &amp; Design</p>
              <h2 className="pd-specs-headline" style={{ marginBottom: '24px', maxWidth: 'none' }}>
                Key Features &amp; Benefits
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {product.features.map((feature) => (
                  <div key={feature.title}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F4791F', flexShrink: 0 }} />
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#9C9EA8', margin: 0 }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Colours & Foil Swatches */}
        {product.colours && product.colours.length > 0 && (
          <section className="section">
            <div className="section-inner">
              <p className="pd-eyebrow">Finishes &amp; Colourways</p>
              <h2 className="pd-specs-headline" style={{ marginBottom: '24px', maxWidth: 'none' }}>
                Available Foils &amp; Finishes
              </h2>
              <div className="pd-swatch-grid">
                {product.colours.map((colour) => {
                  const style = getColourStyle(colour);
                  return (
                    <div key={colour} className="pd-swatch-card">
                      <div
                        className="pd-swatch-disc"
                        style={{
                          background: style.background,
                          border: style.border,
                        }}
                      />
                      <span className="pd-swatch-label">{colour}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Dual Conversion Cards */}
        <section className="section">
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--gap)' }}>
              <div style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <p className="pd-eyebrow">Trade &amp; Commercial</p>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>Buy {product.name} Supply-Only</h3>
                <p style={{ fontSize: '14px', color: '#9C9EA8', lineHeight: '1.6', marginBottom: '20px' }}>
                  Open a trade account for trade pricing, same-day counter pickup in Saltash, or site delivery across Cornwall and Devon.
                </p>
                <Link href="/trade/account/" className="pd-btn pd-btn--primary">
                  Trade Counter &amp; Account →
                </Link>
              </div>

              <div style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <p className="pd-eyebrow">Homeowners &amp; Renovators</p>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>Book a Free Survey &amp; Fit</h3>
                <p style={{ fontSize: '14px', color: '#9C9EA8', lineHeight: '1.6', marginBottom: '20px' }}>
                  Free no-obligation site surveys across Saltash, Cornwall, and Devon. Complete custom manufacture, fitting, and a 10-year guarantee.
                </p>
                <Link href="/home-improvements/" className="pd-btn pd-btn--secondary">
                  Book a Free Home Survey →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section — left-aligned, no card, thin top-border rows */}
        <section className="section">
          <div className="section-inner">
            <p className="pd-eyebrow">Frequently Asked Questions</p>
            <h2 className="pd-specs-headline" style={{ marginBottom: '28px', maxWidth: 'none' }}>
              Questions About {product.name}
            </h2>
            <ProductFAQSection faqs={product.faqs} />
          </div>
        </section>

        {/* Related Products Cross-Links */}
        {product.crossLinks && product.crossLinks.length > 0 && (
          <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px var(--gutter)' }}>
            <div className="section-inner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <span className="pd-eyebrow" style={{ margin: 0 }}>Explore Related Lines:</span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {product.crossLinks.map((link) => (
                  <Link key={link.href} href={link.href} style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
