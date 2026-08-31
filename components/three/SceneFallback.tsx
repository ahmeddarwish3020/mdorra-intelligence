'use client';

import { siteConfig } from '@/lib/site';

export function SceneFallback() {
  return (
    <div
      className="border-border bg-secondary relative h-full w-full overflow-hidden border"
      role="img"
      aria-label="Architectural study placeholder"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
        <div className="absolute inset-0 bg-[url('/media/placeholder/placeholder-cover.svg')] bg-center bg-cover opacity-5" />
        <div className="from-background/60 via-background/20 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <div
        className="text-text-muted absolute top-4 left-4 font-mono text-[0.625rem] tracking-[0.2em] uppercase"
        aria-hidden="true"
      >
        Architectural Study
      </div>

      <div className="border-border text-text-muted absolute inset-x-0 bottom-0 flex items-center justify-between border-t px-4 py-2 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
        <span>{siteConfig.name}</span>
        <span>01</span>
      </div>
    </div>
  );
}
