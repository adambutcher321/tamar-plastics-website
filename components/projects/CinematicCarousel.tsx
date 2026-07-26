'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue, animate, type PanInfo } from 'framer-motion';
import type { Project } from '@/content/projects';

const EASE = [0.76, 0, 0.24, 1] as const;
const TRANSITION_MS = 950;
const AUTOPLAY_MS = 6000;
const RESUME_DELAY_MS = 9000;

interface Ratios {
  active: number;
  peek: number;
  leading: number;
  gap: number;
  controlSize: number;
}

function ratiosFor(width: number): Ratios {
  if (width < 640) {
    return { active: 0.87, peek: 0.13, leading: 0.02, gap: 14, controlSize: 46 };
  }
  if (width < 1024) {
    return { active: 0.8, peek: 0.16, leading: 0.05, gap: 20, controlSize: 56 };
  }
  return { active: 0.68, peek: 0.2, leading: 0.08, gap: 28, controlSize: 62 };
}

interface CinematicCarouselProps {
  projects: Project[];
  onEnlarge: (index: number) => void;
}

export function CinematicCarousel({ projects, onEnlarge }: CinematicCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // Lazy initializer runs synchronously during the first render (unlike a
  // useEffect, which fires after mount) — Framer Motion's `initial` prop is
  // only honoured on the very first mount, so detecting this a tick late
  // meant reduced-motion users still got the full entrance animation once.
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const x = useMotionValue(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const n = projects.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ratios = useMemo(() => ratiosFor(containerWidth || 1200), [containerWidth]);

  const cardWidths = useMemo(() => {
    const activePx = containerWidth * ratios.active;
    const peekPx = containerWidth * ratios.peek;
    return projects.map((_, i) => (i === activeIndex ? activePx : peekPx));
  }, [projects, activeIndex, containerWidth, ratios]);

  const gap = ratios.gap;
  const leadingPx = containerWidth * ratios.leading;

  const targetX = useMemo(() => {
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) offset += cardWidths[i] + gap;
    return leadingPx - offset;
  }, [activeIndex, cardWidths, gap, leadingPx]);

  const boundaryX = useMemo(() => targetX + cardWidths[activeIndex] + gap / 2, [targetX, cardWidths, activeIndex]);

  useEffect(() => {
    if (containerWidth === 0) return;
    const controls = animate(x, targetX, {
      duration: reduceMotion ? 0.2 : TRANSITION_MS / 1000,
      ease: reduceMotion ? 'linear' : EASE,
    });
    return () => controls.stop();
  }, [targetX, containerWidth, reduceMotion, x]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % n) + n) % n);
    },
    [n],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const pauseAutoplay = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsInteracting(false), RESUME_DELAY_MS);
  }, []);

  // Autoplay: paused while hovered/focused/dragging/tab hidden, or for a
  // cooldown period after any manual interaction.
  useEffect(() => {
    if (reduceMotion || n < 2) return;

    const tick = () => {
      if (document.hidden || isInteracting) return;
      setActiveIndex((i) => (i + 1) % n);
    };
    autoplayTimerRef.current = setInterval(tick, AUTOPLAY_MS);
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [reduceMotion, n, isInteracting]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setIsInteracting(false);
    pauseAutoplay();
    const threshold = containerWidth * 0.12;
    if (info.offset.x < -threshold || info.velocity.x < -400) {
      goNext();
    } else if (info.offset.x > threshold || info.velocity.x > 400) {
      goPrev();
    } else {
      // snap back to the current card
      animate(x, targetX, { duration: 0.4, ease: EASE });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      pauseAutoplay();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      pauseAutoplay();
      goPrev();
    }
  };

  const trackWidth = useMemo(
    () => cardWidths.reduce((sum, w) => sum + w, 0) + gap * (n - 1),
    [cardWidths, gap, n],
  );

  return (
    <div
      className="cine-carousel"
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Recent projects"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      <div className="cine-viewport">
      <motion.div
        className="cine-track"
        style={{ x, width: trackWidth || undefined, gap }}
        drag={n > 1 ? 'x' : false}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => setIsInteracting(true)}
        onDragEnd={onDragEnd}
      >
        {projects.map((project, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={project.id}
              type="button"
              className={`cine-card${isActive ? ' cine-card--active' : ''}`}
              style={{ width: cardWidths[i] || undefined }}
              animate={{ width: cardWidths[i] || 0, opacity: isActive ? 1 : 0.72 }}
              transition={{ duration: reduceMotion ? 0.2 : TRANSITION_MS / 1000, ease: reduceMotion ? 'linear' : EASE }}
              onClick={() => {
                pauseAutoplay();
                if (isActive) {
                  onEnlarge(i);
                } else {
                  goTo(i);
                }
              }}
              aria-label={isActive ? `${project.town} — view full size` : `Show ${project.town} project`}
              aria-current={isActive ? 'true' : undefined}
            >
              <motion.img
                src={project.src}
                alt={project.alt}
                loading={i === 0 || i === 1 ? 'eager' : 'lazy'}
                animate={reduceMotion ? undefined : { scale: isActive ? 1.02 : 1.06 }}
                transition={{ duration: TRANSITION_MS / 1000, ease: EASE }}
              />
              <span className="cine-card-scrim" aria-hidden="true" />

              {/* Each card's text is permanently tied to that card (never
                  swapped for different content), so this just fades with
                  the card's own active/inactive state — no mount/unmount,
                  no AnimatePresence needed. */}
              <motion.div
                className="cine-card-content"
                aria-hidden={!isActive}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.3, delay: isActive ? 0.1 : 0 }}
              >
                <motion.p
                  className="cine-eyebrow"
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.4, delay: isActive ? 0.15 : 0 }}
                >
                  {project.tag}
                </motion.p>
                <motion.h3
                  className="cine-heading"
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.5, delay: isActive ? 0.22 : 0 }}
                >
                  {project.town}
                </motion.h3>
                <motion.p
                  className="cine-description"
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.5, delay: isActive ? 0.3 : 0 }}
                >
                  {project.description}
                </motion.p>
                <motion.span
                  className="cine-cta"
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.5, delay: isActive ? 0.38 : 0 }}
                >
                  View full size <span aria-hidden="true">↗</span>
                </motion.span>
              </motion.div>

              <span className="cine-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
      </div>

      {n > 1 && (
        <motion.button
          type="button"
          className="cine-control"
          style={{ left: boundaryX, width: ratios.controlSize, height: ratios.controlSize }}
          animate={{ left: boundaryX }}
          transition={{ duration: reduceMotion ? 0.2 : TRANSITION_MS / 1000, ease: reduceMotion ? 'linear' : EASE }}
          onClick={() => {
            pauseAutoplay();
            goNext();
          }}
          aria-label="Next project"
        >
          <span aria-hidden="true">→</span>
        </motion.button>
      )}

      {n > 1 && (
        <button
          type="button"
          className="cine-control cine-control--prev"
          onClick={() => {
            pauseAutoplay();
            goPrev();
          }}
          aria-label="Previous project"
        >
          <span aria-hidden="true">←</span>
        </button>
      )}
    </div>
  );
}
