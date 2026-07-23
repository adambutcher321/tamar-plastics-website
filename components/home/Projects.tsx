import Link from 'next/link';
import { Reveal } from './Reveal';

const PROJECTS = [
  {
    town: 'Saltash',
    tag: 'Door & windows',
    src: '/images/areas/saltash.webp',
    alt: 'Composite front door and windows installed on a stone cottage in Saltash',
  },
  {
    town: 'Plymouth',
    tag: 'Windows',
    src: '/images/areas/plymouth.webp',
    alt: 'uPVC bay windows installed on a suburban house in Plymouth',
  },
];

export function Projects() {
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

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.town} delayMs={index * 70}>
              <Link href={`/areas/${project.town.toLowerCase()}/`} className="project-card">
                <img src={project.src} alt={project.alt} loading="lazy" />
                <span className="project-card-scrim" aria-hidden="true" />
                <span className="project-caption">
                  {project.town} · {project.tag}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
