'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper: translateY(28px)+opacity 0, IntersectionObserver
 * threshold 0.2, fires once. Reduced-motion is handled in CSS (.reveal
 * resets to visible/no-transition), so this only needs to toggle the class.
 */
export function Reveal({ children, delayMs = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  );
}
