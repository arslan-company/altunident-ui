import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import getServicesPath from './utils/get-services-path';

const servicesPathRegex = /\/(services|hizmetlerimiz|dienstleistungen)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }

  // Handle services URL localization
  if (servicesPathRegex.test(pathname)) {
    const locale = pathname.split('/')[1];
    const correctPath = getServicesPath(locale);
    const currentPath = pathname.split('/')[2];

    // If the current path doesn't match the correct path for the locale, redirect
    if (currentPath !== correctPath.substring(1)) {
      // Replace the current services path with the correct one for the locale
      const newPathname = pathname.replace(`/${currentPath}`, correctPath);
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)',],
};
