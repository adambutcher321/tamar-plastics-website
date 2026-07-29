'use client';

import { useCallback, useState } from 'react';
import { Nav } from '@/components/home/Nav';
import { Footer } from '@/components/home/Footer';
import { ScrollFx } from '@/components/home/ScrollFx';
import { Grain } from '@/components/home/Grain';
import { ProjectLightbox } from '@/components/home/ProjectLightbox';
import { CinematicCarousel } from '@/components/projects/CinematicCarousel';
import { PROJECTS } from '@/content/projects';
import '@/design/home.css';

export default function ProjectsGalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <div className="home">
      <ScrollFx showImage={false} />
      <Grain />
      <Nav />

      <main>
        <section className="section scrim">
          <div className="ghost">PROJECTS</div>
          <div className="section-inner" style={{ paddingTop: '40px' }}>
            <p className="eyebrow">SALTASH, CORNWALL &amp; DEVON</p>
            <h1 className="h2" style={{ maxWidth: '18ch', marginBottom: '16px' }}>
              Our Projects
            </h1>
            <p className="hero-para" style={{ maxWidth: '48ch', textAlign: 'left' }}>
              A look at recent completed jobs — real installations for real customers across
              Saltash, Cornwall, and Devon.
            </p>
          </div>
        </section>

        <section className="section section--tight-top">
          <div className="section-inner">
            <CinematicCarousel projects={PROJECTS} onEnlarge={setLightboxIndex} />
          </div>
        </section>
      </main>

      <Footer />

      {lightboxIndex !== null && (
        <ProjectLightbox
          projects={PROJECTS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
