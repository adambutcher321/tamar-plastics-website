import Link from 'next/link';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';
import { BUSINESS } from '@/content/business';

export function Footer() {
  return (
    <footer className="bg-tamar-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <KeyholeMark className="w-8 h-8 text-tamar-orange" />
            Tamar Plastics Ltd
          </div>
          <p className="text-sm text-ink-200">
            Formerly Carlton Plastics — same team, same number, new premises on Gwel Avon Business Park.
          </p>
        </div>

        <div>
          <h2 className="font-body font-semibold text-sm uppercase tracking-wide mb-3">Visit or call</h2>
          <address className="not-italic text-sm text-ink-200 space-y-1">
            <p>{BUSINESS.streetAddress}</p>
            <p>{BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}</p>
            <p>
              <a href={`tel:${BUSINESS.phone}`} className="font-mono hover:text-tamar-orange">
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-tamar-orange">
                {BUSINESS.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="font-body font-semibold text-sm uppercase tracking-wide mb-3">Find your way</h2>
          <nav className="flex flex-col gap-1 text-sm text-ink-200">
            <Link href="/trade/" className="hover:text-tamar-orange">Trade &amp; Supply Only</Link>
            <Link href="/home-improvements/" className="hover:text-tamar-orange">Home Improvements</Link>
            <Link href="/products/" className="hover:text-tamar-orange">Products</Link>
            <Link href="/repairs/" className="hover:text-tamar-orange">Repairs</Link>
            <Link href="/about/" className="hover:text-tamar-orange">About</Link>
            <Link href="/contact/" className="hover:text-tamar-orange">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
