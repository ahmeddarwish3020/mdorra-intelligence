import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig, isContactConfigured } from '@/lib/site';

const navLinks = [
  { href: '/work', key: 'work' },
  { href: '/studio', key: 'studio' },
  { href: '/services', key: 'services' },
  { href: '/process', key: 'process' },
  { href: '/before-after', key: 'beforeAfter' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('common');
  const nav = useTranslations('common.nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border-inverse bg-dark text-inverse-text border-t">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <p className="font-mono text-sm font-medium tracking-[0.25em] uppercase">
              {siteConfig.name}
              <span className="text-accent-inverse">.</span>
            </p>
            <p className="text-inverse-muted mt-5 max-w-xs font-mono text-xs tracking-wider uppercase">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h2 className="eyebrow text-inverse-muted">{t('footer.sitemap')}</h2>
            <nav aria-label={t('navFooter')} className="mt-5">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-inverse-text hover:text-accent-inverse text-sm transition-colors"
                    >
                      {nav(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-span-2 md:col-span-4">
            <h2 className="eyebrow text-inverse-muted">{t('footer.enquiries')}</h2>
            {isContactConfigured() ? (
              <>
                {siteConfig.contact.email && (
                  <p className="text-inverse-muted mt-5 font-mono text-xs tracking-wide">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-inverse-text hover:text-accent-inverse transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                )}
                {siteConfig.contact.socials.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {siteConfig.contact.socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-inverse-text hover:text-accent-inverse font-mono text-xs tracking-wide transition-colors"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-inverse-muted mt-5 font-mono text-xs tracking-wide">
                {t('footer.enquiriesNote')}
              </p>
            )}
          </div>
        </div>

        <div className="border-border-inverse text-inverse-muted mt-16 flex flex-col gap-3 border-t pt-6 font-mono text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name} — {t('footer.copyright')}
          </p>
          <p className="text-inverse-text font-serif text-base tracking-normal italic">
            {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
