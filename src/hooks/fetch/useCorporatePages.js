import { useQuery } from '@tanstack/react-query';

import { getCorporatePage, getCorporatePages } from 'api/corporate-pages';

/**
 * @param {{
 * params: {
 *  title?: string;
 *  sort_by?: string;
 *  sort_order?: string;
 *  language?: string;
 *  page?: string | number;
 *  size?: string | number;
 * },
 * options: import('@/types/react-query')
 * .QueryOptions<import('@/types/corporate-pages').CorporatePages>
 * }} params
*/
export function useCorporatePages({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['corporate-pages', params],
    queryFn: () => getCorporatePages(params),
    ...options,
  });
}

/**
 * @param {{
 * params: {
 *  id: string | number;
 *  language?: string;
 * },
 * options: import('@/types/react-query')
 * .QueryOptions<import('@/types/corporate-pages').CorporatePage>
 * }} params
*/
export function useCorporatePage({ params, options = {} }) {
  return useQuery({
    queryKey: ['corporate-page', params],
    queryFn: () => getCorporatePage(params.id, params?.language),
    ...options,
  });
}
