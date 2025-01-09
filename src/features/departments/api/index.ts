import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { departmentsEndpoints } from './endpoints';

const departmentsApi = createApi(departmentsEndpoints, {
  baseURL: `${BASE_API_URL}/departments`,
});

export { departmentsApi, departmentsEndpoints };
