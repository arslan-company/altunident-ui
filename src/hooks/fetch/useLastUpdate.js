import { useQuery } from '@tanstack/react-query';

import { getLastUpdate } from '@/api/last-update';

/**
 * @param {{
 * params: {};
 * options: import('@/types/react-query').QueryOptions<import('@/types/last-update').LastUpdate>;
 * }} parameters - parameters
*/
// eslint-disable-next-line import/prefer-default-export
export function useLastUpdate({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['last-update', params],
    queryFn: () => getLastUpdate(),
    ...options,
  });
}
