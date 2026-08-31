import { Inter, JetBrains_Mono, Newsreader, Noto_Sans_Arabic } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const fontSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const fontArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
  // Arabic is not live yet — the font subset must not be preloaded
  // on English-only pages. It is applied to the document only when an
  // Arabic locale is active.
  preload: false,
});
