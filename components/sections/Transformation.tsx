import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/navigation';

function TeaserCard({
  index,
  eyebrow,
  title,
  lead,
  href,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  href: string;
}) {
  return (
    <div className="border-border bg-surface p-8 md:p-10">
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h3 className="mt-4 text-[clamp(1.25rem,2.5vw,1.5rem)] leading-tight font-medium tracking-[-0.02em]">
          {title}
        </h3>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-text-secondary mt-4 max-w-sm text-base leading-[1.65]">{lead}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <Link
          href={href}
          className="group mt-6 text-foreground hover:text-accent-deep inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          Explore
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

export function Transformation() {
  const process = useTranslations('home.process');

  return (
    <Section surface="light" className="py-24 md:py-40">
      <Container>
        <div className="grid grid-cols-4 gap-x-5 gap-y-10 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <TeaserCard
              index={process('index')}
              eyebrow={process('eyebrow')}
              title={process('title')}
              lead={process('lead')}
              href="/process"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}