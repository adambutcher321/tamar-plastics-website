import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { getProductBySlug } from '@/content/products';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import type { ProductHeroStat } from '@/components/products/ProductHero';
import { ProductHeroSliderDoors } from '@/components/products/ProductHeroSliderDoors';
import { getTechHighlightInfo } from '@/components/products/ProductSpecsSection';
import '@/design/home.css';
import './product-detail.css';

/** Isolated fork of app/products/[slug]/page.tsx, scoped to just "doors" —
 * Next.js resolves this static route ahead of the [slug] dynamic route for
 * this exact path, so the other 7 product pages are entirely unaffected
 * while this page-layout redesign is being iterated on. Once approved, the
 * design gets ported back into the shared [slug] template and this file
 * goes away. Own copy of product-detail.css too, for the same reason.
 *
 * Every product-content section (Specs, Features, Finishes, Get Started,
 * FAQ) now lives as its own slide inside ProductHeroSliderDoors — there is
 * deliberately no scrollable content section below the hero card anymore,
 * only the global page chrome (related-lines bar, footer). */

export const metadata: Metadata = {
  title: 'uPVC & Composite Doors Saltash, Cornwall & Devon — Tamar Plastics Ltd',
  description: getProductBySlug('doors')?.answerFirstSummary,
};

function guaranteeYears(guarantee?: string): string {
  const match = guarantee?.match(/(\d+)/);
  return match ? match[1] : '10';
}

export default function DoorsPage() {
  const product = getProductBySlug('doors');
  if (!product) {
    throw new Error('doors product content missing');
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

  const techInfo = getTechHighlightInfo(product.slug);

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
        <div className="pd-breadcrumb">
          <div className="section-inner pd-breadcrumb-inner">
            <Link href="/" className="ghost-pill pd-breadcrumb-pill">Home</Link>
            <span className="pd-breadcrumb-sep">/</span>
            <Link href="/products/" className="ghost-pill pd-breadcrumb-pill">Products</Link>
            <span className="pd-breadcrumb-sep">/</span>
            <span className="pd-breadcrumb-current">{product.name}</span>
          </div>
        </div>

        {/* Hero Section — arrow-stepped, 6 slides: intro / specs / features /
            finishes / get started / FAQ. Everything the page has to say
            lives here now, nothing to scroll to below it. */}
        <section className="section pd-slider-section">
          <div className="section-inner">
            <ProductHeroSliderDoors
              eyebrow="Saltash, Cornwall & Devon"
              headline={product.h1}
              productName={product.name}
              paragraph={product.tagline || product.answerFirstSummary}
              heroImage={heroImage}
              heroAlt={categoryMeta?.cutoutAlt || product.name}
              stats={stats}
              specSummary={techInfo.summary}
              specHighlights={product.specTable}
              specBadges={techInfo.badges.map(({ label, icon: Icon }) => (
                <span key={label} className="pd-spec-badge">
                  <Icon className="pd-badge-icon" aria-hidden="true" />
                  {label}
                </span>
              ))}
              guarantee={product.guarantee}
              features={product.features || []}
              colours={product.colours}
              faqs={product.faqs}
            />
          </div>
        </section>

        {/* Related Products Cross-Links */}
        {product.crossLinks && product.crossLinks.length > 0 && (
          <section className="pd-crosslinks-bar">
            <div className="section-inner pd-crosslinks-inner">
              <span className="pd-eyebrow" style={{ margin: 0 }}>Explore Related Lines:</span>
              <div className="pd-crosslinks-list">
                {product.crossLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="pd-crosslink-link">
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
