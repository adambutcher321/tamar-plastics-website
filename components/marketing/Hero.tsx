'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { KeyholeMark } from '@/components/marketing/KeyholeMark';

interface HeroProps {
  posterSrc: string;
  videoSrc?: string;
}

export function Hero({ posterSrc, videoSrc }: HeroProps) {
  // Framer Motion drives its animations via inline styles/JS, so a CSS
  // `motion-reduce:` class can't override them — this hook is the only
  // reliable way to gate the animation on prefers-reduced-motion.
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-tamar-black">
      {/* Background layer: video if supplied, otherwise a slow Ken Burns drift on the poster still. */}
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <motion.img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.06 }}
          transition={{ duration: shouldReduceMotion ? 0 : 20, ease: 'linear' }}
        />
      )}

      {/* Orange diagonal sweep — single reveal on load, no loop. Reduced motion renders the final state immediately. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-tamar-orange"
        initial={
          shouldReduceMotion
            ? { clipPath: 'polygon(0 0, 20% 0, 0 20%)' }
            : { clipPath: 'polygon(0 0, 0 0, 0 0)' }
        }
        animate={{ clipPath: 'polygon(0 0, 20% 0, 0 20%)' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Wordmark — pinned to the upper band of the frame, sized to stay clear of the
          headline block anchored at the bottom. Never let these two collide. */}
      <div className="absolute inset-x-0 top-[6%] overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-4">
          <span
            className="block font-display font-extrabold text-white/95 leading-none tracking-[-0.03em]"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}
          >
            TAMAR
          </span>
        </div>
      </div>

      {/* Headline block — anchored to the bottom of the frame, over the darker lower
          portion of the photo, so it never competes with the wordmark above it. */}
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 flex flex-col items-start gap-5">
        <p className="font-mono text-sm text-white tracking-wide">
          SALTASH, CORNWALL · EST. AS CARLTON PLASTICS
        </p>

        <h1 className="font-display font-extrabold text-white text-2xl sm:text-3xl max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
          uPVC windows, doors and roofline. Supplied over the counter or fitted by us.
        </h1>

        <p className="font-body text-white/90 text-base max-w-xl [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          Trade counter on Gwel Avon Business Park. Free surveys across Cornwall and Plymouth.
          Same number you&apos;ve always called: 01752 841234.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 w-full max-w-xl pt-2">
          <Link
            href="/trade/"
            className="min-h-[44px] flex flex-col justify-center bg-white text-tamar-black p-5 rounded-sm hover:bg-white/90"
          >
            <span className="font-display font-bold text-lg">Buying for a job?</span>
            <span className="font-body text-sm text-ink-600">Trade &amp; Supply Only →</span>
          </Link>
          <Link
            href="/home-improvements/"
            className="min-h-[44px] flex flex-col justify-center bg-tamar-black border border-white/20 text-white p-5 rounded-sm hover:bg-tamar-black/80"
          >
            <span className="font-display font-bold text-lg">Improving your home?</span>
            <span className="font-body text-sm text-ink-200">Supply &amp; Fit →</span>
          </Link>
        </div>
      </div>

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 inset-x-0 flex justify-center"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <KeyholeMark className="w-6 h-6 text-white" strokeOnly />
        </motion.div>
      )}
    </section>
  );
}
