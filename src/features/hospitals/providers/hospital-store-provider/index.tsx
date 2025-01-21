import React from 'react';

import { hospitalApi } from '../../api';

import HospitalStoreProviderClient from './hospital-store-provider-client';

const fetchData = async () => {
  try {
    const hospitals = await hospitalApi.getHospitals({
      query: {
        size: 100,
      },
    });

    return { hospitals };
  } catch (error) {
    console.log('HospitalStoreProvider error', error);

    return { hospitals: undefined };
  }
};

interface HospitalStoreProviderProps {
  children: React.ReactNode;
}

/**
 * ! Warning: This provider is only available on the server side.
 */
export default async function HospitalStoreProvider({ children }: HospitalStoreProviderProps) {
  const { hospitals } = await fetchData();

  return (
    <HospitalStoreProviderClient serverData={{ hospitals }}>{children}</HospitalStoreProviderClient>
  );
}
