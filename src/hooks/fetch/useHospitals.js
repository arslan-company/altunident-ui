import { useQuery } from '@tanstack/react-query';

import { getHospital, getHospitals } from '@/api/hospitals';

/**
 * @template Data
 * @typedef {import('@tanstack/react-query').QueryObserverOptions<Data>} Query
*/

/**
 * @param {{
 * params: {
 *   searchText: string
 *   size: number;
 *   language: string
 * };
 * options: Query<import('@/types/hospitals').Hospitals>;
 * }} parameters - parameters
 */
export function useHospitals({ params = {}, options = {} }) {
  const hospitalsQuery = useQuery({
    queryKey: ['hospitals', params],
    queryFn: () => getHospitals(
      params?.searchText,
      params?.size,
      params?.language === 'tr' ? undefined : params?.language,
    ),
    ...options,
  });

  return hospitalsQuery;
}

/**
 * @param {{
 * params: {
 *   id: number;
 *   language: string;
 * };
 * options: Query<import('@/types/hospitals').Hospital>;
 * }} parameters - parameters
*/
export function useHospital({ params = {}, options = {} }) {
  const hospitalQuery = useQuery({
    queryKey: ['hospital', params],
    queryFn: () => {
      if (!params.id) return {};

      return getHospital(
        params.id,
        params.language,
      );
    },
    ...options,
  });

  return hospitalQuery;
}
