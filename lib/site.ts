// Central, single source of truth for brand + contact identity.
 //
 // MDORRA is the official brand name. Domain and contact details remain
 // configurable until they are provided — no placeholder values are exposed
 // to production. Do not hardcode the brand name anywhere else.

export type SocialLink = { label: string; href: string };

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  locale: string;
  themeColor: string;
  backgroundColor: string;
  contact: {
    email: string;
    phone: string;
    whatsApp: string;
    socials: SocialLink[];
    // Set to true when real contact details are provided (not placeholders)
    configured: boolean;
  };
};

export const siteConfig: SiteConfig = {
  name: 'MDORRA',
  description:
    'A design studio for architecture and interiors — design developed with construction in mind.',
  // TODO: Replace with real production domain when purchased
  url: 'https://mdorra.vercel.app',
  // Default site locale (English-first; Arabic is a planned secondary).
  locale: 'en',
  // Dark luxury colors mirrored from app/globals.css @theme.
  themeColor: '#0a0a09',
  backgroundColor: '#0a0a09',
  contact: {
    // TODO: Replace with real contact details before launch
    email: 'hello@mdorra.com',
    phone: '+20 10 0000 0000',
    whatsApp: '201000000000',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/mdorra' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/mdorra' },
    ],
    // Set to true only when real contact details are provided
    configured: false,
  },
};

export function isContactConfigured(): boolean {
  return siteConfig.contact.configured;
}
