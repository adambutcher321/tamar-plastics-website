export interface Project {
  id: string;
  town: string;
  tag: string;
  description: string;
  src: string;
  alt: string;
}

/**
 * Only 2 real completed-job photos exist right now (Saltash, Plymouth) — a
 * "latest projects" gallery is a claim about real finished work, so unlike
 * the hero backdrop or generic product cutouts, this list must only ever
 * contain genuine project photos, never AI-generated stand-ins. Add more
 * here as real photos come in (used by both the homepage carousel and the
 * full /projects/ gallery). `description` is a one-line factual summary of
 * what was actually fitted — not a marketing claim or stat.
 */
export const PROJECTS: Project[] = [
  {
    id: 'saltash',
    town: 'Saltash',
    tag: 'Door & windows',
    description: 'Composite front door and windows fitted on a stone cottage.',
    src: '/images/areas/saltash.webp',
    alt: 'Composite front door and windows installed on a stone cottage in Saltash',
  },
  {
    id: 'plymouth',
    town: 'Plymouth',
    tag: 'Windows',
    description: 'uPVC bay windows fitted on a suburban house.',
    src: '/images/areas/plymouth.webp',
    alt: 'uPVC bay windows installed on a suburban house in Plymouth',
  },
];
