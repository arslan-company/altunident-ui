import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { corporateEndpoints } from './endpoints';

const corporateApi = createApi(corporateEndpoints, {
  baseURL: `${BASE_API_URL}`,
});

export { corporateApi, corporateEndpoints };
