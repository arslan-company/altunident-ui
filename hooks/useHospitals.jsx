import { useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getHospital, getHospitals } from '../api/hospitals';
import { GlobalContext } from '../context';

// mock
import appointmentLinks from '../mock_data/appointment-links.json';

/**
 * useHospitals
 * @param {{
 *   searchText: string
*   size: number;
*   language: string
 * }} params - parameters
 * @param {import('@tanstack/react-query').QueryObserverOptions} options - react query options
 */
function useHospitals(params = {}, options = {}) {
  const hospitalsData = useQuery({
    queryKey: ['hospitals', params],
    queryFn: () => getHospitals(
      params?.searchText || undefined,
      params?.size || undefined,
      params?.language || undefined,
    ),
    options: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      ...options,
    },
  });

  const getHospitalTotal = () => {
    const { data, isLoading, isError } = hospitalsData;
    const totalHospital = isLoading ? 'Loading...' : data?.total;

    if (isError) {
      // eslint-disable-next-line no-console
      console.error('Failed to load data. (reading for getHospitalTotal)');
    }

    return isError ? 'Data Not Found' : totalHospital;
  };

  const hospitalsTotal = getHospitalTotal();

  return {
    hospitals: hospitalsData.data,
    hospitalsTotal,
    ...hospitalsData,
  };
}

/**
 * useHospital
 * @param {Object} params - parameters
 * @param {number} params.id - size
 * @param {string} params.language - language
 * @param {Object} options - react query options
 */
function useHospital(params = {}, options = {}) {
  const hospitalData = useQuery({
    queryKey: ['hospital', params],
    queryFn: () => {
      if (!params.id) return {};

      return getHospital(
        params.id || undefined,
        params.language || undefined,
      );
    },
    options: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      ...options,
    },
  });

  // helpers
  const getHospitalName = () => {
    const { data, isLoading, isError } = hospitalData;
    const hospitalName = isLoading ? 'Loading...' : data?.name;

    return isError ? 'Hospital Not Found' : hospitalName;
  };

  const getHospitalAppointmentLink = () => {
    const { data: hospital, isError } = hospitalData;
    const linkData = appointmentLinks.find(
      (item) => item.hospitalSlug === hospital?.slug,
    ) || { link: '/' };

    return isError ? '/' : linkData?.link;
  };

  const hospitalName = getHospitalName();
  const hospitalAppointmentLink = getHospitalAppointmentLink();

  return {
    hospital: hospitalData?.data,
    hospitalName,
    hospitalAppointmentLink,
    ...hospitalData,
  };
}

function useCurrentHospital() {
  const { defaultPathname, currentHospitalSlug } = useContext(GlobalContext);
  const { hospitals } = useHospitals();

  const currentHospital = useMemo(
    () => (
      currentHospitalSlug !== defaultPathname
        ? hospitals?.items.find((item) => item?.slug === currentHospitalSlug)
        : undefined
    ),
    [currentHospitalSlug, hospitals],
  );

  const { hospitalAppointmentLink: appointmentLink } = useHospital({ id: currentHospital?.id });
  const hospitalAppointmentLink = currentHospital === undefined ? 'https://atakent.kendineiyibak.app/' : appointmentLink;

  return {
    currentHospital,
    hospitalAppointmentLink,
  };
}

export { useHospitals, useHospital, useCurrentHospital };
