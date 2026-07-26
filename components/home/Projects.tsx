'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Reveal } from './Reveal';
import { ProjectLightbox } from './ProjectLightbox';
import { CinematicCarousel } from '../projects/CinematicCarousel';
import { PROJECTS } from '@/content/projects';

export function Projects() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <section className="section section--tight-bottom scrim" aria-labelledby="projects-heading">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <Reveal>
              <p className="eyebrow">Recent work</p>
              <h2 className="h2" id="projects-heading">
                Our projects
              </h2>
            </Reveal>
          </div>
          <Reveal delayMs={70}>
            <Link href="/projects/" className="ghost-pill">
              View full gallery →
            </Link>
          </Reveal>
        </div>

        <CinematicCarousel projects={PROJECTS} onEnlarge={setLightboxIndex} />
      </div>

      {lightboxIndex !== null && (
        <ProjectLightbox
          projects={PROJECTS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
