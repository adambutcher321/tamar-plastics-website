import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-ink-200 rounded-sm p-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
