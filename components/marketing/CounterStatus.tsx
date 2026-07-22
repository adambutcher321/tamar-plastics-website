'use client';

import { useEffect, useState } from 'react';
import { getCounterStatus, type CounterStatusResult } from '@/lib/counter-status';

export function CounterStatus() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<CounterStatusResult>(() => getCounterStatus());

  useEffect(() => {
    setMounted(true);
    setStatus(getCounterStatus());
    const interval = setInterval(() => setStatus(getCounterStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <span className="font-mono text-sm text-ink-600" aria-hidden="true">
        &nbsp;
      </span>
    );
  }

  return (
    <span className={`font-mono text-sm ${status.isOpen ? 'text-in-stock' : 'text-ink-600'}`}>
      {status.label}
    </span>
  );
}
