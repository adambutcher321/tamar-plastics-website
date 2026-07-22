import type { Metadata } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { buildLocalBusinessSchema } from '@/lib/schema';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Tamar Plastics Ltd — uPVC Windows, Doors & Roofline in Saltash, Cornwall',
  description:
    'Trade counter and installer in Saltash, Cornwall. uPVC and composite windows, doors and roofline — supplied over the counter or supplied and fitted.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = buildLocalBusinessSchema();

  return (
    <html lang="en-GB">
      <body
        className={`${archivo.variable} ${interTight.variable} ${jetBrainsMono.variable} font-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
