import { siteConfig } from '@/lib/site';
import type { Project } from '@/content/projects/schema';

export function organizationJsonLd(): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
  };

  if (siteConfig.url) {
    data.url = siteConfig.url;
  }

  const { email, phone, whatsApp } = siteConfig.contact;

  if (email || phone || whatsApp) {
    const contactPoint: Record<string, unknown> = {
      '@type': 'ContactPoint',
      contactType: 'sales',
    };
    if (email) {
      contactPoint.email = email;
    }
    // Telephone is single-valued; prefer the primary phone, fall back to the
    // WhatsApp number when only that is configured.
    const telephone = phone || whatsApp;
    if (telephone) {
      contactPoint.telephone = `+${telephone.replace(/[^\d]/g, '')}`;
    }
    data.contactPoint = contactPoint;
  }

  return data;
}

export function webSiteJsonLd(): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
  };

  if (siteConfig.url) {
    data.url = siteConfig.url;
  }

  return data;
}

export function projectJsonLd(project: Project, locale: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    inLanguage: locale,
  };

  if (project.summary) {
    data.description = project.summary;
  }

  if (siteConfig.url) {
    data.url = `${siteConfig.url}/work/${project.slug}`;

    const cover = project.hero?.media.src ?? project.cover?.src;
    if (cover) {
      data.image = `${siteConfig.url}${cover}`;
    }
  }

  return data;
}
