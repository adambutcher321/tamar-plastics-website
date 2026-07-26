import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { BUSINESS } from '@/content/business';
import '@/design/home.css';
import './legal.css';

/* DEVELOPER NOTE:
   This Privacy Policy has been drafted based on a comprehensive codebase audit
   and current UK data protection legislation (UK GDPR, Data Protection Act 2018,
   and PECR 2003). Tamar Plastics Ltd must review and verify all operational details,
   including items marked [BUSINESS TO CONFIRM], with a qualified UK data protection
   professional prior to formal publication.
*/

export const metadata: Metadata = {
  title: 'Privacy Policy — Tamar Plastics Ltd',
  description:
    'Privacy Policy for Tamar Plastics Ltd (Formerly Carlton Plastics). Explains how we collect, use, store and protect your personal information under UK data protection law.',
};

const TOC_ITEMS = [
  { id: 'who-we-are', label: '1. Who we are' },
  { id: 'contact-privacy', label: '2. Contact details' },
  { id: 'information-collected', label: '3. Information collected' },
  { id: 'how-we-use-information', label: '4. How we use information' },
  { id: 'marketing', label: '5. Direct marketing' },
  { id: 'cookies-summary', label: '6. Cookies summary' },
  { id: 'sharing-information', label: '7. Information sharing' },
  { id: 'international-transfers', label: '8. International transfers' },
  { id: 'data-retention', label: '9. How long data is kept' },
  { id: 'data-security', label: '10. Security safeguards' },
  { id: 'your-rights', label: '11. Your legal rights' },
  { id: 'automated-decisions', label: '12. Automated decisions' },
  { id: 'childrens-data', label: '13. Children’s information' },
  { id: 'internal-complaints', label: '14. Raising a complaint' },
  { id: 'ico-complaints', label: '15. Complaints to the ICO' },
  { id: 'policy-changes', label: '16. Changes to this policy' },
];

