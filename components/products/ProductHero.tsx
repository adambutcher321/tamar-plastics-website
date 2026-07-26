'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ProductHeroStat {
  value: string;
  label: string;
}

interface ProductHeroProps {
  eyebrow: string;
  headline: string;
  paragraph: string;
  heroImage: string;
  heroAlt: string;
  stats: ProductHeroStat[];
}

export function ProductHero({ eyebrow, headline, paragraph, heroImage, heroAlt, stats }: ProductHeroProps) {
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );

  // Direct animate={{...}} targets with a manual per-element delay, rather
  // than Framer Motion's variants/staggerChildren propagation — verified
  // (see CinematicCarousel) that the direct form reliably reaches its
  // target; the variants form was observed getting stuck at its `initial`
  // state instead of settling at `animate` in the same way.
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: EASE },
  });

  return (
    <div className="pd-hero-grid">
      <div>
        <motion.p className="pd-eyebrow" {...fadeUp(0)}>
          {eyebrow}
        </motion.p>
        <motion.h1 className="pd-headline" {...fadeUp(0.12)}>
          {headline}
        </motion.h1>
        <motion.p className="pd-para" {...fadeUp(0.24)}>
          {paragraph}
        </motion.p>
        <motion.div className="pd-ctas" {...fadeUp(0.36)}>
          <Link href="/book-a-survey/" className="pd-btn pd-btn--primary">
            Book a Free Survey →
          </Link>
          <Link href="/trade/account/" className="pd-btn pd-btn--secondary">
            Trade &amp; Supply Only
          </Link>
        </motion.div>
        <motion.div className="pd-stats" {...fadeUp(0.48)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="pd-stat-value">{stat.value}</span>
              <span className="pd-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pd-image-cell">
        <motion.div
          className="pd-image-glow"
          aria-hidden="true"
          animate={{ opacity: reduceMotion ? 0.6 : [0.45, 0.75, 0.45], scale: reduceMotion ? 1 : [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={heroImage}
          alt={heroAlt}
          className="pd-image"
          animate={{ y: reduceMotion ? 0 : [0, -6, 0], rotate: -3 }}
          transition={{ duration: 6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
