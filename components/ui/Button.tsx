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

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-tamar-orange text-tamar-black hover:bg-tamar-orange/90',
  dark: 'bg-tamar-black text-white hover:bg-tamar-black/90',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center min-h-[44px] px-6 py-3 ' +
  'font-body font-semibold text-base rounded-sm transition-colors';

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
