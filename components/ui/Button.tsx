import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'dark';

interface ButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
  className?: string;
}

// Primary is a solid black pill (matches the client's steer toward MODO-style
// dark chrome) for light backgrounds; "dark" is the outlined counterpart for
// use over photos/dark sections, where a solid black fill would disappear.
// Orange stays a minimal accent elsewhere on the site (logo, hero sweep,
// hover/focus states) rather than living in the button itself.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-tamar-black text-white hover:bg-ink-800',
  dark: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center min-h-[44px] px-6 py-3 ' +
  'font-body font-semibold text-base rounded-full transition-colors';

export function Button({ variant, children, href, type = 'button', onClick, className = '' }: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
