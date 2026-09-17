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
  whatsapp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z"/><path d="M9 9.5c.5 2 2 3.5 4 4l1-.9"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.8 3h3.1c.2 2 1.3 3.4 3.1 4.1v3.2c-1.1 0-2.1-.3-3.1-.8v5.6a6.3 6.3 0 1 1-6.3-6.3c.4 0 .9 0 1.3.1v3.3a3.1 3.1 0 1 0 1.9 2.9V3Z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.3 21v-7.2h2.5l.4-3h-2.9V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2H8v3h2.9V21h3.4Z"/></svg>,
};

function buildChannels(): Channel[] {
  const c = siteConfig.contact;
  return [
    { key: 'email', label: 'EMAIL', value: c.email, href: `mailto:${c.email}`, icon: icons.email },
    { key: 'phonePrimary', label: 'PHONE · PRIMARY', value: c.phone, href: `tel:${c.phone}`, icon: icons.phone },
    { key: 'phoneSecondary', label: 'PHONE · SECONDARY', value: c.phoneSecondary, href: `tel:${c.phoneSecondary}`, icon: icons.phone },
    { key: 'whatsappPrimary', label: 'WHATSAPP', value: c.whatsApp, href: toWhatsAppHref(c.whatsApp), external: true, icon: icons.whatsapp },
    { key: 'whatsappSecondary', label: 'WHATSAPP', value: c.whatsAppSecondary, href: toWhatsAppHref(c.whatsAppSecondary), external: true, icon: icons.whatsapp },
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
  const email = channels.find((item) => item.key === 'email');
  const phones = channels.filter((item) => item.key.startsWith('phone'));
  const whatsapp = channels.filter((item) => item.key.startsWith('whatsapp'));
  const socials = channels.filter((item) => ['instagram', 'tiktok', 'facebook'].includes(item.key));

  const ChannelLink = ({ channel, compact = false }: { channel: Channel; compact?: boolean }) => (
    <a href={channel.href} target={channel.external ? '_blank' : undefined} rel={channel.external ? 'noopener noreferrer' : undefined} className={`group flex items-center transition-colors duration-300 ${compact ? 'gap-3 py-3' : 'gap-4'}`}>
      <span className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} text-accent shrink-0`}>{channel.icon}</span>
      <span className="min-w-0">
        <span className="text-inverse-muted block font-mono text-[9px] tracking-[0.16em] uppercase">{channel.label}</span>
        <span className="text-inverse-text mt-1 block break-words text-sm group-hover:text-accent-inverse">{channel.value}</span>
      </span>
    </a>
  );

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

          {configured && email && <Reveal delay={0.16}>
            <div className="mt-16 overflow-hidden border border-inverse-text/15 bg-background/70 backdrop-blur-sm">
              <div className="grid lg:grid-cols-[1.2fr_1fr]">
                <div className="border-b border-inverse-text/15 p-7 md:p-9 lg:border-b-0 lg:border-r">
                  <ChannelLink channel={email} />
                  <div className="mt-8 border-t border-inverse-text/10 pt-7">
                    <p className="text-inverse-muted font-mono text-[9px] tracking-[0.16em] uppercase">DIRECT PHONE</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {phones.map((channel) => <ChannelLink key={channel.key} channel={channel} compact />)}
                    </div>
                  </div>
                </div>

                <div className="p-7 md:p-9">
                  <p className="text-inverse-muted font-mono text-[9px] tracking-[0.16em] uppercase">MESSAGE / SOCIAL</p>
                  <div className="mt-3 border-b border-inverse-text/10 pb-4">
                    {whatsapp.map((channel) => <ChannelLink key={channel.key} channel={channel} compact />)}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {socials.map((channel) => <a key={channel.key} href={channel.href} target="_blank" rel="noopener noreferrer" aria-label={channel.label} className="group flex min-h-20 flex-col justify-between border border-inverse-text/10 p-3 transition-colors hover:border-inverse-text/30 hover:bg-background/40">
                      <span className="h-4 w-4 text-accent">{channel.icon}</span>
                      <span className="text-inverse-muted font-mono text-[8px] tracking-[0.12em] uppercase group-hover:text-inverse-text">{channel.label}</span>
                    </a>)}
                  </div>
                </div>
              </div>
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
