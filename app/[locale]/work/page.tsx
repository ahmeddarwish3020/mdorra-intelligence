import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createMetadata } from '@/lib/metadata';
import { getPublishedProjects } from '@/lib/content';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/typography/Eyebrow';
import { EmptyPlate } from '@/components/global/EmptyPlate';
import { ProjectIndex } from '@/components/project/ProjectIndex';
import Image from 'next/image';

const featuredProjectSlugs = new Set([
  'al-mansour-villa',
  'al-nour-villa',
  'horizon-office',
]);

export async function generateMetadata({ params }: PageProps<'/[locale]/work'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });

  return createMetadata({
    title: t('title'),
    description: t('lead'),
    path: '/work',
    locale,
    openGraph: {
      images: [{ url: '/media/mdorra/inner-pages/01-—-WORK-HERO.jpg', width: 1920, height: 1080 }],
    },
  });
}

export default async function WorkPage(props: PageProps<'/[locale]/work'>) {
  const { locale } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'work' });
  const projects = getPublishedProjects().filter((project) => featuredProjectSlugs.has(project.slug));

  return (
    <>
      <Section surface="light" className="pt-28 pb-10 md:pt-44 md:pb-16 relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/mdorra/inner-pages/01-—-WORK-HERO.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>

        <Container className="relative z-10">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.02em]">
            {t('title')}
          </h1>
          <p className="text-text-secondary mt-8 max-w-xl text-base leading-[1.65] md:text-lg">
            {t('lead')}
          </p>
        </Container>
      </Section>

      <Section surface="dark" className="py-24 md:py-40">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <Eyebrow index="01">SELECTED WORK</Eyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.02em]">
                Curated concepts and realized projects
              </h2>
              <p className="text-text-secondary mt-8 max-w-lg text-base leading-[1.7] md:text-lg">
                A focused selection of architectural and interior design concepts exploring materiality, light, and spatial relationships.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
              <Image
                src="/media/mdorra/inner-pages/07-—-WORK-SUPPORTING-IMAGE.jpg"
                alt="Work supporting visual"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {projects.length === 0 ? (
        <Section surface="light" className="border-border border-t pt-16 pb-32 md:pt-24">
          <Container>
            <EmptyPlate label={t('emptyLabel')} body={t('empty')} mark="—" />
          </Container>
        </Section>
      ) : (
        <ProjectIndex projects={projects} />
      )}
    </>
  );
}
