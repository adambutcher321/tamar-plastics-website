import Link from 'next/link';

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="nav-mark">
        TAMAR PLASTICS
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
      <Link href="/trade/account/" className="btn">
        Check stock
      </Link>
    </nav>
  );
}
