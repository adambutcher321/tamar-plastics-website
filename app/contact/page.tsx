import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Mail, Phone, Clock, Star } from 'lucide-react';
import { Nav }      from '@/components/home/Nav';
import { Footer, FacebookIcon, InstagramIcon } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain }    from '@/components/home/Grain';
import { BUSINESS } from '@/content/business';
import { PLACEHOLDER_GOOGLE_REVIEWS } from '@/content/placeholder-google-reviews';
import { ContactForm } from './ContactForm';
import '@/design/home.css';
import './contact.css';

const TRUST_REVIEWS = PLACEHOLDER_GOOGLE_REVIEWS.slice(0, 3);

export const metadata: Metadata = {
  title: 'Contact Tamar Plastics | Trade Counter Saltash',
  description:
    'Contact Tamar Plastics Ltd in Saltash, Cornwall. Trade counter address, opening hours (Mon-Fri 08:00-17:00), phone 01752 841234, & enquiry form.',
  alternates: {
    canonical: '/contact/',
  },
};

const HOURS = BUSINESS.hours;
const DAY_RANGE = `${HOURS.days[0]}–${HOURS.days[HOURS.days.length - 1]}`;
const HOURS_RANGE = `${HOURS.opens.replace(':', '.')}am – ${
  parseInt(HOURS.closes) >= 12
    ? `${parseInt(HOURS.closes) === 12 ? '12' : parseInt(HOURS.closes) - 12}.${HOURS.closes.split(':')[1]}pm`
    : `${HOURS.closes}am`
}`;

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
            <div className="contact-hero-grid">
              <div className="contact-hero-left">
                <div className="contact-hero-top">
                  <div>
                    <p className="eyebrow">Contact</p>
                    <h1 className="h2 contact-heading" id="contact-heading">
                      Get a quote or ask a question
                    </h1>
                  </div>
                  <nav className="contact-breadcrumb" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span aria-hidden="true">→</span>
                    <span aria-current="page">Contact</span>
                  </nav>
                </div>
                <p className="hero-para contact-intro">
                  Fill in the form and we&apos;ll come back to you — usually within one business day.
                  For urgent stock queries, the fastest route is a call to the trade counter.
                </p>
              </div>

              <div className="contact-hero-icon-wrap" aria-hidden="true">
                <div className="contact-hero-icon-glow" />
                <img
                  src="/images/icons/contact-hero-3d.webp"
                  alt="Contact Us icon"
                  className="contact-hero-3d-icon"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Get In Touch: info + form ───────────────────────────────── */}
        <section
          className="section contact-body"
          aria-label="Contact details and enquiry form"
        >
          <div className="section-inner">
            <div className="contact-section-head">
              <p className="eyebrow">Our Contact</p>
              <h2 className="h2">Get In Touch</h2>
            </div>

            <div className="contact-grid">
              {/* ── Left: info panel ───────────────────────────────────── */}
              <aside className="contact-info" aria-label="Contact information">
                <div className="contact-info-item">
                  <MapPin className="contact-info-icon" aria-hidden="true" />
                  <div>
                    <h3 className="contact-info-heading">Our Office</h3>
                    <address className="contact-address">
                      <p><strong>{BUSINESS.legalName}</strong></p>
                      <p>{BUSINESS.streetAddress}</p>
                      <p>{BUSINESS.addressLocality}, {BUSINESS.addressRegion}</p>
                      <p>{BUSINESS.postalCode}</p>
                    </address>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Phone className="contact-info-icon" aria-hidden="true" />
                  <div>
                    <h3 className="contact-info-heading">Phone</h3>
                    <a href={`tel:${BUSINESS.phone}`} className="contact-tel">
                      {BUSINESS.phoneDisplay}
                    </a>
                    <p className="contact-info-note">
                      Same number as Carlton Plastics.
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Mail className="contact-info-icon" aria-hidden="true" />
                  <div>
                    <h3 className="contact-info-heading">Email</h3>
                    <a href={`mailto:${BUSINESS.email}`} className="contact-email">
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Clock className="contact-info-icon" aria-hidden="true" />
                  <div>
                    <h3 className="contact-info-heading">Counter hours</h3>
                    <p className="contact-hours">
                      {DAY_RANGE}<br />
                      {HOURS_RANGE}
                    </p>
                    <p className="contact-info-note">
                      Trade counter open for same-day collection on standard stocked lines.
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MapPin className="contact-info-icon" aria-hidden="true" />
                  <div>
                    <h3 className="contact-info-heading">Directions &amp; Parking</h3>
                    <p className="contact-info-note">
                      We are located at Gwel Avon Business Park. Free customer parking and large vehicle loading bays are available directly outside our trade counter.
                    </p>
                  </div>
                </div>

                <div className="contact-info-divider" aria-hidden="true" />

                <div className="contact-trust">
                  <div className="contact-trust-score">
                    <span className="contact-trust-stars" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                    <span className="contact-trust-figure">5.0 on Google</span>
                  </div>
                  {TRUST_REVIEWS.map((review) => (
                    <blockquote key={review.author} className="contact-trust-quote">
                      &ldquo;{review.text}&rdquo;
                      <cite>— {review.author}, {review.town}</cite>
                    </blockquote>
                  ))}
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
          </div>
        </section>

        {/* ── Follow our social media ──────────────────────────────────── */}
        <section className="section contact-social-band" aria-label="Follow us on social media">
          <div className="section-inner contact-social-inner">
            <p className="eyebrow">Get Connected</p>
            <h2 className="h2">Follow Our Social Media</h2>
            <div className="contact-social-links">
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tamar Plastics on Facebook"
                className="contact-social-link"
              >
                <FacebookIcon />
              </a>
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tamar Plastics on Instagram"
                className="contact-social-link"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </section>

        {/* ── Full-width map ───────────────────────────────────────────── */}
        <section className="contact-map-section" aria-label="Map showing our location">
          <iframe
            src={`https://www.google.com/maps?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}&z=15&output=embed`}
            title="Tamar Plastics trade counter location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
