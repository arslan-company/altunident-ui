import { BASE_API_URL } from '@/constants/api-urls';
import { createApi } from '@/helpers/create-api';

import { generalSearchEndpoints } from './endpoints';

const generalSearchApi = createApi(generalSearchEndpoints, {
  baseURL: `${BASE_API_URL}/search`,
});

export { generalSearchApi, generalSearchEndpoints };
