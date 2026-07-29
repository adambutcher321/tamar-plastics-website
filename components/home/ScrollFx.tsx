'use client';

import { useEffect, useRef } from 'react';

/**
 * Drives the nav's glass fade between 0-120px of scroll, and — on the
 * homepage only (`showImage`) — renders the fixed-position hero background video.
 */
interface ScrollFxProps {
  showImage?: boolean;
}

export function ScrollFx({ showImage = true }: ScrollFxProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroVisibleRef = useRef(true);

  useEffect(() => {
    navRef.current = document.querySelector('.nav');

    const update = () => {
      const scrollY = window.scrollY;

      if (navRef.current) {
        const t = Math.min(scrollY / 120, 1);
        navRef.current.style.background = `rgba(11, 15, 14, ${0.55 * t})`;
        navRef.current.style.backdropFilter = t > 0 ? `blur(${18 * t}px) saturate(130%)` : 'none';
        navRef.current.style.borderBottomColor = `rgba(156, 158, 168, ${0.12 * t})`;
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

  // Video lifecycle: pause when the tab is hidden or once the user has
  // scrolled well past the hero.
  useEffect(() => {
    if (!showImage) return;
    const video = videoRef.current;
    const heroEl = document.querySelector('.hero');
    if (!video) return;

    const syncPlayback = () => {
      if (document.hidden || !heroVisibleRef.current) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const onVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', onVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if (heroEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          heroVisibleRef.current = entry.isIntersecting;
          syncPlayback();
        },
        { rootMargin: '50% 0px' },
      );
      observer.observe(heroEl);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer?.disconnect();
    };
  }, [showImage]);

  return (
    <>
      <div
        className="home-bg-wrap"
        ref={wrapRef}
        aria-hidden="true"
        style={!showImage ? { background: 'linear-gradient(180deg, #141A19 0%, #0B0F0E 100%)' } : undefined}
      >
        {showImage && (
          <>
            <video
              ref={videoRef}
              className="home-bg home-bg-video"
              poster="/images/hero2/hero-cold.webp?v=4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source media="(max-width: 767px)" src="/videos/hero-film-mobile.webm?v=4" type="video/webm" />
              <source media="(max-width: 767px)" src="/videos/hero-film-mobile.mp4?v=4" type="video/mp4" />
              <source src="/videos/hero-film.webm?v=4" type="video/webm" />
              <source src="/videos/hero-film.mp4?v=4" type="video/mp4" />
            </video>
            <img className="home-bg home-bg-poster" src="/images/hero2/hero-cold.webp?v=4" alt="" />
          </>
        )}
      </div>
      {showImage && <div className="home-bg-wash" aria-hidden="true" />}
    </>
  );
}
