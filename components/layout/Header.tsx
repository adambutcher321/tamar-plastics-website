'use client';

import Link from 'next/link';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';
import { CounterStatus } from '@/components/marketing/CounterStatus';
import { BUSINESS } from '@/content/business';

const AUDIENCE_MODE_KEY = 'tamar-audience-mode';

function setAudienceMode(mode: 'trade' | 'home') {
  try {
    window.localStorage.setItem(AUDIENCE_MODE_KEY, mode);
  } catch {
    // localStorage unavailable (private browsing, etc.) — non-fatal, the
    // routes work fine without this preference being remembered.
  }
}

export function Header() {
  return (
    <header className="border-b border-ink-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-tamar-black">
          <KeyholeMark className="w-8 h-8 text-tamar-orange" />
          Tamar Plastics
        </Link>

        <nav aria-label="Audience" className="flex items-center gap-2">
          <Link
            href="/trade/"
            onClick={() => setAudienceMode('trade')}
            className="min-h-[44px] flex items-center px-3 font-body font-medium text-sm text-tamar-black hover:text-tamar-orange"
          >
            Trade &amp; Supply
          </Link>
          <Link
            href="/home-improvements/"
            onClick={() => setAudienceMode('home')}
            className="min-h-[44px] flex items-center px-3 font-body font-medium text-sm text-tamar-black hover:text-tamar-orange"
          >
            Home Improvements
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <CounterStatus />
          <a
            href={`tel:${BUSINESS.phone}`}
            className="min-h-[44px] flex items-center font-mono text-sm font-medium text-tamar-black"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
