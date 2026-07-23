'use client';

import { useEffect, useRef } from 'react';

/**
 * Drives the two scroll-coupled effects on the homepage from a single rAF
 * loop: the fixed background's 0.12x parallax, and the nav's glass fade
 * between 0-120px of scroll. Combined into one component so there's one
 * scroll listener, not two.
 */
export function ScrollFx() {
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    navRef.current = document.querySelector('.nav');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const scrollY = window.scrollY;

      if (!reduceMotion && bgWrapRef.current) {
        bgWrapRef.current.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }

      if (navRef.current) {
        const t = Math.min(scrollY / 120, 1);
        navRef.current.style.background = `rgba(11, 15, 14, ${0.55 * t})`;
        navRef.current.style.backdropFilter = t > 0 ? `blur(${18 * t}px) saturate(130%)` : 'none';
        navRef.current.style.borderBottomColor = `rgba(242, 245, 244, ${0.12 * t})`;
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="home-bg-wrap" ref={bgWrapRef} aria-hidden="true">
        <img className="home-bg" src="/images/hero2/hero-cold.webp" alt="" />
      </div>
      <div className="home-bg-wash" aria-hidden="true" />
    </>
  );
}
