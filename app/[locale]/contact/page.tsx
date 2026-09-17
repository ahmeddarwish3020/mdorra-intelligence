import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig, isContactConfigured, toWhatsAppHref } from '@/lib/site';
import Image from 'next/image';

type Channel = { key: string; label: string; value: string; href: string; external?: boolean; icon: ReactNode };

const icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2L21 14v3c0 2-1.5 4-3.5 4C10 20 4 14 4 6.5 4 4.5 5 3 7 3Z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1-.9"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 4v9.2a4.2 4.2 0 1 1-3.3-4.1"/><path d="M15 4c.7 2.1 2 3.5 4 4"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.6-.1-1.3-.2-2.1-.2-2.7 0-4.5 1.6-4.5 4.6V10H8v3h2.4v8"/></svg>,
};

function buildChannels(): Channel[] {
  const c = siteConfig.contact;
  return [
    { key: 'email', label: 'EMAIL', value: c.email, href: `mailto:${c.email}`, icon: icons.email },
    { key: 'phonePrimary', label: 'PHONE · PRIMARY', value: c.phone, href: `tel:${c.phone}`, icon: icons.phone },
    { key: 'phoneSecondary', label: 'PHONE · SECONDARY', value: c.phoneSecondary, href: `tel:${c.phoneSecondary}`, icon: icons.phone },
    { key: 'whatsappPrimary', label: 'WHATSAPP · PRIMARY', value: c.whatsApp, href: toWhatsAppHref(c.whatsApp), external: true, icon: icons.whatsapp },
    { key: 'whatsappSecondary', label: 'WHATSAPP · SECONDARY', value: c.whatsAppSecondary, href: toWhatsAppHref(c.whatsAppSecondary), external: true, icon: icons.whatsapp },
    { key: 'instagram', label: 'INSTAGRAM', value: '@by.mdorra', href: 'https://www.instagram.com/by.mdorra', external: true, icon: icons.instagram },
    { key: 'tiktok', label: 'TIKTOK', value: '@mdorra.design', href: 'https://www.tiktok.com/@mdorra.design', external: true, icon: icons.tiktok },
    { key: 'facebook', label: 'FACEBOOK', value: '@mdorra.design', href: 'https://www.facebook.com/mdorra.design', external: true, icon: icons.facebook },
  ];
}

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return createMetadata({ title: t('eyebrow'), description: t('body'), path: '/contact', locale, openGraph: { images: [{ url: '/media/mdorra/inner-pages/06-—-CONTACT.jpg', width: 1920, height: 1080 }] } });
}

export default async function ContactPage(props: PageProps<'/[locale]/contact'>) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const configured = isContactConfigured();
  const channels = configured ? buildChannels() : [];
  const rawStarting = t.raw('starting');
  const starting = Array.isArray(rawStarting) ? rawStarting : [];

  return (
    <Section surface="dark" className="relative overflow-hidden pt-28 pb-24 md:pt-44 md:pb-36">
      <div className="absolute inset-0 z-0">
        <Image src="/media/mdorra/inner-pages/06-—-CONTACT.jpg" alt="" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/70 to-background" />
      </div>
      <Container className="relative z-10">
        <div className="max-w-6xl">
          <Reveal><Eyebrow>{t('eyebrow')}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h1 className="text-inverse-text mt-8 max-w-4xl text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] font-medium tracking-[-0.035em]">{t('title')}</h1></Reveal>
          <Reveal delay={0.1}><p className="text-inverse-muted mt-8 max-w-2xl text-base leading-[1.7] md:text-lg">{t('body')}</p></Reveal>
          {configured && <Reveal delay={0.16}>
            <div className="mt-16 grid grid-cols-1 gap-px bg-inverse-text/15 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((channel) => <a key={channel.key} href={channel.href} target={channel.external ? '_blank' : undefined} rel={channel.external ? 'noopener noreferrer' : undefined} className="group min-h-40 bg-background/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-background md:p-7">
                <div className="text-accent h-6 w-6">{channel.icon}</div>
                <p className="text-inverse-muted mt-8 font-mono text-[10px] tracking-[0.16em] uppercase">{channel.label}</p>
                <p className="text-inverse-text mt-2 break-words text-sm transition-colors group-hover:text-accent-inverse">{channel.value}</p>
              </a>)}
            </div>
          </Reveal>}
          <Reveal delay={0.22}>
            <div className="mt-16 grid gap-10 border-t border-inverse-text/20 pt-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-inverse-muted font-mono text-[10px] tracking-[0.16em] uppercase">{t('note')}</p>
                <p className="text-inverse-text mt-4 max-w-lg text-lg leading-relaxed md:text-xl">Speak directly with MDORRA about a new project, collaboration, or design consultation.</p>
              </div>
              <div className="border-inverse-text/20 border-l pl-6 md:pl-10">
                <p className="text-inverse-text font-mono text-[10px] tracking-[0.16em] uppercase">{t('startingTitle')}</p>
                <ul className="text-inverse-muted mt-5 space-y-3 text-sm leading-relaxed">{starting.map((item: string) => <li key={item} className="flex items-start gap-3"><span className="bg-accent mt-2 h-px w-5 shrink-0" aria-hidden="true"/><span>{item}</span></li>)}</ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
