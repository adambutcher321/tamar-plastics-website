'use client';

import { useEffect, useState } from 'react';
import { getCounterStatus, type CounterStatusResult } from '@/lib/counter-status';

/**
 * Same getCounterStatus logic as the sitewide CounterStatus component, but
 * styled against this page's dark tokens instead of the light-background
 * Tailwind classes (--ink-600 has poor contrast on --ink, so this can't
 * just reuse the existing component's className as-is).
 */
export function FooterCounterStatus() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<CounterStatusResult>(() => getCounterStatus());

  useEffect(() => {
    setMounted(true);
    setStatus(getCounterStatus());
    const interval = setInterval(() => setStatus(getCounterStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <span aria-hidden="true">&nbsp;</span>;
  }

  return <span>{status.label}</span>;
}
