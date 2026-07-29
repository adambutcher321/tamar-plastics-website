'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, CalendarCheck, Award, Palette, ClipboardCheck, Check } from 'lucide-react';
import type { SpecRow, ProductFeature, Faq } from '@/content/content-types';
import { getColourStyle } from '@/lib/colours';

export interface ProductHeroSliderStat {
  value: string;
  label: string;
}

interface ProductHeroSliderProps {
  slug: string;
  eyebrow: string;
  headline: string;
  productName: string;
  paragraph: string;
  heroImage: string;
  heroAlt: string;
  stats: ProductHeroSliderStat[];
  specSummary: string;
  specHighlights: SpecRow[];
  specBadges: ReactNode;
  guarantee?: string;
  features: ProductFeature[];
  colours: string[];
  faqs: Faq[];
}

const TOTAL_SLIDES = 5;
const INTRO_STAT_ICONS = [Award, Palette, ClipboardCheck];

function getSlide1TechCardData(slug: string) {
  switch (slug) {
    case 'doors':
      return {
        title: 'COASTAL ENDURANCE SPECIFICATION',
        stats: [
          { val: '44mm', lbl: 'Solid High-Density Core' },
          { val: 'PAS 24', lbl: 'Police Security Certified' },
          { val: '0.9 W/m²K', lbl: 'A-Rated Thermal U-Value' },
        ],
      };
    case 'windows':
      return {
        title: 'PASSIVHAUS & ENERGY RATED SPEC',
        stats: [
          { val: 'A+ Rated', lbl: 'BFRC Certified Energy Rating' },
          { val: '0.8 W/m²K', lbl: 'Triple Glazed U-Value' },
          { val: 'Yale Lock', lbl: 'Multi-Point Shootbolt' },
        ],
      };
    case 'roofline':
      return {
        title: 'STRUCTURAL RAFTER PROTECTION SPEC',
        stats: [
          { val: '18mm', lbl: 'Heavy-Duty Replacement Board' },
          { val: 'Class 1', lbl: 'BS Fire Reaction Rated' },
          { val: '20-Year', lbl: 'Colourfast UV Guarantee' },
        ],
      };
    case 'guttering':
      return {
        title: 'SEVERE WEATHER DRAINAGE SPEC',
        stats: [
          { val: '4.9 L/s', lbl: 'Deepflow Storm Capacity' },
          { val: 'EPDM', lbl: 'Synthetic Leak-Free Seals' },
          { val: 'BS EN 607', lbl: 'UK Heavy Rainfall Rated' },
        ],
      };
    case 'cladding':
      return {
        title: 'EXTERIOR THERMAL SHIELD SPEC',
        stats: [
          { val: 'Class A', lbl: 'Euroclass Fire Safety Rated' },
          { val: '100%', lbl: 'Penetrating Rain Proof' },
          { val: '15-Year', lbl: 'Weatherboard Guarantee' },
        ],
      };
    case 'conservatory-roofs':
      return {
        title: 'PASSIVHAUS WARM ROOF SPEC',
        stats: [
          { val: '0.15 W/m²K', lbl: 'Thermal Insulation U-Value' },
          { val: '80% Less', lbl: 'Conservatory Heat Loss' },
          { val: 'JHAI Spec', lbl: 'Pre-Approved Calculations' },
        ],
      };
    case 'interior':
      return {
        title: 'HYGIENIC WATERPROOF WALL SPEC',
        stats: [
          { val: '100%', lbl: 'Mold-Free Waterproof PVC' },
          { val: 'Class 1', lbl: 'BS Fire Reaction Rated' },
          { val: 'Zero Grout', lbl: 'Rapid Tongue & Groove Fit' },
        ],
      };
    case 'trims-fixings':
      return {
        title: 'PROFESSIONAL INSTALLER SPEC',
        stats: [
          { val: 'Neutral Cure', lbl: 'Low-Modulus Trade Silicone' },
          { val: 'BS 5889', lbl: 'Trade Counter Specification' },
          { val: 'Same-Day', lbl: 'Counter Stock at Saltash' },
        ],
      };
    default:
      return {
        title: 'TAMAR CERTIFIED SPECIFICATION',
        stats: [
          { val: '10-Year', lbl: 'Insurance Backed Guarantee' },
          { val: 'Lead-Free', lbl: '100% Recyclable Profile' },
          { val: 'BS EN Spec', lbl: 'UK Manufactured Standard' },
        ],
      };
  }
}

