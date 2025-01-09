import { BASE_API_URL } from '@/constants/api-urls';

import { createApi } from '@/helpers/create-api';

import { blogEndpoints } from './endpoints';

const blogApi = createApi(blogEndpoints, {
  baseURL: `${BASE_API_URL}/blog`,
});

export { blogApi, blogEndpoints };
