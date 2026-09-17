import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site';
import type { ReactElement } from 'react';

const socialIcons: Record<string, ReactElement> = {
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  TikTok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 8.5V17" />
      <path d="M19.14 8.5a6.06 6.06 0 0 1-1.57 3.35" />
      <path d="M6.5 15a6.5 6.5 0 0 1-1.57-3.35" />
      <path d="M9 8.5V17" />
      <path d="M12.86 15a6.5 6.5 0 0 0 1.57-3.35" />
      <path d="M18.5 8.5a6.5 6.5 0 0 1-1.57 3.35" />
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  WhatsApp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

const phonePrimary = '01013125953';
const phoneSecondary = '01015864082';

const navLinks = [
  { href: '/work', key: 'work' },
  { href: '/studio', key: 'studio' },
  { href: '/services', key: 'services' },
  { href: '/process', key: 'process' },
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
            <p className="font-serif text-xl md:text-2xl font-medium tracking-[0.05em]">
              {siteConfig.name}
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
            <div className="mt-5 space-y-3">
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-inverse-text hover:text-accent-inverse font-mono text-xs tracking-wide transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              )}
              <div className="space-y-2">
                <a
                  href={`tel:${phonePrimary}`}
                  className="text-inverse-text hover:text-accent-inverse font-mono text-xs tracking-wide transition-colors flex items-center gap-2"
                >
                  <span className="text-accent">PRIMARY</span>
                  <span>{phonePrimary}</span>
                </a>
                <a
                  href={`tel:${phoneSecondary}`}
                  className="text-inverse-text hover:text-accent-inverse font-mono text-xs tracking-wide transition-colors flex items-center gap-2"
                >
                  <span className="text-accent">SECONDARY</span>
                  <span>{phoneSecondary}</span>
                </a>
              </div>
              <ul className="flex items-center gap-4 mt-4">
                {siteConfig.contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inverse-text hover:text-accent-inverse transition-colors duration-300"
                      aria-label={social.label}
                    >
                      {socialIcons[social.label] ?? (
                        <span className="font-mono text-xs">{social.label}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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

export default Footer;