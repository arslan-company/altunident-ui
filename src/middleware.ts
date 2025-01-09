import { NextRequest } from 'next/server';

import websiteConfig from '@/config/website.config';

export async function middleware(request: NextRequest) {
  return await websiteConfig.handleMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // All locale combinations
    '/(ar|de|en|fr|ru|tr)/:path*',

    // Enable redirects that add missing locales
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
