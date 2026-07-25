'use client';

import { useEffect, useState, useId } from 'react';
import Link from 'next/link';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: '',
};

const CONSENT_COOKIE_NAME = 'tamar_cookie_consent';
const CONSENT_MAX_AGE_DAYS = 365;

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: Omit<CookiePreferences, 'updatedAt'>) {
  if (typeof window === 'undefined') return;
  const fullPrefs: CookiePreferences = {
    ...prefs,
    necessary: true, // Always true
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(fullPrefs));
    const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(fullPrefs)
    )}; path=/; max-age=${maxAge}; SameSite=Lax; ${
      window.location.protocol === 'https:' ? 'Secure;' : ''
    }`;

    window.dispatchEvent(
      new CustomEvent('tamar:cookie-consent-updated', { detail: fullPrefs })
    );
  } catch (err) {
    console.error('Failed to save cookie preferences', err);
  }
}

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const bannerTitleId = useId();
  const modalTitleId = useId();

  useEffect(() => {
    setMounted(true);
    const existing = getStoredPreferences();
    if (!existing) {
      setShowBanner(true);
    } else {
      setAnalyticsConsent(existing.analytics);
      setMarketingConsent(existing.marketing);
    }

    const handleOpenSettings = () => {
      const current = getStoredPreferences() ?? DEFAULT_PREFERENCES;
      setAnalyticsConsent(current.analytics);
      setMarketingConsent(current.marketing);
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener('tamar:open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('tamar:open-cookie-settings', handleOpenSettings);
    };
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectOptional = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    savePreferences({
      necessary: true,
      analytics: analyticsConsent,
      marketing: marketingConsent,
    });
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* ── Main Banner ─────────────────────────────────────────────────── */}
      {showBanner && !showModal && (
        <div
          role="region"
          aria-labelledby={bannerTitleId}
          className="cookie-banner-wrap"
        >
          <div className="cookie-banner-inner">
            <div className="cookie-banner-content">
              <h2 id={bannerTitleId} className="cookie-banner-heading">
                Cookie & Privacy Choices
              </h2>
              <p className="cookie-banner-text">
                We use necessary technologies to run our website securely and reliably.
                With your permission, we may also use optional technologies to analyze site
                performance and improve user experience. Read our{' '}
                <Link href="/cookie-policy/" className="cookie-link">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy/" className="cookie-link">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn--primary"
              >
                Accept optional
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className="cookie-btn cookie-btn--secondary"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="cookie-btn cookie-btn--ghost"
              >
                Manage settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preferences Modal ───────────────────────────────────────────── */}
      {showModal && (
        <div className="cookie-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="cookie-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cookie-modal-header">
              <h2 id={modalTitleId} className="cookie-modal-heading">
                Cookie Preferences
              </h2>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close cookie settings"
              >
                &times;
              </button>
            </div>

            <div className="cookie-modal-body">
              <p className="cookie-modal-intro">
                Customize your consent preferences for optional technologies used on
                the Tamar Plastics website. Strictly necessary cookies cannot be disabled
                as they are required for essential website function and security.
              </p>

              <div className="cookie-category-list">
                {/* Category 1: Strictly Necessary */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div>
                      <h3 className="cookie-category-name">Strictly Necessary</h3>
                      <span className="cookie-badge cookie-badge--required">
                        Always active
                      </span>
                    </div>
                  </div>
                  <p className="cookie-category-desc">
                    Essential for website security, page navigation, load balancing,
                    form submission validation, and remembering your cookie consent choice.
                  </p>
                </div>

                {/* Category 2: Analytics & Performance */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div>
                      <h3 className="cookie-category-name">Analytics & Performance</h3>
                      <span className="cookie-badge">Optional</span>
                    </div>
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={analyticsConsent}
                        onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      />
                      <span className="cookie-toggle-slider" />
                    </label>
                  </div>
                  <p className="cookie-category-desc">
                    Allows us to count visits and traffic sources to measure and improve
                    the performance of our website. Currently, no third-party analytics
                    scripts are active.
                  </p>
                </div>

                {/* Category 3: Marketing & Advertising */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div>
                      <h3 className="cookie-category-name">Marketing & Advertising</h3>
                      <span className="cookie-badge">Optional</span>
                    </div>
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                      />
                      <span className="cookie-toggle-slider" />
                    </label>
                  </div>
                  <p className="cookie-category-desc">
                    Used to track visitors across websites to display relevant trade or home
                    improvement advertisements. Currently, no advertising pixels or remarketing
                    scripts are active.
                  </p>
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="cookie-btn cookie-btn--secondary"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="cookie-btn cookie-btn--ghost"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn--primary"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Helper function to trigger opening the Cookie Settings modal from any link/button */
export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tamar:open-cookie-settings'));
  }
}
