import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import websiteConfig from '@/config/website.config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: websiteConfig.locales,
  // Used when no locale matches
  defaultLocale: websiteConfig.defaultLocale,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
