import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl locale routing. The site is fully static — no auth or backend
// gates — so this middleware only handles locale negotiation.
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
