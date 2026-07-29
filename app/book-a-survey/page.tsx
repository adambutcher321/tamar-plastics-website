import type { Metadata } from 'next';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { BUSINESS } from '@/content/business';
import { SurveyForm } from './SurveyForm';
import { ShieldCheck, Ruler, FileText, CheckCircle2, Phone, Star, MapPin, Sparkles } from 'lucide-react';
import '@/design/home.css';
import './survey.css';

export const metadata: Metadata = {
  title: 'Book a Free Site Survey | Tamar Plastics, Saltash',
  description:
    'Schedule a free no-obligation home or site survey across Saltash, Plymouth, Cornwall, and Devon. Itemised written quote with 10-year guarantee.',
  alternates: {
    canonical: '/book-a-survey/',
  },
};

export default function BookASurveyPage() {
  return (
    <div className="home">
      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main id="main-content">
        {/* ── Page Hero & Opening Section ────────────────────────────── */}
        <section className="survey-hero" aria-labelledby="survey-heading">
          <div className="survey-hero-inner">
            <div className="survey-hero-badge-wrap">
              <span className="survey-hero-pill">
                <MapPin size={14} className="survey-pill-icon" />
                Saltash · Plymouth · Cornwall &amp; Devon
              </span>
              <span className="survey-hero-pill survey-hero-pill--free">
                <Sparkles size={14} className="survey-pill-icon" />
                100% Free &amp; Zero Obligation
              </span>
            </div>

            <h1 className="survey-heading" id="survey-heading">
              BOOK A FREE SITE SURVEY
            </h1>
            
            <p className="survey-intro">
              Arrange a visit from our experienced surveyors to measure up, check technical requirements, and get an itemised written quotation for your home improvement project.
            </p>

            {/* ── 4-Point Guarantee Strip ───────────────────────────── */}
            <div className="survey-guarantee-strip" aria-label="Our survey promises">
              <div className="survey-guarantee-item">
                <ShieldCheck size={18} className="survey-guarantee-icon" />
                <div>
                  <strong>No Pushy Sales</strong>
                  <span>No 3-hour sales pitches or fake discounts</span>
                </div>
              </div>
              <div className="survey-guarantee-item">
                <Ruler size={18} className="survey-guarantee-icon" />
                <div>
                  <strong>Exact Measurements</strong>
                  <span>Measured by surveyors, not commission reps</span>
                </div>
              </div>
              <div className="survey-guarantee-item">
                <FileText size={18} className="survey-guarantee-icon" />
                <div>
                  <strong>Itemised Written Quote</strong>
                  <span>Full breakdown valid for 30 days</span>
                </div>
              </div>
              <div className="survey-guarantee-item">
                <CheckCircle2 size={18} className="survey-guarantee-icon" />
                <div>
                  <strong>Free &amp; No Obligation</strong>
                  <span>Completely free with no pressure to buy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Dual-Column Interactive Body ─────────────────────── */}
        <section className="survey-body" aria-label="Survey Request Form">
          <div className="survey-body-container">
            <div className="survey-layout-grid">
              
              {/* Left Column: Trust Signals & Sidebar Info */}
              <aside className="survey-sidebar">
                
                {/* Direct Phone Assistance Banner */}
                <div className="survey-card survey-card--callout">
                  <div className="survey-callout-icon">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h2 className="survey-card-heading">Prefer to speak to us first?</h2>
                    <p className="survey-card-subtext">
                      Call our Saltash team to discuss your project specs over the phone or arrange your visit directly.
                    </p>
                    <a href={`tel:${BUSINESS.phone}`} className="survey-phone-button">
                      Call {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* What Happens Next Timeline */}
                <div className="survey-card">
                  <h2 className="survey-card-heading">How your survey works</h2>
                  <ol className="survey-timeline">
                    <li className="survey-timeline-item">
                      <span className="survey-timeline-num">1</span>
                      <div>
                        <strong>Submit your details</strong>
                        <p>Choose your products, location, and preferred visit days in the form.</p>
                      </div>
                    </li>
                    <li className="survey-timeline-item">
                      <span className="survey-timeline-num">2</span>
                      <div>
                        <strong>We agree a time window</strong>
                        <p>Our team calls or emails you to confirm a specific arrival window.</p>
                      </div>
                    </li>
                    <li className="survey-timeline-item">
                      <span className="survey-timeline-num">3</span>
                      <div>
                        <strong>Site visit &amp; written quote</strong>
                        <p>We take millimetre measurements and send your clear itemised quotation.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Customer Trust Rating Card 1 */}
                <div className="survey-card survey-card--rating">
                  <div className="survey-rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F58A2E" color="#F58A2E" />
                    ))}
                    <span className="survey-rating-score">5.0 / 5.0</span>
                  </div>
                  <p className="survey-quote-text">
                    &ldquo;Tamar Plastics provided clear advice, precise measurements, and a fantastic installation. No pushy sales at all!&rdquo;
                  </p>
                  <span className="survey-quote-author">— Local Homeowner, Saltash</span>
                </div>

                {/* Customer Trust Rating Card 2 */}
                <div className="survey-card survey-card--rating">
                  <div className="survey-rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F58A2E" color="#F58A2E" />
                    ))}
                    <span className="survey-rating-score">5.0 / 5.0</span>
                  </div>
                  <p className="survey-quote-text">
                    &ldquo;Extremely professional from start to finish. The surveyor took exact measurements and the written quote arrived promptly.&rdquo;
                  </p>
                  <span className="survey-quote-author">— Homeowner, Plymouth</span>
                </div>

              </aside>

              {/* Right Column: Multi-Step Interactive Form */}
              <div className="survey-main-form-wrap">
                <SurveyForm />
              </div>

            </div>
          </div>
        </section>

        {/* ── Post-Form Guide: What to Expect ─────────────────────────── */}
        <section className="survey-expect-section" aria-labelledby="expect-heading">
          <div className="survey-expect-inner">
            <h2 className="survey-expect-heading" id="expect-heading">
              What happens during your home survey
            </h2>
            <p className="survey-expect-subheading">
              We treat your home with respect and ensure you have all the information required to make an informed decision.
            </p>

            <div className="survey-expect-grid">
              <div className="survey-expect-card">
                <div className="survey-expect-card-icon"><Ruler size={22} /></div>
                <h3>1. Practical site assessment</h3>
                <p>
                  Our surveyor inspects existing structural openings, brickwork, or roofline areas to check access, drainage, lintels, and fitting conditions before any order is placed.
                </p>
              </div>

              <div className="survey-expect-card">
                <div className="survey-expect-card-icon"><CheckCircle2 size={22} /></div>
                <h3>2. Precise measurements</h3>
                <p>
                  We take exact millimetre measurements so your bespoke uPVC windows, composite doors, cladding, or roofline products are manufactured to exact tolerances.
                </p>
              </div>

              <div className="survey-expect-card">
                <div className="survey-expect-card-icon"><ShieldCheck size={22} /></div>
                <h3>3. Technical advice &amp; options</h3>
                <p>
                  We discuss colour finishes, glass specifications, acoustic options, security hardware, and energy ratings without high-pressure scripts.
                </p>
              </div>

              <div className="survey-expect-card">
                <div className="survey-expect-card-icon"><FileText size={22} /></div>
                <h3>4. Itemised written quotation</h3>
                <p>
                  After the visit, we provide a transparent itemised written quote outlining all materials, delivery, fitting work, and VAT. No hidden extras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
