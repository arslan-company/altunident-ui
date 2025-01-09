import { endpoint } from '@/helpers/create-api';

import { ServiceResponse, ServicesResponse } from '../types';

export const servicesEndpoints = {
  getServices: endpoint.path('/').get<
    never,
    {
      name?: string;
      page?: number;
      size?: number;
      sort_by?: string;
      sort_order?: string;
      language?: string;
    },
    ServicesResponse
  >(),
  getService: endpoint.path('/:id').get<{ id: string }, { language?: string }, ServiceResponse>(),
} as const;
