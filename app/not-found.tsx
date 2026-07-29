import Link from 'next/link';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { Search } from 'lucide-react';
import '@/design/home.css';

export default function NotFound() {
  return (
    <div className="home">
      <ScrollFx />
      <Grain />
      <Nav />
      <main>
        <section className="section section-dark pt-32 pb-24 text-center min-h-[70vh] flex flex-col justify-center items-center">
          <div className="container max-w-2xl">
            <Search className="w-16 h-16 text-[#F58A2E] mx-auto mb-6 opacity-80" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Page Not Found
            </h1>
            <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto">
              We couldn't find the page you're looking for. It may have been moved or removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products/"
                className="btn btn-primary"
              >
                View Products Catalogue
              </Link>
              <Link
                href="/contact/"
                className="btn btn-secondary"
              >
                Contact Trade Counter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
