import { createContext, useContext, useMemo } from 'react';

import { useHospitals } from './fetch/useHospitals';
import useLocale from './useLocale';
import useHospitalRoutes from './useHospitalRoutes';

const GlobalHospitalDataContext = createContext(null);

export function GlobalHospitalDataProvider({ children }) {
  const { currentLanguageQuery } = useLocale();
  const { defaultHospitalSlug, currentHospitalSlug } = useHospitalRoutes();

  // --- HOSPITALS DATA --- //
  const hospitalsData = useHospitals({
    params: {
      language: currentLanguageQuery,
    },
  });

  const hospitalsItems = useMemo(() => hospitalsData.data?.items || [], [hospitalsData.data]);

  // --- CURRENT HOSPITAL DATA --- //
  const currentHospitalData = (() => {
    const data = currentHospitalSlug !== defaultHospitalSlug
      ? hospitalsItems.find((item) => item?.slug === currentHospitalSlug)
      : undefined;

    return {
      ...hospitalsData,
      data,
    };
  })();

  const values = useMemo(() => ({
    hospitalsData,
    currentHospitalData,
  }), [hospitalsData]);

  return (
    <GlobalHospitalDataContext.Provider value={values}>
      {children}
    </GlobalHospitalDataContext.Provider>
  );
}

/**
 * @template Data
 * @typedef {import('@tanstack/react-query').QueryObserverResult<Data>} Query
*/

/**
 * @typedef {Object} UseGlobalHospitalData
 * @property {Query<import('@/types/hospitals').Hospitals>} hospitalsData
 * @property {Query<import('@/types/hospitals').Hospital>} currentHospitalData
*/

/**
 * @returns {UseGlobalHospitalData}
*/
export default function useGlobalHospitalData() {
  const context = useContext(GlobalHospitalDataContext);

  return context;
}
