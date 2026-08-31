import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { getProjectBySlug, getPublishedProjects } from '@/lib/content';
import { projectJsonLd } from '@/lib/jsonLd';
import { siteConfig } from '@/lib/site';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectSummary } from '@/components/project/ProjectSummary';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectDrawings } from '@/components/project/ProjectDrawings';
import { ProjectMaterials } from '@/components/project/ProjectMaterials';
import { ProjectProcess } from '@/components/project/ProjectProcess';
import { ProjectCredits } from '@/components/project/ProjectCredits';
import { ProjectNext } from '@/components/project/ProjectNext';
import { ProjectScaleBar } from '@/components/project/ProjectScaleBar';
import { BeforeAfter } from '@/components/media/BeforeAfter';

export async function generateStaticParams() {
  const projects = getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project || project.status !== 'published') {
    return {};
  }

  const heroMedia = project.hero?.media ?? project.cover;

  return createMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.summary ?? project.overview,
    path: `/work/${slug}`,
    locale,
    openGraph:
      heroMedia && siteConfig.url
        ? { images: [{ url: `${siteConfig.url}${heroMedia.src}`, alt: heroMedia.alt }] }
        : undefined,
  });
}

export default async function ProjectPage(props: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, slug } = await props.params;

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'project' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const project = getProjectBySlug(slug);

  if (!project || project.status !== 'published') {
    notFound();
  }

  const published = getPublishedProjects();
  const currentIndex = published.findIndex((item) => item.slug === project.slug);
  const nextProject =
    published.length > 1 ? published[(currentIndex + 1) % published.length] : undefined;

  const jsonLd = projectJsonLd(project, locale);

  return (
    <Section surface="dark">
      <ProjectScaleBar />
      <ProjectHero project={project} />

      <div className="pb-24 md:pb-32">
        {(project.summary || project.overview || project.designApproach) && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectSummary project={project} />
          </Container>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectGallery project={project} />
          </Container>
        )}

        {project.drawings && project.drawings.length > 0 && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectDrawings drawings={project.drawings} />
          </Container>
        )}

        {project.materials && project.materials.length > 0 && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectMaterials materials={project.materials} />
          </Container>
        )}

        {project.beforeAfter && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <h2 className="eyebrow text-inverse-muted">{t('sections.beforeAfter')}</h2>
            <div className="mt-8">
              <BeforeAfter pair={project.beforeAfter} />
            </div>
          </Container>
        )}

        {project.process && project.process.length > 0 && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectProcess stages={project.process} />
          </Container>
        )}

        {project.credits && project.credits.length > 0 && (
          <Container className="border-border-inverse border-t pt-12 md:pt-16">
            <ProjectCredits credits={project.credits} />
          </Container>
        )}

        {nextProject ? (
          <Container className="pt-16 md:pt-24">
            <ProjectNext project={nextProject} />
          </Container>
        ) : (
          <Container className="pt-16 md:pt-24">
            <div className="border-border-inverse border-t pt-10">
              <Link
                href="/work"
                className="group text-inverse-muted hover:text-accent-inverse inline-flex items-center gap-3 font-mono text-xs tracking-wider uppercase transition-colors duration-300"
              >
                {common('viewAllWork')}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Container>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
