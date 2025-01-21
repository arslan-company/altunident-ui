import axios from 'axios';

import type { CreateApiConfig, Api, EndpointBuilder, RequestOptions } from './endpoints.type';

export default function createApi<T extends Record<string, EndpointBuilder>>(
  endpoints: T,
  apiConfig: CreateApiConfig = {},
): Api<T> {
  return Object.entries(endpoints).reduce(
    (acc, [key, endpoint]) => ({
      ...acc,
      [key]: ({
        params,
        body,
        headers = {},
        query = {},
        responseType,
      }: RequestOptions<T[typeof key]>) => {
        const baseURL = apiConfig.baseURL ?? '';
        let path = endpoint?.path;

        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            path = path.replace(`:${paramKey}`, String(paramValue));
          });
        }

        const url = `${baseURL}${path}`;

        return axios({
          url,
          method: endpoint.method.toLowerCase(),
          responseType: responseType || endpoint.responseType,
          params: query,
          headers: {
            ...apiConfig.headers,
            ...headers,
          },
          ...(body && { data: body }),
        })
          .then(async (response) => {
            if (!response.data) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.data;
          })
          .catch((error) => {
            console.error('API Error:', error);
            throw error;
          });
      },
    }),
    {} as Api<T>,
  );
}
