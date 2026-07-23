import Link from 'next/link';
import { BUSINESS } from '@/content/business';
import { FooterCounterStatus } from './FooterCounterStatus';

export function Footer() {
  return (
    <footer className="site-footer">
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
