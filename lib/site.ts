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
    phoneSecondary: string;
    whatsApp: string;
    whatsAppSecondary: string;
    socials: SocialLink[];
    configured: boolean;
  };
};

export const siteConfig: SiteConfig = {
  name: 'MDORRA',
  description:
    'A design studio for architecture and interiors — design developed with construction in mind.',
  url: 'https://mdorra.vercel.app',
  locale: 'en',
  themeColor: '#1F1A16',
  backgroundColor: '#1F1A16',
  contact: {
    email: 'mdorra.design@gmail.com',
    phone: '01013125953',
    phoneSecondary: '01015864082',
    whatsApp: '01013125953',
    whatsAppSecondary: '01015864082',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/by.mdorra' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@mdorra.design' },
      { label: 'Facebook', href: 'https://www.facebook.com/mdorra.design' },
      { label: 'WhatsApp', href: 'https://wa.me/01013125953' },
    ],
    configured: true,
  },
};

export function isContactConfigured(): boolean {
  return siteConfig.contact.configured;
}