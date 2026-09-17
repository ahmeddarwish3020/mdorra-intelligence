// Central, single source of truth for brand + contact identity.

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
  url: 'https://mdorra.com',
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
    ],
    configured: true,
  },
};

export function isContactConfigured(): boolean {
  return siteConfig.contact.configured;
}

export function toWhatsAppHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const international = digits.startsWith('20') ? digits : `20${digits.replace(/^0/, '')}`;
  return `https://wa.me/${international}`;
}
