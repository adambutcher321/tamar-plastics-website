import Link from 'next/link';
import { BUSINESS } from '@/content/business';
import { FooterCounterStatus } from './FooterCounterStatus';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.96 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      {/* TODO: swap in the real Tamar Plastics Facebook/Instagram URLs — these are placeholders */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Tamar Plastics on Facebook">
          <FacebookIcon />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Tamar Plastics on Instagram">
          <InstagramIcon />
        </a>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Tamar Plastics Ltd</h3>
          <p>
            Formerly Carlton Plastics — same team, same number, new premises on Gwel Avon
            Business Park.
          </p>
        </div>

        <div>
          <h3>Visit or call</h3>
          <address>
            {BUSINESS.streetAddress}
            <br />
            {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}
            <br />
            <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
            <br />
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <br />
            <FooterCounterStatus />
          </address>
        </div>

        <div>
          <h3>Find your way</h3>
          <ul className="footer-links">
            <li>
              <Link href="/trade/">Trade &amp; Supply Only</Link>
            </li>
            <li>
              <Link href="/home-improvements/">Home Improvements</Link>
            </li>
            <li>
              <Link href="/products/">Products</Link>
            </li>
            <li>
              <Link href="/repairs/">Repairs</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
