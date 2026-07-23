import Link from 'next/link';
import { Reveal } from './Reveal';
import { PRODUCT_CATEGORIES } from '@/content/product-categories';

export function ProductGrid() {
  return (
    <section className="section section--tight-top scrim" aria-labelledby="products-heading">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <Reveal>
              <p className="eyebrow">What we stock and fit</p>
              <h2 className="h2" id="products-heading">
                Products
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="products-grid">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delayMs={index * 70}>
              <Link href={category.href} className="product-card">
                <span className="product-card-icon-badge">
                  <img className="product-card-icon" src={category.iconSrc} alt="" aria-hidden="true" />
                </span>
                <h3 className="h3">{category.name}</h3>
                <p>{category.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
