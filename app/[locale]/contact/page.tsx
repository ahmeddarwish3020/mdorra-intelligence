import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig, isContactConfigured } from '@/lib/site';

type Channel = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
};

function buildChannels(t: (key: string) => string): Channel[] {
  const channels: Channel[] = [];

  if (siteConfig.contact.whatsApp) {
    channels.push({
      key: 'whatsApp',
      label: t('whatsApp'),
      href: `https://wa.me/${siteConfig.contact.whatsApp}`,
      external: true,
    });
  }
  if (siteConfig.contact.email) {
    channels.push({ key: 'email', label: t('email'), href: `mailto:${siteConfig.contact.email}` });
  }
  if (siteConfig.contact.phone) {
    channels.push({
      key: 'phone',
      label: t('phone'),
      href: `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`,
    });
  }
  for (const social of siteConfig.contact.socials) {
    channels.push({ key: social.label, label: social.label, href: social.href, external: true });
  }

  return channels;
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return createMetadata({
    title: t('eyebrow'),
    description: t('body'),
    path: '/contact',
    locale,
  });
}

export default async function ContactPage(props: PageProps<'/[locale]/contact'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });
  const configured = isContactConfigured();
  const channels = configured ? buildChannels((key) => t(key)) : [];

  return (
    <Section surface="dark" className="pt-28 pb-32 md:pt-44 md:pb-48">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-inverse-text mt-8 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.02em]">
              {t('title')}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-inverse-muted mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
              {t('body')}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-14">
              {configured && channels.length > 0 ? (
                <>
                  <p className="text-inverse-muted font-mono text-xs tracking-[0.15em] uppercase">
                    {t('channelsLabel')}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {channels.map((channel, index) => (
                      <a
                        key={channel.key}
                        href={channel.href}
                        target={channel.external ? '_blank' : undefined}
                        rel={channel.external ? 'noopener noreferrer' : undefined}
                        className={
                          index === 0
                            ? 'bg-inverse-text text-dark hover:bg-accent hover:text-inverse-text inline-flex items-center gap-3 px-7 py-3.5 font-mono text-xs tracking-wider uppercase transition-colors duration-300'
                            : 'border-inverse-text text-inverse-text hover:border-accent-inverse hover:text-accent-inverse inline-flex items-center gap-3 border px-7 py-3.5 font-mono text-xs tracking-wider uppercase transition-colors duration-300'
                        }
                      >
                        {channel.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="border-inverse-text/25 border p-8 md:p-12">
                  <p className="text-inverse-muted">{t('channelsEmpty')}</p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-inverse-muted mt-16 font-mono text-xs tracking-[0.15em] uppercase">
              {t('note')}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="border-border-inverse mt-16 border p-8 md:p-10">
              <p className="text-inverse-text font-mono text-xs tracking-[0.15em] uppercase">
                {t('startingTitle')}
              </p>
              <ul className="text-inverse-muted mt-6 space-y-3 text-sm leading-relaxed md:text-base">
                {t.raw('starting').map((item: string) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="bg-accent mt-[0.6em] h-px w-6 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
