'use client';

import { useEffect, useRef } from 'react';
import { LOOP_DURATION, PULSES, mapPoint, pulseEnvelope } from '@/lib/hero-pulses';

/**
 * Drives the nav's glass fade between 0-120px of scroll, and — on the
 * homepage only (`showImage`) — renders the fixed-position hero film with
 * its synced product "pulse" overlays.
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
interface ScrollFxProps {
  showImage?: boolean;
}

type PulseRefs = {
  rect?: SVGRectElement | null;
  ring?: SVGCircleElement | null;
  path?: SVGPathElement | null;
  dot?: SVGCircleElement | null;
};

export function ScrollFx({ showImage = true }: ScrollFxProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pulseRefs = useRef<PulseRefs[]>(PULSES.map(() => ({})));
  const pulseRafRef = useRef<number | null>(null);
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
  // scrolled well past the hero (the film sits behind the whole page, but
  // there's no reason to keep decoding it once opaque sections cover it).
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

  // Pulse overlay animation loop — driven off the video's own currentTime
  // (not an independent CSS clock) so the effects can never drift out of
  // sync with the film across loops, pauses, or tab switches.
  useEffect(() => {
    if (!showImage) return;
    const video = videoRef.current;
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!video || !svg || !wrap) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const pathLengths: number[] = PULSES.map(() => 0);

    const layout = () => {
      const { width, height } = wrap.getBoundingClientRect();
      // viewBox tracks the container 1:1 in real CSS pixels, so mapPoint's
      // output (already in screen-pixel space) can be used directly as SVG
      // coordinates without a second, conflicting scale transform.
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      PULSES.forEach((pulse, i) => {
        const refs = pulseRefs.current[i];
        if (pulse.kind === 'ring') {
          const { x, y, scale } = mapPoint(pulse.center[0], pulse.center[1], width, height);
          const w = pulse.size[0] * scale;
          const h = pulse.size[1] * scale;
          refs.rect?.setAttribute('x', String(x - w / 2));
          refs.rect?.setAttribute('y', String(y - h / 2));
          refs.rect?.setAttribute('width', String(w));
          refs.rect?.setAttribute('height', String(h));
          refs.rect?.setAttribute('rx', String(Math.min(18, w * 0.08)));
          refs.ring?.setAttribute('cx', String(x));
          refs.ring?.setAttribute('cy', String(y));
        } else {
          const mapped = pulse.points.map(([px, py]) => mapPoint(px, py, width, height));
          const d = mapped.map((p, idx) => `${idx === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
          refs.path?.setAttribute('d', d);
          pathLengths[i] = refs.path?.getTotalLength() ?? 0;
        }
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    const tick = () => {
      const t = video.currentTime % LOOP_DURATION;

      PULSES.forEach((pulse, i) => {
        const refs = pulseRefs.current[i];
        const { opacity, draw } = pulseEnvelope(t, pulse.start, pulse.end);

        if (pulse.kind === 'ring') {
          const w = Number(refs.rect?.getAttribute('width') ?? 0);
          const perimeter = 2 * (w + Number(refs.rect?.getAttribute('height') ?? 0));
          refs.rect?.setAttribute('stroke-dasharray', String(perimeter));
          refs.rect?.setAttribute('stroke-dashoffset', String(perimeter * (1 - draw)));
          refs.rect?.setAttribute('opacity', String(opacity));

          const ringProgress = Math.min(1, draw / 0.6);
          const baseR = Math.max(6, w * 0.05);
          refs.ring?.setAttribute('r', String(baseR + ringProgress * baseR * 1.6));
          refs.ring?.setAttribute('opacity', String(opacity * (1 - ringProgress * 0.6)));
        } else {
          const len = pathLengths[i];
          refs.path?.setAttribute('stroke-dasharray', String(len));
          refs.path?.setAttribute('stroke-dashoffset', String(len * (1 - draw)));
          refs.path?.setAttribute('opacity', String(opacity));

          if (refs.dot && refs.path && len > 0) {
            const point = refs.path.getPointAtLength(len * draw);
            refs.dot.setAttribute('cx', String(point.x));
            refs.dot.setAttribute('cy', String(point.y));
            refs.dot.setAttribute('opacity', String(draw < 1 ? opacity : 0));
          }
        }
      });

      pulseRafRef.current = requestAnimationFrame(tick);
    };

    pulseRafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('resize', onResize);
      if (pulseRafRef.current !== null) cancelAnimationFrame(pulseRafRef.current);
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
              poster="/images/hero2/hero-cold.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source media="(max-width: 767px)" src="/videos/hero-film-mobile.webm" type="video/webm" />
              <source media="(max-width: 767px)" src="/videos/hero-film-mobile.mp4" type="video/mp4" />
              <source src="/videos/hero-film.webm" type="video/webm" />
              <source src="/videos/hero-film.mp4" type="video/mp4" />
            </video>
            <img className="home-bg home-bg-poster" src="/images/hero2/hero-cold.webp" alt="" />
            <svg ref={svgRef} className="home-bg-pulses" aria-hidden="true">
              <defs>
                <linearGradient id="pulse-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--edge)" />
                  <stop offset="100%" stopColor="var(--text)" />
                </linearGradient>
                <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.2" />
                </filter>
              </defs>
              {PULSES.map((pulse, i) => (
                <g key={pulse.id}>
                  {pulse.kind === 'ring' ? (
                    <>
                      <rect
                        ref={(el) => {
                          pulseRefs.current[i].rect = el;
                        }}
                        fill="none"
                        stroke="url(#pulse-gradient)"
                        strokeWidth={2}
                        opacity={0}
                      />
                      <circle
                        ref={(el) => {
                          pulseRefs.current[i].ring = el;
                        }}
                        fill="none"
                        stroke="url(#pulse-gradient)"
                        strokeWidth={1.4}
                        opacity={0}
                        filter="url(#pulse-glow)"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        ref={(el) => {
                          pulseRefs.current[i].path = el;
                        }}
                        fill="none"
                        stroke="url(#pulse-gradient)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        opacity={0}
                      />
                      <circle
                        ref={(el) => {
                          pulseRefs.current[i].dot = el;
                        }}
                        r={4}
                        fill="var(--text)"
                        opacity={0}
                        filter="url(#pulse-glow)"
                      />
                    </>
                  )}
                </g>
              ))}
            </svg>
          </>
        )}
      </div>
      {showImage && <div className="home-bg-wash" aria-hidden="true" />}
    </>
  );
}
