'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** A single count-up target. `suffix` / `prefix` are static around the number. */
interface CountTarget {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
}

/** One statistic displayed in the band. */
interface StatDefinition {
  /** Used as `aria-label` — communicates the full final value to AT. */
  ariaLabel: string;
  /** Label rendered beneath the figure (source text; CSS uppercases it). */
  label: string;
  /** All count-up targets that make up the visible value. */
  targets: CountTarget[];
  /** Static fragments interspersed between targets, e.g. the en dash in "24–48HR". */
  separators?: string[];
  /** Stagger delay in ms before this stat starts animating. */
  delay: number;
}

const STATS: StatDefinition[] = [
  {
    ariaLabel: "30+ years' trading experience",
    label: "Years' trading experience",
    targets: [{ from: 0, to: 30, suffix: '+' }],
    delay: 0,
  },
  {
    ariaLabel: '500+ lines in stock',
    label: 'Lines in stock',
    targets: [{ from: 0, to: 500, suffix: '+' }],
    delay: 120,
  },
  {
    ariaLabel: '24–48 hour average lead time',
    label: 'Average lead time',
    // Two independent count-up targets joined by an en dash, ending with "HR"
    targets: [
      { from: 0, to: 24 },
      { from: 0, to: 48, suffix: 'HR' },
    ],
    separators: ['–'],
    delay: 240,
  },
];

/* ─── Easing ─────────────────────────────────────────────────────────────── */

/** Ease-out cubic — smooth deceleration with no overshoot. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─── Hook ───────────────────────────────────────────────────────────────── */

const DURATION = 1600; // ms — sits comfortably within the 1.4–1.8 s spec

/**
 * useCountUp — fires once when `run` becomes true.
 * Returns an array of current values (one per target).
 * On reduced-motion, immediately returns the final values.
 */
function useCountUp(targets: CountTarget[], delay: number, run: boolean): number[] {
  const [values, setValues] = useState<number[]>(() => targets.map((t) => t.from));
  const hasRun = useRef(false);

  useEffect(() => {
    if (!run || hasRun.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValues(targets.map((t) => t.to));
      hasRun.current = true;
      return;
    }

    let rafId: number;
    let startTime: number | null = null;

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(progress);

        setValues(targets.map((t) => Math.round(t.from + (t.to - t.from) * eased)));

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          // Guarantee exact final values
          setValues(targets.map((t) => t.to));
        }
      };

      rafId = requestAnimationFrame(animate);
    }, delay);

    hasRun.current = true;

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return values;
}

/* ─── Individual stat ────────────────────────────────────────────────────── */

interface StatItemProps {
  stat: StatDefinition;
  run: boolean;
}

function StatItem({ stat, run }: StatItemProps) {
  const values = useCountUp(stat.targets, stat.delay, run);

  /**
   * Build the visible figure string by interleaving count values, separators
   * and the per-target prefix/suffix strings.
   * e.g. targets=[{to:24},{to:48,suffix:'HR'}], separators=['–']
   *      → "24–48HR"
   */
  const figureNodes = stat.targets.map((target, i) => {
    const sep = stat.separators?.[i - 1];
    return (
      <span key={i}>
        {sep && <span aria-hidden="true">{sep}</span>}
        {target.prefix && <span aria-hidden="true">{target.prefix}</span>}
        {values[i]}
        {target.suffix && <span aria-hidden="true">{target.suffix}</span>}
      </span>
    );
  });

  return (
    /*
     * role="listitem" preserved from the original Hero markup.
     * aria-label carries the full human-readable final value so AT users
     * always hear the correct figure regardless of the animated state.
     */
    <div className="hero-stat" role="listitem" aria-label={stat.ariaLabel}>
      <span className="hero-stat-value" aria-hidden="true">
        {figureNodes}
      </span>
      <span className="hero-stat-label" aria-hidden="true">
        {stat.label}
      </span>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export function HeroStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
          // Disconnect immediately — animation runs only once per page visit
          observer.disconnect();
        }
      },
      {
        // Fire when ~30% of the element is visible
        threshold: 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-stats" role="list" ref={sectionRef}>
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} run={hasEntered} />
      ))}
    </div>
  );
}
