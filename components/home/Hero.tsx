import Link from 'next/link';
import { HeroStats } from './HeroStats';

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-wordmark-row">
        {/* "TAMARPLASTICS" doesn't fit on one line at 14.2vw (the reference
            wordmark, "MODO", is 4 characters) — stacked two-tone instead:
            TAMAR white, PLASTICS orange, each on its own line. */}
        <p className="hero-wordmark hero-wordmark--stacked">
          <span className="hero-wordmark-tamar">TAMAR</span>
          <span className="hero-wordmark-plastics">PLASTICS</span>
        </p>
      </div>

      <div className="hero-body">
        <div className="hero-headline-row">
          <div>
            <p className="eyebrow">Saltash, Cornwall · Formerly Carlton Plastics</p>
            <h1 className="hero-headline">IN STOCK. ON SITE. JOB DONE.</h1>
          </div>
          <p className="hero-para hero-para--scrim">
            uPVC windows, doors and roofline supplied over the counter in Saltash, or fitted by our
            own installers across Cornwall and Devon.
          </p>
        </div>

        <div className="hero-ctas">
          <Link href="/book-a-survey/" className="btn">
            BOOK A SURVEY →
          </Link>
          <Link href="/products/" className="btn btn--ghost">
            Explore products
          </Link>
        </div>

        <HeroStats />
      </div>
    </header>
  );
}

