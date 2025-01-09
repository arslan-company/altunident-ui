import { RawAxiosRequestHeaders, AxiosRequestConfig } from 'axios';

const endpoint = {
  path: (path: string) => ({
    get: <TParams = never, TQuery = never, TResponse = unknown>({
      responseType,
      headers,
    }: {
      responseType?: AxiosRequestConfig['responseType'];
      headers?: RawAxiosRequestHeaders;
    } = {}) => ({
      // --- CONFIG VARIABLES --- //
      path,
      method: 'GET' as const,
      responseType,
      headers,
      // --- TYPE VARIABLES --- //
      params: undefined as unknown as TParams,
      query: undefined as unknown as TQuery,
      response: undefined as unknown as TResponse,
    }),

    post: <TParams = never, TQuery = never, TBody = unknown, TResponse = unknown>({
      responseType,
      headers,
    }: {
      responseType?: AxiosRequestConfig['responseType'];
      headers?: RawAxiosRequestHeaders;
    } = {}) => ({
      // --- CONFIG VARIABLES --- //
      path,
      method: 'POST' as const,
      responseType,
      headers,
      // --- TYPE VARIABLES --- //
      params: undefined as unknown as TParams,
      query: undefined as unknown as TQuery,
      body: undefined as unknown as TBody,
      response: undefined as unknown as TResponse,
    }),

    put: <TParams = never, TQuery = never, TBody = unknown, TResponse = unknown>({
      responseType,
      headers,
    }: {
      responseType?: AxiosRequestConfig['responseType'];
      headers?: RawAxiosRequestHeaders;
    } = {}) => ({
      // --- CONFIG VARIABLES --- //
      path,
      method: 'PUT' as const,
      responseType,
      headers,
      // --- TYPE VARIABLES --- //
      params: undefined as unknown as TParams,
      query: undefined as unknown as TQuery,
      body: undefined as unknown as TBody,
      response: undefined as unknown as TResponse,
    }),

    delete: <TParams = never, TQuery = never, TResponse = unknown>({
      responseType,
      headers,
    }: {
      responseType?: AxiosRequestConfig['responseType'];
      headers?: RawAxiosRequestHeaders;
    } = {}) => ({
      // --- CONFIG VARIABLES --- //
      path,
      method: 'DELETE' as const,
      responseType,
      headers,
      // --- TYPE VARIABLES --- //
      params: undefined as unknown as TParams,
      query: undefined as unknown as TQuery,
      response: undefined as unknown as TResponse,
    }),
  }),
};

export default endpoint;
