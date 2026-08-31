'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
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

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const t = useTranslations('common');
  const nav = useTranslations('common.nav');
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;

    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );

        if (!focusable || focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('menuLabel')}
          className="bg-dark text-inverse-text fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-page flex h-full flex-col pt-24 pb-10">
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="text-inverse-text hover:text-accent-inverse px-3 py-3 font-mono text-xs tracking-wider uppercase"
              >
                {t('closeMenu')}
              </button>
            </div>

            <nav aria-label={t('navMenu')} className="mt-10 flex-1">
              <ul className="divide-border-inverse border-border-inverse divide-y border-y">
                {links.map((link, index) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-baseline gap-5 py-6"
                      >
                        <span className="text-accent-inverse font-mono text-xs">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-3xl font-medium tracking-tight transition-colors duration-300 ${
                            active
                              ? 'text-accent-inverse'
                              : 'text-inverse-text group-hover:text-accent-inverse'
                          }`}
                        >
                          {nav(link.key)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="text-inverse-muted font-mono text-xs tracking-wider uppercase">
              {t('footer.tagline')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
