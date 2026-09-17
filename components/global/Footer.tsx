import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig, toWhatsAppHref } from '@/lib/site';
import type { ReactElement } from 'react';

const icons: Record<string, ReactElement> = {
  Email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>,
  Phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2L21 14v3c0 2-1.5 4-3.5 4C10 20 4 14 4 6.5 4 4.5 5 3 7 3Z"/></svg>,
  WhatsApp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1-.9"/></svg>,
  Instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>,
  TikTok: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.8 3h3.1c.2 2 1.3 3.4 3.1 4.1v3.2c-1.1 0-2.1-.3-3.1-.8v5.6a6.3 6.3 0 1 1-6.3-6.3c.4 0 .9 0 1.3.1v3.3a3.1 3.1 0 1 0 1.9 2.9V3Z"/></svg>,
  Facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.3 21v-7.2h2.5l.4-3h-2.9V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2H8v3h2.9V21h3.4Z"/></svg>,
};

const navLinks = [
  { href: '/work', key: 'work' }, { href: '/studio', key: 'studio' }, { href: '/services', key: 'services' },
  { href: '/process', key: 'process' }, { href: '/faq', key: 'faq' }, { href: '/contact', key: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('common');
  const nav = useTranslations('common.nav');
  const year = new Date().getFullYear();
  const c = siteConfig.contact;

  const contactItems = [
    { label: 'EMAIL', value: c.email, href: `mailto:${c.email}`, icon: icons.Email },
    { label: 'PHONE 01', value: c.phone, href: `tel:${c.phone}`, icon: icons.Phone },
    { label: 'PHONE 02', value: c.phoneSecondary, href: `tel:${c.phoneSecondary}`, icon: icons.Phone },
    { label: 'WHATSAPP 01', value: c.whatsApp, href: toWhatsAppHref(c.whatsApp), icon: icons.WhatsApp },
    { label: 'WHATSAPP 02', value: c.whatsAppSecondary, href: toWhatsAppHref(c.whatsAppSecondary), icon: icons.WhatsApp },
    ...c.socials.map((social) => ({ label: social.label.toUpperCase(), value: social.label === 'Instagram' ? '@by.mdorra' : '@mdorra.design', href: social.href, icon: icons[social.label] })),
  ];

  return (
    <footer className="border-border-inverse bg-dark text-inverse-text border-t">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-5">
            <p className="font-serif text-xl font-medium tracking-[0.05em] md:text-2xl">{siteConfig.name}</p>
            <p className="text-inverse-muted mt-5 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-wider">{t('footer.tagline')}</p>
          </div>
          <div className="md:col-span-3">
            <h2 className="eyebrow text-inverse-muted">{t('footer.sitemap')}</h2>
            <nav aria-label={t('navFooter')} className="mt-5"><ul className="space-y-3">{navLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-inverse-text hover:text-accent-inverse text-sm transition-colors">{nav(link.key)}</Link></li>)}</ul></nav>
          </div>
          <div className="md:col-span-4">
            <h2 className="eyebrow text-inverse-muted">CONTACT</h2>
            <div className="mt-5 grid grid-cols-4 gap-2 border-y border-inverse-text/10 py-3 sm:grid-cols-7">
              {contactItems.map((item) => <a key={`${item.label}-${item.href}`} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={`${item.label}: ${item.value}`} title={item.value} className="group relative flex h-11 w-full items-center justify-center border border-inverse-text/10 text-inverse-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-inverse hover:text-accent-inverse">
                <span className="h-4 w-4">{item.icon}</span>
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap bg-background px-2.5 py-1.5 font-mono text-[8px] tracking-wider text-inverse-text opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">{item.value}</span>
                <span className="sr-only">{item.label}</span>
              </a>)}
            </div>
            <p className="text-inverse-muted mt-3 font-mono text-[9px] tracking-[0.12em]">SELECT AN ICON TO CONNECT</p>
          </div>
        </div>
        <div className="border-border-inverse text-inverse-muted mt-16 flex flex-col gap-3 border-t pt-6 font-mono text-xs md:flex-row md:items-center md:justify-between"><p>© {year} {siteConfig.name} — {t('footer.copyright')}</p><p className="text-inverse-text font-serif text-base tracking-normal italic">{siteConfig.name}</p></div>
      </Container>
    </footer>
  );
}

export default Footer;
