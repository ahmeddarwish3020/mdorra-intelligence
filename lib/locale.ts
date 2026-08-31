import { routing } from '@/i18n/routing';

export type Direction = 'ltr' | 'rtl';

const directions: Record<string, Direction> = {
  en: 'ltr',
  ar: 'rtl',
};

export function getDirection(locale: string): Direction {
  return directions[locale] ?? 'ltr';
}

export function isDefaultLocale(locale: string): boolean {
  return locale === routing.defaultLocale;
}

export function getLocalizedPath(path: string, locale: string): string {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;

  if (isDefaultLocale(locale)) {
    return normalized;
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}
