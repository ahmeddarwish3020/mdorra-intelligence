import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';

type ServiceItem = {
  index: string;
  title: string;
  description: string;
};

export function Services() {
  const t = useTranslations('home.services');
  const rows = t.raw('rows') as ServiceItem[];
  const strip = t.raw('strip') as string[];

  return (
    <Section surface="secondary" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-4 gap-x-5 gap-y-10 md:grid-cols-12">
          <div className="col-span-4 md:col-span-5">
            <Reveal>
              <Eyebrow index={t('index')}>{t('eyebrow')}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] leading-tight font-medium tracking-[-0.02em]">
                {t('title')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-text-secondary mt-8 max-w-sm text-base leading-[1.65]">
                {t('lead')}
              </p>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-7">
            <ul className="divide-border border-border divide-y border-y">
              {rows.map((row, index) => (
                <li key={row.index} className="group">
                  <Reveal delay={index * 0.04}>
                    <div className="grid grid-cols-4 items-baseline gap-x-5 py-7 md:grid-cols-12">
                      <span className="text-accent col-span-1 font-mono text-xs">{row.index}</span>
                      <div className="col-span-3 md:col-span-5">
                        <h3 className="relative text-xl font-medium tracking-tight md:text-2xl">
                          {row.title}
                          <span
                            aria-hidden="true"
                            className="bg-accent-deep absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                          />
                        </h3>
                      </div>
                      <p className="text-text-secondary col-span-4 text-sm leading-relaxed md:col-span-5 md:col-start-6">
                        {row.description}
                      </p>
                      <span
                        aria-hidden="true"
                        className="text-accent col-span-1 hidden -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:block md:justify-self-end"
                      >
                        →
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-16 border-t pt-8 md:mt-24">
          <Reveal>
            <ul className="text-text-muted flex flex-wrap items-center gap-x-3 font-mono text-[0.6875rem] tracking-[0.2em] uppercase">
              {strip.map((label, index) => (
                <li key={label} className="flex items-center gap-x-3">
                  {index > 0 && <span aria-hidden="true">·</span>}
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
