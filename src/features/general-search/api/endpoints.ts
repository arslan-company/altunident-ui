import { endpoint } from '@/helpers/create-api';

import { GeneralSearchResponse } from '../types';

export const generalSearchEndpoints = {
  search: endpoint
    .path('/')
    .get<never, { name?: string; language?: string }, GeneralSearchResponse>(),
} as const;
