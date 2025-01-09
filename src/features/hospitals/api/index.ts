import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { hospitalEndpoints } from './endpoints';

const hospitalApi = createApi(hospitalEndpoints, {
  baseURL: `${BASE_API_URL}/hospital`,
});

export { hospitalApi, hospitalEndpoints };