export function ProductHeroSlider({
  slug,
  eyebrow,
  headline,
  productName,
  paragraph,
  heroImage,
  heroAlt,
  stats,
  specSummary,
  specHighlights,
  specBadges,
  guarantee,
  features,
  colours,
  faqs,
}: ProductHeroSliderProps) {
  const [active, setActive] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const lastIndex = TOTAL_SLIDES - 1;

  const goTo = (index: number) => setActive(Math.max(0, Math.min(lastIndex, index)));

  const specHalf = Math.ceil(specHighlights.length / 2);
  const specLeft = specHighlights.slice(0, specHalf);
  const specRight = specHighlights.slice(specHalf);

  const trackShiftPercent = active * (100 / TOTAL_SLIDES);
  const techCard = getSlide1TechCardData(slug);

  return (
    <div className="pd-slider-wrap">
      <div className="pd-slider-card">
        <div className="pd-slider-split" aria-hidden="true" />

        <div className="pd-slider-topbar">
          <span className="pd-slider-index">0{active + 1} / 0{TOTAL_SLIDES}</span>
          <div className="pd-slider-nav">
            <button
              type="button"
              className="pd-slider-arrow pd-slider-arrow--ghost"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous"
            >
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="pd-slider-arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === lastIndex}
              aria-label="Next"
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          className={active === 0 ? 'pd-slider-image pd-slider-image--intro' : 'pd-slider-image pd-slider-image--dim'}
          aria-hidden="true"
        >
          <img src={heroImage} alt={heroAlt} />
        </div>

        <div
          className="pd-slider-track"
          style={{ transform: `translateX(-${trackShiftPercent}%)` }}
        >
          {/* Slide 1 — Product Intro */}
          <div className="pd-slider-slide pd-slider-slide--intro" aria-hidden={active !== 0}>
            <div className="pd-slider-heading-block pd-slider-heading-block--intro">
              <p className="pd-eyebrow">{eyebrow}</p>
              <h1 className="pd-slider-heading">{headline}</h1>
              <p className="pd-slider-intro-text">{paragraph}</p>
              {specBadges && (
                <div className="pd-slider-intro-badges">
                  {specBadges}
                </div>
              )}
            </div>

            {/* Architectural Engineering Feature Callout */}
            <div className="pd-slider-intro-tech-card">
              <div className="pd-slider-intro-tech-tag">
                <span className="pd-slider-intro-tech-pulse" />
                {techCard.title}
              </div>
              <div className="pd-slider-intro-tech-grid">
                {techCard.stats.map((st) => (
                  <div key={st.lbl} className="pd-slider-intro-tech-item">
                    <span className="pd-tech-val">{st.val}</span>
                    <span className="pd-tech-lbl">{st.lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className="pd-slider-next-block" onClick={() => goTo(1)}>
              <span className="pd-slider-next-label">Next</span>
              <span className="pd-slider-next-title">Specifications</span>
              <span className="pd-slider-next-index">02 / 0{TOTAL_SLIDES}</span>
            </button>

            <div className="pd-slider-intro-stats">
              {stats.map((stat, i) => {
                const Icon = INTRO_STAT_ICONS[i % INTRO_STAT_ICONS.length];
                return (
                  <div key={stat.label} className="pd-slider-intro-stat">
                    <Icon className="pd-slider-intro-stat-icon" aria-hidden="true" />
                    <div>
                      <span className="pd-slider-intro-stat-value">{stat.value}</span>
                      <span className="pd-slider-intro-stat-label">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide 2 — Full Specifications */}
          <div className="pd-slider-slide" aria-hidden={active !== 1}>
            <div className="pd-slider-heading-block">
              <p className="pd-eyebrow">Technical Overview</p>
              <p className="pd-slider-heading">{productName} Specifications</p>
              <p className="pd-slider-spec-summary">{specSummary}</p>
              <div className="pd-slider-spec-badges">{specBadges}</div>
            </div>
            <div className="pd-slider-body">
              <div className="pd-slider-spec-columns">
                <div>
                  {specLeft.map((row) => (
                    <p key={row.label} className="pd-slider-spec-row">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </p>
                  ))}
                </div>
                <div>
                  {specRight.map((row) => (
                    <p key={row.label} className="pd-slider-spec-row">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </p>
                  ))}
                  {guarantee && (
                    <p className="pd-slider-warranty">
                      <span>Warranty Protection</span>
                      <span>{guarantee}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 — Key Features & Finishes */}
          <div className="pd-slider-slide" aria-hidden={active !== 2}>
            <div className="pd-slider-heading-block">
              <p className="pd-eyebrow">Engineering &amp; Design</p>
              <p className="pd-slider-heading">Key Features &amp; Finishes</p>
            </div>
            <div className="pd-slider-body">
              <div className="pd-features-grid-v2 pd-features-grid-v2--slide">
                {features.map((feature, i) => (
                  <div key={feature.title} className="pd-feature-card-v2">
                    <span className="pd-feature-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="pd-feature-title-v2">{feature.title}</h3>
                    <p className="pd-feature-text-v2">{feature.description}</p>
                  </div>
                ))}
              </div>

              {colours && colours.length > 0 && (
                <>
                  <div className="pd-slider-subhead">
                    <p className="pd-slider-subhead-title">Available Foils &amp; Finishes</p>
                    <p className="pd-slider-subhead-text">
                      All {productName} are available in a full range of foils and woodgrain
                      finishes, matched across trims, hardware and cills — {colours.length} in total.
                    </p>
                  </div>
                  <div className="pd-swatch-grid pd-swatch-grid--slide">
                    {colours.map((colour) => {
                      const style = getColourStyle(colour);
                      return (
                        <div key={colour} className="pd-swatch-card">
                          <div
                            className="pd-swatch-disc"
                            style={{ background: style.background, border: style.border }}
                          />
                          <span className="pd-swatch-label">{colour}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Slide 4 — Get Started */}
          <div className="pd-slider-slide" aria-hidden={active !== 3}>
            <div className="pd-slider-heading-block">
              <p className="pd-eyebrow">Get Started</p>
              <p className="pd-slider-heading">How Would You Like to Buy?</p>
            </div>
            <div className="pd-slider-body">
              <div className="pd-cta-grid pd-cta-grid--slide">
                <div className="pd-cta-card pd-cta-card--outline">
                  <div>
                    <Building2 className="pd-cta-card-icon" aria-hidden="true" />
                    <p className="pd-eyebrow">Trade &amp; Commercial</p>
                    <h3 className="pd-cta-card-title">Buy {productName} Supply-Only</h3>
                    <p className="pd-cta-card-text">
                      Open a trade account for exclusive trade pricing, same-day counter collection in Saltash, or site delivery across Cornwall and Devon.
                    </p>
                    <ul className="pd-cta-card-list">
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Trade counter pickup at Gwel Avon Business Park, Saltash</span>
                      </li>
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Dedicated trade pricing &amp; fast volume order processing</span>
                      </li>
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Direct site delivery across Cornwall &amp; Devon with full spec support</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/contact/" className="pd-btn pd-btn--secondary">
                    Contact Us →
                  </Link>
                </div>

                <div className="pd-cta-card pd-cta-card--filled">
                  <div>
                    <CalendarCheck className="pd-cta-card-icon" aria-hidden="true" />
                    <p className="pd-eyebrow">Homeowners &amp; Renovators</p>
                    <h3 className="pd-cta-card-title">Book a Free Survey &amp; Fit</h3>
                    <p className="pd-cta-card-text">
                      Free no-obligation site surveys across Saltash, Plymouth, Cornwall, and Devon. Complete custom manufacture, expert fitting, and a 10-year guarantee.
                    </p>
                    <ul className="pd-cta-card-list">
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Free site visit with accurate technical millimetre measurements</span>
                      </li>
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Itemised written quotation valid 30 days with zero sales pressure</span>
                      </li>
                      <li>
                        <Check size={16} className="pd-cta-card-list-icon" />
                        <span>Professional local installation team &amp; 10-year insurance guarantee</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/book-a-survey/" className="pd-btn pd-btn--primary">
                    Book a Free Home Survey →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 5 — FAQ */}
          <div className="pd-slider-slide" aria-hidden={active !== 4}>
            <div className="pd-slider-heading-block">
              <p className="pd-eyebrow">Frequently Asked Questions</p>
              <p className="pd-slider-heading">Questions About {productName}</p>
            </div>
            <div className="pd-slider-body">
              <div className="pd-faq-list">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={faq.question} className="pd-faq-row">
                      <button
                        type="button"
                        className="pd-faq-trigger"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      >
                        <span className="pd-faq-question">{faq.question}</span>
                        <span className="pd-faq-plus" aria-hidden="true">+</span>
                      </button>
                      {isOpen && <p className="pd-faq-answer">{faq.answer}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pd-slider-progress" role="tablist" aria-label="Hero slides">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className="pd-slider-dot"
              data-active={active === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="pd-slider-below">
        <div className="pd-ctas">
          <Link href="/book-a-survey/" className="pd-btn pd-btn--primary">
            Book a Free Survey →
          </Link>
        </div>
        <div className="pd-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="pd-stat-value">{stat.value}</span>
              <span className="pd-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