export default function PrivacyPolicyPage() {
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
            <h1 className="legal-heading">Privacy Policy</h1>
            <div className="legal-meta">
              <span>Effective Date: 25 July 2026</span>
              <span>•</span>
              <span>Last Updated: 25 July 2026</span>
              <span className="legal-meta-badge">UK GDPR & DPA 2018 Compliant</span>
            </div>
          </div>
        </header>

        {/* ── Two-Column Layout (TOC + Article) ──────────────────────── */}
        <section className="legal-body">
          <div className="legal-grid">
            {/* Sticky Table of Contents Sidebar */}
            <aside className="legal-toc-aside" aria-label="Table of contents">
              <h2 className="legal-toc-title">Contents</h2>
              <nav>
                <ul className="legal-toc-list">
                  {TOC_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="legal-toc-link">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Policy Content */}
            <article className="legal-article">
              <p className="legal-lead">
                This Privacy Policy explains how <strong>Tamar Plastics Ltd</strong> collects,
                uses, discloses, and protects your personal information when you visit our website,
                contact our trade counter, or use our supply and installation services in Saltash,
                Cornwall, Devon, and the surrounding areas.
              </p>

              {/* ── Section 1: Who we are ─────────────────────────────── */}
              <section id="who-we-are" className="legal-section">
                <h2 className="legal-section-title">1. Who we are</h2>
                <p>
                  <strong>Tamar Plastics Ltd</strong> (referred to in this policy as “Tamar
                  Plastics”, “we”, “us”, or “our”) is an established local trade supplier and
                  installer of uPVC windows, doors, roofline, cladding, and home improvement solutions.
                </p>
                <p>
                  Formerly known as <em>Carlton Plastics</em>, we operate from our premises at Unit 4,
                  Gwel Avon Business Park, Gilston Road, Saltash, Cornwall, PL12 6TW.
                </p>
                <p>
                  Under United Kingdom data protection law (including the UK General Data Protection
                  Regulation and the Data Protection Act 2018), Tamar Plastics Ltd is the{' '}
                  <strong>“data controller”</strong>. This means we are legally responsible for
                  deciding how and why your personal information is collected, processed, and stored.
                </p>
              </section>

              {/* ── Section 2: How to contact us ──────────────────────── */}
              <section id="contact-privacy" className="legal-section">
                <h2 className="legal-section-title">2. How to contact us about privacy</h2>
                <p>
                  If you have any questions about this Privacy Policy, wish to exercise your data
                  protection rights, or have concerns about how we handle your personal data, please
                  contact us using the details below:
                </p>
                <div className="legal-contact-details">
                  <div className="legal-contact-item">
                    <strong>Postal Address</strong>
                    <span>Tamar Plastics Ltd</span>
                    <span>Unit 4, Gwel Avon Business Park, Gilston Road</span>
                    <span>Saltash, Cornwall, {BUSINESS.postalCode}</span>
                  </div>
                  <div className="legal-contact-item">
                    <strong>Telephone</strong>
                    <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
                  </div>
                  <div className="legal-contact-item">
                    <strong>Email Address</strong>
                    <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                  </div>
                </div>
                <p style={{ marginTop: '16px' }}>
                  <small>
                    <em>
                      Note: As a small commercial enterprise, Tamar Plastics Ltd is not required to
                      formally appoint a Data Protection Officer (DPO). All privacy enquiries are managed directly
                      by our management team.
                    </em>
                  </small>
                </p>
              </section>

              {/* ── Section 3: Information we collect ─────────────────── */}
              <section id="information-collected" className="legal-section">
                <h2 className="legal-section-title">3. Information we collect</h2>
                <p>
                  We only collect personal information that is necessary for operating our trade counter,
                  providing product quotations, fulfilling orders, carrying out surveys or installations,
                  and responding to enquiries.
                </p>
                <h3 className="legal-section-subtitle">A. Information you provide directly</h3>
                <ul>
                  <li>
                    <strong>Contact Details:</strong> Your full name, email address, telephone number,
                    delivery address, and postcode.
                  </li>
                  <li>
                    <strong>Enquiry & Order Information:</strong> Information about your project, product
                    categories of interest (e.g. windows, doors, roofline, cladding), custom dimensions,
                    cutting specifications, and correspondence messages.
                  </li>
                  <li>
                    <strong>Trade Account Information:</strong> Business name, company address, trade role,
                    and invoicing preferences if you apply for or hold a trade account.
                  </li>
                  <li>
                    <strong>Consent Records:</strong> Confirmation of your acceptance of our terms or privacy
                    notices when submitting forms.
                  </li>
                </ul>

                <h3 className="legal-section-subtitle">B. Information collected automatically</h3>
                <ul>
                  <li>
                    <strong>Technical & Network Data:</strong> Your IP address, browser type and version,
                    operating system, time zone, and server access logs collected automatically to maintain
                    website security and rate-limiting protection.
                  </li>
                  <li>
                    <strong>Cookie Preferences:</strong> Your choice to accept or reject optional website
                    technologies stored in your web browser.
                  </li>
                </ul>

                <h3 className="legal-section-subtitle">C. Information we DO NOT collect</h3>
                <p>
                  We do not collect special category data (such as health information, racial or ethnic origin,
                  or political opinions), criminal conviction records, or precise GPS location tracking. Payment
                  card details are not collected or stored directly on this website.
                </p>
              </section>

              {/* ── Section 4: How we use personal information ─────────── */}
              <section id="how-we-use-information" className="legal-section">
                <h2 className="legal-section-title">4. How we use personal information</h2>
                <p>
                  Under UK GDPR, we must have a valid legal basis for processing your personal information.
                  The table below outlines the purposes for which we use your data and the corresponding legal grounds:
                </p>

                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead>
                      <tr>
                        <th>Processing Purpose</th>
                        <th>Information Used</th>
                        <th>Lawful Basis (UK GDPR)</th>
                        <th>Explanation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Responding to customer enquiries</strong>
                        </td>
                        <td>Name, email, phone, postcode, enquiry message</td>
                        <td>Legitimate Interests / Pre-contractual Steps</td>
                        <td>
                          Necessary to respond to your request, provide product advice, or assess service area
                          coverage before entering a contract.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Preparing quotes & site surveys</strong>
                        </td>
                        <td>Name, property address, phone, technical specs</td>
                        <td>Contract Performance</td>
                        <td>
                          Necessary to calculate pricing, arrange home surveys, or prepare supply orders.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Order fulfilment & installation</strong>
                        </td>
                        <td>Name, address, contact numbers, order items</td>
                        <td>Contract Performance</td>
                        <td>
                          Necessary to deliver trade plastics or install windows, doors, and roofline products at your property.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Invoicing & tax compliance</strong>
                        </td>
                        <td>Name, company name, address, transaction history</td>
                        <td>Legal Obligation</td>
                        <td>
                          Required by UK HMRC and accounting laws to retain financial transaction records for 7 years.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Anti-spam & website security</strong>
                        </td>
                        <td>IP address, request rate timestamp</td>
                        <td>Legitimate Interests</td>
                        <td>
                          Necessary to protect our website infrastructure against automated spam and denial-of-service abuse.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Storing cookie preferences</strong>
                        </td>
                        <td>Cookie preference choice (`tamar_cookie_consent`)</td>
                        <td>Legal Obligation (PECR)</td>
                        <td>
                          Required under UK PECR rules to store and respect your consent choices regarding website technologies.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Section 5: Marketing communications ────────────────── */}
              <section id="marketing" className="legal-section">
                <h2 className="legal-section-title">5. Direct marketing communications</h2>
                <p>
                  We value your trust and do not send unsolicited spam. We will only send you trade updates,
                  special product offers, or marketing communications if:
                </p>
                <ul>
                  <li>You have explicitly opted in or requested trade price updates; or</li>
                  <li>
                    You are an existing commercial customer or trade account holder who has previously purchased
                    similar products from us, and you have not opted out (under the "soft opt-in" rule).
                  </li>
                </ul>
                <p>
                  You can opt out of direct marketing at any time by contacting us at{' '}
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or clicking the unsubscribe link in any marketing email.
                  Opting out of marketing does not affect essential service communications regarding active quotes or orders.
                </p>
              </section>

              {/* ── Section 6: Cookies summary ─────────────────────────── */}
              <section id="cookies-summary" className="legal-section">
                <h2 className="legal-section-title">6. Cookies and website technologies</h2>
                <p>
                  Our website uses strictly necessary technologies to ensure page navigation, form validation,
                  and security operate correctly. We also use Adobe Fonts (Typekit) to display our custom typeface.
                </p>
                <p>
                  For a complete, itemised list of all cookies and storage technologies, please review our dedicated{' '}
                  <Link href="/cookie-policy/">Cookie Policy</Link>.
                </p>
              </section>

              {/* ── Section 7: Sharing information ──────────────────────── */}
              <section id="sharing-information" className="legal-section">
                <h2 className="legal-section-title">7. Who we share information with</h2>
                <p>
                  <strong>We do not sell, rent, or trade your personal information to third parties.</strong>
                </p>
                <p>
                  To operate our business effectively, we may share information with trusted third-party service providers
                  who act as data processors under strict contractual obligations:
                </p>
                <ul>
                  <li>
                    <strong>Web Infrastructure Providers:</strong>{' '}
                    <span className="legal-placeholder-box">
                      [BUSINESS TO CONFIRM: website hosting provider e.g. Vercel / local UK host]
                    </span>
                  </li>
                  <li>
                    <strong>Email Delivery Services:</strong> NodeMailer SMTP gateway services for sending contact form notifications.
                  </li>
                  <li>
                    <strong>Font Delivery Networks:</strong> Adobe Typekit for delivering web font files to your browser.
                  </li>
                  <li>
                    <strong>Professional Advisers:</strong> Accountants, legal advisers, or auditors for tax and legal compliance.
                  </li>
                  <li>
                    <strong>Legal & Law Enforcement Bodies:</strong> Public or regulatory authorities if legally mandated under UK law.
                  </li>
                </ul>
              </section>

              {/* ── Section 8: International transfers ──────────────────── */}
              <section id="international-transfers" className="legal-section">
                <h2 className="legal-section-title">8. International data transfers</h2>
                <p>
                  Your personal information is primarily stored and processed within the United Kingdom.
                  Where third-party service providers (such as Adobe Typekit font delivery networks) process limited network technical data
                  (such as IP addresses) across international content delivery networks:
                </p>
                <ul>
                  <li>
                    Transfers are protected under valid UK International Data Transfer Agreements (IDTAs) or UK Addendums to EU Standard Contractual Clauses (SCCs); or
                  </li>
                  <li>
                    The destination country has been recognized as providing an adequate level of data protection under UK Government adequacy decisions.
                  </li>
                </ul>
              </section>

              {/* ── Section 9: How long data is kept ────────────────────── */}
              <section id="data-retention" className="legal-section">
                <h2 className="legal-section-title">9. How long information is kept</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes for which it was collected,
                  including satisfying any legal, accounting, or reporting obligations.
                </p>

                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead>
                      <tr>
                        <th>Record Category</th>
                        <th>Retention Period</th>
                        <th>Reason for Retention Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>General website enquiries</strong>
                        </td>
                        <td>12 months from last contact</td>
                        <td>Allows follow-up on prospective trade or retail project requests.</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quotation & estimate records</strong>
                        </td>
                        <td>24 months from quotation date</td>
                        <td>Enables price reference for recurring trade projects or survey updates.</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Orders, invoices & tax records</strong>
                        </td>
                        <td>7 years following end of financial year</td>
                        <td>Mandatory statutory retention period under UK tax and HMRC requirements.</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cookie consent records</strong>
                        </td>
                        <td>12 months from selection</td>
                        <td>Demonstrates compliance with UK PECR rules.</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Security & rate-limit IP logs</strong>
                        </td>
                        <td>30 days</td>
                        <td>Automated log rotation for server protection and abuse monitoring.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── Section 10: Security safeguards ────────────────────── */}
              <section id="data-security" className="legal-section">
                <h2 className="legal-section-title">10. How information is protected</h2>
                <p>
                  We employ appropriate technical and organizational safeguards to protect your personal information against
                  unauthorized access, accidental loss, disclosure, or alteration. These measures include:
                </p>
                <ul>
                  <li>HTTPS TLS 1.3 encryption across all website pages and form transmissions;</li>
                  <li>Input sanitization and security filtering against cross-site scripting (XSS) and injection attacks;</li>
                  <li>Strict access controls restricting customer data to authorized Tamar Plastics staff;</li>
                  <li>Server rate-limiting protection against automated brute-force or spam submissions.</li>
                </ul>
                <p>
                  While we take all reasonable precautions, no internet transmission can be guaranteed as 100% secure.
                  We encourage you to contact us immediately if you suspect any compromise of your information.
                </p>
              </section>

              {/* ── Section 11: Individual legal rights ─────────────────── */}
              <section id="your-rights" className="legal-section">
                <h2 className="legal-section-title">11. Your legal data-protection rights</h2>
                <p>
                  Under UK data protection law, you have specific rights regarding your personal information:
                </p>
                <ul>
                  <li>
                    <strong>Right of Access:</strong> You can request a copy of the personal information we hold about you (a "Subject Access Request").
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> You can ask us to correct inaccurate or incomplete information.
                  </li>
                  <li>
                    <strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request that we delete your personal information where there is no legal requirement for us to retain it.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> You can ask us to suspend processing your personal information in certain scenarios.
                  </li>
                  <li>
                    <strong>Right to Object:</strong> You can object to processing based on legitimate interests or direct marketing.
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> You can request the transfer of your data to another service provider in a structured format.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Where processing relies on consent, you can withdraw it at any time.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please email us at{' '}
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. We do not charge a fee for standard requests and will respond within <strong>one calendar month</strong>. We may request proof of identity to protect your privacy.
                </p>
              </section>

              {/* ── Section 12: Automated decision-making ─────────────── */}
              <section id="automated-decisions" className="legal-section">
                <h2 className="legal-section-title">12. Automated decision-making</h2>
                <p>
                  Tamar Plastics Ltd does not use automated decision-making or algorithmic profiling that produces legal or similarly significant effects on website visitors or customers.
                </p>
              </section>

              {/* ── Section 13: Children's information ─────────────────── */}
              <section id="childrens-data" className="legal-section">
                <h2 className="legal-section-title">13. Children’s information</h2>
                <p>
                  Our website and trade services are intended for adults, trade professionals, and property owners.
                  We do not knowingly collect or solicit personal information from children under 18 years of age.
                </p>
              </section>

              {/* ── Section 14: Raising a complaint ────────────────────── */}
              <section id="internal-complaints" className="legal-section">
                <h2 className="legal-section-title">14. Data-protection complaints to Tamar Plastics</h2>
                <p>
                  If you have a complaint or concern regarding how your personal information has been handled, please contact us first so we can investigate and resolve the issue:
                </p>
                <div className="legal-contact-card">
                  <h3>Privacy Complaint Contact</h3>
                  <p>
                    Please email our team with details of your query, including your name, contact information, and a summary of your concern.
                  </p>
                  <div className="legal-contact-details">
                    <div className="legal-contact-item">
                      <strong>Email Contact</strong>
                      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </div>
                    <div className="legal-contact-item">
                      <strong>Acknowledgement Time</strong>
                      <span>Within 30 days of receipt</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 15: Complaints to the ICO ──────────────────── */}
              <section id="ico-complaints" className="legal-section">
                <h2 className="legal-section-title">15. Complaints to the Information Commissioner’s Office</h2>
                <p>
                  You also have the right to lodge a complaint with the UK supervisory authority for data protection, the <strong>Information Commissioner’s Office (ICO)</strong>, at any time:
                </p>
                <ul>
                  <li>
                    <strong>Website:</strong>{' '}
                    <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
                      ico.org.uk/make-a-complaint
                    </a>
                  </li>
                  <li>
                    <strong>Helpline:</strong> 0303 123 1113
                  </li>
                  <li>
                    <strong>Postal Address:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF
                  </li>
                </ul>
              </section>

              {/* ── Section 16: Changes to this policy ─────────────────── */}
              <section id="policy-changes" className="legal-section">
                <h2 className="legal-section-title">16. Changes to this policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our trade operations, website technology, or legal obligations.
                  Any updates will be published on this page with an updated "Last Updated" date.
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
