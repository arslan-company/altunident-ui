import { useQuery } from '@tanstack/react-query';

import {
  getCorporateEventsBlog,
  getCorporateEventsBlogs,
} from 'api/corporate-events-blog';

/**
 * @param {{
 * params: {
 *   blogId: string | number;
 * };
 * options: import('@/types/react-query')
*   .QueryOptions<import('@/types/corporate-events-blog').CorporateEventsBlog>
 * }} params
*/
export function useCorporateEventsBlog({ params, options = {} }) {
  return useQuery({
    queryKey: ['corporate-events-blog', params],
    queryFn: () => getCorporateEventsBlog(params.blogId),
    ...options,
  });
}

/**
 * @param {{
 *  params: {
 *   title?: string;
 *   sort_by?: string;
 *   sort_order?: string;
 *   language?: string;
 *   page?: number | string;
 *   size?: number | string;
 *  };
 *  options: import('@/types/react-query')
 *   .QueryOptions<import('@/types/corporate-events-blog').CorporateEventsBlogs>
 * }} params
*/
export function useCorporateEventsBlogs({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['corporate-events-blogs', params],
    queryFn: () => getCorporateEventsBlogs(params),
    ...options,
  });
}
