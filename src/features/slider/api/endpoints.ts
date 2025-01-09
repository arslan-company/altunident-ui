import { endpoint } from '@/helpers/create-api';

import { SliderResponse, SlidersResponse } from '../types';

export const slidersEndpoints = {
  getSliders: endpoint.path('/').get<
    never,
    {
      name?: string;
      hospital_id?: number;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    SlidersResponse
  >(),
  getSlider: endpoint.path('/:id').get<{ id: string }, { language: string }, SliderResponse>(),
} as const;
