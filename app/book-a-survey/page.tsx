import type { Metadata } from 'next';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { BUSINESS } from '@/content/business';
import { SurveyForm } from './SurveyForm';
import '@/design/home.css';
import './survey.css';

export const metadata: Metadata = {
  title: 'Book a Survey | Tamar Plastics, Saltash',
  description:
    'Arrange a visit to discuss your project, check practical details and take accurate measurements. Site surveys across Saltash, Cornwall and Plymouth.',
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
            <div className="survey-hero-grid">
              {/* Left Column: Heading & Intro */}
              <div>
                <p className="eyebrow">Saltash, Cornwall · Supply &amp; Fit</p>
                <h1 className="survey-heading" id="survey-heading">
                  BOOK A SURVEY
                </h1>
                <p className="survey-intro">
                  Arrange a visit to discuss your project, check the practical details, and take accurate measurements for windows, doors, roofline, or cladding.
                </p>

                <div className="survey-direct-contact">
                  <span>Prefer to speak to someone first?</span>
                  <a href={`tel:${BUSINESS.phone}`} className="survey-tel-link">
                    Call our team on {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Right Column: Restrained "What to Expect" Sequence */}
              <div className="survey-expect-box" aria-label="Survey visit overview">
                <h2 className="survey-expect-title">How it works</h2>
                <ol className="survey-steps-list">
                  <li className="survey-step-item">
                    <span className="survey-step-num">1</span>
                    <div>
                      <strong>Tell us about your project</strong>
                      <div>Select your products, location, and preferred visit days below.</div>
                    </div>
                  </li>
                  <li className="survey-step-item">
                    <span className="survey-step-num">2</span>
                    <div>
                      <strong>We contact you to agree a time</strong>
                      <div>Our team will get in touch to confirm an exact date and time window.</div>
                    </div>
                  </li>
                  <li className="survey-step-item">
                    <span className="survey-step-num">3</span>
                    <div>
                      <strong>We visit &amp; take measurements</strong>
                      <div>We inspect the site, discuss options, and prepare your detailed quotation.</div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Form Section ───────────────────────────────────────── */}
        <section className="survey-body" aria-label="Survey Request Form">
          <SurveyForm />
        </section>

        {/* ── Post-Form Guide: What to Expect ─────────────────────────── */}
        <section className="survey-expect-section" aria-labelledby="expect-heading">
          <div className="survey-expect-inner">
            <h2 className="survey-expect-heading" id="expect-heading">
              What to expect during your site survey
            </h2>

            <div className="survey-expect-grid">
              <div className="survey-expect-card">
                <h3>1. Practical site assessment</h3>
                <p>
                  Our surveyor inspects the existing structural openings, brickwork, or roofline area to check access, drainage, and fitting conditions before any order is placed.
                </p>
              </div>

              <div className="survey-expect-card">
                <h3>2. Precise measurements</h3>
                <p>
                  We take exact millimetre measurements so your bespoke uPVC windows, composite doors, or roofline products are manufactured or cut to precise specifications.
                </p>
              </div>

              <div className="survey-expect-card">
                <h3>3. Honest advice &amp; options</h3>
                <p>
                  We discuss colour finishes, glass specifications, security hardware, and energy ratings without high-pressure sales scripts or artificial discount gimmicks.
                </p>
              </div>

              <div className="survey-expect-card">
                <h3>4. Clear written quotation</h3>
                <p>
                  After the visit, we provide a itemised written quote outlining all materials, delivery, and installation work with full pricing transparency.
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
