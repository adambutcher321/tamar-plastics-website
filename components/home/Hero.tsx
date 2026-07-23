import Link from 'next/link';

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
          <h1 className="hero-headline">IN STOCK. ON SITE. DONE.</h1>
          <p className="hero-para hero-para--scrim">
            uPVC windows, doors and roofline supplied over the counter in Saltash, or fitted by our
            own installers across Cornwall and Plymouth.
          </p>
        </div>

        <div className="hero-ctas">
          <Link href="/trade/" className="btn">
            Check stock →
          </Link>
          <Link href="/home-improvements/" className="btn btn--ghost">
            Book a survey
          </Link>
        </div>

        <div className="hero-stats" role="list">
          {/* TODO: confirm real years-trading figure (continuity from Carlton Plastics) */}
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-value">12+</span>
            <span className="hero-stat-label">Years trading</span>
          </div>
          {/* TODO: confirm real stocked-lines figure */}
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-value">500+</span>
            <span className="hero-stat-label">Lines in stock</span>
          </div>
          {/* TODO: confirm real average lead time */}
          <div className="hero-stat" role="listitem">
            <span className="hero-stat-value">24–48HR</span>
            <span className="hero-stat-label">Average lead time</span>
          </div>
        </div>
      </div>
    </header>
  );
}
