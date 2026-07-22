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

      {/* Occluded wordmark — sits behind the fork cards, above the background. */}
      <div className="absolute inset-x-0 top-0 flex justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <span
          className="font-display font-extrabold text-white/90 leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(4rem, 18vw, 16rem)' }}
        >
          TAMAR
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 flex flex-col items-start gap-6">
        <p className="font-mono text-sm text-white tracking-wide">
          SALTASH, CORNWALL · EST. AS CARLTON PLASTICS
        </p>

        <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl max-w-3xl">
          uPVC windows, doors and roofline. Supplied over the counter or fitted by us.
        </h1>

        <p className="font-body text-white/90 text-lg max-w-2xl">
          Trade counter on Gwel Avon Business Park. Free surveys across Cornwall and Plymouth.
          Same number you&apos;ve always called: 01752 841234.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 w-full max-w-2xl pt-4">
          <Link
            href="/trade/"
            className="min-h-[44px] flex flex-col justify-center bg-white text-tamar-black p-6 rounded-sm hover:bg-white/90"
          >
            <span className="font-display font-bold text-xl">Buying for a job?</span>
            <span className="font-body text-sm text-ink-600">Trade &amp; Supply Only →</span>
          </Link>
          <Link
            href="/home-improvements/"
            className="min-h-[44px] flex flex-col justify-center bg-tamar-black border border-white/20 text-white p-6 rounded-sm hover:bg-tamar-black/80"
          >
            <span className="font-display font-bold text-xl">Improving your home?</span>
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
