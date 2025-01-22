/*
  --- WEBSITE CONFIG ---

  This file is used to configure the website.
  You can manage the general website configuration here.
*/

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import pathMappings, { getLocalizedPath, LocaleKey } from './path-mappings';

// Convert pathMappings to next-intl pathnames format
const createPathnames = () => {
  const pathnames: Record<string, string | Record<string, string>> = {
    '/': '/',
  };

  Object.entries(pathMappings).forEach(([key, value]) => {
    const basePath = `/${key}`;
    pathnames[basePath] = Object.entries(value).reduce(
      (acc, [locale, path]) => ({
        ...acc,
        [locale]: path,
      }),
      {},
    );
  });

  return pathnames;
};

const websiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  locales: ['de', 'en', 'fr', 'tr'],
  defaultLocale: 'tr',
  /**
   * This function is used to handle the next.js middleware.
   */
  handleMiddleware: async (request: NextRequest) => {
    const config = websiteConfig;

    // segment1: segment1 represents the locale.
    // segments: remaining paths
    const [, segment1, ...segments] = request.nextUrl.pathname.split('/');

    // --- LOCALE LOGICS --- //
    // check if locale is valid
    const isValidLocale = config.locales.includes(segment1 as LocaleKey);

    if (!isValidLocale) {
      // if the user tries to go to a path without using locale, fix that path.
      const { defaultLocale } = config;
      const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
      const locale = (localeCookie || defaultLocale) as LocaleKey;

      // Get the localized path for the current locale
      const localizedPath = getLocalizedPath(segment1, locale);
      const remainingPath = segments.join('/');
      const searchParams = request.nextUrl.searchParams.toString();
      const searchParamsString = searchParams ? `?${searchParams}` : '';

      // Construct the redirect URL
      const redirectPath = `/${locale}${localizedPath}${remainingPath ? `/${remainingPath}` : ''}${searchParamsString}`;

      return NextResponse.redirect(new URL(redirectPath.replace(/\/+/g, '/'), request.url));
    }

    // create intl middleware
    const handleI18nRouting = createMiddleware({
      locales: config.locales,
      defaultLocale: config.defaultLocale,
      // Use pathnames from path-mappings
      pathnames: createPathnames(),
    });

    const response = handleI18nRouting(request);

    return response;
  },
} as const;

export default websiteConfig;
