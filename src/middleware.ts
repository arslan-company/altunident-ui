import createMiddleware from 'next-intl/middleware';

import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

const locales = routing.locales;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(${locales.join('|')})/:path*`]
};