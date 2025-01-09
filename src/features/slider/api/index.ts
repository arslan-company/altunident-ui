import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { slidersEndpoints } from './endpoints';

const slidersApi = createApi(slidersEndpoints, {
  baseURL: `${BASE_API_URL}/slider`,
});

export { slidersApi, slidersEndpoints };
