'use client';

import { useEffect, useState } from 'react';
import { getCounterStatus, type CounterStatusResult } from '@/lib/counter-status';

export function CounterStatus() {
  const [status, setStatus] = useState<CounterStatusResult>(() => getCounterStatus());

  useEffect(() => {
    setStatus(getCounterStatus());
    const interval = setInterval(() => setStatus(getCounterStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`font-mono text-sm ${status.isOpen ? 'text-in-stock' : 'text-ink-600'}`}>
      {status.label}
    </span>
  );
}
