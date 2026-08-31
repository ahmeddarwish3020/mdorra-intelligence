import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getLocalizedPath } from '@/lib/locale';
import { siteConfig } from '@/lib/site';

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
  noindex?: boolean;
  openGraph?: Metadata['openGraph'];
};

export function createMetadata({
  title,
  description,
  path = '/',
  locale = siteConfig.locale,
  noindex = false,
  openGraph,
}: CreateMetadataInput): Metadata {
  const hasDomain = Boolean(siteConfig.url);
  const localizedPath = getLocalizedPath(path, locale);

  // Every page title carries the brand (mirrors the layout's `%s — MDORRA`
  // template, which never applies because pages set an absolute title).
  const pageTitle = title
    ? title.includes(siteConfig.name)
      ? title
      : `${title} — ${siteConfig.name}`
    : undefined;

  const languages = hasDomain
    ? Object.fromEntries(
        routing.locales.map((l) => [l, `${siteConfig.url}${getLocalizedPath(path, l)}`]),
      )
    : undefined;

  return {
    title: pageTitle ? { absolute: pageTitle } : undefined,
    description,
    alternates: hasDomain
      ? { canonical: `${siteConfig.url}${localizedPath}`, languages }
      : undefined,
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      ...(hasDomain ? { url: `${siteConfig.url}${localizedPath}` } : {}),
      siteName: siteConfig.name,
      locale,
      type: 'website',
      ...openGraph,
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description,
    },
  };
}
