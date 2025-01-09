import { endpoint } from '@/helpers/create-api';

import { BlogResponse, BlogsResponse } from '../types';

export const blogEndpoints = {
  getBlogs: endpoint.path('/').get<
    never,
    {
      title?: string;
      category_name?: string;
      category_id?: string;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    BlogsResponse
  >(),
  getBlog: endpoint.path('/:id').get<{ id: string }, { language?: string }, BlogResponse>(),
} as const;
