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
import { SpecTable } from '@/components/ui/SpecTable';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import '@/design/home.css';

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
    title: `${product.name} Saltash & Plymouth — Tamar Plastics Ltd`,
    description: product.answerFirstSummary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    notFound();
  }

  const categoryMeta = PRODUCT_CATEGORIES.find((c) => c.slug === product.slug);
  const heroImage = product.heroImage || categoryMeta?.imageSrc || '/images/products/doors.webp';

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

  return (
    <div className="home">
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
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <Link href="/products/" className="ghost-pill" style={{ height: '28px', padding: '0 12px' }}>Products</Link>
            <span style={{ color: 'var(--text-faint)' }}>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="section scrim">
          <div className="ghost">{product.name.toUpperCase()}</div>
          <div className="section-inner" style={{ paddingTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p className="eyebrow">SALTASH, CORNWALL · PRODUCT SPECIFICATION</p>
                <h1 className="h2" style={{ maxWidth: '16ch' }}>
                  {product.h1}
                </h1>
                {product.tagline && (
                  <p style={{ fontSize: '16px', color: 'var(--text-muted)', margin: 0 }}>
                    {product.tagline}
                  </p>
                )}

                {/* Answer-First Summary Scrim Box */}
                <div
                  className="product-card"
                  style={{
                    borderLeft: '3px solid var(--edge)',
                    background: 'rgba(11, 15, 14, 0.75)',
                    backdropFilter: 'blur(16px)',
                    padding: '20px 24px',
                  }}
                >
                  <p className="eyebrow" style={{ color: 'var(--edge)', marginBottom: '8px' }}>
                    QUICK SPECIFICATIONS OVERVIEW
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text)', margin: 0 }}>
                    {product.answerFirstSummary}
                  </p>
                </div>

                {/* CTAs */}
                <div className="hero-ctas">
                  <Link href="/trade/account/" className="btn">
                    Trade &amp; Supply Only →
                  </Link>
                  <Link href="/home-improvements/" className="btn btn--ghost">
                    Homeowner Supply &amp; Fit →
                  </Link>
                </div>
              </div>

              {/* Product Hero Image */}
              <div className="product-card" style={{ padding: '12px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <img
                    src={heroImage}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(11, 15, 14, 0.85)', backdropFilter: 'blur(12px)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Counter Availability:</span>
                    <span style={{ color: 'var(--in-stock)', fontWeight: 600 }}>In Stock at Saltash</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Badge Bar */}
        {product.badgeHighlights && product.badgeHighlights.length > 0 && (
          <section style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: '20px var(--gutter)', background: 'rgba(11, 15, 14, 0.4)' }}>
            <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {product.badgeHighlights.map((badge) => (
                <div key={badge} className="ghost-pill" style={{ height: '38px', width: '100%', justifyContent: 'center', fontSize: '12px', color: 'var(--text)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--edge)' }} />
                  {badge}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Data Sheet & Features */}
        <section className="section">
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
              {/* Technical Spec Table */}
              <div>
                <p className="eyebrow">TECHNICAL DATA SHEET</p>
                <h2 className="h2" style={{ fontSize: '28px', marginBottom: '24px' }}>
                  {product.name} Specifications
                </h2>
                <div className="product-card" style={{ padding: '24px' }}>
                  <SpecTable rows={product.specTable} />
                </div>
                {product.guarantee && (
                  <div style={{ marginTop: '16px', padding: '14px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--hairline)', background: 'rgba(242, 245, 244, 0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Warranty Protection:</span>
                    <span style={{ color: 'var(--edge)', fontWeight: 600 }}>{product.guarantee}</span>
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div>
                <p className="eyebrow">ENGINEERING &amp; DESIGN</p>
                <h2 className="h2" style={{ fontSize: '28px', marginBottom: '24px' }}>
                  Key Features &amp; Benefits
                </h2>
                {product.features && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {product.features.map((feature) => (
                      <div key={feature.title} className="product-card" style={{ padding: '20px 24px' }}>
                        <h3 className="h3" style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--edge)' }} />
                          {feature.title}
                        </h3>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Colours & Foil Swatches */}
        {product.colours && product.colours.length > 0 && (
          <section className="section scrim">
            <div className="section-inner">
              <p className="eyebrow">FINISHES &amp; COLOURWAYS</p>
              <h2 className="h2" style={{ fontSize: '28px', marginBottom: '24px' }}>
                Available Foils &amp; Finishes
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {product.colours.map((colour) => (
                  <div key={colour} className="product-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--paper)', border: '1px solid var(--hairline)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{colour}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dual Conversion Cards */}
        <section className="section">
          <div className="section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--gap)' }}>
              <div className="product-card" style={{ padding: '32px' }}>
                <p className="eyebrow" style={{ color: 'var(--edge)' }}>TRADE &amp; COMMERCIAL</p>
                <h3 className="h2" style={{ fontSize: '24px', marginBottom: '12px' }}>Buy {product.name} Supply-Only</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                  Open a trade account for trade pricing, same-day counter pickup in Saltash, or site delivery across Cornwall and Plymouth.
                </p>
                <Link href="/trade/account/" className="btn">
                  Trade Counter &amp; Account →
                </Link>
              </div>

              <div className="product-card" style={{ padding: '32px' }}>
                <p className="eyebrow" style={{ color: 'var(--in-stock)' }}>HOMEOWNERS &amp; RENOVATORS</p>
                <h3 className="h2" style={{ fontSize: '24px', marginBottom: '12px' }}>Book a Free Survey &amp; Fit</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                  Free no-obligation site surveys across Saltash, Plymouth, and Cornwall. Complete custom manufacture, fitting, and a 10-year guarantee.
                </p>
                <Link href="/home-improvements/" className="btn btn--ghost">
                  Book a Free Home Survey →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="section">
          <div className="section-inner" style={{ maxWidth: '800px' }}>
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="h2" style={{ fontSize: '28px', marginBottom: '28px' }}>
              Questions About {product.name}
            </h2>
            <div className="product-card" style={{ padding: '24px' }}>
              <FAQAccordion faqs={product.faqs} />
            </div>
          </div>
        </section>

        {/* Related Products Cross-Links */}
        {product.crossLinks && product.crossLinks.length > 0 && (
          <section style={{ borderTop: '1px solid var(--hairline)', padding: '24px var(--gutter)' }}>
            <div className="section-inner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <span className="eyebrow" style={{ margin: 0 }}>EXPLORE RELATED LINES:</span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {product.crossLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-link">
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
