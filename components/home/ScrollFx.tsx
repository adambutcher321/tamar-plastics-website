'use client';

import { useEffect, useRef } from 'react';

/**
 * Drives the nav's glass fade between 0-120px of scroll.
 *
 * This previously also drove a 0.12x parallax translateY on the fixed
 * background image. Removed entirely: `position:fixed` elements don't move
 * with scroll on their own, so ANY non-zero transform here is scrolling the
 * image within its own fixed box — capping the offset (the first fix
 * tried) still left a real, user-visible gap at the top of the viewport on
 * overscroll/rubber-band bounce (scrollY can briefly go negative on
 * trackpad bounce, defeating a Math.min-only cap) and on long pages. The
 * image is the entire backdrop for the page; it must never move relative
 * to the viewport. If a parallax effect is wanted again later, it needs a
 * hard-clamped, both-directions-bounded offset, tested against overscroll
 * — not just a simple multiply.
 */
export function ScrollFx() {
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    navRef.current = document.querySelector('.nav');

    const update = () => {
      const scrollY = window.scrollY;

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
      <div className="home-bg-wrap" aria-hidden="true">
        <img className="home-bg" src="/images/hero2/hero-cold.webp" alt="" />
      </div>
      <div className="home-bg-wash" aria-hidden="true" />
    </>
  );
}
