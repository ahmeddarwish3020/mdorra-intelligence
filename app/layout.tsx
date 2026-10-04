import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader, JetBrains_Mono, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'optional',
  preload: false,
  fallback: ['Georgia', 'serif'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'optional',
  preload: false,
  fallback: ['monospace'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'optional',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'MDORRA // INTELLIGENCE',
  description: 'Marketing Analytics & Intelligence Platform — Data → Insight → Action',
  keywords: ['marketing analytics', 'intelligence', 'data analysis', 'marketing intelligence', 'attribution', 'forecasting'],
  authors: [{ name: 'MDORRA' }],
  creator: 'MDORRA',
  publisher: 'MDORRA',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'MDORRA // INTELLIGENCE',
    description: 'Marketing Analytics & Intelligence Platform',
    type: 'website',
    siteName: 'MDORRA Intelligence',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${notoSansArabic.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-text antialiased">
        {children}
      </body>
    </html>
  );
}