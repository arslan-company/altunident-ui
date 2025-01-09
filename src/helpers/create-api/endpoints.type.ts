import { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type CreateApiConfig = {
  baseURL?: string;
  headers?: RawAxiosRequestHeaders;
};

export interface EndpointBuilder<TParams = any, TQuery = any, TResponse = any, TBody = any> {
  path: string;
  method: HttpMethod;
  params?: TParams;
  query?: TQuery;
  body?: TBody;
  response: TResponse;
  responseType?: AxiosRequestConfig['responseType'];
}

export type RequestOptions<T extends EndpointBuilder> = {
  params?: T['params'];
  query?: T['query'];
  body?: T['body'];
  headers?: RawAxiosRequestHeaders;
  responseType?: AxiosRequestConfig['responseType'];
};

export type Api<T extends Record<string, EndpointBuilder>> = {
  [K in keyof T]: (options: RequestOptions<T[K]>) => Promise<T[K]['response']>;
};
