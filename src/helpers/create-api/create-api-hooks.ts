import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { RawAxiosRequestHeaders } from 'axios';

import { Api, EndpointBuilder } from './endpoints.type';

type QueryConfig<TData, TError> = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>;

type MutationConfig<TData, TError, TVariables> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;

export default function createApiHooks<T extends Record<string, EndpointBuilder>>(api: Api<T>) {
  return {
    useQuery: <K extends keyof T>(
      key: K,
      {
        params,
        headers,
        query,
      }: {
        params?: T[K]['params'];
        headers?: RawAxiosRequestHeaders;
        query?: T[K]['query'];
      } = {},
      config: QueryConfig<T[K]['response'], Error> = {},
    ) =>
      useQuery<T[K]['response'], Error>({
        queryKey: [key, params],
        queryFn: () => api[key]({ params, headers, query }),
        ...config,
      }),
    useMutation: <K extends keyof T>(
      key: K,
      config?: MutationConfig<
        T[K]['response'],
        Error,
        {
          body: T[K]['body'];
          params?: T[K]['params'];
          headers?: RawAxiosRequestHeaders;
          query?: T[K]['query'];
        }
      >,
    ) =>
      useMutation({
        mutationFn: ({
          body,
          params,
          headers,
          query,
        }: {
          body: T[K]['body'];
          params?: T[K]['params'];
          headers?: RawAxiosRequestHeaders;
          query?: T[K]['query'];
        }) => api[key]({ body, params, headers, query }),
        ...config,
      }),
  };
}
