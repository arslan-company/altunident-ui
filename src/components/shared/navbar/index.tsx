import { getLocale } from 'next-intl/server';

import { corporateApi } from '@/features/corporate/api';

import NavbarClient from './navbar.client';

export default async function Navbar() {
  const locale = await getLocale();

  let serverData = {};

  try {
    const corporatePages = await corporateApi.getCorporatePages({
      query: {
        size: 50,
        language: locale === 'tr' ? undefined : locale,
      },
    });

    serverData = {
      ...serverData,
      corporatePages: corporatePages?.items,
    };
  } catch (error) {
    console.error('Error fetching from src/components/shared/navbar/index.tsx', error);
  }

  return <NavbarClient serverData={serverData as any} />;
}
