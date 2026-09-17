import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig, toWhatsAppHref } from '@/lib/site';
import type { ReactElement } from 'react';

const socialIcons: Record<string, ReactElement> = {
  Instagram: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>,
  TikTok: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M14 4v10.2a4.1 4.1 0 1 1-3.2-4"/><path d="M14 4c.6 2.2 2 3.6 4 4"/></svg>,
  Facebook: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.6-.1-1.3-.2-2.1-.2-2.7 0-4.5 1.6-4.5 4.6V10H8v3h2.4v8"/></svg>,
};

const contactIcons = {
  email: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>,
  phone: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2L21 14v3c0 2-1.5 4-3.5 4C10 20 4 14 4 6.5 4 4.5 5 3 7 3Z"/></svg>,
  whatsapp: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1-.9"/></svg>,
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
            <div className="mt-5 divide-y divide-inverse-text/10 border-y border-inverse-text/10">
              <a href={`mailto:${c.email}`} className="group flex items-center gap-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-inverse-text/20 text-inverse-muted transition-colors group-hover:border-accent-inverse group-hover:text-accent-inverse">{contactIcons.email}</span>
                <span className="min-w-0"><span className="block text-inverse-muted font-mono text-[9px] tracking-[0.16em]">EMAIL</span><span className="mt-1 block break-all text-sm">{c.email}</span></span>
              </a>
              <div className="flex items-center gap-4 py-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-inverse-text/20 text-inverse-muted">{contactIcons.phone}</span><span className="min-w-0"><span className="block text-inverse-muted font-mono text-[9px] tracking-[0.16em]">PHONE</span><span className="mt-1 block text-sm leading-6"><a href={`tel:${c.phone}`} className="hover:text-accent-inverse">PRIMARY · {c.phone}</a><br/><a href={`tel:${c.phoneSecondary}`} className="hover:text-accent-inverse">SECONDARY · {c.phoneSecondary}</a></span></span></div>
              <div className="flex items-center gap-4 py-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-inverse-text/20 text-inverse-muted">{contactIcons.whatsapp}</span><span className="min-w-0"><span className="block text-inverse-muted font-mono text-[9px] tracking-[0.16em]">WHATSAPP</span><span className="mt-1 block text-sm leading-6"><a href={toWhatsAppHref(c.whatsApp)} target="_blank" rel="noopener noreferrer" className="hover:text-accent-inverse">PRIMARY · {c.whatsApp}</a><br/><a href={toWhatsAppHref(c.whatsAppSecondary)} target="_blank" rel="noopener noreferrer" className="hover:text-accent-inverse">SECONDARY · {c.whatsAppSecondary}</a></span></span></div>
            </div>
            <div className="mt-6 flex items-center gap-3">{c.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-10 w-10 items-center justify-center border border-inverse-text/20 text-inverse-text transition-colors hover:border-accent-inverse hover:text-accent-inverse">{socialIcons[social.label]}</a>)}</div>
          </div>
        </div>
        <div className="border-border-inverse text-inverse-muted mt-16 flex flex-col gap-3 border-t pt-6 font-mono text-xs md:flex-row md:items-center md:justify-between"><p>© {year} {siteConfig.name} — {t('footer.copyright')}</p><p className="text-inverse-text font-serif text-base tracking-normal italic">{siteConfig.name}</p></div>
      </Container>
    </footer>
  );
}

export default Footer;
