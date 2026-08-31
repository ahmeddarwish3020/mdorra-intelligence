'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const links = [
  { href: '/work', key: 'work' },
  { href: '/studio', key: 'studio' },
  { href: '/services', key: 'services' },
  { href: '/process', key: 'process' },
  { href: '/before-after', key: 'beforeAfter' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
] as const;

type SiteNavProps = {
  // 'light' sits on the paper header; 'dark' on the inverted (dark-start) header.
  tone?: 'light' | 'dark';
};

export function SiteNav({ tone = 'light' }: SiteNavProps) {
  const t = useTranslations('common.nav');
  const common = useTranslations('common');
  const pathname = usePathname();

  const baseClass =
    tone === 'dark'
      ? 'text-inverse-text hover:text-accent-inverse'
      : 'text-foreground hover:text-accent-deep';
  const activeClass = tone === 'dark' ? 'text-accent-inverse' : 'text-accent-deep';

  return (
    <nav aria-label={common('navPrimary')}>
      <ul className="flex items-center gap-8">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative font-mono text-xs tracking-wider uppercase transition-colors duration-300 ${
                  active ? activeClass : baseClass
                }`}
              >
                {t(link.key)}
                <span
                  aria-hidden="true"
                  className={`bg-accent absolute -bottom-1.5 left-0 h-px transition-all duration-500 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
