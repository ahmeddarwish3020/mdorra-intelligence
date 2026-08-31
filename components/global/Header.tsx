'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { MenuOverlay } from '@/components/global/MenuOverlay';
import { SiteNav } from '@/components/global/SiteNav';
import { siteConfig } from '@/lib/site';

// Routes whose first section is a dark surface. Before the header turns into a
// paper bar on scroll, it must invert so the logo and links stay legible.
const darkStartPaths = ['/services', '/studio', '/contact', '/process', '/before-after', '/faq'];

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
            className={`flex items-center transition-colors duration-500 ${brandClass}`}
            aria-label={siteConfig.name}
          >
            <Image
              src="/media/brand/mdorra-logo.png"
              alt={siteConfig.name}
              width={120}
              height={40}
              className="h-auto max-h-[2.5rem] w-auto md:max-h-[3rem]"
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden font-mono text-sm font-medium tracking-[0.25em] uppercase">
              {siteConfig.name}
              <span className={inverted ? 'text-accent-inverse' : 'text-accent'}>.</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <SiteNav tone={solid || !inverted ? 'light' : 'dark'} />
          </div>

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
