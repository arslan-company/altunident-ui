/*
  --- WEBSITE CONFIG ---

  This file is used to configure the website.
  You can manage the general website configuration here.
*/

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const websiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  locales: ['ar', 'de', 'en', 'fr', 'ru', 'tr'],
  defaultLocale: 'tr',
  /**
   * This function is used to handle the next.js middleware.
   *
   * It is used in the `src/middleware.ts` file.
   */
  handleMiddleware: async (request: NextRequest) => {
    const config = websiteConfig;

    // segment1: segment1 represents the locale.
    // segment2: segment2 represents the hospitalSlug.
    // segments: remaining paths
    const [, segment1, ...segments] = request.nextUrl.pathname.split('/');

    // --- LOCALE LOGICS --- //
    // check if locale is valid
    const isValidLocale = config.locales.some((item) => item === segment1);

    if (!isValidLocale) {
      // if the user tries to go to a path without using locale, fix that path.
      // segment1 should not be read as locale as it represents where the user wants to go.
      const { defaultLocale } = config;
      const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
      const remainingPath = [segment1, ...segments].join('/');

      // Get current search parameters
      const searchParams = request.nextUrl.searchParams.toString();
      const searchParamsString = searchParams ? `?${searchParams}` : '';

      return NextResponse.redirect(
        new URL(
          `/${localeCookie || defaultLocale}/${remainingPath}${searchParamsString}`,
          request.url,
        ),
      );
    }
    // --- LOCALE LOGICS - END --- //

    // create intl middleware
    const handleI18nRouting = createMiddleware({
      locales: config.locales,
      defaultLocale: config.defaultLocale,
    });

    const response = handleI18nRouting(request);

    return response;
  },
} as const;

export default websiteConfig;
