import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // The seeded placeholder assets (public/media/placeholder/*.svg) are SVG.
    // All imagery is same-origin static content, so SVG optimization is enabled
    // with a strict CSP that disallows scripts.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default createNextIntlPlugin()(nextConfig);
