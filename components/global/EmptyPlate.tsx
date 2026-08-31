import { siteConfig } from '@/lib/site';

type EmptyPlateProps = {
  label: string;
  body: string;
  mark: string;
  variant?: 'light' | 'dark';
};

// An intentional, document-like empty state — the same "plate" language as
// the 3D maquette fallback, so an unpopulated portfolio reads as a curated
// archive rather than an unfinished site.
export function EmptyPlate({ label, body, mark, variant = 'light' }: EmptyPlateProps) {
  const surfaces = {
    light: 'border-border bg-surface text-text-secondary',
    dark: 'border-border-inverse bg-dark-secondary text-inverse-muted',
  } as const;

  const meta = variant === 'light' ? 'text-text-muted' : 'text-inverse-muted';
  const footerBorder = variant === 'light' ? 'border-border' : 'border-border-inverse';

  return (
    <div className={`border ${surfaces[variant]}`}>
      <div className="px-8 py-16 md:px-12 md:py-20">
        <div className="flex items-center gap-4">
          <span className="bg-accent h-px w-12" aria-hidden="true" />
          <p className={`font-mono text-xs tracking-[0.2em] uppercase ${meta}`}>{label}</p>
        </div>
        <p className="mt-6 max-w-lg text-lg leading-[1.6]">{body}</p>
      </div>
      <div
        className={`flex items-center justify-between border-t px-8 py-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase md:px-12 ${footerBorder} ${meta}`}
      >
        <span>{siteConfig.name}</span>
        <span>{mark}</span>
      </div>
    </div>
  );
}
