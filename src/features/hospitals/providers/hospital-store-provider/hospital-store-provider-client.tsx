'use client';

import React, { createContext } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import { hospitalEndpoints } from '../../api';

export interface HospitalStoreData {
  currentHospital: typeof hospitalEndpoints.getHospital.response | undefined;
  hospitals: typeof hospitalEndpoints.getHospitals.response.items;
  /**
   * Returns the current path without the `hospitalSlug` and the `locale`
   *
   * ### Example:
   *
   * current pathname: `/en/hospital-slug/contact`
   *
   * or
   *
   * current pathname: `/hospital-slug/contact`
   * ```ts
   *  const pathname = pathnameWithoutHospitalSlug
   * ```
   * **output: `/contact`**
   */
  pathnameWithoutHospitalSlug: string;
  /**
   * @param path - If there is a current hospital, the path will be appended to the base path.
   */
  withBasePath: (path: string) => string;
}

export const HospitalContext = createContext<HospitalStoreData | null>(null);

interface HospitalStoreProviderClientProps {
  readonly children: React.ReactNode;
  readonly serverData: {
    hospitals: typeof hospitalEndpoints.getHospitals.response | undefined;
  };
}

export default function HospitalStoreProviderClient({
  children,
  serverData,
}: HospitalStoreProviderClientProps) {
  const { hospitalSlug } = useParams();
  const pathname = usePathname();
  const locale = useLocale();

  const { hospitals } = serverData;

  const currentHospital = hospitals?.items?.find((item) => item?.slug === hospitalSlug);

  const pathnameWithoutHospitalSlug = pathname
    .replace(`/${locale}`, '')
    .replace(`/${hospitalSlug}`, '');

  const withBasePath = (path: string) => {
    return currentHospital ? `/${hospitalSlug}${path}` : path;
  };

  const value: HospitalStoreData = {
    hospitals: hospitals?.items || [],
    currentHospital,
    pathnameWithoutHospitalSlug,
    withBasePath,
  };

  return <HospitalContext value={value}>{children}</HospitalContext>;
}
