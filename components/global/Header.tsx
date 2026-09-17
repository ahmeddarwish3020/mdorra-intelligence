'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { MenuOverlay } from '@/components/global/MenuOverlay';
import { SiteNav } from '@/components/global/SiteNav';
import { siteConfig } from '@/lib/site';

const darkStartPaths = ['/services', '/studio', '/contact', '/process', '/faq'];

function isDarkStart(pathname: string): boolean {
  return darkStartPaths.includes(pathname) || pathname.startsWith('/work/');
}

export function Header() {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || menuOpen;
  const inverted = !solid && isDarkStart(pathname);

  const barClass = solid
    ? 'border-border bg-background/90 backdrop-blur-md'
    : inverted
      ? 'border-transparent bg-dark'
      : 'border-transparent bg-transparent';

  const brandClass = solid ? 'text-foreground' : inverted ? 'text-inverse-text' : 'text-foreground';
  const lineClass = solid || !inverted ? 'bg-foreground' : 'bg-inverse-text';

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`border-b transition-all duration-500 ${barClass}`}>
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className={`flex flex-col items-start transition-colors duration-500 ${brandClass}`}
            aria-label={siteConfig.name}
          >
            <span className="font-serif text-xl md:text-2xl font-medium tracking-[0.05em]">
              {siteConfig.name}
            </span>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-text-secondary mt-0.5 md:mt-1">
              ARCHITECTURE &bull; INTERIORS &bull; EXTERIORS
            </span>
          </Link>

          <div className="hidden md:block ml-auto">
            <SiteNav tone={solid || !inverted ? 'light' : 'dark'} />
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-wider uppercase bg-accent text-inverse-text hover:bg-accent-deep transition-colors duration-300"
          >
            START A PROJECT
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={t('openMenu')}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 transition-colors duration-500 ${lineClass}`}
              aria-hidden="true"
            />
            <span
              className={`h-px w-6 transition-colors duration-500 ${lineClass}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

export default Header;