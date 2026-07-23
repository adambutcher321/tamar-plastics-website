import { Nav } from '@/components/home/Nav';
import { Hero } from '@/components/home/Hero';
import { ProductGrid } from '@/components/home/ProductGrid';
import { Services } from '@/components/home/Services';
import { Process } from '@/components/home/Process';
import { Projects } from '@/components/home/Projects';
import { GoogleReviews } from '@/components/home/GoogleReviews';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import '@/design/home.css';

export default function HomePage() {
  return (
    <div className="home">
      <ScrollFx />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <ProductGrid />
        <Services />
        <Process />
        <Projects />
        <GoogleReviews />
      </main>
      <Footer />
    </div>
  );
}
