import type { Metadata } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono, Inter } from 'next/font/google';
import { buildLocalBusinessSchema } from '@/lib/schema';
import './globals.css';
import '@/design/tokens.css';

// Variable names here must match the ones app/globals.css's @theme block
// references (Task 2) — --font-display etc. are the Tailwind theme keys
// themselves, so next/font's output variables use distinct names to avoid
// a self-referencing CSS custom property.
// Archivo is a variable font with a wdth (width) axis; the expanded look
// is achieved via font-stretch: 125% in .font-display (app/globals.css).
const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-archivo-expanded',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Homepage art-direction fonts (design/tokens.css: --font-display / --font-body)
// — plain Archivo 600/700 and Inter 400/500, distinct from the archivo-expanded
// variable font above so the two systems don't collide.
const archivoDisplay = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-archivo-2',
  display: 'swap',
});

const interBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter-2',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tamarplasticsltd.co.uk'),
  title: 'Trade & Homeowner Building Plastics Saltash | Tamar Plastics Ltd',
  description:
    'Premier supplier of uPVC windows, composite doors, roofline, guttering, cladding & interior plastics in Saltash. Serving trade & public across Cornwall & Devon.',
  openGraph: {
    images: '/images/og-tamar.webp',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '[SEARCH_CONSOLE_VERIFICATION]',
  },
};

import { CookieBanner } from '@/components/privacy/CookieBanner';
import '@/components/privacy/cookie-banner.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = buildLocalBusinessSchema();

  return (
    <html lang="en-GB">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/riz0ofe.css" />
        {/* Analytics Placeholders — Loaded only after consent */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (document.cookie.includes('tamar-cookie-consent=accepted')) {
                  // GA4
                  var gtagScript = document.createElement('script');
                  gtagScript.async = true;
                  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=[GA4_MEASUREMENT_ID]';
                  document.head.appendChild(gtagScript);
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '[GA4_MEASUREMENT_ID]');

                  // Clarity
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+"[CLARITY_PROJECT_ID]";
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script");
                }
              });
            `,
          }}
        />
      </head>
      <body
        className={`${archivo.variable} ${interTight.variable} ${jetBrainsMono.variable} ${archivoDisplay.variable} ${interBody.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}


