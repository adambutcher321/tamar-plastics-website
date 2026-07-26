import Link from 'next/link';
import Image from 'next/image';

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="nav-mark flex items-center" aria-label="Tamar Plastics Home">
          <Image
            src="/tamar-logo-white.svg"
            alt="Tamar Plastics Logo"
            width={280}
            height={90}
            className="h-20 sm:h-24 w-auto object-contain"
            priority
          />
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/trade/">Trade &amp; Supply</Link>
          </li>
          <li>
            <Link href="/home-improvements/">Home Improvements</Link>
          </li>
          <li>
            <Link href="/products/">Products</Link>
          </li>
          <li>
            <Link href="/contact/">Contact</Link>
          </li>
        </ul>
        <Link href="/book-a-survey/" className="btn btn--orange">
          BOOK A SURVEY
        </Link>
      </div>
    </nav>
  );
}
