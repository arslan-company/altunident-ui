import { endpoint } from '@/helpers/create-api';

import { DepartmentResponse, DepartmentsResponse } from '../types';

export const departmentsEndpoints = {
  getDepartments: endpoint.path('/').get<
    never,
    {
      name?: string;
      query?: string;
      hospital_ids?: string | number;
      sort_by?: string;
      sort_order?: string;
      language?: string;
      page?: number;
      size?: number;
    },
    DepartmentsResponse
  >(),
  getDepartment: endpoint
    .path('/:id')
    .get<{ id: string | number }, { language?: string }, DepartmentResponse>(),
} as const;
