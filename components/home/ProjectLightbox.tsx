'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/content/projects';

export function ProjectLightbox({
  projects,
  index,
  onClose,
  onNavigate,
}: {
  projects: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const project = projects[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % projects.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + projects.length) % projects.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, projects.length, onClose, onNavigate]);

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.town} — ${project.tag}`}
      ref={dialogRef}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="project-lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {projects.length > 1 && (
        <button
          type="button"
          className="project-lightbox-nav project-lightbox-nav--prev"
          onClick={() => onNavigate((index - 1 + projects.length) % projects.length)}
          aria-label="Previous photo"
        >
          ←
        </button>
      )}

      <figure className="project-lightbox-figure">
        <img src={project.src} alt={project.alt} />
        <figcaption>
          {project.town} · {project.tag}
        </figcaption>
      </figure>

      {projects.length > 1 && (
        <button
          type="button"
          className="project-lightbox-nav project-lightbox-nav--next"
          onClick={() => onNavigate((index + 1) % projects.length)}
          aria-label="Next photo"
        >
          →
        </button>
      )}
    </div>
  );
}
