import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type CtaLinkProps = {
  href: string;
  variant?: 'solid' | 'outline' | 'text';
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
};

const variants = {
  solid: {
    light: 'bg-foreground text-dark hover:bg-accent hover:text-inverse-text',
    dark: 'bg-inverse-text text-dark hover:bg-accent hover:text-inverse-text',
  },
  outline: {
    light:
      'border border-border-strong text-foreground hover:border-accent hover:bg-accent hover:text-inverse-text',
    dark: 'border border-border-inverse text-inverse-text hover:border-accent hover:bg-accent hover:text-inverse-text',
  },
  text: {
    light: 'text-foreground hover:text-accent-deep',
    dark: 'text-inverse-text hover:text-accent-inverse',
  },
} as const;

export function CtaLink({
  href,
  variant = 'outline',
  tone = 'light',
  className = '',
  children,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 py-3.5 font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
        variant === 'text' ? 'px-0' : 'px-7'
      } ${variants[variant][tone]} ${className}`}
    >
      <span>{children}</span>
      {variant !== 'text' && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </Link>
  );
}
