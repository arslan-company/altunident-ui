import { useQuery } from '@tanstack/react-query';

import { generalSearch } from '@/api/general-search';

/**
 * @param {{
 * params: {
 *  name: string;
 *  language: string;
 * };
 * options: import('@/types/react-query')
 * .QueryOptions<import('@/types/general-search').GeneralSearch>;
 * }} parameters - parameters
*/
// eslint-disable-next-line import/prefer-default-export
export function useGeneralSearch({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['general-search', params],
    queryFn: () => generalSearch(params),
    ...options,
  });
}
