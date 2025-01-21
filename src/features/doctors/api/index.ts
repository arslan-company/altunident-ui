import { BASE_API_URL } from '@/constants/api-urls';
import { createApi } from '@/helpers/create-api';

import { doctorsEndpoints } from './endpoints';

const doctorsApi = createApi(doctorsEndpoints, {
  baseURL: `${BASE_API_URL}/doctor`,
});

export { doctorsApi, doctorsEndpoints };
