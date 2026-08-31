import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getLocalizedPath } from '@/lib/locale';
import { siteConfig } from '@/lib/site';
import { getPublishedProjects } from '@/lib/content';

const staticPaths = [
  '/',
  '/work',
  '/studio',
  '/services',
  '/process',
  '/before-after',
  '/faq',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) {
    return [];
  }

  const projectPaths = getPublishedProjects().map((project) => `/work/${project.slug}`);

  return [...staticPaths, ...projectPaths].map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${siteConfig.url}${getLocalizedPath(path, locale)}`,
      ]),
    );

    return {
      url: `${siteConfig.url}${getLocalizedPath(path, siteConfig.locale)}`,
      alternates: { languages },
    };
  });
}
