import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_PRODUCTS, getProductBySlug } from '@/content/products';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { SpecTable } from '@/components/ui/SpecTable';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';

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
    <>
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

      <div className="bg-tamar-black text-white py-4 border-b border-ink-800">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products/' },
              { name: product.name, href: `/products/${product.slug}/` },
            ]}
          />
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-tamar-black text-white pt-10 pb-16 border-b border-ink-800">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink-800 border border-ink-600 rounded-sm font-mono text-xs text-tamar-orange uppercase tracking-wider">
              <KeyholeMark className="w-4 h-4 text-tamar-orange" />
              <span>Product Specification Category</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {product.h1}
            </h1>

            {product.tagline && (
              <p className="font-body text-lg text-ink-200 font-medium">{product.tagline}</p>
            )}

            {/* Answer-First Summary Box (AEO optimized) */}
            <div className="bg-ink-800/80 border-l-4 border-tamar-orange p-6 rounded-r-sm space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-tamar-orange block">
                Quick Summary / Specifications Overview
              </span>
              <p className="font-body text-base text-white/95 leading-relaxed">
                {product.answerFirstSummary}
              </p>
            </div>

            {/* CTA Split */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button variant="primary" href="/trade/">
                Trade Counter &amp; Supply Only
              </Button>
              <Button variant="dark" href="/home-improvements/">
                Homeowner Supply &amp; Fit
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden border border-ink-600 shadow-2xl group">
              <img
                src={heroImage}
                alt={product.name}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tamar-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-tamar-black/90 backdrop-blur-md p-4 rounded-sm border border-ink-600 flex justify-between items-center text-xs font-mono">
                <span className="text-ink-200">Stock Availability:</span>
                <span className="text-in-stock font-bold">In Stock at Saltash Counter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Badge Bar */}
      {product.badgeHighlights && product.badgeHighlights.length > 0 && (
        <section className="bg-ink-800 border-b border-ink-600 py-6">
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {product.badgeHighlights.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-3 p-3 bg-tamar-black/50 border border-ink-600 rounded-sm"
              >
                <div className="w-2 h-2 rounded-full bg-tamar-orange shrink-0" />
                <span className="font-mono text-xs text-white font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid: Specs & Features */}
      <section className="py-16 bg-white text-tamar-black">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-12">
          {/* Spec Table */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-600 block mb-1">
                Technical Data Sheet
              </span>
              <h2 className="font-display font-bold text-2xl text-tamar-black">
                {product.name} Specifications
              </h2>
            </div>
            <div className="bg-ink-050 p-6 rounded-sm border border-ink-200 shadow-sm">
              <SpecTable rows={product.specTable} />
            </div>

            {product.guarantee && (
              <div className="flex items-center justify-between p-4 bg-sky border border-ink-200 rounded-sm font-mono text-sm">
                <span className="font-semibold text-tamar-black">Warranty Protection:</span>
                <span className="text-tamar-orange font-bold">{product.guarantee}</span>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-ink-600 block mb-1">
                Engineering &amp; Design
              </span>
              <h2 className="font-display font-bold text-2xl text-tamar-black">
                Key Features &amp; Performance
              </h2>
            </div>

            {product.features && (
              <div className="grid gap-4">
                {product.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-5 bg-white border border-ink-200 rounded-sm hover:border-tamar-orange transition-colors"
                  >
                    <h3 className="font-display font-bold text-lg text-tamar-black mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-tamar-orange rounded-full" />
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-ink-800 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Colour & Foil Finishes Swatch Section */}
      {product.colours && product.colours.length > 0 && (
        <section className="py-16 bg-ink-050 border-t border-b border-ink-200">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-600 block mb-1">
                Finishes &amp; Colorways
              </span>
              <h2 className="font-display font-bold text-2xl text-tamar-black">
                Available Foils &amp; Colors
              </h2>
              <p className="font-body text-base text-ink-800 mt-2">
                Available in standard smooth white and rich architectural foil grains. Custom dual-color frames (different inside/outside) available to order.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {product.colours.map((colour) => (
                <div
                  key={colour}
                  className="bg-white border border-ink-200 p-4 rounded-sm flex items-center gap-3 shadow-sm"
                >
                  <div className="w-4 h-4 rounded-full bg-tamar-black shrink-0 border border-ink-200" />
                  <span className="font-body font-medium text-sm text-tamar-black">{colour}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dual Audience Conversion Banner */}
      <section className="py-16 bg-tamar-black text-white">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-2">
          <div className="bg-ink-800 border border-ink-600 p-8 rounded-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-tamar-orange">
              Trade Installers &amp; Builders
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              Buy {product.name} Supply-Only
            </h3>
            <p className="font-body text-sm text-ink-200 leading-relaxed">
              Open a trade account for competitive pricing, same-day counter pickup at Gwel Avon Business Park in Saltash, or job-site delivery across Cornwall and Plymouth.
            </p>
            <div className="pt-2">
              <Button variant="primary" href="/trade/">
                Trade Account &amp; Counter Info
              </Button>
            </div>
          </div>

          <div className="bg-ink-800 border border-ink-600 p-8 rounded-sm space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-in-stock">
              Homeowners &amp; Renovators
            </span>
            <h3 className="font-display font-bold text-2xl text-white">
              Book a Free Survey &amp; Fit
            </h3>
            <p className="font-body text-sm text-ink-200 leading-relaxed">
              Our local expert fitting team provides free no-obligation home surveys across Saltash, Plymouth, and Cornwall. Includes complete custom manufacture, installation, and a 10-year guarantee.
            </p>
            <div className="pt-2">
              <Button variant="primary" href="/home-improvements/">
                Book a Free Home Survey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white text-tamar-black">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-600 block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-bold text-2xl text-tamar-black">
              Questions About {product.name}
            </h2>
          </div>

          <FAQAccordion faqs={product.faqs} />
        </div>
      </section>

      {/* Cross-Links Section */}
      {product.crossLinks && product.crossLinks.length > 0 && (
        <section className="py-12 bg-ink-050 border-t border-ink-200">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-mono text-sm text-ink-600 font-medium">
              Explore Related Product Lines:
            </span>
            <div className="flex flex-wrap gap-4">
              {product.crossLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body font-semibold text-sm text-tamar-black hover:text-tamar-orange underline decoration-tamar-orange underline-offset-4"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
