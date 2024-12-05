import { useQuery } from '@tanstack/react-query';

import {
  getDepartments,
  getDepartment,
} from '@/api/deparments';

/**
 * @param {{
 * params: {
 *  hospitalIds?: string | number;
 *  name?: string;
 *  size?: string | number;
 *  language?: string;
 * },
 * options: import('@/types/react-query').QueryOptions<import('@/types/departments').Departments>
 * }} params
*/
export function useDepartments({ params = {}, options = {} }) {
  return useQuery({
    queryKey: ['departments', params],
    queryFn: () => getDepartments(
      params?.hospitalIds,
      params?.name,
      params?.size,
      params?.language,
    ),
    ...options,
  });
}

/**
 * @param {{
 * params: {
 *   id: string | number;
 *   language?: string;
 * },
 * options: import('@/types/react-query').QueryOptions<import('@/types/departments').Department>
 * }} params
*/
export function useDepartment({ params, options = {} }) {
  return useQuery({
    queryKey: ['department', params],
    queryFn: () => getDepartment(params.id, params?.language),
    ...options,
  });
}
