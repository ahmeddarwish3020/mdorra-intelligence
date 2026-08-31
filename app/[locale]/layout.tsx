import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MotionConfig } from 'motion/react';
import { routing } from '@/i18n/routing';
import { fontArabic, fontMono, fontSans, fontSerif } from '@/lib/fonts';
import { getDirection } from '@/lib/locale';
import { siteConfig } from '@/lib/site';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/jsonLd';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ScrollProvider } from '@/components/global/ScrollProvider';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    applicationName: siteConfig.name,
    description: siteConfig.description,
    openGraph: {
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      type: 'website',
      ...(siteConfig.url ? { url: siteConfig.url } : {}),
      ...(siteConfig.url
        ? { images: [{ url: `${siteConfig.url}/og/og-default.png`, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: siteConfig.url ? 'summary_large_image' : 'summary',
      title: siteConfig.name,
      description: siteConfig.description,
      ...(siteConfig.url ? { images: [`${siteConfig.url}/og/og-default.png`] } : {}),
    },
  };
}

export default async function LocaleLayout(props: LayoutProps<'/[locale]'>) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations({ locale, namespace: 'common' }),
    getMessages(),
  ]);

  const isArabic = String(locale) === 'ar';

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}${
        isArabic ? ` ${fontArabic.variable}` : ''
      }`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <MotionConfig reducedMotion="user">
            <ScrollProvider>
              <a href="#main" className="skip-link">
                {t('skipToContent')}
              </a>
              <Header />
              <main id="main">{props.children}</main>
              <Footer />
            </ScrollProvider>
          </MotionConfig>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
        />
        <noscript>
          {/* Motion reveals SSR their hidden initial state (opacity/transform/
              clip-path) as inline styles. Without JavaScript nothing would ever
              trigger the reveal, so force the content visible when JS is off. */}
          <style>{`[style*="opacity: 0"], [style*="opacity:0"] { opacity: 1 !important; } [style*="clip-path"] { clip-path: none !important; } [style*="transform"] { transform: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
