'use client';

import { openCookieSettings } from './CookieBanner';

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className ?? 'footer-legal-btn'}
    >
      Cookie settings
    </button>
  );
}
