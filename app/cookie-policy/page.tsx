import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { CookieSettingsButton } from '@/components/privacy/CookieSettingsButton';
import '@/design/home.css';
import '../privacy-policy/legal.css';

/* DEVELOPER NOTE:
   This Cookie Policy is based strictly on the technical audit of the Tamar Plastics Ltd
   codebase. All storage technologies, first-party cookie keys, and Adobe Typekit font
   requests reflect confirmed technical operations.
*/

export const metadata: Metadata = {
  title: 'Cookie Policy — Tamar Plastics Ltd',
  description:
    'Cookie Policy for Tamar Plastics Ltd. Explains what cookies and storage technologies are used on our website and how you can manage your preferences.',
};

export default function CookiePolicyPage() {
  return (
    <div className="home">
      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main id="main-content">
        {/* ── Page Header ────────────────────────────────────────────── */}
        <header className="legal-hero">
          <div className="legal-hero-inner">
            <p className="eyebrow">Legal & Data Governance</p>
            <h1 className="legal-heading">Cookie Policy</h1>
            <div className="legal-meta">
              <span>Effective Date: 25 July 2026</span>
              <span>•</span>
              <span>Last Updated: 25 July 2026</span>
              <span className="legal-meta-badge">UK PECR & GDPR Compliant</span>
            </div>
          </div>
        </header>

        {/* ── Page Content ────────────────────────────────────────────── */}
        <section className="legal-body">
          <div className="legal-grid">
            {/* Sidebar with Quick Actions */}
            <aside className="legal-toc-aside" aria-label="Cookie controls">
              <h2 className="legal-toc-title">Quick Actions</h2>
              <div style={{ marginBottom: '16px' }}>
                <CookieSettingsButton className="cookie-btn cookie-btn--primary" />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Click above at any time to open your consent preferences modal.
              </p>
            </aside>

            {/* Main Article Content */}
            <article className="legal-article">
              <p className="legal-lead">
                This Cookie Policy explains how <strong>Tamar Plastics Ltd</strong> uses cookies,
                local storage, and similar web technologies when you visit our website.
                It describes what these technologies are, why we use them, and your rights to control their use.
              </p>

              {/* ── Section 1: What cookies are ────────────────────────── */}
              <section id="what-are-cookies" className="legal-section">
                <h2 className="legal-section-title">1. What cookies and storage technologies are</h2>
                <p>
                  Cookies are small text files placed on your computer, smartphone, or tablet when you visit a website.
                  They are widely used to make websites work efficiently, enhance security, and provide information to website owners.
                </p>
                <p>
                  In addition to traditional browser cookies, websites may use other storage technologies such as:
                </p>
                <ul>
                  <li>
                    <strong>Web Storage (LocalStorage & SessionStorage):</strong> Data stored directly inside your browser that persists across page refreshes.
                  </li>
                  <li>
                    <strong>Network Stylesheets & Scripts:</strong> External resources loaded into your browser to render custom fonts or site styling.
                  </li>
                </ul>
              </section>

              {/* ── Section 2: How Tamar Plastics uses them ───────────── */}
              <section id="how-we-use-cookies" className="legal-section">
                <h2 className="legal-section-title">2. How Tamar Plastics uses these technologies</h2>
                <p>
                  We keep technology use on our website simple and essential. We use storage technologies to:
                </p>
                <ul>
                  <li>Ensure the website loads quickly and functions securely;</li>
                  <li>Prevent automated spam and abuse on our enquiry forms;</li>
                  <li>Remember your cookie consent choices so you do not see the consent banner repeatedly;</li>
                  <li>Deliver our custom Proxima Nova brand typography via Adobe Typekit.</li>
                </ul>
              </section>

              {/* ── Section 3: Complete Audit Table ────────────────────── */}
              <section id="cookie-table" className="legal-section">
                <h2 className="legal-section-title">3. Complete technology & cookie inventory</h2>
                <p>
                  The table below provides a complete itemised inventory of all storage technologies and external network scripts identified in our website audit:
                </p>

                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead>
                      <tr>
                        <th>Name / Identifier</th>
                        <th>Provider</th>
                        <th>Category</th>
                        <th>Party</th>
                        <th>Purpose & Information Handled</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <code className="legal-table-code">tamar_cookie_consent</code>
                        </td>
                        <td>Tamar Plastics Ltd</td>
                        <td>Strictly Necessary</td>
                        <td>First-party</td>
                        <td>
                          Stores your cookie consent preferences (accepted/rejected categories) so we respect your choice across visits.
                        </td>
                        <td>365 days</td>
                      </tr>
                      <tr>
                        <td>
                          <code className="legal-table-code">use.typekit.net</code>
                        </td>
                        <td>Adobe Systems Inc.</td>
                        <td>Strictly Necessary</td>
                        <td>Third-party</td>
                        <td>
                          Fetches web font stylesheet for rendering Proxima Nova display typography. Processes IP address for font delivery and aggregated performance metrics.
                        </td>
                        <td>Session (HTTPS request)</td>
                      </tr>
                      <tr>
                        <td>
                          <code className="legal-table-code">IP Rate-Limit Cache</code>
                        </td>
                        <td>Tamar Plastics Ltd (Server)</td>
                        <td>Strictly Necessary (Security)</td>
                        <td>First-party</td>
                        <td>
                          Server-side in-memory counter to limit contact form submissions to 5 per minute per IP address, preventing automated spam attacks.
                        </td>
                        <td>60 seconds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Section 4: Necessary technologies ───────────────────── */}
              <section id="necessary-tech" className="legal-section">
                <h2 className="legal-section-title">4. Necessary technologies</h2>
                <p>
                  Strictly necessary technologies are essential for the operation of our website. They enable core functionality such as page navigation, server security, and anti-spam protection.
                </p>
                <p>
                  Under the Privacy and Electronic Communications Regulations (PECR), strictly necessary cookies do not require prior consent because the website cannot function properly without them.
                </p>
              </section>

              {/* ── Section 5: Analytics and measurement ───────────────── */}
              <section id="analytics" className="legal-section">
                <h2 className="legal-section-title">5. Analytics and measurement</h2>
                <p>
                  <strong>No third-party analytics or performance tracking scripts (such as Google Analytics) are currently active on this website.</strong>
                </p>
                <p>
                  Our consent management system includes a toggle for optional analytics preferences should performance measurement tools be introduced in the future. Optional analytics will never load without your explicit consent.
                </p>
              </section>

              {/* ── Section 6: Third-party content ────────────────────── */}
              <section id="third-party" className="legal-section">
                <h2 className="legal-section-title">6. Third-party links and external content</h2>
                <p>
                  Our website contains external text links to Google Maps (for directions to our Saltash premises) and our official social media pages on Facebook and Instagram.
                </p>
                <p>
                  These are standard outgoing hypertext links. We do not embed active third-party social media tracking pixels, map iframes, or advertising widgets on our pages that write third-party tracking cookies to your device.
                </p>
              </section>

              {/* ── Section 7: Managing choices ────────────────────────── */}
              <section id="cookie-choices" className="legal-section">
                <h2 className="legal-section-title">7. How to manage your cookie choices</h2>
                <p>
                  You can update your cookie preferences at any time while browsing our website.
                </p>
                <div className="legal-contact-card" style={{ marginTop: '16px', marginBottom: '24px' }}>
                  <h3>Cookie Preference Center</h3>
                  <p>
                    Reopen our consent preferences panel to view or change your choices for optional categories.
                  </p>
                  <CookieSettingsButton className="cookie-btn cookie-btn--primary" />
                </div>
                <h3 className="legal-section-subtitle">Managing cookies in your browser</h3>
                <p>
                  You can also manage or block cookies through your web browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or notify you when a cookie is set. Visit your browser's help menu for specific instructions:
                </p>
                <ul>
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                      Google Chrome Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">
                      Mozilla Firefox Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                      Apple Safari Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40cf-4bc0-a41e-5793c760877d" target="_blank" rel="noopener noreferrer">
                      Microsoft Edge Cookie Settings
                    </a>
                  </li>
                </ul>
              </section>

              {/* ── Section 8: Consent retention ───────────────────────── */}
              <section id="consent-retention" className="legal-section">
                <h2 className="legal-section-title">8. Consent record retention</h2>
                <p>
                  When you make a choice on our cookie consent banner, your preference is saved in your browser's local storage and a first-party cookie named <code className="legal-table-code">tamar_cookie_consent</code> for <strong>365 days</strong>.
                </p>
                <p>
                  After 365 days, or if you clear your browser cookies, the consent banner will reappear to confirm your choices.
                </p>
              </section>

              {/* ── Section 9: Updates to policy ───────────────────────── */}
              <section id="policy-updates" className="legal-section">
                <h2 className="legal-section-title">9. Updates to this Cookie Policy</h2>
                <p>
                  We may update this Cookie Policy periodically to reflect changes in our website technology or legal requirements.
                  The effective date at the top of this page indicates when the latest revision took effect.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
