import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  surface?: 'dark' | 'light' | 'secondary' | 'surface';
  className?: string;
  children: ReactNode;
};

const surfaces = {
  dark: 'bg-dark text-inverse-text',
  light: 'bg-background text-foreground',
  secondary: 'bg-secondary text-foreground',
  surface: 'bg-surface text-foreground',
} as const;

export function Section({ id, surface = 'dark', className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface === 'dark' ? 'dark' : 'light'}
      className={`${surfaces[surface]} ${className}`}
    >
      {children}
    </section>
  );
}
