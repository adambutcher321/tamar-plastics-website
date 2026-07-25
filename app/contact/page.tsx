import type { Metadata } from 'next';
import { Nav }      from '@/components/home/Nav';
import { Footer }   from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain }    from '@/components/home/Grain';
import { BUSINESS } from '@/content/business';
import { ContactForm } from './ContactForm';
import '@/design/home.css';
import './contact.css';

export const metadata: Metadata = {
  title: 'Contact Us — Tamar Plastics Ltd, Saltash',
  description:
    'Get in touch with Tamar Plastics Ltd for a quote on uPVC windows, doors, roofline, guttering and more. Trade counter in Saltash, free surveys across Cornwall and Plymouth.',
};

const HOURS = BUSINESS.hours;
const DAY_RANGE = `${HOURS.days[0]}–${HOURS.days[HOURS.days.length - 1]}`;

export default function ContactPage() {
  return (
    <div className="home">
      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main id="main-content">
        {/* ── Page header ─────────────────────────────────────────────── */}
        <section className="section contact-hero" aria-labelledby="contact-heading">
          <div className="ghost" aria-hidden="true">CONTACT</div>
          <div className="section-inner contact-hero-inner">
            <p className="eyebrow">Contact</p>
            <h1 className="h2 contact-heading" id="contact-heading">
              Get a quote or ask a question
            </h1>
            <p className="hero-para contact-intro">
              Fill in the form and we'll come back to you — usually within one business day.
              For urgent stock queries, the fastest route is a call to the trade counter.
            </p>
          </div>
        </section>

        {/* ── Two-column contact section ───────────────────────────────── */}
        <section
          className="section contact-body"
          aria-label="Contact details and enquiry form"
        >
          <div className="section-inner contact-grid">
            {/* ── Left: info panel ───────────────────────────────────── */}
            <aside className="contact-info" aria-label="Contact information">
              <div className="contact-info-block">
                <h2 className="contact-info-heading">Visit or call</h2>
                <address className="contact-address">
                  <p>{BUSINESS.streetAddress}</p>
                  <p>{BUSINESS.addressLocality}, {BUSINESS.addressRegion}</p>
                  <p>{BUSINESS.postalCode}</p>
                </address>
              </div>

              <div className="contact-info-block">
                <h2 className="contact-info-heading">Phone</h2>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="contact-tel"
                >
                  {BUSINESS.phoneDisplay}
                </a>
                <p className="contact-info-note">
                  Same number as Carlton Plastics.
                </p>
              </div>

              <div className="contact-info-block">
                <h2 className="contact-info-heading">Email</h2>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="contact-email"
                >
                  {BUSINESS.email}
                </a>
              </div>

              <div className="contact-info-block">
                <h2 className="contact-info-heading">Counter hours</h2>
                <p className="contact-hours">
                  {DAY_RANGE}<br />
                  {HOURS.opens.replace(':', '.')}am –{' '}
                  {parseInt(HOURS.closes) >= 12
                    ? `${parseInt(HOURS.closes) === 12 ? '12' : parseInt(HOURS.closes) - 12}.${HOURS.closes.split(':')[1]}pm`
                    : `${HOURS.closes}am`}
                </p>
                <p className="contact-info-note">
                  Trade counter open for same-day collection on standard stocked lines.
                </p>
              </div>

              <div className="contact-info-divider" aria-hidden="true" />

              <p className="contact-reassurance">
                No obligation. If we can't help, we'll say so.
              </p>
            </aside>

            {/* ── Right: form ────────────────────────────────────────── */}
            <div className="contact-form-wrap" aria-label="Enquiry form">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
