// @ts-check

import { useQuery } from '@tanstack/react-query';

import { getServices, getService } from '@/api/services';

/**
 * @param {{
 * params: import('@/api/services').GetServicesParams
 * options: import('@/types/react-query')
 *  .QueryOptions<import('@/types/services').Services>
 * }} params
*/
export function useServices({ params = {}, options = {} }) {
  const departmentsData = useQuery({
    queryKey: ['services', params],
    queryFn: () => getServices(params),
    ...options,
  });

  return departmentsData;
}

/**
 * @param {{
 * params: { serviceId: string | number } & import('@/api/services').GetServiceParams
 * options: import('@/types/react-query')
 *  .QueryOptions<import('@/types/services').Service>
 * }} params
*/
export function useService({ params, options = {} }) {
  const { serviceId, ...otherParams } = params;

  return useQuery({
    queryKey: ['service', params],
    queryFn: () => getService(serviceId, otherParams),
    ...options,
  });
}
