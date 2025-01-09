import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { servicesEndpoints } from './endpoints';

const servicesApi = createApi(servicesEndpoints, {
  baseURL: `${BASE_API_URL}/services`,
});

export { servicesApi, servicesEndpoints };
