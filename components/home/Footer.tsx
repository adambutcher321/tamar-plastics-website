import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/content/business';
import { FooterCounterStatus } from './FooterCounterStatus';
import { CookieSettingsButton } from '@/components/privacy/CookieSettingsButton';

const MAPS_URL =
  'https://maps.google.com/maps?q=Unit+4+Gwel+Avon+Business+Park+Gilston+Road+Saltash+PL12+6TW';

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.96 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="site-footer" aria-label="Site footer">

      {/* ── 1. Enquiry strip ──────────────────────────────────────────── */}
      <div className="footer-enquiry-strip">
        <div className="footer-inner">
          <div className="footer-enquiry-body">
            <h2 className="footer-enquiry-heading">
              Need plastics cut to size or help choosing the right product?
            </h2>
            <p className="footer-enquiry-sub">
              Whether it's a trade order, home-improvement project, window repair or
              advice on the right grade of material — our team are here to help.
            </p>
          </div>
          <div className="footer-enquiry-actions">
            <Link href="/contact/" className="btn btn--orange">
              Contact our team
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="footer-tel-link">
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Main content ───────────────────────────────────────────── */}
      <div className="footer-main">
        <div className="footer-inner footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" aria-label="Tamar Plastics — home">
              <Image
                src="/tamar-logo-white.svg"
                alt="Tamar Plastics Ltd"
                width={148}
                height={48}
                className="footer-logo"
                style={{ width: '148px', height: 'auto' }}
              />
            </Link>
            <p className="footer-brand-formerly">Formerly Carlton Plastics</p>
            <p className="footer-brand-desc">
              Trade plastics, glazing products, repairs and home-improvement
              solutions from our Saltash premises.
            </p>
            {/* Social links — anchored to brand, not floating */}
            <nav
              className="footer-social"
              aria-label="Tamar Plastics on social media"
            >
              {/* TODO: replace href values with the real account URLs */}
              <a
                href="https://www.facebook.com/people/Tamar-Plastics-Ltd/61555741155497/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tamar Plastics on Facebook"
                className="footer-social-link"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/tamarplastics/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tamar Plastics on Instagram"
                className="footer-social-link"
              >
                <InstagramIcon />
              </a>
            </nav>
          </div>

          {/* Visit & contact column */}
          <div className="footer-contact">
            <h3 className="footer-col-label">Visit or call</h3>
            <address className="footer-address">
              <p>{BUSINESS.streetAddress}</p>
              <p>{BUSINESS.addressLocality}, {BUSINESS.addressRegion}</p>
              <p>{BUSINESS.postalCode}</p>
            </address>
            <div className="footer-contact-links">
              <a href={`tel:${BUSINESS.phone}`} className="footer-contact-link footer-phone">
                {BUSINESS.phoneDisplay}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="footer-contact-link footer-email">
                {BUSINESS.email}
              </a>
            </div>
            <div className="footer-hours">
              <span className="footer-hours-days">Mon–Fri</span>
              <span className="footer-hours-times">08.00 – 17.00</span>
              <span className="footer-counter-status">
                <FooterCounterStatus />
              </span>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-directions"
            >
              Get directions ↗
            </a>
          </div>

          {/* Navigation columns */}
          <div className="footer-nav-wrap">
            <nav className="footer-nav-group" aria-label="Explore Tamar Plastics">
              <h3 className="footer-col-label">Explore</h3>
              <ul className="footer-nav-list">
                <li><Link href="/trade/">Trade &amp; Supply</Link></li>
                <li><Link href="/home-improvements/">Home Improvements</Link></li>
                <li><Link href="/products/">Products</Link></li>
                <li><Link href="/repairs/">Repairs</Link></li>
              </ul>
            </nav>
            <nav className="footer-nav-group" aria-label="Company information">
              <h3 className="footer-col-label">Company</h3>
              <ul className="footer-nav-list">
                <li><Link href="/book-a-survey/">BOOK A SURVEY</Link></li>
                <li><Link href="/about/">About</Link></li>
                <li><Link href="/contact/">Contact</Link></li>
              </ul>
            </nav>
          </div>

        </div>
      </div>

      {/* ── 3. Lower utility row ──────────────────────────────────────── */}
      <div className="footer-utility">
        <div className="footer-inner footer-utility-inner">
          <p className="footer-copyright">
            &copy; {currentYear} Tamar Plastics Ltd. All rights reserved.
          </p>
          <nav className="footer-legal" aria-label="Legal links">
            <Link href="/privacy-policy/">Privacy policy</Link>
            <Link href="/cookie-policy/">Cookie policy</Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>

    </footer>
  );
}
