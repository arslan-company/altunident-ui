import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { emailServiceEndpoints } from './endpoints';

const emailServiceApi = createApi(emailServiceEndpoints, {
  baseURL: `${BASE_API_URL}/email`,
});

export { emailServiceApi, emailServiceEndpoints };
